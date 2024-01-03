import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class IdPStrategy extends PassportStrategy(
  Strategy,
  'idp-access-token',
) {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private dataSource: DataSource,
  ) {
    super();
  }
  async validate(accessToken: string): Promise<User> {
    const userInfo = await this.userService.userInfoFromIdP(accessToken);
    if (!userInfo) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.dataSource.transaction(
      async (entityManager: EntityManager): Promise<User | null> => {
        return await this.userRepository.findUserByUuid(
          entityManager,
          userInfo.user_uuid,
        );
      },
    );

    if (!user) {
      throw new UnauthorizedException('Non-exist user');
    }

    return user;
  }
}
