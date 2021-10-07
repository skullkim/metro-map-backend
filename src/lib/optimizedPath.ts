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
import { MinPathResult, MinPathStopover, PathOtherValue, PathTarget } from './type/searchPath';

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

export const getMinCost = async (from: string, to: string, hasStopover: boolean = false) => {
  try {
    const minCostVal: MinCostValue | undefined =
      await MinCostValue.getMinCostValue(from, to);

    const minCostPath: MinCost[] | undefined = await MinCost.getMinCostPath(
      minCostVal?.id
    );

    const minCostOtherVal: MinCostOtherValues | undefined =
      await MinCostOtherValues.getMinCostOtherVal(minCostVal?.id);

    return {
      cost: addUnitToMoney(minCostVal?.minValue),
      distance: convertDistance(minCostOtherVal?.distance),
      time: convertSecond(minCostOtherVal?.time),
      path: minCostPath,
      min_value: !hasStopover ? '' : minCostVal?.minValue,
      other_value: !hasStopover ? {} : minCostOtherVal,
    };
  } catch (err) {
    throw err;
  }
};

export const getMinTime = async (from: string, to: string, hasStopover: boolean = false) => {
  try {
    const minTimeVal: MinTimeValue | undefined =
      await MinTimeValue.getMinTimeValue(from, to);

    const minTimePath: MinTime[] | undefined = await MinTime.getMinTimePath(
      minTimeVal?.id
    );

    const minTimeOtherVal: MinTimeOtherValues | undefined =
      await MinTimeOtherValues.getMinPathOtherVal(minTimeVal?.id);

    return {
      cost: addUnitToMoney(minTimeOtherVal?.cost),
      distance: convertDistance(minTimeOtherVal?.distance),
      time: convertSecond(minTimeVal?.minValue),
      path: minTimePath,
      min_value: !hasStopover ? '' : minTimeVal?.minValue,
      other_value: !hasStopover ? {} : minTimeOtherVal,
    };
  } catch (err) {
    throw err;
  }
};

export const getMinDistance = async (from: string, to: string, hasStopover: boolean = false) => {
  try {
    const minDistanceVal: MinPathValue | undefined =
      await MinPathValue.getMinPathValue(from, to);

    const minDistance: MinPath[] | undefined = await MinPath.getMinPath(
      minDistanceVal?.id
    );

    const minDistanceOtherVal: MinPathOtherValues | undefined =
      await MinPathOtherValues.getMinPathOtherVal(minDistanceVal?.id);

    return {
      cost: addUnitToMoney(minDistanceOtherVal?.cost),
      distance: convertDistance(minDistanceVal?.minValue),
      time: convertSecond(minDistanceOtherVal?.time),
      path: minDistance,
      min_value: !hasStopover ? '' : minDistanceVal?.minValue,
      other_value: !hasStopover ? {} : minDistanceOtherVal,
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
  const result: MinPathResult = {};
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
  let result: MinPathResult = {};
  const minValue = addStringValue(path1?.min_value, path2?.min_value);
  result.path = (path1?.path as Array<MinCost | MinTime | MinPath>).concat(
    path2?.path ?? []
  );
  result = {...result, ...combineOtherVal(path1?.other_value, path2?.other_value)};
  switch (pathTarget) {
    case PathTarget.COST:
      result.cost = addUnitToMoney(minValue);
      break;
    case PathTarget.TIME:
      result.time = convertSecond(minValue);
      break;
    case PathTarget.DISTANCE:
      result.distance = convertDistance(minValue);
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
        fromStopover = { ...(await getMinCost(startStation, stopoverStation, true)) };
        stopOverTo = { ...(await getMinCost(stopoverStation, arriveStation, true)) };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.COST);
      case PathTarget.TIME:
        fromStopover = { ...(await getMinTime(startStation, stopoverStation, true)) };
        stopOverTo = { ...(await getMinTime(stopoverStation, arriveStation, true)) };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.TIME);
      case PathTarget.DISTANCE:
        fromStopover = {
          ...(await getMinDistance(startStation, stopoverStation, true)),
        };
        stopOverTo = {
          ...(await getMinDistance(stopoverStation, arriveStation, true)),
        };
        return combineMinPath(fromStopover, stopOverTo, PathTarget.DISTANCE);
      default:
        return invalidOption('no target');
    }
  } catch (err) {
    throw err;
  }
};
