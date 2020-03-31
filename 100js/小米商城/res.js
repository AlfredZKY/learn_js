

var Base64 = function() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    _utf8_encode = function(f) {
        f = f.replace(/\r\n/g, "\n");
        for (var g = "", b = 0; b < f.length; b++) {
            var e = f.charCodeAt(b);
            128 > e ? g += String.fromCharCode(e) : (127 < e && 2048 > e ? g += String.fromCharCode(e >> 6 | 192) : (g += String.fromCharCode(e >> 12 | 224),
            g += String.fromCharCode(e >> 6 & 63 | 128)),
            g += String.fromCharCode(e & 63 | 128))
        }
        return g
    }
    ;
    _utf8_decode = function(f) {
        for (var g = "", b = 0, e = c1 = c2 = 0; b < f.length; ) {
            e = f.charCodeAt(b),
            128 > e ? (g += String.fromCharCode(e),
            b++) : 191 < e && 224 > e ? (c2 = f.charCodeAt(b + 1),
            g += String.fromCharCode((e & 31) << 6 | c2 & 63),
            b += 2) : (c2 = f.charCodeAt(b + 1),
            c3 = f.charCodeAt(b + 2),
            g += String.fromCharCode((e & 15) << 12 | (c2 & 63) << 6 | c3 & 63),
            b += 3)
        }
        return g
    }
    ;
    return {
        encode: function(g) {
            var i = "", k, f, b, l, e, j, n = 0;
            for (g = _utf8_encode(g); n < g.length; ) {
                k = g.charCodeAt(n++),
                f = g.charCodeAt(n++),
                b = g.charCodeAt(n++),
                l = k >> 2,
                k = (k & 3) << 4 | f >> 4,
                e = (f & 15) << 2 | b >> 6,
                j = b & 63,
                isNaN(f) ? e = j = 64 : isNaN(b) && (j = 64),
                i = i + _keyStr.charAt(l) + _keyStr.charAt(k) + _keyStr.charAt(e) + _keyStr.charAt(j)
            }
            return i
        },
        decode: function(j) {
            var l = "", e, g, k, f, b, i = 0;
            for (j = j.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < j.length; ) {
                e = _keyStr.indexOf(j.charAt(i++)),
                g = _keyStr.indexOf(j.charAt(i++)),
                f = _keyStr.indexOf(j.charAt(i++)),
                b = _keyStr.indexOf(j.charAt(i++)),
                e = e << 2 | g >> 4,
                g = (g & 15) << 4 | f >> 2,
                k = (f & 3) << 6 | b,
                l += String.fromCharCode(e),
                64 != f && (l += String.fromCharCode(g)),
                64 != b && (l += String.fromCharCode(k))
            }
            return l = _utf8_decode(l)
        }
    }
}()
var CryptoJS = CryptoJS || function(j, l) {
    var p = {}
      , g = p.lib = {}
      , b = function() {}
      , q = g.Base = {
        extend: function(e) {
            b.prototype = this;
            var h = new b;
            e && h.mixIn(e);
            h.hasOwnProperty("init") || (h.init = function() {
                h.$super.init.apply(this, arguments)
            }
            );
            h.init.prototype = h;
            h.$super = this;
            return h
        },
        create: function() {
            var d = this.extend();
            d.init.apply(d, arguments);
            return d
        },
        init: function() {},
        mixIn: function(h) {
            for (var e in h) {
                h.hasOwnProperty(e) && (this[e] = h[e])
            }
            h.hasOwnProperty("toString") && (this.toString = h.toString)
        },
        clone: function() {
            return this.init.prototype.extend(this)
        }
    }
      , f = g.WordArray = q.extend({
        init: function(e, c) {
            e = this.words = e || [];
            this.sigBytes = c != l ? c : 4 * e.length
        },
        toString: function(d) {
            return (d || r).stringify(this)
        },
        concat: function(x) {
            var w = this.words
              , u = x.words
              , v = this.sigBytes;
            x = x.sigBytes;
            this.clamp();
            if (v % 4) {
                for (var m = 0; m < x; m++) {
                    w[v + m >>> 2] |= (u[m >>> 2] >>> 24 - m % 4 * 8 & 255) << 24 - (v + m) % 4 * 8
                }
            } else {
                if (65535 < u.length) {
                    for (m = 0; m < x; m += 4) {
                        w[v + m >>> 2] = u[m >>> 2]
                    }
                } else {
                    w.push.apply(w, u)
                }
            }
            this.sigBytes += x;
            return this
        },
        clamp: function() {
            var e = this.words
              , d = this.sigBytes;
            e[d >>> 2] &= 4294967295 << 32 - d % 4 * 8;
            e.length = j.ceil(d / 4)
        },
        clone: function() {
            var d = q.clone.call(this);
            d.words = this.words.slice(0);
            return d
        },
        random: function(m) {
            for (var d = [], h = 0; h < m; h += 4) {
                d.push(4294967296 * j.random() | 0)
            }
            return new f.init(d,m)
        }
    })
      , n = p.enc = {}
      , r = n.Hex = {
        stringify: function(x) {
            var w = x.words;
            x = x.sigBytes;
            for (var u = [], v = 0; v < x; v++) {
                var m = w[v >>> 2] >>> 24 - v % 4 * 8 & 255;
                u.push((m >>> 4).toString(16));
                u.push((m & 15).toString(16))
            }
            return u.join("")
        },
        parse: function(v) {
            for (var u = v.length, h = [], m = 0; m < u; m += 2) {
                h[m >>> 3] |= parseInt(v.substr(m, 2), 16) << 24 - m % 8 * 4
            }
            return new f.init(h,u / 2)
        }
    }
      , i = n.Latin1 = {
        stringify: function(v) {
            var u = v.words;
            v = v.sigBytes;
            for (var h = [], m = 0; m < v; m++) {
                h.push(String.fromCharCode(u[m >>> 2] >>> 24 - m % 4 * 8 & 255))
            }
            return h.join("")
        },
        parse: function(v) {
            for (var u = v.length, h = [], m = 0; m < u; m++) {
                h[m >>> 2] |= (v.charCodeAt(m) & 255) << 24 - m % 4 * 8
            }
            return new f.init(h,u)
        }
    }
      , o = n.Utf8 = {
        stringify: function(h) {
            try {
                return decodeURIComponent(escape(i.stringify(h)))
            } catch (e) {
                throw Error("Malformed UTF-8 data")
            }
        },
        parse: function(d) {
            return i.parse(unescape(encodeURIComponent(d)))
        }
    }
      , t = g.BufferedBlockAlgorithm = q.extend({
        reset: function() {
            this._data = new f.init;
            this._nDataBytes = 0
        },
        _append: function(d) {
            "string" == typeof d && (d = o.parse(d));
            this._data.concat(d);
            this._nDataBytes += d.sigBytes
        },
        _process: function(z) {
            var y = this._data
              , w = y.words
              , u = y.sigBytes
              , m = this.blockSize
              , x = u / (4 * m)
              , x = z ? j.ceil(x) : j.max((x | 0) - this._minBufferSize, 0);
            z = x * m;
            u = j.min(4 * z, u);
            if (z) {
                for (var d = 0; d < z; d += m) {
                    this._doProcessBlock(w, d)
                }
                d = w.splice(0, z);
                y.sigBytes -= u
            }
            return new f.init(d,u)
        },
        clone: function() {
            var d = q.clone.call(this);
            d._data = this._data.clone();
            return d
        },
        _minBufferSize: 0
    });
    g.Hasher = t.extend({
        cfg: q.extend(),
        init: function(d) {
            this.cfg = this.cfg.extend(d);
            this.reset()
        },
        reset: function() {
            t.reset.call(this);
            this._doReset()
        },
        update: function(d) {
            this._append(d);
            this._process();
            return this
        },
        finalize: function(d) {
            d && this._append(d);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(d) {
            return function(h, c) {
                return (new d.init(c)).finalize(h)
            }
        },
        _createHmacHelper: function(d) {
            return function(h, c) {
                return (new k.HMAC.init(d,c)).finalize(h)
            }
        }
    });
    var k = p.algo = {};
    return p
}(Math);
(function(j) {
    function k(z, y, x, w, r, s, t) {
        z = z + (y & x | ~y & w) + r + t;
        return (z << s | z >>> 32 - s) + y
    }
    function o(z, y, x, w, r, s, t) {
        z = z + (y & w | x & ~w) + r + t;
        return (z << s | z >>> 32 - s) + y
    }
    function g(z, y, x, w, r, s, t) {
        z = z + (y ^ x ^ w) + r + t;
        return (z << s | z >>> 32 - s) + y
    }
    function b(z, y, x, w, s, r, t) {
        z = z + (x ^ (y | ~w)) + s + t;
        return (z << r | z >>> 32 - r) + y
    }
    for (var p = CryptoJS, f = p.lib, l = f.WordArray, q = f.Hasher, f = p.algo, i = [], n = 0; 64 > n; n++) {
        i[n] = 4294967296 * j.abs(j.sin(n + 1)) | 0
    }
    f = f.MD5 = q.extend({
        _doReset: function() {
            this._hash = new l.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(V, T) {
            for (var L = 0; 16 > L; L++) {
                var B = T + L
                  , s = V[B];
                V[B] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360
            }
            var L = this._hash.words
              , B = V[T + 0]
              , s = V[T + 1]
              , K = V[T + 2]
              , t = V[T + 3]
              , U = V[T + 4]
              , c = V[T + 5]
              , h = V[T + 6]
              , Q = V[T + 7]
              , v = V[T + 8]
              , D = V[T + 9]
              , H = V[T + 10]
              , N = V[T + 11]
              , W = V[T + 12]
              , X = V[T + 13]
              , E = V[T + 14]
              , e = V[T + 15]
              , M = L[0]
              , R = L[1]
              , P = L[2]
              , O = L[3]
              , M = k(M, R, P, O, B, 7, i[0])
              , O = k(O, M, R, P, s, 12, i[1])
              , P = k(P, O, M, R, K, 17, i[2])
              , R = k(R, P, O, M, t, 22, i[3])
              , M = k(M, R, P, O, U, 7, i[4])
              , O = k(O, M, R, P, c, 12, i[5])
              , P = k(P, O, M, R, h, 17, i[6])
              , R = k(R, P, O, M, Q, 22, i[7])
              , M = k(M, R, P, O, v, 7, i[8])
              , O = k(O, M, R, P, D, 12, i[9])
              , P = k(P, O, M, R, H, 17, i[10])
              , R = k(R, P, O, M, N, 22, i[11])
              , M = k(M, R, P, O, W, 7, i[12])
              , O = k(O, M, R, P, X, 12, i[13])
              , P = k(P, O, M, R, E, 17, i[14])
              , R = k(R, P, O, M, e, 22, i[15])
              , M = o(M, R, P, O, s, 5, i[16])
              , O = o(O, M, R, P, h, 9, i[17])
              , P = o(P, O, M, R, N, 14, i[18])
              , R = o(R, P, O, M, B, 20, i[19])
              , M = o(M, R, P, O, c, 5, i[20])
              , O = o(O, M, R, P, H, 9, i[21])
              , P = o(P, O, M, R, e, 14, i[22])
              , R = o(R, P, O, M, U, 20, i[23])
              , M = o(M, R, P, O, D, 5, i[24])
              , O = o(O, M, R, P, E, 9, i[25])
              , P = o(P, O, M, R, t, 14, i[26])
              , R = o(R, P, O, M, v, 20, i[27])
              , M = o(M, R, P, O, X, 5, i[28])
              , O = o(O, M, R, P, K, 9, i[29])
              , P = o(P, O, M, R, Q, 14, i[30])
              , R = o(R, P, O, M, W, 20, i[31])
              , M = g(M, R, P, O, c, 4, i[32])
              , O = g(O, M, R, P, v, 11, i[33])
              , P = g(P, O, M, R, N, 16, i[34])
              , R = g(R, P, O, M, E, 23, i[35])
              , M = g(M, R, P, O, s, 4, i[36])
              , O = g(O, M, R, P, U, 11, i[37])
              , P = g(P, O, M, R, Q, 16, i[38])
              , R = g(R, P, O, M, H, 23, i[39])
              , M = g(M, R, P, O, X, 4, i[40])
              , O = g(O, M, R, P, B, 11, i[41])
              , P = g(P, O, M, R, t, 16, i[42])
              , R = g(R, P, O, M, h, 23, i[43])
              , M = g(M, R, P, O, D, 4, i[44])
              , O = g(O, M, R, P, W, 11, i[45])
              , P = g(P, O, M, R, e, 16, i[46])
              , R = g(R, P, O, M, K, 23, i[47])
              , M = b(M, R, P, O, B, 6, i[48])
              , O = b(O, M, R, P, Q, 10, i[49])
              , P = b(P, O, M, R, E, 15, i[50])
              , R = b(R, P, O, M, c, 21, i[51])
              , M = b(M, R, P, O, W, 6, i[52])
              , O = b(O, M, R, P, t, 10, i[53])
              , P = b(P, O, M, R, H, 15, i[54])
              , R = b(R, P, O, M, s, 21, i[55])
              , M = b(M, R, P, O, v, 6, i[56])
              , O = b(O, M, R, P, e, 10, i[57])
              , P = b(P, O, M, R, h, 15, i[58])
              , R = b(R, P, O, M, X, 21, i[59])
              , M = b(M, R, P, O, U, 6, i[60])
              , O = b(O, M, R, P, N, 10, i[61])
              , P = b(P, O, M, R, K, 15, i[62])
              , R = b(R, P, O, M, D, 21, i[63]);
            L[0] = L[0] + M | 0;
            L[1] = L[1] + R | 0;
            L[2] = L[2] + P | 0;
            L[3] = L[3] + O | 0
        },
        _doFinalize: function() {
            var v = this._data
              , t = v.words
              , s = 8 * this._nDataBytes
              , d = 8 * v.sigBytes;
            t[d >>> 5] |= 128 << 24 - d % 32;
            var r = j.floor(s / 4294967296);
            t[(d + 64 >>> 9 << 4) + 15] = (r << 8 | r >>> 24) & 16711935 | (r << 24 | r >>> 8) & 4278255360;
            t[(d + 64 >>> 9 << 4) + 14] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360;
            v.sigBytes = 4 * (t.length + 1);
            this._process();
            v = this._hash;
            t = v.words;
            for (s = 0; 4 > s; s++) {
                d = t[s],
                t[s] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360
            }
            return v
        },
        clone: function() {
            var d = q.clone.call(this);
            d._hash = this._hash.clone();
            return d
        }
    });
    p.MD5 = q._createHelper(f);
    p.HmacMD5 = q._createHmacHelper(f)
}
)(Math);

function getPwd(passwd){
   return (CryptoJS.MD5(passwd).toString() + "").toUpperCase();
}
console.log(getPwd('5506'));