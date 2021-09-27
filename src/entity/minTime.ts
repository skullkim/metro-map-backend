import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinTimeValue } from './minTimeValue';

@Entity()
export class MinTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(() => MinTimeValue, (minTimeValue) => minTimeValue.MTValue)
  minTime!: MinTimeValue;
}
