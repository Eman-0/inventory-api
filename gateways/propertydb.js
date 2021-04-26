const { Sequelize, Model } = require('sequelize');
const PropertyModel = require('../models/property-model');


const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

const sequelize = new Sequelize("cs4783_mio755", "root", "utsa", {
	host: "mio755-db",
	dialect: "mysql"
})

const Property = PropertyModel(sequelize, Sequelize);

// breaks as it doesn't wait for db to be ready
// sequelize.sync()
// .then(() => {
// 	console.log('Synced models')
// })

module.exports = Property, sequelize;