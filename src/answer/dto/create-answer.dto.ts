import { IsObject } from 'class-validator';

export class CreateAnswerDto {
    @IsObject()
    answer_data: object;
    block_uuid: string;
    user_uuid: string;
}
