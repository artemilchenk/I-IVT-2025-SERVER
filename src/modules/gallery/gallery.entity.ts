import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.galleries, {
    onDelete: 'CASCADE', // optional: delete galleries when user is deleted
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
