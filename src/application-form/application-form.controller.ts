import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ApplicationFormService } from './application-form.service';
import { ApplicationForm } from './application-form.entity';
import { TextBlock } from 'src/text-block/text-block.entity';

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

    @Get(':uuid/detail')
    async findOneDetail(@Param('uuid') uuid: string): Promise<TextBlock> {
        return this.service.findDetailedOne(uuid);
    }

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        return this.service.update(uuid, data);
    }

    @Delete(':uuid')
    remove(@Param('uuid') uuid: string): Promise<void> {
        return this.service.remove(uuid);
    }

    @Put(':uuid/create-with-blocks')
    async createWithBlocks(
        @Param('uuid') uuid: string,
        @Body('blockNames') blockNames: string[]
    ): Promise<ApplicationForm> {
        const appForm = await this.service.findOne(uuid);
        if (!appForm) {
            throw new NotFoundException(`ApplicationForm with UUID ${uuid} not found`);
        }
        return this.service.createWithBlocks(uuid, blockNames);
    }
}