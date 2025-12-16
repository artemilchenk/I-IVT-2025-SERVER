import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gallery } from './gallery.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalFilename: string;

  @Column()
  galleryId: string;

  @ManyToOne(() => Gallery, (gallery) => gallery.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'galleryId' })
  gallery: Gallery;

  @CreateDateColumn()
  createdAt: Date;
}
