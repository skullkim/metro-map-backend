import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { CurrentSearched } from './currentSearched';

@Entity()
export class StationFromTo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  from!: string;

  @Column({
    length: 10,
    nullable: false,
  })
  to!: string;

  @OneToMany(() => CurrentSearched, (currentSearched) => currentSearched.fromTo)
  searched!: CurrentSearched;
}
