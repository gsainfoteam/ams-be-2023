import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Project } from '../project/project.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(data: any): Promise<User> {
        return await this.userRepository.createUser(data);
    }    

    async deleteUser(userUuid: string): Promise<void> {
        await this.userRepository.deleteUser(userUuid);
    }

    async getAdminProjectsOfUser(userUuid: string): Promise<Project[]> {
        return await this.userRepository.getAdminProjectsOfUser(userUuid);
    }
}