const { Sequelize, Model } = require('sequelize');
const PropertyModel = require('../models/property-model');
require('dotenv').config();

const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: "mysql"
})

const Property = PropertyModel(sequelize, Sequelize);

module.exports = Property, sequelize;