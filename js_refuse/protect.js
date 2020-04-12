const code =`console.log('hello world')`

const code1 = `(function(){
    function foo(){
        return function(){
            var sum = 1+2;
            console.log(1);
            console.log(2);
            console.log(3);
            console.log(4);
            console.log(5);
        }
    }
})`

const code2 = `(function(){
    var object = {
        foo:'test',
        bar:{
            baz:'test2'
        }
    }
})`

const options = {
    compact:false,          // 压缩
    //controlFlowFlattening:true, // 控制流扁平化
    // identifierNamesGenerator:'mangled', // 变量名混淆
    // stringArray:true,   // 字符串混淆
    // rotateStringArray:true,
    // stringArrayEncoding:true, // base64 or rc4 false
    // stringArrayThreshold:1, // 字符串混淆
    // unicodeEscapeSequence:true,
    //selfDefending:true,          // 格式化代码后直接卡死
    transformObjectKeys:true
    
}

const obfuscator = require('javascript-obfuscator')
function obfuscate(code,options){
    return obfuscator.obfuscate(code,options).getObfuscatedCode()
}

console.log(obfuscate(code2,options))