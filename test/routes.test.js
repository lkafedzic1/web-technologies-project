const fs = require('fs')
const app = require("../routes")
const chai = require("chai")
const chaiHttp = require("chai-http");
const { doesNotMatch } = require('assert');

const { expect } = chai;
chai.use(chaiHttp);

var sadrzaj = fs.readFileSync('testniPodaci.txt');
var linije = sadrzaj.toString().split('\n');

for (var i = 0; i < linije.length; i++) {
        describe('HTTP zahtjevi', function () {

        let re = /\s*(?:(\[|\{)[^}]*(\}\]|\})|[^,]+)/ig;
        var kolone = linije[i].match(re);
        var operacija = kolone[0];
        var ruta = kolone[1];
        var ulaz = kolone[2];
        var izlaz = kolone[3];
        ulaz = ulaz.split('\\').join('');
        izlaz = izlaz.split('\\').join('');
        // describe(ruta, function () {
            if (operacija == "GET") {
                var opis = "GET " + ruta;
                it(opis, function () {
                    chai
                        .request(app)
                        .get(ruta)
                        .end((err, res) => {
                         //   expect(res).to.have.status(200);
                         console.log(izlaz);
                            expect(res.body).to.deep.equal(JSON.parse(izlaz));
                            if (err) expect(res.body.message).to.equals(izlazF);
                        });
                });
            }
            else if (operacija == "POST") {
                opis = "POST" + ruta;
                switch (ruta) {
                    case '/predmet': {
                        izlaz = 'Uspješno dodan predmet!';
                        izlazF = 'Naziv predmeta postoji!';
                        break;
                    }
                    case '/aktivnost': {
                        izlaz = 'Uspješno dodana aktivnost!';
                        izlazF = 'Aktivnost nije validna!';
                        break;
                    }
                }
                it(opis, function () {
                    chai
                        .request(app)
                        .post(ruta)
                        .send(JSON.parse(ulaz))
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body.message).to.equals(izlaz);
                            if (err) expect(res.body.message).to.equals(izlazF);
                        });
                });

            }
            else if (operacija == "DELETE") {
                opis = "DELETE" + ruta;
                switch (ruta) {
                    case '/aktivnost/:naziv': {

                        izlaz = 'Uspješno obrisana aktivnost!';
                        izlazF = 'Greška - aktivnost nije obrisana!';
                        break;
                    }
                    case '/predmet/:naziv': {
                        izlaz = 'Uspješno obrisan predmet!';
                        izlazF = 'Greška - predmet nije obrisan!';
                        break;
                    }
                    case '/all': {
                        izlaz = 'Uspješno obrisan sadržaj datoteka!';
                        izlazF = 'Greška - sadržaj datoteka nije moguće obrisati!';
                        break;
                    }
                    default: {
                        izlaz = JSON.parse(izlaz).message;
                    }
                }
                it(opis, function () {
                    chai
                        .request(app)
                        .delete(ruta)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body.message).to.equals(izlaz);
                            if (err) expect(res.body.message).to.equals(izlazF);
                        });
                });
            }
            // });
        });
        }
        