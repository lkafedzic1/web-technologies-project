var express = require("express");
const bodyParser = require("body-parser");
var app = express();

const db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? inicijalizacija

app.use(bodyParser.urlencoded({ extended: true }));


//rute za CRUD operacije (Create, Read, Update, Delete)

// app.post('/v1/aktivnosti', (req, res) => {
//     const id = req.body.id;
//     const naziv = req.body.naziv;
//     const pocetak = req.body.pocetak;
//     const kraj = req.body.kraj;
//     aktivnosti.create({
//         id: id,
//         naziv: naziv,
//         pocetak: pocetak,
//         kraj: kraj
//     });
// });

//Create new
app.post('/v1/aktivnost', (req, res) => {
    // Save to MySQL database
    aktivnost.create({
        id: req.body.id,
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj
    }).then(aktivnost => {
        // Send created aktivnost to client
        res.send(aktivnost);
    });
});
//Retrieve one
app.get('/v1/aktivnost', (req, res) => {
    aktivnost.findById(req.params.aktivnostId).then(aktivnost => {
        res.send(aktivnost);
    })
});
//Update
app.put('/v1/aktivnost', (req, res) => {
    const id = req.params.aktivnostId;
    aktivnost.update({ id: req.body.id,naziv: req.body.naziv, pocetak: req.body.pocetak, kraj: req.body.kraj},
        { where: { id: req.params.aktivnostId } }
    ).then(() => {
        res.status(200).send("Uspješno ažurirana aktivnost koja ima id = " + id);
    });
});
//Delete
app.delete('/v1/aktivnost', (req, res) => {
	const id = req.params.aktivnostId;
	aktivnost.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('Uspješno obrisana aktivnost koja ima id = ' + id);
	});
});
