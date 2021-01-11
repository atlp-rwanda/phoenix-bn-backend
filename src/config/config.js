import 'dotenv/config';

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_USERNAME_TEST,
  DB_PASSWORD_TEST,
  DB_NAME_TEST,
  DB_HOST_TEST,
  DB_PORT_TEST,
  DB_DIALECT_TEST,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_NAME_TEST,
    host: DB_HOST_TEST,
    port: DB_PORT_TEST,
    dialect: 'postgres',
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
};
