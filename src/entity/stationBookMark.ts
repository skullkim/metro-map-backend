import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import {User} from './user';

@Entity()
export class StationBookMark {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  from!: string

  @Column({
    length: 10,
    nullable: false,
  })
  to!: string;

  @ManyToOne(
    () => User,
    (user) => user.bookMark
  )
  user!: User;

}