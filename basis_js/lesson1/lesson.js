var a = 10;
var b = ++a - 1 + a++;
console.log(b, ' ', a)

var c = 1 / 0;
console.log(c)

var d = -1 / 0;
console.log(d)
a += 10 + 1;
console.log(a)

var a = (10 * 3 - 4 / 2 + 1) % 2, b = 3
b %= a + 3
console.log(a)
console.log(b)

var ab = 123;
var ba = 234;
var temp=null;
console.log(ab," ",ba)
temp = ab;
ab = ba;
ba = temp;

console.log(ab," ",ba)

console.log("--------------------------------")
var num =  3 & 3;
//num = 'a' & 'a';
console.log(num)
console.log("--------------------------------")
num = 1 | 3;
console.log(num)

var b = 1 && 2+2;
b = 0 && 2+2;
console.log(b)

var innum = prompt('input');