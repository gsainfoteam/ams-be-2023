import { Injectable } from '@nestjs/common';
import { UserInfo } from './type/user.type';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  async registerUser(transactionManager: EntityManager, userInfo: UserInfo) {
    const newUser = new User();

    newUser.userUuid = userInfo.userUuid;
    newUser.userName = userInfo.userName;
    newUser.studentNumber = userInfo.studentNumber;
    newUser.userPhoneNumber = userInfo.userPhoneNumber;
    newUser.userEmailId = userInfo.userEmailId;
    newUser.userConsent = false;

    await transactionManager.save(newUser);
  }

  async findUserByUuid(transactionManager: EntityManager, userUuid: string) {
    return await transactionManager.findOne(User, {
      where: { userUuid: userUuid },
    });
  }
}
