import { IsEnum, IsString } from 'class-validator';
import { BlockType } from '../type/block.enum';

export class CreateBlockDto {
  @IsEnum(BlockType)
  block_type: BlockType;

  @IsString()
  block_data: string;
}
