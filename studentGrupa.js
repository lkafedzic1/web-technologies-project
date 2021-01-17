const Sequelize = require("sequelize");
const db = require("./db");

module.exports = function(sequelize,DataTypes){
    const StudentGrupa = sequelize.define("student_grupa",{
        studentId: {
            tpe: Sequelize.INTEGER,
            references: {
                model: db.student,
                key:'id'
            }
        },
        grupaId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.grupa,
                key:'id'
            }
        }
    });
    return StudentGrupa;
};