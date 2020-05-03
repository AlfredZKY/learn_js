// 
// Created by preference on 2020/05/03
// Author: AlfredZKY
// Files:insert.js
// WorkPlace:learn_js
// 

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

var jscode = "var a = 123;"

const vistor = {
    // VariableDeclarator(path){
    //     path.insertAfter(t.identifier('b'));
    // }

    VariableDeclaration(path){
        // 赋值语句
        const operator = '=';
        const left = t.identifier('b');
        const right = t.numericLiteral(456);

        // 构造一个赋值语句节点
        const new_assign = t.assignmentExpression(operator,left,right);

        // 在构造成表达式语句
        const new_express = t.expressionStatement(new_assign);

        // 将赋值语句插入到节点中
        path.insertAfter(new_express);
    }
}

let ast = parser.parse(jscode);
traverse(ast,vistor);

let {code} = generator(ast);
console.log("插入前:",jscode);
console.log("插入后:",code);