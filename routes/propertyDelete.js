const app = require('../server');
const gateway = require('../gateways/propertydb');
const utilities = require("../misc/utilities");
const auth = require('../middleware/auth')

module.exports = (app) => {
    app.delete('/properties/:id', auth, async function (req, res) {
        console.log('In delete function')
        console.log(req.body.id)
        const property = await gateway.findAll({
            where: {
                id: req.params.id
            }
        })
        if (Object.keys(property).length === 0){
            utilities.sendResponse(res, 404, 'Invalid property selected')
        } else {
            await gateway.destroy({
                where: {
                    id: req.params.id
                }
            })
            utilities.sendResponse(res, 200, 'Property deleted');
        }
      
    });
};