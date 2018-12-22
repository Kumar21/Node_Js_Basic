module.exports.log2=callName;
function callName(name){
   // console.log("hi",name)
}

const path = require('path');
var pathObj = path.parse(__filename);

const os = require('os')
//console.log(os.totalmem())

const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.write('hey man');
    res.end();
});
app.get('/course/:year/:month',(req,res)=>{
    res.send(req.params);
    res.end();
})
app.get('/api',(req,res)=>{
    res.send(req.query);
})
const port= process.env.port || 3001
app.listen(port,()=>console.log(`listening to the port ${port}..`))