import { AuthenticatedUser } from '../types/auth';
import { User } from '../modules/user/user.entity';
import { Gallery } from '../modules/gallery/gallery.entity';
import { GalleriesResponse, GalleryBodySchema } from '../types/gallery';

export const user: AuthenticatedUser = {
  id: 1,
  email: 'user@example.com',
  firstname: 'firstName.example.com',
  lastname: 'lastname.example.com',
};

export const updateUser: Pick<User, 'firstname' | 'lastname' | 'email'> = {
  email: 'user@example.com',
  firstname: 'firstName.example.com',
  lastname: 'lastname.example.com',
};

export const galleryResponseSchema: Omit<Gallery, 'user' | 'userId'> = {
  id: '1',
  title: 'title@example',
  description: 'description.example',
  createdAt: new Date(),
};

export const galleryBodySchema: Pick<Gallery, 'title' | 'description'> = {
  title: 'title.example',
  description: 'description.example',
};

export const galleriesResponseSchema: GalleriesResponse = {
  data: [galleryBodySchema],
  meta: {
    page: 1,
    limit: 4,
    total: 57,
  },
};
