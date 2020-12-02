const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require('./src/routes/auth');
const mappingRoutes = require('./src/routes/mapping');
const brandingRoutes = require('./src/routes/branding');
const fileUpload = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload());

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
app.use('/api/v1/', brandingRoutes);


var port = process.env.PORT || 9000;

app.listen(port);

console.log('Listening on localhost:'+ port);

module.exports = app;
