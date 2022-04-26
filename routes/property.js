
const express = require('express');
const router = express.Router();

const gateway = require("../gateways/propertydb");
const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

// I like to log who is calling the web services
router.use(function (req, res, next) {
    const ip = utilities.getRequestIPAddress(req);
    logger.info("Properties request route " + req.originalUrl + " from " + ip);
    next();
});

router.get('/properties', async function(req, res) {
        const properties = gateway.Property.findAll();
        logger.info("success");
        utilities.sendResponse(res, 200, properties);
    }
);

module.exports = router;