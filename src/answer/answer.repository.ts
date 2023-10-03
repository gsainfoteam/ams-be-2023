import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Answer } from './answer.entity';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerRepository {
    constructor(private readonly entityManager: EntityManager) {}

    async createAnswer(data: any): Promise<Answer> {
        return this.entityManager.save(Answer, data);
    }

    async getAnswer(answerUuid: string): Promise<Answer | null> {
        return this.entityManager.findOne(Answer, { where: { answer_uuid: answerUuid }, relations: ["response"] });
    }

    async getAnswersByBlockUuid(blockUuid: string): Promise<Answer[]> {
        return this.entityManager.find(Answer, {where: { block_uuid: blockUuid }});
    }

    async updateAnswer(answerUuid: string, dto: UpdateAnswerDto): Promise<Answer> {
        await this.entityManager.update(Answer, answerUuid, dto);
        const updatedAnswer = await this.entityManager.findOne(Answer, { where: { answer_uuid: answerUuid } });
        if (!updatedAnswer) {
            throw new Error("Updated answer not found");
        }
        return updatedAnswer;
    }

    async deleteAnswer(answerUuid: string): Promise<void> {
        const answer = await this.entityManager.findOne(Answer, { where: { answer_uuid: answerUuid } });
        if (answer) {
            await this.entityManager.remove(Answer, answer);
        }
    }
}
