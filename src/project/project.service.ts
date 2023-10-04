import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository
    ) {}

    async createProject(data: CreateProjectDto): Promise<Project> {
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);
        const startDateTimestamp = new Date(data.start_date).getTime();
        const endDateTimestamp = new Date(data.end_date).getTime();

        if (startDateTimestamp < todayTimestamp || endDateTimestamp < todayTimestamp) {
            throw new BadRequestException('Start date and end date should be in the future.');
        }
        const project = new Project();
        Object.assign(project, data);
        const createdProject = await this.projectRepository.createProject(project);
        if (data.admin_uuids && data.admin_uuids.length > 0) {
            return await this.projectRepository.addAdminUsersToProject(createdProject, data.admin_uuids);
        }
        return createdProject;
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
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);
        const startDateTimestamp = data.start_date ? new Date(data.start_date).getTime() : undefined;
        const endDateTimestamp = data.end_date ? new Date(data.end_date).getTime() : undefined;
        if ((startDateTimestamp && startDateTimestamp < todayTimestamp) || 
            (endDateTimestamp && endDateTimestamp < todayTimestamp)) {
            throw new BadRequestException('Start date and end date should be in the future.');
        }
        const project = await this.projectRepository.getProject(projectUuid);
        if (!project) throw new NotFoundException('Project not found.');
        if (data.block_uuid) delete data.block_uuid; // block_uuid 수정되지 않도록
        Object.assign(project, data);
        return await this.projectRepository.updateProject(project);
    }

    async deleteProject(projectUuid: string): Promise<void> {
        await this.projectRepository.softDeleteProject(projectUuid);
    }
}