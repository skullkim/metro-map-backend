import { Request, Response, NextFunction } from 'express';

import { LostAndFound } from '../models/lostAndFound';
import { StoreBox } from '../models/storeBox';
import { jsonResponse } from '../utils/jsonResponse/success';

const getLostAndFoundList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lostAndFoundList = await LostAndFound.getLostAndFoundList();

    res.status(200);
    res.json(jsonResponse(req, lostAndFoundList));
  } catch (err) {
    next(err);
  }
};

const getStoreBoxList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeBoxList = await StoreBox.getStoreBoxList();

    res.status(200);
    res.json(jsonResponse(req, storeBoxList));
  } catch (err) {
    next(err);
  }
};

const sendUserComplainEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json('sendUserComplainEmail');
};

export default {
  getLostAndFoundList,
  getStoreBoxList,
  sendUserComplainEmail,
};
