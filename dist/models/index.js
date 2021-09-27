"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.db = void 0;
var sequelize_1 = require("sequelize");
var configObj = require('../config/config');
var env = process.env.NODE_DEV || 'development';
var config = configObj[env];
exports.db = {
    sequelize: {},
};
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.db.sequelize = exports.sequelize;
module.exports = exports.db;
//# sourceMappingURL=index.js.map