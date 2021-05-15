const { Sequelize, Model } = require('sequelize');
const PropertyModel = require('../models/property-model');


const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

const sequelize = new Sequelize("cs4783_mio755", "root", "utsa", {
	host: "10.152.183.222",
	dialect: "mysql"
})

const Property = PropertyModel(sequelize, Sequelize);

module.exports = Property, sequelize;