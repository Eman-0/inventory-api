const { Sequelize, Model } = require('sequelize');
const PropertyModel = require('../models/property-model');


const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

const sequelize = new Sequelize("cs4783_mio755", "mio755", "uLS4v2gfeCO2K9kAVhvW", {
	host: "cs3743.fulgentcorp.com",
	dialect: "mysql"
});

const Property = PropertyModel(sequelize, Sequelize);

sequelize.sync()
.then(() => {
	console.log('Synced models')
})

module.exports = Property, sequelize;