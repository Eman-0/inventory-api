const { Sequelize, DataTypes, Model } = require("sequelize")

module.exports = (sequelize, type) => {
    return sequelize.define('property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    }, {  
        timestamps: false ,
        createdAt: false,
        updatedAt: false 
    });
};
