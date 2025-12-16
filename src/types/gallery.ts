import { Photo } from '../modules/gallery/photo.entity';

export type PhotoDto = Pick<Photo, 'path' | 'galleryId' | 'originalFilename'>;
