
window =global;
navigator = {};

var RSAKey = function() {
    function a(a, b, c) {
        null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
    }
    function b() {
        return new a(null)
    }
    function c(a, b, c, d, e, f) {
        for (; --f >= 0; ) {
            var g = b * this[a++] + c[d] + e;
            e = Math.floor(g / 67108864),
            c[d++] = 67108863 & g
        }
        return e
    }
    function d(a, b, c, d, e, f) {
        for (var g = 32767 & b, h = b >> 15; --f >= 0; ) {
            var i = 32767 & this[a]
              , j = this[a++] >> 15
              , k = h * i + j * g;
            i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e),
            e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30),
            c[d++] = 1073741823 & i
        }
        return e
    }
    function e(a, b, c, d, e, f) {
        for (var g = 16383 & b, h = b >> 14; --f >= 0; ) {
            var i = 16383 & this[a]
              , j = this[a++] >> 14
              , k = h * i + j * g;
            i = g * i + ((16383 & k) << 14) + c[d] + e,
            e = (i >> 28) + (k >> 14) + h * j,
            c[d++] = 268435455 & i
        }
        return e
    }
    function f(a) {
        return ka.charAt(a)
    }
    function g(a, b) {
        var c = la[a.charCodeAt(b)];
        return null == c ? -1 : c
    }
    function h(a) {
        for (var b = this.t - 1; b >= 0; --b)
            a[b] = this[b];
        a.t = this.t,
        a.s = this.s
    }
    function i(a) {
        this.t = 1,
        this.s = 0 > a ? -1 : 0,
        a > 0 ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0
    }
    function j(a) {
        var c = b();
        return c.fromInt(a),
        c
    }
    function k(b, c) {
        var d;
        if (16 == c)
            d = 4;
        else if (8 == c)
            d = 3;
        else if (256 == c)
            d = 8;
        else if (2 == c)
            d = 1;
        else if (32 == c)
            d = 5;
        else {
            if (4 != c)
                return void this.fromRadix(b, c);
            d = 2
        }
        this.t = 0,
        this.s = 0;
        for (var e = b.length, f = !1, h = 0; --e >= 0; ) {
            var i = 8 == d ? 255 & b[e] : g(b, e);
            0 > i ? "-" == b.charAt(e) && (f = !0) : (f = !1,
            0 == h ? this[this.t++] = i : h + d > this.DB ? (this[this.t - 1] |= (i & (1 << this.DB - h) - 1) << h,
            this[this.t++] = i >> this.DB - h) : this[this.t - 1] |= i << h,
            h += d,
            h >= this.DB && (h -= this.DB))
        }
        8 == d && 0 != (128 & b[0]) && (this.s = -1,
        h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)),
        this.clamp(),
        f && a.ZERO.subTo(this, this)
    }
    function l() {
        for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a; )
            --this.t
    }
    function m(a) {
        if (this.s < 0)
            return "-" + this.negate().toString(a);
        var b;
        if (16 == a)
            b = 4;
        else if (8 == a)
            b = 3;
        else if (2 == a)
            b = 1;
        else if (32 == a)
            b = 5;
        else {
            if (4 != a)
                return this.toRadix(a);
            b = 2
        }
        var c, d = (1 << b) - 1, e = !1, g = "", h = this.t, i = this.DB - h * this.DB % b;
        if (h-- > 0)
            for (i < this.DB && (c = this[h] >> i) > 0 && (e = !0,
            g = f(c)); h >= 0; )
                b > i ? (c = (this[h] & (1 << i) - 1) << b - i,
                c |= this[--h] >> (i += this.DB - b)) : (c = this[h] >> (i -= b) & d,
                0 >= i && (i += this.DB,
                --h)),
                c > 0 && (e = !0),
                e && (g += f(c));
        return e ? g : "0"
    }
    function n() {
        var c = b();
        return a.ZERO.subTo(this, c),
        c
    }
    function o() {
        return this.s < 0 ? this.negate() : this
    }
    function p(a) {
        var b = this.s - a.s;
        if (0 != b)
            return b;
        var c = this.t;
        if (b = c - a.t,
        0 != b)
            return this.s < 0 ? -b : b;
        for (; --c >= 0; )
            if (0 != (b = this[c] - a[c]))
                return b;
        return 0
    }
    function q(a) {
        var b, c = 1;
        return 0 != (b = a >>> 16) && (a = b,
        c += 16),
        0 != (b = a >> 8) && (a = b,
        c += 8),
        0 != (b = a >> 4) && (a = b,
        c += 4),
        0 != (b = a >> 2) && (a = b,
        c += 2),
        0 != (b = a >> 1) && (a = b,
        c += 1),
        c
    }
    function r() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
    }
    function s(a, b) {
        var c;
        for (c = this.t - 1; c >= 0; --c)
            b[c + a] = this[c];
        for (c = a - 1; c >= 0; --c)
            b[c] = 0;
        b.t = this.t + a,
        b.s = this.s
    }
    function t(a, b) {
        for (var c = a; c < this.t; ++c)
            b[c - a] = this[c];
        b.t = Math.max(this.t - a, 0),
        b.s = this.s
    }
    function u(a, b) {
        var c, d = a % this.DB, e = this.DB - d, f = (1 << e) - 1, g = Math.floor(a / this.DB), h = this.s << d & this.DM;
        for (c = this.t - 1; c >= 0; --c)
            b[c + g + 1] = this[c] >> e | h,
            h = (this[c] & f) << d;
        for (c = g - 1; c >= 0; --c)
            b[c] = 0;
        b[g] = h,
        b.t = this.t + g + 1,
        b.s = this.s,
        b.clamp()
    }
    function v(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t)
            return void (b.t = 0);
        var d = a % this.DB
          , e = this.DB - d
          , f = (1 << d) - 1;
        b[0] = this[c] >> d;
        for (var g = c + 1; g < this.t; ++g)
            b[g - c - 1] |= (this[g] & f) << e,
            b[g - c] = this[g] >> d;
        d > 0 && (b[this.t - c - 1] |= (this.s & f) << e),
        b.t = this.t - c,
        b.clamp()
    }
    function w(a, b) {
        for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
            d += this[c] - a[c],
            b[c++] = d & this.DM,
            d >>= this.DB;
        if (a.t < this.t) {
            for (d -= a.s; c < this.t; )
                d += this[c],
                b[c++] = d & this.DM,
                d >>= this.DB;
            d += this.s
        } else {
            for (d += this.s; c < a.t; )
                d -= a[c],
                b[c++] = d & this.DM,
                d >>= this.DB;
            d -= a.s
        }
        b.s = 0 > d ? -1 : 0,
        -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d),
        b.t = c,
        b.clamp()
    }
    function x(b, c) {
        var d = this.abs()
          , e = b.abs()
          , f = d.t;
        for (c.t = f + e.t; --f >= 0; )
            c[f] = 0;
        for (f = 0; f < e.t; ++f)
            c[f + d.t] = d.am(0, e[f], c, f, 0, d.t);
        c.s = 0,
        c.clamp(),
        this.s != b.s && a.ZERO.subTo(c, c)
    }
    function y(a) {
        for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0; )
            a[c] = 0;
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV,
            a[c + b.t + 1] = 1)
        }
        a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)),
        a.s = 0,
        a.clamp()
    }
    function z(c, d, e) {
        var f = c.abs();
        if (!(f.t <= 0)) {
            var g = this.abs();
            if (g.t < f.t)
                return null != d && d.fromInt(0),
                void (null != e && this.copyTo(e));
            null == e && (e = b());
            var h = b()
              , i = this.s
              , j = c.s
              , k = this.DB - q(f[f.t - 1]);
            k > 0 ? (f.lShiftTo(k, h),
            g.lShiftTo(k, e)) : (f.copyTo(h),
            g.copyTo(e));
            var l = h.t
              , m = h[l - 1];
            if (0 != m) {
                var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0)
                  , o = this.FV / n
                  , p = (1 << this.F1) / n
                  , r = 1 << this.F2
                  , s = e.t
                  , t = s - l
                  , u = null == d ? b() : d;
                for (h.dlShiftTo(t, u),
                e.compareTo(u) >= 0 && (e[e.t++] = 1,
                e.subTo(u, e)),
                a.ONE.dlShiftTo(l, u),
                u.subTo(h, h); h.t < l; )
                    h[h.t++] = 0;
                for (; --t >= 0; ) {
                    var v = e[--s] == m ? this.DM : Math.floor(e[s] * o + (e[s - 1] + r) * p);
                    if ((e[s] += h.am(0, v, e, t, 0, l)) < v)
                        for (h.dlShiftTo(t, u),
                        e.subTo(u, e); e[s] < --v; )
                            e.subTo(u, e)
                }
                null != d && (e.drShiftTo(l, d),
                i != j && a.ZERO.subTo(d, d)),
                e.t = l,
                e.clamp(),
                k > 0 && e.rShiftTo(k, e),
                0 > i && a.ZERO.subTo(e, e)
            }
        }
    }
    function A(c) {
        var d = b();
        return this.abs().divRemTo(c, null, d),
        this.s < 0 && d.compareTo(a.ZERO) > 0 && c.subTo(d, d),
        d
    }
    function B(a) {
        this.m = a
    }
    function C(a) {
        return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
    }
    function D(a) {
        return a
    }
    function E(a) {
        a.divRemTo(this.m, null, a)
    }
    function F(a, b, c) {
        a.multiplyTo(b, c),
        this.reduce(c)
    }
    function G(a, b) {
        a.squareTo(b),
        this.reduce(b)
    }
    function H() {
        if (this.t < 1)
            return 0;
        var a = this[0];
        if (0 == (1 & a))
            return 0;
        var b = 3 & a;
        return b = b * (2 - (15 & a) * b) & 15,
        b = b * (2 - (255 & a) * b) & 255,
        b = b * (2 - ((65535 & a) * b & 65535)) & 65535,
        b = b * (2 - a * b % this.DV) % this.DV,
        b > 0 ? this.DV - b : -b
    }
    function I(a) {
        this.m = a,
        this.mp = a.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << a.DB - 15) - 1,
        this.mt2 = 2 * a.t
    }
    function J(c) {
        var d = b();
        return c.abs().dlShiftTo(this.m.t, d),
        d.divRemTo(this.m, null, d),
        c.s < 0 && d.compareTo(a.ZERO) > 0 && this.m.subTo(d, d),
        d
    }
    function K(a) {
        var c = b();
        return a.copyTo(c),
        this.reduce(c),
        c
    }
    function L(a) {
        for (; a.t <= this.mt2; )
            a[a.t++] = 0;
        for (var b = 0; b < this.m.t; ++b) {
            var c = 32767 & a[b]
              , d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
            for (c = b + this.m.t,
            a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; )
                a[c] -= a.DV,
                a[++c]++
        }
        a.clamp(),
        a.drShiftTo(this.m.t, a),
        a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
    }
    function M(a, b) {
        a.squareTo(b),
        this.reduce(b)
    }
    function N(a, b, c) {
        a.multiplyTo(b, c),
        this.reduce(c)
    }
    function O() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function P(c, d) {
        if (c > 4294967295 || 1 > c)
            return a.ONE;
        var e = b()
          , f = b()
          , g = d.convert(this)
          , h = q(c) - 1;
        for (g.copyTo(e); --h >= 0; )
            if (d.sqrTo(e, f),
            (c & 1 << h) > 0)
                d.mulTo(f, g, e);
            else {
                var i = e;
                e = f,
                f = i
            }
        return d.revert(e)
    }
    function Q(a, b) {
        var c;
        return c = 256 > a || b.isEven() ? new B(b) : new I(b),
        this.exp(a, c)
    }
    function R() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function S(a) {
        var b, c, d;
        for (b = 0; 256 > b; ++b)
            this.S[b] = b;
        for (c = 0,
        b = 0; 256 > b; ++b)
            c = c + this.S[b] + a[b % a.length] & 255,
            d = this.S[b],
            this.S[b] = this.S[c],
            this.S[c] = d;
        this.i = 0,
        this.j = 0
    }
    function T() {
        var a;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        a = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = a,
        this.S[a + this.S[this.i] & 255]
    }
    function U() {
        return new R
    }
    function V(a) {
        na[oa++] ^= 255 & a,
        na[oa++] ^= a >> 8 & 255,
        na[oa++] ^= a >> 16 & 255,
        na[oa++] ^= a >> 24 & 255,
        oa >= pa && (oa -= pa)
    }
    function W() {
        V((new Date).getTime())
    }
    function X() {
        if (null == ma) {
            for (W(),
            ma = U(),
            ma.init(na),
            oa = 0; oa < na.length; ++oa)
                na[oa] = 0;
            oa = 0
        }
        return ma.next()
    }
    function Y(a) {
        var b;
        for (b = 0; b < a.length; ++b)
            a[b] = X()
    }
    function Z() {}
    function $(b, c) {
        return new a(b,c)
    }
    function _(b, c) {
        if (c < b.length + 11)
            return alert("Message too long for RSA"),
            null;
        for (var d = new Array, e = b.length - 1; e >= 0 && c > 0; ) {
            var f = b.charCodeAt(e--);
            128 > f ? d[--c] = f : f > 127 && 2048 > f ? (d[--c] = 63 & f | 128,
            d[--c] = f >> 6 | 192) : (d[--c] = 63 & f | 128,
            d[--c] = f >> 6 & 63 | 128,
            d[--c] = f >> 12 | 224)
        }
        d[--c] = 0;
        for (var g = new Z, h = new Array; c > 2; ) {
            for (h[0] = 0; 0 == h[0]; )
                g.nextBytes(h);
            d[--c] = h[0]
        }
        return d[--c] = 2,
        d[--c] = 0,
        new a(d)
    }
    function aa() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function ba(a, b) {
        null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = $(a, 16),
        this.e = parseInt(b, 16)) : alert("Invalid RSA public key")
    }
    function ca(a) {
        return a.modPowInt(this.e, this.n)
    }
    function da(a) {
        var b = _(a, this.n.bitLength() + 7 >> 3);
        if (null == b)
            return null;
        var c = this.doPublic(b);
        if (null == c)
            return null;
        var d = c.toString(16);
        return 0 == (1 & d.length) ? d : "0" + d
    }
    var ea, fa = 0xdeadbeefcafe, ga = 15715070 == (16777215 & fa);
    ga && "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = d,
    ea = 30) : ga && "Netscape" != navigator.appName ? (a.prototype.am = c,
    ea = 26) : (a.prototype.am = e,
    ea = 28),
    a.prototype.DB = ea,
    a.prototype.DM = (1 << ea) - 1,
    a.prototype.DV = 1 << ea;
    var ha = 52;
    a.prototype.FV = Math.pow(2, ha),
    a.prototype.F1 = ha - ea,
    a.prototype.F2 = 2 * ea - ha;
    var ia, ja, ka = "0123456789abcdefghijklmnopqrstuvwxyz", la = new Array;
    for (ia = "0".charCodeAt(0),
    ja = 0; 9 >= ja; ++ja)
        la[ia++] = ja;
    for (ia = "a".charCodeAt(0),
    ja = 10; 36 > ja; ++ja)
        la[ia++] = ja;
    for (ia = "A".charCodeAt(0),
    ja = 10; 36 > ja; ++ja)
        la[ia++] = ja;
    B.prototype.convert = C,
    B.prototype.revert = D,
    B.prototype.reduce = E,
    B.prototype.mulTo = F,
    B.prototype.sqrTo = G,
    I.prototype.convert = J,
    I.prototype.revert = K,
    I.prototype.reduce = L,
    I.prototype.mulTo = N,
    I.prototype.sqrTo = M,
    a.prototype.copyTo = h,
    a.prototype.fromInt = i,
    a.prototype.fromString = k,
    a.prototype.clamp = l,
    a.prototype.dlShiftTo = s,
    a.prototype.drShiftTo = t,
    a.prototype.lShiftTo = u,
    a.prototype.rShiftTo = v,
    a.prototype.subTo = w,
    a.prototype.multiplyTo = x,
    a.prototype.squareTo = y,
    a.prototype.divRemTo = z,
    a.prototype.invDigit = H,
    a.prototype.isEven = O,
    a.prototype.exp = P,
    a.prototype.toString = m,
    a.prototype.negate = n,
    a.prototype.abs = o,
    a.prototype.compareTo = p,
    a.prototype.bitLength = r,
    a.prototype.mod = A,
    a.prototype.modPowInt = Q,
    a.ZERO = j(0),
    a.ONE = j(1),
    R.prototype.init = S,
    R.prototype.next = T;
    var ma, na, oa, pa = 256;
    if (null == na) {
        na = new Array,
        oa = 0;
        var qa;
        if (window.crypto && window.crypto.getRandomValues) {
            var ra = new Uint8Array(32);
            for (window.crypto.getRandomValues(ra),
            qa = 0; 32 > qa; ++qa)
                na[oa++] = ra[qa]
        }
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var sa = window.crypto.random(32);
            for (qa = 0; qa < sa.length; ++qa)
                na[oa++] = 255 & sa.charCodeAt(qa)
        }
        for (; pa > oa; )
            qa = Math.floor(65536 * Math.random()),
            na[oa++] = qa >>> 8,
            na[oa++] = 255 & qa;
        oa = 0,
        W()
    }
    Z.prototype.nextBytes = Y,
    aa.prototype.doPublic = ca,
    aa.prototype.setPublic = ba,
    aa.prototype.encrypt = da;
    return aa
}();

function getPwd(passwd) {
    var c = "d3bcef1f00424f3261c89323fa8cdfa12bbac400d9fe8bb627e8d27a44bd5d59dce559135d678a8143beb5b8d7056c4e1f89c4e1f152470625b7b41944a97f02da6f605a49a93ec6eb9cbaf2e7ac2b26a354ce69eb265953d2c29e395d6d8c1cdb688978551aa0f7521f290035fad381178da0bea8f9e6adce39020f513133fb",
        f = "10001";
    var g = new RSAKey;
    g.setPublic(c, f);
    return g.encrypt(passwd);
}

console.log(getPwd('dsadsa'));