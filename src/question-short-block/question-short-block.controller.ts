import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestionShortBlockService } from './question-short-block.service';
import { QuestionShortBlock } from './question-short-block.entity';
import { AnswerService } from 'src/answer/answer.service';
import { Answer } from 'src/answer/answer.entity';

@Controller('question-short-block')
export class QuestionShortBlockController {
    constructor(
        private readonly service: QuestionShortBlockService,
        private readonly answerService: AnswerService
    ) {}

    // question short block 수정
    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() data: Partial<QuestionShortBlock>): Promise<QuestionShortBlock> {
        return this.service.update(uuid, data);
    }

    // asnwer 달기
    @Post(':uuid/answer/:nickname')
    async createAnswer(
        @Param('uuid') questionUuid: string,
        @Param('nickname') nickname: string,
        @Body() answerData: Partial<Answer>
    ): Promise<Answer> {
        answerData.temporary_user = nickname;
        const createdAnswer = await this.answerService.create(answerData);
        const question = await this.service.findOne(questionUuid);
        if (question.answer_id) {
            question.answer_id.push(createdAnswer.answer_uuid);
        } else {
            question.answer_id = [createdAnswer.answer_uuid];
        }
        await this.service.update(questionUuid, question);

        return createdAnswer;
    }

    // question short block에 달린 모든 답변 보기
    @Get(':uuid/answers')
    async getAnswers(@Param('uuid') questionUuid: string): Promise<Answer[]> {
        return this.service.getAnswersForQuestion(questionUuid);
    }
}
