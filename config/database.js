const Sequelize = require('sequelize');
var config = require('./config').config;

const db = {}
const sequelize = new Sequelize(config.DB, 
                                config.USER, 
                                config.PASSWORD, {
  host: config.HOST,
  dialect: 'mysql',
  logging: console.log,
  freezeTableName: true,

  pool: {
    idle: 200000,
    acquire: 1000000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db