module.exports = function(app) {
 
    const aktivnost = require('./aktivnost.controller.js');
 
    // Create a new Customer
    app.post('/v1/aktivnost', aktivnost.create);
 
    // Retrieve all Customer
    app.get('/v1/aktivnost', aktivnost.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/v1/aktivnost/:aktivnostId', aktivnost.findById);
 
    // Update a Customer with Id
    app.put('/v1/aktivnost/:aktivnostId', aktivnost.update);
 
    // Delete a Customer with Id
    app.delete('/v1/aktivnost/:aktivnostId', aktivnost.delete);
}