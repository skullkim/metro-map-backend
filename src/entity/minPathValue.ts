import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';

import {StationFromTo} from './stationFromTo';
import {MinPath} from './minPath';

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

  @OneToMany(
    () => MinPath,
    (minPath) => minPath.minPath
  )
  MPValue!: MinPath;

}