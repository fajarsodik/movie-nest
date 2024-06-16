import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @MinLength(2, { message: 'title must have at least 2 characters' })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(2, { message: 'description must have at least 2 characters' })
  @IsNotEmpty()
  description: string;

  @IsString()
  @MinLength(2, { message: 'image_thumbnail must have at least 2 characters' })
  @IsNotEmpty()
  image_thumbnail: string;
}
