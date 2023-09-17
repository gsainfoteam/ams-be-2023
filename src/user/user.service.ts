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
import { IdpTokenResponse, UserInfo } from './type/user.type';

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

  async loginByIdP(authCode: string): Promise<void> {
    await this.dataSource.transaction(async (entityManager: EntityManager) => {
      const tokens = await this.getTokensFromIdP(authCode);
      const userInfo = await this.getUserInfoFromIdP(tokens.access_token);

      const user = await this.userRepository.findUserByUuid(
        entityManager,
        userInfo.user_uuid,
      );

      if (!user) {
        await this.userRepository.registerUser(entityManager, userInfo);
      }
    });
  }

  async getTokensFromIdP(authCode: string) {
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

  async getUserInfoFromIdP(accessToken: string): Promise<UserInfo> {
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
}
