import express from 'express';

import userController from '../controllers/user.controllers';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.get(
  '/user/:userId',
  verifyAccessTokenMiddleware,
  userController.getUserSearchHistories
);

router.put(
  '/bookmark/:bookmarkId',
  verifyAccessTokenMiddleware,
  userController.setUserPathBookmark
);

export default router;
