const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        naziv: {
            type:Sequelize.STRING
        }
    })
    return Predmet;
};