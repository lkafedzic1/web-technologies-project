function test() {
    let okvir = document.getElementById("okvir");
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);

    var response = dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
    if (response) alert(response);
    response = dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
    if (response) alert(response);
    response = dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
    if (response) alert(response);
    response = dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    if (response) alert(response);
    response = dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
    if (response) alert(response);

    let okvir1 = document.getElementById("okvir1");
    iscrtajRaspored(okvir1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 23);
    response = dodajAktivnost(okvir1, "RG", "vježbe", 9, 12, "Ponedjeljak");
    if (response) alert(response);
    response = dodajAktivnost(okvir1, "WT", "vježbe", 9, 12, "Utorak");
    if (response) alert(response);
    response = dodajAktivnost(okvir1, "PWS", "predavanje", 12, 15, "Utorak");
    if (response) alert(response);
    response = dodajAktivnost(okvir1, "PJP", "predavanje", 12.5, 15.5, "Petak");
    if (response) alert(response);
    response = dodajAktivnost(okvir1, "WT", "predavanje", 17, 20, "Srijeda");
    if (response) alert(response);

}

