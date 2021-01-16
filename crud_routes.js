var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
db = require('./db.js');
db.sequelize.sync({ force: true }); //then...? inicijalizacijaconst 

module.exports = function(app) {
    const Aktivnost = db.aktivnosts;

    //Create new
    app.post('/v1/aktivnost', (req, res) => {
        // Save to MySQL database
        Aktivnost.create({
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
        Aktivnost.findById(req.params.aktivnostId).then(aktivnost => {
            res.send(aktivnost);
        })
    });
    //Update
    app.put('/v1/aktivnost', (req, res) => {
        const id = req.params.aktivnostId;
        Aktivnost.update({ naziv: req.body.naziv, pocetak: req.body.pocetak, kraj: req.body.kraj},
            { where: { id: req.params.aktivnostId } }
        ).then(() => {
            res.status(200).send("Uspješno ažurirana aktivnost koja ima id = " + id);
        });
    });
    //Delete
    app.delete('/v1/aktivnost', (req, res) => {
        const id = req.params.aktivnostId;
        Aktivnost.destroy({
        where: { id: id }
        }).then(() => {
        res.status(200).send('Uspješno obrisana aktivnost koja ima id = ' + id);
        });
    });
}