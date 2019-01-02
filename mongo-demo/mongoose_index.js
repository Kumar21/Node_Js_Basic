const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connecting to db...'))
    .catch(err => console.error("Error occured", err));

const courseSchema = new mongoose.Schema({
    name:String,
    author: String,
    tags: [String],
    date: {type:Date,default:Date.now()},
    ispublished:Boolean
});
const Course = mongoose.model('Course',courseSchema);
async function createCourse(){
    const course = new Course({
        name:'Angular Course',
        author:'kumar',
        tags:['angular','frontend'],
        ispublished:true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourse(){
    const pageNumber=2;
    const pageSize=10;
    // /api/course?pageNumber=2&pageSize=10
    const course = await Course
        .find({ispublished:true})
    //    .find({price:{$gt:10,$lte:20}})  -----comparision operator
    //    .find({price:{$in:[10,12,15]}})
    //    .find().or([{author:'Kumar'},{ispublished:true}])  ----logical operator
    //   .find({author:/^Kumar/}) -------- Regular Expression  //strats with word kumar
    //   .find({author:/shanu$/i}) //ends with word Shanu and make it case insensetive
    //   .find({author:/.*Kumar.*/i}) //find word kumar and make it case insensetive
    //   .skip((pageNumber-1)*pageSize)  ------- pagination
    //    .limit(pageSize)
        .limit(10)
        .sort({name:1})
        .select({name:1,tags:1});
        console.log(course);
}
getCourse();