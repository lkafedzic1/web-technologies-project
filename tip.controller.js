var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Tip = db.tip;

//Post tip
exports.create = (req, res) => {	
	// Save to MySQL database
	Tip.create({  
        naziv: req.body.naziv
	}).then(tip => {		
		// Send created tip to client
		res.send(tip);
	});
};

// FETCH all Tip
exports.findAll = (req, res) => {
	Tip.findAll().then(tipovi => {
	  // Send all tipi to Client
	  res.send(tipovi);
	});
};

// Find a Tip by Id
exports.findById = (req, res) => {	
	Tip.findById(req.params.tipId).then(tip => {
		res.send(tip);
	})
};

// Update a Tip
exports.update = (req, res) => {
	const id = req.params.tipId;
	Tip.update( {naziv: req.body.naziv}, 
					 { where: {id: req.params.tipId} }
				   ).then(() => {
					 res.status(200).send("Uspješno ažuriran tip id = " + id);
				   });
};

// Delete a Tip by Id
exports.delete = (req, res) => {
	const id = req.params.tipId;
	Tip.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisan tip id = ' + id);
	});
};
