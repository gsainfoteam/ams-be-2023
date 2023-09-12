import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(uuid: string): Promise<QuestionShortBlock> {
        const questionShortBlock = await this.questionShortBlockRepository.findOne({where : {short_question_uuid:uuid}});
        if (!questionShortBlock) {
            throw new NotFoundException(`QuestionShortBlock with UUID ${uuid} not found`);
        }
        return questionShortBlock;
    }
    

    async update(uuid: string, data: Partial<QuestionShortBlock>): Promise<QuestionShortBlock> {
        const existingBlock = await this.questionShortBlockRepository.findOne({where : {short_question_uuid:uuid}});
        if (!existingBlock) {
            throw new NotFoundException(`QuestionShortBlock with UUID ${uuid} not found`);
        }
        const updatedBlock = Object.assign(existingBlock, data);
        return await this.questionShortBlockRepository.save(updatedBlock);
    }

    async remove(uuid: string): Promise<void> {
        await this.questionShortBlockRepository.delete(uuid);
    }
}
