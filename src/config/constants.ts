export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = +process.env.PORT ?? 5000;

//database related stuff
export const DB_DATABASE = process.env.DB_DATABASE ?? 'last_nest';
export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_PORT = +process.env.DB_PORT ?? 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
