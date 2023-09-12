import { Controller, Post, Body, Put, Param, Delete, Get, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    // 특정 기간 안에 있는 project들만 출력
    @Get('date-range')
    async getProjectsByDateRange(
        @Query('startDate') startDateString: string,
        @Query('endDate') endDateString: string
    ): Promise<Project[]> {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        return this.projectsService.getProjectsByDateRange(startDate, endDate);
    }

    // 현재 진행중인 project들만 출력
    @Get('ongoing')
    async getOngoingProjects(): Promise<Project[]> {
        return this.projectsService.getOngoingProjects();
    }

    // 프로젝트 create
    @Post()
    async create(@Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.createProject(projectData);
    }

    // 프로젝트 update
    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.updateProject(uuid, projectData);
    }

    // 프로젝트 삭제
    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.projectsService.deleteProject(uuid);
    }
}