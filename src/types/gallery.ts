import { Photo } from '../modules/gallery/photo.entity';
import { galleryBodySchema } from '../constants';
import { Gallery } from '../modules/gallery/gallery.entity';

export type PhotoDto = Pick<Photo, 'path' | 'galleryId' | 'originalFilename'>;
export type GalleryBodySchema = typeof galleryBodySchema;
export interface GalleriesResponse {
  data: GalleryBodySchema[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

type GalleryColumnKey = keyof Omit<Gallery, 'user' | 'images'>;
export type GalleryOrder = Partial<Record<GalleryColumnKey, 'ASC' | 'DESC'>>;
