import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { CurrentSearched } from './currentSearched';
import { StationBookMark } from './stationBookMark';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 30,
    nullable: false,
  })
  email!: string;

  @Column({
    length: 2000,
    nullable: false,
  })
  password!: string;

  @OneToMany(() => CurrentSearched, (currentSearched) => currentSearched.user)
  targetUser!: CurrentSearched;

  @OneToMany(() => StationBookMark, (stationBookMark) => stationBookMark.user)
  bookMark!: StationBookMark;
}
