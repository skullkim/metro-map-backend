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
    const numRegx = /^[0-9]*$/;
    const isFromNum = from.match(numRegx);
    const isToNum = to.match(numRegx);
    let errorMessage = '';

    if (!from || !to) {
      errorMessage = !from ? '출발점이 없습니다' : '도착점이 없습니다';
    } else if (from.length >= 5 || to.length >= 5 || !isFromNum || !isToNum) {
      errorMessage =
        from.length >= 5 || !isFromNum
          ? '존재하지 않는 출발점입니다'
          : '존재하지 않는 도착점입니다';
    } else if (from == to) {
      errorMessage = '도착점과 출발점을 같을 수 없습니다';
    }

    if (errorMessage) {
      return res.json(jsonErrorResponse(req, { message: errorMessage }));
    }

    const fromTarget = await StationFromTo.hasStation(from);
    const toTarget = await StationFromTo.hasStation(to);
    if (!fromTarget || !toTarget) {
      errorMessage = !fromTarget
        ? '존재하지 않는 출발점입니다'
        : '존재하지 않는 도착점입니다';
      return res.json(jsonErrorResponse(req, { message: errorMessage }));
    }
    next();
  } catch (err) {
    next(err);
  }
};
