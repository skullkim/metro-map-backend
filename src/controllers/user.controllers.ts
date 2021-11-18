import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import { Token } from '../models/token';
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
    const { email, previousPassword, newPassword }: UserInformation = req.body;
    const {
      userData: { id: userId },
    } = res.locals;

    if (email) {
      await User.updateUserEmail(userId, email);
      await User.userCheckedEmail(userId, false);
      await sendEmailToValidate(await User.getUser(email));
    }

    if (previousPassword && newPassword) {
      const bcryptPassword: string = await bcrypt.hash(newPassword, 12);
      await User.updateUserPassword(userId, bcryptPassword);
    }

    req.logOut();
    await Token.deleteRefreshToken(
      req.cookies[`${process.env.JWT_REFRESH_TOKEN}`]
    );
    res.clearCookie(`${process.env.JWT_REFRESH_TOKEN}`);
    res.status(204);
    res.json(jsonResponse(req, {}, 204));
  } catch (err) {
    next(err);
  }
};

const getUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userData: { id: userId },
    } = res.locals;

    const { email: userEmail } = (await User.getUserEmail(
      userId
    )) as unknown as User;

    res.status(200);
    res.json(jsonResponse(req, { email: userEmail }));
  } catch (err) {
    next(err);
  }
};

export default {
  changeUserInformation,
  getUserEmail,
};
