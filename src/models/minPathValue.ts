import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { MinPath } from './minPath';
import { StationFromTo } from './stationFromTo';

@Entity()
export class MinPathValue extends BaseEntity {
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

  @OneToMany(() => MinPath, (minPath) => minPath.minPath)
  MPValue!: MinPath;

  static getMinPathValue(from: string, to: string) {
    return this.createQueryBuilder('minPathValue')
      .innerJoin('minPathValue.fromTo', 'stationFromTo')
      .where('stationFromTo.from = :from', { from })
      .andWhere('stationFromTo.to = :to', { to })
      .getOne();
  }
}
