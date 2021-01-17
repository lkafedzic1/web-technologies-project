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

db.aktivnost = require(__dirname+'/aktivnost.js')(sequelize, Sequelize.DataTypes);
db.dan = require(__dirname+'/dan.js')(sequelize, Sequelize.DataTypes);
db.grupa = require(__dirname+'/grupa.js')(sequelize, Sequelize.DataTypes);
db.predmet = require(__dirname+'/predmet.js')(sequelize, Sequelize.DataTypes);
db.student = require(__dirname+'/student.js')(sequelize, Sequelize.DataTypes);
db.tip = require(__dirname+'/tip.js')(sequelize, Sequelize.DataTypes);


//relacije
//Predmet 1-N Grupa
db.predmet.hasMany(db.grupa,{
    as:'grupePredmeta',
    foreignKey:{
        //  name: 'grupaId_fk',
        allowNull:false
    }
});
db.grupa.belongsTo(db.predmet);

// Aktivnost ​ N-1​ Predmet
db.predmet.hasMany(db.aktivnost,{
    as:'aktivnostiPredmeta',
    foreignKey:{
        //  name: 'predmetId_fk',
        allowNull:false
    }
});
db.aktivnost.belongsTo(db.predmet);

// Aktivnost ​ N-0​ Grupa
db.grupa.hasMany(db.aktivnost);
db.aktivnost.belongsTo(db.grupa);

// Aktivnost ​ N-1​ Dan
db.dan.hasMany(db.aktivnost,{
    as:'aktivnostiDana',
    foreignKey:{
        //  name: 'danId_fk',
        allowNull:false
    }
});
db.aktivnost.belongsTo(db.dan);

// Aktivnost ​ N-1​ Tip
db.tip.hasMany(db.aktivnost,{
    as:'aktivnostiTipa',
    foreignKey:{
        //  name: 'aktivnostId_fk',
        allowNull:false
    }
});
db.aktivnost.belongsTo(db.tip);

// Student ​ N-M​ Grupa
db.studentGrupa = db.grupa.belongsToMany(db.student,{as:'studenti',through:'student_grupa',foreignKey:'grupaId'});
db.student.belongsToMany(db.grupa,{as:'grupe',through:'student_grupa',foreignKey:'studentId'});


module.exports = db;