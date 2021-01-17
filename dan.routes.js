module.exports = function(app) {
 
    const dan = require('./dan.controller.js');
 
    // Create a new dan
    app.post('/v2/dan', dan.create);
 
    // Retrieve all dan
    app.get('/v2/dan', dan.findAll);
 
    // Retrieve a single dan by Id
    app.get('/v2/dan/:danId', dan.findById);
 
    // Update a dan with Id
    app.put('/v2/dan/:danId', dan.update);
 
    // Delete a dan with Id
    app.delete('/v2/dan/:danId', dan.delete);

}