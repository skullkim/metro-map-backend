import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Token } from '../entity/token';
import { User } from '../entity/user';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { ErrorMessage, SignupData } from '../lib/type/auth';
import { MinPathTarget, SearchPath, StationKr } from '../lib/type/searchPath';
import { isValidEmail, isValidPassword } from '../lib/validation/auth';
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

export const validateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: SignupData = req.body;
  if (!isValidPassword(password)) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidPassword })
    );
  } else if (!isValidEmail(email)) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidEmail })
    );
  }
  next();
};

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email }: { email: string } = req.body;
    const exUser = await User.getUser(email);
    if (!isValidEmail(email) || !exUser) {
      res.status(400);
      return res.json(
        jsonErrorResponse(req, { message: ErrorMessage.InvalidEmail })
      );
    } else if (exUser && exUser.checkedEmail) {
      res.status(409);
      return res.json(
        jsonErrorResponse(
          req,
          { message: ErrorMessage.EmailAlreadyVerified },
          409
        )
      );
    }
    res.locals.exUser = exUser;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization: string[] | undefined =
      req.headers.authorization?.split(' ');
    if (authorization && authorization[0] !== 'Bearer') {
      res.status(401);
      return res.json(
        jsonErrorResponse(req, { message: 'Authentication error' }, 401)
      );
    }
    if (authorization) {
      res.locals.userData = await jwt.verify(
        authorization[1],
        `${process.env.JWT_ACCESS_SECRET}`
      );
    }
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(403);
      return res.json(
        jsonErrorResponse(req, { message: 'token expired' }, 403)
      );
    }
    res.status(401);
    return res.json(jsonErrorResponse(req, { message: 'invalid token' }, 401));
  }
};

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies[`${process.env.JWT_REFRESH_TOKEN}`];
  if(!refreshToken) {
    res.status(401);
    return res.json(jsonErrorResponse(req, {message: 'invalidToken'}, 401));
  }

  const dbRefreshToken = await Token.getRefreshToken(refreshToken);
  if(!dbRefreshToken) {
    res.status(403);
    return res.json(jsonErrorResponse(req, {message: 'token expired'}, 403));
  }
  res.locals.refreshToken = refreshToken;
  next();
}
