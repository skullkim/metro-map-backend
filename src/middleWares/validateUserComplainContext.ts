import { Request, Response, NextFunction } from 'express';

import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage, UserComplain } from '../utils/type/auth';
import { isValidEmail } from '../utils/validation/auth';

const validateUserComplainContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, subwayLine, userComplainContext }: UserComplain = req.body;

  if (!email || !isValidEmail(email)) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, { message: ErrorMessage.InvalidEmail })
    );
  } else if (!userComplainContext || userComplainContext.length <= 10) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, {
        message: ErrorMessage.ComplainContextIsTooShort,
      })
    );
  } else if (userComplainContext.length >= 301) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, {
        message: ErrorMessage.ComplainContextIsTooLong,
      })
    );
  } else if (!subwayLine || 9 <= subwayLine || subwayLine <= 0) {
    res.status(400);
    return res.json(
      jsonErrorResponse(req, {
        message: ErrorMessage.InvalidSubwayLine,
      })
    );
  }

  next();
};

export default validateUserComplainContext;
