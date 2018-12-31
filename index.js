module.exports.add = function(a,b){
    return console.log("Summ",a+b);
}

const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        res.write("Hello Man");
        res.end();
    }
    if(req.url=='/course'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
})
server.listen(3001);
console.log("Listening port 3001");