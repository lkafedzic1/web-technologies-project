var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Dan = db.dan;

//Post dan
exports.findOrCreate = (req, res) => {	
	// Save to MySQL database
	Dan.findOrCreate({  
        naziv: req.body.naziv
	}).then(dan => {		
		// Send findOrCreated dan to client
		res.send(dan);
	});
};

// FETCH all Dan
exports.findAll = (req, res) => {
	Dan.findAll().then(dani => {
	  // Send all dani to Client
	  res.send(dani);
	});
};

// Find a Dan by Id
exports.findById = (req, res) => {	
	Dan.findById(req.params.danId).then(dan => {
		res.send(dan);
	})
};

// Update a Dan
exports.update = (req, res) => {
	const id = req.params.danId;
	Dan.update( {naziv: req.body.naziv}, 
					 { where: {id: req.params.danId} }
				   ).then(() => {
					 res.status(200).send("Uspješno ažuriran dan id = " + id);
				   });
};

// Delete a Dan by Id
exports.delete = (req, res) => {
	const id = req.params.danId;
	Dan.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisan dan id = ' + id);
	});
};
