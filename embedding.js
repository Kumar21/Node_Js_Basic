const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playgroundEmbeded',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:authorSchema
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
 /*  const course= await Course.update({_id:courseId},{
    Sset:{'author.name':'John Smith'}}); */
  const course = await Course.findById(courseId);
  course.author.name='Kumar Shanu';
  course.save();
}
createAuthor('shanu', 'bio', 'My Website');
createCourse('Node Course', new Author({ name: 'Mosh' }));

//updateCourse('5c6d39b29a60687290e5a14d');