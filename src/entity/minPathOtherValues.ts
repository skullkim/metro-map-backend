import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MinPathValue } from './minPathValue';

@Entity()
export class MinPathOtherValues extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  cost!: string;

  @Column({
    length: 10,
    nullable: false,
  })
  time!: string;

  @OneToOne(() => MinPathValue)
  @JoinColumn()
  minPathValue!: MinPathValue;

  static getMinPathOtherVal(id: number = -1) {
    if (id == -1) return;
    return this.createQueryBuilder('minPathOtherValues')
      .innerJoin('minPathOtherValues.minPathValue', 'minPathValue')
      .where('minPathValue.id = :id', { id })
      .getOne();
  }
}
