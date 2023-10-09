import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Response } from './response.entity';
import { Answer } from 'src/answer/answer.entity';

@Injectable()
export class ResponseRepository {
    constructor(private readonly entityManager: EntityManager) {}

    async createResponse(data: any): Promise<Response> {
        return this.entityManager.save(Response, data);
    }

    async findOne(data: any): Promise<Response | null> {
        return this.entityManager.findOne(Response, data);
    }

    async findOrCreateResponse(data: any): Promise<Response> {
        let response = await this.findOne(data);
        if (!response) {
            response = await this.createResponse({ 
                user_uuid: data.where.user_uuid,
                answers: [] 
            });
        }
        return response;
    }

    async deleteResponse(responseUuid: string): Promise<void> {
        const response = await this.entityManager.findOne(Response, { where: { response_uuid: responseUuid }, relations: ["answers"] });
        if (response) {
            for (const answer of response.answers) {
                await this.entityManager.remove(Answer, answer);
            }
            await this.entityManager.remove(Response, response);
        }
    }

    async updateResponse(response: Response): Promise<Response> {
        return this.entityManager.save(Response, response);
    }
    
    async getAnswersByUserUuid(userUuid: string): Promise<Answer[]> {
        const response = await this.entityManager.findOne(Response, { where: { user_uuid: userUuid }, relations: ["answers"] });
        if (!response) {
            throw new Error("No response found for the given userUuid");
        }
        return response.answers;
    }
    
}
