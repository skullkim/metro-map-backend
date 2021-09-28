import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { MinCost } from './minCost';
import { StationFromTo } from './stationFromTo';

@Entity()
export class MinCostValue extends BaseEntity {
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

  static getMinCostValue(from: string, to: string) {
    return this.createQueryBuilder('minCostValue')
      .innerJoin('minCostValue.fromTo', 'stationFromTo')
      .where('stationFromTo.from = :from', { from })
      .andWhere('stationFromTo.to = :to', { to })
      .getOne();
  }
}
