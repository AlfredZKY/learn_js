// 
// Created by preference on 2020/05/03
// Author: AlfredZKY
// Files:restore_hex.js
// WorkPlace:learn_js
// 

const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require('fs');

var jscode = "var a = \"\\x48\\x65\\x6c\\x6c\\x6f\\x2c\\x4e\\x69\\x67\\x68\\x74\\x54\\x65\\x61\\x6d\\x21\";";
// console.log(jscode)
let ast = parse.parse(jscode);
// console.log(ast);

// 编写插件,不通用
const visitor = {
    VariableDeclarator(path) {
        const init = path.get('init');
        if (!init.isStringLiteral()) return
        const node = init.node;
        let {
            value,
            extra
        } = node;
        extra.raw = '"' + value + '"'; //注意raw是带有""的
        console.log(extra.raw);
    }
}

// 优化插件
const visitor1 = {
    StringLiteral(path) {
        let {
            value,
            extra
        } = path.node;
        extra.raw = '"' + value + '"';
        console.log(extra.raw);
    }
}

// 继续优化插件
const visitor2 = {
    StringLiteral(path){
        let {value} = path.node;
        path.replaceWith(t.StringLiteral(value));       // 新建stringliteral类型的节点，然后进行替换 
        path.stop();                                    // 遍历后立即停止
        //console.log(path.toString());
    }
}

// 持续优化插件 删除了extra节点
const visitor3 = {
    StringLiteral(path){
        let {extra} = path.node;
        delete extra.raw;
    }
}

const visitor4 = {
    "StringLiteral|NumericLiteral"(path){
        delete path.node.extra;
    }
}

traverse(ast, visitor4);
let {code} = generator(ast);
fs.writeFile('learn_ast/Restore_Hex/desc.js',code,(err)=>{});
