import { Request, Response, NextFunction } from 'express';

import { StationBookMark } from '../models/stationBookMark';
import { jsonResponse } from '../utils/jsonResponse/success';

const getUserBookMarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId }: { userId: number } = res.locals.userData;
    const bookMarks = await StationBookMark.getBookMarks(userId);
    res.status(200);
    return res.json(jsonResponse(req, bookMarks));
  } catch (err) {
    next(err);
  }
};

export default {
  getUserBookMarks,
};
