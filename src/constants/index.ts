import { AuthenticatedUser } from '../types/auth';
import { User } from '../modules/user/user.entity';
import { Gallery } from '../modules/gallery/gallery.entity';

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

export const galleryResponseSchema: Omit<Gallery, 'user'> = {
  id: 1,
  title: 'title@example',
  description: 'description.example',
  createdAt: new Date(),
};

export const galleryBodySchema: Pick<Gallery, 'title' | 'description'> = {
  title: 'title.example',
  description: 'description.example',
};

type GalleryBodySchema = typeof galleryBodySchema;

export const galleryAllResponseSchema: GalleryBodySchema[] = [
  galleryBodySchema,
];
