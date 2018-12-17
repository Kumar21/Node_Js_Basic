module.exports.log2=callName;
function callName(name){
    console.log("hi",name)}

const path = require('path');
var pathObj = path.parse(__filename);

const os = require('os')
console.log(os.totalmem());