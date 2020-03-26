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


function get_aes_encrypt(pwd,key){
    var pwd = JSON.stringify(pwd);
    console.log(pwd);
    var _key = CryptoJS.enc.Utf8.parse(key);// key字符串要变成128位

    var encrypt_Data = CryptoJS.AES.encrypt(pwd,_key,{
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7
    })
    return encrypt_Data.toString();  // 返回字符串
    // return encrypt_Data.ciphertext.toString(); 返回16进制的哈希值
}

console.log('------------------------------------------------------')
console.log(get_aes_encrypt({"o00o0o00o0o0o0":"eval0514undefined"},'87edde8ed2d7406f'))
