import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/connection';
import router from './routes/router';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('short'));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Attendance Heyjong Secretary');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
