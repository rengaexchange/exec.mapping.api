const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require('./src/routes/auth');
const mappingRoutes = require('./src/routes/mapping');
var config = require('./config/database');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload());

// Create a connection to the database
const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB
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

app.use('/api/v1', authRoutes);
app.use('/api/v1/', mappingRoutes);


var port = process.env.PORT || 9000;

app.listen(port);

console.log('Listening on localhost:'+ port);

module.exports = app;
