import { IsString, IsInt, IsArray, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsDateString()
    start_date: Date;

    @IsNotEmpty()
    @IsDateString()
    end_date: Date;

    @IsOptional()
    @IsString()
    image_url?: string;

    @IsOptional()
    @IsInt()
    recruit_maximum?: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    block_uuid: string[];

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    admin_uuids: string[];
}
