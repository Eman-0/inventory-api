
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

// this is the top-level GET route for the /properties router
// router.get('/',
//   async function(request, response) {
//   		const result = gateway.fetchProperties();

//         logger.info("success");

//         utilities.sendResponse(response, 200, result);
//     }
// );

router.get('/properties', async function(req, res) {
        const properties = gateway.Property.findAll();
        logger.info("success");
        utilities.sendResponse(res, 200, properties);
    }
);

// router.post('/properties', (req, res) => {
//     const data = {
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         zip: req.body.zip
//     };
//     console.log(data.address)

//     if (data.address === '' || data.city === '' || data.state === '' || data.zip === ''){
//         res.status(401).json('Please enter a complete property address')
//     }
//     else {
//         gateway.Property.create({
//             address: data.address,
//             city: data.city,
//             state: data.state,
//             zip: data.zip
//         })
//     }   
// });


module.exports = router;