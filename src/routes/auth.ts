import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { AuthEmail } from '../entity/authEmail';
import { Token } from '../entity/token';
import { User } from '../entity/user';
import sendEmailToValidate from '../lib/emailAuth';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { jsonResponse } from '../lib/jsonResponse/success';
import { generateAccessToken } from '../lib/token';
import {
  ErrorMessage,
  SignupData,
  SuccessMessage,
  UserAccessToken,
} from '../lib/type/auth';

import { validateEmail, validateUserInfo, verifyToken } from './middleWare';

const router = express.Router();

router.post(
  '/signup',
  validateUserInfo,
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

router.post(
  '/signup/email/reauthorization',
  validateEmail,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exUser: User = res.locals.exUser;
      await sendEmailToValidate(exUser);

      res.status(200);
      res.json(
        jsonResponse(req, { message: SuccessMessage.RecertificationEmail })
      );
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/signin',
  validateUserInfo,
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const status: number =
          info.message === ErrorMessage.DidNotVerifyEmailYet ? 401 : 400;
        res.status(status);
        return res.json(jsonErrorResponse(req, info, status));
      }

      req.login(user, { session: false }, async (loginError) => {
        if (loginError) {
          next(loginError);
        }

        const { id, email }: User = user;
        const tokenData: UserAccessToken = { id, email };

        const accessToken = generateAccessToken(tokenData);
        const refreshToken = jwt.sign(
          tokenData,
          `${process.env.JWT_REFRESH_SECRET}`
        );

        await Token.setRefreshToken(user, refreshToken);

        res.cookie(`${process.env.JWT_REFRESH_TOKEN}`, refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        res.json(jsonResponse(req, { user_id: user.id, accessToken }));
      });
    })(req, res, next);
  }
);

router.post(
  '/logout',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logOut();
      res.clearCookie(`${process.env.JWT_REFRESH_TOKEN}`);
      await Token.deleteRefreshToken(
        req.cookies[`${process.env.JWT_REFRESH_TOKEN}`]
      );
      res.status(204);
      res.json(jsonResponse(req, {}, 204));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
