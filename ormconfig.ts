require('dotenv').config();
export = {
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  port: 3306,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_SECRETE}`,
  database: `${process.env.DB_SCHEMA}`,
  entities: ['src/models/*ts'],
  logging: true,
  synchronize: true,
};
