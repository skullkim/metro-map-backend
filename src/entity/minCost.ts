import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import {MinCostValue} from './minCostValue';

@Entity()
export class MinCost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(
    () => MinCostValue ,
    (minCostValue) => minCostValue.MCValue
  )
  minCost!: MinCostValue;

}