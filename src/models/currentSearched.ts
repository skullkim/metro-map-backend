import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { User } from './user';

@Entity()
export class CurrentSearched {
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
  })
  stopover!: string;

  @Column()
  bookmark!: boolean;

  @ManyToOne(() => User, (user) => user.targetUser)
  user!: User;
}
