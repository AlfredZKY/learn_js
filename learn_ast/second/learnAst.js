// 
// Created by preference on 2020/05/03
// Author: AlfredZKY
// Files:learnAst.js
// WorkPlace:learn_js
// 

const parse = require("@babel/parser");                 // 将js代码转换成ast语法树
const traverse = require("@babel/traverse").default;    // 遍历ast语法树
const t = require("@babel/types");                      // 判断节点类型，生成新的节点
const generator = require("@babel/generator").default; // 将ast语法树转化为源代码的函数

const fs = require("fs")

var jscode = "var a = 123;"

// 插件编写
const visitor = {
    // 这里的 VariableDeclaration 表示只要是这个路径，都会进来并执行如下操作,将类型隔开
    "VariableDeclaration|VariableDeclarator" (path){
        console.log(path.type);         // 打印当前路径的类型
        console.log(path.toString());   // 打印当前路径所对应的源代码
        // console.log(path.parentPath);   // 打印当前路径的父路径
        // console.log(path.get('id'));    // 
        path.replaceWith({type:"NumericLiteral",value:3});      // 替换初始化的值
        console.log(path.toString());   // 打印当前路径所对应的源代码
    },
}

let ast = parse.parse(jscode);
// console.log(ast)
// 即可打印出所显示的类型及源代码，如果想对多个不同的路径进行同样操作
traverse(ast,visitor);
// console.log(JSON.stringify(ast,null,"\t"));
// fs.writeFileSync("learn_ast/second/ast1.js",JSON.stringify(ast,null,'\t'),(err)=>{});
