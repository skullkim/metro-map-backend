import express, { Router, Request, Response, NextFunction } from 'express';

import { jsonResponse } from '../lib/jsonResponse/success';
import {
  getMinCost,
  getMinDistance,
  getMinTime,
  getOptimizedPathWithStopover,
} from '../lib/optimizedPath';
import { MinPathTarget, SearchPath } from '../lib/type/searchPath';

import { validateStation } from './middleWare';

const router: Router = express.Router();

router.get(
  '/cost',
  validateStation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.query as unknown as SearchPath;
      const resJson = await getMinCost(from, to);

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
      const resJson = await getMinTime(from, to);

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
      const resJson = await getMinDistance(from, to);

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
    const { from, stopover, to } = req.query as unknown as SearchPath;
    const { pathTarget } = req.params as unknown as MinPathTarget;

    try {
      const jsonRes = await getOptimizedPathWithStopover(
        from,
        stopover,
        to,
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
