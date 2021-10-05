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
}
