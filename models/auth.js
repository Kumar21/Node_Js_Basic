const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('./uservalidate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
mongoose.connect('mongodb://localhost/newTest', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

router.get('/', async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
  console.log("success");
});

function validate(user){
    const Schema ={
        password:Joi.string().min(3).required(),
        email:Joi.string().min(3).required()
    }
   return Joi.validate(user,Schema);
}

module.exports = router;
