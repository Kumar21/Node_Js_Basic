const express = require('express');
const app = express();


const courses = [
    {id:'01',name:"title01"},
    {id:'03',name:"title02"},
    {id:'03',name:"title03"},
] 
app.get('/api/course',(req,res)=>{
    res.send(courses);
})

const port = process.env.port | 3002;
app.listen(port, console.log("Linten to port ",port));