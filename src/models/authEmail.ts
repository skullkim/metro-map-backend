import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user';

@Entity()
export class AuthEmail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  randomKey!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  static setRandomKey(user: User | undefined, randomKey: string) {
    return this.createQueryBuilder('authEmail')
      .insert()
      .into(AuthEmail)
      .values({ user, randomKey })
      .execute();
  }

  static isValidKey(key: string, userId: number) {
    return this.createQueryBuilder('authEmail')
      .innerJoin('authEmail.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('randomKey = :key', { key })
      .getOne();
  }

  static deleteRandomKey(id: number) {
    return this.createQueryBuilder('authEmail')
      .delete()
      .from(AuthEmail)
      .where('id = :id', { id })
      .execute();
  }
}
