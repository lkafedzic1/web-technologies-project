var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const port = 3000;
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/predmeti', function (req, res) {
    //vraća niz JSON objekata predmeta {naziv:string}
    let predmeti = [];
    var predmetiReader = require('readline').createInterface({
        input: fs.createReadStream('predmeti.txt')
    });
    predmetiReader.on('line', function (line) {
        predmeti.push({ naziv: line });
    });

    predmetiReader.on('close', function () {
        res.json(predmeti);
    });
});

app.get('/aktivnosti', function (req, res) {
    //vraća niz JSON objekata aktivnosti {naziv:string,tip:string,pocetak:integer,kraj:integer,dan:string}
    let aktivnosti = [];
    var aktivnostiReader = require('readline').createInterface({
        input: fs.createReadStream('aktivnosti.txt')
    });
    aktivnostiReader.on('line', function (line) {
        var vrijednostiAktivnost = line.split(',');
        var aktivnost = { naziv: vrijednostiAktivnost[0], tip: vrijednostiAktivnost[1], pocetak: vrijednostiAktivnost[2], kraj: vrijednostiAktivnost[3], dan: vrijednostiAktivnost[4] };

        aktivnosti.push(aktivnost);
    });
    aktivnostiReader.on('close', function () {
        res.json(aktivnosti);
    });
});

//var reg = new RegExp('\/predmet\/:[a-zA-Z]{2,}[0-9]*\/aktivnost');
//app.get('/predmet/:naziv/aktivnost', function (req, res) {

app.get('/predmet/:naziv/aktivnost', function (req, res) {
    //vraća niz objekata aktivnosti za zadani predmet
    let aktivnostiPredmeta = [];

    fs.readFile("aktivnosti.txt", function (err, content) {
        var tekst = content.toString();
        var line = tekst.split("\n");
        for (var i = 0; i < line.length; i++) {
            var vrijednostiAktivnost = line[i].split(',');
            if (vrijednostiAktivnost[0] == req.params.naziv) {
                var aktivnost = { naziv: vrijednostiAktivnost[0], tip: vrijednostiAktivnost[1], pocetak: vrijednostiAktivnost[2], kraj: vrijednostiAktivnost[3], dan: vrijednostiAktivnost[4] };
                aktivnostiPredmeta.push(aktivnost);
            }
        }

        res.send(aktivnostiPredmeta);
    });
});

app.post('/predmet', function (req, res) {
    //vraća niz objekata aktivnosti za zadani predmet
    let nazivPredmeta = req.body["naziv"];
    let postojiPredmet = false;

    var predmetiReader = require('readline').createInterface({
        input: fs.createReadStream('predmeti.txt')
    });
    var anyLines = false;
    predmetiReader.on('line', function (line) {
        if (line == nazivPredmeta) {
            postojiPredmet = true;
        }

        if(line) {
            anyLines = true;
        }
    });

    predmetiReader.on('close', function () {
        if (postojiPredmet) {
            res.json({ message: "Naziv predmeta postoji!" });
            return;
        }

        let novaLinija = (anyLines ? "\n" : "") + nazivPredmeta;
        fs.appendFile('predmeti.txt', novaLinija, function (err) {
            if (err) throw err;
            res.json({ message: "Uspješno dodan predmet!" });
        });
    })
});

app.post('/aktivnost', function (req, res) {
    let tijelo = req.body;
    try {

       
        let vrijemePocetak = parseFloat(tijelo['pocetak'].replace(':00', '').replace(':30', '.5'));
        let vrijemeKraj = parseFloat(tijelo['kraj'].replace(':00', '').replace(':30', '.5'));
        let zadnjiSat = 20;
        let prviSat = 8;
        let validDani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"]
        let dan = tijelo["dan"];
        let isValid = true;
        // console.log((vrijemePocetak < prviSat || vrijemePocetak > zadnjiSat));
        // console.log((vrijemeKraj < prviSat || vrijemeKraj > zadnjiSat));
        // console.log((vrijemeKraj <= vrijemePocetak));
        // console.log(vrijemePocetak);
        // console.log(vrijemeKraj);
        if ((vrijemePocetak < prviSat || vrijemePocetak > zadnjiSat)
            || (vrijemeKraj < prviSat || vrijemeKraj > zadnjiSat)
            || (vrijemeKraj <= vrijemePocetak)) {
                console.log('lose 1');
            isValid = false;
        }

        if (!validDani.some(validDan => validDan == dan)) {
            console.log('lose 2');
            isValid = false;
        }

        const fileName = "aktivnosti.txt";

        fs.readFile(fileName, function (err, content) {
            var tekst = content.toString();
            var linije = tekst.split("\n");

            for (var i = 0; i < linije.length; i++) {
                var vrijednostiAktivnost = linije[i].split(',');
                if (dan == vrijednostiAktivnost[4]) {
                    var pocetakAktivnosti = parseFloat(vrijednostiAktivnost[2].replace(':00', '').replace(':30', '.5'));
                    var krajAktivnosti = parseFloat(vrijednostiAktivnost[3].replace(':00', '').replace(':30', '.5'));

                    if (vrijemePocetak < krajAktivnosti && pocetakAktivnosti < vrijemeKraj) {
                        console.log('lose 3');
                        isValid = false;
                    }
                }
            }

            if (!isValid) {
                res.json({ message: "Aktivnost nije validna!" });
                return;
            }

            let lineBreak = tekst ? "\n" : "";
            let novaLinija = lineBreak + tijelo['naziv'] + "," + tijelo['tip'] +
            "," + tijelo['pocetak'] + "," + tijelo['kraj'] + "," + tijelo['dan'];


            fs.appendFile('aktivnosti.txt', novaLinija, function (err) {
                if (err) throw err;
                res.json({ message: "Uspješno dodana aktivnost!", data: novaLinija });
            });
        });
    }
    catch (e) {
        console.log(e);
        res.json({ message: "Aktivnost nije validna!" });
    }
});

app.delete('/aktivnost/:naziv', function (req, res) {
    try {
        const fileName = "aktivnosti.txt";

        fs.readFile(fileName, function (err, content) {
            var tekst = content.toString();
            var linije = tekst.split("\n");

            for (var i = 0; i < linije.length; i++) {
                var vrijednostiAktivnost = linije[i].split(',');
                var nazivAktivnosti = vrijednostiAktivnost[0];

                if (nazivAktivnosti == req.params.naziv) {
                    linije.splice(i, 1);
                }
            }
            linije = linije.join("\n");
            fs.writeFile(fileName, linije, function (err) {
                if (err) throw err;
                res.json({ message: "Uspješno obrisana aktivnost!" });
            });

        });
    }
    catch (e) {
        res.json({ message: "Greška - aktivnost nije obrisana!" });
    }
});
app.delete('/predmet/:naziv', function (req, res) {
    try {
        const fileName = "predmeti.txt";

        fs.readFile(fileName, function (err, content) {
            var tekst = content.toString();
            var linije = tekst.split("\n");

            for (var i = 0; i < linije.length; i++) {
                var nazivPredmeta = linije[i];
                if (nazivPredmeta == req.params.naziv) {
                    linije.splice(i, 1);
                }
            }

            linije = linije.join("\n");
            fs.writeFile(fileName, linije, function (err) {
                if (err) throw err;
                res.json({ message: "Uspješno obrisan predmet!" });
            });

        });
    }
    catch (e) {
        res.json({ message: "Greška - predmet nije obrisan!" });
    }
});

app.delete('/all', function (req, res) {
    try {
        fs.truncate('predmeti.txt', 0, function () { });
        fs.truncate('aktivnosti.txt', 0, function () { });
        res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
    }
    catch (e) {
        res.json({ message: "Greška - sadržaj datoteka nije moguće obrisati!" });
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})

module.exports = app;