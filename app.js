const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = express();
app.use(express.json());
app.use(express.static('./'));
app.use(logger);
app.set('view engine','pug');
app.set('views','./views'); // default

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]
app.get('/',(req,res)=>{
   res.render('index',{title:'Pug Title',message:'Template is rendering now'});
})
app.get('/courses',(req,res)=>{
    res.send(courses); 
    res.end();
})
app.get('/course/api/:year/:month',(req,res)=>{
    res.send(req.params);  //output: {"year":"2018","month":"05"}
    //res.send(req.params.year);
    /* Query String parameters
    res.send(req.query);  //output: {"shortBy":"name"}
    http://localhost:5000/course/api/2018/05?shortBy=name */
})
app.get('/course/:id',(req,res)=>{
    const course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("404 not found course");
    return res.send(course);
})
app.post('/course/',(req,res)=>{
    const shema = {
        name :Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,shema);
    if(result.error){
        return res.status(404).send(result.error.details[0].message);
       
    }
    const course ={
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(result.value);
})
//type set port=5000 at console 
app.post('/coursee',(req,res)=>{
    const schema={
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema)
    if(result.error){
        return res.status(404).send(result.error.details[0].message);
        
    }
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/course/:id',(req,res)=>{
    //checking the course
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    // validation 
    const schema= {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    if(result.error){
        return res.status(404).send(result.error.details[0]);
    }
    //Update the course
    course.name = req.body.name;
    //Return the updated course
    res.send(course)
})

app.delete('/api/course/:id',(req,res)=>{
    //Look up the course
    const course = courses.find(c => c.id===parseInt(req.params.id));
    //Not Existing return 404
    if(!course) return res.status(404).send("Course not found");
    //Delete
    const index=courses.indexOf(course);
    courses.splice(index,1);
    //Return thr same course
    res.send(courses);
})
const port = process.env.port || 3001
app.listen(port,()=>console.log(`Listening to the port ${port} ..`));
