module.exports = function(app) {
 
    const tip = require('./tip.controller.js');
 
    // Create a new Tip
    app.post('/v2/tip', tip.create);
 
    // Retrieve all Tip
    app.get('/v2/tip', tip.findAll);
 
    // Retrieve a single Tip by Id
    app.get('/v2/tip/:tipId', tip.findById);
 
    // Update a Tip with Id
    app.put('/v2/tip/:tipId', tip.update);
 
    // Delete a Tip with Id
    app.delete('/v2/tip/:tipId', tip.delete);

}