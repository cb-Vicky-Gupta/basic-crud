import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { AppError } from './utils/app-error.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('This is running');
});

app.use('/api', routes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// central error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = err instanceof AppError ? err.status : 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: err.message || 'Internal server error' });
});

const PORT = Number(process.env.PORT ?? 8080);

async function start(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

start().catch((err: unknown) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
