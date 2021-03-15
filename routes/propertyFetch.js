const app = require('../server');
const { Sequelize , QueryTypes } = require('sequelize')
const gateway = require('../gateways/propertydb');
const utilities = require("../misc/utilities");

module.exports = (app) => {
    app.get('/properties', async function (req, res) {
        const properties = await gateway.sequelize.query("SELECT * FROM `properties`", { type: QueryTypes.SELECT});
        utilities.sendResponse(res, 200, JSON.stringify(properties));
      
    }),
    app.get('/properties/:id', async function (req, res) {
        const property = await gateway.findAll({
            where: {
                id: req.body.id
            }
        })
        if (Object.keys(property).length === 0){
            utilities.sendResponse(res, 404, 'Property not found')
        } else {
            console.log(property)
            utilities.sendResponse(res, 200, JSON.stringify(property));
        }
    });
};