import { Request, Response, NextFunction } from 'express';

import { CurrentSearched } from '../models/currentSearched';
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

    const responseBookMarks = bookMarks.map((bookmarkData) => ({
      ...bookmarkData,
      bookmark: true,
    }));

    res.status(200);
    return res.json(jsonResponse(req, responseBookMarks));
  } catch (err) {
    next(err);
  }
};

const deleteUserBookMarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId }: { id: number } = res.locals.userData;
    const {
      pathInfo: { from, to, stopover, target },
    } = req.body;

    await StationBookMark.deleteBookMark(userId, from, to, stopover, target);

    const searchHistories = await CurrentSearched.getUserSearchHistory(userId);
    const hasSearchHistory = searchHistories.filter(
      (searchHistory) =>
        searchHistory.target == target &&
        searchHistory.from == from &&
        searchHistory.to == to &&
        searchHistory.stopover == stopover
    );
    if (hasSearchHistory.length) {
      await CurrentSearched.checkBookmark(hasSearchHistory[0].id);
    }

    res.status(204);
    return res.json(jsonResponse(req, {}, 204));
  } catch (err) {
    next(err);
  }
};

export default {
  getUserBookMarks,
  deleteUserBookMarks,
};
