// REFERENCES
// https://nodejs.org/en/docs/guides/getting-started-guide/
// https://expressjs.com/

// read config
require('dotenv').config();

// express makes web services for node easy
const express = require('express');
const cors = require('cors');
const https = require('https');
// init the express
const app = express();
app.use(cors())
app.use(express.json());

// hook up the routers
// property router handles all the routes that work with properties
// const propertyRouter = require('./routes/property');
// app.use('/properties', propertyRouter);
// swagger router handles any swagger calls
const swaggerRouter = require('./routes/swagger');
app.use('/swagger.json', swaggerRouter);
// hello is misc functionality so throw it in its own router
const helloRouter = require('./routes/hello');
app.use('/hello', helloRouter);

require('./routes/propertyPost')(app);
require('./routes/propertyDelete')(app);
require('./routes/propertyUpdate')(app);
require('./routes/propertyFetch')(app);

// setup the logger
const utilities = require("./misc/utilities");
const logger = utilities.getLogger();
const fs = require('fs')

https.createServer({
    key: fs.readFileSync('./ssl-dir/key.pem'),
    cert: fs.readFileSync('./ssl-dir/cert.pem')
}, app).listen(process.env.LISTEN_PORT) 


module.exports = app;