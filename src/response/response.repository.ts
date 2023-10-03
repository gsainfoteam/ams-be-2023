import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Response } from './response.entity';

@Injectable()
export class ResponseRepository {
    constructor(private readonly entityManager: EntityManager) {}

    async createResponse(data: any): Promise<Response> {
        return this.entityManager.save(Response, data);
    }
}
