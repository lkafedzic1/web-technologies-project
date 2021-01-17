var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Student = db.student;

//Post student
exports.findOrCreate = (req, res) => {	
	// Save to MySQL database
	Student.findOrCreate({  
		ime: req.body.ime,
		index: req.body.index
	}).then(student => {		
		// Send findOrCreated student to client
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
	Student.update( {ime: req.body.ime,index: req.body.index}, 
					 { where: {id: req.params.studentId} }
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
