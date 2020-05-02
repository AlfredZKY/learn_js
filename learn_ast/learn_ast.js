
const esprima = require('/Volumes/mac_store/project/learn_js/js_refuse/node_modules/esprima'); //生成语法树
const esttraverse = require('/Volumes/mac_store/project/learn_js/js_refuse/node_modules/estraverse'); //遍历语法树
const escodegen = require('/Volumes/mac_store/project/learn_js/js_refuse/node_modules/escodegen'); //语法树转代码
const _fs = require('fs'); //文件读写


{
    // var _0x5153 = ['log', 'Hello\x20World!']; 
    // (function (_0x2f2d58, _0x245477) {
    //     var _0x47dd40 = function (_0x9f171) {
    //         while (--_0x9f171) {
    //             _0x2f2d58['push'](_0x2f2d58['shift']());
    //         }
    //     };
    //     _0x47dd40(++_0x245477);
    // }(_0x5153, 0x182));
    // var _0x3e69 = function (_0x2f2d58, _0x245477) {
    //     _0x2f2d58 = _0x2f2d58 - 0x0;
    //     var _0x47dd40 = _0x5153[_0x2f2d58];
    //     return _0x47dd40;
    // };
    // function hi() {
    //     console[_0x3e69('0x0')](_0x3e69('0x1'));
    // }
    // hi();
}

var code = _fs.readFileSync("/Volumes/mac_store/project/learn_js/learn_ast/refuse_code.js", {
    encoding: "utf-8"
});

var _0x5153 = ['log', 'Hello\x20World!'];
(function (_0x2f2d58, _0x245477) {
    var _0x47dd40 = function (_0x9f171) {
        while (--_0x9f171) {
            _0x2f2d58['push'](_0x2f2d58['shift']());
        }
    };
    _0x47dd40(++_0x245477);
}(_0x5153, 0x182));
var _0x3e69 = function (_0x2f2d58, _0x245477) {
    _0x2f2d58 = _0x2f2d58 - 0x0;
    var _0x47dd40 = _0x5153[_0x2f2d58];
    return _0x47dd40;
};

// console.log(code);

// program = 'var a = 1; if(a == 1){console.log(1)}else{console.log(\'not 1\')}';
// ast = esprima.parseScript(program);
// console.log(ast);
// var tree = esprima.parse(code);
// console.log(tree);


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



// esttraverse.traverse(ast,{
//     enter:function (node) {
//         node.kind = "var";
//     }
// })


// console.log(ast);
//
// console.log('-------------------------------------------');
// const transfromCode = escodegen.generate(ast);
// console.log(transfromCode);

