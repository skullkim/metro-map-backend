import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import { User } from '../models/user';
import { jsonErrorResponse } from '../utils/jsonResponse/fail';
import { ErrorMessage, UserInformation } from '../utils/type/auth';
import { isValidEmail, isValidPassword } from '../utils/validation/auth';

const validateChangeUserInformationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, previousPassword, newPassword }: UserInformation = req.body;
    const {
      userData: { email: userEmail },
    } = res.locals;

    if (email) {
      const hasSameEmail = await User.getUser(email);
      if (hasSameEmail) {
        res.status(400);
        return res.json(
          jsonErrorResponse(req, { message: ErrorMessage.SameEmail })
        );
      }

      if (!isValidEmail(email)) {
        res.status(400);
        return res.json(
          jsonErrorResponse(req, { message: ErrorMessage.InvalidEmail })
        );
      }
    }

    if (previousPassword && newPassword) {
      const exUser = await User.getUser(userEmail);

      const isValidPrevPassword = await bcrypt.compare(
        previousPassword,
        exUser!.password
      );

      if (!isValidPrevPassword) {
        res.status(400);
        return res.json(
          jsonErrorResponse(req, { message: ErrorMessage.InvalidPrevPassword })
        );
      }

      if (!isValidPassword(previousPassword)) {
        res.status(400);
        return res.json(
          jsonErrorResponse(req, { message: ErrorMessage.InvalidPassword })
        );
      }
    } else if (
      (!previousPassword && newPassword) ||
      (previousPassword && !newPassword)
    ) {
      res.status(400);
      return res.json(
        jsonErrorResponse(req, { message: ErrorMessage.CantChangePassword })
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default validateChangeUserInformationMiddleware;
