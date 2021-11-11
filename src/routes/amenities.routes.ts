import express from 'express';

import amenitiesControllers from '../controllers/amenities.controllers';

const router = express.Router();

router.get('/lost-and-found', amenitiesControllers.getLostAndFoundList);

export default router;
