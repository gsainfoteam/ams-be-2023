import { IsObject } from 'class-validator';

export class UpdateAnswerDto {
    @IsObject()
    answer_data: object;
}