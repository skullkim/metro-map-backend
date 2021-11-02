import express, { Router } from 'express';

import pathControllers from '../controllers/path.controllers';
import validateStationMiddleware from '../middleWares/validateStation.middleware';
import verifyAccessTokenMiddleware from '../middleWares/verifyAccessToken.middleware';

const router: Router = express.Router();

router.get(
  '/:pathTarget',
  validateStationMiddleware,
  verifyAccessTokenMiddleware,
  pathControllers.optimizedPath
);

router.get(
  '/stopover/:pathTarget',
  validateStationMiddleware,
  verifyAccessTokenMiddleware,
  pathControllers.optimizedPathStopover
);

export default router;
