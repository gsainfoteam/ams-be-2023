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

export class UpdateBlockOptionDto {
  @IsArray()
  @IsOptional()
  options: string[];

  @IsNumber()
  @IsOptional()
  max: number;

  @IsNumber()
  @IsOptional()
  min: number;
}
