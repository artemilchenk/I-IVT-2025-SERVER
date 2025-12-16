import { IsString, IsNotEmpty } from 'class-validator';

export class UploadPhotoDto {
  @IsString()
  @IsNotEmpty()
  buffer: string;
}
