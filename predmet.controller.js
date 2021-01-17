var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Predmet = db.predmet;

//Post predmet
exports.create = (req, res) => {	
	// Save to MySQL database
	Predmet.create({  
        naziv: req.body.naziv
	}).then(predmet => {		
		// Send created predmet to client
		res.send(predmet);
	});
};

// FETCH all Predmet
exports.findAll = (req, res) => {
	Predmet.findAll().then(predmeti => {
	  // Send all predmeti to Client
	  res.send(predmeti);
	});
};

// Find a Predmet by Id
exports.findById = (req, res) => {	
	Predmet.findById(req.params.predmetId).then(predmet => {
		res.send(predmet);
	})
};

// Update a Predmet
exports.update = (req, res) => {
	const id = req.params.predmetId;
	Predmet.update( {naziv: req.body.naziv}, 
					 { where: {id: req.params.predmetId} }
				   ).then(() => {
					 res.status(200).send("Uspješno ažuriran predmet id = " + id);
				   });
};

// Delete a Predmet by Id
exports.delete = (req, res) => {
	const id = req.params.predmetId;
	Predmet.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisan predmet id = ' + id);
	});
};
