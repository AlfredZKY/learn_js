const CryptoJS = require('crypto-js');

Encrypt = function (t) {
    var e = CryptoJS.enc.Utf8.parse("t171420100302rsa"),
        a = CryptoJS.enc.Utf8.parse("t171420100302rsa"),
        n = CryptoJS.enc.Utf8.parse(t),
        l = CryptoJS.AES.encrypt(n, e, {
            iv: a,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return CryptoJS.enc.Base64.stringify(l.ciphertext)
}

console.log(Encrypt('{"body":{},"head":{"userCode":null,"channelCode":"101","transTime":1585064180369,"transToken":"","customerId":null,"transSerialNumber":""}}'));