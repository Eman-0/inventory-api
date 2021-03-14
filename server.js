// REFERENCES
// https://nodejs.org/en/docs/guides/getting-started-guide/
// https://expressjs.com/

// read config
require('dotenv').config();

// express makes web services for node easy
const express = require('express');

// init the express
const app = express();
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

// process.env.LISTEN_PORT
var server = app.listen(8080, function () {
	console.log('API server is listening on port ' + 8080 + '...');
    logger.info('API server is listening on port ' + 8080 + '...');
});

module.exports = app;