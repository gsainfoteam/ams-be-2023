import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationForm } from './application-form.entity';

// 블록 모듈들을 임포트합니다.
import { TextBlockModule } from 'src/text-block/text-block.module';
import { NoticeBlockModule } from 'src/notice-block/notice-block.module';
import { QuestionChoiceBlockModule } from 'src/question-choice-block/question-choice-block.module';
import { QuestionShortBlockModule } from 'src/question-short-block/question-short-block.module';
import { QuestionLongBlockModule } from 'src/question-long-block/question-long-block.module';

@Module({
  providers: [ApplicationFormService],
  controllers: [ApplicationFormController],
  imports: [
    TypeOrmModule.forFeature([ApplicationForm]),
    
    // 블록 모듈들을 추가합니다.
    TextBlockModule,
    NoticeBlockModule,
    QuestionChoiceBlockModule,
    QuestionShortBlockModule,
    QuestionLongBlockModule
  ],
})
export class ApplicationFormModule {}
