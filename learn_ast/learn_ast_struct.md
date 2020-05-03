# 学习ast的结构
    - type:表示当前路径的类型
    - start:表示当前节点的起始位置
    - end:表示当前节点的结束位置
    - loc:表示当前节点所在源码中的起始和结束的行号和列号
    - declarations:声明的一些类型。注意它是[]类型的结构，所以需要以下标的方式访问，它没有type，所以不能以path路径方式访问
    - key:表示定义的类型，这里是var,如果是let方式定义，这里则是let


# 认识path和node
## path    
    - 当前路径对应的源代码，使用的toString这个方法
    - 判断path是什么type,使用path.isXXX这个方法，比如我们需要判断路径是否为StringLiteral类型
    - 获取path的上一级路径 `let path = path.parentPath();`  
    - 获取path的子路径，这里可以使用get方法    `path.get('id);`
    - 删除path,使用remove方法，当你觉得你访问的路径已经完成了该完成的事，对代码已经没什么作用了，可以删除。`path.remove();`
    - 替换path,单路径可以使用replaceWith方法，多路径则使用replaceWithMultiple方法 
        - `path.replaceWith({type:"NumericLiteral",value:3});`
        - `const t = require("@babel/types");path.replaceWith(t.NumericLiteral(3));`

## node
    - `const node = path.node;`这里的node其实是path的一个属性，可以打印node，并查看内容，它是一个JSON的结构
    - 获取当前节点所对应的源代码
        `const generator = require("@babel/generator).default;let{code} = generator(node);`
    - 如何删除节点，使用系统的delete方法 `delete path.node.init;`删除的init节点
    - 访问子节点，如果想得到初始化的值
        `const node = path.node;const value=node.init.value;console.log(value);`
