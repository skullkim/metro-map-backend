import express from 'express';

import searchHistoryController from '../controllers/searchHistory.controllers';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.get(
  '/user/:userId',
  verifyAccessTokenMiddleware,
  searchHistoryController.getUserSearchHistories
);

router.put(
  '/bookmark/:bookmarkId',
  verifyAccessTokenMiddleware,
  searchHistoryController.setUserPathBookmark
);

export default router;
