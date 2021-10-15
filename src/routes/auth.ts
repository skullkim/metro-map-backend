import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';

import { AuthEmail } from '../entity/authEmail';
import { User } from '../entity/user';
import sendEmailToValidate from '../lib/emailAuth';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { jsonResponse } from '../lib/jsonResponse/success';
import { ErrorMessage, SignupData, SuccessMessage } from '../lib/type/auth';

import { validatePassword } from './middleWare';

const router = express.Router();

router.post(
  '/signup',
  validatePassword,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: SignupData = req.body;

      const exUser = await User.getUser(email);
      if (exUser) {
        res.status(400);
        return res.json(
          jsonErrorResponse(req, { message: `${ErrorMessage.SameEmail}` })
        );
      }

      const bcryptPassword: string = await bcrypt.hash(password, 12);
      const newUser = await User.createUser(email, bcryptPassword);
      await sendEmailToValidate(await User.getUser(email));
      if (newUser) {
        res.status(201);
        return res.json(
          jsonResponse(req, { message: `${SuccessMessage.VerifyEmail}` }, 201)
        );
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/signup/email',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.query as unknown as { key: string; id: string };
      const randomKey = await AuthEmail.isValidKey(key, Number(id));

      if (!randomKey) {
        res.status(403);
        return res.json(
          jsonErrorResponse(
            req,
            { message: `${ErrorMessage.EmailValidationTimeOut}` },
            403
          )
        );
      }

      await User.userCheckedEmail(Number(id));
      await AuthEmail.deleteRandomKey(randomKey.id);

      res.status(200);
      res.json(
        jsonResponse(req, { message: `${SuccessMessage.VerifyEmailComplete}` })
      );
    } catch (err) {
      next(err);
    }
  }
);

export default router;
