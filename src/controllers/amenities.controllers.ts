import { Request, Response, NextFunction } from 'express';

import { LostAndFound } from '../models/lostAndFound';

const getLostAndFoundList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lostAndFoundList = await LostAndFound.getLostAndFoundList();
    res.send(lostAndFoundList);
  } catch (err) {
    next(err);
  }
};

export default {
  getLostAndFoundList,
};
