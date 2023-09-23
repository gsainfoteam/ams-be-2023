import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { EntityManager, In, LessThanOrEqual, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly _manager: EntityManager
    ) {}

    async createProject(data: CreateProjectDto): Promise<Project> {
        let project = await this.projectRepository.createProject(data);
        if (data.admin_uuids && data.admin_uuids.length > 0) {
            project.admin_users = await this._manager.find(User, {
                where: { user_uuid: In(data.admin_uuids) }
            });
            project = await this.projectRepository.createProject(project);
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

    async updateProject(projectUuid: string, data: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.getProject(projectUuid);
        if (!project) throw new NotFoundException('Project not found.');
        if (data.block_uuid) delete data.block_uuid; // block_uuid 수정되지 않도록
        Object.assign(project, data);
        await this.projectRepository.updateProject(project);
        return project;
    }

    async deleteProject(projectUuid: string): Promise<void> {
        await this.projectRepository.deleteProject(projectUuid);
    }
}