import express, { Router, Request, Response, NextFunction } from 'express';

import { jsonResponse } from '../lib/jsonResponse/success';
import {
  getOptimizedPath,
  getOptimizedPathWithStopover,
} from '../lib/optimizedPath';
import { MinPathTarget, SearchPath } from '../lib/type/searchPath';

import { validateStation } from './middleWare';

const router: Router = express.Router();

router.get(
  '/:pathTarget',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startStation, arriveStation } = req.query as unknown as SearchPath;
      const { pathTarget } = req.params as unknown as MinPathTarget;
      const resJson = await getOptimizedPath(startStation, arriveStation, pathTarget);

      res.status(200);
      res.json(jsonResponse(req, resJson));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/stopover/:pathTarget',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    const { startStation, stopoverStation, arriveStation } = req.query as unknown as SearchPath;
    const { pathTarget } = req.params as unknown as MinPathTarget;

    try {
      const jsonRes = await getOptimizedPathWithStopover(
        startStation,
        stopoverStation,
        arriveStation,
        pathTarget
      );
      res.status(200);
      res.json(jsonResponse(req, jsonRes));
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
