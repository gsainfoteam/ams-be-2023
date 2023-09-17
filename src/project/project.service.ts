import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThanOrEqual } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createProject(data: any): Promise<Project> {
        let project: Project;
        const created = this.projectRepository.create(data);
        if (Array.isArray(created)) {
            project = created[0];
        } else {
            project = created;
        }
    
        if (data.admin_uuids && data.admin_uuids.length > 0) {
            project.admin_users = await this.userRepository.findBy({
                user_uuid: In(data.admin_uuids)
            });
        }
        return await this.projectRepository.save(project);
    }
    

    async getProject(projectUuid: string): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { project_uuid: projectUuid } });
        if (!project) throw new NotFoundException('Project not found.');
        return project;
    }

    async getProjectsWithinDate(date: Date): Promise<Project[]> {
        return await this.projectRepository.find({ where: { start_date: LessThanOrEqual(date), end_date: GreaterThanOrEqual(date) } });
    }

    async updateProject(projectUuid: string, data: any): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { project_uuid: projectUuid } });
        if (!project) throw new NotFoundException('Project not found.');
        if (data.title !== undefined) {
            project.title = data.title;
        }
        if (data.block_uuid && Array.isArray(data.block_uuid)) {
            project.block_uuid = data.block_uuid;
        }
        return await this.projectRepository.save(project);
    }
    async deleteProject(projectUuid: string): Promise<void> {
        const result = await this.projectRepository.delete(projectUuid);
        if (result.affected === 0) throw new NotFoundException('Project not found.');
    }

    async getAdminUsersOfProject(projectUuid: string): Promise<User[]> {
        const project = await this.projectRepository.findOne({
            where: { project_uuid: projectUuid },
            relations: ['admin_users']
        });
        if (!project) throw new NotFoundException('Project not found.');
        return project.admin_users;
    }
}
function GreaterThanOrEqual(date: Date): Date | import("typeorm").FindOperator<Date> | undefined {
    throw new Error('Function not implemented.');
}

