// 
// Created by preference on 2020/05/04
// Author: AlfredZKY
// Files:parseAst2.js
// WorkPlace:learn_js
// 

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
const fs =require("fs");
const path = require("path");

const { renameVarMap } = require(path.resolve(__dirname,'./module.js'));


fs.readFile(path.resolve(__dirname,'./sources.js'),{"encoding":'utf-8'},function(err,data){
    //转换语法树
    const ast = parser.parse(data);

    // 执行自定义的插件
    decrypt2(ast);

    // 将装换后的ast转换为新的js代码
    let {code} = generator(ast);

    // 写入到新的文件中
    fs.writeFile(path.resolve(__dirname,'results.js'),code,function(err){
        if (!err){
            console.log("finished");
        }else{
            console.log(err);
        }
    });
});


function decrypt2(ast){
    // 遍历节点，查找自己需要的节点并进行操作
    traverse(ast,{
        CallExpression:{
            exit:[replaceMainArgs]
        },
        // 处理优化while循环
        WhileStatement:replaceWhile,
        VariableDeclarator:{
            enter:[replaceFns]
        },
        // Identifier:{
        //     enter:[renameVars]
        // },
    });
}

function replaceWhile(path){
    let node = path.node;

    // 判断基础结构 while(true){}  while中是test 函数中的callee
    if (!t.isBooleanLiteral(node.test) && node.test.value !== true) return 

    // 判断是否有主体的代码
    if (!t.isBlockStatement(node.body)) return 

    // 拿到主体的语句
    const body = node.body.body;

    // 判断包含一个switch和一个break
    if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return

    const switchStm = body[0];

    // switch(idxArry[idx++]) 找到idxArr变量的名称
    const arrName = switchStm['discriminant'].object.name;

    // 找到sibling的前一个node
    let varKey = path.key - 1;
    let varPath = path.getSibling(varKey);

    // 找到idxArr 从node中找到所有的declarations的值并过滤出自己需要的
    let varNode = varPath.node.declarations.filter(declarator=>declarator.id.name === arrName)[0];

    // 把值取出来分割成数组
    let idxArry = varNode.init.callee.object.value.split('|');

    // 所有的case
    const runBody = switchStm.cases;
    let retBody = []
    idxArry.map(targetIdx=>{
        // 根据顺序找到对应的代码
        let targetBody = runBody[targetIdx].consequent;

        // 删除continue 节点
        if(t.isContinueStatement(targetBody[targetBody.length - 1])){
            targetBody.pop()
        }
        retBody = retBody.concat(targetBody)
    })

    // 如果是一个node替换为多个，要使用replaceWithMultiple
    path.replaceWithMultiple(retBody);

    // remove idxArr var/index
    varPath.remove();
}

// 发现定义了一些包含很多方法的对象，而这些方法基本就是一些基本操作符，逻辑运算符，位运算符或者函数调用这些封装到函数内部，形成了类似函数式的写法
// var obj = {
//     "add": function(a, b) {
//         return a + b
//     },
//     "equal": function(a, b) {
//         return a === b
//     }
// }
// var c = obj.add(1,2) // 源码

// var c = 1 + 2  // 我们要替换成的
function replaceFns(path){
    // 遍历出所有的VariableDeclarator 节点并过滤出自己需要的节点
    let node = path.node

    // 选出右边是对象字面量的节点
    if(!t.isObjectExpression(node.init)) return 
    let properties = node.init.properties
    try{
        // 这里简单判断下对象的第一个属性是不是个函数，并且函数只有一条return语句
        // 看起来有些不严谨，但是对于这份代码没有问题，因为后面没有出现和这个结构一样但后面值不一样的情况
        if (!t.isFunctionExpression(properties[0].value)) return 
        if (properties[0].value.body.body.length !== 1) return 
        let retStmt = properties[0].value.body.body[0];
        if (!t.isReturnStatement(retStmt)) return
    }catch(error){
        console.log("wrong fn arr",properties);
    }

    // 存储下变量名，后面调用的都是objName[key]，所以需要匹配它
    let objName = node.id.name;

    // 一个一个函数进行查找
    properties.forEach(prop=>{
        // key 
        let key = prop.key.value;

        // 需要替换的语句
        let retStmt = prop.value.body.body[0];

        // path.getFunctionParent 可以方便的帮我们找出最近的一个包含此path的父function，这样我们就可以再次作用域遍历
        const fnPath = path.getFunctionParent();
        fnPath.traverse({
            // 找到所有函数调用
            CallExpression:function(_path){
                // 确保是obj['key']或者obj.add等相似的调用
                if (!t.isMemberExpression(_path.node.callee)) return 
                let node = _path.node.callee

                // 第一位是上面定义的objName
                if (!t.isIdentifier(node.object) || node.object.name !== objName) return

                // key值是我们当前遍历到的
                if (!t.isStringLiteral(node.property) || node.property.value !== key) return

                // 参数
                let args = _path.node.arguments;
                /* 其实定义的函数总共分三类
                 * 1. function _0x3eeee4(a, b) {
                 *        return a & b; // BinaryExpression
                 *    }
                 * 2. function _0x3eeee4(a, b) {
                 *        return a === b; // LogicalExpression
                 *    }
                 * 3. function _0x3eeee4(a, b, c) {
                 *        return a(b, c) // CallExpression
                 *    }
                 * 下面的代码就是对调用的代码做一个转换。这里可以看到t.Node并传入对应的参数可以帮助我们生成相应的节点, t.isNode是判断是否*  为某个type的Node
                 */
                if (t.isBinaryExpression(retStmt.argument) && args.length === 2){
                    _path.replaceWith(t.binaryExpression(retStmt.argument.operator,args[0],args[1]));
                }
                if (t.isLogicalExpression(retStmt.argument) && args.length ===2 ){
                    _path.replaceWith(t.logicalExpression(retStmt.argument.operator,args[0],args[1]));
                }
                if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee)){
                    _path.replaceWith(t.CallExpression(args[0],args.slice(1)));
                }
            }
        })

    })

    path.remove();
}

function renameVars(path){
    let val = path.node.name;
    if (val in renameVarMap){
        path.scope.rename(val,renameVarMap[val]);
        return 
    }

    const vals = Object.values(renameVarMap);
    if (vals.includes(val)) return 

    let newName = path.scope.generateUid(randomVarName());
    path.scope.rename(val,newName);
}

function randomVarName(){
    var names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz';
    return names[Math.floor(Math.random() * 51)];
}

function replaceMainArgs(path){
    let node = path.node;

    // 自执行函数
    if (t.isFunctionExpression(node.callee)){
        // 里面的
        if (node.arguments.length < 10) return 
        let filePath = '/Volumes/mac_store/project/learn_js/learn_ast/ast-demo/transfer.js';
        generatorTransferFile(path,filePath);
        const argNames = node.callee.params.map(a=>a.name);
        const transferArgs = require(filePath);
        let newArgs = transferArgs(...node.arguments);
        path.traverse({
            Identifier(path){
                let argIdx = argNames.indexOf(path.node.name)
                if (argIdx > -1){
                    let newValue = newArgs[argIdx];
                    path.replaceWith(newValue);
                }
            }
        })
        const inner = path.get("callee.body.body.0");
        path.replaceWith(inner);
    }

}

function  generatorTransferFile(path,filePath){
    let node = path.node;
    const argValues = node.arguments;
    const paramIdentifiers = node.callee.params.map(n => n.name);
    let argVarNode;
    path.traverse({
        enter:function(_path){
            if (_path.node.name === 'arguments'){
                const varPath = _path.find(parentPath => {
                    return parentPath.isVariableDeclarator()
                })
                if (varPath){
                    argVarNode = varPath.node.id;
                    _path.stop();
                }
            }
        }
    })

    // node.callee.body是BlockStatement, node.callee.body.body是函数体，由于最后一个是内部的自执行函数，我们先去掉
    const body = node.callee.body.body.slice(0,node.callee.body.body.length -1 );
    const minBody = node.callee.body.body[node.callee.body.body.length-1];
    const retStatement = t.returnStatement(argVarNode);
    const fn = t.functionDeclaration(t.identifier('transfer'),[],t.blockStatement(body.concat(retStatement)));

    // 因为要生成一个完整的js文件，所以我们要补上最外面的program节点
    const program = t.file(t.program([fn,template.ast('module.exports = transfer')]));

    traverse(program, {
        Identifier: {
            enter: (path) => {
                const node = path.node
                const idIdx = paramIdentifiers.indexOf(node.name)
                if (idIdx > -1) {
                    let valueNode = argValues[idIdx]
                    path.replaceWith(valueNode)
                }
            }
        },
        StringLiteral: {
            exit: path => {
                const node = path.node
                if (node.value === 'string') {
                    node.value = 'StringLiteral'
                    const ifStatement = path.find(p => p.isIfStatement())
                    let ifTestMemberExpression
                    ifStatement.traverse({
                        MemberExpression({ node }) {
                            ifTestMemberExpression = node
                        },
                        UnaryExpression(path) {
                            if (path.node.operator === 'typeof') {
                                path.replaceWith(t.memberExpression(path.node.argument, t.identifier("type")))
                            }
                        }
                    })
                    let left = ifTestMemberExpression.object.name
                    let right = ifTestMemberExpression.property.name
                    const consequent = ifStatement.get('consequent')
                    consequent.traverse({
                        MemberExpression(path) {
                            let { object, property } = path.node
                            if (object.name === left && property.name === right) {
                                path.replaceWith(t.memberExpression(path.node, t.identifier('value')))
                                path.skip()
                            }
                        }
                    })
                }
            }
        }
    })

    let {code} = generator(program);
    path.get('callee.body').replaceWith(t.blockStatement([minBody]));
    fs.writeFileSync(filePath,code,{encoding:'utf-8'});
}