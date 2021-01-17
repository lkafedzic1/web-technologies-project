const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define("dan",{
        naziv: {
            type :Sequelize.STRING,
            validate: {
                isIn: {
                    args: [['Ponedjeljak','Utorak','Srijeda','Cetvrtak','Petak','Četvrtak']]
                }
            }
        }
    })
    return Dan;
};