import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ApplicationFormService } from 'src/application-form/application-form.service';
import { ApplicationForm } from 'src/application-form/application-form.entity';

@Module({
  providers: [ProjectsService, ApplicationFormService], 
  controllers: [ProjectsController],
  imports: [TypeOrmModule.forFeature([Project, ApplicationForm])], 
})
export class ProjectsModule {}
