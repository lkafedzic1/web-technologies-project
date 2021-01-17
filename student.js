const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        ime:Sequelize.STRING,
        index: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        }
    })
    return Student;
};