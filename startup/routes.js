const express = require('express');
const rentals= require('../routes/rentals');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const error = require('../middleware/error');
/* const courses = require('./routes/courses');
const customer = require('./routes/customers');
const WorkingUser = require('./workingDir/users');
const user = require('./models/user');
const auth = require('./models/auth'); */

module.exports = function(app) {
app.use(express.json());
app.use('/api/rentals',rentals);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use(error);
/* 
app.use('/api/genresRouter',genresRouter);
app.use('/api/courses',courses);
app.use('/api/customers',customer);
app.use('/api/wuser',WorkingUser)
app.use(log3);
app.use('/api/user',user);
app.use('/api/auth',auth);
app.use(express.static('./'));
app.set('view engine','pug');
app.set('views','../views'); // default
 */
}