import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinPathValue } from './minPathValue';

@Entity()
export class MinPath {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @ManyToOne(() => MinPathValue, (minPathValue) => minPathValue.MPValue)
  minPath!: MinPathValue;
}
