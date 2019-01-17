const express = require('express');
const router = express.Router();
const Joi = require('joi');

const movies =[
    {id:1,name:'aa',date:"01/10/15"},
    {id:2,name:'bb',date:"05/12/16"},
    {id:3,name:'cc',date:"03/02/14"},
]

router.get('/',(req,res)=>{
    res.send(movies);
    res.end();
})
router.post('/',(req,res)=>{
    const schema={
        name:Joi.string().min(3).required(),
        id:Joi.required(),
        date:Joi.required()
    };
    const result = Joi.validate(req.body,schema);
    if(result.error) return res.status(404).send(result.error.details[0].message);
    const movie = {
        id:req.body.id,
        name:req.body.name,
        date:req.body.date};
    movies.push(movie);
    res.send(movies);
})
router.put('/:id',(req,res)=>{
    const movie= movies.find(c=>c.id === parseInt(req.params.id))
    if(!movie) return res.status(404).send("id not found");
    const schema={
        name:Joi.string().  (3).required()
    };
    const result = Joi.validate(req.body,schema);
    if(result.error) return res.status(404).send(result.error.details[0].message);
    
    movie.name=req.body.name;
    res.send(movies);
})
router.delete('/:id',(req,res)=>{
    const movie = movies.find(c=>c.id===parseInt(req.params.id));
    if(!movie) return res.send(404).status("Id not found");

    const index = movies.indexOf(movie);
    movies.splice(index,1);
    res.send(movies);
})

module.exports = router;