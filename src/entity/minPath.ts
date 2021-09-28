import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { MinPathValue } from './minPathValue';

@Entity()
export class MinPath extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(() => MinPathValue, (minPathValue) => minPathValue.MPValue)
  minPath!: MinPathValue;

  static getMinPath(id: number = -1) {
    if(id == -1) return;
    return this.createQueryBuilder('minPath')
      .innerJoin('minPath.minPath', 'minPathValue')
      .where('minPathValue.id = :id', {id})
      .getMany();
  }
}
