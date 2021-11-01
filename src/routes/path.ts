import express, { Router } from 'express';

import pathControllers from '../controllers/path.controllers';
import validateStation from '../middleWares/validateStation';

const router: Router = express.Router();

router.get('/:pathTarget', validateStation, pathControllers.optimizedPath);

router.get(
  '/stopover/:pathTarget',
  validateStation,
  pathControllers.optimizedPathStopover
);

export default router;
