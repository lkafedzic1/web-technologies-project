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

//importi modela
// db.aktivnost = sequelize.import(__dirname+'/aktivnost.js');
// db.dan = sequelize.import(__dirname+'/dan.js');
// db.grupa = sequelize.import(__dirname+'/grupa.js');
// db.predmet = sequelize.import(__dirname+'/predmet.js');
// db.student = sequelize.import(__dirname+'/student.js');
// db.tip = sequelize.import(__dirname+'/tip.js');

db.aktivnost = require(__dirname+'/aktivnost.js')(sequelize, Sequelize);
db.dan = require(__dirname+'/dan.js')(sequelize, Sequelize);
db.grupa = require(__dirname+'/grupa.js')(sequelize, Sequelize);
db.predmet = require(__dirname+'/predmet.js')(sequelize, Sequelize);
db.student = require(__dirname+'/student.js')(sequelize, Sequelize);
db.tip = require(__dirname+'/tip.js')(sequelize, Sequelize);

//relacije
//Predmet 1-N Grupa
db.predmet.hasMany(db.grupa,{foreignKey:{allowNull:false}});
db.grupa.belongsTo(db.predmet);

// Aktivnost ​ N-1​ Predmet
db.predmet.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.predmet);

// Aktivnost ​ N-0​ Grupa
db.grupa.hasMany(db.aktivnost);
db.aktivnost.belongsTo(db.grupa);

// Aktivnost ​ N-1​ Dan
db.dan.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.dan);

// Aktivnost ​ N-1​ Tip
db.dan.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.dan);

// Student ​ N-M​ Grupa
db.studentGrupa = db.grupa.belongsToMany(db.student,{as:'studenti',through:'student_grupa',foreignKey:'grupaId'});
db.student.belongsToMany(db.grupa,{as:'grupe',through:'student_grupa',foreignKey:'studentId'});


module.exports = db;