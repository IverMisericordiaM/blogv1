import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  CDescription: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  CPhoto: string;
}
