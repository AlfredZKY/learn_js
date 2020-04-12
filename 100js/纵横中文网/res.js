

var maxDigits, ZERO_ARRAY = new Array, bigZero, bigOne, biRadixBase = 2, biRadixBits = 16, bitsPerDigit = biRadixBits, biRadix = 65536, biHalfRadix = biRadix >>> 1, biRadixSquared = biRadix * biRadix, maxDigitVal = biRadix - 1, maxInteger = 9999999999999998;


function hzasieckses(i, t, e, r) {
    var n, s, a, o, g, d, u, l, c, b = new Array, h = t.length, f = "";
    for (o = "string" == typeof e ? e == RSAAPP.NoPadding ? 1 : e == RSAAPP.PKCS1Padding ? 2 : 0 : 0,
    g = "string" == typeof r && r == RSAAPP.RawEncoding ? 1 : 0,
    1 == o ? h > i.chunkSize && (h = i.chunkSize) : 2 == o && h > i.chunkSize - 11 && (h = i.chunkSize - 11),
    n = 0,
    s = 2 == o ? h - 1 : i.chunkSize - 1; n < h; )
        o ? b[s] = t.charCodeAt(n) : b[n] = t.charCodeAt(n),
        n++,
        s--;
    for (1 == o && (n = 0),
    s = i.chunkSize - h % i.chunkSize; s > 0; ) {
        if (2 == o) {
            for (d = Math.floor(256 * Math.random()); !d; )
                d = Math.floor(256 * Math.random());
            b[n] = d
        } else
            b[n] = 0;
        n++,
        s--
    }
    for (2 == o && (b[h] = 0,
    b[i.chunkSize - 2] = 2,
    b[i.chunkSize - 1] = 0),
    u = b.length,
    n = 0; n < u; n += i.chunkSize) {
        for (l = new BigInt,
        s = 0,
        a = n; a < n + i.chunkSize; ++s)
            l.digits[s] = b[a++],
            l.digits[s] += b[a++] << 8;
        c = i.barrett.powMod(l, i.e),
        f += 1 == g ? biToBytes(c) : 16 == i.radix ? biToHex(c) : biToString(c, i.radix)
    }
    return f
}
function decryptedString(i, t) {
    var e, r, n, s, a = t.split(" "), o = "";
    for (r = 0; r < a.length; ++r)
        for (s = 16 == i.radix ? biFromHex(a[r]) : biFromString(a[r], i.radix),
        e = i.barrett.powMod(s, i.d),
        n = 0; n <= biHighIndex(e); ++n)
            o += String.fromCharCode(255 & e.digits[n], e.digits[n] >> 8);
    return 0 == o.charCodeAt(o.length - 1) && (o = o.substring(0, o.length - 1)),
    o
}
function BarrettMu(i) {
    this.modulus = biCopy(i),
    this.k = biHighIndex(this.modulus) + 1;
    var t = new BigInt;
    t.digits[2 * this.k] = 1,
    this.mu = biDivide(t, this.modulus),
    this.bkplus1 = new BigInt,
    this.bkplus1.digits[this.k + 1] = 1,
    this.modulo = BarrettMu_modulo,
    this.multiplyMod = BarrettMu_multiplyMod,
    this.powMod = BarrettMu_powMod
}
function BarrettMu_modulo(i) {
    var t = biDivideByRadixPower(biMultiply(biDivideByRadixPower(i, this.k - 1), this.mu), this.k + 1)
      , e = biSubtract(biModuloByRadixPower(i, this.k + 1), biModuloByRadixPower(biMultiply(t, this.modulus), this.k + 1));
    e.isNeg && (e = biAdd(e, this.bkplus1));
    for (var r = biCompare(e, this.modulus) >= 0; r; )
        e = biSubtract(e, this.modulus),
        r = biCompare(e, this.modulus) >= 0;
    return e
}
function BarrettMu_multiplyMod(i, t) {
    var e = biMultiply(i, t);
    return this.modulo(e)
}
function BarrettMu_powMod(i, t) {
    var e = new BigInt;
    e.digits[0] = 1;
    for (var r = i, n = t; 0 != (1 & n.digits[0]) && (e = this.multiplyMod(e, r)),
    0 != (n = biShiftRight(n, 1)).digits[0] || 0 != biHighIndex(n); )
        r = this.multiplyMod(r, r);
    return e
}
function setMaxDigits(i) {
    maxDigits = i,
    ZERO_ARRAY = new Array(maxDigits);
    for (var t = 0; t < ZERO_ARRAY.length; t++)
        ZERO_ARRAY[t] = 0;
    bigZero = new BigInt,
    (bigOne = new BigInt).digits[0] = 1
}
function BigInt(i) {
    this.digits = "boolean" == typeof i && 1 == i ? null : ZERO_ARRAY.slice(0),
    this.isNeg = !1
}
function biFromDecimal(i) {
    for (var t, e = "-" == i.charAt(0), r = e ? 1 : 0; r < i.length && "0" == i.charAt(r); )
        ++r;
    if (r == i.length)
        t = new BigInt;
    else {
        var n = (i.length - r) % dpl10;
        for (0 == n && (n = dpl10),
        t = biFromNumber(Number(i.substr(r, n))),
        r += n; r < i.length; )
            t = biAdd(biMultiply(t, lr10), biFromNumber(Number(i.substr(r, dpl10)))),
            r += dpl10;
        t.isNeg = e
    }
    return t
}
function biCopy(i) {
    var t = new BigInt(!0);
    return t.digits = i.digits.slice(0),
    t.isNeg = i.isNeg,
    t
}
function biFromNumber(i) {
    var t = new BigInt;
    t.isNeg = i < 0,
    i = Math.abs(i);
    for (var e = 0; i > 0; )
        t.digits[e++] = i & maxDigitVal,
        i >>= biRadixBits;
    return t
}
function reverseStr(i) {
    for (var t = "", e = i.length - 1; e > -1; --e)
        t += i.charAt(e);
    return t
}
function biToString(i, t) {
    var e = new BigInt;
    e.digits[0] = t;
    for (var r = biDivideModulo(i, e), n = hexatrigesimalToChar[r[1].digits[0]]; 1 == biCompare(r[0], bigZero); )
        r = biDivideModulo(r[0], e),
        digit = r[1].digits[0],
        n += hexatrigesimalToChar[r[1].digits[0]];
    return (i.isNeg ? "-" : "") + reverseStr(n)
}
function biToDecimal(i) {
    var t = new BigInt;
    t.digits[0] = 10;
    for (var e = biDivideModulo(i, t), r = String(e[1].digits[0]); 1 == biCompare(e[0], bigZero); )
        e = biDivideModulo(e[0], t),
        r += String(e[1].digits[0]);
    return (i.isNeg ? "-" : "") + reverseStr(r)
}
function digitToHex(t) {
    var e = "";
    for (i = 0; i < 4; ++i)
        e += hexToChar[15 & t],
        t >>>= 4;
    return reverseStr(e)
}
function biToHex(i) {
    for (var t = "", e = (biHighIndex(i),
    biHighIndex(i)); e > -1; --e)
        t += digitToHex(i.digits[e]);
    return t
}
function charToHex(i) {
    return i >= 48 && i <= 57 ? i - 48 : i >= 65 && i <= 90 ? 10 + i - 65 : i >= 97 && i <= 122 ? 10 + i - 97 : 0
}
function hexToDigit(i) {
    for (var t = 0, e = Math.min(i.length, 4), r = 0; r < e; ++r)
        t <<= 4,
        t |= charToHex(i.charCodeAt(r));
    return t
}
function biFromHex(i) {
    for (var t = new BigInt, e = i.length, r = 0; e > 0; e -= 4,
    ++r)
        t.digits[r] = hexToDigit(i.substr(Math.max(e - 4, 0), Math.min(e, 4)));
    return t
}
function biFromString(i, t) {
    var e = "-" == i.charAt(0)
      , r = e ? 1 : 0
      , n = new BigInt
      , s = new BigInt;
    s.digits[0] = 1;
    for (var a = i.length - 1; a >= r; a--) {
        n = biAdd(n, biMultiplyDigit(s, charToHex(i.charCodeAt(a)))),
        s = biMultiplyDigit(s, t)
    }
    return n.isNeg = e,
    n
}
function biToBytes(i) {
    for (var t = "", e = biHighIndex(i); e > -1; --e)
        t += digitToBytes(i.digits[e]);
    return t
}
function digitToBytes(i) {
    var t = String.fromCharCode(255 & i);
    i >>>= 8;
    return String.fromCharCode(255 & i) + t
}
function biDump(i) {
    return (i.isNeg ? "-" : "") + i.digits.join(" ")
}
function biAdd(i, t) {
    var e;
    if (i.isNeg != t.isNeg)
        t.isNeg = !t.isNeg,
        e = biSubtract(i, t),
        t.isNeg = !t.isNeg;
    else {
        e = new BigInt;
        for (var r, n = 0, s = 0; s < i.digits.length; ++s)
            r = i.digits[s] + t.digits[s] + n,
            e.digits[s] = 65535 & r,
            n = Number(r >= biRadix);
        e.isNeg = i.isNeg
    }
    return e
}
function biSubtract(i, t) {
    var e;
    if (i.isNeg != t.isNeg)
        t.isNeg = !t.isNeg,
        e = biAdd(i, t),
        t.isNeg = !t.isNeg;
    else {
        e = new BigInt;
        var r, n;
        n = 0;
        for (s = 0; s < i.digits.length; ++s)
            r = i.digits[s] - t.digits[s] + n,
            e.digits[s] = 65535 & r,
            e.digits[s] < 0 && (e.digits[s] += biRadix),
            n = 0 - Number(r < 0);
        if (-1 == n) {
            n = 0;
            for (var s = 0; s < i.digits.length; ++s)
                r = 0 - e.digits[s] + n,
                e.digits[s] = 65535 & r,
                e.digits[s] < 0 && (e.digits[s] += biRadix),
                n = 0 - Number(r < 0);
            e.isNeg = !i.isNeg
        } else
            e.isNeg = i.isNeg
    }
    return e
}
function biHighIndex(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; )
        --t;
    return t
}
function biNumBits(i) {
    var t, e = biHighIndex(i), r = i.digits[e], n = (e + 1) * bitsPerDigit;
    for (t = n; t > n - bitsPerDigit && 0 == (32768 & r); --t)
        r <<= 1;
    return t
}
function biMultiply(i, t) {
    for (var e, r, n, s = new BigInt, a = biHighIndex(i), o = biHighIndex(t), g = 0; g <= o; ++g) {
        for (e = 0,
        n = g,
        j = 0; j <= a; ++j,
        ++n)
            r = s.digits[n] + i.digits[j] * t.digits[g] + e,
            s.digits[n] = r & maxDigitVal,
            e = r >>> biRadixBits;
        s.digits[g + a + 1] = e
    }
    return s.isNeg = i.isNeg != t.isNeg,
    s
}
function biMultiplyDigit(i, t) {
    var e, r, n;
    result = new BigInt,
    e = biHighIndex(i),
    r = 0;
    for (var s = 0; s <= e; ++s)
        n = result.digits[s] + i.digits[s] * t + r,
        result.digits[s] = n & maxDigitVal,
        r = n >>> biRadixBits;
    return result.digits[1 + e] = r,
    result
}
function arrayCopy(i, t, e, r, n) {
    for (var s = Math.min(t + n, i.length), a = t, o = r; a < s; ++a,
    ++o)
        e[o] = i[a]
}
function biShiftLeft(i, t) {
    var e = Math.floor(t / bitsPerDigit)
      , r = new BigInt;
    arrayCopy(i.digits, 0, r.digits, e, r.digits.length - e);
    for (var n = t % bitsPerDigit, s = bitsPerDigit - n, a = r.digits.length - 1, o = a - 1; a > 0; --a,
    --o)
        r.digits[a] = r.digits[a] << n & maxDigitVal | (r.digits[o] & highBitMasks[n]) >>> s;
    return r.digits[0] = r.digits[a] << n & maxDigitVal,
    r.isNeg = i.isNeg,
    r
}
function biShiftRight(i, t) {
    var e = Math.floor(t / bitsPerDigit)
      , r = new BigInt;
    arrayCopy(i.digits, e, r.digits, 0, i.digits.length - e);
    for (var n = t % bitsPerDigit, s = bitsPerDigit - n, a = 0, o = a + 1; a < r.digits.length - 1; ++a,
    ++o)
        r.digits[a] = r.digits[a] >>> n | (r.digits[o] & lowBitMasks[n]) << s;
    return r.digits[r.digits.length - 1] >>>= n,
    r.isNeg = i.isNeg,
    r
}
function biMultiplyByRadixPower(i, t) {
    var e = new BigInt;
    return arrayCopy(i.digits, 0, e.digits, t, e.digits.length - t),
    e
}
function biDivideByRadixPower(i, t) {
    var e = new BigInt;
    return arrayCopy(i.digits, t, e.digits, 0, e.digits.length - t),
    e
}
function biModuloByRadixPower(i, t) {
    var e = new BigInt;
    return arrayCopy(i.digits, 0, e.digits, 0, t),
    e
}
function biCompare(i, t) {
    if (i.isNeg != t.isNeg)
        return 1 - 2 * Number(i.isNeg);
    for (var e = i.digits.length - 1; e >= 0; --e)
        if (i.digits[e] != t.digits[e])
            return i.isNeg ? 1 - 2 * Number(i.digits[e] > t.digits[e]) : 1 - 2 * Number(i.digits[e] < t.digits[e]);
    return 0
}
function biDivideModulo(i, t) {
    var e, r, n = biNumBits(i), s = biNumBits(t), a = t.isNeg;
    if (n < s)
        return i.isNeg ? (e = biCopy(bigOne),
        e.isNeg = !t.isNeg,
        i.isNeg = !1,
        t.isNeg = !1,
        r = biSubtract(t, i),
        i.isNeg = !0,
        t.isNeg = a) : (e = new BigInt,
        r = biCopy(i)),
        new Array(e,r);
    e = new BigInt,
    r = i;
    for (var o = Math.ceil(s / bitsPerDigit) - 1, g = 0; t.digits[o] < biHalfRadix; )
        t = biShiftLeft(t, 1),
        ++g,
        ++s,
        o = Math.ceil(s / bitsPerDigit) - 1;
    r = biShiftLeft(r, g),
    n += g;
    for (var d = Math.ceil(n / bitsPerDigit) - 1, u = biMultiplyByRadixPower(t, d - o); -1 != biCompare(r, u); )
        ++e.digits[d - o],
        r = biSubtract(r, u);
    for (var l = d; l > o; --l) {
        var c = l >= r.digits.length ? 0 : r.digits[l]
          , b = l - 1 >= r.digits.length ? 0 : r.digits[l - 1]
          , h = l - 2 >= r.digits.length ? 0 : r.digits[l - 2]
          , f = o >= t.digits.length ? 0 : t.digits[o]
          , m = o - 1 >= t.digits.length ? 0 : t.digits[o - 1];
        e.digits[l - o - 1] = c == f ? maxDigitVal : Math.floor((c * biRadix + b) / f);
        for (var p = e.digits[l - o - 1] * (f * biRadix + m), v = c * biRadixSquared + (b * biRadix + h); p > v; )
            --e.digits[l - o - 1],
            p = e.digits[l - o - 1] * (f * biRadix | m),
            v = c * biRadix * biRadix + (b * biRadix + h);
        (r = biSubtract(r, biMultiplyDigit(u = biMultiplyByRadixPower(t, l - o - 1), e.digits[l - o - 1]))).isNeg && (r = biAdd(r, u),
        --e.digits[l - o - 1])
    }
    return r = biShiftRight(r, g),
    e.isNeg = i.isNeg != a,
    i.isNeg && (e = a ? biAdd(e, bigOne) : biSubtract(e, bigOne),
    t = biShiftRight(t, g),
    r = biSubtract(t, r)),
    0 == r.digits[0] && 0 == biHighIndex(r) && (r.isNeg = !1),
    new Array(e,r)
}
function biDivide(i, t) {
    return biDivideModulo(i, t)[0]
}
function biModulo(i, t) {
    return biDivideModulo(i, t)[1]
}
function biMultiplyMod(i, t, e) {
    return biModulo(biMultiply(i, t), e)
}
function biPow(i, t) {
    for (var e = bigOne, r = i; 0 != (1 & t) && (e = biMultiply(e, r)),
    0 != (t >>= 1); )
        r = biMultiply(r, r);
    return e
}
function biPowMod(i, t, e) {
    for (var r = bigOne, n = i, s = t; 0 != (1 & s.digits[0]) && (r = biMultiplyMod(r, n, e)),
    0 != (s = biShiftRight(s, 1)).digits[0] || 0 != biHighIndex(s); )
        n = biMultiplyMod(n, n, e);
    return r
}
var RSAAPP = {};
RSAAPP.NoPadding = "NoPadding",
RSAAPP.PKCS1Padding = "PKCS1Padding",
RSAAPP.RawEncoding = "RawEncoding",
RSAAPP.NumericEncoding = "NumericEncoding";

var dpl10 = 15
  , lr10 = biFromNumber(1e15)
  , hexatrigesimalToChar = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z")
  , hexToChar = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f")
  , highBitMasks = new Array(0,32768,49152,57344,61440,63488,64512,65024,65280,65408,65472,65504,65520,65528,65532,65534,65535)
  , lowBitMasks = new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);

function HelloShit(i, t, e, r) {
    this.e = biFromHex(i),
    this.d = biFromHex(t),
    this.m = biFromHex(e),
    this.chunkSize = "number" != typeof r ? 2 * biHighIndex(this.m) : r / 8,
    this.radix = 16,
    this.barrett = new BarrettMu(this.m)
}

var TK    = "a07d1c1585747301332";
var RSA_m = "a69ae1dd84777e7d40626a29a76f74c176806bb71ce120b259848a730664340bfa550d6fb807b4fe7a2e2a89478ca2f3ea56793440c70b7f3c2017add92e8661924adbda06bff326828ebdc8bef6d094118d64da2eec815812fb70f16aafc73229aa1734727d0a4df65f1c1a2a61946d00a37376822cb30b87127e15f82d68d1";
var RSA_e = "10001";

function getPwd(passwd){
    setMaxDigits(130);
    var s = new HelloShit(RSA_e,"",RSA_m);
    return  hzasieckses(s, encodeURIComponent(passwd))
}

console.log(getPwd('dsadasdsa'));