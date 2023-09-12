import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionLongBlock } from './question-long-block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionLongBlockService {
    constructor(
      @InjectRepository(QuestionLongBlock)
      private questionLongBlockRepository: Repository<QuestionLongBlock>,
    ) {}

    async createAndReturnUUID(): Promise<string> {
        const questionLongBlock = new QuestionLongBlock();
        const savedBlock = await this.questionLongBlockRepository.save(questionLongBlock);
        return savedBlock.long_question_uuid;
    }

    async remove(uuid: string): Promise<void> {
        await this.questionLongBlockRepository.delete(uuid);
    }
}