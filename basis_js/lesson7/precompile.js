// var a = 123;
// console.log(a)  // 由于js解释性语言的原因，先执行console.log，而由于预编译的原因浏览器并不会报错
// var a = 123; // 当注释掉声明时，会报出未定义的错误


console.log(a)
function a(a) {
    var a = 456;
    var a = function () { }
    a();
}
var a = 123;

{
    function f(a){
        console.log(a);
        var a = 123;
        console.log(a);
        function a (){}
        var b = function(){}
        function d (){}
    }
    f(1)
}

{
    function bar(){
        return foo;
        foo = 10;
        function foo(){}
        var foo = 11;
    }
    console.log(bar());
}


{
    console.log(bar())
    function bar(){
        foo = 10;
        function foo(){

        }
        var foo = 11;
        return foo;
    }
}
