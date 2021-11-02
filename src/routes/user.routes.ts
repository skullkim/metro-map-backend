import express from 'express';

import userController from '../controllers/user.controllers';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.get(
  '/user/:userId',
  verifyAccessTokenMiddleware,
  userController.getUserSearchHistories
);

export default router;
