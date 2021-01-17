const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Aktivnost = sequelize.define("aktivnost",{
        aktivnostId: {
            type:Sequelize.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        naziv:Sequelize.STRING,
        pocetak:Sequelize.FLOAT,
        kraj:Sequelize.FLOAT
    });
    return Aktivnost;
};