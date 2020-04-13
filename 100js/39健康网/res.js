f0 = function(a) {
    var f, b = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"), c = new Array(116,120,122,51,57), d = encodeURIComponent(a), e = "";
    for (i = 0; i < d.length; i++)
        f = c[i % 5],
        s = String.fromCharCode(d.charCodeAt(i) ^ f),
        e += b[s.charCodeAt(0) >> 4] + b[15 & s.charCodeAt(0)];
    return e
}

console.log(f0('111111'));
