import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from './user';

@Entity()
export class AuthEmail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  randomKey!: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId!: User;
}