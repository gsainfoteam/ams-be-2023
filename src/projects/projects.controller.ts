import { Controller, Post, Body, Put, Param, Delete, Get, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get('date-range')
    async getProjectsByDateRange(
        @Query('startDate') startDateString: string,
        @Query('endDate') endDateString: string
    ): Promise<Project[]> {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        return this.projectsService.getProjectsByDateRange(startDate, endDate);
    }

    @Get('ongoing')
    async getOngoingProjects(): Promise<Project[]> {
        return this.projectsService.getOngoingProjects();
    }

    @Post()
    async create(@Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.createProject(projectData);
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.updateProject(uuid, projectData);
    }

    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.projectsService.deleteProject(uuid);
    }
}