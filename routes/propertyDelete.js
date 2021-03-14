const app = require('../server');
const gateway = require('../gateways/propertydb');
const utilities = require("../misc/utilities");

module.exports = (app) => {
    app.delete('/properties/:id', async function (req, res) {
        console.log('In delete function')
        console.log(req.body.id)
        const property = await gateway.findAll({
            where: {
                id: req.body.id
            }
        })
        if (Object.keys(property).length === 0){
            utilities.sendResponse(res, 404, 'Invalid property selected')
        } else {
            await gateway.destroy({
                where: {
                    id: req.body.id
                }
            })
            utilities.sendResponse(res, 200, 'Property deleted');
        }
      
    });
};