import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(uuid: string): Promise<QuestionLongBlock> {
        const questionLongBlock = await this.questionLongBlockRepository.findOne({where : {long_question_uuid : uuid}});
        if (!questionLongBlock) {
            throw new NotFoundException(`QuestionLongBlock with UUID ${uuid} not found`);
        }
        return questionLongBlock;
    }    

    async update(uuid: string, data: Partial<QuestionLongBlock>): Promise<QuestionLongBlock> {
        const existingBlock = await this.questionLongBlockRepository.findOne({where : {long_question_uuid : uuid}});
        if (!existingBlock) {
            throw new NotFoundException(`QuestionLongBlock with UUID ${uuid} not found`);
        }
        const updatedBlock = Object.assign(existingBlock, data);
        return await this.questionLongBlockRepository.save(updatedBlock);
    }

    async remove(uuid: string): Promise<void> {
        await this.questionLongBlockRepository.delete(uuid);
    }
}