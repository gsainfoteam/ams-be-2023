import { Injectable } from '@nestjs/common';
import { EntityManager, LessThan, MoreThanOrEqual } from 'typeorm';
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

    async findOrCreateResponse(userUuid: string, projectUuid: string): Promise<Response> {
        let response = await this.findOne({ where: { user_uuid: userUuid, project_uuid: projectUuid }, relations: ["answers"] });
        if (!response) {
            response = await this.createResponse({ 
                user_uuid: userUuid,
                project_uuid: projectUuid, 
                answers: [] 
            });
        }
        return response;
    }

    async deleteResponse(userUuid: string, projectUuid: string): Promise<void> {
        const response = await this.entityManager.findOne(Response, {
            where: {
                user_uuid: userUuid,
                project_uuid: projectUuid
            }
        });
    
        if (response) {
            await this.entityManager.remove(Response, response);
        } else {
            throw new Error("No response found for the provided userUuid and projectUuid");
        }
    }

    async updateResponse(response: Response): Promise<Response> {
        return this.entityManager.save(Response, response);
    }
    
    async getAnswersByUserUuid(userUuid: string, projectUuid: string): Promise<Answer[]> {
        const response = await this.entityManager.findOne(Response, {
            where: {
                user_uuid: userUuid,
                project_uuid: projectUuid
            },
            relations: ["answers"]
        });
    
        if (!response) {
            throw new Error("No response found for the given userUuid and projectUuid");
        }
        return response.answers;
    }
    
    async countResponsesByProjectAndDate(projectUuid: string, date: string): Promise<number> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
    
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
    
        return this.entityManager.createQueryBuilder(Response, 'response')
            .where('response.project_uuid = :projectUuid', { projectUuid })
            .andWhere('response.created_at >= :startDate', { startDate })
            .andWhere('response.created_at < :endDate', { endDate })
            .getCount();
    }
}
