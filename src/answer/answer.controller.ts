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

    @Get('user/:userUuid')
    async getAnswersByUserUuid(@Param('userUuid') userUuid: string) {
        return this.answerService.getAnswersByUserUuid(userUuid);
    }

    @Get('block/:blockUuid')
    async getAnswersByBlockUuid(@Param('blockUuid') blockUuid: string) {
        return this.answerService.getAnswersByBlockUuid(blockUuid);
    }

    @Patch(':answerUuid')
    async updateAnswer(@Param('answerUuid') answerUuid: string, @Body() dto: UpdateAnswerDto) {
        return this.answerService.updateAnswer(answerUuid, dto);
    }

    @Delete('user/:userUuid')
    async deleteAnswersByUserUuid(@Param('userUuid') userUuid: string) {
        return this.answerService.deleteAnswersByUserUuid(userUuid);
    }
}
