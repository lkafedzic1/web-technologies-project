var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Student = db.student;
const StudentGrupa = db.studentGrupa;
const Grupa = db.grupa;

//Post student
exports.create = (req, res) => {
	// Save to MySQL database
	Student.create({
		ime: req.body.ime,
		index: req.body.index
	}).then(student => {
		// Send created student to client
		res.send(student);
	});
};

// FETCH all Student
exports.findAll = (req, res) => {
	Student.findAll().then(studenti => {
		// Send all studenti to Client
		res.send(studenti);
	});
};

// Find a Student by Id
exports.findById = (req, res) => {
	Student.findById(req.params.studentId).then(student => {
		res.send(student);
	})
};

// Update a Student
exports.update = (req, res) => {
	const id = req.params.studentId;
	Student.update({ ime: req.body.ime, index: req.body.index },
		{ where: { id: req.params.studentId } }
	).then(() => {
		res.status(200).send("Uspješno ažuriran student id = " + id);
	});
};

// Delete a Student by Id
exports.delete = (req, res) => {
	const id = req.params.studentId;
	Student.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).send('Uspješno obrisan student id = ' + id);
	});
};


exports.dodajStudente = (req, res) => {
	// Save to MySQL database
	console.log(req.body);
	var studentiIndex = req.body.studenti.split('\n');
	var grupaId = req.body.grupa;
	var predmetId = req.body.predmetId;
	var poruke = [];
	for (var i = 0; i < studentiIndex.length; i++) {
		var ime = studentiIndex[i].split(",")[0];
		var index = studentiIndex[i].split(",")[1];
		if (ime && index) {

			Student.findAll({
				where: {
					index: index,
				}
			}).then(student => {
				// Send created student to client
				var isValid = true;
				if (student.length > 0) {
					if (student[0].ime != ime) {
						console.log("pushana poruka");
						poruke.push("Student" + ime + "nije kreiran jer postoji student" + student[0].ime + " sa istim indexom " + index);
						isValid = false;
					}
					else {
						StudentGrupa.create({
							studentId: student[0].id,
							grupaId: grupaId
						}).then(studentGrupa => {

						});
					}
				} else {
					Student.create({
						ime: ime,
						index: index
					}).then(student => {
						StudentGrupa.create({
							studentId: student.id,
							grupaId: grupaId
						}).then(studentGrupa => {

						});
					});
				}

			});
		}
		if (i == studentiIndex.length - 1) {
			res.send(poruke);
		}
	}
};
