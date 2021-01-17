module.exports = function(app) {
 
    const student = require('./student.controller.js');
 
    // Create a new Student
    app.post('/v2/student', student.create);
 
    // Retrieve all Student
    app.get('/v2/student', student.findAll);
 
    // Retrieve a single Student by Id
    app.get('/v2/student/:studentId', student.findById);
 
    // Update a Student with Id
    app.put('/v2/student/:studentId', student.update);
 
    // Delete a Student with Id
    app.delete('/v2/student/:studentId', student.delete);

}