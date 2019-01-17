const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/customer',{useNewUrlParser : true})
    .then(()=>console.log(" Connecting to DB.."))
    .catch((error)=> console.log(" Error Occured", error));

const Schema = new mongoose.Schema({
    name : {type:String,minlength :1, required: true},
    phone :{type:Number, required: true, minlength: 5},
    isGold : Boolean
})

router.get('/',(req,res)=>{
    res.sendStatus(Cutomers);
})




module.exports=router;