import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
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

  static getMinCostOtherVal(id: number = -1) {
    if (id == -1) return;
    return this.createQueryBuilder('minCostOtherValues')
      .innerJoin('minCostOtherValues.minCostValue', 'minCostValue')
      .where('minCostValue.id = :id', { id })
      .getOne();
  }
}
