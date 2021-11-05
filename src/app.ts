import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { createConnection } from 'typeorm';

import passportConfig from './config/passport';
import authRouter from './routes/auth.routes';
import bookmarkRouter from './routes/bookmark.routes';
import pathRouter from './routes/path.routes';
import searchHistoryRouter from './routes/searchHistory.routes';
import { ReqError, HttpException } from './utils/type/Error';

createConnection().then(() => {
  const app: express.Application = express();

  dotenv.config();

  app.set('port', process.env.PORT || 8080);

  app.use(morgan('dev'));
  app.use(
    cors({
      origin: `${process.env.CLIENT_ORIGIN}`,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.is('application/vnd.api+json')) {
      res.contentType('application/vnd.api+json');
      res.setHeader('Accept', 'application/json');
    }
    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.CLIENT_ORIGIN}`
    );
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.use(passport.initialize());
  passportConfig();

  app.use('/path', pathRouter);
  app.use('/authentication', authRouter);
  app.use('/search-history', searchHistoryRouter);
  app.use('/bookmark', bookmarkRouter);

  app.use((req: Request, response: Response, next: NextFunction) => {
    const error: ReqError = new Error(
      `${req.method} ${req.originalUrl} router doesn't exist`
    );
    error.status = 400;
    next(error);
  });

  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      res.locals.message = err.message;
      res.locals.error = process.env.NODE_DEV !== 'production' ? err : {};
      res.send(res.locals.message);
    }
  );

  app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(`${app.get('port')} server start`);
  });
});
