import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';

import { User } from '../entity/user';
import { jsonErrorResponse } from '../lib/jsonResponse/fail';
import { jsonResponse } from '../lib/jsonResponse/success';
import { ErrorMessage, SignupData } from '../lib/type/auth';
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

      if (newUser) {
        res.status(201);
        return res.json(jsonResponse(req, { message: 'success' }, 201));
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
