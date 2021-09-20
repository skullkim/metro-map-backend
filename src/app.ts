import express from 'express';

import { sequelize } from './models';

const app: express.Application = express();

app.set('port', process.env.PORT || 8080);

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('success to connect DB');
  })
  .catch((err: String) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hi');
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`${app.get('port')} server start`);
});
