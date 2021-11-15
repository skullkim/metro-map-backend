import express from 'express';

import bookMarkController from '../controllers/bookmark.controllers';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.delete(
  '/:bookmarkId/user/:userId',
  verifyAccessTokenMiddleware,
  bookMarkController.deleteUserBookMarks
);

router.get(
  '/user/:userId',
  verifyAccessTokenMiddleware,
  bookMarkController.getUserBookMarks
);

export default router;
