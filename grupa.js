const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Grupa = sequelize.define("grupa",{
        grupaId: {
            type:sequelize.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        naziv:Sequelize.STRING
    })
    return Grupa;
};