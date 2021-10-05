import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { MinCostValue } from './minCostValue';

@Entity()
export class MinCostOtherValues extends BaseEntity {
  @PrimaryGeneratedColumn()
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
  time!: string;

  @OneToOne(() => MinCostValue)
  @JoinColumn()
  minCostValue!: MinCostValue;
}
