import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 8080),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/mongo-crud',
  nodeEnv: process.env.NODE_ENV ?? 'development',
} as const;
