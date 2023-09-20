import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
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
    }
}
