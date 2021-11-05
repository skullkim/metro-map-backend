import { NextFunction, Request, Response } from 'express';

import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage, SignupData } from '../utils/type/auth';
import { isValidEmail, isValidPassword } from '../utils/validation/auth';

const validateUserInfoMiddleware = (
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

export default validateUserInfoMiddleware;
