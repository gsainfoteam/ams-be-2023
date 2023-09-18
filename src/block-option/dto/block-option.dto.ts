import { IsArray, IsNumber } from 'class-validator';

export class CreateBlockOptionDto {
  @IsArray()
  option: string[];

  @IsNumber()
  max: number;

  @IsNumber()
  min: number;
}
