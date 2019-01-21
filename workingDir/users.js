const {User, validate} = require('./user');
const mongoose = require('mongoose');
const express = require('express');
const router = express();
router.use(express.json());
mongoose.connect('mongodb://localhost/newTest')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

router.get('/api/users',async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});
router.post('/api/users', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name:req.body.name,
    email:req.body.email,
    password: req.body.password
  });
  const result = await user.save();
  res.send(result);
  console.log("success");
});
const port = process.env.PORT || 3005;
router.listen(port, () => console.log(`Listening on port ${port}...`));
