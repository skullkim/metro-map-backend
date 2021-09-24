import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';

import { StationFromTo } from './stationFromTo';
import { MinTime } from './minTime';

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

  @OneToMany(
    () => MinTime,
    (minTime) => minTime.minTime
  )
  MTValue!: MinTime[];

}
