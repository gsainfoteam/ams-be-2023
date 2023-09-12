import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>
    ) {}

    async create(data: Partial<Answer>): Promise<Answer> {
        const answer = this.answerRepository.create(data);
        return await this.answerRepository.save(answer);
    }

    async findById(uuid: string): Promise<Answer[]> {
        return await this.answerRepository.find({ where: { answer_uuid: uuid } });
    }
    async findByIds(uuids: string[]): Promise<Answer[]> {
        return await this.answerRepository.find({ where: { answer_uuid: In(uuids) } });
    }
    async deleteById(uuid: string): Promise<void> {
        await this.answerRepository.delete({ answer_uuid: uuid });
    }
}
