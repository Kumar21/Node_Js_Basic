const express = require('express');
const logger = require('./middleware/logger');
const genres = require('./routes/genres')
const courses = require('./routes/courses');
const customer = require('./routes/customers')
const app = express();

app.use('/api/genres',genres);
app.use('/api/courses',courses);
app.use('/api/customers',customer);
app.use(express.json());
app.use(express.static('./'));
app.use(logger);

app.set('view engine','pug');
app.set('views','./views'); // default

const port = process.env.port || 3001
app.listen(port,()=>console.log(`Listening to the port ${port} ..`));

