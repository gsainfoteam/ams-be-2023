import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { EntityManager, In, LessThanOrEqual, Repository } from 'typeorm';


@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly _manager: EntityManager
    ) {}

    async createProject(data: any): Promise<Project> {
        let project = await this.projectRepository.createProject(data);
    
        if (data.admin_uuids && data.admin_uuids.length > 0) {
            project.admin_users = await this._manager.find(User, {
                where: { user_uuid: In(data.admin_uuids) }
            });
            project = await this.projectRepository.createProject(project);  // 변경된 내용을 데이터베이스에 저장
        }
        return project;
    }
    
    
    async getProject(projectUuid: string): Promise<Project> {
        const project = await this.projectRepository.getProject(projectUuid);
        if (!project) throw new NotFoundException('Project not found.');
        return project;
    }

    async getProjectsWithinDate(date: Date): Promise<Project[]> {
        return await this.projectRepository.getProjectsWithinDate(date);
    }

    async updateProject(projectUuid: string, data: any): Promise<Project> {
        const project = await this.projectRepository.getProject(projectUuid);
        if (!project) throw new NotFoundException('Project not found.');
        if (data.title !== undefined) {
            project.title = data.title;
        }
        if (data.block_uuid && Array.isArray(data.block_uuid)) {
            project.block_uuid = data.block_uuid;
        }
        return await this.projectRepository.createProject(project);
    }

    async deleteProject(projectUuid: string): Promise<void> {
        await this.projectRepository.deleteProject(projectUuid);
    }
}