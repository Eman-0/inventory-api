const app = require('../server');
const gateway = require('../gateways/propertydb');
const utilities = require("../misc/utilities");
const auth = require('../middleware/auth')

module.exports = (app) => {
    app.put('/properties/:id', auth, async function (req, res) {
        const property = await gateway.findAll({
            where: {
                id: req.body.id
            }
        })
        if (Object.keys(property).length === 0){
            utilities.sendResponse(res, 404, 'Property not found')
        } else {

            const data = {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            };
            await gateway.update(data, {
                where: {
                    id: req.body.id
                }
            })
            utilities.sendResponse(res, 200, 'Property updated');
        }      
    });
};