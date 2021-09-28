import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { MinTimeValue } from './minTimeValue';

@Entity()
export class MinTime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(() => MinTimeValue, (minTimeValue) => minTimeValue.MTValue)
  minTime!: MinTimeValue;

  static getMinTimePath(id: number = -1) {
    if (id == -1) return;
    return this.createQueryBuilder('minTime')
      .leftJoin('minTime.minTime', 'minTimeValue')
      .where('minTimeValue.id = :id', { id })
      .getMany();
  }
}
