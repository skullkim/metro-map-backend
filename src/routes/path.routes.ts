import express, { Router } from 'express';

import pathControllers from '../controllers/path.controllers';
import validateStationMiddleware from '../middleWares/validateStation.middleware';

const router: Router = express.Router();

router.get(
  '/:pathTarget',
  validateStationMiddleware,
  pathControllers.optimizedPath
);

router.get(
  '/stopover/:pathTarget',
  validateStationMiddleware,
  pathControllers.optimizedPathStopover
);

export default router;
