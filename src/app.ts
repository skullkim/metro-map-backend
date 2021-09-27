import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import { ReqError, HttpException } from './lib/type/Error';
import pathRouter from './routes/path';

createConnection().then(() => {
  const app: express.Application = express();

  dotenv.config();

  app.set('port', process.env.PORT || 8080);

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser());

  app.use('/path', pathRouter);

  app.use((req: Request, response: Response, next: NextFunction) => {
    const error: ReqError = new Error(`${req.method} ${req.originalUrl} router doesn't exist`);
    error.status = 400;
    next(error);
  })

  app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_DEV !== 'production' ? err : {};
    res.send(res.locals.message);
  })

  app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(`${app.get('port')} server start`);
  });

});

