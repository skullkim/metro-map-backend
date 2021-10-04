import {BaseEntity, Entity, Column, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';

import { MinTimeValue } from './minTimeValue';

@Entity()
export class MinTimeOtherValues extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  distance!: string;

  @Column({
    length: 10,
    nullable: false,
  })
  cost!: string;

  @OneToOne(() => MinTimeValue)
  @JoinColumn()
  minTimeValue!: string;
}