import { Request } from 'express';

import { ResultType, StatusType } from '../type/responseType';

const results = [
  {
    status: 400,
    statusText: 'Bad Request',
    description: 'Request query or parameter error',
  },
  {
    status: 401,
    statusText: 'Unauthorized',
    description: 'Authentication error',
  },
  {
    status: 403,
    statusText: 'Forbidden',
    description:
      'The request wat forwarded to the server, but declined because of permissions',
  },
];

export const jsonErrorResponse = (
  req: Request,
  error: object,
  status: number = 400
) => {
  const { originalUrl, method, params, query } = req;
  const resMessage: ResultType[] = results.filter(
    ({ status: statusResult }: StatusType) => statusResult == status
  );
  return {
    status,
    status_code: resMessage[0].statusText,
    request: {
      path: originalUrl,
      method,
      params,
      query,
    },
    data: '',
    error,
  };
};
