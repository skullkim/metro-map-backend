import express from 'express';

import authController from '../controllers/auth.controllers';
import validateEmailMiddleware from '../middleWares/validateEmail.middleware';
import validateUserInfoMiddleware from '../middleWares/validateUserInfo.middleware';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';
import verifyRefreshTokenMiddleware from '../middleWares/verifyRefreshToken.middleware';

const router = express.Router();

router.post('/signup', validateUserInfoMiddleware, authController.signup);

router.get('/signup/email', authController.verifySignupEmail);

router.post(
  '/signup/email/reauthorization',
  validateEmailMiddleware,
  authController.resendSignupEmail
);

router.post('/signin', validateUserInfoMiddleware, authController.signin);

router.post('/logout', verifyAccessTokenMiddleware, authController.logout);

router.get(
  '/refresh-token',
  verifyRefreshTokenMiddleware,
  authController.generateRefreshToken
);

export default router;
