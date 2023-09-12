import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionShortBlockService } from './question-short-block.service';
import { QuestionShortBlock } from './question-short-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionShortBlock])],
  providers: [QuestionShortBlockService],
  exports: [QuestionShortBlockService]
})
export class QuestionShortBlockModule {}
