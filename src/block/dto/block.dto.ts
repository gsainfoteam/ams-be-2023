import { IsString } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  block_type: string;

  @IsString()
  block_data: string;
}
