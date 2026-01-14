import { IsString, IsNotEmpty } from 'class-validator';

export class MovePhotoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  targetContainerId: string;
}
