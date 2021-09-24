import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';

import {StationFromTo} from './stationFromTo';
import {MinCost} from './minCost';

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

  @OneToMany(
    () => MinCost,
    (minCost) => minCost.minCost
  )
  MCValue!: MinCost[];
}