const jwt = require('jsonwebtoken');
const config = require('config');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('./uservalidate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
/* mongoose.connect('mongodb://localhost/newTest', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 */
router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  })
router.get('/', async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});
router.post('/',auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  /*   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }); */
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  // res.send(await User.find().sort('name'));
  //res.send({id:user.id,name:user.name,email:user.email});

 // const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
 const token = user.generateAuthToken();
 res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email']));
  //res.header('Type-of-dev','prod').send('prod environment');
  console.log("success");
});

router.delete('/', [auth,admin], async (req, res) => {
  const name = await User.findOne({ name: req.body.name });
  if (!name) return res.status(404).send('Name does not exist');
  await User.deleteOne({ name: req.body.name })
  res.send(await User.find().sort('name'));
})
module.exports = router;
/* const port = process.env.PORT || 3005;
router.listen(port, () => console.log(`Listening on port ${port}...`)); */
