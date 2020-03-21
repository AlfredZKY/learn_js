const atob = require('atob');
const btoa = require('btoa');

// 内置函数 btoa
let value = "hello";
console.log(btoa(value))
console.log(new Buffer.from(value).toString('base64'));
console.log(new Buffer.from("hello").toString('base64'));


// 内置函数 atob
let value1 = 'aGVsbG8=';
console.log(atob(value1));
console.log(new Buffer.from(value1).toString('base64'));