import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionShortBlockService } from './question-short-block.service';
import { QuestionShortBlock } from './question-short-block.entity';
import { QuestionShortBlockController } from './question-short-block.controller';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionShortBlock]),
    AnswerModule
  ],
  providers: [QuestionShortBlockService],
  exports: [QuestionShortBlockService],
  controllers: [QuestionShortBlockController]
})
export class QuestionShortBlockModule {}
