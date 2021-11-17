import express from 'express';

import userInformation from '../controllers/user.controllers';
import validateChangeUserInformationMiddleware from '../middleWares/validateChangeUserInformation.middleware';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router = express.Router();

router.put(
  '/:userId/user-information',
  verifyAccessTokenMiddleware,
  validateChangeUserInformationMiddleware,
  userInformation.changeUserInformation
);

router.get(
  '/:userId/email',
  verifyAccessTokenMiddleware,
  userInformation.getUserEmail
);

export default router;
