import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { DataSource, EntityManager } from 'typeorm';
import {
  AccessTokenResponse,
  IdpTokenResponse,
  UserInfo,
} from './type/user.type';

@Injectable()
export class UserService {
  private idpUrl: string;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private httpService: HttpService,
    private dataSource: DataSource,
  ) {
    this.idpUrl = this.configService.get<string>('IDP_URL')!;
  }

  async loginByIdP(authCode: string): Promise<IdpTokenResponse> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        const tokens = await this.tokensFromIdP(authCode);

        const userInfo = await this.userInfoFromIdP(tokens.access_token);

        await this.userRepository.findOrRegister(entityManager, userInfo);

        return {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        };
      },
    );
  }

  async refresh(refreshToken: string): Promise<AccessTokenResponse> {
    return await this.refreshTokenFromIdP(refreshToken);
  }

  async logout(accessToken: string, refreshToken: string): Promise<void> {
    await this.revokeTokenFromIdp(accessToken);
    await this.revokeTokenFromIdp(refreshToken);
  }

  async tokensFromIdP(authCode: string) {
    const url = this.idpUrl + '/token';
    const tokenResponse = await firstValueFrom(
      this.httpService
        .post<IdpTokenResponse>(
          url,
          {
            code: authCode,
            grant_type: 'authorization_code',
            redirect_uri: this.configService.get<string>('WEB_REDIRECT_URI'),
          },
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            auth: {
              username: this.configService.get<string>('CLIENT_ID')!,
              password: this.configService.get<string>('CLIENT_SECRET_KEY')!,
            },
          },
        )
        .pipe(
          catchError((err: AxiosError) => {
            if (err.response?.status === 400) {
              throw new UnauthorizedException('Invalid auth code');
            }
            throw new InternalServerErrorException('network error');
          }),
        ),
    );

    return tokenResponse.data;
  }

  async userInfoFromIdP(accessToken: string): Promise<UserInfo> {
    const url = this.idpUrl + '/userinfo';

    const userInfo = await firstValueFrom(
      this.httpService
        .get<UserInfo>(url, { params: { access_token: accessToken } })
        .pipe(
          catchError((err: AxiosError) => {
            if (err.response?.status === 401) {
              throw new UnauthorizedException('Invalid access');
            }
            throw new InternalServerErrorException('network error');
          }),
        ),
    );

    return userInfo.data;
  }

  async refreshTokenFromIdP(refreshToken: string): Promise<IdpTokenResponse> {
    const url = this.idpUrl + '/token';
    const refreshResponse = await firstValueFrom(
      this.httpService
        .post<IdpTokenResponse>(
          url,
          {
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          },
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            auth: {
              username: this.configService.get<string>('CLIENT_ID')!,
              password: this.configService.get<string>('CLIENT_SECRET_KEY')!,
            },
          },
        )
        .pipe(
          catchError((err: AxiosError) => {
            if (err.response?.status === 400) {
              throw new UnauthorizedException('Invalid refresh token');
            }
            throw new InternalServerErrorException('network error');
          }),
        ),
    );
    return refreshResponse.data;
  }

  private async revokeTokenFromIdp(token: string) {
    const url = this.idpUrl + '/revoke';
    await firstValueFrom(
      this.httpService.post(
        url,
        { token },
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          auth: {
            username: this.configService.get<string>('CLIENT_ID')!,
            password: this.configService.get<string>('CLIENT_SECRET_KEY')!,
          },
        },
      ),
    );
  }
}
