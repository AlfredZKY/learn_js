var CryptoJS = require('crypto-js');

// key和iv在使用前要转换成128位，当然key也可以是192，256位
var key = 'ABC123456789';
var iv = '12345678987654321';

function encrypt(text){
    return CryptoJS.AES.encrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
}

function decrypt(text){
    var result = CryptoJS.AES.decrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8);
}

var text = 'AlfredZKY';
var encoded = encrypt(text);
console.log(encoded);
console.log(decrypt(encoded));

