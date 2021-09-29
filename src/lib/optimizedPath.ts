import { MinCost } from '../entity/minCost';
import { MinCostValue } from '../entity/minCostValue';
import { MinPath } from '../entity/minPath';
import { MinPathValue } from '../entity/minPathValue';
import { MinTime } from '../entity/minTime';
import { MinTimeValue } from '../entity/minTimeValue';

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
