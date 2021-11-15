import express from 'express';

import userInformation from '../controllers/user.controllers';

const router = express.Router();

router.put('/:userId/user-information', userInformation.changeUserInformation);

export default router;
