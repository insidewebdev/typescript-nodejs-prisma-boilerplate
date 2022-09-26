import { config as _config } from 'dotenv';

// _config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); // TODO: maybe implement for testing env

_config()

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const { NODE_ENV, PORT, DATABASE_URL, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, APP_URL } = process.env;

