module.exports = function(app) {
 
    const grupa = require('./grupa.controller.js');
 
    // Create a new grupa
    app.post('/v2/grupa', grupa.create);
 
    // Retrieve all grupa
    app.get('/v2/grupa', grupa.findAll);
 
    // Retrieve a single grupa by Id
    app.get('/v2/grupa/:grupaId', grupa.findById);
 
    // Update a grupa with Id
    app.put('/v2/grupa/:grupaId', grupa.update);
 
    // Delete a grupa with Id
    app.delete('/v2/grupa/:grupaId', grupa.delete);

}