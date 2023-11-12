import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionLongBlockService } from './question-long-block.service';
import { QuestionLongBlock } from './question-long-block.entity';
import { QuestionLongBlockController } from './question-long-block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionLongBlock])],
  providers: [QuestionLongBlockService],
  exports: [QuestionLongBlockService],
  controllers: [QuestionLongBlockController]
})
export class QuestionLongBlockModule {}
