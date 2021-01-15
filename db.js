const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2017845","root","root",{
    host:"127.0.0.1",
    dialect:"mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
//relacije

module.exports = db;