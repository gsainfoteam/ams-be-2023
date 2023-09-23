import { IsString, IsDate, IsInt, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsDate()
    start_date?: Date;

    @IsOptional()
    @IsDate()
    end_date?: Date;

    @IsOptional()
    @IsString()
    image_url?: string;

    @IsOptional()
    @IsInt()
    recruit_maximum?: number;

    @IsOptional()
    @IsBoolean()
    state?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    block_uuid?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    admin_uuids?: string[];
}
