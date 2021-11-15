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

  @Column({
    length: 10,
    nullable: false,
  })
  target!: string;

  @ManyToOne(() => User, (user) => user.bookMark)
  user!: User;

  static getBookMark(
    userId: number,
    from: string,
    to: string,
    stopover: string,
    target: string
  ) {
    return this.createQueryBuilder('stationBookMark')
      .innerJoin('stationBookMark.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('stationBookMark.from = :from', { from })
      .andWhere('stationBookMark.to = :to', { to })
      .andWhere('stationBookMark.stopover = :stopover', { stopover })
      .andWhere('stationBookMark.target = :target', { target })
      .getOne();
  }

  static getBookMarks(userId: number) {
    return this.createQueryBuilder('stationBookMark')
      .innerJoin('stationBookMark.user', 'user')
      .where('user.id = userId', { userId })
      .getMany();
  }

  static async setBookMark(
    userEmail: string,
    from: string,
    to: string,
    stopover: string,
    target: string
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
        target,
      })
      .execute();
  }

  static async deleteBookMark(
    userId: number,
    from: string,
    to: string,
    stopover: string,
    target: string
  ) {
    return this.createQueryBuilder('stationBookMark')
      .delete()
      .from(StationBookMark)
      .where('user.id = :userId', { userId })
      .andWhere('from = :from', { from })
      .andWhere('to = :to', { to })
      .andWhere('stopover = :stopover', { stopover })
      .andWhere('target = :target', { target })
      .execute();
  }
}
