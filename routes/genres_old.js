const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB... for videly'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const Genere= mongoose.model('Genere', new mongoose.Schema({
    name:{type: String,
        required: true,
        minlength: 5,
        maxlength: 50}
}));

router.get('/',async (req,res)=>{
    try{
        const geners = await Genere.find().sort('name');
    res.send(geners);
    res.end();
    }catch(e){console.log(e);}
});
router.post('/',async (req,res)=>{
    try{
        const schema={
            name:Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body,schema);
        if(result.error) return res.status(404).send(result.error.details[0].message);
        let genere = new Genere({name:req.body.name});
        genere = await genere.save();
        res.send(genere);
    }catch(e){console.log(e);}
});
router.put('/:id',async (req,res)=>{
    const schema={name:Joi.string().min(3).required()};
    const result = Joi.validate(req.body,schema);
    if(result.error) return res.status(404).send(result.error.details[0].message);
    
    let genere = await Genere.findByIdAndUpdate(req.params.id,{name:req.body.name,
        new:true})
    if(!genere) return res.status(404).send("id not found");
    res.send(genere);
});
router.delete('/:id',async (req,res)=>{

    let genere = await Genere.findByIdAndRemove(req.params.id);
    if(!genere) return res.send(404).status("Id not found");
    res.send(genere);
});
module.exports = router;