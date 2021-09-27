import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { MinCost } from './minCost';
import { StationFromTo } from './stationFromTo';

@Entity()
export class MinCostValue {
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

  @OneToMany(() => MinCost, (minCost) => minCost.minCost)
  MCValue!: MinCost[];
}
