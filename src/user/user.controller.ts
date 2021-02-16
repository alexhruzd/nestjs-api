import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email)
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }
}