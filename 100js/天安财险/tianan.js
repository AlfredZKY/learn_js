const CryptoJS = require('crypto-js');

Encrypt = function (t) {
    var e = CryptoJS.enc.Utf8.parse("t171420100302rsa"),
        a = CryptoJS.enc.Utf8.parse("t171420100302rsa"),
        n = CryptoJS.enc.Utf8.parse(t),
        l = CryptoJS.AES.encrypt(n, e, {
            iv: a,
            mode: x.mode.CBC,
            padding: x.pad.Pkcs7
        });
    return CryptoJS.enc.Base64.stringify(l.ciphertext)
}

console.log(Encrypt('11111'));