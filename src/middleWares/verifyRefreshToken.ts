import { NextFunction, Request, Response } from 'express';

import { Token } from '../entity/token';
import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage } from '../utils/type/auth';

const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies[`${process.env.JWT_REFRESH_TOKEN}`];
  if (!refreshToken) {
    res.status(401);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidToken }, 401)
    );
  }

  const dbRefreshToken = await Token.getRefreshToken(refreshToken);
  if (!dbRefreshToken) {
    res.status(403);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.TokenExpired }, 403)
    );
  }
  res.locals.refreshToken = refreshToken;
  next();
};

export default verifyRefreshToken;
