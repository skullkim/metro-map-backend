import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StationFromTo extends BaseEntity {
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

  static hasStation(station: string) {
    return this.createQueryBuilder('stationFromTo')
      .where('stationFromTo.from = :station', { station })
      .getOne();
  }
}
