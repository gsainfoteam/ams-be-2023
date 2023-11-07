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
        const { user_uuid, project_uuid } = dto;
        const response = await this.responseRepository.findOrCreateResponse(user_uuid, project_uuid);
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
    
    async getAnswersByUserUuid(userUuid: string, projectUuid: string): Promise<Answer[]> {
        return this.responseRepository.getAnswersByUserUuid(userUuid, projectUuid);
    }
    
    async getAnswersByBlockUuid(blockUuid: string) {
        return this.answerRepository.getAnswersByBlockUuid(blockUuid);
    }

    async updateAnswer(answerUuid: string, dto: UpdateAnswerDto) {
        return this.answerRepository.updateAnswer(answerUuid, dto);
    }

    async deleteAnswersByUserUuid(userUuid: string, projectUuid: string): Promise<void> {
        await this.responseRepository.deleteResponse(userUuid, projectUuid);
    }
    
    async getResponseCountByProjectAndDate(projectUuid: string, date: string): Promise<{ response_num: number }> {
        const count = await this.responseRepository.countResponsesByProjectAndDate(projectUuid, date);
        return { response_num: count };
    }
    
    async getTodayYesterdayResponseCounts(projectUuid: string): Promise<{ today_count: number, yesterday_count: number, difference: number }> {
        const todayKST = getKSTDate();
        const yesterdayKST = new Date(todayKST.getTime() - (3600000 * 24));

        const todayStr = todayKST.toISOString().split('T')[0];
        const yesterdayStr = yesterdayKST.toISOString().split('T')[0];
        const todayCount = await this.responseRepository.countResponsesByProjectAndDate(projectUuid, todayStr);
        const yesterdayCount = await this.responseRepository.countResponsesByProjectAndDate(projectUuid, yesterdayStr);
    
        const difference = todayCount - yesterdayCount;
    
        return {
            today_count: todayCount,
            yesterday_count: yesterdayCount,
            difference: difference
        };
    }

}
function getKSTDate() {
    const now = new Date(); 
    const utc = now.getTime(); 
    const kst = new Date(utc + (3600000 * 9)); 
    return kst;
}

