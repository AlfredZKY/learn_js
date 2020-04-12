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

// let esprima = require('esprima');
// let estraverse = require('estraverse');
// let escodegen = require('escodegen');
// let code = 'function as(){}'
//将源码转成ast
// var ast = esprima.parseScript(code);



// let code = 'const a = 1';
const ast = esprima.parseScript(code);

console.log(ast);


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