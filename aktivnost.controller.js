var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Aktivnost = db.aktivnost;
const Student = db.student;

//Post aktivnost
exports.create = (req, res) => {	
	// Save to MySQL database
	Aktivnost.create({  
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj
	}).then(aktivnost => {		
		// Send created aktivnost to client
		res.send(aktivnost);
	});
};

// FETCH all Aktivnost
exports.findAll = (req, res) => {
	Aktivnost.findAll().then(aktivnosti => {
	  // Send all aktivnosti to Client
	  res.send(aktivnosti);
	});
};

// Find a Aktivnost by Id
exports.findById = (req, res) => {	
	Aktivnost.findById(req.params.aktivnostId).then(aktivnost => {
		res.send(aktivnost);
	})
};

// Update a Aktivnost
exports.update = (req, res) => {
	const id = req.params.aktivnostId;
	Aktivnost.update( {naziv: req.body.naziv, pocetak: req.body.pocetak, kraj: req.body.kraj}, 
					 { where: {id: req.params.aktivnostId} }
				   ).then(() => {
					 res.status(200).send("Uspješno ažurirana aktivnost id = " + id);
				   });
};

// Delete a Aktivnost by Id
exports.delete = (req, res) => {
	const id = req.params.aktivnostId;
	Aktivnost.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisana aktivnost id = ' + id);
	});
};
