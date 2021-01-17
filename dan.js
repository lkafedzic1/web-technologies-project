const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define("dan",{
        danId: {
            type:Sequelize.INTEGER,
            primarykey:true,
            autoincrement:true
        },
        naziv:Sequelize.STRING
    })
    return Dan;
};