import { Sequelize } from 'sequelize';

const configObj = require('../config/config');

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
}

const env = process.env.NODE_DEV || 'development';
const config: DbConfig = configObj[env];
export const db = {
  sequelize: {},
};

export const sequelize: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

module.exports = db;
