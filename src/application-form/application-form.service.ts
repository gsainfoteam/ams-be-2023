import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationForm } from './application-form.entity';

@Injectable()
export class ApplicationFormService {
    constructor(
      @InjectRepository(ApplicationForm)
      private applicationFormRepository: Repository<ApplicationForm>,
    ) {}

    async create(data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        const applicationForm = this.applicationFormRepository.create(data);
        return await this.applicationFormRepository.save(applicationForm);
    }

    async findAll(): Promise<ApplicationForm[]> {
        return await this.applicationFormRepository.find();
    }

    async findOne(uuid: string): Promise<ApplicationForm> {
        const applicationForm = await this.applicationFormRepository.findOne({
            where: { application_uuid: uuid }
        });
        if (!applicationForm) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
        return applicationForm;
    }

    async update(uuid: string, data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        await this.applicationFormRepository.update(uuid, data);
        return this.findOne(uuid);
    }

    async remove(uuid: string): Promise<void> {
        await this.applicationFormRepository.delete(uuid);
    }
}