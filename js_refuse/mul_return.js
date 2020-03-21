/**
 * return 也是有语法的
 * 逆向中常见的多行 return
 * 
 */

function first(){
    console.log("call first");
    return "first";
}

function second(){
    console.log("call second");
    return "second";
}

function _tokenValue(v){
    //假装这里对着v值一顿转换和操作
    let _token = v.join("-");
    return first(),second(),_token;
}

res = _tokenValue([56,78,33])
console.log(res);