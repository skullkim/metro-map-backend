import { MinCost } from '../entity/minCost';
import { MinCostValue } from '../entity/minCostValue';
import { MinPath } from '../entity/minPath';
import { MinPathValue } from '../entity/minPathValue';
import { MinTime } from '../entity/minTime';
import { MinTimeValue } from '../entity/minTimeValue';

import { MinPathStopover } from './type/searchPath';

export const getMinCost = async (from: string, to: string) => {
  try {
    const minCostVal: MinCostValue | undefined =
      await MinCostValue.getMinCostValue(from, to);

    const minCostPath: MinCost[] | undefined = await MinCost.getMinCostPath(
      minCostVal?.id
    );

    return {
      min_value: minCostVal?.minValue,
      path: minCostPath,
    };
  } catch (err) {
    throw err;
  }
};

export const getMinTime = async (from: string, to: string) => {
  try {
    const minTimeVal: MinTimeValue | undefined =
      await MinTimeValue.getMinTimeValue(from, to);

    const minTimePath: MinTime[] | undefined = await MinTime.getMinTimePath(
      minTimeVal?.id
    );

    return {
      min_value: minTimeVal?.minValue,
      path: minTimePath,
    };
  } catch (err) {
    throw err;
  }
};

export const getMinDistance = async (from: string, to: string) => {
  try {
    const minDistanceVal: MinPathValue | undefined =
      await MinPathValue.getMinPathValue(from, to);

    const minDistance: MinPath[] | undefined = await MinPath.getMinPath(
      minDistanceVal?.id
    );

    return {
      min_value: minDistanceVal?.minValue,
      path: minDistance,
    };
  } catch (err) {
    throw err;
  }
};

const invalidOption = (err: string) => {
  throw new Error(err);
};

export const combineMinPath = (
  path1: MinPathStopover,
  path2: MinPathStopover
) => {
  const result: MinPathStopover = {};
  result.min_value = (
    +(path1?.min_value ?? '1') + +(path2?.min_value ?? '1')
  ).toString();
  result.path = (path1?.path as Array<MinCost | MinTime | MinPath>).concat(
    path2?.path ?? []
  );
  return result;
};

export const getOptimizedPath = async (
  startStation: string,
  arriveStation: string,
  target: string
) => {
  try {
    switch (target) {
      case 'cost':
        return await getMinCost(startStation, arriveStation);
      case 'time':
        return await getMinTime(startStation, arriveStation);
      case 'distance':
        return await getMinDistance(startStation, arriveStation);
      default:
        return invalidOption('no target');
    }
  } catch (err) {
    throw err;
  }
};

export const getOptimizedPathWithStopover = async (
  startStation: string,
  stopoverStation: string,
  arriveStation: string,
  target: string
) => {
  try {
    let fromStopover: MinPathStopover = {};
    let stopOverTo: MinPathStopover = {};
    switch (target) {
      case 'cost':
        fromStopover = { ...(await getMinCost(startStation, stopoverStation)) };
        stopOverTo = { ...(await getMinCost(stopoverStation, arriveStation)) };
        return combineMinPath(fromStopover, stopOverTo);
      case 'time':
        fromStopover = { ...(await getMinTime(startStation, stopoverStation)) };
        stopOverTo = { ...(await getMinTime(stopoverStation, arriveStation)) };
        return combineMinPath(fromStopover, stopOverTo);
      case 'distance':
        fromStopover = {
          ...(await getMinDistance(startStation, stopoverStation)),
        };
        stopOverTo = {
          ...(await getMinDistance(stopoverStation, arriveStation)),
        };
        return combineMinPath(fromStopover, stopOverTo);
      default:
        return invalidOption('no target');
    }
  } catch (err) {
    throw err;
  }
};
