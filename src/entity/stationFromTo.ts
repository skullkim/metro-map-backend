import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import {MinTimeValue} from './MinTimeValue';

@Entity()
export class StationFromTo {
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
  to!: string

  @OneToMany(() => MinTimeValue, minTimeValue => minTimeValue.station)
  min_time_value!: MinTimeValue[];
}
