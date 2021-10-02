import { NextFunction, Request, Response } from 'express';

import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { MinPathTarget, SearchPath } from '../lib/type/searchPath';
import {
  checkEmpty,
  checkPathTarget,
  hasStation,
  involveChar,
  isSameStation,
  StationKr,
} from '../lib/validation/station';

export const validateStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, stopover } = req.query as unknown as SearchPath;
    const { pathTarget } = req.params as unknown as MinPathTarget;

    const existPathTarget = checkPathTarget(pathTarget);

    const emptyStation =
      checkEmpty(from, StationKr.FROM) ||
      checkEmpty(to, StationKr.TO) ||
      checkEmpty(stopover, StationKr.STOPOVER);

    const sameStation =
      isSameStation(from, to, StationKr.FROM, StationKr.TO) ||
      isSameStation(from, stopover, StationKr.FROM, StationKr.STOPOVER) ||
      isSameStation(stopover, to, StationKr.STOPOVER, StationKr.TO);

    const incorrectStationName =
      involveChar(from, StationKr.FROM) ||
      involveChar(to, StationKr.TO) ||
      involveChar(stopover, StationKr.STOPOVER);

    const existStation =
      (await hasStation(from, StationKr.FROM)) ||
      (await hasStation(to, StationKr.TO)) ||
      (await hasStation(stopover, StationKr.STOPOVER));

    const errorMessage =
      existPathTarget ||
      emptyStation ||
      sameStation ||
      incorrectStationName ||
      existStation;

    if (errorMessage) {
      res.status(400);
      return res.json(jsonErrorResponse(req, { message: errorMessage }));
    }

    next();
  } catch (err) {
    next(err);
  }
};
