const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Tip = sequelize.define("tip",{
        tipId: {
            type:sequelize.integer,
            primarykey:true,
            autoincrement:true
        },
        naziv:Sequelize.STRING
    })
    return Tip;
};