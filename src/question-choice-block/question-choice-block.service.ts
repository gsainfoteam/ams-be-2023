import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionChoiceBlock } from './question-choice-block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionChoiceBlockService {
    constructor(
      @InjectRepository(QuestionChoiceBlock)
      private questionChoiceBlockRepository: Repository<QuestionChoiceBlock>,
    ) {}

    async createAndReturnUUID(): Promise<string> {
        const questionChoiceBlock = new QuestionChoiceBlock();
        questionChoiceBlock.choice_case = [];
        questionChoiceBlock.answer_id = [];
        const savedBlock = await this.questionChoiceBlockRepository.save(questionChoiceBlock);
        return savedBlock.choice_question_uuid;
    }    

    async remove(uuid: string): Promise<void> {
        await this.questionChoiceBlockRepository.delete(uuid);
    }
}