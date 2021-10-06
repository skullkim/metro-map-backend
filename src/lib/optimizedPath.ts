import { MinCost } from '../entity/minCost';
import { MinCostOtherValues } from '../entity/minCostOtherValues';
import { MinCostValue } from '../entity/minCostValue';
import { MinPath } from '../entity/minPath';
import { MinPathOtherValues } from '../entity/minPathOtherValues';
import { MinPathValue } from '../entity/minPathValue';
import { MinTime } from '../entity/minTime';
import { MinTimeOtherValues } from '../entity/minTimeOtherValues';
import { MinTimeValue } from '../entity/minTimeValue';

import {
  addStringValue,
  addUnitToMoney,
  convertDistance,
  convertSecond,
} from './math';
import { MinPathStopover, PathOtherValue, PathTarget } from './type/searchPath';

export const addUnitToOtherValue = (otherValue?: PathOtherValue) => {
  if (otherValue?.cost) {
    otherValue.cost = addUnitToMoney(otherValue.cost);
  }
  if (otherValue?.distance) {
    otherValue.distance = convertDistance(otherValue.distance);
  }
  if (otherValue?.time) {
    otherValue.time = convertSecond(otherValue.time);
  }
  return otherValue;
};

export const getMinCost = async (from: string, to: string) => {
  try {
    const minCostVal: MinCostValue | undefined =
      await MinCostValue.getMinCostValue(from, to);

    const minCostPath: MinCost[] | undefined = await MinCost.getMinCostPath(
      minCostVal?.id
    );

    const minCostOtherVal: MinCostOtherValues | undefined =
      await MinCostOtherValues.getMinCostOtherVal(minCostVal?.id);

    return {
      min_value: addUnitToMoney(minCostVal?.minValue),
      path: minCostPath,
      other_value: addUnitToOtherValue(minCostOtherVal),
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

    const minTimeOtherVal: MinTimeOtherValues | undefined =
      await MinTimeOtherValues.getMinPathOtherVal(minTimeVal?.id);

    return {
      min_value: convertSecond(minTimeVal?.minValue),
      path: minTimePath,
      other_value: addUnitToOtherValue(minTimeOtherVal),
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

    const minDistanceOtherVal: MinPathOtherValues | undefined =
      await MinPathOtherValues.getMinPathOtherVal(minDistanceVal?.id);

    return {
      min_value: convertDistance(minDistanceVal?.minValue),
      path: minDistance,
      other_value: addUnitToOtherValue(minDistanceOtherVal),
    };
  } catch (err) {
    throw err;
  }
};

const invalidOption = (err: string) => {
  throw new Error(err);
};

export const combineOtherVal = (
  pathOtherVal1?: PathOtherValue,
  pathOtherVal2?: PathOtherValue
) => {
  const result: PathOtherValue = {};
  if (pathOtherVal1?.cost && pathOtherVal1?.cost) {
    const cost = addStringValue(pathOtherVal1?.cost, pathOtherVal2?.cost);
    result.cost = addUnitToMoney(cost);
  }
  if (pathOtherVal1?.time && pathOtherVal2?.time) {
    const time = addStringValue(pathOtherVal1?.time, pathOtherVal2?.time);
    result.time = convertSecond(time);
  }
  if (pathOtherVal1?.distance && pathOtherVal2?.distance) {
    const distance = addStringValue(
      pathOtherVal1?.distance,
      pathOtherVal2.distance
    );
    result.distance = convertDistance(distance);
  }
  return result;
};

export const combineMinPath = (
  path1: MinPathStopover,
  path2: MinPathStopover,
  pathTarget: PathTarget
) => {
  const result: MinPathStopover = {};
  const minValue = addStringValue(path1?.min_value, path2?.min_value);
  result.path = (path1?.path as Array<MinCost | MinTime | MinPath>).concat(
    path2?.path ?? []
  );
  result.other_value = combineOtherVal(path1?.other_value, path2?.other_value);
  switch (pathTarget) {
    case PathTarget.COST:
      result.min_value = addUnitToMoney(minValue);
      break;
    case PathTarget.TIME:
      result.min_value = convertSecond(minValue);
      break;
    case PathTarget.DISTANCE:
      result.min_value = convertDistance(minValue);
      break;
    default:
      return invalidOption('no target');
  }
  return result;
};

export const getOptimizedPath = async (
  startStation: string,
  arriveStation: string,
  target: string
) => {
  try {
    switch (target) {
      case PathTarget.COST:
        return await getMinCost(startStation, arriveStation);
      case PathTarget.TIME:
        return await getMinTime(startStation, arriveStation);
      case PathTarget.DISTANCE:
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
      case PathTarget.COST:
        fromStopover = { ...(await getMinCost(startStation, stopoverStation)) };
        stopOverTo = { ...(await getMinCost(stopoverStation, arriveStation)) };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.COST);
      case PathTarget.TIME:
        fromStopover = { ...(await getMinTime(startStation, stopoverStation)) };
        stopOverTo = { ...(await getMinTime(stopoverStation, arriveStation)) };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.TIME);
      case PathTarget.DISTANCE:
        fromStopover = {
          ...(await getMinDistance(startStation, stopoverStation)),
        };
        stopOverTo = {
          ...(await getMinDistance(stopoverStation, arriveStation)),
        };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.DISTANCE);
      default:
        return invalidOption('no target');
    }
  } catch (err) {
    throw err;
  }
};
