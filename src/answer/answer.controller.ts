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

    @Get(':projectUuid/user/:userUuid')
    async getAnswersByUserUuid(
        @Param('userUuid') userUuid: string,
        @Param('projectUuid') projectUuid: string
    ) {
        return this.answerService.getAnswersByUserUuid(userUuid, projectUuid);
    }

    @Get('block/:blockUuid')
    async getAnswersByBlockUuid(@Param('blockUuid') blockUuid: string) {
        return this.answerService.getAnswersByBlockUuid(blockUuid);
    }

    @Patch(':answerUuid')
    async updateAnswer(@Param('answerUuid') answerUuid: string, @Body() dto: UpdateAnswerDto) {
        return this.answerService.updateAnswer(answerUuid, dto);
    }

    @Delete(':projectUuid/user/:userUuid')
    async deleteAnswersByUserUuid(
        @Param('userUuid') userUuid: string,
        @Param('projectUuid') projectUuid: string
    ) {
        return this.answerService.deleteAnswersByUserUuid(userUuid, projectUuid);
    }

    @Get('responsenum/:projectUuid/:date')
    async getResponseNum(
        @Param('projectUuid') projectUuid: string,
        @Param('date') date: string
    ): Promise<{ response_num: number }> {
        return this.answerService.getResponseCountByProjectAndDate(projectUuid, date);
    }

    @Get('responsenum/:projectUuid')
    async getTodayYesterdayResponseDifference(
        @Param('projectUuid') projectUuid: string
    ): Promise<{ today_count: number, yesterday_count: number, difference: number }> {
        return this.answerService.getTodayYesterdayResponseCounts(projectUuid);
    }

}
