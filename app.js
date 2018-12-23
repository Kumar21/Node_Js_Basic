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
const courses =[
    {id:1,title:'course1'},
    {id:2,title:'course2'},
    {id:3,title:'course3'}
]
app.get('/',(req,res)=>{
    res.write('hey man');
    res.end();
});
app.get('/course/:year/:month',(req,res)=>{
    res.send(req.params);
    res.end();
})
app.get('/course/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("404 course not found");
    return res.send(course);
})
const port= process.env.port || 3001
app.listen(port,()=>console.log(`listening to the port ${port}..`))