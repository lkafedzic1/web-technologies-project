const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Tip = sequelize.define("tip",{
        naziv: {
            type :Sequelize.STRING,
            validate: {
                isIn: {
                    args: [['Predavanje','Tutorijal','Vjezba']]
                }
            }
        }
    })
    return Tip;
};