import { CurrentSearched } from '../models/currentSearched';
import { User } from '../models/user';

import { PathInfo } from './type/searchPath';

export const setSearchHistory = async (
  userEmail: string,
  pathInfo: PathInfo
) => {
  const { startStation, arriveStation, stopoverStation, pathTarget }: PathInfo =
    pathInfo;
  const user: User | undefined = await User.getUser(userEmail);

  await CurrentSearched.setSearchHistory(
    startStation,
    arriveStation,
    stopoverStation,
    pathTarget,
    user!
  );
};
