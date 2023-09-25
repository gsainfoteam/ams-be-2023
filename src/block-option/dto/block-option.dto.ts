import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateBlockOptionDto {
  @IsArray()
  options: string[];

  @IsNumber()
  @IsOptional()
  max: number;

  @IsNumber()
  @IsOptional()
  min: number;
}
