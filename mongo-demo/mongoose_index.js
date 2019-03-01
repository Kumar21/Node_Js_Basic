const mongoose = require('mongoose');

/* mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connecting to db...'))
    .catch(err => console.error("Error occured", err));
 */
const courseSchema = new mongoose.Schema({
    name:
    {   // built in validators
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        lowercase:true, //will automaticaly change the string to lowercase
        trim:true // will automatically trim the string
    },
    author: String,
    tags: {    //custom validation
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            }, message: 'A course should have 1 character'
        }
    },
    tags: {    //async validation
        
        type: Array,
        validate: {
            isAsync:true,
            validator: function (v,callback) {
                setTimeout(() => {
                    const result =  v && v.length > 0;
                    callback(result);
                }, 2000);
            }, message: 'A course should have 1 character'
        }
    },
    date: { type: Date, default: Date.now() },
    ispublished: Boolean,
    price: {
        type: Number,
        min: 10, max: 50
    }
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'kumar',
        tags: ['angular', 'frontend'],
        ispublished: true
    });
    try{const result = await course.save();
    console.log(result);}
    catch(err){
        for(field in err.errors)  // validation message
        console.log(err.errors[field].message);
    }
}

async function getCourse() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/course?pageNumber=2&pageSize=10
    const course = await Course
        .find({ ispublished: true })
        //    .find({price:{$gt:10,$lte:20}})  -----comparision operator
        //    .find({price:{$in:[10,12,15]}})
        //    .find().or([{author:'Kumar'},{ispublished:true}])  ----logical operator
        //   .find({author:/^Kumar/}) -------- Regular Expression  //strats with word kumar
        //   .find({author:/shanu$/i}) //ends with word Shanu and make it case insensetive
        //   .find({author:/.*Kumar.*/i}) //find word kumar and make it case insensetive
        //   .skip((pageNumber-1)*pageSize)  ------- pagination
        //    .limit(pageSize)
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(course);
}

async function deleteDoc(id){ 
    const result = await courses.deleteOne({_id:id}); 
    console.log(result)}
//    deleteDoc("5a68fdc3615eda645bc6bdec");  

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) console.log("Invalid id")
    course.author = 'kumar'
    const result = await course.save();
    console.log(result);
}
updateCourse('5c2c4f30bf65edcb08d4a68d');

