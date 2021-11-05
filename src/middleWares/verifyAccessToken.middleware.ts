import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage } from '../utils/type/auth';

const verifyAccessTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization: string[] | undefined =
      req.headers.authorization?.split(' ');
    const { baseUrl }: { baseUrl: string } = req;

    if (baseUrl === '/path' && !!(authorization && !authorization[0])) {
      return next();
    }
    if (authorization && authorization[0] !== 'Bearer') {
      res.status(401);
      return res.json(
        jsonErrorResponse(req, { message: ErrorMessage.TokenAuth }, 401)
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
        jsonErrorResponse(req, { message: ErrorMessage.TokenExpired }, 403)
      );
    }
    res.status(401);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidToken }, 401)
    );
  }
};

export default verifyAccessTokenMiddleware;
