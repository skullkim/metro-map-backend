import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LostAndFound extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  station!: string;

  @Column({
    length: 20,
    nullable: false,
  })
  callNumber!: string;

  @Column({
    length: 15,
    nullable: false,
  })
  operatingHour!: string;

  static getLostAndFoundLists() {
    return this.createQueryBuilder('lostAndFound').getMany();
  }
}
