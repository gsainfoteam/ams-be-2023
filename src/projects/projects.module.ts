import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ApplicationFormService } from 'src/application-form/application-form.service';
import { ApplicationForm } from 'src/application-form/application-form.entity';
import { TextBlockModule } from 'src/text-block/text-block.module';
import { NoticeBlockModule } from 'src/notice-block/notice-block.module';
import { QuestionChoiceBlockModule } from 'src/question-choice-block/question-choice-block.module';
import { QuestionShortBlockModule } from 'src/question-short-block/question-short-block.module';
import { QuestionLongBlockModule } from 'src/question-long-block/question-long-block.module';

@Module({
  providers: [ProjectsService, ApplicationFormService], 
  controllers: [ProjectsController],
  imports: [
    TypeOrmModule.forFeature([Project, ApplicationForm]),
    TextBlockModule,
    NoticeBlockModule,
    QuestionChoiceBlockModule,
    QuestionShortBlockModule,
    QuestionLongBlockModule
  ], 
})
export class ProjectsModule {}
