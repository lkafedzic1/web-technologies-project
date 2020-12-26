let assert = chai.assert;
 describe('Raspored', function() {
 describe('iscrtajRaspored()', function() {
    it('treba nacrtati 2 reda, kada ima 1 dan', function() {
        Raspored.iscrtajRaspored(ispis, ["Ponedjeljak"],8,21);
        let okvir = document.getElementById("ispis");
        let rasporedi = okvir.getElementsByTagName("table");
        let raspored = rasporedi[0];
        let redovi = raspored.getElementsByTagName("tr");
        assert.equal(redovi.length, 2, "Broj redova treba biti 2");   
    }); 
 });
 describe('iscrtajRaspored()', function() {
    it('treba nacrtati 6 redova, kada ima 5 dana', function() {
        Raspored.iscrtajRaspored(ispis, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,21);
        let okvir = document.getElementById("ispis");
        let rasporedi = okvir.getElementsByTagName("table");
        let raspored = rasporedi[0];
        let redovi = raspored.getElementsByTagName("tr");
        assert.equal(redovi.length, 6, "Broj redova treba biti 6");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba nacrtati 4 kolone za upis kada je razlika kraja i pocetka 2 sata', function() {
        Raspored.iscrtajRaspored(ispis, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,10);
        let okvir = document.getElementById("ispis");
        let redovi = okvir.getElementsByTagName("tr");
        let red = redovi[1];
        let kolone = red.getElementsByTagName("td");
        assert.equal(kolone.length, 4, "Broj kolona treba biti 4");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba ispisati prvi sat početka rasporeda čak i kada je to jedini sat', function() {
        Raspored.iscrtajRaspored(ispis, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,9);
        let okvir = document.getElementById("ispis");
        let redovi = okvir.getElementsByTagName("tr");
        let red = redovi[0];
        let kolona = red.getElementsByTagName("th")[1].innerHTML;
        assert.equal(kolona, '8:00', "Treba pisati početak rasporeda 8:00");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba nacrtati 2 kolone za upis kada je razlika kraja i početka 1 sat', function() {
        Raspored.iscrtajRaspored(ispis, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,9);
        let okvir = document.getElementById("ispis");
        let redovi = okvir.getElementsByTagName("tr");
        let red = redovi[1];
        let kolone = red.getElementsByTagName("td");
        assert.equal(kolone.length, 2, "Broj kolona treba biti 2");   
    });
 });

 describe('iscrtajRaspored()', function() {
    it('treba ispisati grešku kada početak nije cijeli broj', function() {
        Raspored.iscrtajRaspored(ispis1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8.5,12);
        var res = ispis1.innerHTML;
        assert.equal(res, 'Greška', "Sadržaj elementa treba biti 'Greška'");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba ispisati grešku kada kraj nije cijeli broj', function() {
        Raspored.iscrtajRaspored(ispis1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,11.5);
        var res = ispis1.innerHTML;
        assert.equal(res, 'Greška', "Sadržaj elementa treba biti 'Greška'");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba ispisati grešku kada su sat početka i kraja jednaki', function() {
        Raspored.iscrtajRaspored(ispis1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],9,9);
        var res = ispis1.innerHTML;
        assert.equal(res, 'Greška', "Sadržaj elementa treba biti 'Greška'");   
    });
 });
 describe('iscrtajRaspored()', function() {
    it('treba ispisati grešku kada raspored završava prije nego što je počeo', function() {
        Raspored.iscrtajRaspored(ispis1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],9,8);
        var res = ispis1.innerHTML;
        assert.equal(res, 'Greška', "Sadržaj elementa treba biti 'Greška'");   
    });
 });

 describe('iscrtajRaspored()', function() {
    it('treba postaviti ispod postojećeg, raspored koji se doda drugi', function() {
        Raspored.iscrtajRaspored(ispis1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],9,22);
        let brojac = document.getElementsByTagName("table").length;
        assert.equal(brojac, 2, "Treba nacrtati drugi raspored ispod postojećeg");   
    });
 });

 describe('dodajAktivnost()', function() {
    it('treba prikazati aktivnost koju smo dodali', function() {
        Raspored.dodajAktivnost(ispis1, "WT", "Predavanje", 9, 12, "Srijeda"); 
     let red = document.getElementById("ispis1").getElementsByTagName("tr")[3];
     let brojac = red.getElementsByClassName("block").length;
      assert.equal(brojac, 1, 'Treba dodati zauzeti blok aktivnosti');
   });
 });

 describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku', function() {
      var res = Raspored.dodajAktivnost(ispis1, "WT", "Predavanje", 9, 12, "Šestak"); 
       assert.equal(res, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
 
describe('dodajAktivnost()', function() {
   it('treba prikazati aktivnost koju smo dodali', function() {
   Raspored.dodajAktivnost(ispis1, "RG", "Vježba", 10.5, 12, "Utorak"); 
   let red = document.getElementById("ispis1").getElementsByTagName("tr")[3];
   let brojac = red.getElementsByClassName("block").length;
    assert.equal(brojac, 1, 'Treba dodati zauzeti blok aktivnosti');
 });
});
describe('dodajAktivnost()', function() {
   it('treba prikazati aktivnosti koje završe na pola sata', function() {
   Raspored.dodajAktivnost(ispis1, "WT", "Vježba", 10, 12.2, "Petak"); 
   let red = document.getElementById("ispis1").getElementsByTagName("tr")[2];
   let brojac = red.getElementsByClassName("block").length;
    assert.equal(brojac, 1, 'Treba dodati zauzeti blok aktivnosti');
 });
});
describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku radi preklapanja', function() {
      var res = Raspored.dodajAktivnost(ispis1, "RG", "Predavanje", 10, 13, "Srijeda"); 
       assert.equal(res, 'Greška - već postoji termin u rasporedu u zadanom vremenu', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku radi preklapanja', function() {
      var res = Raspored.dodajAktivnost(ispis1, "RG", "Predavanje", 10, 11, "Utorak"); 
       assert.equal(res, 'Greška - već postoji termin u rasporedu u zadanom vremenu', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku radi preklapanja', function() {
      var res = Raspored.dodajAktivnost(ispis1, "RG", "Predavanje", 9.5, 13, "Utorak"); 
       assert.equal(res, 'Greška - već postoji termin u rasporedu u zadanom vremenu', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku jer je sredina termina zauzeta', function() {
      var res = Raspored.dodajAktivnost(ispis1, "RG", "Predavanje", 9.5, 11, "Srijeda"); 
       assert.equal(res, 'Greška - već postoji termin u rasporedu u zadanom vremenu', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
describe('dodajAktivnost()', function() {
   it('treba izbaciti grešku jer je nepostojeći dan', function() {
      var res = Raspored.dodajAktivnost(ispis1, "RG", "Predavanje", 12, 13, "Saturday"); 
       assert.equal(res, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin', 'Treba vratiti grešku bez dodavanja aktivnosti');
  });
});
describe('dodajAktivnost()', function() {
   it('treba dodati aktivnost u prvi raspored', function() {
      Raspored.dodajAktivnost(ispis, "RG", "Vježba", 8, 9, "Srijeda"); 
       let red = document.getElementById("ispis").getElementsByTagName("tr")[3];
       let brojac = red.getElementsByClassName("block").length;
      assert.equal(brojac, 1, 'Treba dodati aktivnost');
  });

});
describe('dodajAktivnost()', function() {
   it('treba vratiti grešku zbog nepostojećeg vremena', function() {
      var res = Raspored.dodajAktivnost(ispis1, "WT", "Predavanje", 8, 10, "Utorak"); 
      assert.equal(res, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin', 'Treba vratiti grešku sa tačnim tekstom za nepostojeće vrijeme');
  });

});
});
