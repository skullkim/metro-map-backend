import { NextFunction, Request, Response } from 'express';
import { SearchPath } from '../lib/type/searchPath';
import { checkEmpty, hasStation, involveChar, isSameStation, StationKr } from '../lib/validation/station';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';


export const validateStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, stopover } = req.query as unknown as SearchPath;

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
      await hasStation(from, StationKr.FROM) ||
      await hasStation(to, StationKr.TO) ||
      await hasStation(stopover, StationKr.STOPOVER);

    const errorMessage =
      emptyStation || sameStation || incorrectStationName || existStation;

    if(errorMessage) {
      res.json(jsonErrorResponse(req, {message: errorMessage}));
    }
    
    next();
  } catch (err) {
    next(err);
  }
};
