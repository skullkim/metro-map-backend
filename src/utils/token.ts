import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { UserAccessToken } from './type/auth';

dotenv.config();

export const generateAccessToken = (data: UserAccessToken) => {
  return jwt.sign(data, `${process.env.JWT_ACCESS_SECRET}`, {
    expiresIn: '1h',
  });
};
