import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('v1/answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async createAnswer(@Body() dto: CreateAnswerDto) {
        return this.answerService.createAnswer(dto);
    }

    @Get('block/:blockUuid')
    async getAnswersByBlockUuid(@Param('blockUuid') blockUuid: string) {
        return this.answerService.getAnswersByBlockUuid(blockUuid);
    }

    @Patch(':answerUuid')
    async updateAnswer(@Param('answerUuid') answerUuid: string, @Body() dto: UpdateAnswerDto) {
        return this.answerService.updateAnswer(answerUuid, dto);
    }

    @Delete(':answerUuid')
    async deleteAnswer(@Param('answerUuid') answerUuid: string) {
        return this.answerService.deleteAnswer(answerUuid);
    }
}
