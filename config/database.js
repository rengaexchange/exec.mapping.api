var config = {
    port : 3000,
    HOST: "ze25twcox4llx7t8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "nvst6jyetj7su98w",
    PASSWORD: "ae3otg6f1dipv1vz",
    DB: "exc_test"
   
};

const Sequelize = require('sequelize')
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