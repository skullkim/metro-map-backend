import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import { User } from '../models/user';
import sendEmailToValidate from '../utils/emailAuth';
import { jsonResponse } from '../utils/jsonResponse/success';
import { UserInformation } from '../utils/type/auth';

const changeUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, prevPassword, newPassword }: UserInformation = req.body;
    const {
      userData: { id: userId },
    } = res.locals;

    if (email) {
      await User.updateUserEmail(userId, email);
      await User.userCheckedEmail(userId, false);
      await sendEmailToValidate(await User.getUser(email));
    }

    if (prevPassword && newPassword) {
      const bcryptPassword: string = await bcrypt.hash(newPassword, 12);
      await User.updateUserPassword(userId, bcryptPassword);
    }

    res.status(204);
    res.json(jsonResponse(req, {}, 204));
  } catch (err) {
    next(err);
  }
};

export default {
  changeUserInformation,
};
