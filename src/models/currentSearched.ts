import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';

import { User } from './user';

@Entity()
export class CurrentSearched extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 10,
    nullable: false,
  })
  target!: string;

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
    default: false,
  })
  bookmark!: boolean;

  @ManyToOne(() => User, (user) => user.targetUser)
  user!: User;

  static async setSearchHistory(
    from: string,
    to: string,
    stopover: string,
    target: string,
    user: User
  ) {
    try {
      const prevHistory = await CurrentSearched.getUserSearchHistory(user.id);
      if (prevHistory.length > 6) {
        await CurrentSearched.deleteSearchHistory(prevHistory[0].id);
      }
      return await this.createQueryBuilder('currentSearched')
        .insert()
        .into(CurrentSearched)
        .values({ from, to, stopover, target, user })
        .execute();
    } catch (err) {
      return err;
    }
  }

  static getBookMark(id: number) {
    return this.createQueryBuilder('currentSearched')
      .where('currentSearched.id = :id', { id })
      .getOne();
  }

  static async checkBookmark(id: number) {
    try {
      const prevBookmark: boolean | undefined = (
        await CurrentSearched.getBookMark(id)
      )?.bookmark;
      return await this.createQueryBuilder('currentSearched')
        .update(CurrentSearched)
        .set({ bookmark: !prevBookmark })
        .where('id = :id', { id })
        .execute();
    } catch (err) {
      return err;
    }
  }

  static getUserSearchHistory(userId: number) {
    return this.createQueryBuilder('currentSearched')
      .innerJoin('currentSearched.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('currentSearched.id', 'ASC')
      .getMany();
  }

  static deleteSearchHistory(id: number) {
    return this.createQueryBuilder('currentSearched')
      .delete()
      .from(CurrentSearched)
      .where('id = :id', { id })
      .execute();
  }
}
