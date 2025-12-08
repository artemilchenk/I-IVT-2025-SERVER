import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
