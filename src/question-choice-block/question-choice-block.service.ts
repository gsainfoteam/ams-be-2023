import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(uuid: string): Promise<QuestionChoiceBlock> {
        const questionChoiceBlock = await this.questionChoiceBlockRepository.findOne({where : {choice_question_uuid : uuid}});
        if (!questionChoiceBlock) {
            throw new NotFoundException(`QuestionChoiceBlock with UUID ${uuid} not found`);
        }
        return questionChoiceBlock;
    }
    

    async update(uuid: string, data: Partial<QuestionChoiceBlock>): Promise<QuestionChoiceBlock> {
        const existingBlock = await this.questionChoiceBlockRepository.findOne({where : {choice_question_uuid : uuid}});
        if (!existingBlock) {
            throw new NotFoundException(`QuestionChoiceBlock with UUID ${uuid} not found`);
        }
        const updatedBlock = Object.assign(existingBlock, data);
        return await this.questionChoiceBlockRepository.save(updatedBlock);
    }

    async remove(uuid: string): Promise<void> {
        await this.questionChoiceBlockRepository.delete(uuid);
    }
}