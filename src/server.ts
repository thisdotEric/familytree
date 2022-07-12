import 'dotenv/config';
import express, { Application, Response, Request } from 'express';
import { familyRoutes } from './routes';
import cors from 'cors';

const app: Application = express();

app.use(
  cors({
    origin: process.env.FRONTEND_APP,
    credentials: true,
  })
);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/family', familyRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
