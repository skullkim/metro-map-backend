import { NextFunction, Request, Response } from 'express';

import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { ErrorMessage, SignupData } from '../lib/type/auth';
import { isValidEmail, isValidPassword } from '../lib/validation/auth';

const validateUserInfo = (req: Request, res: Response, next: NextFunction) => {
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

export default validateUserInfo;
