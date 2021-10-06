import { MinCost } from '../../entity/minCost';
import { MinPath } from '../../entity/minPath';
import { MinTime } from '../../entity/minTime';

export interface SearchPath {
  startStation: string;
  arriveStation: string;
  stopoverStation: string;
}

export interface MinPathTarget {
  pathTarget: string;
}

export interface MinPathStopover {
  min_value?: string;
  path?: Array<MinCost | MinTime | MinPath>;
  other_value?: object;
}

export interface PathOtherValue {
  id?: number;
  cost?: string;
  time?: string;
  distance?: string;
}
export enum StationKr {
  START_STATION = '출발점',
  STOPOVER_STATION = '경유지',
  ARRIVE_STATION = '도착지',
}

export enum PathTarget {
  TIME = 'time',
  DISTANCE = 'distance',
  COST = 'cost',
}