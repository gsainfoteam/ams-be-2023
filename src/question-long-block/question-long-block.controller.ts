import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestionLongBlockService } from './question-long-block.service';
import { QuestionLongBlock } from './question-long-block.entity';

@Controller('question-long-block')
export class QuestionLongBlockController {
    constructor(private readonly service: QuestionLongBlockService) {}

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<QuestionLongBlock>): Promise<QuestionLongBlock> {
        return this.service.update(uuid, data);
    }
}
