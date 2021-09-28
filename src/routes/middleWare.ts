import { Request, Response, NextFunction } from 'express';

import { StationFromTo } from '../entity/stationFromTo';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { SearchPath } from '../lib/type/searchPath';

export const validateStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.query as unknown as SearchPath;
    if (!from || !to) {
      const errorMessage = !from ? '출발점이 없습니다' : '도착점이 없습니다';
      return res.json(jsonErrorResponse(req, { message: errorMessage }));
    }
    const fromTarget = await StationFromTo.hasStation(from);
    const toTarget = await StationFromTo.hasStation(to);
    if (!fromTarget || !toTarget) {
      const errorMessage = !fromTarget
        ? '존재하지 않는 출발점입니다'
        : '존재하지 않는 도착점입니다';
      return res.json(jsonErrorResponse(req, { message: errorMessage }));
    }
    next();
  } catch (err) {
    next(err);
  }
};
