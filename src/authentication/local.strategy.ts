import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import { User } from "../user/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export  class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validate(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}