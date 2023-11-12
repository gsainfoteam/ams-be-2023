import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ApplicationFormService } from './application-form.service';
import { ApplicationForm } from './application-form.entity';
import { TextBlock } from 'src/text-block/text-block.entity';

@Controller('application-form')
export class ApplicationFormController {
    constructor(private readonly service: ApplicationFormService) {}

    // application form 만들기
    @Post()
    create(@Body() data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        return this.service.create(data);
    }

    // 모든 application form 찾기
    @Get()
    findAll(): Promise<ApplicationForm[]> {
        return this.service.findAll();
    }

    // 특정 application form 찾기
    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<ApplicationForm> {
        return this.service.findOne(uuid);
    }

    // 특정 application form의 문항 정보까지 보기
    @Get(':uuid/detail')
    async findOneDetail(@Param('uuid') uuid: string): Promise<TextBlock> {
        return this.service.findDetailedOne(uuid);
    }

    // application form 수정
    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<ApplicationForm>): Promise<ApplicationForm> {
        return this.service.update(uuid, data);
    }

    // application form 삭제
    @Delete(':uuid')
    remove(@Param('uuid') uuid: string): Promise<void> {
        return this.service.remove(uuid);
    }

    // application form의 요소 정보 수정
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