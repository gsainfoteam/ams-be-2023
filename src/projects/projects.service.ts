import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
    constructor(
      @InjectRepository(Project)
      private projectsRepository: Repository<Project>,
    ) {}
        
    async getProjectsByDateRange(startDate: Date, endDate: Date): Promise<Project[]> {
        const projects = await this.projectsRepository.find({
            where: {
                start_date: Between(startDate, endDate),
                end_date: Between(startDate, endDate)
            }
        });
        projects.forEach(project => {
            if (project.admin_uuid) {
                project.admin_uuid = JSON.parse(project.admin_uuid);
            }
        });
    
        return projects;
    }
    
    async getOngoingProjects(): Promise<Project[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const projects = await this.projectsRepository.find({
            where: {
                start_date: LessThanOrEqual(today),
                end_date: MoreThanOrEqual(today)
            }
        });
        projects.forEach(project => {
            if (project.admin_uuid) {
                project.admin_uuid = JSON.parse(project.admin_uuid);
            }
        });
    
        return projects;
    }

    async createProject(projectData: Partial<Project>): Promise<Project> {
        if (projectData.admin_uuid) {
          projectData.admin_uuid = JSON.stringify(projectData.admin_uuid);
        }
        const project = this.projectsRepository.create(projectData);
        return await this.projectsRepository.save(project);
      }
    
    async updateProject(uuid: string, projectData: Partial<Project>): Promise<Project> {
        if (projectData.admin_uuid) {
            projectData.admin_uuid = JSON.stringify(projectData.admin_uuid);
        }
        await this.projectsRepository.update(uuid, projectData);
        
        const updatedProject = await this.projectsRepository.findOne({ where: { project_uuid: uuid } });
        
        if (!updatedProject) {
            throw new NotFoundException(`Project with UUID ${uuid} not found`);
        }

        if (updatedProject.admin_uuid) {
            updatedProject.admin_uuid = JSON.parse(updatedProject.admin_uuid);
        }
        
        return updatedProject;
    }

    async deleteProject(uuid: string): Promise<void> {
        await this.projectsRepository.delete(uuid);
    }
}