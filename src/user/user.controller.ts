/*
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
    return await this.userService.getAdminProjectsOfUser(userUuid);*/

import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenResponse } from './type/user.type';
import { Request, Response } from 'express';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginByIdP(
    @Query('auth_code') authCode: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const { refresh_token, ...token } = await this.userService.loginByIdP(
      authCode,
    );
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return { ...token };
  }

  @Post('refresh')
  async getNewAccessToken(@Req() req: Request): Promise<AccessTokenResponse> {
    const refreshToken = req.cookies['refresh_token'];
    return await this.userService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(
    @Body('access_token') accessToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('refresh_token');

    await this.userService.logout(accessToken, refreshToken);

    return { message: 'success' };
  }
}
