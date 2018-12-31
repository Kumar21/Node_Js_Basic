testUser(1,(user)=>{
    console.log(user);
    getRepos(user.gitiD,(repos)=>{
        console.log(repos);
    })
});
console.log("After");
function testUser(id,callback){
setTimeout(() => {
    console.log("DB connecting...");
    callback({id:id,gitiD:'gitid'});
}, 2000);}
function getRepos(user,callback){
    setTimeout(() => {
        console.log("Calling repos..")
        callback(["repo1","repo2","repo3"]);
    }, 2000);
}

const p = new Promise((resolve,reject)=>{
    setTimeout(() => {
       // resolve(1)
        reject(new Error("reject message"));
    }, 2000);
})

p
    .then(result => console.log('result : ',result))
    .catch(err => console.log('error : ',err.message));