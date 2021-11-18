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
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  refreshToken!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  static setRefreshToken(user: User | undefined, refreshToken: string) {
    return this.createQueryBuilder('token')
      .insert()
      .into(Token)
      .values({ user, refreshToken })
      .execute();
  }

  static getRefreshToken(refreshToken: string) {
    return this.createQueryBuilder('token')
      .where('Token.refreshToken = :refreshToken', { refreshToken })
      .getOne();
  }

  static isRefreshTokenExist(userId: number) {
    return this.createQueryBuilder('token')
      .innerJoin('token.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  static deleteRefreshToken(refreshToken: string) {
    return this.createQueryBuilder('token')
      .delete()
      .from(Token)
      .where('refreshToken = :refreshToken', { refreshToken })
      .execute();
  }
}
