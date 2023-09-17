import { Controller, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginByIdP(@Query('authCode') authCode: string): Promise<any> {
    await this.userService.loginByIdP(authCode);
    return { message: 'login success' };
  }
}
