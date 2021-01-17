module.exports = function(app) {
 
    const predmet = require('./predmet.controller.js');
 
    // Create new predmet
    app.post('/v1/predmet', predmet.create);
 
    // Retrieve all predmets
    app.get('/v1/predmet', predmet.findAll);
 
    // Retrieve single predmet by Id
    app.get('/v1/predmet/:predmetId', predmet.findById);
 
    // Update predmet with Id
    app.put('/v1/predmet/:predmetId', predmet.update);
 
    // Delete predmet with Id
    app.delete('/v1/predmet/:predmetId', predmet.delete);
}