import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestionShortBlockService } from './question-short-block.service';
import { QuestionShortBlock } from './question-short-block.entity';

@Controller('question-short-block')
export class QuestionShortBlockController {
    constructor(private readonly service: QuestionShortBlockService) {}

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<QuestionShortBlock>): Promise<QuestionShortBlock> {
        return this.service.update(uuid, data);
    }
}
