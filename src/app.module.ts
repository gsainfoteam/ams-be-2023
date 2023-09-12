import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigModule } from './global/config/database/database.module';
import { MySQLConfigService } from './global/config/database/database.service';
import { ProjectsModule } from './projects/projects.module';
import { ApplicationFormModule } from './application-form/application-form.module';
import { TextBlockModule } from './text-block/text-block.module';
import { NoticeBlockModule } from './notice-block/notice-block.module';
import { QuestionChoiceBlockModule } from './question-choice-block/question-choice-block.module';
import { QuestionShortBlockModule } from './question-short-block/question-short-block.module';
import { QuestionLongBlockModule } from './question-long-block/question-long-block.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySQLConfigModule],
      useClass: MySQLConfigService,
      inject: [MySQLConfigService],
    }),
    ProjectsModule,
    ApplicationFormModule,
    TextBlockModule,
    NoticeBlockModule,
    QuestionChoiceBlockModule,
    QuestionShortBlockModule,
    QuestionLongBlockModule,
    AnswerModule,
  ],
})
export class AppModule {}
