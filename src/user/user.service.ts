import { CreateUserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  async getById(id: number) {
    const user: User = await this.userRepository.findOne({id});

    if(user)
      return user;

    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);

  }

  async getByEmail(email: string) {
    const user: User = await this.userRepository.findOne({ email });
    if(user)
      return user;

    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);

    await this.userRepository.save(newUser);
    return newUser;
  }

  async setCurrentToken(token: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(token, 10);
    await this.userRepository.update(id, {
      currentHashedRefreshToken
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}