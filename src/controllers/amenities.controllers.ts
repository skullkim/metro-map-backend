import { Request, Response, NextFunction } from 'express';

import { LostAndFound } from '../models/lostAndFound';
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

export default {
  getLostAndFoundList,
};
