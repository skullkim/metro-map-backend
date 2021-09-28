import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { CurrentSearched } from './currentSearched';

@Entity()
export class StationFromTo extends BaseEntity {
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

  static hasStation(station: string) {
    return this.createQueryBuilder('stationFromTo')
      .where('stationFromTo.from = :station', { station })
      .getOne();
  }
}
