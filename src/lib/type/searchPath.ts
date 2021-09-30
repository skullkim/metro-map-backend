import { MinCost } from '../../entity/minCost';
import { MinPath } from '../../entity/minPath';
import { MinTime } from '../../entity/minTime';

export interface SearchPath {
  from: string;
  to: string;
  stopover: string;
}

export interface MinPathTarget {
  pathTarget: string;
}

export interface MinPathStopover {
  min_value?: string;
  path?: Array<MinCost | MinTime | MinPath>;
}
