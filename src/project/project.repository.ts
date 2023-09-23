import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
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

    async addAdminUsersToProject(project: Project, adminUuids: string[]): Promise<Project> {
        const adminUsers = await this.projectManager.find(User, {
            where: { user_uuid: In(adminUuids) }
        });
        if (adminUsers.length !== adminUuids.length) {
            throw new NotFoundException('Some admin users not found.');
        }
        project.admin_users = adminUsers;
        return await this.projectManager.save(Project, project);
    }
}