import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionChoiceBlockService } from './question-choice-block.service';
import { QuestionChoiceBlock } from './question-choice-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionChoiceBlock])],
  providers: [QuestionChoiceBlockService],
  exports: [QuestionChoiceBlockService]
})
export class QuestionChoiceBlockModule {}
