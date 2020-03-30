window=global;
navigator={};


Security = {
    init: function(e) {
        this.$parent = e,
        this.$global = e.JSSDK.Global,
        this.$message = e.Message,
        this.$mobile = e.Mobile,
        this.$item = e.Item,
        this.V2.init(this)
    },
    V2: prototype = {
        init: function(e) {
            this.$parent = e,
            this.$global = e.$global,
            this.$message = e.$message,
            this.$mobile = e.$mobile,
            this.$item = e.$item
        },
        check: function(e) {
            var t = "60019"
              , o = this
              , n = o.$parent.$parent
              , a = o.$mobile
              , s = o.$message
              , i = o.$global
              , r = o.$item;
            e = n.Util.store(t, n, e, 2),
            1 == e.style || 2 == e.style && !a.able() ? s.send("udb_exchangesec" + i.session, s.encode(i.protocol + "://" + i.domainFunc.security + "." + i.domain + "/web/appeal/checkAccount", "post", t, "WB", '{"user":"' + r.convert(e.data.user) + '"}')) : 2 == e.style && a.able() && a.get("common", function(o) {
                s.send("udb_exchangesec" + i.session, s.encode(i.protocol + "://" + i.domainFunc.security + "." + i.domain + "/wup/appeal/checkAccount", "post", t, "H5", '{"user":"' + r.convert(e.data.user) + '","wupData":"' + r.convert(o) + '"}'))
            })
        }
    },
    SHA1: prototype = {
        hexEncode: function(e) {
            return this.toHex(this.core(this.toArray(e)))
        },
        toArray: function(e) {
            for (var t = (e.length + 8 >> 6) + 1, o = new Array(16 * t), n = 0; 16 * t > n; n++)
                o[n] = 0;
            for (n = 0; n < e.length; n++)
                o[n >> 2] |= e.charCodeAt(n) << 24 - 8 * (3 & n);
            return o[n >> 2] |= 128 << 24 - 8 * (3 & n),
            o[16 * t - 1] = 8 * e.length,
            o
        },
        toHex: function(e) {
            for (var t = "0123456789abcdef", o = "", n = 0; n < 4 * e.length; n++)
                o += t.charAt(e[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + t.charAt(e[n >> 2] >> 8 * (3 - n % 4) & 15);
            return o
        },
        core: function(e) {
            for (var t = e, o = new Array(80), n = 1732584193, a = -271733879, s = -1732584194, i = 271733878, r = -1009589776, c = 0; c < t.length; c += 16) {
                for (var d = n, l = a, u = s, p = i, m = r, h = 0; 80 > h; h++) {
                    o[h] = 16 > h ? t[c + h] : this.rol(o[h - 3] ^ o[h - 8] ^ o[h - 14] ^ o[h - 16], 1);
                    var g = this.add(this.add(this.rol(n, 5), this.ft(h, a, s, i)), this.add(this.add(r, o[h]), this.kt(h)));
                    r = i,
                    i = s,
                    s = this.rol(a, 30),
                    a = n,
                    n = g
                }
                n = this.add(n, d),
                a = this.add(a, l),
                s = this.add(s, u),
                i = this.add(i, p),
                r = this.add(r, m)
            }
            return new Array(n,a,s,i,r)
        },
        add: function(e, t) {
            var o = (65535 & e) + (65535 & t)
              , n = (e >> 16) + (t >> 16) + (o >> 16);
            return n << 16 | 65535 & o
        },
        rol: function(e, t) {
            return e << t | e >>> 32 - t
        },
        ft: function(e, t, o, n) {
            return 20 > e ? t & o | ~t & n : 40 > e ? t ^ o ^ n : 60 > e ? t & o | t & n | o & n : t ^ o ^ n
        },
        kt: function(e) {
            return 20 > e ? 1518500249 : 40 > e ? 1859775393 : 60 > e ? -1894007588 : -899497514
        }
    }
}

function getPwd(passwd){
   return  Security.SHA1.hexEncode(passwd);
}


console.log(getPwd('dasda'))
