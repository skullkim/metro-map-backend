import { NextFunction, Request, Response } from 'express';

import { User } from '../entity/user';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { ErrorMessage } from '../lib/type/auth';
import { isValidEmail } from '../lib/validation/auth';

const validateEmail = async (
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

export default validateEmail;
