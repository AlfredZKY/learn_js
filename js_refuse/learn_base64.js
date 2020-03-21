// const atob = require('atob');
// const btoa = require('btoa');

// // 内置函数 btoa
// let value = "hello";
// console.log(btoa(value))
// console.log(new Buffer.from(value).toString('base64'));
// console.log(new Buffer.from("hello").toString('base64'));


// // 内置函数 atob
// let value1 = 'aGVsbG8=';
// console.log(atob(value1));
// console.log(new Buffer.from(value1).toString('base64'));

const CryptoJS = require('crypto-js');

// 编码
let value = "hello";
let trans = CryptoJS.enc.Utf8.parse(value);
let encrypted = CryptoJS.enc.Base64.stringify(trans);
console.log(trans);
console.log(encrypted);

// 解码
let trans_encrypted = CryptoJS.enc.Base64.parse(encrypted);
let decrypted = trans_encrypted.toString(CryptoJS.enc.Utf8);
console.log(value);
console.log(encrypted);
console.log(decrypted);

function Base64(){
    this.encode = function(val){
        return val;
    }

    this.decode = function(val){
        return val;
    }
}

encrypt = new Base64();
console.log(encrypt.encode("encode"));
console.log('-------------------sha------------------------');
// 加密可以切换 SHA1/SHA224/SHA256/SHA384/SHA512
let hash = CryptoJS.SHA256(value);
console.log(value);
console.log(hash.toString());   //结果与CryptJs.enc.Hex 相同
console.log(hash.toString(CryptoJS.enc.Hex));
console.log(hash.toString(CryptoJS.enc.Base64));

console.log('-------------------md5------------------------');

let encrtpt_md5 = CryptoJS.MD5(value);
console.log(encrtpt_md5.toString());