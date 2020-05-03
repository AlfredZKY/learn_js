// 
// Created by preference on 2020/05/03
// Author: AlfredZKY
// Files:resolution.js
// WorkPlace:learn_js
// 

const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

var jscode = "var a = 12345678;";

const visitor={
    NumericLiteral(path){
        const node = path.node;
        const value = node.value;
        const first = 0-Math.floor(Math.random()*10000000+100000000);
        const second = value ^ first;
        path.replaceWith(t.binaryExpression('^',t.NumericLiteral(first),t.NumericLiteral(second)));
        path.stop();
    }
}
let ast = parse.parse(jscode);
traverse(ast,visitor);
let {code} = generator(ast);
console.log(code);
