const mongoose = require('mongoose');
const Joi = require('joi');
const config= require('config');
const jwt = require('jsonwebtoken');

let userSchema= new mongoose.Schema({
    name:{type:String,required:true,minlength:4},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,min:4},
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('user',userSchema);

function validateUser(user){
    const Schema ={
        name:Joi.string().min(3).required(),
        password:Joi.string().min(3).required(),
        email:Joi.string().min(3).required()
    }
   return Joi.validate(user,Schema);
}

exports.User = User;
exports.validate=validateUser;