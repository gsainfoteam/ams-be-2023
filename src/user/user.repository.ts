import { Injectable } from '@nestjs/common';
/*import { EntityManager } from 'typeorm';
import { User } from './user.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class UserRepository {
    constructor(private readonly _manager: EntityManager) {}

    async createUser(data: any): Promise<User> {
        return await this._manager.save(User, data);
    }

    async deleteUser(userUuid: string): Promise<void> {
        await this._manager.delete(User, userUuid);
    }

    async getAdminProjectsOfUser(userUuid: string): Promise<Project[]> {
        const user = await this._manager.findOne(User, { where: { user_uuid: userUuid }, relations: ['admin_projects'] });
        if (!user) return [];
        return user.admin_projects;
    }*/
import { UserInfo } from './type/user.type';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  async findOrRegister(
    transactionManager: EntityManager,
    userInfo: UserInfo,
  ): Promise<void> {
    const user = await this.findUserByUuid(
      transactionManager,
      userInfo.user_uuid,
    );

    if (!user) {
      const newUser = new User();

      newUser.user_uuid = userInfo.user_uuid;
      newUser.user_name = userInfo.user_name;
      newUser.student_number = userInfo.student_id;
      newUser.user_phone_number = userInfo.user_phone_number;
      newUser.user_email_id = userInfo.user_email_id;

      await transactionManager.save(newUser);
    }
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
