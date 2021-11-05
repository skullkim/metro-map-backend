import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import { User } from './user';

@Entity()
export class StationBookMark extends BaseEntity {
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

  @Column({
    length: 10,
    nullable: true,
  })
  stopover!: string;

  @ManyToOne(() => User, (user) => user.bookMark)
  user!: User;

  static getBookMark(
    userId: number,
    from: string,
    to: string,
    stopover: string
  ) {
    return this.createQueryBuilder('stationBookMark')
      .innerJoin('stationBookMark.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('stationBookMark.from = :from', { from })
      .andWhere('stationBookMark.to = :to', { to })
      .andWhere('stationBookMark.stopover = :stopover', { stopover })
      .getOne();
  }

  static async setBookMark(
    userEmail: string,
    from: string,
    to: string,
    stopover: string
  ) {
    const user = await User.getUser(userEmail);
    return this.createQueryBuilder('stationBookMark')
      .insert()
      .into(StationBookMark)
      .values({
        from,
        to,
        stopover,
        user,
      })
      .execute();
  }

  static async deleteBookMark(
    userId: number,
    from: string,
    to: string,
    stopover: string
  ) {
    return this.createQueryBuilder('stationBookMark')
      .delete()
      .from(StationBookMark)
      .where('user.id = :userId', { userId })
      .andWhere('from = :from', { from })
      .andWhere('to = :to', { to })
      .andWhere('stopover = :stopover', { stopover })
      .execute();
  }
}
