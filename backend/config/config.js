require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_DEV_USER,
    password: process.env.MYSQL_DEV_PASSWORD,
    database: process.env.MYSQL_DEV_DATABASE,
    host: process.env.MYSQL_DEV_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
    host: process.env.MYSQL_TEST_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_PROD_USER,
    password: process.env.MYSQL_PROD_PASSWORD,
    database: process.env.MYSQL_PROD_DATABASE,
    host: process.env.MYSQL_PROD_HOST,
    dialect: 'mysql',
  },
};
