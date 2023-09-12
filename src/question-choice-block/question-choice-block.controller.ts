import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestionChoiceBlockService } from './question-choice-block.service';
import { QuestionChoiceBlock } from './question-choice-block.entity';

@Controller('question-choice-block')
export class QuestionChoiceBlockController {
    constructor(private readonly service: QuestionChoiceBlockService) {}

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<QuestionChoiceBlock>): Promise<QuestionChoiceBlock> {
        return this.service.update(uuid, data);
    }
}
