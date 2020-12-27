
function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    let s;
    if (!(Number.isInteger(satPocetak) && Number.isInteger(satKraj))
        || satPocetak >= satKraj
        || !(satPocetak >= 0 && satPocetak <= 24)
        || !(satKraj >= 0 && satPocetak <= 24)) {
        s = "Greška";
    }

    s = '<table>';
    s = iscrtajKolone(s, satPocetak, satKraj);
    s = iscrtajSate(s, satPocetak, satKraj);


    for (i = 0; i < dani.length; i++) {
        s += "<tr>";
        s += '<th scope="day" class="day" colspan="8">' + dani[i] + "</th>";

        for (j = satPocetak; j < satKraj; j++) {
            s += '<td class="' + dani[i] + j + '"></td><td class="' + dani[i] + (j + 0.5) + '"></td>';
        }
        s += "</tr>";
    }
    s += "</table>";
    div.innerHTML = s;
}

function iscrtajKolone(s, satPocetak, satKraj) {
    s += '<col span="8">';
    for (j = satPocetak; j < satKraj; j++) {
        s += '<colgroup';
        if (j % 2 == 0) {
            s += ' class="other"';
        }
        s += '><col class="first"><col class="second"></colgroup>';
    }
    return s;
}

function iscrtajSate(s, satPocetak, satKraj) {
    s += '<tr scope="hour" class="hours">';
    s += '<th id="empty" colspan="7"></th>';

    for (j = satPocetak; j < satKraj; j++) {
        if (j == satPocetak || (((j <= 12 && j % 2 == 0) || (j >= 15 && j % 2 != 0)) && (j < satKraj - 1))) {
            //jer je na vjezbama receno da ispise prvi sat, i ako je 22 satKraj da se ispisuje do 19
            s += '<th class="hour" colspan="2">' + j + ":00</th>";
        }
        else {
            s += "<th></th><th></th>";
        }
    }
    s += "<th></th>"; //zbog manjka od colspan="7"
    s += "</tr>";
    return s;
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    if (!raspored || !raspored.innerHTML) {
        //alert('Greška - raspored nije kreiran');
        return "Greška - raspored nije kreiran";
    }

    var dani = raspored.getElementsByClassName('day');
    var sati = raspored.getElementsByClassName('hour');
    var isValidDani = false;
    var zadnjiSat;

    var prviSat = sati[0].innerHTML.replace(':00', '');
    var zadnjiSat = sati[sati.length - 1].innerHTML.replace(':00', '') + 2;

    if ((vrijemePocetak < prviSat || vrijemePocetak > zadnjiSat)
        || (vrijemeKraj < prviSat || vrijemeKraj > zadnjiSat)
        || vrijemeKraj < vrijemePocetak) {
        //alert('Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin');
        return "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
    }

    for (let i = 0; i < dani.length; i++) {
        const element = dani[i];
        if (element.innerHTML == dan) {
            isValidDani = true;
        }
    }

    if (!isValidDani) {
        //alert('Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin');
        return "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
    }

    var prvaCelija = raspored.getElementsByClassName(dan + vrijemePocetak)[0];

    if (!prvaCelija) {
       //alert('Greška - već postoji termin u rasporedu u zadanom vremenu');
        return "Greška - već postoji termin u rasporedu u zadanom vremenu";
    }

    let daniCelije = [];
    let count = 1;
    var trenutnaCelija = prvaCelija;

    for (i = vrijemePocetak; i < vrijemeKraj - 0.5; i += 0.5) {
        var trenutnaCelija = raspored.getElementsByClassName(dan + (i + 0.5))[0];

        if (!trenutnaCelija) {
            //alert('Greška - već postoji termin u rasporedu u zadanom vremenu');
            return "Greška - već postoji termin u rasporedu u zadanom vremenu";
        }

        daniCelije.push(trenutnaCelija);
        count++;
    }

    for (let i = 0; i < daniCelije.length; i++) {
        let celija = daniCelije[i];
        celija.remove();
    }

    let novaCelijaNode = document.createElement('td');
    novaCelijaNode.className = 'block';
    novaCelijaNode.colSpan = count;
    novaCelijaNode.innerHTML = naziv + '<br>' + tip;

    if (prvaCelija.nextSibling) {
        prvaCelija.parentNode.insertBefore(novaCelijaNode, prvaCelija.nextSibling);
    } else {
        prvaCelija.parentNode.appendChild(novaCelijaNode);
    }

    prvaCelija.remove();
}