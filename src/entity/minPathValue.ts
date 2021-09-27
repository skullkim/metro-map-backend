import {
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
export class MinPathValue {
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
}
