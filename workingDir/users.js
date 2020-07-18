const {User, validate} = require('./user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
/* mongoose.connect('mongodb://localhost/newTest',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 */
router.get('/',async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});
/* var options = { method: 'GET',url: 'https://github.com/qmetry/qaf-blank-project/archive/master.zip'};
	request(options, function (error, response, body) {
	  if (error) {throw new Error(error);}
	  let file = fs.createWriteStream(path.join(__dirname+"/master.zip"));
	  response.pipe(file);
	  console.log("response"+response.status);
	}); */
router.post('/', async (req, res) => {
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
  res.send(await User.find().sort('name'));
  console.log("success");
});

router.delete('/',async (req,res)=>{
        const name = await User.findOne({name: req.body.name});
        if(!name) return res.status(404).send('Name does not exist');
        await User.deleteOne({name: req.body.name})
        res.send(await User.find().sort('name'));
})
module.exports=router;
/* const port = process.env.PORT || 3005;
router.listen(port, () => console.log(`Listening on port ${port}...`)); */
