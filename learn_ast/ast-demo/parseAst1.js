// 
// Created by preference on 2020/05/03
// Author: AlfredZKY
// Files:parseAst.js
// WorkPlace:learn_js
// 


// 观察source.js的代码可知，一个大数组 一个执行函数 一个有两个输入和输出的函数(有返回值的意思) 一个有很多行的自执行函数

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const fs = require('fs');
const path = require('path');

// ！可将变量转换成boolean类型，null、undefined、NaN以及空字符串('')取反都为true，其余都为false。
// console.log( !![] )  // true
// console.log( ![] )  // false
// console.log( [] )  // false

const { decryptStr, decryptStrFnName } = require(path.resolve(__dirname,'./module.js'));

// 读取source.js文件
fs.readFile(path.resolve(__dirname,'./source.js'),{"encoding":'utf-8'},function(err,data){
    // 转换成语法树
    const ast = parser.parse(data);

    // 我们要转换的代码
    decrypt(ast);

    // 转换完后放到generator生成新的js
    let {code} = generator(ast);

    // 针对代码中的![] 和![] 进行替换
    code = code.replace(/!!\[\]/g,'true').replace(/!\[\]/g,'false');

    // 写入到新文件中
    fs.writeFile(path.resolve(__dirname,'result.js'),code,function(err){
        if (!err){
            console.log('finished');
        }else{
            console.log(err);
        }
    })
})

function decrypt(ast){
    // 调用traverse 遍历所有的节点，查找自己需要的节点并进行操作
    traverse(ast,{
        //CallExpression 调用表达式
        CallExpression:{
            enter:[callToStr]
        },// 字符串的字面量
        StringLiteral:{
            enter:[removeExtra]
        },// 数值的字面量
        NumericLiteral:removeExtra
    })
}

// 我们在CallExpression的enter里面放了callToStr函数，也就是说每次遍历进入到一个CallExpression时，会执行callToStr并传入当前path作为参数
function callToStr(path){
    let node = path.node;
    // decryptStrFnName 之前实现导出的函数即 _0xd1a5; 先进行类型判断
    if (t.isIdentifier(node.callee) && node.callee.name == decryptStrFnName){
        // decryptStr就是我们拷贝到我们项目中作为node运行的strFn,执行该函数后会生成一个新的节点
        const result = decryptStr(node.arguments[0].value);
        
        // t.stringLiteral可以为我们生成一个StringListeral节点，只要我们传入必须的值，path.replaceWith直接替换掉当前节点
        path.replaceWith(t.stringLiteral(result));
        return
    }
}

// extra 实际上就是16进制的表现形式，删除后即可恢复原始的样子 直接删除即可
function removeExtra(path){
    let node = path.node
    delete node.extra;
}

// 执行完这个后即可发现前面的大数组 自执行函数 有输入和输出的函数无用了。新的源码放在sources.js中，依次为基础往下分析