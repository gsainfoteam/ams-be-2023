import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionChoiceBlockService } from './question-choice-block.service';
import { QuestionChoiceBlock } from './question-choice-block.entity';
import { QuestionChoiceBlockController } from './question-choice-block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionChoiceBlock])],
  providers: [QuestionChoiceBlockService],
  exports: [QuestionChoiceBlockService],
  controllers: [QuestionChoiceBlockController]
})
export class QuestionChoiceBlockModule {}
