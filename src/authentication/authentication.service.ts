import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async validate(login: string, password: string) {

    try {
      const user = await this.userService.getByEmail(login);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<void> {
    const isCompare = await bcrypt.compare(password, hashedPassword);
    if(!isCompare) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async register(registrationData: RegisterDto) {

    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.userService.createUser({
        ...registrationData,
        password: hashedPassword
      })

      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(user: User) {
    const payload = {id: user.id};
    return {
      token: this.jwtService.sign(payload)
    }
  }
}