
//生成语法树
const parse = require('@babel/parser');

//遍历语法树
const traverse = require('@babel/traverse').default;

//语法树转js代码
const generator = require('@babel/generator').default;

//提供对语法树中Node的一系列方法比如判断Node类型，辅助创建Node等
const typess = require("@babel/types");

const fs = require('fs'); //文件读写
const path = require('path');

// console.log(path.resolve(__dirname,'./source.js'));

function decrypt(ast){
    traverse(ast,{
        CallExpression:{
            enter:[callToStr]
        },
        StringLiteral:{
            enter: [removeExtra]
        },
        NumericLiteral:removeExtra
    })
}

function callToStr(path) {
    let node = path.node
    // decryptStrFnName即_0xd1a5
    if (t.isIdentifier(node.callee) && node.callee.name === decryptStrFnName) {
        // decryptStr就是我们拷贝到我们项目中作为Node运行的strFn
        const result = decryptStr(node.arguments[0].value)
        // t.stringLiteral可以为我们生成一个StringLiteral节点，只要我们传入必须的值, path.replaceWith直接替换掉当前节点
        path.replaceWith(t.stringLiteral(result))
        return
    }
}

function removeExtra(path) {
    delete path.node.extra
}

//let code = fs.readFileSync("F:\\my_project\\js\\learn_js\\learn_ast\\refuse_code.js", {
let code = fs.readFile(path.resolve(__dirname,'./source.js'), {encoding: "utf-8"},
function (err,code) {
    const tree = parse.parse(code);
    // console.log(tree);
    decrypt(tree);
    // let {new_code} = generator(tree);
    // console.log(new_code);
});


