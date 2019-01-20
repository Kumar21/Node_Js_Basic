const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {validate,customers} = require('./customerValidate')
mongoose.connect('mongodb://localhost/customers',{useNewUrlParser : true})
    .then(()=>console.log(" Connecting to DB.."))
    .catch((error)=> console.log(" Error Occured", error));

router.get('/',async(req,res)=>{
    const customer = await customers.find().sort('name');
    res.send(customer);
})


async function createCourse() {
    const course = new customers({
        name: 'Kumar25',
        phone: 7688858813,
        isGold: true
    });
    try{const result = await course.save();
    console.log(result);}
    catch(err){
        for(field in err.errors)  // validation message
        console.log(err.errors[field].message);
    }
}

createCourse();

router.post('/',async(req,res)=>{
   try{ const valid = validate(req.body);
    if(!valid) return res.status(404).send(valid.error.details[0].message);
    const customer = new customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    
        const result = await customer.save();
        console.log(result);
        res.send(result);
    }catch(err){console.log(err);}
})
module.exports=router;