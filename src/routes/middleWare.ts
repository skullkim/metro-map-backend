import { NextFunction, Request, Response } from 'express';

import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { ErrorMessage } from '../lib/type/auth';
import { MinPathTarget, SearchPath, StationKr } from '../lib/type/searchPath';
import { isValidPassword } from '../lib/validation/auth';
import {
  checkEmpty,
  checkPathTarget,
  hasStation,
  involveChar,
  isSameStation,
} from '../lib/validation/station';

export const validateStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startStation, arriveStation, stopoverStation } =
      req.query as unknown as SearchPath;
    const { pathTarget } = req.params as unknown as MinPathTarget;

    const existPathTarget = checkPathTarget(pathTarget);

    const emptyStation =
      checkEmpty(startStation, StationKr.START_STATION) ||
      checkEmpty(arriveStation, StationKr.ARRIVE_STATION) ||
      checkEmpty(stopoverStation, StationKr.STOPOVER_STATION);

    const sameStation =
      isSameStation(
        startStation,
        arriveStation,
        StationKr.START_STATION,
        StationKr.ARRIVE_STATION
      ) ||
      isSameStation(
        startStation,
        stopoverStation,
        StationKr.START_STATION,
        StationKr.STOPOVER_STATION
      ) ||
      isSameStation(
        stopoverStation,
        arriveStation,
        StationKr.STOPOVER_STATION,
        StationKr.ARRIVE_STATION
      );

    const incorrectStationName =
      involveChar(startStation, StationKr.START_STATION) ||
      involveChar(arriveStation, StationKr.ARRIVE_STATION) ||
      involveChar(stopoverStation, StationKr.STOPOVER_STATION);

    const existStation =
      (await hasStation(startStation, StationKr.START_STATION)) ||
      (await hasStation(arriveStation, StationKr.ARRIVE_STATION)) ||
      (await hasStation(stopoverStation, StationKr.STOPOVER_STATION));

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

export const validatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password }: { password: string } = req.body;
  if (!isValidPassword(password)) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidPassword })
    );
  }
  next();
};
