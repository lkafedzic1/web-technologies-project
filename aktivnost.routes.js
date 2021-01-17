module.exports = function(app) {
 
    const aktivnost = require('./aktivnost.controller.js');
 
    // Create a new Aktivnost
    app.post('/v1/aktivnost', aktivnost.create);
 
    // Retrieve all Aktivnost
    app.get('/v1/aktivnost', aktivnost.findAll);
 
    // Retrieve a single Aktivnost by Id
    app.get('/v1/aktivnost/:aktivnostId', aktivnost.findById);
 
    // Update a Aktivnost with Id
    app.put('/v1/aktivnost/:aktivnostId', aktivnost.update);
 
    // Delete a Aktivnost with Id
    app.delete('/v1/aktivnost/:aktivnostId', aktivnost.delete);

}