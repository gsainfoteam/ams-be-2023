import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BlockType } from '../type/block.enum';

export class CreateBlockDto {
  @IsEnum(BlockType)
  block_type: BlockType;

  @IsString()
  block_data: string;
}

export class UpdateBlockDto {
  @IsString()
  @IsOptional()
  block_data: string;

  @IsBoolean()
  @IsOptional()
  mandatory: boolean;
}
