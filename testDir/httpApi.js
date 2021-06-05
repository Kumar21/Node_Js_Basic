const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/gcSystem/',(req,res)=>{
    var name = 'hello Kumar';
    res.render("main.html", {name:name});
})
const port = process.env.port || 3209;
app.listen(port,()=>{
    console.log(" Port is started successfully at "+port);
})