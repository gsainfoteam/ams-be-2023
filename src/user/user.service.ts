import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Project } from 'src/project/project.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // 사용자 생성
    async createUser(data: any): Promise<User> {
        const user = this.userRepository.create(data);
        const result = await this.userRepository.save(user);
        if (Array.isArray(result)) {
            throw new Error('Expected a single user, but got an array.');
        }
        return result;
    }    

    // 사용자 삭제
    async deleteUser(userUuid: string): Promise<void> {
        const result = await this.userRepository.delete(userUuid);
        if (result.affected === 0) throw new NotFoundException('User not found.');
    }

    // 사용자가 참여한 프로젝트 조회
    async getAdminProjectsOfUser(userUuid: string): Promise<Project[]> {
        const user = await this.userRepository.findOne({ where: { user_uuid: userUuid }, relations: ['admin_projects'] });
        if (!user) throw new NotFoundException('User not found.');
        return user.admin_projects;
    }
}
