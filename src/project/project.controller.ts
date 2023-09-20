import { Controller, Post, Body, Param, Delete, Get, Patch, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Request } from 'express';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    async createProject(@Body() data: any) {
        return await this.projectService.createProject(data);
    }

    @Get(':projectUuid')
    async getProject(@Param('projectUuid') projectUuid: string) {
        return await this.projectService.getProject(projectUuid);
    }

    @Get('withinDate/:date')
    async getProjectsWithinDate(@Param('date') date: string) {
        return await this.projectService.getProjectsWithinDate(new Date(date));
    }

    @Patch(':projectUuid')
    async updateProject(@Param('projectUuid') projectUuid: string, @Body() data: any) {
        return await this.projectService.updateProject(projectUuid, data);
    }

    @Delete(':projectUuid')
    async deleteProject(@Param('projectUuid') projectUuid: string) {
        return await this.projectService.deleteProject(projectUuid);
    }
}
