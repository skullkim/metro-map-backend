import {
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
export class MinTimeValue {
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
}
