import { NextFunction, Request, Response } from 'express';

import { User } from '../entity/user';
import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage } from '../utils/type/auth';
import { isValidEmail } from '../utils/validation/auth';

const validateEmailMiddleware = async (
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

export default validateEmailMiddleware;
