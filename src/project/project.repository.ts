import { Injectable } from '@nestjs/common';
import { EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectRepository {
    constructor(
        private readonly projectManager: EntityManager
    ) {}

    async createProject(data: any): Promise<Project> {
        return await this.projectManager.save(Project, data);
    }

    async getProject(projectUuid: string): Promise<Project | null> {
        return await this.projectManager.findOne(Project, {
            where: { project_uuid: projectUuid },
            relations: ['admin_users']
        });
    }

    async getProjectsWithinDate(date: Date): Promise<Project[]> {
        return await this.projectManager.find(Project, { where: { start_date: LessThanOrEqual(date), end_date: MoreThanOrEqual(date) } });
    }

    async updateProject(project: Project): Promise<Project> {
        return await this.projectManager.save(Project, project);
    }

    async deleteProject(projectUuid: string): Promise<void> {
        await this.projectManager.delete(Project, projectUuid);
    }

    async getAdminUsersOfProject(projectUuid: string): Promise<User[]> {
        const project = await this.projectManager.findOne(Project, {
            where: { project_uuid: projectUuid },
            relations: ['admin_users']
        });
        if (!project) {
            throw new Error('Project not found.');
        }
        return project.admin_users;
    }
}