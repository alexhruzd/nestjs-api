import { Body, Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthenticationService } from "./authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private userService: UserService
  ) {}

  @Post('register')
  async register(@Body() registrationDto: RegisterDto) {
    return this.authService.register(registrationDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userService.getById(req.user.id);
    return this.authService.login(user);
  }

}