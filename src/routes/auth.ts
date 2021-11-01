import express from 'express';

import authController from '../controllers/auth.controllers';
import validateEmail from '../middleWares/validateEmail';
import validateUserInfo from '../middleWares/validateUserInfo';
import verifyAccessToken from '../middleWares/verifyAccessToken';
import verifyRefreshToken from '../middleWares/verifyRefreshToken';

const router = express.Router();

router.post('/signup', validateUserInfo, authController.signup);

router.get('/signup/email', authController.verifySignupEmail);

router.post(
  '/signup/email/reauthorization',
  validateEmail,
  authController.resendSignupEmail
);

router.post('/signin', validateUserInfo, authController.signin);

router.post('/logout', verifyAccessToken, authController.logout);

router.get(
  '/refresh-token',
  verifyRefreshToken,
  authController.generateRefreshToken
);

export default router;
