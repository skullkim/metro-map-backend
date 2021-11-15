import { Request, Response, NextFunction } from 'express';

const changeUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
  res.json('success');
};

/*
 * 이메일 정규식
 * 기존 이메일과 겹치나
 * 기존 비밀번화와 같나
 * 새로운 비밀번호가 정규식을 만족하나
 * */

export default {
  changeUserInformation,
};
