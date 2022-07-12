import 'dotenv/config';
import express, { Application, Response, Request } from 'express';

const app: Application = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
