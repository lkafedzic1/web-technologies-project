const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db.js');

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync with { force: true }');
});

require('./crud_routes.js')(app);

// Create a Server
var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://localhost:${ port }`)
})


