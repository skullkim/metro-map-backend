import { Request } from 'express';

import { ResultType, StatusType } from '../type/responseType';

const results = [
  {
    status: 200,
    statusText: 'OK',
    description: 'Server successfully performs client request',
  },
  {
    status: 201,
    statusText: 'Created',
    description:
      'Server successfully generates information from client request',
  },
  {
    status: 204,
    statusText: 'No Content',
    description:
      'erver has successfully fulfilled the request and that there is no additional content to send in the response payload body.',
  },
];

export const jsonResponse = (
  req: Request,
  data: object,
  status: number = 200
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
    data,
  };
};
