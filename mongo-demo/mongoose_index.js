const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connecting to db...'))
    .catch(err => console.error("Error occured", err));

const courseSchema = new mongoose.Schema({
    name:String,
    auuthor: String,
    tags: [String],
    date: {type:date,default:Date.now()},
    ispublished:Boolean
});

const Course = mongoose.model('Course',courseSchema);
const course = new Course({
    name:'Node.js Course',
    author:'Mosh',
    tags:['node','backend'],
    ispublished:true
});

const result = await course.save();
console.log(result);