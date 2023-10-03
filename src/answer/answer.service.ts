import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { ResponseRepository } from '../response/response.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
    constructor(
        private readonly answerRepository: AnswerRepository,
        private readonly responseRepository: ResponseRepository
    ) {}

    async createAnswer(dto: CreateAnswerDto) {
        const response = await this.responseRepository.createResponse({
            user_uuid: dto.user_uuid,
        });

        const answer = await this.answerRepository.createAnswer({
            ...dto,
            response_uuid: response.response_uuid,
        });

        return answer;
    }

    async getAnswersByBlockUuid(blockUuid: string) {
        return this.answerRepository.getAnswersByBlockUuid(blockUuid);
    }

    async updateAnswer(answerUuid: string, dto: UpdateAnswerDto) {
        return this.answerRepository.updateAnswer(answerUuid, dto);
    }

    async deleteAnswer(answerUuid: string) {
        return this.answerRepository.deleteAnswer(answerUuid);
    }
}