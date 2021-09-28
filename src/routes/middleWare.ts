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
    const { from, to, stopover } = req.query as unknown as SearchPath;
    const numRegx = /^[0-9]*$/;
    const isFromNum = from.match(numRegx);
    const isToNum = to.match(numRegx);
    const isStopoverNum = stopover?.match(numRegx);

    let errorMessage = '';

    if (!from || !to || (req.originalUrl.includes('stopover') && !stopover)) {
      if (!stopover) {
        errorMessage = '경유지가 없습니다';
      } else {
        errorMessage = !from ? '출발점이 없습니다' : '도착점이 없습니다';
      }
    } else if (
      from.length >= 5 ||
      to.length >= 5 ||
      stopover?.length >= 5 ||
      !isFromNum ||
      !isToNum ||
      (stopover && !isStopoverNum)
    ) {
      if (from.length >= 5 || !isFromNum) {
        errorMessage = '존재하지 않는 출발점입니다';
      } else if (stopover && (stopover.length >= 5 || !isStopoverNum)) {
        errorMessage = '존재하지 않는 경유지 입니다';
      } else if (to.length >= 5 || !isToNum) {
        errorMessage = '존재하지 않는 도착점 입니다';
      }
      errorMessage =
        from.length >= 5 || !isFromNum
          ? '존재하지 않는 출발점입니다'
          : '존재하지 않는 도착점입니다';
    } else if (from == to) {
      errorMessage = '도착점과 출발점을 같을 수 없습니다';
    } else if (stopover && (from == stopover || to == stopover)) {
      errorMessage =
        from == stopover
          ? '출발점과 경유지가 같을 수 없습니다'
          : '도착점과 경유지가 같을 수 없습니다';
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
