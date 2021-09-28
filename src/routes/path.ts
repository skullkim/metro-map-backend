import express, { Router, Request, Response, NextFunction } from 'express';

import { MinCost } from '../entity/minCost';
import { MinCostValue } from '../entity/minCostValue';
import { MinPath } from '../entity/minPath';
import { MinPathValue } from '../entity/minPathValue';
import { MinTime } from '../entity/minTime';
import { MinTimeValue } from '../entity/minTimeValue';
import { jsonResponse } from '../lib/jsonResponse/success';
import { SearchPath } from '../lib/type/searchPath';

import { validateStation } from './middleWare';

const router: Router = express.Router();

router.get(
  '/cost',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.query as unknown as SearchPath;
      const minCostVal: MinCostValue | undefined =
        await MinCostValue.getMinCostValue(from, to);
      const minCostPath: MinCost[] | undefined = await MinCost.getMinCostPath(
        minCostVal?.id
      );
      const resJson = {
        min_value: minCostVal?.minValue,
        path: minCostPath,
      };
      res.status(200);
      res.json(jsonResponse(req, resJson));
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/time',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.query as unknown as SearchPath;

      const minTimeVal: MinTimeValue | undefined =
        await MinTimeValue.getMinTimeValue(from, to);

      const minTimePath: MinTime[] | undefined = await MinTime.getMinTimePath(
        minTimeVal?.id
      );

      const resJson = {
        min_value: minTimeVal?.minValue,
        path: minTimePath,
      };

      res.status(200);
      res.json(jsonResponse(req, resJson));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/distance',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.query as unknown as SearchPath;

      const minDistanceVal: MinPathValue | undefined =
        await MinPathValue.getMinPathValue(from, to);

      const minDistance: MinPath[] | undefined = await MinPath.getMinPath(
        minDistanceVal?.id
      );

      const resJson = {
        min_value: minDistanceVal?.minValue,
        path: minDistance,
      };

      res.status(200);
      res.json(jsonResponse(req, resJson));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
