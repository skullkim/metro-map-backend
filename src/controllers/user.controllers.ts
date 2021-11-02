import { NextFunction, Request, Response } from 'express';

import { CurrentSearched } from '../models/currentSearched';
import { jsonResponse } from '../utils/jsonResponse/success';

const getUserSearchHistories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as unknown as { userId: number };
  try {
    const searchHistory = await CurrentSearched.getUserSearchHistory(userId);
    res.status(200);
    return res.json(jsonResponse(req, { search_history: searchHistory }));
  } catch (err) {
    next(err);
  }
};

export default {
  getUserSearchHistories,
};
