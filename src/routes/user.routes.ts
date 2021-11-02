import express, { Request, Response, NextFunction } from 'express';

import userController from '../controllers/user.controllers';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.get(
  '/user/:userId',
  verifyAccessTokenMiddleware,
  userController.getUserSearchHistories
);

router.get('/a', (req: Request, res: Response, next: NextFunction) => {
  const authorization: string[] | undefined =
    req.headers.authorization?.split(' ');
  res.send(!!(authorization && !authorization[0]));
});

export default router;
