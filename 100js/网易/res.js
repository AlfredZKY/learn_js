window = global;
navigator = {};

var dbits;
var canary = 0xdeadbeefcafe;
var j_lm = 15715070 == (16777215 & canary);

function BigInteger(e, t, i) {
    if (null != e)
        if ("number" == typeof e)
            this.fromNumber(e, t, i);
        else if (null == t && "string" != typeof e)
        this.fromString(e, 256);
    else
        this.fromString(e, t)
}

function nbi() {
    return new BigInteger(null)
}

function am1(e, t, i, n, a, s) {
    for (; --s >= 0;) {
        var r = t * this[e++] + i[n] + a;
        a = Math.floor(r / 67108864);
        i[n++] = 67108863 & r
    }
    return a
}

function am2(e, t, i, n, a, s) {
    var r = 32767 & t,
        o = t >> 15;
    for (; --s >= 0;) {
        var c = 32767 & this[e];
        var _ = this[e++] >> 15;
        var d = o * c + _ * r;
        c = r * c + ((32767 & d) << 15) + i[n] + (1073741823 & a);
        a = (c >>> 30) + (d >>> 15) + o * _ + (a >>> 30);
        i[n++] = 1073741823 & c
    }
    return a
}

function am3(e, t, i, n, a, s) {
    var r = 16383 & t,
        o = t >> 14;
    for (; --s >= 0;) {
        var c = 16383 & this[e];
        var _ = this[e++] >> 14;
        var d = o * c + _ * r;
        c = r * c + ((16383 & d) << 14) + i[n] + a;
        a = (c >> 28) + (d >> 14) + o * _;
        i[n++] = 268435455 & c
    }
    return a
}
if (j_lm && "Microsoft Internet Explorer" == navigator.appName) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else if (j_lm && "Netscape" != navigator.appName) {
    BigInteger.prototype.am = am1;
    dbits = 26
} else {
    BigInteger.prototype.am = am3;
    dbits = 28
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array;
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;

function int2char(e) {
    return BI_RM.charAt(e)
}

function intAt(e, t) {
    var i = BI_RC[e.charCodeAt(t)];
    return null == i ? -1 : i
}

function bnpCopyTo(e) {
    for (var t = this.t - 1; t >= 0; --t)
        e[t] = this[t];
    e.t = this.t;
    e.s = this.s
}

function bnpFromInt(e) {
    this.t = 1;
    this.s = e < 0 ? -1 : 0;
    if (e > 0)
        this[0] = e;
    else if (e < -1)
        this[0] = e + DV;
    else
        this.t = 0
}

function nbv(e) {
    var t = nbi();
    t.fromInt(e);
    return t
}

function bnpFromString(e, t) {
    var i;
    if (16 == t)
        i = 4;
    else if (8 == t)
        i = 3;
    else if (256 == t)
        i = 8;
    else if (2 == t)
        i = 1;
    else if (32 == t)
        i = 5;
    else if (4 == t)
        i = 2;
    else {
        this.fromRadix(e, t);
        return
    }
    this.t = 0;
    this.s = 0;
    var n = e.length,
        a = !1,
        s = 0;
    for (; --n >= 0;) {
        var r = 8 == i ? 255 & e[n] : intAt(e, n);
        if (!(r < 0)) {
            a = !1;
            if (0 == s)
                this[this.t++] = r;
            else if (s + i > this.DB) {
                this[this.t - 1] |= (r & (1 << this.DB - s) - 1) << s;
                this[this.t++] = r >> this.DB - s
            } else
                this[this.t - 1] |= r << s;
            s += i;
            if (s >= this.DB)
                s -= this.DB
        } else if ("-" == e.charAt(n))
            a = !0
    }
    if (8 == i && 0 != (128 & e[0])) {
        this.s = -1;
        if (s > 0)
            this[this.t - 1] |= (1 << this.DB - s) - 1 << s
    }
    this.clamp();
    if (a)
        BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    var e = this.s & this.DM;
    for (; this.t > 0 && this[this.t - 1] == e;)
        --this.t
}

function bnToString(e) {
    if (this.s < 0)
        return "-" + this.negate().toString(e);
    var t;
    if (16 == e)
        t = 4;
    else if (8 == e)
        t = 3;
    else if (2 == e)
        t = 1;
    else if (32 == e)
        t = 5;
    else if (4 == e)
        t = 2;
    else
        return this.toRadix(e);
    var i = (1 << t) - 1,
        n, a = !1,
        s = "",
        r = this.t;
    var o = this.DB - r * this.DB % t;
    if (r-- > 0) {
        if (o < this.DB && (n = this[r] >> o) > 0) {
            a = !0;
            s = int2char(n)
        }
        for (; r >= 0;) {
            if (o < t) {
                n = (this[r] & (1 << o) - 1) << t - o;
                n |= this[--r] >> (o += this.DB - t)
            } else {
                n = this[r] >> (o -= t) & i;
                if (o <= 0) {
                    o += this.DB;
                    --r
                }
            }
            if (n > 0)
                a = !0;
            if (a)
                s += int2char(n)
        }
    }
    return a ? s : "0"
}

function bnNegate() {
    var e = nbi();
    BigInteger.ZERO.subTo(this, e);
    return e
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this
}

function bnCompareTo(e) {
    var t = this.s - e.s;
    if (0 != t)
        return t;
    var i = this.t;
    t = i - e.t;
    if (0 != t)
        return this.s < 0 ? -t : t;
    for (; --i >= 0;)
        if (0 != (t = this[i] - e[i]))
            return t;
    return 0
}

function nbits(e) {
    var t = 1,
        i;
    if (0 != (i = e >>> 16)) {
        e = i;
        t += 16
    }
    if (0 != (i = e >> 8)) {
        e = i;
        t += 8
    }
    if (0 != (i = e >> 4)) {
        e = i;
        t += 4
    }
    if (0 != (i = e >> 2)) {
        e = i;
        t += 2
    }
    if (0 != (i = e >> 1)) {
        e = i;
        t += 1
    }
    return t
}

function bnBitLength() {
    if (this.t <= 0)
        return 0;
    else
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(e, t) {
    var i;
    for (i = this.t - 1; i >= 0; --i)
        t[i + e] = this[i];
    for (i = e - 1; i >= 0; --i)
        t[i] = 0;
    t.t = this.t + e;
    t.s = this.s
}

function bnpDRShiftTo(e, t) {
    for (var i = e; i < this.t; ++i)
        t[i - e] = this[i];
    t.t = Math.max(this.t - e, 0);
    t.s = this.s
}

function bnpLShiftTo(e, t) {
    var i = e % this.DB;
    var n = this.DB - i;
    var a = (1 << n) - 1;
    var s = Math.floor(e / this.DB),
        r = this.s << i & this.DM,
        o;
    for (o = this.t - 1; o >= 0; --o) {
        t[o + s + 1] = this[o] >> n | r;
        r = (this[o] & a) << i
    }
    for (o = s - 1; o >= 0; --o)
        t[o] = 0;
    t[s] = r;
    t.t = this.t + s + 1;
    t.s = this.s;
    t.clamp()
}

function bnpRShiftTo(e, t) {
    t.s = this.s;
    var i = Math.floor(e / this.DB);
    if (!(i >= this.t)) {
        var n = e % this.DB;
        var a = this.DB - n;
        var s = (1 << n) - 1;
        t[0] = this[i] >> n;
        for (var r = i + 1; r < this.t; ++r) {
            t[r - i - 1] |= (this[r] & s) << a;
            t[r - i] = this[r] >> n
        }
        if (n > 0)
            t[this.t - i - 1] |= (this.s & s) << a;
        t.t = this.t - i;
        t.clamp()
    } else
        t.t = 0
}

function bnpSubTo(e, t) {
    var i = 0,
        n = 0,
        a = Math.min(e.t, this.t);
    for (; i < a;) {
        n += this[i] - e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n -= e.s;
        for (; i < this.t;) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t;) {
            n -= e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n -= e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n < -1)
        t[i++] = this.DV + n;
    else if (n > 0)
        t[i++] = n;
    t.t = i;
    t.clamp()
}

function bnpMultiplyTo(e, t) {
    var i = this.abs(),
        n = e.abs();
    var a = i.t;
    t.t = a + n.t;
    for (; --a >= 0;)
        t[a] = 0;
    for (a = 0; a < n.t; ++a)
        t[a + i.t] = i.am(0, n[a], t, a, 0, i.t);
    t.s = 0;
    t.clamp();
    if (this.s != e.s)
        BigInteger.ZERO.subTo(t, t)
}

function bnpSquareTo(e) {
    var t = this.abs();
    var i = e.t = 2 * t.t;
    for (; --i >= 0;)
        e[i] = 0;
    for (i = 0; i < t.t - 1; ++i) {
        var n = t.am(i, t[i], e, 2 * i, 0, 1);
        if ((e[i + t.t] += t.am(i + 1, 2 * t[i], e, 2 * i + 1, n, t.t - i - 1)) >= t.DV) {
            e[i + t.t] -= t.DV;
            e[i + t.t + 1] = 1
        }
    }
    if (e.t > 0)
        e[e.t - 1] += t.am(i, t[i], e, 2 * i, 0, 1);
    e.s = 0;
    e.clamp()
}

function bnpDivRemTo(e, t, i) {
    var n = e.abs();
    if (!(n.t <= 0)) {
        var a = this.abs();
        if (!(a.t < n.t)) {
            if (null == i)
                i = nbi();
            var s = nbi(),
                r = this.s,
                o = e.s;
            var c = this.DB - nbits(n[n.t - 1]);
            if (c > 0) {
                n.lShiftTo(c, s);
                a.lShiftTo(c, i)
            } else {
                n.copyTo(s);
                a.copyTo(i)
            }
            var _ = s.t;
            var d = s[_ - 1];
            if (0 != d) {
                var f = d * (1 << this.F1) + (_ > 1 ? s[_ - 2] >> this.F2 : 0);
                var h = this.FV / f,
                    l = (1 << this.F1) / f,
                    u = 1 << this.F2;
                var p = i.t,
                    m = p - _,
                    g = null == t ? nbi() : t;
                s.dlShiftTo(m, g);
                if (i.compareTo(g) >= 0) {
                    i[i.t++] = 1;
                    i.subTo(g, i)
                }
                BigInteger.ONE.dlShiftTo(_, g);
                g.subTo(s, s);
                for (; s.t < _;)
                    s[s.t++] = 0;
                for (; --m >= 0;) {
                    var b = i[--p] == d ? this.DM : Math.floor(i[p] * h + (i[p - 1] + u) * l);
                    if ((i[p] += s.am(0, b, i, m, 0, _)) < b) {
                        s.dlShiftTo(m, g);
                        i.subTo(g, i);
                        for (; i[p] < --b;)
                            i.subTo(g, i)
                    }
                }
                if (null != t) {
                    i.drShiftTo(_, t);
                    if (r != o)
                        BigInteger.ZERO.subTo(t, t)
                }
                i.t = _;
                i.clamp();
                if (c > 0)
                    i.rShiftTo(c, i);
                if (r < 0)
                    BigInteger.ZERO.subTo(i, i)
            }
        } else {
            if (null != t)
                t.fromInt(0);
            if (null != i)
                this.copyTo(i)
        }
    }
}

function bnMod(e) {
    var t = nbi();
    this.abs().divRemTo(e, null, t);
    if (this.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        e.subTo(t, t);
    return t
}

function Classic(e) {
    this.m = e
}

function cConvert(e) {
    if (e.s < 0 || e.compareTo(this.m) >= 0)
        return e.mod(this.m);
    else
        return e
}

function cRevert(e) {
    return e
}

function cReduce(e) {
    e.divRemTo(this.m, null, e)
}

function cMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}

function cSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var e = this[0];
    if (0 == (1 & e))
        return 0;
    var t = 3 & e;
    t = t * (2 - (15 & e) * t) & 15;
    t = t * (2 - (255 & e) * t) & 255;
    t = t * (2 - ((65535 & e) * t & 65535)) & 65535;
    t = t * (2 - e * t % this.DV) % this.DV;
    return t > 0 ? this.DV - t : -t
}

function Montgomery(e) {
    this.m = e;
    this.mp = e.invDigit();
    this.mpl = 32767 & this.mp;
    this.mph = this.mp >> 15;
    this.um = (1 << e.DB - 15) - 1;
    this.mt2 = 2 * e.t
}

function montConvert(e) {
    var t = nbi();
    e.abs().dlShiftTo(this.m.t, t);
    t.divRemTo(this.m, null, t);
    if (e.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(t, t);
    return t
}

function montRevert(e) {
    var t = nbi();
    e.copyTo(t);
    this.reduce(t);
    return t
}

function montReduce(e) {
    for (; e.t <= this.mt2;)
        e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
        var i = 32767 & e[t];
        var n = i * this.mpl + ((i * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        i = t + this.m.t;
        e[i] += this.m.am(0, n, e, t, 0, this.m.t);
        for (; e[i] >= e.DV;) {
            e[i] -= e.DV;
            e[++i]++
        }
    }
    e.clamp();
    e.drShiftTo(this.m.t, e);
    if (e.compareTo(this.m) >= 0)
        e.subTo(this.m, e)
}

function montSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}

function montMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}

function bnpExp(e, t) {
    if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
    var i = nbi(),
        n = nbi(),
        a = t.convert(this),
        s = nbits(e) - 1;
    a.copyTo(i);
    for (; --s >= 0;) {
        t.sqrTo(i, n);
        if ((e & 1 << s) > 0)
            t.mulTo(n, a, i);
        else {
            var r = i;
            i = n;
            n = r
        }
    }
    return t.revert(i)
}

function bnModPowInt(e, t) {
    var i;
    if (e < 256 || t.isEven())
        i = new Classic(t);
    else
        i = new Montgomery(t);
    return this.exp(e, i)
}

function bnpToRadix(e) {
    if (null == e)
        e = 10;
    if (0 == this.signum() || e < 2 || e > 36)
        return "0";
    var t = this.chunkSize(e);
    var i = Math.pow(e, t);
    var n = nbv(i)
      , a = nbi()
      , s = nbi()
      , r = "";
    this.divRemTo(n, a, s);
    for (; a.signum() > 0; ) {
        r = (i + s.intValue()).toString(e).substr(1) + r;
        a.divRemTo(n, a, s)
    }
    return s.intValue().toString(e) + r
}

BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;

function bnClone() {
    var e = nbi();
    this.copyTo(e);
    return e
}
function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t)
            return this[0] - this.DV;
        else if (0 == this.t)
            return -1
    } else if (1 == this.t)
        return this[0];
    else if (0 == this.t)
        return 0;
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e))
}
function bnSigNum() {
    if (this.s < 0)
        return -1;
    else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
        return 0;
    else
        return 1
}
function bnpToRadix(e) {
    if (null == e)
        e = 10;
    if (0 == this.signum() || e < 2 || e > 36)
        return "0";
    var t = this.chunkSize(e);
    var i = Math.pow(e, t);
    var n = nbv(i)
      , a = nbi()
      , s = nbi()
      , r = "";
    this.divRemTo(n, a, s);
    for (; a.signum() > 0; ) {
        r = (i + s.intValue()).toString(e).substr(1) + r;
        a.divRemTo(n, a, s)
    }
    return s.intValue().toString(e) + r
}
function bnpFromRadix(e, t) {
    this.fromInt(0);
    if (null == t)
        t = 10;
    var i = this.chunkSize(t);
    var n = Math.pow(t, i)
      , a = !1
      , s = 0
      , r = 0;
    for (var o = 0; o < e.length; ++o) {
        var c = intAt(e, o);
        if (!(c < 0)) {
            r = t * r + c;
            if (++s >= i) {
                this.dMultiply(n);
                this.dAddOffset(r, 0);
                s = 0;
                r = 0
            }
        } else if ("-" == e.charAt(o) && 0 == this.signum())
            a = !0
    }
    if (s > 0) {
        this.dMultiply(Math.pow(t, s));
        this.dAddOffset(r, 0)
    }
    if (a)
        BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(e, t, i) {
    if ("number" == typeof t)
        if (e < 2)
            this.fromInt(1);
        else {
            this.fromNumber(e, i);
            if (!this.testBit(e - 1))
                this.bitwiseTo(BigInteger.ONE.shiftLeft(e - 1), op_or, this);
            if (this.isEven())
                this.dAddOffset(1, 0);
            for (; !this.isProbablePrime(t); ) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e)
                    this.subTo(BigInteger.ONE.shiftLeft(e - 1), this)
            }
        }
    else {
        var n = new Array
          , a = 7 & e;
        n.length = (e >> 3) + 1;
        t.nextBytes(n);
        if (a > 0)
            n[0] &= (1 << a) - 1;
        else
            n[0] = 0;
        this.fromString(n, 256)
    }
}
function bnToByteArray() {
    var e = this.t
      , t = new Array;
    t[0] = this.s;
    var i = this.DB - e * this.DB % 8, n, a = 0;
    if (e-- > 0) {
        if (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i)
            t[a++] = n | this.s << this.DB - i;
        for (; e >= 0; ) {
            if (i < 8) {
                n = (this[e] & (1 << i) - 1) << 8 - i;
                n |= this[--e] >> (i += this.DB - 8)
            } else {
                n = this[e] >> (i -= 8) & 255;
                if (i <= 0) {
                    i += this.DB;
                    --e
                }
            }
            if (0 != (128 & n))
                n |= -256;
            if (0 == a && (128 & this.s) != (128 & n))
                ++a;
            if (a > 0 || n != this.s)
                t[a++] = n
        }
    }
    return t
}
function bnEquals(e) {
    return 0 == this.compareTo(e)
}
function bnMin(e) {
    return this.compareTo(e) < 0 ? this : e
}
function bnMax(e) {
    return this.compareTo(e) > 0 ? this : e
}
function bnpBitwiseTo(e, t, i) {
    var n, a, s = Math.min(e.t, this.t);
    for (n = 0; n < s; ++n)
        i[n] = t(this[n], e[n]);
    if (e.t < this.t) {
        a = e.s & this.DM;
        for (n = s; n < this.t; ++n)
            i[n] = t(this[n], a);
        i.t = this.t
    } else {
        a = this.s & this.DM;
        for (n = s; n < e.t; ++n)
            i[n] = t(a, e[n]);
        i.t = e.t
    }
    i.s = t(this.s, e.s);
    i.clamp()
}
function op_and(e, t) {
    return e & t
}
function bnAnd(e) {
    var t = nbi();
    this.bitwiseTo(e, op_and, t);
    return t
}
function op_or(e, t) {
    return e | t
}
function bnOr(e) {
    var t = nbi();
    this.bitwiseTo(e, op_or, t);
    return t
}
function op_xor(e, t) {
    return e ^ t
}
function bnXor(e) {
    var t = nbi();
    this.bitwiseTo(e, op_xor, t);
    return t
}
function op_andnot(e, t) {
    return e & ~t
}
function bnAndNot(e) {
    var t = nbi();
    this.bitwiseTo(e, op_andnot, t);
    return t
}
function bnNot() {
    var e = nbi();
    for (var t = 0; t < this.t; ++t)
        e[t] = this.DM & ~this[t];
    e.t = this.t;
    e.s = ~this.s;
    return e
}
function bnShiftLeft(e) {
    var t = nbi();
    if (e < 0)
        this.rShiftTo(-e, t);
    else
        this.lShiftTo(e, t);
    return t
}
function bnShiftRight(e) {
    var t = nbi();
    if (e < 0)
        this.lShiftTo(-e, t);
    else
        this.rShiftTo(e, t);
    return t
}
function lbit(e) {
    if (0 == e)
        return -1;
    var t = 0;
    if (0 == (65535 & e)) {
        e >>= 16;
        t += 16
    }
    if (0 == (255 & e)) {
        e >>= 8;
        t += 8
    }
    if (0 == (15 & e)) {
        e >>= 4;
        t += 4
    }
    if (0 == (3 & e)) {
        e >>= 2;
        t += 2
    }
    if (0 == (1 & e))
        ++t;
    return t
}
function bnGetLowestSetBit() {
    for (var e = 0; e < this.t; ++e)
        if (0 != this[e])
            return e * this.DB + lbit(this[e]);
    if (this.s < 0)
        return this.t * this.DB;
    else
        return -1
}
function cbit(e) {
    var t = 0;
    for (; 0 != e; ) {
        e &= e - 1;
        ++t
    }
    return t
}
function bnBitCount() {
    var e = 0
      , t = this.s & this.DM;
    for (var i = 0; i < this.t; ++i)
        e += cbit(this[i] ^ t);
    return e
}
function bnTestBit(e) {
    var t = Math.floor(e / this.DB);
    if (t >= this.t)
        return 0 != this.s;
    else
        return 0 != (this[t] & 1 << e % this.DB)
}
function bnpChangeBit(e, t) {
    var i = BigInteger.ONE.shiftLeft(e);
    this.bitwiseTo(i, t, i);
    return i
}
function bnSetBit(e) {
    return this.changeBit(e, op_or)
}
function bnClearBit(e) {
    return this.changeBit(e, op_andnot)
}
function bnFlipBit(e) {
    return this.changeBit(e, op_xor)
}
function bnpAddTo(e, t) {
    var i = 0
      , n = 0
      , a = Math.min(e.t, this.t);
    for (; i < a; ) {
        n += this[i] + e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n += e.s;
        for (; i < this.t; ) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t; ) {
            n += e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n > 0)
        t[i++] = n;
    else if (n < -1)
        t[i++] = this.DV + n;
    t.t = i;
    t.clamp()
}
function bnAdd(e) {
    var t = nbi();
    this.addTo(e, t);
    return t
}
function bnSubtract(e) {
    var t = nbi();
    this.subTo(e, t);
    return t
}
function bnMultiply(e) {
    var t = nbi();
    this.multiplyTo(e, t);
    return t
}
function bnSquare() {
    var e = nbi();
    this.squareTo(e);
    return e
}
function bnDivide(e) {
    var t = nbi();
    this.divRemTo(e, t, null);
    return t
}
function bnRemainder(e) {
    var t = nbi();
    this.divRemTo(e, null, t);
    return t
}
function bnDivideAndRemainder(e) {
    var t = nbi()
      , i = nbi();
    this.divRemTo(e, t, i);
    return new Array(t,i)
}
function bnpDMultiply(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}
function bnpDAddOffset(e, t) {
    if (0 != e) {
        for (; this.t <= t; )
            this[this.t++] = 0;
        this[t] += e;
        for (; this[t] >= this.DV; ) {
            this[t] -= this.DV;
            if (++t >= this.t)
                this[this.t++] = 0;
            ++this[t]
        }
    }
}
function NullExp() {}
function nNop(e) {
    return e
}
function nMulTo(e, t, i) {
    e.multiplyTo(t, i)
}
function nSqrTo(e, t) {
    e.squareTo(t)
}

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(e) {
    return this.exp(e, new NullExp)
}
function bnpMultiplyLowerTo(e, t, i) {
    var n = Math.min(this.t + e.t, t);
    i.s = 0;
    i.t = n;
    for (; n > 0; )
        i[--n] = 0;
    var a;
    for (a = i.t - this.t; n < a; ++n)
        i[n + this.t] = this.am(0, e[n], i, n, 0, this.t);
    for (a = Math.min(e.t, t); n < a; ++n)
        this.am(0, e[n], i, n, 0, t - n);
    i.clamp()
}
function bnpMultiplyUpperTo(e, t, i) {
    --t;
    var n = i.t = this.t + e.t - t;
    i.s = 0;
    for (; --n >= 0; )
        i[n] = 0;
    for (n = Math.max(t - this.t, 0); n < e.t; ++n)
        i[this.t + n - t] = this.am(t - n, e[n], i, 0, 0, this.t + n - t);
    i.clamp();
    i.drShiftTo(1, i)
}
function Barrett(e) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * e.t, this.r2);
    this.mu = this.r2.divide(e);
    this.m = e
}
function barrettConvert(e) {
    if (e.s < 0 || e.t > 2 * this.m.t)
        return e.mod(this.m);
    else if (e.compareTo(this.m) < 0)
        return e;
    else {
        var t = nbi();
        e.copyTo(t);
        this.reduce(t);
        return t
    }
}
function barrettRevert(e) {
    return e
}
function barrettReduce(e) {
    e.drShiftTo(this.m.t - 1, this.r2);
    if (e.t > this.m.t + 1) {
        e.t = this.m.t + 1;
        e.clamp()
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    for (; e.compareTo(this.r2) < 0; )
        e.dAddOffset(1, this.m.t + 1);
    e.subTo(this.r2, e);
    for (; e.compareTo(this.m) >= 0; )
        e.subTo(this.m, e)
}
function barrettSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
function barrettMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(e, t) {
    var i = e.bitLength(), n, a = nbv(1), s;
    if (i <= 0)
        return a;
    else if (i < 18)
        n = 1;
    else if (i < 48)
        n = 3;
    else if (i < 144)
        n = 4;
    else if (i < 768)
        n = 5;
    else
        n = 6;
    if (i < 8)
        s = new Classic(t);
    else if (t.isEven())
        s = new Barrett(t);
    else
        s = new Montgomery(t);
    var r = new Array
      , o = 3
      , c = n - 1
      , _ = (1 << n) - 1;
    r[1] = s.convert(this);
    if (n > 1) {
        var d = nbi();
        s.sqrTo(r[1], d);
        for (; o <= _; ) {
            r[o] = nbi();
            s.mulTo(d, r[o - 2], r[o]);
            o += 2
        }
    }
    var f = e.t - 1, h, l = !0, u = nbi(), p;
    i = nbits(e[f]) - 1;
    for (; f >= 0; ) {
        if (i >= c)
            h = e[f] >> i - c & _;
        else {
            h = (e[f] & (1 << i + 1) - 1) << c - i;
            if (f > 0)
                h |= e[f - 1] >> this.DB + i - c
        }
        o = n;
        for (; 0 == (1 & h); ) {
            h >>= 1;
            --o
        }
        if ((i -= o) < 0) {
            i += this.DB;
            --f
        }
        if (l) {
            r[h].copyTo(a);
            l = !1
        } else {
            for (; o > 1; ) {
                s.sqrTo(a, u);
                s.sqrTo(u, a);
                o -= 2
            }
            if (o > 0)
                s.sqrTo(a, u);
            else {
                p = a;
                a = u;
                u = p
            }
            s.mulTo(u, r[h], a)
        }
        for (; f >= 0 && 0 == (e[f] & 1 << i); ) {
            s.sqrTo(a, u);
            p = a;
            a = u;
            u = p;
            if (--i < 0) {
                i = this.DB - 1;
                --f
            }
        }
    }
    return s.revert(a)
}
function bnGCD(e) {
    var t = this.s < 0 ? this.negate() : this.clone();
    var i = e.s < 0 ? e.negate() : e.clone();
    if (t.compareTo(i) < 0) {
        var n = t;
        t = i;
        i = n
    }
    var a = t.getLowestSetBit()
      , s = i.getLowestSetBit();
    if (s < 0)
        return t;
    if (a < s)
        s = a;
    if (s > 0) {
        t.rShiftTo(s, t);
        i.rShiftTo(s, i)
    }
    for (; t.signum() > 0; ) {
        if ((a = t.getLowestSetBit()) > 0)
            t.rShiftTo(a, t);
        if ((a = i.getLowestSetBit()) > 0)
            i.rShiftTo(a, i);
        if (t.compareTo(i) >= 0) {
            t.subTo(i, t);
            t.rShiftTo(1, t)
        } else {
            i.subTo(t, i);
            i.rShiftTo(1, i)
        }
    }
    if (s > 0)
        i.lShiftTo(s, i);
    return i
}
function bnpModInt(e) {
    if (e <= 0)
        return 0;
    var t = this.DV % e
      , i = this.s < 0 ? e - 1 : 0;
    if (this.t > 0)
        if (0 == t)
            i = this[0] % e;
        else
            for (var n = this.t - 1; n >= 0; --n)
                i = (t * i + this[n]) % e;
    return i
}
function bnModInverse(e) {
    var t = e.isEven();
    if (this.isEven() && t || 0 == e.signum())
        return BigInteger.ZERO;
    var i = e.clone()
      , n = this.clone();
    var a = nbv(1)
      , s = nbv(0)
      , r = nbv(0)
      , o = nbv(1);
    for (; 0 != i.signum(); ) {
        for (; i.isEven(); ) {
            i.rShiftTo(1, i);
            if (t) {
                if (!a.isEven() || !s.isEven()) {
                    a.addTo(this, a);
                    s.subTo(e, s)
                }
                a.rShiftTo(1, a)
            } else if (!s.isEven())
                s.subTo(e, s);
            s.rShiftTo(1, s)
        }
        for (; n.isEven(); ) {
            n.rShiftTo(1, n);
            if (t) {
                if (!r.isEven() || !o.isEven()) {
                    r.addTo(this, r);
                    o.subTo(e, o)
                }
                r.rShiftTo(1, r)
            } else if (!o.isEven())
                o.subTo(e, o);
            o.rShiftTo(1, o)
        }
        if (i.compareTo(n) >= 0) {
            i.subTo(n, i);
            if (t)
                a.subTo(r, a);
            s.subTo(o, s)
        } else {
            n.subTo(i, n);
            if (t)
                r.subTo(a, r);
            o.subTo(s, o)
        }
    }
    if (0 != n.compareTo(BigInteger.ONE))
        return BigInteger.ZERO;
    if (o.compareTo(e) >= 0)
        return o.subtract(e);
    if (o.signum() < 0)
        o.addTo(e, o);
    else
        return o;
    if (o.signum() < 0)
        return o.add(e);
    else
        return o
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var t, i = this.abs();
    if (1 == i.t && i[0] <= lowprimes[lowprimes.length - 1]) {
        for (t = 0; t < lowprimes.length; ++t)
            if (i[0] == lowprimes[t])
                return !0;
        return !1
    }
    if (i.isEven())
        return !1;
    t = 1;
    for (; t < lowprimes.length; ) {
        var n = lowprimes[t]
          , a = t + 1;
        for (; a < lowprimes.length && n < lplim; )
            n *= lowprimes[a++];
        n = i.modInt(n);
        for (; t < a; )
            if (n % lowprimes[t++] == 0)
                return !1
    }
    return i.millerRabin(e)
}
function bnpMillerRabin(e) {
    var t = this.subtract(BigInteger.ONE);
    var i = t.getLowestSetBit();
    if (i <= 0)
        return !1;
    var n = t.shiftRight(i);
    e = e + 1 >> 1;
    if (e > lowprimes.length)
        e = lowprimes.length;
    var a = nbi();
    for (var s = 0; s < e; ++s) {
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var r = a.modPow(n, this);
        if (0 != r.compareTo(BigInteger.ONE) && 0 != r.compareTo(t)) {
            var o = 1;
            for (; o++ < i && 0 != r.compareTo(t); ) {
                r = r.modPowInt(2, this);
                if (0 == r.compareTo(BigInteger.ONE))
                    return !1
            }
            if (0 != r.compareTo(t))
                return !1
        }
    }
    return !0
}

var RSAPublicKey = function (e, t) {
    this.modulus = new BigInteger(Hex.encode(e), 16);
    this.encryptionExponent = new BigInteger(Hex.encode(t), 16)
};


var Base64 = {
    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        if (!e)
            return !1;
        var t = "";
        var i, n, a;
        var s, r, o, c;
        var _ = 0;
        do {
            i = e.charCodeAt(_++);
            n = e.charCodeAt(_++);
            a = e.charCodeAt(_++);
            s = i >> 2;
            r = (3 & i) << 4 | n >> 4;
            o = (15 & n) << 2 | a >> 6;
            c = 63 & a;
            if (isNaN(n))
                o = c = 64;
            else if (isNaN(a))
                c = 64;
            t += this.base64.charAt(s) + this.base64.charAt(r) + this.base64.charAt(o) + this.base64.charAt(c)
        } while (_ < e.length);
        return t
    },
    decode: function (e) {
        if (!e)
            return !1;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var t = "";
        var i, n, a, s;
        var r = 0;
        do {
            i = this.base64.indexOf(e.charAt(r++));
            n = this.base64.indexOf(e.charAt(r++));
            a = this.base64.indexOf(e.charAt(r++));
            s = this.base64.indexOf(e.charAt(r++));
            t += String.fromCharCode(i << 2 | n >> 4);
            if (64 != a)
                t += String.fromCharCode((15 & n) << 4 | a >> 2);
            if (64 != s)
                t += String.fromCharCode((3 & a) << 6 | s)
        } while (r < e.length);
        return t
    }
};
var Hex = {
    hex: "0123456789abcdef",
    encode: function (e) {
        if (!e)
            return !1;
        var t = "";
        var i;
        var n = 0;
        do {
            i = e.charCodeAt(n++);
            t += this.hex.charAt(i >> 4 & 15) + this.hex.charAt(15 & i)
        } while (n < e.length);
        return t
    },
    decode: function (e) {
        if (!e)
            return !1;
        e = e.replace(/[^0-9abcdef]/g, "");
        var t = "";
        var i = 0;
        do
            t += String.fromCharCode(this.hex.indexOf(e.charAt(i++)) << 4 & 240 | 15 & this.hex.indexOf(e.charAt(i++)));
        while (i < e.length);
        return t
    }
};
var ASN1Data = function (e) {
    this.error = !1;
    this.parse = function (e) {
        if (!e) {
            this.error = !0;
            return null
        }
        var t = [];
        for (; e.length > 0;) {
            var i = e.charCodeAt(0);
            e = e.substr(1);
            var n = 0;
            if (5 == (31 & i))
                e = e.substr(1);
            else if (128 & e.charCodeAt(0)) {
                var a = 127 & e.charCodeAt(0);
                e = e.substr(1);
                if (a > 0)
                    n = e.charCodeAt(0);
                if (a > 1)
                    n = n << 8 | e.charCodeAt(1);
                if (a > 2) {
                    this.error = !0;
                    return null
                }
                e = e.substr(a)
            } else {
                n = e.charCodeAt(0);
                e = e.substr(1)
            }
            var s = "";
            if (n) {
                if (n > e.length) {
                    this.error = !0;
                    return null
                }
                s = e.substr(0, n);
                e = e.substr(n)
            }
            if (32 & i)
                t.push(this.parse(s));
            else
                t.push(this.value(128 & i ? 4 : 31 & i, s))
        }
        return t
    };
    this.value = function (e, t) {
        if (1 == e)
            return t ? !0 : !1;
        else if (2 == e)
            return t;
        else if (3 == e)
            return this.parse(t.substr(1));
        else if (5 == e)
            return null;
        else if (6 == e) {
            var i = [];
            var n = t.charCodeAt(0);
            i.push(Math.floor(n / 40));
            i.push(n - 40 * i[0]);
            var a = [];
            var s = 0;
            var r;
            for (r = 1; r < t.length; r++) {
                var o = t.charCodeAt(r);
                a.push(127 & o);
                if (128 & o)
                    s++;
                else {
                    var c;
                    var _ = 0;
                    for (c = 0; c < a.length; c++)
                        _ += a[c] * Math.pow(128, s--);
                    i.push(_);
                    s = 0;
                    a = []
                }
            }
            return i.join(".")
        }
        return null
    };
    this.data = this.parse(e)
};

var ASN1Data = function (e) {
    this.error = !1;
    this.parse = function (e) {
        if (!e) {
            this.error = !0;
            return null
        }
        var t = [];
        for (; e.length > 0;) {
            var i = e.charCodeAt(0);
            e = e.substr(1);
            var n = 0;
            if (5 == (31 & i))
                e = e.substr(1);
            else if (128 & e.charCodeAt(0)) {
                var a = 127 & e.charCodeAt(0);
                e = e.substr(1);
                if (a > 0)
                    n = e.charCodeAt(0);
                if (a > 1)
                    n = n << 8 | e.charCodeAt(1);
                if (a > 2) {
                    this.error = !0;
                    return null
                }
                e = e.substr(a)
            } else {
                n = e.charCodeAt(0);
                e = e.substr(1)
            }
            var s = "";
            if (n) {
                if (n > e.length) {
                    this.error = !0;
                    return null
                }
                s = e.substr(0, n);
                e = e.substr(n)
            }
            if (32 & i)
                t.push(this.parse(s));
            else
                t.push(this.value(128 & i ? 4 : 31 & i, s))
        }
        return t
    };
    this.value = function (e, t) {
        if (1 == e)
            return t ? !0 : !1;
        else if (2 == e)
            return t;
        else if (3 == e)
            return this.parse(t.substr(1));
        else if (5 == e)
            return null;
        else if (6 == e) {
            var i = [];
            var n = t.charCodeAt(0);
            i.push(Math.floor(n / 40));
            i.push(n - 40 * i[0]);
            var a = [];
            var s = 0;
            var r;
            for (r = 1; r < t.length; r++) {
                var o = t.charCodeAt(r);
                a.push(127 & o);
                if (128 & o)
                    s++;
                else {
                    var c;
                    var _ = 0;
                    for (c = 0; c < a.length; c++)
                        _ += a[c] * Math.pow(128, s--);
                    i.push(_);
                    s = 0;
                    a = []
                }
            }
            return i.join(".")
        }
        return null
    };
    this.data = this.parse(e)
};


var RSA = {
    getPublicKey: function (e) {
        if (e.length < 50)
            return !1;
        if ("-----BEGIN PUBLIC KEY-----" != e.substr(0, 26))
            return !1;
        e = e.substr(26);
        if ("-----END PUBLIC KEY-----" != e.substr(e.length - 24))
            return !1;
        e = e.substr(0, e.length - 24);
        e = new ASN1Data(Base64.decode(e));
        if (e.error)
            return !1;
        e = e.data;
        if ("1.2.840.113549.1.1.1" == e[0][0][0])
            return new RSAPublicKey(e[0][1][0][0], e[0][1][0][1]);
        else
            return !1
    },
    encrypt: function (e, t) {
        if (!t)
            return !1;
        var i = t.modulus.bitLength() + 7 >> 3;
        e = this.pkcs1pad2(e, i);
        if (!e)
            return !1;
        e = e.modPowInt(t.encryptionExponent, t.modulus);
        if (!e)
            return !1;
        e = e.toString(16);
        for (; e.length < 2 * i;)
            e = "0" + e;
        return Base64.encode(Hex.decode(e))
    },
    decrypt: function (e) {
        var t = new BigInteger(e, 16)
    },
    pkcs1pad2: function (e, t) {
        if (t < e.length + 11)
            return null;
        var i = [];
        var n = e.length - 1;
        for (; n >= 0 && t > 0;)
            i[--t] = e.charCodeAt(n--);
        i[--t] = 0;
        for (; t > 2;)
            i[--t] = Math.floor(254 * Math.random()) + 1;
        i[--t] = 2;
        i[--t] = 0;
        return new BigInteger(i)
    }
};


encrypt2 = function (e) {
    var t = RSA.getPublicKey("-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5gsH+AA4XWONB5TDcUd+xCz7ejOFHZKlcZDx+pF1i7Gsvi1vjyJoQhRtRSn950x498VUkx7rUxg1/ScBVfrRxQOZ8xFBye3pjAzfb22+RCuYApSVpJ3OO3KsEuKExftz9oFBv3ejxPlYc5yq7YiBO8XlTnQN0Sa4R4qhPO3I2MQIDAQAB-----END PUBLIC KEY-----");
    return RSA.encrypt(e, t)
}

function getPwd(passwd) {
    return encrypt2(passwd);
}

console.log(encrypt2('dasdsads'));