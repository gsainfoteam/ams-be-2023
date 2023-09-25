import { IsArray, IsNumber } from 'class-validator';

export class CreateBlockOptionDto {
  @IsArray()
  options: string[];

  @IsNumber()
  max: number;

  @IsNumber()
  min: number;
}
