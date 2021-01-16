const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        predmetId: {
            type:sequelize.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        naziv:Sequelize.STRING,
        grupaId:Sequelize.INTEGER
    })
    return Predmet;
};