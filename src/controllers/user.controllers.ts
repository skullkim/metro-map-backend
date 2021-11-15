import { Request, Response, NextFunction } from 'express';

const changeUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
  res.json('success');
};

export default {
  changeUserInformation,
};
