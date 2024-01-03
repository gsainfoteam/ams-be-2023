import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerRepository } from './answer.repository';
import { ResponseModule } from 'src/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository]), ResponseModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
})
export class AnswerModule {}

