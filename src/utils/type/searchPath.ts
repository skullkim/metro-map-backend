import { MinCost } from '../../models/minCost';
import { MinPath } from '../../models/minPath';
import { MinTime } from '../../models/minTime';

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

export interface MinPathResult {
  cost?: string;
  distance?: string;
  time?: string;
  path?: Array<MinCost | MinTime | MinPath>;
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
