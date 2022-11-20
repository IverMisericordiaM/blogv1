import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  PTitulo: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  PResumen: string;

  @IsString()
  @MinLength(3)
  @MaxLength(300)
  PDescripcion: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  PLugar: string;

  @IsString()
  @IsUUID()
  IdCategoria: string;
}
