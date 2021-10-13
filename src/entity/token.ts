import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  refreshToken!: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId!: User;
}
