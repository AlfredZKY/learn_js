/*
    Array的基本操作
    逆向中常见到，尤其是验证码轨迹参数，一般都会添加到叔祖
*/

let mousePos1 = []

// 定义一个空数组
let mousePos2 = new Array();

// 向数组中添加元素
mousePos1.push([10,50,1586998787]);
mousePos1.push([100,51,1586998787]);
mousePos1.push([101,52,1586998787]);
mousePos1.push([10,53,1586998787]);
console.log(mousePos1);

// 从数组中删除一个元素
console.log(mousePos1.pop());
console.log(mousePos1.pop());
