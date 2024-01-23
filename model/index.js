const Sequelize = require('sequelize');
const User = require('./user');
const WebBoard = require('./webBoard');
const SoomgoWeb = require('./soomgoWeb');
const config = require('../config/config'); // config 파일 경로에 따라 조절

const db = {};
const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

db.sequelize = sequelize;
db.User = User;
db.WebBoard = WebBoard;
db.SoomgoWeb = SoomgoWeb;

User.initiate(sequelize);
WebBoard.initiate(sequelize);
SoomgoWeb.initiate(sequelize);

module.exports = db;
