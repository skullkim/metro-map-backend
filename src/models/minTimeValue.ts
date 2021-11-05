import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { MinTime } from './minTime';
import { StationFromTo } from './stationFromTo';

@Entity()
export class MinTimeValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  minValue!: string;

  @OneToOne(() => StationFromTo)
  @JoinColumn()
  fromTo!: StationFromTo;

  @OneToMany(() => MinTime, (minTime) => minTime.minTime)
  MTValue!: MinTime[];

  static getMinTimeValue(from: string, to: string) {
    return this.createQueryBuilder('minTimeValue')
      .innerJoin('minTimeValue.fromTo', 'stationFromTo')
      .where('stationFromTo.from = :from', { from })
      .andWhere('stationFromTo.to = :to', { to })
      .getOne();
  }
}
