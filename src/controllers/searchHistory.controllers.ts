import { NextFunction, Request, Response } from 'express';

import { CurrentSearched } from '../models/currentSearched';
import { StationBookMark } from '../models/stationBookMark';
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

const setUserPathBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookmarkId } = req.params as unknown as { bookmarkId: number };
    const {
      locals: {
        userData: { id, email },
      },
    } = res;
    const {
      pathInfo: { from, to, stopover, target },
    } = req.body;

    await CurrentSearched.checkBookmark(bookmarkId);

    const exBookmark = await StationBookMark.getBookMark(
      id,
      from,
      to,
      stopover,
      target
    );
    if (!exBookmark) {
      await StationBookMark.setBookMark(email, from, to, stopover, target);
    } else {
      await StationBookMark.deleteBookMark(id, from, to, stopover, target);
    }

    res.status(204);
    return res.json(jsonResponse(req, {}, 204));
  } catch (err) {
    next(err);
  }
};

export default {
  getUserSearchHistories,
  setUserPathBookmark,
};
