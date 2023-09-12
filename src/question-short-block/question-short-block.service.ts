import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionShortBlock } from './question-short-block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionShortBlockService {
    constructor(
      @InjectRepository(QuestionShortBlock)
      private questionShortBlockRepository: Repository<QuestionShortBlock>,
    ) {}

    async createAndReturnUUID(): Promise<string> {
        const questionShortBlock = new QuestionShortBlock();
        const savedBlock = await this.questionShortBlockRepository.save(questionShortBlock);
        return savedBlock.short_question_uuid;
    }

    async remove(uuid: string): Promise<void> {
        await this.questionShortBlockRepository.delete(uuid);
    }
}
