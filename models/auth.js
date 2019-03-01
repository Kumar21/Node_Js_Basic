const _ = require('lodash');
const config= require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('./uservalidate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
/* mongoose.connect('mongodb://localhost/newTest', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 */
router.get('/', async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');
  
  let validPassword = await bcrypt.compare(req.body.password,user.password);
  if(!validPassword) return res.status(404).send('Invalid email or password');

  // const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user){
    const Schema ={
        password:Joi.string().min(3).required(),
        email:Joi.string().min(3).required()
    }
   return Joi.validate(user,Schema);
}

module.exports = router;
