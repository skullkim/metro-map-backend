import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { StationFromTo } from './stationFromTo';
import { User } from './user';

@Entity()
export class CurrentSearched {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => StationFromTo, (stationFromTo) => stationFromTo.searched)
  fromTo!: StationFromTo;

  @ManyToOne(() => User, (user) => user.targetUser)
  user!: User;
}
