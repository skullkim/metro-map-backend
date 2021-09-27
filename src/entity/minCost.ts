import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinCostValue } from './minCostValue';

@Entity()
export class MinCost extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(() => MinCostValue, (minCostValue) => minCostValue.MCValue)
  minCost!: MinCostValue;

  static getMinCostPath(id: number = -1) {
    if(id == -1) return;
    return this.createQueryBuilder("minCost")
      .innerJoin("minCost.minCost", "minCostValue")
      .where("minCostValue.id = :id", {id})
      .getMany();
  }
}
