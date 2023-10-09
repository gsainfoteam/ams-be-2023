import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { ResponseRepository } from '../response/response.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Response } from '../response/response.entity'
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
    constructor(
        private readonly answerRepository: AnswerRepository,
        private readonly responseRepository: ResponseRepository
    ) {}

    async createAnswer(dto: CreateAnswerDto) {
        const response = await this.responseRepository.findOrCreateResponse({ where: { user_uuid: dto.user_uuid }, relations: ["answers"] });
        const answer = await this.answerRepository.createAnswer({
            ...dto,
            response: response,
        });
        response.answers.push(answer);
        await this.responseRepository.updateResponse(response);
        return {
            answer_uuid: answer.answer_uuid,
            answer_data: answer.answer_data,
            block_uuid: answer.block_uuid,
            created_at: answer.created_at,
            updated_at: answer.updated_at
        };
    }
    
    async getAnswersByUserUuid(userUuid: string): Promise<Answer[]> {
        return this.responseRepository.getAnswersByUserUuid(userUuid);
    }
    
    async getAnswersByBlockUuid(blockUuid: string) {
        return this.answerRepository.getAnswersByBlockUuid(blockUuid);
    }

    async updateAnswer(answerUuid: string, dto: UpdateAnswerDto) {
        return this.answerRepository.updateAnswer(answerUuid, dto);
    }

    async deleteAnswersByUserUuid(userUuid: string): Promise<void> {
        const response = await this.responseRepository.findOne({ where: { user_uuid: userUuid } });
        if (response) {
            await this.responseRepository.deleteResponse(response.response_uuid);
        } else {
            throw new Error("No response found for the provided userUuid");
        }
    }
    
}
