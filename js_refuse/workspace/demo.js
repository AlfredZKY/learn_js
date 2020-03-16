const code = `let x = '1' + 1
console.log('x',x)`

const options = {
    compact:true,          // 压缩
    controlFlowFlattening:true, // 控制流扁平化
    identifierNamesGenerator:'mangled', // 变量名混淆
    stringArray:true,   // 字符串混淆
    rotateStringArray:true,
    stringArrayEncoding:true, // base64 or rc4 false
    stringArrayThreshold:1, // 字符串混淆
    unicodeEscapeSequence:true,
    selfDefending:true          // 格式化代码后直接卡死
    
}

const obfuscator = require('javascript-obfuscator')
function obfuscate(code,options){
    return obfuscator.obfuscate(code,options).getObfuscatedCode()
}

console.log(obfuscate(code,options))