// var express = require("express");
// const bodyParser = require("body-parser");
// var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// db = require('./db.js');
// db.sequelize.sync({ force: true }); //then...? inicijalizacijaconst 
// const Aktivnost = db.aktivnosts;
// const Student = db.student;
// module.exports = function(app) {

//     //Create new
//     app.post('/v1/aktivnost', (req, res) => {
//         // Save to MySQL database
//         console.log('body:' + req.body);
//         Aktivnost.create({
//             naziv: req.body.naziv,
//             pocetak: req.body.pocetak,
//             kraj: req.body.kraj
//         }).then(aktivnost => {
//             // Send created aktivnost to client
//             res.send(aktivnost);
//         });
//     });
//     //Retrieve one
//     app.get('/v1/aktivnost', (req, res) => {
//         Aktivnost.findById(req.params.aktivnostId).then(aktivnost => {
//             res.send(aktivnost);
//         })
//     });
//     //Update
//     app.put('/v1/aktivnost', (req, res) => {
//         const id = req.params.aktivnostId;
//         Aktivnost.update({ naziv: req.body.naziv, pocetak: req.body.pocetak, kraj: req.body.kraj},
//             { where: { id: req.params.aktivnostId } }
//         ).then(() => {
//             res.status(200).send("Uspješno ažurirana aktivnost koja ima id = " + id);
//         });
//     });
//     //Delete
//     app.delete('/v1/aktivnost', (req, res) => {
//         const id = req.params.aktivnostId;
//         Aktivnost.destroy({
//         where: { id: id }
//         }).then(() => {
//         res.status(200).send('Uspješno obrisana aktivnost koja ima id = ' + id);
//         });
//     });

//         //Create new______________________________________
//         app.post('/v2/student', (req, res) => {
//             // Save to MySQL database
//             console.log('body:' + req.body);
//             Student.create({
//                 ime: req.body.ime,
//                 index: req.body.index
//             }).then(student => {
//                 // Send created aktivnost to client
//                 res.send(student);
//             });
//         });
//         //Retrieve one
//         app.get('/v2/student', (req, res) => {
//             Student.findById(req.params.studentId).then(student => {
//                 res.send(student);
//             })
//         });
//         //Update
//         app.put('/v2/student', (req, res) => {
//             const id = req.params.studentId;
//             Student.update({ ime: req.body.ime, index: req.body.index},
//                 { where: { id: req.params.studentId } }
//             ).then(() => {
//                 res.status(200).send("Uspješno ažuriran sthdent koji ima id = " + id);
//             });
//         });
//         //Delete
//         app.delete('/v2/student', (req, res) => {
//             const id = req.params.studentId;
//             Student.destroy({
//             where: { id: id }
//             }).then(() => {
//             res.status(200).send('Uspješno obrisan student koji ima id = ' + id);
//             });
//         });
// }