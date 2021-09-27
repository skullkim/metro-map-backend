import {Request} from 'express';

import {StatusType, ResultType} from '../type/responseType';

const results = [
  {
    status: 200,
    statusText: 'OK',
    description: 'Server successfully performs client request'
  },
  {
    status: 201,
    statusText: 'Created',
    description: 'Server successfully generates information from client request'
  },
];

export const jsonResponse = (req: Request, data: object, status: number = 200) => {
  const {url, method, params, query} = req;
  const resMessage: ResultType[] = results.filter(
    ({status: statusResult}: StatusType) => statusResult == status
  );
  const responseData = {
    status,
    status_code: resMessage[0].statusText,
    request: {
      url,
      method,
      params,
      query,
    },
    data,
  }
  return responseData;
}