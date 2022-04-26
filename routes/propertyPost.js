const app = require('../server');
const gateway = require('../gateways/propertydb');
const utilities = require("../misc/utilities");
const auth = require('../middleware/auth')

module.exports = (app) => {
    app.post('/properties', auth, async function (req, res) {
        if (req.body.address === undefined || req.body.city === undefined || req.body.state === undefined || req.body.zip === undefined){
            utilities.sendResponse(res, 400, 'Please enter a complete property address')
        }
        else {
            const data = {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            };
            console.log(data.city)
            await gateway.create({
                address: data.address,
                city: data.city,
                state: data.state,
                zip: data.zip
            })
            utilities.sendResponse(res, 200, 'Property added successfully');
        }   
    });
};