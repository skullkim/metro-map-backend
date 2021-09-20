import express from "express";

const app:express.Application = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('hi');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} server start`);
})

