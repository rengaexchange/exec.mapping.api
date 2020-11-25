const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const libRoutes = require('./src/routes/mapping');
var config = require('./config/database');
const cron = require("node-cron");
const mysql = require('msyql');

const app = express();

var db = config.db;

// Create a connection to the database
const connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        version: 'v1',
        application: 'Mapping API',
        license: 'ExchangeCollective',
    });
});


app.use('/api/v1/', mappingRoutes);

var port = process.env.PORT || 9000;

app.listen(port);

console.log('Listening on localhost:'+ port);

module.exports = app;
