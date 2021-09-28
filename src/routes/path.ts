import express, { Router, Request, Response, NextFunction } from 'express';

import { MinCost } from '../entity/minCost';
import { MinCostValue } from '../entity/minCostValue';
import { jsonResponse } from '../lib/jsonResponse/success';

const router: Router = express.Router();

router.get('/cost', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to } = req.query as { from: string; to: string };
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
});

export default router;
