const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        studentId: {
            type:sequelize.integer,
            primarykey:true,
            autoincrement:true
        },
        ime:Sequelize.STRING,
        index:Sequelize.STRING
    })
    return Student;
};