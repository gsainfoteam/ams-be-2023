import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApplicationFormService } from './application-form.service';
import { ApplicationForm } from './application-form.entity';

@Controller('application-form')
export class ApplicationFormController {
    constructor(private readonly service: ApplicationFormService) {}

    @Post()
    create(@Body() data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        return this.service.create(data);
    }

    @Get()
    findAll(): Promise<ApplicationForm[]> {
        return this.service.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<ApplicationForm> {
        return this.service.findOne(uuid);
    }

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        return this.service.update(uuid, data);
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string): Promise<void> {
        return this.service.remove(uuid);
    }
}