import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StationFromTo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  from!: string;

  @Column({
    length: 10,
    nullable: false,
  })
  to!: string;

}
