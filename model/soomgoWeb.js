const Sequelize = require('sequelize');

class SoomgoWeb extends Sequelize.Model {
    static initiate(sequelize){
        SoomgoWeb.init({
            useremail: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            username: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image2 : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            statusf : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            field: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            language: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'SoomgoWeb',
            tableName: 'soomgoweb',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = SoomgoWeb;