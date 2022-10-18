import dotenv from 'dotenv';

dotenv.config();

export const env = {
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
};
