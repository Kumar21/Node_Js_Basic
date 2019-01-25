const express = require('express');
 const {log3} = require('./middleware/logger');
const genresRouter = require('./routes/genres')
const courses = require('./routes/courses');
const customer = require('./routes/customers');
//const WorkingUser = require('./workingDir/users');
const checkuser = require('./models/user');
const app = express();

//app.use('/api/genres',genresRouter);
//app.use('/api/courses',courses);
//app.use('/api/customers',customer);
//app.use('/api/wuser',WorkingUser)
app.use('/api/checkuser',checkuser);
app.use(express.json());
app.use(express.static('./'));
 app.use(log3);

app.set('view engine','pug');
app.set('views','./views'); // default

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));