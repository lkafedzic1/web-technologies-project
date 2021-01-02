const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); 

// app.get('/aktivnost', (req,res) => {
//     res.sendFile('./server-static/aktivnost.html', { root: __dirname});
// });

// app.get('/planiranjeNastavnik', (req,res) => {
//     res.sendFile('./server-static/planiranjeNastavnik.html', { root: __dirname});
// });

// app.get('/podaciStudent', (req,res) => {
//     res.sendFile('./podaciStudent.html', { root: __dirname});
// });

// app.get('/raspored', (req,res) => {
//     res.sendFile('./server-static/raspored.html', { root: __dirname});
// });

// app.get('/spirala2rasporedi', (req,res) => {
//     res.sendFile('./server-static/spirala2rasporedi.html', { root: __dirname});
// });

// app.get('/test', (req,res) => {
//     res.sendFile('./server-static/test.html', { root: __dirname});
// });

//get metode su suvisne obzirom da imamo public direktorij

app.listen(port, () => console.log("Listening on port ${port}!"));
