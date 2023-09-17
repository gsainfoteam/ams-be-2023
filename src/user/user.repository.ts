import { Injectable } from '@nestjs/common';
import { UserInfo } from './type/user.type';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  async registerUser(
    transactionManager: EntityManager,
    userInfo: UserInfo,
  ): Promise<void> {
    const newUser = new User();
    console.log(userInfo);

    newUser.user_uuid = userInfo.user_uuid;
    newUser.user_name = userInfo.user_name;
    newUser.student_number = userInfo.student_id;
    newUser.user_phone_number = userInfo.user_phone_number;
    newUser.user_email_id = userInfo.user_email_id;

    await transactionManager.save(newUser);
  }

  async findUserByUuid(
    transactionManager: EntityManager,
    userUuid: string,
  ): Promise<User | null> {
    return await transactionManager.findOne(User, {
      where: { user_uuid: userUuid },
    });
  }
}
