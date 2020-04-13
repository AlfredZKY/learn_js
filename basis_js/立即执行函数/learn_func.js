for(var i =0;i<5;i++){
    (function (i){
        setTimeout(function(){
            console.log(i);
        },1000)
    }(i));
}
console.log(i);

// 第一种写法
(function(){console.log("自动执行1");})();

// 第一种写法
(function(){console.log("自动执行2");}());

// 浏览器中写法
// $(function auto(){console.log("自动执行3");})
