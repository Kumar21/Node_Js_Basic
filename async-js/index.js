// using callback function 
testUser(1, (user) => {
    console.log(user);
    getRepos(user.gitiD, (repos) => {
        console.log(repos);
    })
});
function testUser(id, callback) {
    setTimeout(() => {
        console.log("DB connecting...");
        callback({ id: id, gitiD: 'gitid' });
    }, 2000);
}
function getRepos(user, callback) {
    setTimeout(() => {
        console.log("Calling repos..")
        callback(["repo1", "repo2", "repo3"]);
    }, 2000);
} 


// using promise

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1)
        reject(new Error("reject message"));
    }, 2000);
})
p.then(result => console.log('result : ', result))
  .catch(err => console.log('error : ', err.message));


function getRepos(user) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("Calling repos..")
            resolve(["repo10", "repo20", "repo30"]);
        }, 2000);
    })
}
function testUser(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("DB connecting...");
            resolve({ id: id, gitiD: 'gitid' });
        }, 2000);
    })
}

testUser(1)
    .then(user=>getRepos(console.log(user)))
    .then(repos=>console.log("pp ",repos))
    .catch(err=> console.log("Error : ",err));

const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log(" Resolving p1");
        resolve(1)
    },2000)
})
const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log(" Resolving p2");
        resolve(2)
    },2000)
})

Promise.all([p1,p2])
.then(result=>console.log(result))
.catch(err=>console.log(new Error(err)))



 // Using Async and Await

 async function displayUser(){
    try{const user = await testUser(1);
        const repos = await getRepos(console.log(user));
        console.log(repos);
    }catch(err){
        console.log("Error : ",err.message)}}
displayUser();