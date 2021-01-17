var express = require("express");
var app = express();
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? 
const Grupa = db.grupa;

//Post grupa
// exports.create = (req, res) => {	
// 	// Save to MySQL database
// 	db.predmet.create({naziv:req.body.naziv})
// 	.then(p=>
// 		{
// 			Grupa.create({where: {
// 				naziv: req.body.naziv,
// 				predmet:p[0].id
// 			}}).then(grupa => {		
// 				// Send created grupa to client
// 				res.send(grupa);
// 			});
// 		}
// 	);
// };
exports.create = (req, res) => {	
	// Save to MySQL database
	Grupa.create({  
		naziv: req.body.naziv,
		predmetId: req.body.predmetId
	}).then(grupa => {		
		// Send created grupa to client
		res.send(grupa);
	});
};

// FETCH all Grupa
exports.findAll = (req, res) => {
	Grupa.findAll().then(grupe => {
	  // Send all grupai to Client
	  res.send(grupe);
	});
};

// Find a Grupa by Id
exports.findById = (req, res) => {	
	Grupa.findById(req.params.grupaId).then(grupa => {
		res.send(grupa);
	})
};

// Update a Grupa
exports.update = (req, res) => {
	const id = req.params.grupaId;
	Grupa.update( {naziv: req.body.naziv, predmetId: req.body.predmetId}, 
					 { where: {id: req.params.grupaId} }
				   ).then(() => {
					 res.status(200).send("Uspješno ažurirana grupa id = " + id);
				   });
};

// Delete a Grupa by Id
exports.delete = (req, res) => {
	const id = req.params.grupaId;
	Grupa.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisana grupa id = ' + id);
	});
};
