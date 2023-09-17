import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: any) {
    return await this.userService.createUser(data);
  }

  @Delete(':userUuid')
  async deleteUser(@Param('userUuid') userUuid: string) {
    return await this.userService.deleteUser(userUuid);
  }

  @Get(':userUuid/admin-projects')
  async getAdminProjectsOfUser(@Param('userUuid') userUuid: string) {
    return await this.userService.getAdminProjectsOfUser(userUuid);
  }
}
