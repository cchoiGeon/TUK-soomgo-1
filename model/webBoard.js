const Sequelize = require('sequelize');

class WebBoard extends Sequelize.Model {
    static initiate(sequelize){
        WebBoard.init({
            useremail: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            username: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            title : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'WebBoard',
            tableName: 'webboard',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = WebBoard;