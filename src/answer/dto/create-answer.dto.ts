import { IsObject, IsString } from 'class-validator';

export class CreateAnswerDto {
    @IsObject()
    answer_data: object;

    @IsString()
    block_uuid: string;

    @IsString()
    user_uuid: string;

    @IsString()
    project_uuid: string;
}
