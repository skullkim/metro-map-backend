import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

import {StationFromTo} from './stationFromTo';

@Entity()
export class MinTimeValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10
  })
  min_value!: string;

  @ManyToOne(() => StationFromTo, stationFromTo => stationFromTo.min_time_value)
  station!: StationFromTo;
}