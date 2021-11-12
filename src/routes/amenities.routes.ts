import express from 'express';

import amenitiesControllers from '../controllers/amenities.controllers';

const router = express.Router();

router.get('/lost-and-found', amenitiesControllers.getLostAndFoundList);

router.get('/store-box', amenitiesControllers.getStoreBoxList);

router.post('/user-complain', amenitiesControllers.sendUserComplainEmail);

export default router;
