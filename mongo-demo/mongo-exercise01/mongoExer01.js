const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true })
    .then(()=>console.log('Connecting to db..'))
    .catch(err=>console.log('Error occured',err))

const Schema = new mongoose.Schema({
    tags:[String],
    date:{type:Date,default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number
})
const courses = mongoose.model('courses',Schema);

// async function getCourse(){
//    const course=  await courses
//    .find({isPublished:true,tags:{$in:['backend','frontend']}})
//    .sort({price:-1}).select('name author tags price');
//    console.log(course);
// }// display all course with frontend and backend course in descending price order
// async function getCourse2(){
//     const course=  await courses
//     .find({isPublished:true})
//     .or([
//         {price:{$gte:15}},{name:{$in:/.*by.*/i}}
//     ])
//     .select('name price');
//     console.log(course);
//  }// display all course that are 15$ or more or have the word 'by' in their title
 
 async function updateCourse(id){
    try{
        /* const course = await courses.findById(id);
        console.log(course);
        if(!course) console.log("Invalid Id");
        course.isPublished=false;
        course.author= 'Another Author';
        const result = await course.save() */
        const result = await courses.update({_id:id},{
            $set:{
                author:'Kumar',
                isPublished:false
            }
        })
        console.log(result)
    }catch(err){
        console.log(err)
    }
 }

 async function deleteDoc(id){
     const result = await courses.deleteOne({_id:id});
    console.log(result)
 }
 deleteDoc("5a68fdc3615eda645bc6bdec"); 