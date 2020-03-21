!window.WBtopGlobal_loginLayer && (window.WBtopGlobal_loginLayer = function() {
    var $CONFIG = {};
    if (window.$CONFIG)
        for (var t in window.$CONFIG)
            $CONFIG[t] = window.$CONFIG[t];
    $CONFIG.mJsPath = ["//js{n}.t.sinajs.cn/t5/", 1, 2];
    $CONFIG.mCssPath = ["//img{n}.t.sinajs.cn/t5/", 1, 2];
    var STK = arguments[0];
    if (!STK)
        var STK = function() {
            var a = {}
              , b = "theia";
            a[b] = {
                IE: /msie/i.test(navigator.userAgent),
                E: function(a) {
                    return typeof a == "string" ? document.getElementById(a) : a
                },
                C: function(a) {
                    var b;
                    a = a.toUpperCase();
                    a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
                    return b
                },
                log: function(a) {}
            };
            var c = a[b];
            c.register = function(c, d, e) {
                if (!e || typeof e != "string")
                    e = b;
                a[e] || (a[e] = {});
                var f = a[e]
                  , g = c.split(".")
                  , h = f
                  , i = null;
                while (i = g.shift())
                    if (g.length) {
                        h[i] === undefined && (h[i] = {});
                        h = h[i]
                    } else if (h[i] === undefined)
                        try {
                            if (e && e !== b) {
                                if (c === "core.util.listener") {
                                    h[i] = a[b].core.util.listener;
                                    return !0
                                }
                                if (c === "core.util.connect") {
                                    h[i] = a[b].core.util.connect;
                                    return !0
                                }
                            }
                            h[i] = d(f);
                            return !0
                        } catch (j) {
                            setTimeout(function() {}, 0)
                        }
                return !1
            }
            ;
            c.unRegister = function(c, d) {
                if (!d || typeof d != "string")
                    d = b;
                var e = a[d]
                  , f = c.split(".")
                  , g = e
                  , h = null;
                while (h = f.shift())
                    if (f.length) {
                        if (g[h] === undefined)
                            return !1;
                        g = g[h]
                    } else if (g[h] !== undefined) {
                        delete g[h];
                        return !0
                    }
                return !1
            }
            ;
            c.regShort = function(a, b) {
                if (c[a] !== undefined)
                    throw "[" + a + "] : short : has been register";
                c[a] = b
            }
            ;
            c.shortRegister = function(c, d, e) {
                if (!e || typeof e != "string")
                    e = b;
                var f = a[e]
                  , g = c.split(".");
                if (!d)
                    return !1;
                if (f[d])
                    return !1;
                var h = f
                  , i = null;
                while (i = g.shift())
                    if (g.length) {
                        if (h[i] === undefined)
                            return !1;
                        h = h[i]
                    } else if (h[i] !== undefined) {
                        if (f[d])
                            return !1;
                        f[d] = h[i];
                        return !0
                    }
                return !1
            }
            ;
            c.getPKG = function(c) {
                if (!c || typeof c != "string")
                    c = b;
                return a[c]
            }
            ;
            return c
        }();
    STK.register("core.ani.algorithm", function(a) {
        var b = {
            linear: function(a, b, c, d, e) {
                return c * a / d + b
            },
            easeincubic: function(a, b, c, d, e) {
                return c * (a /= d) * a * a + b
            },
            easeoutcubic: function(a, b, c, d, e) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
            },
            easeinoutcubic: function(a, b, c, d, e) {
                e == undefined && (e = 1.70158);
                return c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            easeinback: function(a, b, c, d, e) {
                e == undefined && (e = 1.70158);
                return c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            easeoutback: function(a, b, c, d, e) {
                e == undefined && (e = 1.70158);
                return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            },
            easeinoutback: function(a, b, c, d, e) {
                e == undefined && (e = 1.70158);
                return (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            }
        };
        return {
            addAlgorithm: function(a, c) {
                if (b[a])
                    throw "[core.ani.tweenValue] this algorithm :" + a + "already exist";
                b[a] = c
            },
            compute: function(a, c, d, e, f, g, h) {
                if (typeof b[a] != "function")
                    throw "[core.ani.tweenValue] this algorithm :" + a + "do not exist";
                return b[a](e, c, d, f, g, h)
            }
        }
    });
    STK.register("core.func.empty", function() {
        return function() {}
    });
    STK.register("core.obj.parseParam", function(a) {
        return function(a, b, c) {
            var d, e = {};
            b = b || {};
            for (d in a) {
                e[d] = a[d];
                b[d] != null && (c ? a.hasOwnProperty[d] && (e[d] = b[d]) : e[d] = b[d])
            }
            return e
        }
    });
    STK.register("core.ani.tweenArche", function(a) {
        return function(b, c) {
            var d, e, f, g, h, i, j, k;
            e = {};
            d = a.core.obj.parseParam({
                animationType: "linear",
                distance: 1,
                duration: 500,
                callback: a.core.func.empty,
                algorithmParams: {},
                extra: 5,
                delay: 25
            }, c);
            var l = function() {
                f = +(new Date) - g;
                if (f < d.duration) {
                    h = a.core.ani.algorithm.compute(d.animationType, 0, d.distance, f, d.duration, d.extra, d.algorithmParams);
                    b(h);
                    i = setTimeout(l, d.delay)
                } else {
                    k = "stop";
                    d.callback()
                }
            };
            k = "stop";
            e.getStatus = function() {
                return k
            }
            ;
            e.play = function() {
                g = +(new Date);
                h = null;
                l();
                k = "play";
                return e
            }
            ;
            e.stop = function() {
                clearTimeout(i);
                k = "stop";
                return e
            }
            ;
            e.resume = function() {
                if (j) {
                    g += +(new Date) - j;
                    l()
                }
                return e
            }
            ;
            e.pause = function() {
                clearTimeout(i);
                j = +(new Date);
                k = "pause";
                return e
            }
            ;
            e.destroy = function() {
                clearTimeout(i);
                j = 0;
                k = "stop"
            }
            ;
            return e
        }
    });
    STK.register("core.dom.getStyle", function(a) {
        function b() {
            return "y"in b ? b.y : b.y = "filters"in a.C("div")
        }
        return function(a, c) {
            if (!b()) {
                c == "float" && (c = "cssFloat");
                try {
                    var d = document.defaultView.getComputedStyle(a, "")
                } catch (e) {}
                return a.style[c] || d ? d[c] : null
            }
            switch (c) {
            case "opacity":
                var f = 100;
                try {
                    f = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
                } catch (e) {
                    try {
                        f = a.filters("alpha").opacity
                    } catch (e) {}
                }
                return f / 100;
            case "float":
                c = "styleFloat";
            default:
                var g = a.currentStyle ? a.currentStyle[c] : null;
                return a.style[c] || g
            }
        }
    });
    STK.register("core.util.browser", function(a) {
        var b = navigator.userAgent.toLowerCase(), c = window.external || "", d, e, f, g, h, i = function(a) {
            var b = 0;
            return parseFloat(a.replace(/\./g, function() {
                return b++ == 1 ? "" : "."
            }))
        };
        try {
            /windows|win32/i.test(b) ? h = "windows" : /macintosh/i.test(b) ? h = "macintosh" : /rhino/i.test(b) && (h = "rhino");
            if ((e = b.match(/applewebkit\/([^\s]*)/)) && e[1]) {
                d = "webkit";
                g = i(e[1])
            } else if ((e = b.match(/presto\/([\d.]*)/)) && e[1]) {
                d = "presto";
                g = i(e[1])
            } else if (e = b.match(/msie\s([^;]*)/)) {
                d = "trident";
                g = 1;
                (e = b.match(/trident\/([\d.]*)/)) && e[1] && (g = i(e[1]))
            } else if (/gecko/.test(b)) {
                d = "gecko";
                g = 1;
                (e = b.match(/rv:([\d.]*)/)) && e[1] && (g = i(e[1]))
            }
            /world/.test(b) ? f = "world" : /360se/.test(b) ? f = "360" : /maxthon/.test(b) || typeof c.max_version == "number" ? f = "maxthon" : /tencenttraveler\s([\d.]*)/.test(b) ? f = "tt" : /se\s([\d.]*)/.test(b) && (f = "sogou")
        } catch (j) {}
        var k = {
            OS: h,
            CORE: d,
            Version: g,
            EXTRA: f ? f : !1,
            IE: /msie/.test(b),
            OPERA: /opera/.test(b),
            MOZ: /gecko/.test(b) && !/(compatible|webkit)/.test(b),
            IE5: /msie 5 /.test(b),
            IE55: /msie 5.5/.test(b),
            IE6: /msie 6/.test(b),
            IE7: /msie 7/.test(b),
            IE8: /msie 8/.test(b),
            IE9: /msie 9/.test(b),
            SAFARI: !/chrome\/([\d.]*)/.test(b) && /\/([\da-f.]*) safari/.test(b),
            CHROME: /chrome\/([\d.]*)/.test(b),
            IPAD: /\(ipad/i.test(b),
            IPHONE: /\(iphone/i.test(b),
            ITOUCH: /\(itouch/i.test(b),
            MOBILE: /mobile/i.test(b)
        };
        return k
    });
    STK.register("core.dom.cssText", function(a) {
        var b = function(a) {
            var b = 0
              , c = []
              , d = "close"
              , e = !1
              , f = null
              , g = function(d) {
                c.push({
                    type: "info",
                    content: a.slice(0, b)
                });
                c.push({
                    type: "sign",
                    content: a.slice(b, b + 1)
                });
                a = a.slice(b + 1);
                b = 0
            };
            while (a) {
                var h = a.charAt(b);
                switch (h) {
                case ":":
                    if (!e && d === "close") {
                        c.push({
                            type: "attr",
                            content: a.slice(0, b)
                        });
                        c.push({
                            type: "sign",
                            content: a.slice(b, b + 1)
                        });
                        a = a.slice(b + 1);
                        b = 0;
                        d = "open";
                        break
                    }
                    b += 1;
                    break;
                case ";":
                    if (!e) {
                        if (d === "open") {
                            c.push({
                                type: "info",
                                content: a.slice(0, b)
                            });
                            c.push({
                                type: "sign",
                                content: a.slice(b, b + 1)
                            })
                        }
                        a = a.slice(b + 1);
                        b = 0;
                        d = "close";
                        break
                    }
                    b += 1;
                    break;
                case '"':
                case "'":
                    if (e) {
                        if (h === f) {
                            e = !e;
                            f = null
                        }
                    } else {
                        e = !e;
                        f = h
                    }
                    b += 1;
                    break;
                case " ":
                case "!":
                case ",":
                case "(":
                case ")":
                    g(h);
                    break;
                case "":
                    c.push({
                        type: "info",
                        content: a.slice(0, b)
                    });
                    a = "";
                    b = 0;
                    break;
                default:
                    b += 1
                }
            }
            return c
        }
          , c = function(a) {
            var b = {}, c;
            for (var d = 0, e = a.length; d < e; d += 1)
                if (a[d].type === "attr") {
                    c = a[d].content;
                    b[c] = ""
                } else {
                    if (a[d].type === "sign" && a[d].content === ";") {
                        c = null;
                        continue
                    }
                    if (a[d].type === "sign" && a[d].content === ":")
                        continue;
                    c !== null;
                    b[c] += a[d].content
                }
            return b
        }
          , d = {
            webkit: "-webkit-",
            presto: "-o-",
            trident: "-ms-",
            gecko: "-moz-"
        }[a.core.util.browser.CORE]
          , e = ["transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function"]
          , f = function(a) {
            for (var b = 0, c = e.length; b < c; b += 1)
                if (a === e[b])
                    return !0;
            return !1
        };
        return function(a) {
            var e = c(b(a || ""))
              , g = function(a, b) {
                a = a.toLowerCase();
                e[a] = b;
                f(a) && (e[d + a] = b);
                return h
            }
              , h = {
                push: g,
                remove: function(a) {
                    a = a.toLowerCase();
                    e[a] && delete e[a];
                    f(a) && e[d + a] && delete e[d + a];
                    return h
                },
                merge: function(a) {
                    var d = c(b(a || ""));
                    for (var e in d)
                        g(e, d[e])
                },
                getCss: function() {
                    var a = [];
                    for (var b in e)
                        a.push(b + ":" + e[b]);
                    return a.join(";")
                }
            };
            return h
        }
    });
    STK.register("core.func.getType", function(a) {
        return function(a) {
            var b;
            return ((b = typeof a) == "object" ? a == null && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase()
        }
    });
    STK.register("core.arr.isArray", function(a) {
        return function(a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
    });
    STK.register("core.arr.foreach", function(a) {
        var b = function(a, b) {
            var c = [];
            for (var d = 0, e = a.length; d < e; d += 1) {
                var f = b(a[d], d);
                if (f === !1)
                    break;
                f !== null && (c[d] = f)
            }
            return c
        }
          , c = function(a, b) {
            var c = {};
            for (var d in a) {
                var e = b(a[d], d);
                if (e === !1)
                    break;
                e !== null && (c[d] = e)
            }
            return c
        };
        return function(d, e) {
            return a.core.arr.isArray(d) || d.length && d[0] !== undefined ? b(d, e) : typeof d == "object" ? c(d, e) : null
        }
    });
    STK.register("core.arr.indexOf", function(a) {
        return function(a, b) {
            if (b.indexOf)
                return b.indexOf(a);
            for (var c = 0, d = b.length; c < d; c++)
                if (b[c] === a)
                    return c;
            return -1
        }
    });
    STK.register("core.arr.inArray", function(a) {
        return function(b, c) {
            return a.core.arr.indexOf(b, c) > -1
        }
    });
    STK.register("core.dom.isNode", function(a) {
        return function(a) {
            return a != undefined && Boolean(a.nodeName) && Boolean(a.nodeType)
        }
    });
    STK.register("core.json.merge", function(a) {
        var b = function(b) {
            return b === undefined ? !0 : b === null ? !0 : a.core.arr.inArray(typeof b, ["number", "string", "function", "boolean"]) ? !0 : a.core.dom.isNode(b) ? !0 : !1
        }
          , c = function(d, e, f) {
            if (b(f))
                d[e] = f;
            else {
                if (a.core.arr.isArray(f)) {
                    a.core.arr.isArray(d[e]) || (d[e] = []);
                    for (var g = 0, h = f.length; g < h; g += 1)
                        c(d[e], g, f[g]);
                    return
                }
                if (typeof f == "object") {
                    if (b(d[e]) || a.core.arr.isArray(d[e]))
                        d[e] = {};
                    for (var i in f)
                        c(d[e], i, f[i]);
                    return
                }
            }
        }
          , d = function(a, b, d) {
            var e = {};
            if (d) {
                for (var f in a)
                    c(e, f, a[f]);
                for (var f in b)
                    c(e, f, b[f])
            } else {
                for (var f in a)
                    e[f] = a[f];
                for (var f in b)
                    e[f] = b[f]
            }
            return e
        };
        return function(b, c, e) {
            var f = a.core.obj.parseParam({
                isDeep: !1
            }, e);
            return d(b, c, f.isDeep)
        }
    });
    STK.register("core.util.color", function(a) {
        var b = /^#([a-fA-F0-9]{3,8})$/
          , c = /^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/
          , d = /([0-9]{1,3})/ig
          , e = /([a-fA-F0-9]{2})/ig
          , f = a.core.arr.foreach
          , g = function(a) {
            var g = []
              , h = [];
            if (b.test(a)) {
                h = a.match(b);
                h[1].length <= 4 ? g = f(h[1].split(""), function(a, b) {
                    return parseInt(a + a, 16)
                }) : h[1].length <= 8 && (g = f(h[1].match(e), function(a, b) {
                    return parseInt(a, 16)
                }));
                return g
            }
            if (c.test(a)) {
                h = a.match(d);
                g = f(h, function(a, b) {
                    return parseInt(a, 10)
                });
                return g
            }
            return !1
        };
        return function(a, b) {
            var c = g(a);
            if (!c)
                return !1;
            var d = {};
            d.getR = function() {
                return c[0]
            }
            ;
            d.getG = function() {
                return c[1]
            }
            ;
            d.getB = function() {
                return c[2]
            }
            ;
            d.getA = function() {
                return c[3]
            }
            ;
            return d
        }
    });
    STK.register("core.ani.tween", function(a) {
        var b = a.core.ani.tweenArche
          , c = a.core.arr.foreach
          , d = a.core.dom.getStyle
          , e = a.core.func.getType
          , f = a.core.obj.parseParam
          , g = a.core.json.merge
          , h = a.core.util.color
          , i = function(a) {
            var b = /(-?\d\.?\d*)([a-z%]*)/i.exec(a)
              , c = [0, "px"];
            if (b) {
                b[1] && (c[0] = b[1] - 0);
                b[2] && (c[1] = b[2])
            }
            return c
        }
          , j = function(a) {
            for (var b = 0, c = a.length; b < c; b += 1) {
                var d = a.charCodeAt(b);
                if (d > 64 && d < 90) {
                    var e = a.substr(0, b)
                      , f = a.substr(b, 1)
                      , g = a.slice(b + 1);
                    return e + "-" + f.toLowerCase() + g
                }
            }
            return a
        }
          , k = function(a, b, c) {
            var f = d(a, c);
            if (e(f) === "undefined" || f === "auto") {
                c === "height" && (f = a.offsetHeight);
                c === "width" && (f = a.offsetWidth)
            }
            var g = {
                start: f,
                end: b,
                unit: "",
                key: c,
                defaultColor: !1
            };
            if (e(b) === "number") {
                var j = [0, "px"];
                e(f) === "number" ? j[0] = f : j = i(f);
                g.start = j[0];
                g.unit = j[1]
            }
            if (e(b) === "string") {
                var k, l;
                k = h(b);
                if (k) {
                    l = h(f);
                    l || (l = h("#fff"));
                    g.start = l;
                    g.end = k;
                    g.defaultColor = !0
                }
            }
            a = null;
            return g
        }
          , l = {
            opacity: function(a, b, c, d) {
                var e = a * (c - b) + b;
                return {
                    filter: "alpha(opacity=" + e * 100 + ")",
                    opacity: Math.max(Math.min(1, e), 0),
                    zoom: "1"
                }
            },
            defaultColor: function(a, b, c, d, e) {
                var f = Math.max(0, Math.min(255, Math.ceil(a * (c.getR() - b.getR()) + b.getR())))
                  , g = Math.max(0, Math.min(255, Math.ceil(a * (c.getG() - b.getG()) + b.getG())))
                  , h = Math.max(0, Math.min(255, Math.ceil(a * (c.getB() - b.getB()) + b.getB())))
                  , i = {};
                i[j(e)] = "#" + (f < 16 ? "0" : "") + f.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (h < 16 ? "0" : "") + h.toString(16);
                return i
            },
            "default": function(a, b, c, d, e) {
                var f = a * (c - b) + b
                  , g = {};
                g[j(e)] = f + d;
                return g
            }
        };
        return function(d, e) {
            var h, i, j, m, n, o, p, q, r, s;
            e = e || {};
            i = f({
                animationType: "linear",
                duration: 500,
                algorithmParams: {},
                extra: 5,
                delay: 25
            }, e);
            i.distance = 1;
            var t, u;
            i.callback = function() {
                u = e.end || a.core.func.empty;
                t = e.tween || a.core.func.empty;
                return function() {
                    m(1);
                    p();
                    u(d)
                }
            }();
            j = g(l, e.propertys || {});
            o = null;
            n = {};
            r = [];
            m = function(a) {
                var b = []
                  , e = c(n, function(b, c) {
                    var d;
                    j[c] ? d = j[c] : b.defaultColor ? d = j.defaultColor : d = j["default"];
                    var e = d(a, b.start, b.end, b.unit, b.key);
                    for (var f in e)
                        o.push(f, e[f]);
                    try {
                        t(a)
                    } catch (g) {}
                });
                d.style.cssText = o.getCss()
            }
            ;
            p = function() {
                var a;
                while (a = r.shift())
                    try {
                        a.fn();
                        if (a.type === "play")
                            break;
                        if (a.type === "destroy")
                            break
                    } catch (b) {}
            }
            ;
            s = b(m, i);
            var v = function(a) {
                s.getStatus() !== "play" ? d = a : r.push({
                    fn: v,
                    type: "setNode"
                })
            }
              , w = function(b) {
                if (s.getStatus() !== "play") {
                    n = c(b, function(a, b) {
                        return k(d, a, b)
                    });
                    o = a.core.dom.cssText(d.style.cssText + (e.staticStyle || ""));
                    s.play()
                } else
                    r.push({
                        fn: function() {
                            w(b)
                        },
                        type: "play"
                    })
            }
              , x = function() {
                if (s.getStatus() !== "play") {
                    s.destroy();
                    d = null;
                    h = null;
                    i = null;
                    j = null;
                    m = null;
                    n = null;
                    o = null;
                    p = null;
                    q = null;
                    r = null
                } else
                    r.push({
                        fn: x,
                        type: "destroy"
                    })
            };
            h = {};
            h.play = function(a) {
                w(a);
                return h
            }
            ;
            h.stop = function() {
                s.stop();
                return h
            }
            ;
            h.pause = function() {
                s.pause();
                return h
            }
            ;
            h.resume = function() {
                s.resume();
                return h
            }
            ;
            h.finish = function(a) {
                w(a);
                x();
                return h
            }
            ;
            h.setNode = function(a) {
                v(a);
                return h
            }
            ;
            h.destroy = function() {
                x();
                return h
            }
            ;
            return h
        }
    });
    STK.register("core.dom.hasClassName", function(a) {
        return function(a, b) {
            return (new RegExp("(^|\\s)" + b + "($|\\s)")).test(a.className)
        }
    });
    STK.register("core.str.trim", function(a) {
        return function(a) {
            if (typeof a != "string")
                throw "trim need a string as parameter";
            var b = a.length
              , c = 0
              , d = /(\u3000|\s|\t|\u00A0)/;
            while (c < b) {
                if (!d.test(a.charAt(c)))
                    break;
                c += 1
            }
            while (b > c) {
                if (!d.test(a.charAt(b - 1)))
                    break;
                b -= 1
            }
            return a.slice(c, b)
        }
    });
    STK.register("core.dom.addClassName", function(a) {
        return function(b, c) {
            b.nodeType === 1 && (a.core.dom.hasClassName(b, c) || (b.className = a.core.str.trim(b.className) + " " + c))
        }
    });
    STK.register("core.dom.removeClassName", function(a) {
        return function(b, c) {
            b.nodeType === 1 && a.core.dom.hasClassName(b, c) && (b.className = b.className.replace(new RegExp("(^|\\s)" + c + "($|\\s)"), " "))
        }
    });
    STK.register("core.evt.addEvent", function(a) {
        return function(b, c, d) {
            b = a.E(b);
            if (b == null)
                return !1;
            if (typeof d != "function")
                return !1;
            b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d;
            return !0
        }
    });
    STK.register("core.evt.removeEvent", function(a) {
        return function(b, c, d) {
            b = a.E(b);
            if (b == null)
                return !1;
            if (typeof d != "function")
                return !1;
            b.removeEventListener ? b.removeEventListener(c, d, !1) : b.detachEvent && b.detachEvent("on" + c, d);
            b["on" + c] = null;
            return !0
        }
    });
    STK.register("core.ani.transition", function(a) {
        var b = function() {
            var a = document.createElement("style")
              , b = "STK_transition_" + +(new Date)
              , c = null
              , d = {};
            a.setAttribute("type", "text/css");
            a.setAttribute("id", b);
            document.head.appendChild(a);
            for (var e = 0, f = document.styleSheets.length; e < f; e += 1)
                if (document.styleSheets[e].ownerNode.id === b) {
                    c = document.styleSheets[e];
                    break
                }
            d.getCssSheet = function() {
                return c
            }
            ;
            d.addRule = function(a, b) {
                var d = c.rules || c.cssRules;
                c.addRule ? c.addRule(a, b, d.length) : c.insertRule && c.insertRule(a + " {" + b + "}", d.length)
            }
            ;
            d.destory = function() {
                document.head.removeChild(a);
                a = null;
                c = null;
                b = null
            }
            ;
            return d
        };
        return function(c, d) {
            var e = a.core.obj.parseParam({
                target: "",
                duration: 500,
                timingFn: [0, 0, 1, 1],
                callback: function() {}
            }, d)
              , f = "all " + e.duration + "ms cubic-bezier(" + e.timingFn.join(",") + ")"
              , g = a.core.dom.cssText(c.style.cssText)
              , h = "test"
              , i = b();
            g.merge(e.target);
            g.push("transition", f);
            i.addRule("." + h, g.getCss());
            a.core.evt.addEvent(c, "transitionend", function() {
                a.core.evt.removeEvent(c, "transitionend", arguments.callee);
                c.style.cssText = g.remove("transition").getCss();
                a.core.dom.removeClassName(c, h);
                i.destory();
                f = null;
                g = null;
                h = null;
                i = null;
                e.callback(c);
                e = null
            });
            a.core.dom.addClassName(c, h);
            c.style.cssText = ""
        }
    });
    STK.register("core.arr.findout", function(a) {
        return function(b, c) {
            if (!a.core.arr.isArray(b))
                throw "the findout function needs an array as first parameter";
            var d = [];
            for (var e = 0, f = b.length; e < f; e += 1)
                b[e] === c && d.push(e);
            return d
        }
    });
    STK.register("core.arr.clear", function(a) {
        return function(b) {
            if (!a.core.arr.isArray(b))
                throw "the clear function needs an array as first parameter";
            var c = [];
            for (var d = 0, e = b.length; d < e; d += 1)
                a.core.arr.findout([undefined, null, ""], b[d]).length || c.push(b[d]);
            return c
        }
    });
    STK.register("core.arr.copy", function(a) {
        return function(b) {
            if (!a.core.arr.isArray(b))
                throw "the copy function needs an array as first parameter";
            return b.slice(0)
        }
    });
    STK.register("core.arr.hasby", function(a) {
        return function(b, c) {
            if (!a.core.arr.isArray(b))
                throw "the hasBy function needs an array as first parameter";
            var d = [];
            for (var e = 0, f = b.length; e < f; e += 1)
                c(b[e], e) && d.push(e);
            return d
        }
    });
    STK.register("core.arr.unique", function(a) {
        return function(b) {
            if (!a.core.arr.isArray(b))
                throw "the unique function needs an array as first parameter";
            var c = [];
            for (var d = 0, e = b.length; d < e; d += 1)
                a.core.arr.indexOf(b[d], c) === -1 && c.push(b[d]);
            return c
        }
    });
    STK.register("core.dom.addHTML", function(a) {
        return function(a, b) {
            if (a.insertAdjacentHTML)
                a.insertAdjacentHTML("BeforeEnd", b);
            else {
                var c = a.ownerDocument.createRange();
                c.setStartBefore(a);
                var d = c.createContextualFragment(b);
                a.appendChild(d)
            }
        }
    });
    STK.register("core.dom.sizzle", function(a) {
        function c(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; g < h; g++) {
                var i = d[g];
                if (i) {
                    i = i[a];
                    var j = !1;
                    while (i) {
                        if (i.sizcache === c) {
                            j = d[i.sizset];
                            break
                        }
                        if (i.nodeType === 1 && !f) {
                            i.sizcache = c;
                            i.sizset = g
                        }
                        if (i.nodeName.toLowerCase() === b) {
                            j = i;
                            break
                        }
                        i = i[a]
                    }
                    d[g] = j
                }
            }
        }
        function b(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; g < h; g++) {
                var j = d[g];
                if (j) {
                    j = j[a];
                    var k = !1;
                    while (j) {
                        if (j.sizcache === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            if (!f) {
                                j.sizcache = c;
                                j.sizset = g
                            }
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (i.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    d[g] = k
                }
            }
        }
        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
          , e = 0
          , f = Object.prototype.toString
          , g = !1
          , h = !0;
        [0, 0].sort(function() {
            h = !1;
            return 0
        });
        var i = function(a, b, c, e) {
            c = c || [];
            b = b || document;
            var g = b;
            if (b.nodeType !== 1 && b.nodeType !== 9)
                return [];
            if (!a || typeof a != "string")
                return c;
            var h = [], l, m, o, p, r = !0, s = i.isXML(b), t = a, u, v, w, x;
            do {
                d.exec("");
                l = d.exec(t);
                if (l) {
                    t = l[3];
                    h.push(l[1]);
                    if (l[2]) {
                        p = l[3];
                        break
                    }
                }
            } while (l);if (h.length > 1 && k.exec(a))
                if (h.length === 2 && j.relative[h[0]])
                    m = q(h[0] + h[1], b);
                else {
                    m = j.relative[h[0]] ? [b] : i(h.shift(), b);
                    while (h.length) {
                        a = h.shift();
                        j.relative[a] && (a += h.shift());
                        m = q(a, m)
                    }
                }
            else {
                if (!e && h.length > 1 && b.nodeType === 9 && !s && j.match.ID.test(h[0]) && !j.match.ID.test(h[h.length - 1])) {
                    u = i.find(h.shift(), b, s);
                    b = u.expr ? i.filter(u.expr, u.set)[0] : u.set[0]
                }
                if (b) {
                    u = e ? {
                        expr: h.pop(),
                        set: n(e)
                    } : i.find(h.pop(), h.length === 1 && (h[0] === "~" || h[0] === "+") && b.parentNode ? b.parentNode : b, s);
                    m = u.expr ? i.filter(u.expr, u.set) : u.set;
                    h.length > 0 ? o = n(m) : r = !1;
                    while (h.length) {
                        v = h.pop();
                        w = v;
                        j.relative[v] ? w = h.pop() : v = "";
                        w == null && (w = b);
                        j.relative[v](o, w, s)
                    }
                } else
                    o = h = []
            }
            o || (o = m);
            o || i.error(v || a);
            if (f.call(o) === "[object Array]")
                if (!r)
                    c.push.apply(c, o);
                else if (b && b.nodeType === 1)
                    for (x = 0; o[x] != null; x++)
                        o[x] && (o[x] === !0 || o[x].nodeType === 1 && i.contains(b, o[x])) && c.push(m[x]);
                else
                    for (x = 0; o[x] != null; x++)
                        o[x] && o[x].nodeType === 1 && c.push(m[x]);
            else
                n(o, c);
            if (p) {
                i(p, g, c, e);
                i.uniqueSort(c)
            }
            return c
        };
        i.uniqueSort = function(a) {
            if (p) {
                g = h;
                a.sort(p);
                if (g)
                    for (var b = 1; b < a.length; b++)
                        a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }
        ;
        i.matches = function(a, b) {
            return i(a, null, null, b)
        }
        ;
        i.find = function(a, b, c) {
            var d;
            if (!a)
                return [];
            for (var e = 0, f = j.order.length; e < f; e++) {
                var g = j.order[e], h;
                if (h = j.leftMatch[g].exec(a)) {
                    var i = h[1];
                    h.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        h[1] = (h[1] || "").replace(/\\/g, "");
                        d = j.find[g](h, b, c);
                        if (d != null) {
                            a = a.replace(j.match[g], "");
                            break
                        }
                    }
                }
            }
            d || (d = b.getElementsByTagName("*"));
            return {
                set: d,
                expr: a
            }
        }
        ;
        i.filter = function(a, b, c, d) {
            var e = a, f = [], g = b, h, k, l = b && b[0] && i.isXML(b[0]);
            while (a && b.length) {
                for (var m in j.filter)
                    if ((h = j.leftMatch[m].exec(a)) != null && h[2]) {
                        var n = j.filter[m], o, p, q = h[1];
                        k = !1;
                        h.splice(1, 1);
                        if (q.substr(q.length - 1) === "\\")
                            continue;
                        g === f && (f = []);
                        if (j.preFilter[m]) {
                            h = j.preFilter[m](h, g, c, f, d, l);
                            if (!h)
                                k = o = !0;
                            else if (h === !0)
                                continue
                        }
                        if (h)
                            for (var r = 0; (p = g[r]) != null; r++)
                                if (p) {
                                    o = n(p, h, r, g);
                                    var s = d ^ !!o;
                                    if (c && o != null)
                                        s ? k = !0 : g[r] = !1;
                                    else if (s) {
                                        f.push(p);
                                        k = !0
                                    }
                                }
                        if (o !== undefined) {
                            c || (g = f);
                            a = a.replace(j.match[m], "");
                            if (!k)
                                return [];
                            break
                        }
                    }
                if (a === e)
                    if (k == null)
                        i.error(a);
                    else
                        break;
                e = a
            }
            return g
        }
        ;
        i.error = function(a) {
            throw "Syntax error, unrecognized expression: " + a
        }
        ;
        var j = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href")
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = typeof b == "string"
                      , d = c && !/\W/.test(b)
                      , e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++)
                        if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1)
                                ;
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                    e && i.filter(b, a, !0)
                },
                ">": function(a, b) {
                    var c = typeof b == "string", d, e = 0, f = a.length;
                    if (c && !/\W/.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            d = a[e];
                            if (d) {
                                var g = d.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) {
                            d = a[e];
                            d && (a[e] = c ? d.parentNode : d.parentNode === b)
                        }
                        c && i.filter(b, a, !0)
                    }
                },
                "": function(a, d, f) {
                    var g = e++, h = b, i;
                    if (typeof d == "string" && !/\W/.test(d)) {
                        d = d.toLowerCase();
                        i = d;
                        h = c
                    }
                    h("parentNode", d, g, a, i, f)
                },
                "~": function(a, d, f) {
                    var g = e++, h = b, i;
                    if (typeof d == "string" && !/\W/.test(d)) {
                        d = d.toLowerCase();
                        i = d;
                        h = c
                    }
                    h("previousSibling", d, g, a, i, f)
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d ? [d] : []
                    }
                },
                NAME: function(a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = []
                          , d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++)
                            d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                },
                TAG: function(a, b) {
                    return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    a = " " + a[1].replace(/\\/g, "") + " ";
                    if (f)
                        return a;
                    for (var g = 0, h; (h = b[g]) != null; g++)
                        h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                },
                ID: function(a) {
                    return a[1].replace(/\\/g, "")
                },
                TAG: function(a, b) {
                    return a[1].toLowerCase()
                },
                CHILD: function(a) {
                    if (a[1] === "nth") {
                        var b = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0;
                        a[3] = b[3] - 0
                    }
                    a[0] = e++;
                    return a
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1].replace(/\\/g, "");
                    !f && j.attrMap[g] && (a[1] = j.attrMap[g]);
                    a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                },
                PSEUDO: function(a, b, c, e, f) {
                    if (a[1] === "not")
                        if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3]))
                            a[3] = i(a[3], null, null, b);
                        else {
                            var g = i.filter(a[3], b, c, !0 ^ f);
                            c || e.push.apply(e, g);
                            return !1
                        }
                    else if (j.match.POS.test(a[0]) || j.match.CHILD.test(a[0]))
                        return !0;
                    return a
                },
                POS: function(a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function(a) {
                    return a.disabled === !1 && a.type !== "hidden"
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    return a.checked === !0
                },
                selected: function(a) {
                    a.parentNode.selectedIndex;
                    return a.selected === !0
                },
                parent: function(a) {
                    return !!a.firstChild
                },
                empty: function(a) {
                    return !a.firstChild
                },
                has: function(a, b, c) {
                    return !!i(c[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                text: function(a) {
                    return "text" === a.type
                },
                radio: function(a) {
                    return "radio" === a.type
                },
                checkbox: function(a) {
                    return "checkbox" === a.type
                },
                file: function(a) {
                    return "file" === a.type
                },
                password: function(a) {
                    return "password" === a.type
                },
                submit: function(a) {
                    return "submit" === a.type
                },
                image: function(a) {
                    return "image" === a.type
                },
                reset: function(a) {
                    return "reset" === a.type
                },
                button: function(a) {
                    return "button" === a.type || a.nodeName.toLowerCase() === "button"
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }
            },
            setFilters: {
                first: function(a, b) {
                    return b === 0
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1
                },
                even: function(a, b) {
                    return b % 2 === 0
                },
                odd: function(a, b) {
                    return b % 2 === 1
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1]
                      , f = j.filters[e];
                    if (f)
                        return f(a, c, b, d);
                    if (e === "contains")
                        return (a.textContent || a.innerText || i.getText([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, k = g.length; h < k; h++)
                            if (g[h] === a)
                                return !1;
                        return !0
                    }
                    i.error("Syntax error, unrecognized expression: " + e)
                },
                CHILD: function(a, b) {
                    var c = b[1]
                      , d = a;
                    switch (c) {
                    case "only":
                    case "first":
                        while (d = d.previousSibling)
                            if (d.nodeType === 1)
                                return !1;
                        if (c === "first")
                            return !0;
                        d = a;
                    case "last":
                        while (d = d.nextSibling)
                            if (d.nodeType === 1)
                                return !1;
                        return !0;
                    case "nth":
                        var e = b[2]
                          , f = b[3];
                        if (e === 1 && f === 0)
                            return !0;
                        var g = b[0]
                          , h = a.parentNode;
                        if (h && (h.sizcache !== g || !a.nodeIndex)) {
                            var i = 0;
                            for (d = h.firstChild; d; d = d.nextSibling)
                                d.nodeType === 1 && (d.nodeIndex = ++i);
                            h.sizcache = g
                        }
                        var j = a.nodeIndex - f;
                        return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                    }
                },
                ID: function(a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                },
                TAG: function(a, b) {
                    return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                },
                ATTR: function(a, b) {
                    var c = b[1]
                      , d = j.attrHandle[c] ? j.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c)
                      , e = d + ""
                      , f = b[2]
                      , g = b[4];
                    return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                },
                POS: function(a, b, c, d) {
                    var e = b[2]
                      , f = j.setFilters[e];
                    if (f)
                        return f(a, c, b, d)
                }
            }
        };
        i.selectors = j;
        var k = j.match.POS
          , l = function(a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var m in j.match) {
            j.match[m] = new RegExp(j.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            j.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + j.match[m].source.replace(/\\(\d+)/g, l))
        }
        var n = function(a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
        } catch (o) {
            n = function(a, b) {
                var c = b || []
                  , d = 0;
                if (f.call(a) === "[object Array]")
                    Array.prototype.push.apply(c, a);
                else if (typeof a.length == "number")
                    for (var e = a.length; d < e; d++)
                        c.push(a[d]);
                else
                    for (; a[d]; d++)
                        c.push(a[d]);
                return c
            }
        }
        var p;
        document.documentElement.compareDocumentPosition ? p = function(a, b) {
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                a == b && (g = !0);
                return a.compareDocumentPosition ? -1 : 1
            }
            var c = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
            c === 0 && (g = !0);
            return c
        }
        : "sourceIndex"in document.documentElement ? p = function(a, b) {
            if (!a.sourceIndex || !b.sourceIndex) {
                a == b && (g = !0);
                return a.sourceIndex ? -1 : 1
            }
            var c = a.sourceIndex - b.sourceIndex;
            c === 0 && (g = !0);
            return c
        }
        : document.createRange && (p = function(a, b) {
            if (!a.ownerDocument || !b.ownerDocument) {
                a == b && (g = !0);
                return a.ownerDocument ? -1 : 1
            }
            var c = a.ownerDocument.createRange()
              , d = b.ownerDocument.createRange();
            c.setStart(a, 0);
            c.setEnd(a, 0);
            d.setStart(b, 0);
            d.setEnd(b, 0);
            var e = c.compareBoundaryPoints(Range.START_TO_END, d);
            e === 0 && (g = !0);
            return e
        }
        );
        i.getText = function(a) {
            var b = "", c;
            for (var d = 0; a[d]; d++) {
                c = a[d];
                c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += i.getText(c.childNodes))
            }
            return b
        }
        ;
        (function() {
            var a = document.createElement("div")
              , b = "script" + (new Date).getTime();
            a.innerHTML = "<a name='" + b + "'/>";
            var c = document.documentElement;
            c.insertBefore(a, c.firstChild);
            if (document.getElementById(b)) {
                j.find.ID = function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d ? d.id === a[1] || typeof d.getAttributeNode != "undefined" && d.getAttributeNode("id").nodeValue === a[1] ? [d] : undefined : []
                    }
                }
                ;
                j.filter.ID = function(a, b) {
                    var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                    return a.nodeType === 1 && c && c.nodeValue === b
                }
            }
            c.removeChild(a);
            c = a = null
        }
        )();
        (function() {
            var a = document.createElement("div");
            a.appendChild(document.createComment(""));
            a.getElementsByTagName("*").length > 0 && (j.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)
                        c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }
            );
            a.innerHTML = "<a href='#'></a>";
            a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (j.attrHandle.href = function(a) {
                return a.getAttribute("href", 2)
            }
            );
            a = null
        }
        )();
        document.querySelectorAll && function() {
            var a = i
              , b = document.createElement("div");
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                i = function(b, c, d, e) {
                    c = c || document;
                    if (!e && c.nodeType === 9 && !i.isXML(c))
                        try {
                            return n(c.querySelectorAll(b), d)
                        } catch (f) {}
                    return a(b, c, d, e)
                }
                ;
                for (var c in a)
                    i[c] = a[c];
                b = null
            }
        }();
        (function() {
            var a = document.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)
                    return;
                j.order.splice(1, 0, "CLASS");
                j.find.CLASS = function(a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)
                        return b.getElementsByClassName(a[1])
                }
                ;
                a = null
            }
        }
        )();
        i.contains = document.compareDocumentPosition ? function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        }
        : function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        }
        ;
        i.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        }
        ;
        var q = function(a, b) {
            var c = [], d = "", e, f = b.nodeType ? [b] : b;
            while (e = j.match.PSEUDO.exec(a)) {
                d += e[0];
                a = a.replace(j.match.PSEUDO, "")
            }
            a = j.relative[a] ? a + "*" : a;
            for (var g = 0, h = f.length; g < h; g++)
                i(a, f[g], c);
            return i.filter(d, c)
        };
        return i
    });
    STK.register("core.dom.builder", function(a) {
        return function(b, c) {
            var d = typeof b == "string"
              , e = b;
            if (d) {
                e = a.C("div");
                e.innerHTML = b
            }
            var f, g;
            g = a.core.dom.sizzle("[node-type]", e);
            f = {};
            for (var h = 0, i = g.length; h < i; h += 1) {
                var j = g[h].getAttribute("node-type");
                f[j] || (f[j] = []);
                f[j].push(g[h])
            }
            var k = b;
            if (d) {
                k = a.C("buffer");
                while (e.childNodes[0])
                    k.appendChild(e.childNodes[0])
            }
            return {
                box: k,
                list: f
            }
        }
    });
    STK.register("core.dom.setStyle", function(a) {
        function b() {
            return "y"in b ? b.y : b.y = "filters"in a.C("div")
        }
        return function(a, c, d) {
            if (b())
                switch (c) {
                case "opacity":
                    a.style.filter = "alpha(opacity=" + d * 100 + ")";
                    if (!a.currentStyle || !a.currentStyle.hasLayout)
                        a.style.zoom = 1;
                    break;
                case "float":
                    c = "styleFloat";
                default:
                    a.style[c] = d
                }
            else {
                c == "float" && (c = "cssFloat");
                a.style[c] = d
            }
        }
    });
    STK.register("core.dom.insertAfter", function(a) {
        return function(a, b) {
            var c = b.parentNode;
            c.lastChild == b ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
        }
    });
    STK.register("core.dom.insertBefore", function(a) {
        return function(a, b) {
            var c = b.parentNode;
            c.insertBefore(a, b)
        }
    });
    STK.register("core.dom.trimNode", function(a) {
        return function(a) {
            var b = a.childNodes;
            for (var c = b.length - 1; c >= 0; c -= 1)
                b[c] && (b[c].nodeType == 3 || b[c].nodeType == 8) && a.removeChild(b[c])
        }
    });
    STK.register("core.dom.removeNode", function(a) {
        return function(b) {
            b = a.E(b) || b;
            try {
                b.parentNode.removeChild(b)
            } catch (c) {}
        }
    });
    STK.register("core.evt.fireEvent", function(a) {
        return function(b, c) {
            var d = a.E(b);
            if (d.addEventListener) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent(c, !0, !0);
                d.dispatchEvent(e)
            } else
                d.fireEvent("on" + c)
        }
    });
    STK.register("core.util.scrollPos", function(a) {
        return function(a) {
            a = a || document;
            var b = a.documentElement
              , c = a.body;
            return {
                top: Math.max(window.pageYOffset || 0, b.scrollTop, c.scrollTop),
                left: Math.max(window.pageXOffset || 0, b.scrollLeft, c.scrollLeft)
            }
        }
    });
    STK.register("core.dom.position", function(a) {
        var b = function(b) {
            var c, d, e, f, g, h;
            c = b.getBoundingClientRect();
            d = a.core.util.scrollPos();
            e = b.ownerDocument.body;
            f = b.ownerDocument.documentElement;
            g = f.clientTop || e.clientTop || 0;
            h = f.clientLeft || e.clientLeft || 0;
            return {
                l: parseInt(c.left + d.left - h, 10) || 0,
                t: parseInt(c.top + d.top - g, 10) || 0
            }
        }
          , c = function(b, c) {
            var d, e;
            d = [b.offsetLeft, b.offsetTop];
            e = b.offsetParent;
            if (e !== b && e !== c)
                while (e) {
                    d[0] += e.offsetLeft;
                    d[1] += e.offsetTop;
                    e = e.offsetParent
                }
            if (a.core.util.browser.OPERA != -1 || a.core.util.browser.SAFARI != -1 && b.style.position == "absolute") {
                d[0] -= document.body.offsetLeft;
                d[1] -= document.body.offsetTop
            }
            b.parentNode ? e = b.parentNode : e = null;
            while (e && !/^body|html$/i.test(e.tagName) && e !== c) {
                if (e.style.display.search(/^inline|table-row.*$/i)) {
                    d[0] -= e.scrollLeft;
                    d[1] -= e.scrollTop
                }
                e = e.parentNode
            }
            return {
                l: parseInt(d[0], 10),
                t: parseInt(d[1], 10)
            }
        };
        return function(d, e) {
            if (d == document.body)
                return !1;
            if (d.parentNode == null)
                return !1;
            if (d.style.display == "none")
                return !1;
            var f = a.core.obj.parseParam({
                parent: null
            }, e);
            if (d.getBoundingClientRect) {
                if (f.parent) {
                    var g = b(d)
                      , h = b(f.parent);
                    return {
                        l: g.l - h.l,
                        t: g.t - h.t
                    }
                }
                return b(d)
            }
            return c(d, f.parent || document.body)
        }
    });
    STK.register("core.dom.setXY", function(a) {
        return function(b, c) {
            var d = a.core.dom.getStyle(b, "position");
            if (d == "static") {
                a.core.dom.setStyle(b, "position", "relative");
                d = "relative"
            }
            var e = a.core.dom.position(b);
            if (e != !1) {
                var f = {
                    l: parseInt(a.core.dom.getStyle(b, "left"), 10),
                    t: parseInt(a.core.dom.getStyle(b, "top"), 10)
                };
                isNaN(f.l) && (f.l = d == "relative" ? 0 : b.offsetLeft);
                isNaN(f.t) && (f.t = d == "relative" ? 0 : b.offsetTop);
                c.l != null && (b.style.left = c.l - e.l + f.l + "px");
                c.t != null && (b.style.top = c.t - e.t + f.t + "px")
            }
        }
    });
    STK.register("core.str.encodeHTML", function(a) {
        return function(a) {
            if (typeof a != "string")
                throw "encodeHTML need a string as parameter";
            return a.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32;")
        }
    });
    STK.register("core.str.decodeHTML", function(a) {
        return function(a) {
            if (typeof a != "string")
                throw "decodeHTML need a string as parameter";
            return a.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&nbsp;/g, "聽").replace(/&#32;/g, " ").replace(/&amp;/g, "&")
        }
    });
    STK.register("core.dom.cascadeNode", function(a) {
        return function(b) {
            var c = {}
              , d = b.style.display || "";
            d = d === "none" ? "" : d;
            var e = [];
            c.setStyle = function(e, f) {
                a.core.dom.setStyle(b, e, f);
                e === "display" && (d = f === "none" ? "" : f);
                return c
            }
            ;
            c.insertAfter = function(d) {
                a.core.dom.insertAfter(d, b);
                return c
            }
            ;
            c.insertBefore = function(d) {
                a.core.dom.insertBefore(d, b);
                return c
            }
            ;
            c.addClassName = function(d) {
                a.core.dom.addClassName(b, d);
                return c
            }
            ;
            c.removeClassName = function(d) {
                a.core.dom.removeClassName(b, d);
                return c
            }
            ;
            c.trimNode = function() {
                a.core.dom.trimNode(b);
                return c
            }
            ;
            c.removeNode = function() {
                a.core.dom.removeNode(b);
                return c
            }
            ;
            c.on = function(d, f) {
                for (var g = 0, h = e.length; g < h; g += 1)
                    if (e[g].fn === f && e[g].type === d)
                        return c;
                e.push({
                    fn: f,
                    type: d
                });
                a.core.evt.addEvent(b, d, f);
                return c
            }
            ;
            c.unon = function(d, f) {
                for (var g = 0, h = e.length; g < h; g += 1)
                    if (e[g].fn === f && e[g].type === d) {
                        a.core.evt.removeEvent(b, f, d);
                        e.splice(g, 1);
                        break
                    }
                return c
            }
            ;
            c.fire = function(d) {
                a.core.evt.fireEvent(d, b);
                return c
            }
            ;
            c.appendChild = function(a) {
                b.appendChild(a);
                return c
            }
            ;
            c.removeChild = function(a) {
                b.removeChild(a);
                return c
            }
            ;
            c.toggle = function() {
                b.style.display === "none" ? b.style.display = d : b.style.display = "none";
                return c
            }
            ;
            c.show = function() {
                b.style.display === "none" && (d === "none" ? b.style.display = "" : b.style.display = d);
                return c
            }
            ;
            c.hidd = function() {
                b.style.display !== "none" && (b.style.display = "none");
                return c
            }
            ;
            c.hide = c.hidd;
            c.scrollTo = function(a, d) {
                a === "left" && (b.scrollLeft = d);
                a === "top" && (b.scrollTop = d);
                return c
            }
            ;
            c.replaceChild = function(a, d) {
                b.replaceChild(a, d);
                return c
            }
            ;
            c.position = function(c) {
                c !== undefined && a.core.dom.setXY(b, c);
                return a.core.dom.position(b)
            }
            ;
            c.setPosition = function(d) {
                d !== undefined && a.core.dom.setXY(b, d);
                return c
            }
            ;
            c.getPosition = function(c) {
                return a.core.dom.position(b)
            }
            ;
            c.html = function(a) {
                a !== undefined && (b.innerHTML = a);
                return b.innerHTML
            }
            ;
            c.setHTML = function(a) {
                a !== undefined && (b.innerHTML = a);
                return c
            }
            ;
            c.getHTML = function() {
                return b.innerHTML
            }
            ;
            c.text = function(c) {
                c !== undefined && (b.innerHTML = a.core.str.encodeHTML(c));
                return a.core.str.decodeHTML(b.innerHTML)
            }
            ;
            c.ttext = c.text;
            c.setText = function(d) {
                d !== undefined && (b.innerHTML = a.core.str.encodeHTML(d));
                return c
            }
            ;
            c.getText = function() {
                return a.core.str.decodeHTML(b.innerHTML)
            }
            ;
            c.get = function(c) {
                return c === "node" ? b : a.core.dom.getStyle(b, c)
            }
            ;
            c.getStyle = function(c) {
                return a.core.dom.getStyle(b, c)
            }
            ;
            c.getOriginNode = function() {
                return b
            }
            ;
            c.destroy = function() {
                for (var c = 0, f = e; c < f; c += 1)
                    a.core.evt.removeEvent(b, e[c].fn, e[c].type);
                d = null;
                e = null;
                b = null
            }
            ;
            return c
        }
    });
    STK.register("core.dom.contains", function(a) {
        return function(a, b) {
            if (a === b)
                return !1;
            if (a.compareDocumentPosition)
                return (a.compareDocumentPosition(b) & 16) === 16;
            if (a.contains && b.nodeType === 1)
                return a.contains(b);
            while (b = b.parentNode)
                if (a === b)
                    return !0;
            return !1
        }
    });
    STK.register("core.dom.dir", function(a) {
        var b = {
            parent: "parentNode",
            next: "nextSibling",
            prev: "previousSibling"
        }
          , c = function(c, d) {
            d = a.core.obj.parseParam({
                dir: "parent",
                expr: undefined,
                endpoint: document,
                matchAll: !1
            }, d);
            var e = b[d.dir]
              , f = d.expr
              , g = d.endpoint
              , h = !!d.matchAll;
            if (!c)
                throw "core.dom.dir: el is undefined.";
            if (!e)
                throw "core.dom.dir: spec.dir is undefined.";
            var i = []
              , j = c[e];
            while (j) {
                if (j.nodeType == 1)
                    if (!f || a.core.dom.sizzle.matches(f, [j]).length > 0) {
                        i.push(j);
                        if (!h)
                            break
                    }
                if (j == g)
                    break;
                j = j[e]
            }
            return i
        };
        c.parent = function(a, b) {
            b = b || {};
            b.dir = "parent";
            return c(a, b)
        }
        ;
        c.prev = function(a, b) {
            b = b || {};
            b.dir = "prev";
            return c(a, b)
        }
        ;
        c.next = function(a, b) {
            b = b || {};
            b.dir = "next";
            return c(a, b)
        }
        ;
        return c
    });
    STK.register("core.dom.firstChild", function(a) {
        var b = a.core.dom.dir;
        return function(a) {
            if (a.firstElementChild)
                return a.firstElementChild;
            var c = a.firstChild;
            c && c.nodeType != 1 && (c = b.next(c)[0]);
            return c
        }
    });
    STK.register("core.util.hideContainer", function(a) {
        var b, c = function() {
            if (!b) {
                b = a.C("div");
                b.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
                document.getElementsByTagName("head")[0].appendChild(b)
            }
        }, d = {
            appendChild: function(d) {
                if (a.core.dom.isNode(d)) {
                    c();
                    b.appendChild(d)
                }
            },
            removeChild: function(c) {
                a.core.dom.isNode(c) && b && b.removeChild(c)
            }
        };
        return d
    });
    STK.register("core.dom.getSize", function(a) {
        var b = function(b) {
            if (!a.core.dom.isNode(b))
                throw "core.dom.getSize need Element as first parameter";
            return {
                width: b.offsetWidth,
                height: b.offsetHeight
            }
        }
          , c = function(a) {
            var c = null;
            if (a.style.display === "none") {
                a.style.visibility = "hidden";
                a.style.display = "";
                c = b(a);
                a.style.display = "none";
                a.style.visibility = "visible"
            } else
                c = b(a);
            return c
        };
        return function(b) {
            var d = {};
            if (!b.parentNode) {
                a.core.util.hideContainer.appendChild(b);
                d = c(b);
                a.core.util.hideContainer.removeChild(b)
            } else
                d = c(b);
            return d
        }
    });
    STK.register("core.dom.insertHTML", function(a) {
        return function(b, c, d) {
            b = a.E(b) || document.body;
            d = d ? d.toLowerCase() : "beforeend";
            if (b.insertAdjacentHTML) {
                switch (d) {
                case "beforebegin":
                    b.insertAdjacentHTML("BeforeBegin", c);
                    return b.previousSibling;
                case "afterbegin":
                    b.insertAdjacentHTML("AfterBegin", c);
                    return b.firstChild;
                case "beforeend":
                    b.insertAdjacentHTML("BeforeEnd", c);
                    return b.lastChild;
                case "afterend":
                    b.insertAdjacentHTML("AfterEnd", c);
                    return b.nextSibling
                }
                throw 'Illegal insertion point -> "' + d + '"'
            }
            var e = b.ownerDocument.createRange(), f;
            switch (d) {
            case "beforebegin":
                e.setStartBefore(b);
                f = e.createContextualFragment(c);
                b.parentNode.insertBefore(f, b);
                return b.previousSibling;
            case "afterbegin":
                if (b.firstChild) {
                    e.setStartBefore(b.firstChild);
                    f = e.createContextualFragment(c);
                    b.insertBefore(f, b.firstChild);
                    return b.firstChild
                }
                b.innerHTML = c;
                return b.firstChild;
            case "beforeend":
                if (b.lastChild) {
                    e.setStartAfter(b.lastChild);
                    f = e.createContextualFragment(c);
                    b.appendChild(f);
                    return b.lastChild
                }
                b.innerHTML = c;
                return b.lastChild;
            case "afterend":
                e.setStartAfter(b);
                f = e.createContextualFragment(c);
                b.parentNode.insertBefore(f, b.nextSibling);
                return b.nextSibling
            }
            throw 'Illegal insertion point -> "' + d + '"'
        }
    });
    STK.register("core.dom.insertElement", function(a) {
        return function(b, c, d) {
            b = a.E(b) || document.body;
            d = d ? d.toLowerCase() : "beforeend";
            switch (d) {
            case "beforebegin":
                b.parentNode.insertBefore(c, b);
                break;
            case "afterbegin":
                b.insertBefore(c, b.firstChild);
                break;
            case "beforeend":
                b.appendChild(c);
                break;
            case "afterend":
                b.nextSibling ? b.parentNode.insertBefore(c, b.nextSibling) : b.parentNode.appendChild(c)
            }
        }
    });
    STK.register("core.dom.ready", function(a) {
        var b = []
          , c = !1
          , d = a.core.func.getType
          , e = a.core.util.browser
          , f = a.core.evt.addEvent
          , g = function() {
            return !c && document.readyState === "complete" ? !0 : c
        }
          , h = function() {
            if (c != !0) {
                c = !0;
                for (var a = 0, e = b.length; a < e; a++)
                    if (d(b[a]) === "function")
                        try {
                            b[a].call()
                        } catch (f) {}
                b = []
            }
        }
          , i = function() {
            if (g())
                h();
            else {
                try {
                    document.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(arguments.callee, 25);
                    return
                }
                h()
            }
        }
          , j = function() {
            g() ? h() : setTimeout(arguments.callee, 25)
        }
          , k = function() {
            f(document, "DOMContentLoaded", h)
        }
          , l = function() {
            f(window, "load", h)
        };
        if (!g()) {
            a.IE && window === window.top && i();
            k();
            j();
            l()
        }
        return function(a) {
            g() ? d(a) === "function" && a.call() : b.push(a)
        }
    });
    STK.register("core.dom.isDomReady", function(a) {
        var b = !1;
        a.core.dom.ready(function() {
            b = !0
        });
        return function() {
            return b
        }
    });
    STK.register("core.dom.lastChild", function(a) {
        var b = a.core.dom.dir;
        return function(a) {
            if (a.lastElementChild)
                return a.lastElementChild;
            var c = a.lastChild;
            c && c.nodeType != 1 && (c = b.prev(c)[0]);
            return c
        }
    });
    STK.register("core.dom.neighbor", function(a) {
        var b = function(b, c, d) {
            return a.core.dom.dir(b, {
                dir: c,
                expr: d
            })[0]
        }
          , c = function(c) {
            var d = c
              , e = {
                getCurrent: function() {
                    return d
                },
                setCurrent: function(a) {
                    a && (d = a);
                    return e
                },
                finish: function() {
                    var a = d;
                    d = null;
                    return a
                },
                parent: function(a) {
                    d = b(d, "parent", a) || d;
                    return e
                },
                child: function(b) {
                    d = (b ? a.core.dom.sizzle(b, d)[0] : a.core.dom.firstChild(d)) || d;
                    return e
                },
                firstChild: function(b) {
                    d = a.core.dom.firstChild(d) || d;
                    return e
                },
                lastChild: function(b) {
                    d = a.core.dom.lastChild(d) || d;
                    return e
                },
                prev: function(a) {
                    d = b(d, "prev", a) || d;
                    return e
                },
                next: function(a) {
                    d = b(d, "next", a) || d;
                    return e
                },
                destroy: function() {
                    d = null
                }
            };
            return e
        };
        return c
    });
    STK.register("core.dom.next", function(a) {
        return function(a) {
            var b = a.nextSibling;
            while (b && b.nodeType !== 1)
                b = b.nextSibling;
            return b
        }
    });
    STK.register("core.dom.prev", function(a) {
        return function(a) {
            var b = a.previousSibling;
            while (b && b.nodeType !== 1)
                b = b.previousSibling;
            return b
        }
    });
    STK.register("core.dom.replaceNode", function(a) {
        return function(a, b) {
            if (a == null || b == null)
                throw "replaceNode need node as paramster";
            b.parentNode.replaceChild(a, b)
        }
    });
    STK.register("core.dom.selector", function(a) {
        var b = function(b, c, d, e) {
            var f = [];
            if (typeof b == "string") {
                var g = a.core.dom.sizzle(b, c, d, e);
                for (var h = 0, i = g.length; h < i; h += 1)
                    f[h] = g[h]
            } else if (a.core.dom.isNode(b))
                c ? a.core.dom.contains(c, b) && (f = [b]) : f = [b];
            else if (a.core.arr.isArray(b))
                if (c)
                    for (var h = 0, i = b.length; h < i; h += 1)
                        a.core.dom.contains(c, b[h]) && f.push(b[h]);
                else
                    f = b;
            return f
        };
        return function(c, d, e, f) {
            var g = b.apply(window, arguments);
            g.on = function(b, c) {
                for (var d = 0, e = g.length; d < e; d += 1)
                    a.core.evt.addEvent(g[d], b, c);
                return g
            }
            ;
            g.css = function(b, c) {
                for (var d = 0, e = g.length; d < e; d += 1)
                    a.core.dom.setStyle(g[d], b, c);
                return g
            }
            ;
            g.show = function() {
                for (var a = 0, b = g.length; a < b; a += 1)
                    g[a].style.display = "";
                return g
            }
            ;
            g.hidd = function() {
                for (var a = 0, b = g.length; a < b; a += 1)
                    g[a].style.display = "none";
                return g
            }
            ;
            g.hide = g.hidd;
            return g
        }
    });
    STK.register("core.dom.selectText", function(a) {
        return function(a, b) {
            var c = b.start
              , d = b.len || 0;
            a.focus();
            if (a.setSelectionRange)
                a.setSelectionRange(c, c + d);
            else if (a.createTextRange) {
                var e = a.createTextRange();
                e.collapse(1);
                e.moveStart("character", c);
                e.moveEnd("character", d);
                e.select()
            }
        }
    });
    STK.register("core.dom.setStyles", function(a) {
        return function(b, c, d) {
            if (!a.core.arr.isArray(b))
                var b = [b];
            for (var e = 0, f = b.length; e < f; e++)
                a.core.dom.setStyle(b[e], c, d);
            return b
        }
    });
    STK.register("core.dom.textSelectArea", function(a) {
        return function(a) {
            var b = {
                start: 0,
                len: 0
            };
            if (typeof a.selectionStart == "number") {
                b.start = a.selectionStart;
                b.len = a.selectionEnd - a.selectionStart
            } else if (typeof document.selection != "undefined") {
                var c = document.selection.createRange();
                if (a.tagName === "INPUT")
                    var d = a.createTextRange();
                else if (a.tagName === "TEXTAREA") {
                    var d = c.duplicate();
                    d.moveToElementText(a)
                }
                d.setEndPoint("EndToStart", c);
                b.start = d.text.length;
                b.len = c.text.length;
                var e = 0;
                d.moveEnd("character", a.value.length - b.start);
                d.moveStart("character", b.start);
                for (var f = b.start; f < a.value.length; f += 1) {
                    if (!(d.compareEndPoints("StartToStart", c) < 0))
                        break;
                    d.moveStart("character", 1);
                    e += 2
                }
                b.start += e;
                c = null;
                d = null
            }
            return b
        }
    });
    STK.register("core.dom.toggleClassName", function(a) {
        return function(b, c) {
            a.core.dom.hasClassName(b, c) ? a.core.dom.removeClassName(b, c) : a.core.dom.addClassName(b, c)
        }
    });
    STK.register("core.util.getUniqueKey", function(a) {
        var b = (new Date).getTime().toString()
          , c = 1;
        return function() {
            return b + c++
        }
    });
    STK.register("core.dom.uniqueID", function(a) {
        return function(b) {
            return b && (b.uniqueID || (b.uniqueID = a.core.util.getUniqueKey()))
        }
    });
    STK.register("core.evt.custEvent", function(a) {
        var b = "__custEventKey__"
          , c = 1
          , d = {}
          , e = function(a, c) {
            var e = typeof a == "number" ? a : a[b];
            return e && d[e] && {
                obj: typeof c == "string" ? d[e][c] : d[e],
                key: e
            }
        }
          , f = {}
          , g = function(a, b, c, d, f) {
            if (a && typeof b == "string" && c) {
                var g = e(a, b);
                if (!g || !g.obj)
                    throw "custEvent (" + b + ") is undefined !";
                g.obj.push({
                    fn: c,
                    data: d,
                    once: f
                });
                return g.key
            }
        }
          , h = function(b, c, d, f) {
            var g = !0
              , h = function() {
                g = !1
            };
            if (b && typeof c == "string") {
                var i = e(b, c), j;
                if (i && (j = i.obj)) {
                    d = typeof d != "undefined" && [].concat(d) || [];
                    for (var k = j.length - 1; k > -1 && j[k]; k--) {
                        var l = j[k].fn
                          , m = j[k].once;
                        if (l && l.apply)
                            try {
                                l.apply(b, [{
                                    obj: b,
                                    type: c,
                                    data: j[k].data,
                                    preventDefault: h
                                }].concat(d));
                                m && j.splice(k, 1)
                            } catch (n) {
                                a.log("[error][custEvent]" + n.message, n, n.stack)
                            }
                    }
                    g && a.core.func.getType(f) === "function" && f();
                    return i.key
                }
            }
        }
          , i = {
            define: function(a, e) {
                if (a && e) {
                    var f = typeof a == "number" ? a : a[b] || (a[b] = c++)
                      , g = d[f] || (d[f] = {});
                    e = [].concat(e);
                    for (var h = 0; h < e.length; h++)
                        g[e[h]] || (g[e[h]] = []);
                    return f
                }
            },
            undefine: function(a, c) {
                if (a) {
                    var e = typeof a == "number" ? a : a[b];
                    if (e && d[e])
                        if (c) {
                            c = [].concat(c);
                            for (var f = 0; f < c.length; f++)
                                c[f]in d[e] && delete d[e][c[f]]
                        } else
                            delete d[e]
                }
            },
            add: function(a, b, c, d) {
                return g(a, b, c, d, !1)
            },
            once: function(a, b, c, d) {
                return g(a, b, c, d, !0)
            },
            remove: function(b, c, d) {
                if (b) {
                    var f = e(b, c), g, h;
                    if (f && (g = f.obj)) {
                        if (a.core.arr.isArray(g))
                            if (d) {
                                var i = 0;
                                while (g[i]) {
                                    if (g[i].fn === d)
                                        break;
                                    i++
                                }
                                g.splice(i, 1)
                            } else
                                g.splice(0, g.length);
                        else
                            for (var i in g)
                                g[i] = [];
                        return f.key
                    }
                }
            },
            fire: function(a, b, c, d) {
                return h(a, b, c, d)
            },
            hook: function(a, e, g) {
                if (!(!a || !e || !g)) {
                    var j = [], k = a[b], l = k && d[k], m, n = e[b] || (e[b] = c++), o;
                    if (l) {
                        o = f[k + "_" + n] || (f[k + "_" + n] = {});
                        var p = function(a) {
                            var b = !0;
                            h(e, o[a.type].type, Array.prototype.slice.apply(arguments, [1, arguments.length]), function() {
                                b = !1
                            });
                            b && a.preventDefault()
                        };
                        for (var q in g) {
                            var r = g[q];
                            if (!o[q])
                                if (m = l[q]) {
                                    m.push({
                                        fn: p,
                                        data: undefined
                                    });
                                    o[q] = {
                                        fn: p,
                                        type: r
                                    };
                                    j.push(r)
                                }
                        }
                        i.define(e, j)
                    }
                }
            },
            unhook: function(a, c, d) {
                if (!(!a || !c || !d)) {
                    var e = a[b]
                      , g = c[b]
                      , h = f[e + "_" + g];
                    if (h)
                        for (var j in d) {
                            var k = d[j];
                            h[j] && i.remove(a, j, h[j].fn)
                        }
                }
            },
            destroy: function() {
                d = {};
                c = 1;
                f = {}
            }
        };
        return i
    });
    STK.register("core.json.queryToJson", function(a) {
        return function(b, c) {
            var d = a.core.str.trim(b).split("&")
              , e = {}
              , f = function(a) {
                return c ? decodeURIComponent(a) : a
            };
            for (var g = 0, h = d.length; g < h; g++)
                if (d[g]) {
                    var i = d[g].split("=")
                      , j = i[0]
                      , k = i[1];
                    if (i.length < 2) {
                        k = j;
                        j = "$nullName"
                    }
                    if (!e[j])
                        e[j] = f(k);
                    else {
                        a.core.arr.isArray(e[j]) != !0 && (e[j] = [e[j]]);
                        e[j].push(f(k))
                    }
                }
            return e
        }
    });
    STK.register("core.evt.getEvent", function(a) {
        return function() {
            return document.addEventListener ? function() {
                var a = arguments.callee, b;
                do {
                    b = a.arguments[0];
                    if (b && (b.constructor == Event || b.constructor == MouseEvent || b.constructor == KeyboardEvent))
                        return b
                } while (a = a.caller);return b
            }
            : function(a, b, c) {
                return window.event
            }
        }()
    });
    STK.register("core.evt.fixEvent", function(a) {
        var b = "clientX clientY pageX pageY screenX screenY".split(" ");
        return function(b) {
            b = b || a.core.evt.getEvent();
            b.target || (b.target = b.srcElement || document);
            if (b.pageX == null && b.clientX != null) {
                var c = document.documentElement
                  , d = document.body;
                b.pageX = b.clientX + (c.scrollLeft || d && d.scrollLeft || 0) - (c.clientLeft || d && d.clientLeft || 0);
                b.pageY = b.clientY + (c.scrollTop || d && d.scrollTop || 0) - (c.clientTop || d && d.clientTop || 0)
            }
            !b.which && b.button && (b.button & 1 ? b.which = 1 : b.button & 4 ? b.which = 2 : b.button & 2 && (b.which = 3));
            b.relatedTarget === undefined && (b.relatedTarget = b.fromElement || b.toElement);
            if (b.layerX == null && b.offsetX != null) {
                b.layerX = b.offsetX;
                b.layerY = b.offsetY
            }
            return b
        }
    });
    STK.register("core.obj.isEmpty", function(a) {
        return function(a, b) {
            for (var c in a)
                if (b || a.hasOwnProperty(c))
                    return !1;
            return !0
        }
    });
    STK.register("core.evt.delegatedEvent", function(a) {
        var b = function(b, c) {
            for (var d = 0, e = b.length; d < e; d += 1)
                if (a.core.dom.contains(b[d], c))
                    return !0;
            return !1
        };
        return function(c, d) {
            if (!a.core.dom.isNode(c))
                throw "core.evt.delegatedEvent need an Element as first Parameter";
            d || (d = []);
            a.core.arr.isArray(d) && (d = [d]);
            var e = {}
              , f = function(b) {
                var c = a.core.evt.fixEvent(b)
                  , d = c.target
                  , e = b.type;
                g(d, e, c)
            }
              , g = function(f, g, h) {
                var i = null
                  , j = function() {
                    var b, d, e;
                    b = f.getAttribute("action-target");
                    if (b) {
                        d = a.core.dom.sizzle(b, c);
                        d.length && (e = h.target = d[0])
                    }
                    j = a.core.func.empty;
                    return e
                }
                  , k = function() {
                    var b = j() || f;
                    return e[g] && e[g][i] ? e[g][i]({
                        evt: h,
                        el: b,
                        box: c,
                        data: a.core.json.queryToJson(b.getAttribute("action-data") || "")
                    }) : !0
                };
                if (b(d, f))
                    return !1;
                if (!a.core.dom.contains(c, f))
                    return !1;
                while (f && f !== c) {
                    if (f.nodeType === 1) {
                        i = f.getAttribute("action-type");
                        if (i && k() === !1)
                            break
                    }
                    f = f.parentNode
                }
            }
              , h = {};
            h.add = function(b, d, g) {
                if (!e[d]) {
                    e[d] = {};
                    a.core.evt.addEvent(c, d, f)
                }
                var h = e[d];
                h[b] = g
            }
            ;
            h.remove = function(b, d) {
                if (e[d]) {
                    delete e[d][b];
                    if (a.core.obj.isEmpty(e[d])) {
                        delete e[d];
                        a.core.evt.removeEvent(c, d, f)
                    }
                }
            }
            ;
            h.pushExcept = function(a) {
                d.push(a)
            }
            ;
            h.removeExcept = function(a) {
                if (!a)
                    d = [];
                else
                    for (var b = 0, c = d.length; b < c; b += 1)
                        d[b] === a && d.splice(b, 1)
            }
            ;
            h.clearExcept = function(a) {
                d = []
            }
            ;
            h.fireAction = function(b, d, f, g) {
                var h = "";
                g && g.actionData && (h = g.actionData);
                e[d] && e[d][b] && e[d][b]({
                    evt: f,
                    el: null,
                    box: c,
                    data: a.core.json.queryToJson(h),
                    fireFrom: "fireAction"
                })
            }
            ;
            h.fireInject = function(b, d, f) {
                var g = b.getAttribute("action-type")
                  , h = b.getAttribute("action-data");
                g && e[d] && e[d][g] && e[d][g]({
                    evt: f,
                    el: b,
                    box: c,
                    data: a.core.json.queryToJson(h || ""),
                    fireFrom: "fireInject"
                })
            }
            ;
            h.fireDom = function(a, b, c) {
                g(a, b, c || {})
            }
            ;
            h.destroy = function() {
                for (var b in e) {
                    for (var d in e[b])
                        delete e[b][d];
                    delete e[b];
                    a.core.evt.removeEvent(c, b, f)
                }
            }
            ;
            return h
        }
    });
    STK.register("core.evt.getActiveElement", function(a) {
        return function() {
            try {
                var b = a.core.evt.getEvent();
                return document.activeElement ? document.activeElement : b.explicitOriginalTarget
            } catch (c) {
                return document.body
            }
        }
    });
    STK.register("core.evt.hasEvent", function(a) {
        var b = {};
        return function(c, d) {
            if (typeof d != "string")
                throw new Error("[STK.core.evt.hasEvent] tagName is not a String!");
            d = d.toLowerCase();
            c = "on" + c;
            if (b[d] && b[d][c] !== undefined)
                return b[d][c];
            var e = a.C(d)
              , f = c in e;
            if (!f) {
                e.setAttribute(c, "return;");
                f = typeof e[c] == "function"
            }
            b[d] || (b[d] = {});
            b[d][c] = f;
            e = null;
            return f
        }
    });
    STK.register("core.evt.hitTest", function(a) {
        function b(b) {
            var c = STK.E(b)
              , d = a.core.dom.position(c)
              , e = {
                left: d.l,
                top: d.t,
                right: d.l + c.offsetWidth,
                bottom: d.t + c.offsetHeight
            };
            return e
        }
        return function(c, d) {
            var e = b(c);
            if (d == null)
                d = a.core.evt.getEvent();
            else {
                if (d.nodeType == 1) {
                    var f = b(d);
                    return e.right > f.left && e.left < f.right && e.bottom > f.top && e.top < f.bottom ? !0 : !1
                }
                if (d.clientX == null)
                    throw "core.evt.hitTest: [" + d + ":oEvent] is not a valid value"
            }
            var g = a.core.util.scrollPos()
              , h = d.clientX + g.left
              , i = d.clientY + g.top;
            return h >= e.left && h <= e.right && i >= e.top && i <= e.bottom
        }
    });
    STK.register("core.evt.stopEvent", function(a) {
        return function(b) {
            b = b || a.core.evt.getEvent();
            if (b.preventDefault) {
                b.preventDefault();
                b.stopPropagation()
            } else {
                b.cancelBubble = !0;
                b.returnValue = !1
            }
            return !1
        }
    });
    STK.register("core.evt.preventDefault", function(a) {
        return function(b) {
            b = b || a.core.evt.getEvent();
            b.preventDefault ? b.preventDefault() : b.returnValue = !1
        }
    });
    STK.register("core.evt.hotKey", function(a) {
        var b = a.core.dom.uniqueID
          , c = {
            reg1: /^keypress|keydown|keyup$/,
            keyMap: {
                27: "esc",
                9: "tab",
                32: "space",
                10: "enter",
                13: "enter",
                8: "backspace",
                145: "scrollclock",
                20: "capslock",
                144: "numlock",
                19: "pause",
                45: "insert",
                36: "home",
                46: "delete",
                35: "end",
                33: "pageup",
                34: "pagedown",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                191: "/",
                17: "ctrl",
                16: "shift",
                109: "-",
                107: "=",
                219: "[",
                221: "]",
                220: "\\",
                222: "'",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                110: ".",
                111: "/"
            },
            keyEvents: {}
        };
        c.preventDefault = function() {
            this.returnValue = !1
        }
        ;
        c.handler = function(a) {
            a = a || window.event;
            a.target || (a.target = a.srcElement || document);
            !a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode) && (a.which = a.charCode || a.keyCode);
            a.preventDefault || (a.preventDefault = c.preventDefault);
            var d = b(this), e, f;
            if (d && (e = c.keyEvents[d]) && (f = e[a.type])) {
                var g;
                switch (a.type) {
                case "keypress":
                    if (a.ctrlKey || a.altKey)
                        return;
                    a.which == 13 && (g = c.keyMap[13]);
                    a.which == 32 && (g = c.keyMap[32]);
                    a.which >= 33 && a.which <= 126 && (g = String.fromCharCode(a.which));
                    break;
                case "keyup":
                case "keydown":
                    c.keyMap[a.which] && (g = c.keyMap[a.which]);
                    g || (a.which >= 48 && a.which <= 57 ? g = String.fromCharCode(a.which) : a.which >= 65 && a.which <= 90 && (g = String.fromCharCode(a.which + 32)));
                    if (g && a.type == "keydown") {
                        e.linkedKey += e.linkedKey ? ">" + g : g;
                        a.altKey && (g = "alt+" + g);
                        a.shiftKey && (g = "shift+" + g);
                        a.ctrlKey && (g = "ctrl+" + g)
                    }
                }
                var h = /^select|textarea|input$/.test(a.target.nodeName.toLowerCase());
                if (g) {
                    var i = []
                      , j = !1;
                    if (e.linkedKey && e.linkKeyStr)
                        if (e.linkKeyStr.indexOf(" " + e.linkedKey) != -1) {
                            if (e.linkKeyStr.indexOf(" " + e.linkedKey + " ") != -1) {
                                i = i.concat(f[e.linkedKey]);
                                e.linkedKey = ""
                            }
                            j = !0
                        } else
                            e.linkedKey = "";
                    j || (i = i.concat(f[g]));
                    for (var k = 0; k < i.length; k++)
                        i[k] && (!i[k].disableInInput || !h) && i[k].fn.apply(this, [a, i[k].key])
                }
            }
        }
        ;
        var d = function(b, d, e, f) {
            var g = {};
            if (!a.core.dom.isNode(b) || a.core.func.getType(e) !== "function")
                return g;
            if (typeof d != "string" || !(d = d.replace(/\s*/g, "")))
                return g;
            f || (f = {});
            f.disableInInput || (f.disableInInput = !1);
            f.type || (f.type = "keypress");
            f.type = f.type.replace(/\s*/g, "");
            if (!c.reg1.test(f.type) || f.disableInInput && /^select|textarea|input$/.test(b.nodeName.toLowerCase()))
                return g;
            if (d.length > 1 || f.type != "keypress")
                d = d.toLowerCase();
            if (!/(^(\+|>)$)|(^([^\+>]+)$)/.test(d)) {
                var h = "";
                if (/((ctrl)|(shift)|(alt))\+(\+|([^\+]+))$/.test(d)) {
                    d.indexOf("ctrl+") != -1 && (h += "ctr+");
                    d.indexOf("shift+") != -1 && (h += "shift+");
                    d.indexOf("alt+") != -1 && (h += "alt+");
                    h += d.match(/\+(([^\+]+)|(\+))$/)[1]
                } else if (!/(^>)|(>$)|>>/.test(d) && d.length > 2)
                    g.linkFlag = !0;
                else
                    return g;
                f.type = "keydown"
            }
            g.keys = d;
            g.fn = e;
            g.opt = f;
            return g
        }
          , e = {
            add: function(f, g, h, i) {
                if (a.core.arr.isArray(g))
                    for (var j = 0; j < g.length; j++)
                        e.add(f, g[j], h, i);
                else {
                    var k = d(f, g, h, i);
                    if (!k.keys)
                        return;
                    g = k.keys;
                    h = k.fn;
                    i = k.opt;
                    var l = k.linkFlag
                      , m = b(f);
                    c.keyEvents[m] || (c.keyEvents[m] = {
                        linkKeyStr: "",
                        linkedKey: ""
                    });
                    c.keyEvents[m].handler || (c.keyEvents[m].handler = function() {
                        c.handler.apply(f, arguments)
                    }
                    );
                    l && c.keyEvents[m].linkKeyStr.indexOf(" " + g + " ") == -1 && (c.keyEvents[m].linkKeyStr += " " + g + " ");
                    var n = i.type;
                    if (!c.keyEvents[m][n]) {
                        c.keyEvents[m][n] = {};
                        a.core.evt.addEvent(f, n, c.keyEvents[m].handler)
                    }
                    c.keyEvents[m][n][g] || (c.keyEvents[m][n][g] = []);
                    c.keyEvents[m][n][g].push({
                        fn: h,
                        disableInInput: i.disableInInput,
                        key: g
                    })
                }
            },
            remove: function(f, g, h, i) {
                if (a.core.arr.isArray(g))
                    for (var j = 0; j < g.length; j++)
                        e.remove(f, g[j], h, i);
                else {
                    var k = d(f, g, h, i);
                    if (!k.keys)
                        return;
                    g = k.keys;
                    h = k.fn;
                    i = k.opt;
                    var l = k.linkFlag, m = b(f), n, o, p, q = i.type;
                    if (m && (n = c.keyEvents[m]) && (o = n[q]) && n.handler && (p = o[g])) {
                        for (var j = 0; j < p.length; )
                            p[j].fn === h ? p.splice(j, 1) : j++;
                        p.length < 1 && delete o[g];
                        var r = !1;
                        for (var s in o) {
                            r = !0;
                            break
                        }
                        if (!r) {
                            a.core.evt.removeEvent(f, q, n.handler);
                            delete n[q]
                        }
                        l && n.linkKeyStr && (n.linkKeyStr = n.linkKeyStr.replace(" " + g + " ", ""))
                    }
                }
            }
        };
        return e
    });
    STK.register("core.evt.eventName", function(a) {
        var b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            msTransition: "MSTransitionEnd",
            transition: "transitionend"
        };
        return function(c) {
            if (c === "mousewheel")
                return "onmousewheel"in document ? "mousewheel" : "DOMMouseScroll";
            if (c === "transitionend") {
                var d = a.C("div");
                for (var e in b)
                    if (e in d.style)
                        return b[e]
            }
            return c
        }
    });
    STK.register("core.func.bind", function(a) {
        return function(b, c, d) {
            d = a.core.arr.isArray(d) ? d : [d];
            return function() {
                return c.apply(b, d)
            }
        }
    });
    STK.register("core.func.memorize", function(a) {
        return function(a, b) {
            if (typeof a != "function")
                throw "core.func.memorize need a function as first parameter";
            b = b || {};
            var c = {};
            b.timeout && setInterval(function() {
                c = {}
            }, b.timeout);
            return function() {
                var d = Array.prototype.join.call(arguments, "_");
                d in c || (c[d] = a.apply(b.context || {}, arguments));
                return c[d]
            }
        }
    });
    STK.register("core.func.methodBefore", function(a) {
        return function() {
            var b = !1
              , c = []
              , d = {};
            d.add = function(d, e) {
                var f = a.core.obj.parseParam({
                    args: [],
                    pointer: window,
                    top: !1
                }, e);
                f.top == !0 ? c.unshift([d, f.args, f.pointer]) : c.push([d, f.args, f.pointer]);
                return !b
            }
            ;
            d.start = function() {
                var a, d, e, f, g;
                if (b != !0) {
                    b = !0;
                    for (a = 0,
                    d = c.length; a < d; a++) {
                        e = c[a][0];
                        f = c[a][1];
                        g = c[a][2];
                        e.apply(g, f)
                    }
                }
            }
            ;
            d.reset = function() {
                c = [];
                b = !1
            }
            ;
            d.getList = function() {
                return c
            }
            ;
            return d
        }
    });
    STK.register("core.func.timedChunk", function(a) {
        var b = {
            process: function(a) {
                typeof a == "function" && a()
            },
            context: {},
            callback: null,
            delay: 25,
            execTime: 50
        };
        return function(c, d) {
            if (!a.core.arr.isArray(c))
                throw "core.func.timedChunk need an array as first parameter";
            var e = c.concat()
              , f = a.core.obj.parseParam(b, d)
              , g = null
              , h = function() {
                var a = +(new Date);
                do
                    f.process.call(f.context, e.shift());
                while (e.length > 0 && +(new Date) - a < f.execTime);e.length <= 0 ? f.callback && f.callback(c) : setTimeout(arguments.callee, f.delay)
            };
            g = setTimeout(h, f.delay)
        }
    });
    STK.register("core.io.getXHR", function(a) {
        return function() {
            var a = !1;
            try {
                a = new XMLHttpRequest
            } catch (b) {
                try {
                    a = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (c) {
                    try {
                        a = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (d) {
                        a = !1
                    }
                }
            }
            return a
        }
    });
    STK.register("core.str.parseURL", function(a) {
        return function(a) {
            var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
              , c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"]
              , d = b.exec(a)
              , e = {};
            for (var f = 0, g = c.length; f < g; f += 1)
                e[c[f]] = d[f] || "";
            return e
        }
    });
    STK.register("core.json.jsonToQuery", function(a) {
        var b = function(b, c) {
            b = b == null ? "" : b;
            b = a.core.str.trim(b.toString());
            return c ? encodeURIComponent(b) : b
        };
        return function(a, c) {
            var d = [];
            if (typeof a == "object")
                for (var e in a) {
                    if (e === "$nullName") {
                        d = d.concat(a[e]);
                        continue
                    }
                    if (a[e]instanceof Array)
                        for (var f = 0, g = a[e].length; f < g; f++)
                            d.push(e + "=" + b(a[e][f], c));
                    else
                        typeof a[e] != "function" && d.push(e + "=" + b(a[e], c))
                }
            return d.length ? d.join("&") : ""
        }
    });
    STK.register("core.util.URL", function(a) {
        return function(b, c) {
            var d = a.core.obj.parseParam({
                isEncodeQuery: !1,
                isEncodeHash: !1
            }, c || {})
              , e = {}
              , f = a.core.str.parseURL(b)
              , g = a.core.json.queryToJson(f.query)
              , h = a.core.json.queryToJson(f.hash);
            e.setParam = function(a, b) {
                g[a] = b;
                return this
            }
            ;
            e.getParam = function(a) {
                return g[a]
            }
            ;
            e.setParams = function(a) {
                for (var b in a)
                    e.setParam(b, a[b]);
                return this
            }
            ;
            e.setHash = function(a, b) {
                h[a] = b;
                return this
            }
            ;
            e.getHash = function(a) {
                return h[a]
            }
            ;
            e.valueOf = e.toString = function() {
                var b = []
                  , c = a.core.json.jsonToQuery(g, d.isEncodeQuery)
                  , e = a.core.json.jsonToQuery(h, d.isEncodeQuery);
                if (f.scheme != "") {
                    b.push(f.scheme + ":");
                    b.push(f.slash)
                }
                if (f.host != "") {
                    b.push(f.host);
                    if (f.port != "") {
                        b.push(":");
                        b.push(f.port)
                    }
                }
                b.push("/");
                b.push(f.path);
                c != "" && b.push("?" + c);
                e != "" && b.push("#" + e);
                return b.join("")
            }
            ;
            return e
        }
    });
    STK.register("core.json.strToJson", function(a) {
        var b, c, d = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t"
        }, e, f = function(a) {
            throw {
                name: "SyntaxError",
                message: a,
                at: b,
                text: e
            }
        }, g = function(a) {
            a && a !== c && f("Expected '" + a + "' instead of '" + c + "'");
            c = e.charAt(b);
            b += 1;
            return c
        }, h = function() {
            var a, b = "";
            if (c === "-") {
                b = "-";
                g("-")
            }
            while (c >= "0" && c <= "9") {
                b += c;
                g()
            }
            if (c === ".") {
                b += ".";
                while (g() && c >= "0" && c <= "9")
                    b += c
            }
            if (c === "e" || c === "E") {
                b += c;
                g();
                if (c === "-" || c === "+") {
                    b += c;
                    g()
                }
                while (c >= "0" && c <= "9") {
                    b += c;
                    g()
                }
            }
            a = +b;
            if (isNaN(a))
                f("Bad number");
            else
                return a
        }, i = function() {
            var a, b, e = "", h;
            if (c === '"')
                while (g()) {
                    if (c === '"') {
                        g();
                        return e
                    }
                    if (c === "\\") {
                        g();
                        if (c === "u") {
                            h = 0;
                            for (b = 0; b < 4; b += 1) {
                                a = parseInt(g(), 16);
                                if (!isFinite(a))
                                    break;
                                h = h * 16 + a
                            }
                            e += String.fromCharCode(h)
                        } else if (typeof d[c] == "string")
                            e += d[c];
                        else
                            break
                    } else
                        e += c
                }
            f("Bad string")
        }, j = function() {
            while (c && c <= " ")
                g()
        }, k = function() {
            switch (c) {
            case "t":
                g("t");
                g("r");
                g("u");
                g("e");
                return !0;
            case "f":
                g("f");
                g("a");
                g("l");
                g("s");
                g("e");
                return !1;
            case "n":
                g("n");
                g("u");
                g("l");
                g("l");
                return null
            }
            f("Unexpected '" + c + "'")
        }, l, m = function() {
            var a = [];
            if (c === "[") {
                g("[");
                j();
                if (c === "]") {
                    g("]");
                    return a
                }
                while (c) {
                    a.push(l());
                    j();
                    if (c === "]") {
                        g("]");
                        return a
                    }
                    g(",");
                    j()
                }
            }
            f("Bad array")
        }, n = function() {
            var a, b = {};
            if (c === "{") {
                g("{");
                j();
                if (c === "}") {
                    g("}");
                    return b
                }
                while (c) {
                    a = i();
                    j();
                    g(":");
                    Object.hasOwnProperty.call(b, a) && f('Duplicate key "' + a + '"');
                    b[a] = l();
                    j();
                    if (c === "}") {
                        g("}");
                        return b
                    }
                    g(",");
                    j()
                }
            }
            f("Bad object")
        };
        l = function() {
            j();
            switch (c) {
            case "{":
                return n();
            case "[":
                return m();
            case '"':
                return i();
            case "-":
                return h();
            default:
                return c >= "0" && c <= "9" ? h() : k()
            }
        }
        ;
        return function(a, d) {
            if (window.JSON && window.JSON.parse)
                return window.JSON.parse(a, d);
            var g;
            e = a;
            b = 0;
            c = " ";
            g = l();
            j();
            c && f("Syntax error");
            return typeof d == "function" ? function h(a, b) {
                var c, e, f = a[b];
                if (f && typeof f == "object")
                    for (c in f)
                        if (Object.hasOwnProperty.call(f, c)) {
                            e = h(f, c);
                            e !== undefined ? f[c] = e : delete f[c]
                        }
                return d.call(a, b, f)
            }({
                "": g
            }, "") : g
        }
    });
    STK.register("core.io.ajax", function($) {
        return function(oOpts) {
            var parseUrl = $.core.str.parseURL(window.location.href)
              , hasRandom = $.core.json.queryToJson(parseUrl.query)
              , canRefresh = "host"in parseUrl && parseUrl.host ? parseUrl.host == "weibo.com" || parseUrl.host == "www.weibo.com" || parseUrl.host == "d.weibo.com" : flase;
            if (!canRefresh || $.core.util.cookie.get("httpsupgrade_ab") != "SSL" || parseUrl.scheme.toLowerCase() != "http" || typeof hasRandom != "object" || "random_https"in hasRandom) {
                var opts = $.core.obj.parseParam({
                    url: "",
                    charset: "UTF-8",
                    timeout: 3e4,
                    args: {},
                    onComplete: null,
                    onTimeout: $.core.func.empty,
                    uniqueID: null,
                    onFail: $.core.func.empty,
                    method: "get",
                    asynchronous: !0,
                    header: {},
                    isEncode: !1,
                    responseType: "json"
                }, oOpts);
                if (opts.url == "")
                    throw "ajax need url in parameters object";
                var tm, trans = $.core.io.getXHR(), cback = function() {
                    if (trans.readyState == 4) {
                        clearTimeout(tm);
                        var data = "";
                        if (opts.responseType === "xml")
                            data = trans.responseXML;
                        else if (opts.responseType === "text")
                            data = trans.responseText;
                        else
                            try {
                                trans.responseText && typeof trans.responseText == "string" ? data = eval("(" + trans.responseText + ")") : data = {}
                            } catch (exp) {
                                data = opts.url + "return error : data error"
                            }
                        trans.status == 200 ? opts.onComplete != null && opts.onComplete(data) : trans.status != 0 && opts.onFail != null && opts.onFail(data, trans)
                    } else
                        opts.onTraning != null && opts.onTraning(trans)
                };
                trans.onreadystatechange = cback;
                opts.header["Content-Type"] || (opts.header["Content-Type"] = "application/x-www-form-urlencoded");
                opts.header["X-Requested-With"] || (opts.header["X-Requested-With"] = "XMLHttpRequest");
                if (opts.method.toLocaleLowerCase() == "get") {
                    var url = $.core.util.URL(opts.url, {
                        isEncodeQuery: opts.isEncode
                    });
                    url.setParams(opts.args);
                    url.setParam("__rnd", (new Date).valueOf());
                    trans.open(opts.method, url.toString(), opts.asynchronous);
                    try {
                        for (var k in opts.header)
                            trans.setRequestHeader(k, opts.header[k])
                    } catch (exp) {}
                    trans.send("")
                } else {
                    trans.open(opts.method, opts.url, opts.asynchronous);
                    try {
                        for (var k in opts.header)
                            trans.setRequestHeader(k, opts.header[k])
                    } catch (exp) {}
                    trans.send($.core.json.jsonToQuery(opts.args, opts.isEncode))
                }
                opts.timeout && (tm = setTimeout(function() {
                    try {
                        trans.abort();
                        opts.onTimeout({}, trans);
                        opts.onFail({}, trans)
                    } catch (a) {}
                }, opts.timeout));
                return trans
            }
            var time = +(new Date);
            window.location.href = "https://" + parseUrl.host + "/" + parseUrl.path + (parseUrl.query == "" ? "?random_https=" + time : "?" + parseUrl.query + "&random_https=" + time);
            return
        }
    });
    STK.register("core.io.scriptLoader", function(a) {
        var b = {}
          , c = {
            url: "",
            charset: "UTF-8",
            timeout: 3e4,
            args: {},
            onComplete: a.core.func.empty,
            onTimeout: a.core.func.empty,
            isEncode: !1,
            uniqueID: null
        };
        return function(d) {
            var e, f, g = a.core.obj.parseParam(c, d);
            if (g.url == "")
                throw "scriptLoader: url is null";
            var h = g.uniqueID || a.core.util.getUniqueKey();
            e = b[h];
            if (e != null && a.IE != !0) {
                a.core.dom.removeNode(e);
                e = null
            }
            e == null && (e = b[h] = a.C("script"));
            e.charset = g.charset;
            e.id = "scriptRequest_script_" + h;
            e.type = "text/javascript";
            g.onComplete != null && (a.IE ? e.onreadystatechange = function() {
                if (e.readyState.toLowerCase() == "loaded" || e.readyState.toLowerCase() == "complete") {
                    try {
                        clearTimeout(f);
                        document.getElementsByTagName("head")[0].removeChild(e);
                        e.onreadystatechange = null
                    } catch (a) {}
                    g.onComplete()
                }
            }
            : e.onload = function() {
                try {
                    clearTimeout(f);
                    a.core.dom.removeNode(e)
                } catch (b) {}
                g.onComplete()
            }
            );
            e.src = a.core.util.URL(g.url, {
                isEncodeQuery: g.isEncode
            }).setParams(g.args).toString();
            document.getElementsByTagName("head")[0].appendChild(e);
            g.timeout > 0 && (f = setTimeout(function() {
                try {
                    document.getElementsByTagName("head")[0].removeChild(e)
                } catch (a) {}
                g.onTimeout()
            }, g.timeout));
            return e
        }
    });
    STK.register("core.io.jsonp", function(a) {
        return function(b) {
            var c = a.core.obj.parseParam({
                url: "",
                charset: "UTF-8",
                timeout: 3e4,
                args: {},
                onComplete: null,
                onTimeout: null,
                responseName: null,
                isEncode: !1,
                varkey: "callback"
            }, b)
              , d = -1
              , e = c.responseName || "STK_" + a.core.util.getUniqueKey();
            c.args[c.varkey] = e;
            var f = c.onComplete
              , g = c.onTimeout;
            window[e] = function(a) {
                if (d != 2 && f != null) {
                    d = 1;
                    f(a)
                }
            }
            ;
            c.onComplete = null;
            c.onTimeout = function() {
                if (d != 1 && g != null) {
                    d = 2;
                    g()
                }
            }
            ;
            return a.core.io.scriptLoader(c)
        }
    });
    STK.register("core.util.templet", function(a) {
        return function(a, b) {
            return a.replace(/#\{(.+?)\}/ig, function() {
                var a = arguments[1].replace(/\s/ig, "")
                  , c = arguments[0]
                  , d = a.split("||");
                for (var e = 0, f = d.length; e < f; e += 1) {
                    if (/^default:.*$/.test(d[e])) {
                        c = d[e].replace(/^default:/, "");
                        break
                    }
                    if (b[d[e]] !== undefined) {
                        c = b[d[e]];
                        break
                    }
                }
                return c
            })
        }
    });
    STK.register("core.io.getIframeTrans", function(a) {
        var b = '<iframe id="#{id}" name="#{id}" height="0" width="0" frameborder="no"></iframe>';
        return function(c) {
            var d, e, f;
            e = a.core.obj.parseParam({
                id: "STK_iframe_" + a.core.util.getUniqueKey()
            }, c);
            f = {};
            d = a.C("DIV");
            d.innerHTML = a.core.util.templet(b, e);
            a.core.util.hideContainer.appendChild(d);
            f.getId = function() {
                return e.id
            }
            ;
            f.destroy = function() {
                d.innerHTML = "";
                try {
                    d.getElementsByTagName("iframe")[0].src = "about:blank"
                } catch (b) {}
                a.core.util.hideContainer.removeChild(d);
                d = null
            }
            ;
            return f
        }
    });
    STK.register("core.io.require", function(a) {
        var b = "//js.t.sinajs.cn/STK/js/"
          , c = function(a, b) {
            var c = b.split(".")
              , d = a
              , e = null;
            while (e = c.shift()) {
                d = d[e];
                if (d === undefined)
                    return !1
            }
            return !0
        }
          , d = []
          , e = function(b) {
            if (a.core.arr.indexOf(b, d) !== -1)
                return !1;
            d.push(b);
            a.core.io.scriptLoader({
                url: b,
                callback: function() {
                    a.core.arr.foreach(d, function(a, c) {
                        if (a === b) {
                            d.splice(c, 1);
                            return !1
                        }
                    })
                }
            });
            return !1
        }
          , f = function(d, f, g) {
            var h = null;
            for (var i = 0, j = d.length; i < j; i += 1) {
                var k = d[i];
                typeof k == "string" ? c(a, k) || e(b + k.replace(/\./ig, "/") + ".js") : c(window, k.NS) || e(k.url)
            }
            var l = function() {
                for (var b = 0, e = d.length; b < e; b += 1) {
                    var i = d[b];
                    if (typeof i == "string") {
                        if (!c(a, i)) {
                            h = setTimeout(l, 25);
                            return !1
                        }
                    } else if (!c(window, i.NS)) {
                        h = setTimeout(l, 25);
                        return !1
                    }
                }
                clearTimeout(h);
                f.apply({}, [].concat(g))
            };
            h = setTimeout(l, 25)
        };
        f.setBaseURL = function(a) {
            if (typeof a != "string")
                throw "[STK.kit.extra.require.setBaseURL] need string as frist parameter";
            b = a
        }
        ;
        return f
    });
    STK.register("core.io.ijax", function(a) {
        return function(b) {
            var c, d, e, f, g, h, i;
            c = a.core.obj.parseParam({
                url: "",
                form: null,
                args: {},
                uniqueID: null,
                timeout: 3e4,
                onComplete: a.core.func.empty,
                onTimeout: a.core.func.empty,
                onFail: a.core.func.empty,
                asynchronous: !0,
                isEncode: !0,
                abaurl: null,
                responseName: null,
                varkey: "callback",
                abakey: "callback"
            }, b);
            i = {};
            if (c.url == "")
                throw "ijax need url in parameters object";
            if (!c.form)
                throw "ijax need form in parameters object";
            d = a.core.io.getIframeTrans();
            e = c.responseName || "STK_ijax_" + a.core.util.getUniqueKey();
            h = {};
            h[c.varkey] = e;
            if (c.abaurl) {
                c.abaurl = a.core.util.URL(c.abaurl).setParams(h);
                h = {};
                h[c.abakey] = c.abaurl.toString()
            }
            c.url = a.core.util.URL(c.url, {
                isEncodeQuery: c.isEncode
            }).setParams(h).setParams(c.args);
            g = function() {
                window[e] = null;
                d.destroy();
                d = null;
                clearTimeout(f)
            }
            ;
            f = setTimeout(function() {
                try {
                    c.onTimeout();
                    c.onFail()
                } catch (a) {} finally {
                    g()
                }
            }, c.timeout);
            window[e] = function(a, b) {
                try {
                    c.onComplete(a, b)
                } catch (d) {} finally {
                    g()
                }
            }
            ;
            c.form.action = c.url.toString();
            c.form.target = d.getId();
            c.form.submit();
            i.abort = g;
            return i
        }
    });
    STK.register("core.json.clone", function(a) {
        function b(a) {
            var c;
            if (a instanceof Array) {
                c = [];
                var d = a.length;
                while (d--)
                    c[d] = b(a[d]);
                return c
            }
            if (a instanceof Object) {
                c = {};
                for (var e in a)
                    c[e] = b(a[e]);
                return c
            }
            return a
        }
        return b
    });
    STK.register("core.json.include", function(a) {
        return function(a, b) {
            for (var c in b)
                if (typeof b[c] == "object")
                    if (b[c]instanceof Array) {
                        if (!(a[c]instanceof Array))
                            return !1;
                        if (b[c].length !== a[c].length)
                            return !1;
                        for (var d = 0, e = b[c].length; d < e; d += 1)
                            if (!arguments.callee(b[c][d], a[c][d]))
                                return !1
                    } else {
                        if (typeof a[c] != "object")
                            return !1;
                        if (!arguments.callee(b[c], a[c]))
                            return !1
                    }
                else if (typeof b[c] == "number" || typeof b[c] == "string") {
                    if (b[c] !== a[c])
                        return !1
                } else if (b[c] !== undefined && b[c] !== null) {
                    if (a[c] === undefined || a[c] === null)
                        return !1;
                    if (!b[c].toString || !a[c].toString)
                        throw "json1[k] or json2[k] do not have toString method";
                    if (b[c].toString() !== a[c].toString())
                        return !1
                }
            return !0
        }
    });
    STK.register("core.json.compare", function(a) {
        return function(b, c) {
            return a.core.json.include(b, c) && a.core.json.include(c, b) ? !0 : !1
        }
    });
    STK.register("core.json.jsonToStr", function(a) {
        function d(a) {
            return a < 10 ? "0" + a : a
        }
        function c(a) {
            f.lastIndex = 0;
            return f.test(a) ? '"' + a.replace(f, function(a) {
                var b = i[a];
                return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }
        function b(a, d) {
            var e, f, i, k, l = g, m, n = d[a];
            n && typeof n == "object" && typeof n.toJSON == "function" && (n = n.toJSON(a));
            typeof j == "function" && (n = j.call(d, a, n));
            switch (typeof n) {
            case "string":
                return c(n);
            case "number":
                return isFinite(n) ? String(n) : "null";
            case "boolean":
            case "null":
                return String(n);
            case "object":
                if (!n)
                    return "null";
                g += h;
                m = [];
                if (Object.prototype.toString.apply(n) === "[object Array]") {
                    k = n.length;
                    for (e = 0; e < k; e += 1)
                        m[e] = b(e, n) || "null";
                    i = m.length === 0 ? "[]" : g ? "[\n" + g + m.join(",\n" + g) + "\n" + l + "]" : "[" + m.join(",") + "]";
                    g = l;
                    return i
                }
                if (j && typeof j == "object") {
                    k = j.length;
                    for (e = 0; e < k; e += 1) {
                        f = j[e];
                        if (typeof f == "string") {
                            i = b(f, n);
                            i && m.push(c(f) + (g ? ": " : ":") + i)
                        }
                    }
                } else
                    for (f in n)
                        if (Object.hasOwnProperty.call(n, f)) {
                            i = b(f, n);
                            i && m.push(c(f) + (g ? ": " : ":") + i)
                        }
                i = m.length === 0 ? "{}" : g ? "{\n" + g + m.join(",\n" + g) + "\n" + l + "}" : "{" + m.join(",") + "}";
                g = l;
                return i
            }
        }
        if (typeof Date.prototype.toJSON != "function") {
            Date.prototype.toJSON = function(a) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
            }
            ;
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
                return this.valueOf()
            }
        }
        var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g, h, i = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, j;
        return function(a, c, d) {
            if (window.JSON && window.JSON.stringify)
                return window.JSON.stringify(a, c, d);
            var e;
            g = "";
            h = "";
            if (typeof d == "number")
                for (e = 0; e < d; e += 1)
                    h += " ";
            else
                typeof d == "string" && (h = d);
            j = c;
            if (!c || typeof c == "function" || typeof c == "object" && typeof c.length == "number")
                return b("", {
                    "": a
                });
            throw new Error("JSON.stringify")
        }
    });
    STK.register("core.obj.beget", function(a) {
        var b = function() {};
        return function(a) {
            b.prototype = a;
            return new b
        }
    });
    STK.register("core.obj.cascade", function(a) {
        return function(a, b) {
            for (var c = 0, d = b.length; c < d; c += 1) {
                if (typeof a[b[c]] != "function")
                    throw "cascade need function list as the second paramsters";
                a[b[c]] = function(b) {
                    return function() {
                        b.apply(a, arguments);
                        return a
                    }
                }(a[b[c]])
            }
        }
    });
    STK.register("core.obj.clear", function(a) {
        return function(a) {
            var b, c = {};
            for (b in a)
                a[b] != null && (c[b] = a[b]);
            return c
        }
    });
    STK.register("core.obj.cut", function(a) {
        return function(b, c) {
            var d = {};
            if (!a.core.arr.isArray(c))
                throw "core.obj.cut need array as second parameter";
            for (var e in b)
                a.core.arr.inArray(e, c) || (d[e] = b[e]);
            return d
        }
    });
    STK.register("core.obj.sup", function(a) {
        return function(a, b) {
            var c = {};
            for (var d = 0, e = b.length; d < e; d += 1) {
                if (typeof a[b[d]] != "function")
                    throw "super need function list as the second paramsters";
                c[b[d]] = function(b) {
                    return function() {
                        return b.apply(a, arguments)
                    }
                }(a[b[d]])
            }
            return c
        }
    });
    STK.register("core.str.bLength", function(a) {
        return function(a) {
            if (!a)
                return 0;
            var b = a.match(/[^\x00-\xff]/g);
            return a.length + (b ? b.length : 0)
        }
    });
    STK.register("core.str.dbcToSbc", function(a) {
        return function(a) {
            return a.replace(/[\uff01-\uff5e]/g, function(a) {
                return String.fromCharCode(a.charCodeAt(0) - 65248)
            }).replace(/\u3000/g, " ")
        }
    });
    STK.register("core.str.parseHTML", function(a) {
        return function(a) {
            var b = /[^<>]+|<(\/?)([A-Za-z0-9]+)([^<>]*)>/g, c, d, e = [];
            while (c = b.exec(a)) {
                var f = [];
                for (d = 0; d < c.length; d += 1)
                    f.push(c[d]);
                e.push(f)
            }
            return e
        }
    });
    STK.register("core.str.leftB", function(a) {
        return function(b, c) {
            var d = b.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
            b = b.slice(0, d.slice(0, c).replace(/\*\*/g, " ").replace(/\*/g, "").length);
            a.core.str.bLength(b) > c && c > 0 && (b = b.slice(0, b.length - 1));
            return b
        }
    });
    STK.register("core.str.queryString", function(a) {
        return function(b, c) {
            var d = a.core.obj.parseParam({
                source: window.location.href.toString(),
                split: "&"
            }, c), e = (new RegExp("(^|)" + b + "=([^\\" + d.split + "]*)(\\" + d.split + "|$)","gi")).exec(d.source), f;
            return (f = e) ? f[2] : null
        }
    });
    STK.register("core.util.cookie", function(a) {
        var b = {
            set: function(b, c, d) {
                var e = [], f, g, h = a.core.obj.parseParam({
                    expire: null,
                    path: "/",
                    domain: null,
                    secure: null,
                    encode: !0
                }, d);
                h.encode == !0 && (c = escape(c));
                e.push(b + "=" + c);
                h.path != null && e.push("path=" + h.path);
                h.domain != null && e.push("domain=" + h.domain);
                h.secure != null && e.push(h.secure);
                if (h.expire != null) {
                    f = new Date;
                    g = f.getTime() + h.expire * 36e5;
                    f.setTime(g);
                    e.push("expires=" + f.toGMTString())
                }
                document.cookie = e.join(";")
            },
            get: function(a) {
                a = a.replace(/([\.\[\]\$])/g, "\\$1");
                var b = new RegExp(a + "=([^;]*)?;","i")
                  , c = document.cookie + ";"
                  , d = c.match(b);
                return d ? d[1] || "" : ""
            },
            remove: function(a, c) {
                c = c || {};
                c.expire = -10;
                b.set(a, "", c)
            }
        };
        return b
    });
    STK.register("core.util.connect", function(a) {
        var b = {}
          , c = {}
          , d = 0
          , e = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }
          , f = function() {
            return ++d + "" + (new Date).getTime()
        }
          , g = function(b, d, f, g) {
            if (!e(c, b))
                return !1;
            var h = c[b];
            if (!e(h.callback, d))
                return !1;
            var i = h.callback[d].onSuccess
              , j = h.callback[d].onError
              , k = a.core.json.jsonToStr(g || {});
            setTimeout(function() {
                var b = a.core.json.strToJson(k);
                if (f) {
                    b.type = "error";
                    j(b, d)
                } else
                    i(b, d)
            }, 0);
            delete h.callback[d];
            return !0
        };
        b.request = function(b) {
            var d = b.sid;
            if (!d || typeof d != "string")
                return -1;
            if (!e(c, d))
                return -1;
            var h = c[d]
              , i = f()
              , j = a.core.json.jsonToStr(b.data || {});
            h.callback[i] = {
                onSuccess: b.onSuccess || a.core.func.empty,
                onError: b.onError || a.core.func.empty
            };
            var k = function(a) {
                g(d, i, a.error, a.data)
            };
            setTimeout(function() {
                h.handle(k, a.core.json.strToJson(j), i)
            }, 0);
            return i
        }
        ;
        b.create = function(b) {
            if (!b)
                return !1;
            var d = b.sid;
            if (!d || typeof d != "string")
                return !1;
            if (e(c, d))
                return !1;
            var f = b.handle;
            if (typeof f != "function")
                return !1;
            c[d] = {
                handle: f,
                onAbort: b.onAbort || a.core.func.empty,
                callback: {}
            };
            return !0
        }
        ;
        b.abort = function(a) {
            if (!a)
                return !1;
            for (var b in c) {
                var d = c[b];
                if (e(d.callback, a)) {
                    setTimeout(function() {
                        d.onAbort(a)
                    }, 0);
                    delete d.callback[a];
                    return !0
                }
            }
            return !1
        }
        ;
        b.destory = function(a) {
            if (!a || typeof a != "string")
                return !1;
            if (!e(c, a))
                return !1;
            for (var b in c[a].callback)
                try {
                    c[a].callback[b].onError({
                        type: "destroy"
                    }, b)
                } catch (d) {}
            delete c[a];
            return !0
        }
        ;
        return b
    });
    STK.register("core.util.drag", function(a) {
        var b = function(a) {
            a.cancelBubble = !0;
            return !1
        }
          , c = function(b, c) {
            b.clientX = c.clientX;
            b.clientY = c.clientY;
            b.pageX = c.clientX + a.core.util.scrollPos().left;
            b.pageY = c.clientY + a.core.util.scrollPos().top;
            return b
        };
        return function(d, e) {
            if (!a.core.dom.isNode(d))
                throw "core.util.drag need Element as first parameter";
            var f = a.core.obj.parseParam({
                actRect: [],
                actObj: {}
            }, e)
              , g = {}
              , h = a.core.evt.custEvent.define(f.actObj, "dragStart")
              , i = a.core.evt.custEvent.define(f.actObj, "dragEnd")
              , j = a.core.evt.custEvent.define(f.actObj, "draging")
              , k = function(d) {
                var e = c({}, d);
                document.body.onselectstart = function() {
                    return !1
                }
                ;
                a.core.evt.addEvent(document, "mousemove", l);
                a.core.evt.addEvent(document, "mouseup", m);
                a.core.evt.addEvent(document, "click", b, !0);
                if (d.preventDefault) {
                    d.preventDefault();
                    d.stopPropagation()
                }
                a.core.evt.custEvent.fire(h, "dragStart", e);
                return !1
            }
              , l = function(b) {
                var d = c({}, b);
                b.cancelBubble = !0;
                a.core.evt.custEvent.fire(h, "draging", d)
            }
              , m = function(d) {
                var e = c({}, d);
                document.body.onselectstart = function() {
                    return !0
                }
                ;
                a.core.evt.removeEvent(document, "mousemove", l);
                a.core.evt.removeEvent(document, "mouseup", m);
                a.core.evt.removeEvent(document, "click", b, !0);
                a.core.evt.custEvent.fire(h, "dragEnd", e)
            };
            a.core.evt.addEvent(d, "mousedown", k);
            g.destroy = function() {
                a.core.evt.removeEvent(d, "mousedown", k);
                f = null
            }
            ;
            g.getActObj = function() {
                return f.actObj
            }
            ;
            return g
        }
    });
    STK.register("core.util.easyTemplate", function(a) {
        var b = function(a, c) {
            if (!a)
                return "";
            if (a !== b.template) {
                b.template = a;
                b.aStatement = b.parsing(b.separate(a))
            }
            var d = b.aStatement
              , e = function(a) {
                a && (c = a);
                return arguments.callee
            };
            e.toString = function() {
                return (new Function(d[0],d[1]))(c)
            }
            ;
            return e
        };
        b.separate = function(a) {
            var b = /\\'/g
              , c = a.replace(/(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g, function(a, c, d, e, f, g, h, i) {
                if (c)
                    return "{|}" + (d ? "-" : "+") + e + "{|}";
                if (f)
                    return "\\'";
                if (g)
                    return "";
                if (h)
                    return "'+(" + i.replace(b, "'") + ")+'"
            });
            return c
        }
        ;
        b.parsing = function(a) {
            var b, c, d, e, f, g, h, i = ["var aRet = [];"];
            h = a.split(/\{\|\}/);
            var j = /\s/;
            while (h.length) {
                d = h.shift();
                if (!d)
                    continue;
                f = d.charAt(0);
                if (f !== "+" && f !== "-") {
                    d = "'" + d + "'";
                    i.push("aRet.push(" + d + ");");
                    continue
                }
                e = d.split(j);
                switch (e[0]) {
                case "+et":
                    b = e[1];
                    c = e[2];
                    i.push('aRet.push("<!--' + b + ' start-->");');
                    break;
                case "-et":
                    i.push('aRet.push("<!--' + b + ' end-->");');
                    break;
                case "+if":
                    e.splice(0, 1);
                    i.push("if" + e.join(" ") + "{");
                    break;
                case "+elseif":
                    e.splice(0, 1);
                    i.push("}else if" + e.join(" ") + "{");
                    break;
                case "-if":
                    i.push("}");
                    break;
                case "+else":
                    i.push("}else{");
                    break;
                case "+list":
                    i.push("if(" + e[1] + ".constructor === Array){with({i:0,l:" + e[1] + ".length," + e[3] + "_index:0," + e[3] + ":null}){for(i=l;i--;){" + e[3] + "_index=(l-i-1);" + e[3] + "=" + e[1] + "[" + e[3] + "_index];");
                    break;
                case "-list":
                    i.push("}}}");
                    break;
                default:
                }
            }
            i.push('return aRet.join("");');
            return [c, i.join("")]
        }
        ;
        return b
    });
    STK.register("core.util.htmlParser", function(a) {
        var b = function(a) {
            var b = {}
              , c = a.split(",");
            for (var d = 0; d < c.length; d++)
                b[c[d]] = !0;
            return b
        }
          , c = /^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/
          , d = /^<\/(\w+)[^>]*>/
          , e = /([\w|\-]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g
          , f = b("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed")
          , g = b("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul")
          , h = b("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var")
          , i = b("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr")
          , j = b("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected")
          , k = b("script,style")
          , l = function(a, b) {
            var l, m, n, o = [], p = a, q = function(c, d, k, l) {
                if (g[d])
                    while (o.last() && h[o.last()])
                        r("", o.last());
                i[d] && o.last() == d && r("", d);
                l = f[d] || !!l;
                l || o.push(d);
                var m = [];
                if (c === "textarea") {
                    var n = a.match(/^(.*)<\/textarea[^>]*>/);
                    m.push({
                        name: "text",
                        value: a.slice(0, n[0].length)
                    });
                    a = a.substring(n[0].length)
                }
                if (b.start && typeof b.start == "function") {
                    k.replace(e, function(a, b) {
                        var c = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : j[b] ? b : "";
                        m.push({
                            name: b,
                            value: c,
                            escaped: c.replace(/(^|[^\\])"/g, '$1\\"')
                        })
                    });
                    b.start(d, m, l)
                }
            }, r = function(a, c) {
                if (!c)
                    var d = 0;
                else
                    for (var d = o.length - 1; d >= 0; d--)
                        if (o[d] == c)
                            break;
                if (d >= 0) {
                    for (var e = o.length - 1; e >= d; e--)
                        b.end && typeof b.end == "function" && b.end(o[e]);
                    o.length = d
                }
            };
            o.last = function() {
                return this[this.length - 1]
            }
            ;
            while (a) {
                m = !0;
                if (!o.last() || !k[o.last()]) {
                    if (a.indexOf("<!--") === 0) {
                        l = a.indexOf("-->");
                        if (l >= 0) {
                            b.comment && typeof b.comment == "function" && b.comment(a.substring(4, l));
                            a = a.substring(l + 3);
                            m = !1
                        }
                    } else if (a.indexOf("</") === 0) {
                        n = a.match(d);
                        if (n) {
                            a = a.substring(n[0].length);
                            n[0].replace(d, r);
                            m = !1
                        }
                    } else if (a.indexOf("<") === 0) {
                        n = a.match(c);
                        if (n) {
                            a = a.substring(n[0].length);
                            n[0].replace(c, q);
                            m = !1
                        }
                    }
                    if (m) {
                        l = a.indexOf("<");
                        var s = l < 0 ? a : a.substring(0, l);
                        a = l < 0 ? "" : a.substring(l);
                        b.chars && typeof b.chars == "function" && b.chars(s)
                    }
                } else {
                    a = a.replace(new RegExp("(.*)</" + o.last() + "[^>]*>"), function(a, c) {
                        c = c.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");
                        b.chars && typeof b.chars == "function" && b.chars(c);
                        return ""
                    });
                    r("", o.last())
                }
                if (a == p)
                    throw "Parse Error: " + a;
                p = a
            }
            r()
        };
        return l
    });
    STK.register("core.util.nameValue", function(a) {
        return function(b) {
            var c = b.getAttribute("name")
              , d = b.getAttribute("type")
              , e = b.tagName
              , f = {
                name: c,
                value: ""
            }
              , g = function(b) {
                b === !1 ? f = !1 : f.value ? f.value = [a.core.str.trim(b || "")].concat(f.value) : f.value = a.core.str.trim(b || "")
            };
            if (!!b.disabled || !c)
                return !1;
            switch (e) {
            case "INPUT":
                d == "radio" || d == "checkbox" ? b.checked ? g(b.value) : g(!1) : d == "reset" || d == "submit" || d == "image" ? g(!1) : g(b.value);
                break;
            case "SELECT":
                if (b.multiple) {
                    var h = b.options;
                    for (var i = 0, j = h.length; i < j; i++)
                        h[i].selected && g(h[i].value)
                } else
                    g(b.value);
                break;
            case "TEXTAREA":
                g(b.value || b.getAttribute("value") || !1);
                break;
            case "BUTTON":
            default:
                g(b.value || b.getAttribute("value") || b.innerHTML || !1)
            }
            return f
        }
    });
    STK.register("core.util.htmlToJson", function(a) {
        return function(b, c, d) {
            var e = {};
            c = c || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"];
            if (!b || !c)
                return !1;
            var f = a.core.util.nameValue;
            for (var g = 0, h = c.length; g < h; g++) {
                var i = b.getElementsByTagName(c[g]);
                for (var j = 0, k = i.length; j < k; j++) {
                    var l = f(i[j]);
                    if (!l || d && l.value === "")
                        continue;
                    e[l.name] ? e[l.name]instanceof Array ? e[l.name] = e[l.name].concat(l.value) : e[l.name] = [e[l.name]].concat(l.value) : e[l.name] = l.value
                }
            }
            return e
        }
    });
    STK.register("core.util.jobsM", function(a) {
        return function() {
            var b = []
              , c = {}
              , d = !1
              , e = {}
              , f = function(b) {
                var d = b.name
                  , e = b.func
                  , f = +(new Date);
                if (!c[d])
                    try {
                        e(a);
                        e[d] = !0
                    } catch (g) {
                        a.log("[error][jobs]" + d)
                    }
            }
              , g = function(b) {
                if (b.length) {
                    a.core.func.timedChunk(b, {
                        process: f,
                        callback: arguments.callee
                    });
                    b.splice(0, b.length)
                } else
                    d = !1
            };
            e.register = function(a, c) {
                b.push({
                    name: a,
                    func: c
                })
            }
            ;
            e.start = function() {
                if (d)
                    return !0;
                d = !0;
                g(b)
            }
            ;
            e.load = function() {}
            ;
            a.core.dom.ready(e.start);
            return e
        }()
    });
    STK.register("core.util.language", function(a) {
        return function(a, b) {
            var c = [];
            for (var d = 2, e = arguments.length; d < e; d += 1)
                c.push(arguments[d]);
            return a.replace(/#L\{((.*?)(?:[^\\]))\}/ig, function() {
                var a = arguments[1], d;
                b && b[a] !== undefined ? d = b[a] : d = a;
                c.length && (d = d.replace(/(\%s)/ig, function() {
                    var a = c.shift();
                    return a !== undefined ? a : arguments[0]
                }));
                return d
            })
        }
    });
    STK.register("core.util.listener", function(a) {
        return function() {
            var a = {}, b = [], c, d = function() {
                if (b.length != 0) {
                    clearTimeout(c);
                    var a = b.splice(0, 1)[0];
                    try {
                        a.func.apply(a.func, [].concat(a.data))
                    } catch (e) {}
                    c = setTimeout(d, 25)
                }
            };
            return {
                register: function(b, c, d) {
                    a[b] = a[b] || {};
                    a[b][c] = a[b][c] || [];
                    a[b][c].push(d)
                },
                fire: function(c, e, f) {
                    var g, h, i;
                    if (a[c] && a[c][e] && a[c][e].length > 0) {
                        g = a[c][e];
                        g.data_cache = f;
                        for (h = 0,
                        i = g.length; h < i; h++)
                            b.push({
                                channel: c,
                                evt: e,
                                func: g[h],
                                data: f
                            });
                        d()
                    }
                },
                remove: function(b, c, d) {
                    if (a[b] && a[b][c])
                        for (var e = 0, f = a[b][c].length; e < f; e++)
                            if (a[b][c][e] === d) {
                                a[b][c].splice(e, 1);
                                break
                            }
                },
                list: function() {
                    return a
                },
                cache: function(b, c) {
                    if (a[b] && a[b][c])
                        return a[b][c].data_cache
                }
            }
        }()
    });
    STK.register("core.util.pageletM", function(a) {
        var b = ""
          , c = "";
        if (typeof $CONFIG != "undefined") {
            b = $CONFIG.jsPath || b;
            c = $CONFIG.cssPath || c
        }
        var d = a.core.arr.indexOf, e = {}, f, g = {}, h = {}, i = {}, j = {}, k, l;
        if (a.IE) {
            k = {};
            l = function() {
                var b, c, d;
                for (b in k)
                    if (k[b].length < 31) {
                        d = a.E(b);
                        break
                    }
                if (!d) {
                    b = "style_" + a.core.util.getUniqueKey(),
                    d = document.createElement("style");
                    d.setAttribute("type", "text/css");
                    d.setAttribute("id", b);
                    document.getElementsByTagName("head")[0].appendChild(d);
                    k[b] = []
                }
                return {
                    styleID: b,
                    styleSheet: d.styleSheet || d.sheet
                }
            }
        }
        var m = function(b, c) {
            i[b] = {
                cssURL: c
            };
            if (a.IE) {
                var d = l();
                d.styleSheet.addImport(c);
                k[d.styleID].push(b);
                i[b].styleID = d.styleID
            } else {
                var e = a.C("link");
                e.setAttribute("rel", "Stylesheet");
                e.setAttribute("type", "text/css");
                e.setAttribute("charset", "utf-8");
                e.setAttribute("href", c);
                e.setAttribute("id", b);
                document.getElementsByTagName("head")[0].appendChild(e)
            }
        }
          , n = {}
          , o = function(b, c) {
            var d = a.E(b);
            if (d) {
                c(d);
                n[b] && delete n[b];
                for (var e in n)
                    o(e, n[e])
            } else
                n[b] = c
        }
          , p = function(b) {
            if (a.IE) {
                var c = i[b].styleID, f = k[c], g = a.E(c), h;
                if ((h = d(b, f)) > -1) {
                    (g.styleSheet || g.sheet).removeImport(h);
                    f.splice(h, 1)
                }
            } else
                a.core.dom.removeNode(a.E(b));
            delete e[i[b].cssURL];
            delete i[b]
        }
          , q = function(b, d, e) {
            for (var f in j)
                a.E(f) || delete j[f];
            j[b] = {
                js: {},
                css: {}
            };
            if (e)
                for (var f = 0, g = e.length; f < g; ++f)
                    j[b].css[c + e[f]] = 1
        }
          , r = function() {
            for (var a in i) {
                var b = !1
                  , c = i[a].cssURL;
                for (var d in j)
                    if (j[d].css[c]) {
                        b = !0;
                        break
                    }
                b || p(a)
            }
        }
          , s = function(a, b) {
            var c = e[a] || (e[a] = {
                loaded: !1,
                list: []
            });
            if (c.loaded) {
                b(a);
                return !1
            }
            c.list.push(b);
            return c.list.length > 1 ? !1 : !0
        }
          , t = function(a) {
            var b = e[a].list;
            if (b) {
                for (var c = 0; c < b.length; c++)
                    b[c](a);
                e[a].loaded = !0;
                delete e[a].list
            }
        }
          , u = function(b) {
            var d = b.url
              , e = b.load_ID
              , f = b.complete
              , g = b.pid
              , h = c + d
              , i = "css_" + a.core.util.getUniqueKey();
            if (!!s(h, f)) {
                m(i, h);
                var j = a.C("div");
                j.id = e;
                a.core.util.hideContainer.appendChild(j);
                var k = 3e3
                  , l = function() {
                    if (parseInt(a.core.dom.getStyle(j, "height")) == 42) {
                        a.core.util.hideContainer.removeChild(j);
                        t(h)
                    } else if (--k > 0)
                        setTimeout(l, 10);
                    else {
                        a.log(h + "timeout!");
                        a.core.util.hideContainer.removeChild(j);
                        t(h);
                        p(i);
                        m(i, h)
                    }
                };
                setTimeout(l, 50)
            }
        }
          , v = function(c, d) {
            var f = b + c;
            !s(f, d) || a.core.io.scriptLoader({
                url: f,
                onComplete: function() {
                    t(f)
                },
                onTimeout: function() {
                    a.log(f + "timeout!");
                    delete e[f]
                }
            })
        }
          , w = function(a, b) {
            g[a] || (g[a] = b)
        }
          , x = function(b) {
            if (b)
                if (g[b])
                    try {
                        h[b] || (h[b] = g[b](a))
                    } catch (c) {
                        a.log(b, c, c.stack)
                    }
                else
                    a.log("start:ns=" + b + " ,have not been registed");
            else {
                var d = [];
                for (b in g)
                    d.push(b);
                a.core.func.timedChunk(d, {
                    process: function(b) {
                        try {
                            h[b] || (h[b] = g[b](a))
                        } catch (c) {
                            a.log(b, c, c.stack)
                        }
                    }
                })
            }
        }
          , y = function(b) {
            var c = 1, d, e, f, g, h, i, j;
            b = b || {};
            e = b.pid;
            f = b.html;
            h = b.js ? [].concat(b.js) : [];
            g = b.css ? [].concat(b.css) : [];
            if (e == undefined)
                a.log("node pid[" + e + "] is undefined");
            else {
                q(e, h, g);
                i = function() {
                    --c > 0 || o(e, function(a) {
                        f != undefined && (a.innerHTML = f);
                        h.length > 0 && j();
                        r()
                    })
                }
                ;
                j = function(a) {
                    h.length > 0 && v(h.shift(), j);
                    if (a && a.indexOf("/pl/") != -1) {
                        var b = a.replace(/^.*?\/(pl\/.*)\.js\??.*$/, "$1").replace(/\//g, ".");
                        z(b);
                        x(b)
                    }
                }
                ;
                if (g.length > 0) {
                    c += g.length;
                    for (var k = 0, l; l = g[k]; k++)
                        u({
                            url: l,
                            load_ID: "js_" + l.replace(/^\/?(.*)\.css\??.*$/i, "$1").replace(/\//g, "_"),
                            complete: i,
                            pid: e
                        })
                }
                i()
            }
        }
          , z = function(b) {
            if (b) {
                if (h[b]) {
                    a.log("destroy:" + b);
                    try {
                        h[b].destroy()
                    } catch (c) {
                        a.log(c, c.stack)
                    }
                    delete h[b]
                }
            } else {
                for (b in h) {
                    a.log("destroy:" + b);
                    try {
                        h[b] && h[b].destroy && h[b].destroy()
                    } catch (c) {
                        a.log(b, c, c.stack)
                    }
                }
                h = {}
            }
        }
          , A = {
            register: w,
            start: x,
            view: y,
            clear: z,
            destroy: function() {
                A.clear();
                e = {};
                h = {};
                g = {};
                f = undefined
            }
        };
        a.core.dom.ready(function() {
            a.core.evt.addEvent(window, "unload", function() {
                a.core.evt.removeEvent(window, "unload", arguments.callee);
                A.destroy()
            })
        });
        return A
    });
    STK.register("core.util.winSize", function(a) {
        return function(a) {
            var b, c, d;
            a ? d = a.document : d = document;
            if (d.compatMode === "CSS1Compat") {
                b = d.documentElement.clientWidth;
                c = d.documentElement.clientHeight
            } else if (self.innerHeight) {
                a ? d = a.self : d = self;
                b = d.innerWidth;
                c = d.innerHeight
            } else if (d.documentElement && d.documentElement.clientHeight) {
                b = d.documentElement.clientWidth;
                c = d.documentElement.clientHeight
            } else if (d.body) {
                b = d.body.clientWidth;
                c = d.body.clientHeight
            }
            return {
                width: b,
                height: c
            }
        }
    });
    STK.register("core.util.pageSize", function(a) {
        return function(b) {
            var c;
            b ? c = b.document : c = document;
            var d = c.compatMode == "CSS1Compat" ? c.documentElement : c.body, e, f, g, h;
            if (window.innerHeight && window.scrollMaxY) {
                e = d.scrollWidth;
                f = window.innerHeight + window.scrollMaxY
            } else if (d.scrollHeight > d.offsetHeight) {
                e = d.scrollWidth;
                f = d.scrollHeight
            } else {
                e = d.offsetWidth;
                f = d.offsetHeight
            }
            var i = a.core.util.winSize(b);
            f < i.height ? g = i.height : g = f;
            e < i.width ? h = i.width : h = e;
            return {
                page: {
                    width: h,
                    height: g
                },
                win: {
                    width: i.width,
                    height: i.height
                }
            }
        }
    });
    STK.register("core.util.queue", function(a) {
        return function() {
            var a = {}
              , b = [];
            a.add = function(c) {
                b.push(c);
                return a
            }
            ;
            a.get = function() {
                return b.length > 0 ? b.shift() : !1
            }
            ;
            return a
        }
    });
    STK.register("core.util.timer", function(a) {
        return function() {
            var a = {}
              , b = {}
              , c = 0
              , d = null
              , e = !1
              , f = 25
              , g = function() {
                for (var c in b)
                    b[c].pause || b[c].fun();
                return a
            };
            a.add = function(d) {
                if (typeof d != "function")
                    throw "The timer needs add a function as a parameters";
                var e = "" + (new Date).getTime() + Math.random() * Math.pow(10, 17);
                b[e] = {
                    fun: d,
                    pause: !1
                };
                c <= 0 && a.start();
                c++;
                return e
            }
            ;
            a.remove = function(d) {
                if (b[d]) {
                    delete b[d];
                    c--
                }
                c <= 0 && a.stop();
                return a
            }
            ;
            a.pause = function(c) {
                b[c] && (b[c].pause = !0);
                return a
            }
            ;
            a.play = function(c) {
                b[c] && (b[c].pause = !1);
                return a
            }
            ;
            a.stop = function() {
                clearInterval(d);
                d = null;
                return a
            }
            ;
            a.start = function() {
                d = setInterval(g, f);
                return a
            }
            ;
            a.loop = g;
            a.get = function(a) {
                if (a === "delay")
                    return f;
                if (a === "functionList")
                    return b
            }
            ;
            a.set = function(a, b) {
                a === "delay" && typeof b == "number" && (f = Math.max(25, Math.min(b, 200)))
            }
            ;
            return a
        }()
    });
    STK.register("core.util.scrollTo", function(a) {
        return function(b, c) {
            if (!a.core.dom.isNode(b))
                throw "core.dom.isNode need element as the first parameter";
            var d = a.core.obj.parseParam({
                box: document.documentElement,
                top: 0,
                step: 2,
                onMoveStop: null
            }, c);
            d.step = Math.max(2, Math.min(10, d.step));
            var e = [], f = a.core.dom.position(b), g;
            d.box == document.documentElement ? g = {
                t: 0
            } : g = a.core.dom.position(d.box);
            var h = Math.max(0, (f ? f.t : 0) - (g ? g.t : 0) - d.top)
              , i = d.box === document.documentElement ? d.box.scrollTop || document.body.scrollTop || window.pageYOffset : d.box.scrollTop;
            while (Math.abs(i - h) > d.step && i !== 0) {
                e.push(Math.round(i + (h - i) * d.step / 10));
                i = e[e.length - 1]
            }
            e.length || e.push(h);
            var j = a.core.util.timer.add(function() {
                if (e.length)
                    d.box === document.documentElement ? window.scrollTo(0, e.shift()) : d.box.scrollTop = e.shift();
                else {
                    d.box === document.documentElement ? window.scrollTo(0, h) : d.box.scrollTop = h;
                    a.core.util.timer.remove(j);
                    typeof d.onMoveStop == "function" && d.onMoveStop()
                }
            })
        }
    });
    STK.register("core.util.stack", function(a) {
        return function() {
            var a = {}
              , b = [];
            a.add = function(c) {
                b.push(c);
                return a
            }
            ;
            a.get = function() {
                return b.length > 0 ? b.pop() : !1
            }
            ;
            return a
        }
    });
    STK.register("core.util.swf", function(a) {
        function b(b, c) {
            var d = a.core.obj.parseParam({
                id: "swf_" + parseInt(Math.random() * 1e4, 10),
                width: 1,
                height: 1,
                attrs: {},
                paras: {},
                flashvars: {},
                html: ""
            }, c);
            if (b == null)
                throw "swf: [sURL] 鏈畾涔�";
            var e, f = [], g = [];
            for (e in d.attrs)
                g.push(e + '="' + d.attrs[e] + '" ');
            var h = [];
            for (e in d.flashvars)
                h.push(e + "=" + d.flashvars[e]);
            d.paras.flashvars = h.join("&");
            if (a.IE) {
                f.push('<object width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
                f.push(g.join(""));
                f.push('><param name="movie" value="' + b + '" />');
                for (e in d.paras)
                    f.push('<param name="' + e + '" value="' + d.paras[e] + '" />');
                f.push("</object>")
            } else {
                f.push('<embed width="' + d.width + '" height="' + d.height + '" id="' + d.id + '" src="' + b + '" type="application/x-shockwave-flash" ');
                f.push(g.join(""));
                for (e in d.paras)
                    f.push(e + '="' + d.paras[e] + '" ');
                f.push(" />")
            }
            d.html = f.join("");
            return d
        }
        var c = {};
        c.create = function(c, d, e) {
            var f = a.E(c);
            if (f == null)
                throw "swf: [" + c + "] 鏈壘鍒�";
            var g = b(d, e);
            f.innerHTML = g.html;
            return a.E(g.id)
        }
        ;
        c.html = function(a, c) {
            var d = b(a, c);
            return d.html
        }
        ;
        c.check = function() {
            var b = -1;
            if (a.IE)
                try {
                    var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    b = c.GetVariable("$version")
                } catch (d) {}
            else
                navigator.plugins["Shockwave Flash"] && (b = navigator.plugins["Shockwave Flash"].description);
            return b
        }
        ;
        return c
    });
    STK.register("core.util.storage", function(a) {
        var b = window.localStorage;
        if (b)
            return {
                get: function(a) {
                    return unescape(b.getItem(a))
                },
                set: function(a, c, d) {
                    b.setItem(a, escape(c))
                },
                del: function(a) {
                    b.removeItem(a)
                },
                clear: function() {
                    b.clear()
                },
                getAll: function() {
                    var a = b.length
                      , c = null
                      , d = [];
                    for (var e = 0; e < a; e++) {
                        c = b.key(e);
                        d.push(c + "=" + this.getKey(c))
                    }
                    return d.join("; ")
                }
            };
        if (window.ActiveXObject) {
            var c = document.documentElement
              , d = "localstorage";
            try {
                c.addBehavior("#default#userdata");
                c.save("localstorage")
            } catch (e) {}
            return {
                set: function(a, b) {
                    c.setAttribute(a, b);
                    c.save(d)
                },
                get: function(a) {
                    c.load(d);
                    return c.getAttribute(a)
                },
                del: function(a) {
                    c.removeAttribute(a);
                    c.save(d)
                }
            }
        }
        return {
            get: function(a) {
                var b = document.cookie.split("; ")
                  , c = b.length
                  , d = [];
                for (var e = 0; e < c; e++) {
                    d = b[e].split("=");
                    if (a === d[0])
                        return unescape(d[1])
                }
                return null
            },
            set: function(a, b, c) {
                if (!(c && c instanceof Date)) {
                    c = new Date;
                    c.setDate(c.getDate() + 1)
                }
                document.cookie = a + "=" + escape(b) + "; expires=" + c.toGMTString()
            },
            del: function(a) {
                document.cookie = a + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
            },
            clear: function() {
                var a = document.cookie.split("; ")
                  , b = a.length
                  , c = [];
                for (var d = 0; d < b; d++) {
                    c = a[d].split("=");
                    this.deleteKey(c[0])
                }
            },
            getAll: function() {
                return unescape(document.cookie.toString())
            }
        }
    });
    (function() {
        var a = STK.core
          , b = {
            tween: "core.ani.tween",
            tweenArche: "core.ani.tweenArche",
            arrCopy: "core.arr.copy",
            arrClear: "core.arr.clear",
            hasby: "core.arr.hasby",
            unique: "core.arr.unique",
            foreach: "core.arr.foreach",
            isArray: "core.arr.isArray",
            inArray: "core.arr.inArray",
            arrIndexOf: "core.arr.indexOf",
            findout: "core.arr.findout",
            domNext: "core.dom.next",
            domPrev: "core.dom.prev",
            isNode: "core.dom.isNode",
            addHTML: "core.dom.addHTML",
            insertHTML: "core.dom.insertHTML",
            setXY: "core.dom.setXY",
            contains: "core.dom.contains",
            position: "core.dom.position",
            trimNode: "core.dom.trimNode",
            insertAfter: "core.dom.insertAfter",
            insertBefore: "core.dom.insertBefore",
            removeNode: "core.dom.removeNode",
            replaceNode: "core.dom.replaceNode",
            Ready: "core.dom.ready",
            setStyle: "core.dom.setStyle",
            setStyles: "core.dom.setStyles",
            getStyle: "core.dom.getStyle",
            addClassName: "core.dom.addClassName",
            hasClassName: "core.dom.hasClassName",
            removeClassName: "core.dom.removeClassName",
            builder: "core.dom.builder",
            cascadeNode: "core.dom.cascadeNode",
            selector: "core.dom.selector",
            sizzle: "core.dom.sizzle",
            addEvent: "core.evt.addEvent",
            custEvent: "core.evt.custEvent",
            removeEvent: "core.evt.removeEvent",
            fireEvent: "core.evt.fireEvent",
            fixEvent: "core.evt.fixEvent",
            getEvent: "core.evt.getEvent",
            stopEvent: "core.evt.stopEvent",
            delegatedEvent: "core.evt.delegatedEvent",
            preventDefault: "core.evt.preventDefault",
            hotKey: "core.evt.hotKey",
            memorize: "core.func.memorize",
            bind: "core.func.bind",
            getType: "core.func.getType",
            methodBefore: "core.func.methodBefore",
            timedChunk: "core.func.timedChunk",
            funcEmpty: "core.func.empty",
            ajax: "core.io.ajax",
            jsonp: "core.io.jsonp",
            ijax: "core.io.ijax",
            scriptLoader: "core.io.scriptLoader",
            require: "core.io.require",
            jsonInclude: "core.json.include",
            jsonCompare: "core.json.compare",
            jsonClone: "core.json.clone",
            jsonToQuery: "core.json.jsonToQuery",
            queryToJson: "core.json.queryToJson",
            jsonToStr: "core.json.jsonToStr",
            strToJson: "core.json.strToJson",
            objIsEmpty: "core.obj.isEmpty",
            beget: "core.obj.beget",
            cascade: "core.obj.cascade",
            objSup: "core.obj.sup",
            parseParam: "core.obj.parseParam",
            bLength: "core.str.bLength",
            dbcToSbc: "core.str.dbcToSbc",
            leftB: "core.str.leftB",
            trim: "core.str.trim",
            encodeHTML: "core.str.encodeHTML",
            decodeHTML: "core.str.decodeHTML",
            parseURL: "core.str.parseURL",
            parseHTML: "core.str.parseHTML",
            queryString: "core.str.queryString",
            htmlToJson: "core.util.htmlToJson",
            cookie: "core.util.cookie",
            drag: "core.util.drag",
            timer: "core.util.timer",
            jobsM: "core.util.jobsM",
            listener: "core.util.listener",
            winSize: "core.util.winSize",
            pageSize: "core.util.pageSize",
            templet: "core.util.templet",
            queue: "core.util.queue",
            stack: "core.util.stack",
            swf: "core.util.swf",
            URL: "core.util.URL",
            scrollPos: "core.util.scrollPos",
            scrollTo: "core.util.scrollTo",
            getUniqueKey: "core.util.getUniqueKey",
            storage: "core.util.storage",
            pageletM: "core.util.pageletM"
        };
        for (var c in b)
            STK.shortRegister(b[c], c, "theia");
        var d = "theia_1_1"
    }
    )();
    var a = STK;
    (function(a) {
        var b = {}
          , c = function(a) {
            return b[a]
        }
          , d = function(e) {
            if (!b[e]) {
                var g = {
                    exports: {}
                };
                try {
                    a[e].call(g.exports, g, g.exports, d, c)
                } catch (h) {}
                b[e] = g.exports
            }
            return b[e]
        };
        return d("/ui")
    }
    )({
        "/ui": function(a, b, c, d) {
            function h(a, b) {
                function e(a) {
                    return g.notice(a.msg).on("hide", a.hideCallback)
                }
                function d(a) {
                    var b = g.tipConfirm(a.msg).on("hide", a.hideCallback).ok(a.okCallback).cancel(a.cancelCallback);
                    return {
                        setLayerXY: function(a) {
                            return b.beside(a)
                        },
                        aniShow: function() {},
                        aniHide: function() {},
                        destroy: function() {}
                    }
                }
                function c(a) {
                    var b = g.tipAlert(a.msg).on("hide", a.hideCallback);
                    return {
                        setLayerXY: function(a) {
                            return b.beside(a)
                        },
                        aniShow: function() {},
                        aniHide: function() {},
                        destroy: function() {}
                    }
                }
                switch (a) {
                case "alert":
                    return c(b);
                case "confirm":
                    return d(b);
                case "lite":
                    return e(b)
                }
            }
            var e = c("/css")
              , f = c("/helpers/toFunction")
              , g = {
                mlayer: f(c("/Class_mlayer"), "mlayer"),
                layer: f(c("/Class_layer"), "layer"),
                dialog: f(c("/Class_dialog"), "dialog"),
                alert: f(c("/Class_alert"), "alert"),
                confirm: f(c("/Class_confirm"), "confirm"),
                notice: f(c("/Class_notice"), "notice"),
                bubble: f(c("/Class_bubble"), "bubble"),
                card: f(c("/Class_card"), "card"),
                tipAlert: f(c("/Class_tipAlert"), "tipAlert"),
                tipConfirm: f(c("/Class_tipConfirm"), "tipConfirm"),
                mask: c("/mask"),
                scrollView: c("/Widget_scrollView"),
                badge: c("/Widget_badge"),
                suggest: c("/Widget_suggest"),
                effect: e.effect
            };
            g.focusHistory = c("/core/utils/focusHistory");
            g.mod = {
                layer: g.mlayer,
                suggest: c("/core/utils/suggest"),
                tab: c("/core/utils/tab")
            };
            g.tip = h;
            g.slider = c("/core/utils/slider");
            g.calendar = c("/calendar");
            typeof STK == "object" ? STK && STK.register("v6.conf.core.ui", function() {
                return g
            }) : window.UI = g
        },
        "/css": function(a, b, c, d) {
            function t(a, b, c, d, e) {
                function h(b) {
                    i(a, x, h);
                    clearTimeout(f);
                    m(g, function(b) {
                        l(a, b)
                    });
                    d && d()
                }
                var f, g, e = typeof arguments[arguments.length - 1] == "boolean" ? arguments[arguments.length - 1] : !1;
                if (typeof c == "function") {
                    d = c;
                    c = undefined
                }
                if (!v)
                    n(function() {
                        d && d()
                    });
                else {
                    c = c || "normal";
                    b = b || "shake";
                    g = ["UI_animated", "UI_speed_" + c, "UI_ani_" + b];
                    j(a, x, h);
                    f = setTimeout(h, p(c) + 100);
                    e === !0 ? n(function() {
                        m(g, function(b) {
                            k(a, b)
                        })
                    }) : m(g, function(b) {
                        k(a, b)
                    })
                }
            }
            function s(a, b, c) {
                a.insertRule ? a.insertRule(b + " {" + c + "}", 0) : a.addRule(b, c, 1)
            }
            function r() {
                var a = document.body.style
                  , b = a.WebkitAnimation !== undefined ? "-webkit-" : a.webkitAnimation !== undefined ? "-webkit-" : a.MozAnimation !== undefined ? "-moz-" : a.OAnimation !== undefined ? "-o-" : a.msAnimation !== undefined ? "-ms-" : a.animation !== undefined ? "" : !1;
                return b
            }
            function q() {
                var a = g("div"), b = g("div"), c;
                a.style.cssText = "width:40px;overflow:auto;height:30px;position:absolute;top:-100px;";
                b.style.cssText = "height:35px;";
                document.body.insertBefore(a, document.body.firstChild).appendChild(b);
                c = a.offsetWidth - b.offsetWidth;
                h(a);
                a = b = null;
                q = function() {
                    return c
                }
                ;
                return c
            }
            function p(a) {
                return typeof a == "number" ? a : {
                    fast: 200,
                    normal: 500,
                    slow: 1e3
                }[a] || 500
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.C
              , h = e.removeNode
              , i = e.removeEvent
              , j = e.addEvent
              , k = e.addClassName
              , l = e.removeClassName
              , m = e.foreach
              , n = f.setImmediate
              , o = {
                ".UI_frame": "position:fixed;top:0;left:0;right:0;bottom:0;overflow-y:scroll;-webkit-overflow-scrolling: touch;",
                ".UI_freezed": "position:fixed;top:0;left:0;bottom:0;overflow:hidden;right:" + q() + "px;",
                ".UI_autoHeight .UI_autoHeightCtnt": "overflow:hidden;height:0;",
                ".UI_autoHeight.UI_autoHeight_animated": "-v-transition:top 0.2s ease",
                ".UI_autoHeight.UI_autoHeight_animated .UI_autoResizeCtnt": "-v-transition:height 0.2s ease",
                ".UI_autoHeight.UI_autoHeightCtnt": "overflow:hidden;height:0;",
                ".UI_autoHeight.UI_autoHeight_animated.UI_autoResizeCtnt": "-v-transition:height 0.2s ease, top 0.2s ease",
                ".UI_scrolling": "-v-user-select:none",
                ".UI_scrollView .UI_scrollContainer": "overflow:hidden;width:100%;height:100%;position:relative;_background:url(about:blank);",
                ".UI_scrollView .UI_scrollContent": "position:relative;height:100%;width:100%;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch;margin-right:-30px;padding-right:30px;",
                ".UI_badge": "display:inline-block;vertical-align:middle;overflow:hidden;",
                ".UI_animated": "-v-animation-fill-mode: both;",
                ".UI_animated.UI_speed_normal": "-v-animation-duration:  0.5s;",
                ".UI_animated.UI_speed_fast": "-v-animation-duration:  0.2s;",
                ".UI_animated.UI_speed_slow": "-v-animation-duration:  1s;"
            }
              , u = document.getElementsByTagName("head")[0].appendChild(g("style"));
            u = u.sheet ? u.sheet : u.styleSheet;
            var v = r()
              , w = /\-v\-/g
              , x = {
                "-webkit-": "webkitAnimationEnd",
                "-moz-": "animationend",
                "-o-": "OAnimationEnd",
                "-ms-": "msAnimationEnd",
                "": "animationend"
            }[v]
              , y = {
                "-webkit-": "webkitTransitionEnd",
                "-moz-": "transitionend",
                "-o-": "OTransitionEnd",
                "-ms-": "msTransitionEnd",
                "": "transitionend"
            }[v];
            for (var z in o)
                s(u, z, o[z].replace(w, v || ""));
            b.transitionend = y;
            b.animationend = x;
            b.effectSuport = !!v;
            b.effect = t;
            b.scrollWidth = q
        },
        "/$": function(a, b, c, d) {
            a.exports = [d("/core/theia") || STK, c("/core/utils/index")]
        },
        "/core/utils/index": function(a, b, c, d) {
            a.exports = {
                count: c("/core/utils/count"),
                cssText: c("/core/utils/cssText"),
                drag: c("/core/utils/drag"),
                extend: c("/core/utils/extend"),
                fix: c("/core/utils/fix"),
                language: c("/core/utils/language"),
                layoutPos: c("/core/utils/layoutPos"),
                merge: c("/core/utils/merge"),
                parseDOM: c("/core/utils/parseDOM"),
                proxy: c("/core/utils/proxy"),
                rects: c("/core/utils/rects"),
                smartInput: c("/core/utils/smartInput"),
                textareaUtils: c("/core/utils/textareaUtils"),
                textSelection: c("/core/utils/textSelection"),
                setImmediate: c("/core/utils/setImmediate")
            }
        },
        "/core/utils/count": function(a, b, c, d) {
            function f(a) {
                var b = 41
                  , c = 140
                  , d = 20
                  , f = a
                  , g = a.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || []
                  , h = 0;
                for (var i = 0, j = g.length; i < j; i++) {
                    var k = e.core.str.bLength(g[i]);
                    if (/^(http:\/\/t.cn)/.test(g[i]))
                        continue;
                    /^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= b ? k : k <= c ? d : k - c + d : h += k <= c ? d : k - c + d;
                    f = f.replace(g[i], "")
                }
                var l = Math.ceil((h + e.core.str.bLength(f)) / 2);
                return l
            }
            var e = d("/core/theia") || STK;
            a.exports = function(a) {
                a = a.replace(/\r\n/g, "\n");
                return f(a)
            }
        },
        "/core/utils/cssText": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = function(a, b) {
                var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"), d;
                while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i)))
                    c = c.replace(d[1] + d[2] + d[3], "");
                return c
            };
            a.exports = function(a) {
                a = a || "";
                var b = []
                  , c = {
                    push: function(a, d) {
                        b.push(a + ":" + d);
                        return c
                    },
                    remove: function(a) {
                        for (var d = 0; d < b.length; d++)
                            b[d].indexOf(a + ":") == 0 && b.splice(d, 1);
                        return c
                    },
                    getStyleList: function() {
                        return b.slice()
                    },
                    getCss: function() {
                        return f(a, b.join(";"))
                    }
                };
                return c
            }
        },
        "/core/utils/drag": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a, b) {
                var c, d, f, g, h, i, j, k, l = function() {
                    m();
                    n()
                }, m = function() {
                    c = e.parseParam({
                        moveDom: a,
                        perchStyle: "border:solid #999999 2px;",
                        dragtype: null,
                        actObj: {},
                        pagePadding: [5, 5, 5, 5]
                    }, b);
                    f = c.moveDom;
                    d = {};
                    g = {};
                    h = e.drag(a, {
                        actObj: c.actObj
                    });
                    if (c.dragtype === "perch") {
                        i = e.C("div");
                        j = !1;
                        k = !1;
                        f = i
                    }
                    a.style.cursor = "move"
                }, n = function() {
                    e.custEvent.add(c.actObj, "dragStart", o);
                    e.custEvent.add(c.actObj, "dragEnd", p);
                    e.custEvent.add(c.actObj, "draging", q)
                }, o = function(b, d) {
                    document.body.style.cursor = "move";
                    var f = e.core.util.pageSize().page;
                    g = e.core.dom.position(c.moveDom);
                    g.pageX = d.pageX;
                    g.pageY = d.pageY;
                    g.height = c.moveDom.offsetHeight;
                    g.width = c.moveDom.offsetWidth;
                    g.pageHeight = f.height;
                    g.pageWidth = f.width;
                    if (c.dragtype === "perch") {
                        var h = [];
                        h.push(c.perchStyle);
                        h.push("position:absolute");
                        h.push("z-index:" + (c.moveDom.style.zIndex + 10));
                        h.push("width:" + c.moveDom.offsetWidth + "px");
                        h.push("height:" + c.moveDom.offsetHeight + "px");
                        h.push("left:" + g.l + "px");
                        h.push("top:" + g.t + "px");
                        i.style.cssText = h.join(";");
                        k = !0;
                        setTimeout(function() {
                            if (k) {
                                document.body.appendChild(i);
                                j = !0
                            }
                        }, 100)
                    }
                    a.setCapture !== undefined && a.setCapture()
                }, p = function(b, d) {
                    document.body.style.cursor = "auto";
                    a.setCapture !== undefined && a.releaseCapture();
                    if (c.dragtype === "perch") {
                        k = !1;
                        c.moveDom.style.top = i.style.top;
                        c.moveDom.style.left = i.style.left;
                        if (j) {
                            document.body.removeChild(i);
                            j = !1
                        }
                    }
                }, q = function(a, b) {
                    var d = g.t + (b.pageY - g.pageY)
                      , e = g.l + (b.pageX - g.pageX)
                      , h = d + g.height
                      , i = e + g.width
                      , j = g.pageHeight - c.pagePadding[2]
                      , k = g.pageWidth - c.pagePadding[1];
                    if (h < j && d > 0)
                        f.style.top = d + "px";
                    else {
                        var l;
                        h >= j && (l = j - g.height);
                        if (d < 0 + c.pagePadding[3] || l < 0 + c.pagePadding[3])
                            l = c.pagePadding[3];
                        f.style.top = l + "px"
                    }
                    if (i < k && e > 0)
                        f.style.left = e + "px";
                    else {
                        var m;
                        i >= k && (m = k - g.width);
                        if (e < 0 + c.pagePadding[0] || m < 0 + c.pagePadding[0])
                            m = c.pagePadding[0];
                        f.style.left = m + "px"
                    }
                };
                l();
                d.destroy = function() {
                    document.body.style.cursor = "auto";
                    typeof f.setCapture == "function" && f.releaseCapture();
                    if (c.dragtype === "perch") {
                        k = !1;
                        if (j) {
                            document.body.removeChild(i);
                            j = !1
                        }
                    }
                    e.custEvent.remove(c.actObj, "dragStart", o);
                    e.custEvent.remove(c.actObj, "dragEnd", p);
                    e.custEvent.remove(c.actObj, "draging", q);
                    h.destroy && h.destroy();
                    c = null;
                    f = null;
                    g = null;
                    h = null;
                    i = null;
                    j = null;
                    k = null
                }
                ;
                d.getActObj = function() {
                    return c.actObj
                }
                ;
                return d
            }
        },
        "/core/utils/extend": function(a, b, c, d) {
            function e(a) {
                var b = arguments.length, c = 1, d;
                while (c < b) {
                    d = arguments[c++];
                    for (var e in d)
                        d.hasOwnProperty(e) && (a[e] = d[e])
                }
                return a
            }
            a.exports = e
        },
        "/core/utils/fix": function(a, b, c, d) {
            function j(a, b, c) {
                if (!!h(a)) {
                    var d = "fixed", g, i, j, k, l = a.offsetWidth, m = a.offsetHeight, n = e.core.util.winSize(), o = 0, p = 0, q = e.core.dom.cssText(a.style.cssText);
                    if (!f) {
                        d = "absolute";
                        var r = e.core.util.scrollPos();
                        o = g = r.top;
                        p = i = r.left;
                        switch (b) {
                        case "lt":
                            g += c[1];
                            i += c[0];
                            break;
                        case "lb":
                            g += n.height - m - c[1];
                            i += c[0];
                            break;
                        case "rt":
                            g += c[1];
                            i += n.width - l - c[0];
                            break;
                        case "rb":
                            g += n.height - m - c[1];
                            i += n.width - l - c[0];
                            break;
                        case "c":
                        default:
                            g += (n.height - m) / 2 + c[1];
                            i += (n.width - l) / 2 + c[0]
                        }
                        j = k = ""
                    } else {
                        g = k = c[1];
                        i = j = c[0];
                        switch (b) {
                        case "lt":
                            k = j = "";
                            break;
                        case "lb":
                            g = j = "";
                            break;
                        case "rt":
                            i = k = "";
                            break;
                        case "rb":
                            g = i = "";
                            break;
                        case "c":
                        default:
                            g = (n.height - m) / 2 + c[1];
                            i = (n.width - l) / 2 + c[0];
                            k = j = ""
                        }
                    }
                    if (b == "c") {
                        g < o && (g = o);
                        i < p && (i = p)
                    }
                    q.push("position", d).push("top", g + "px").push("left", i + "px").push("right", j + "px").push("bottom", k + "px");
                    a.style.cssText = q.getCss()
                }
            }
            function i(a) {
                a = e.core.arr.isArray(a) ? a : [0, 0];
                for (var b = 0; b < 2; b++)
                    typeof a[b] != "number" && (a[b] = 0);
                return a
            }
            function h(a) {
                return e.core.dom.getStyle(a, "display") != "none"
            }
            var e = d("/core/theia") || STK
              , f = !(e.core.util.browser.IE6 || document.compatMode !== "CSS1Compat" && e.IE)
              , g = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
            a.exports = function(a, b, c) {
                var d, h, k = !0, l;
                if (e.core.dom.isNode(a) && g.test(b)) {
                    var m = {
                        getNode: function() {
                            return a
                        },
                        isFixed: function() {
                            return k
                        },
                        setFixed: function(b) {
                            (k = !!b) && j(a, d, h);
                            return this
                        },
                        setAlign: function(b, c) {
                            if (g.test(b)) {
                                d = b;
                                h = i(c);
                                k && j(a, d, h)
                            }
                            return this
                        },
                        destroy: function() {
                            f || f && e.core.evt.removeEvent(window, "scroll", n);
                            e.core.evt.removeEvent(window, "resize", n);
                            e.core.evt.custEvent.undefine(l)
                        }
                    };
                    l = e.core.evt.custEvent.define(m, "beforeFix");
                    m.setAlign(b, c);
                    function n(b) {
                        b = b || window.event;
                        e.core.evt.custEvent.fire(l, "beforeFix", b.type);
                        k && (!f || d == "c") && j(a, d, h)
                    }
                    f || e.core.evt.addEvent(window, "scroll", n);
                    e.core.evt.addEvent(window, "resize", n);
                    return m
                }
            }
        },
        "/core/utils/language": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            window.$LANG || (window.$LANG = {});
            a.exports = function(a) {
                var b = [].splice.call(arguments, 1, arguments.length)
                  , c = [a, $LANG].concat(b)
                  , d = e.core.util.language.apply(this, c);
                return d
            }
        },
        "/core/utils/layoutPos": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a, b, c) {
                if (!e.isNode(b))
                    throw "kit.dom.layerOutElement need element as first parameter";
                if (b === document.body)
                    return !1;
                if (!b.parentNode)
                    return !1;
                if (b.style.display === "none")
                    return !1;
                var d, f, g, h, i, j, k, l;
                d = e.parseParam({
                    pos: "left-bottom",
                    offsetX: 0,
                    offsetY: 0,
                    appendTo: undefined
                }, c);
                if (d.appendTo) {
                    j = e.getStyle(d.appendTo, "position");
                    l = d.appendTo === document.body || j === "absolute" || j === "fixed" || j === "relative";
                    l || (d.appendTo = undefined)
                }
                if (d.appendTo) {
                    f = d.appendTo;
                    f.appendChild(a)
                } else {
                    f = b;
                    if (!f)
                        return !1;
                    while (f !== document.body) {
                        f = f.parentNode;
                        if (f.style.display === "none")
                            return !1;
                        j = e.getStyle(f, "position");
                        k = f.getAttribute("layout-shell");
                        if (j === "absolute" || j === "fixed") {
                            if (k === "false")
                                continue;
                            break
                        }
                        if (k === "true" && j === "relative")
                            break
                    }
                    f.appendChild(a)
                }
                g = e.position(b, {
                    parent: f
                });
                h = {
                    w: b.offsetWidth,
                    h: b.offsetHeight
                };
                i = d.pos.split("-");
                i[0] === "left" ? a.style.left = g.l + d.offsetX + "px" : i[0] === "right" ? a.style.left = g.l + h.w + d.offsetX + "px" : i[0] === "center" && (a.style.left = g.l + h.w / 2 + d.offsetX + "px");
                i[1] === "top" ? a.style.top = g.t + d.offsetY + "px" : i[1] === "bottom" ? a.style.top = g.t + h.h + d.offsetY + "px" : i[1] === "middle" && (a.style.top = g.t + h.h / 2 + d.offsetY + "px");
                return !0
            }
        },
        "/core/utils/merge": function(a, b, c, d) {
            a.exports = function(a, b) {
                var c = {};
                for (var d in a)
                    c[d] = a[d];
                for (var d in b)
                    c[d] = b[d];
                return c
            }
        },
        "/core/utils/parseDOM": function(a, b, c, d) {
            a.exports = function(a) {
                for (var b in a)
                    a[b] && a[b].length == 1 && (a[b] = a[b][0]);
                return a
            }
        },
        "/core/utils/proxy": function(a, b, c, d) {
            function e(a, b) {
                var c = [].slice.call(arguments, 2);
                return function() {
                    return a.apply(b, [].slice.call(arguments).concat(c))
                }
            }
            a.exports = e
        },
        "/core/utils/rects": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = e.core.util.browser
              , g = {}
              , h = 5
              , i = 20
              , j = {
                t: function(a, b) {
                    return a.t > b.h
                },
                b: function(a, b) {
                    return a.b > b.h
                },
                l: function(a, b) {
                    return a.l > b.w
                },
                r: function(a, b) {
                    return a.r > b.w
                }
            }
              , k = {
                domSize: function(a) {
                    var b = e.core.dom.getSize(a);
                    return {
                        w: Math.max(b.width, e.getStyle(a, "width").replace(/px|auto/gi, "")),
                        h: Math.max(b.height, e.getStyle(a, "height").replace(/px|auto/gi, ""))
                    }
                },
                mouseXY: function(a) {
                    var b = {
                        x: a.pageX,
                        y: a.pageY
                    };
                    if (f.IE6 || f.IE7) {
                        var c = e.core.util.scrollPos();
                        b.x = b.x + c.left;
                        b.y = b.y + c.top
                    }
                    return b
                },
                getRows: function(a) {
                    var b = a.getClientRects();
                    if (f.IE6 || f.IE7) {
                        var c = [], d = {}, e;
                        for (var g = 0, h = b.length; g < h; g++) {
                            var i = b[g];
                            d[i.top] || (d[i.top] = []);
                            d[i.top].push(i)
                        }
                        for (var j in d) {
                            var k = d[j]
                              , h = k.length
                              , l = k[0];
                            h > 1 && (l.right = k[h - 1].right);
                            c.push(l)
                        }
                        b = c
                    }
                    return b
                },
                getTextRect: function(a, b) {
                    var c = e.parseParam({
                        evt: ""
                    }, b), d = e.core.util.scrollPos(), f;
                    if (!a.getClientRects) {
                        var g = k.domSize(a);
                        return {
                            width: g.w,
                            height: g.h,
                            left: "",
                            right: "",
                            top: "",
                            bottom: ""
                        }
                    }
                    var h = {
                        rows: k.getRows(a)
                    }
                      , i = k.mouseXY(c.evt)
                      , j = {
                        x: i.x - d.left,
                        y: i.y - d.top
                    };
                    for (var l = 0, m = h.rows.length; l < m; l++) {
                        var n = h.rows[l];
                        l == 0 && (f = n);
                        if (j.y > n.top && j.y < n.bottom) {
                            f = n;
                            break
                        }
                    }
                    if (e.IE) {
                        var g = k.domSize(a);
                        f = e.parseParam({
                            width: g.w,
                            height: g.h,
                            left: "",
                            right: "",
                            top: "",
                            bottom: ""
                        }, f)
                    }
                    return f
                },
                getDistance: function(a, b) {
                    var c = e.core.util.winSize()
                      , d = k.getTextRect(a, b);
                    return {
                        win: c,
                        rect: d,
                        w: d.width,
                        h: d.height,
                        t: d.top,
                        l: d.left,
                        r: c.width - d.right,
                        b: c.height - d.bottom
                    }
                },
                getSeat: function(a, b, c) {
                    var d = e.parseParam({
                        distance: i,
                        priority: "trbl"
                    }, c)
                      , f = k.getDistance(a, c)
                      , g = k.domSize(b);
                    f.area = "b";
                    var h = d.priority.split("");
                    for (var l = 0, m = h.length; l < m; l++) {
                        var n = h[l];
                        if (!j[n])
                            throw 'priority error, random use "tbrl" combination';
                        if (j[n](f, g)) {
                            f.area = n;
                            break
                        }
                    }
                    return f
                },
                setArrow: function(a) {
                    var b = e.parseParam({
                        evt: "",
                        node: "",
                        layer: "",
                        arrow: "",
                        priority: "trbl",
                        css_t: "W_arrow_bor W_arrow_bor_b",
                        css_r: "W_arrow_bor W_arrow_bor_l",
                        css_b: "W_arrow_bor W_arrow_bor_t",
                        css_l: "W_arrow_bor W_arrow_bor_r",
                        offset: h,
                        distance: 0
                    }, a);
                    if (!b.node)
                        throw "target node is undefined";
                    if (!b.layer)
                        throw "layer node is undefined";
                    if (!b.arrow)
                        throw "arrow node is undefined";
                    var c = k.getSeat(b.node, b.layer, b)
                      , d = c.area
                      , f = c.rect;
                    b.arrow.className = b["css_" + d];
                    b.arrow.style.cssText = "";
                    var g = k.domSize(b.layer), i = e.winSize().width, j = e.winSize().height, l = e.scrollPos(), m = 5, n = 16, o, p, q, r, s, t, u = 0;
                    if (d == "t" || d == "b") {
                        b.distance += (f.right - f.left) / 2;
                        f.left < i / 3 ? u = (.5 - 1 / 3) * g.w : f.left > i / 3 * 2 && (u = (.5 - 2 / 3) * g.w);
                        f.left + b.distance + g.w / 2 + u > i - m * 2 ? q = l.left + i - m - g.w : f.left + b.distance - g.w / 2 + u < m ? q = l.left + m : q = l.left + f.left + b.distance - g.w / 2 + u;
                        d == "t" ? r = f.top + l.top - b.offset - g.h : d == "b" && (r = f.bottom + l.top + b.offset);
                        s = f.left + l.left + b.distance - q - n / 2
                    }
                    if (d == "l" || d == "r") {
                        if (f.left < i / 2) {
                            d = "r";
                            b.arrow.className = b["css_" + d]
                        } else if (f.left > i / 2) {
                            d = "l";
                            b.arrow.className = b["css_" + d]
                        }
                        b.distance += (f.bottom - f.top) / 2;
                        f.top < j / 3 ? u = (.5 - 1 / 3) * g.h : f.top > j / 3 * 2 && (u = (.5 - 2 / 3) * g.h);
                        f.top + b.distance + g.h / 2 + u > j - m * 2 ? r = l.top + j - m - g.h : f.top + b.distance - g.h / 2 + u < m ? r = l.top + m : r = f.top + l.top + b.distance - g.h / 2 + u;
                        d == "l" ? q = f.left + l.left - b.offset - g.w : d == "r" && (q = f.right + l.left + b.offset);
                        t = f.top + l.top + b.distance - r - n / 2
                    }
                    b.layer.style.left = q + "px";
                    b.layer.style.top = r + "px";
                    if (s != undefined) {
                        s < 10 && (s = 10);
                        s > g.w - n - 10 && (s = g.w - n - 10);
                        b.arrow.style.left = s + "px"
                    } else if (t != undefined) {
                        t < 0 && (t = 0);
                        t > g.h && (t = g.h);
                        b.arrow.style.top = t + "px"
                    }
                    return d
                },
                setLayer: function(a) {
                    var b = e.parseParam({
                        evt: "",
                        node: "",
                        layer: "",
                        priority: "btrl",
                        offsetX: 0,
                        offsetY: 0
                    }, a);
                    if (!b.node)
                        throw "target node is undefined";
                    if (!b.layer)
                        throw "layer node is undefined";
                    var c = k.getSeat(b.node, b.layer, b), d = c.area, f = c.rect, g = k.domSize(b.layer), h = e.scrollPos(), i, j, l, m = e.winSize().width, n = g.w;
                    if (d == "t" || d == "b") {
                        i = d == "t" ? f.top + h.top - g.h + b.offsetY : f.bottom + h.top - b.offsetY;
                        j = f.left + h.left + b.offsetX;
                        l = f.right + h.left - n + b.distance;
                        l > 0 && j + n > m + h.left && (j = l)
                    } else {
                        i = f.top + h.top + b.offsetY;
                        j = d == "r" ? f.right + h.left - b.offsetX : f.left + h.left - g.w + b.offsetX
                    }
                    b.layer.style.top = i + "px";
                    b.layer.style.left = j + "px";
                    return d
                }
            };
            g.getTextRect = k.getTextRect;
            g.getDistance = k.getDistance;
            g.getSeat = k.getSeat;
            g.setArrow = k.setArrow;
            g.setLayer = k.setLayer;
            a.exports = g
        },
        "/core/utils/smartInput": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = c("/core/utils/textSelection");
            a.exports = function(a, b) {
                var c, d, g, h, i, j, k, l, m, n = "stop", o, p, q, r, s;
                c = e.parseParam({
                    notice: "",
                    currentClass: null,
                    noticeClass: null,
                    noticeStyle: null,
                    maxLength: null,
                    needLazyInput: !1,
                    LazyInputDelay: 200
                }, b);
                d = e.cascadeNode(a);
                i = f(a);
                e.custEvent.define(d, "enter");
                e.custEvent.define(d, "ctrlEnter");
                e.custEvent.define(d, "lazyInput");
                g = function() {
                    c.maxLength && e.bLength(a.value) > c.maxLength && (a.value = e.leftB(a.value, c.maxLength))
                }
                ;
                p = function() {
                    if (a.value === c.notice) {
                        a.value = "";
                        c.noticeClass != null && e.removeClassName(a, c.noticeClass)
                    }
                    c.currentClass != null && e.addClassName(a.parentNode, c.currentClass)
                }
                ;
                q = function() {
                    if (a.value === "") {
                        a.value = c.notice;
                        c.noticeClass != null && e.addClassName(a, c.noticeClass)
                    }
                    c.currentClass != null && e.removeClassName(a.parentNode, c.currentClass)
                }
                ;
                h = function() {
                    g();
                    return a.value === c.notice ? "" : a.value
                }
                ;
                r = function(a) {
                    a.keyCode === 13 && e.custEvent.fire(d, "enter", h())
                }
                ;
                s = function(a) {
                    (a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey && e.custEvent.fire(d, "ctrlEnter", h())
                }
                ;
                j = function() {
                    if (n === "stop") {
                        m = setInterval(l, c.LazyInputDelay);
                        n = "sleep"
                    }
                }
                ;
                k = function() {
                    clearInterval(m);
                    n = "stop"
                }
                ;
                l = function() {
                    if (o === a.value)
                        if (n === "weakup") {
                            e.custEvent.fire(d, "lazyInput", a.value);
                            n = "sleep"
                        } else
                            n === "waiting" && (n = "weakup");
                    else
                        n = "waiting";
                    o = a.value
                }
                ;
                if (c.needLazyInput) {
                    e.addEvent(a, "focus", j);
                    e.addEvent(a, "blur", k)
                }
                e.addEvent(a, "focus", p);
                e.addEvent(a, "blur", q);
                e.addEvent(a, "keyup", g);
                e.addEvent(a, "keydown", r);
                e.addEvent(a, "keydown", s);
                d.getValue = h;
                d.setValue = function(b) {
                    a.value = b;
                    g();
                    return d
                }
                ;
                d.setNotice = function(a) {
                    c.notice = a;
                    return d
                }
                ;
                d.setNoticeClass = function(a) {
                    c.noticeClass = a;
                    return d
                }
                ;
                d.setNoticeStyle = function(a) {
                    c.noticeStyle = a;
                    return d
                }
                ;
                d.setMaxLength = function(a) {
                    c.maxLength = a;
                    return d
                }
                ;
                d.restart = function() {
                    q()
                }
                ;
                d.startLazyInput = j;
                d.stopLazyInput = k;
                d.setCursor = i.setCursor;
                d.getCursor = i.getCursor;
                d.insertCursor = i.insertCursor;
                d.insertText = i.insertText;
                d.destroy = function() {
                    if (c.needLazyInput) {
                        e.removeEvent(a, "focus", p);
                        e.removeEvent(a, "blur", q)
                    }
                    k();
                    e.removeEvent(a, "focus", p);
                    e.removeEvent(a, "blur", q);
                    e.removeEvent(a, "keyup", g);
                    e.removeEvent(a, "keydown", r);
                    e.removeEvent(a, "keydown", s);
                    e.custEvent.undefine(d, "enter");
                    e.custEvent.undefine(d, "ctrlEnter");
                    e.custEvent.undefine(d, "lazyInput");
                    i.destroy();
                    d = null
                }
                ;
                return d
            }
        },
        "/core/utils/textSelection": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a, b) {
                var c, d;
                c = {};
                d = e.parseParam({}, b);
                var f = function(b) {
                    return e.core.dom.selectText(a, b)
                }
                  , g = function() {
                    a.__areaQuery = e.jsonToQuery(e.core.dom.textSelectArea(a))
                }
                  , h = function() {
                    a.__areaQuery = !1
                };
                e.addEvent(a, "beforedeactivate", g);
                e.addEvent(a, "active", h);
                var i = function() {
                    var b = null;
                    try {
                        b = e.core.dom.textSelectArea(a)
                    } catch (c) {
                        b = e.queryToJson(a.__areaQuery)
                    }
                    b.start === 0 && b.len === 0 && a.__areaQuery && (b = e.queryToJson(a.__areaQuery));
                    b.start = parseInt(b.start, 10);
                    b.len = parseInt(b.len, 10);
                    return b
                }
                  , j = function(b, c) {
                    var d = a.value
                      , e = c.start
                      , f = c.len || 0
                      , g = d.slice(0, e)
                      , h = d.slice(e + f, d.length);
                    a.value = g + b + h;
                    d = null;
                    g = null;
                    h = null;
                    var e = null
                      , f = null
                };
                c.setCursor = function(a) {
                    f(a)
                }
                ;
                c.getCursor = function() {
                    return i()
                }
                ;
                c.insertCursor = function(a) {
                    var b = i();
                    j(a, b);
                    b.len = a.length;
                    f(b)
                }
                ;
                c.TempletCursor = function(b) {
                    var c, d, g;
                    c = i();
                    c.len > 0 ? d = a.value.substr(c.start, c.len) : d = "";
                    g = e.templet(b, {
                        origin: d
                    });
                    j(g, c);
                    c.start = c.start + b.indexOf("#{origin");
                    c.len = g.length - b.replace(/#\{[origin].+?\}/, "").length;
                    f(c)
                }
                ;
                c.insertText = j;
                c.destroy = function() {
                    e.removeEvent(a, "beforedeactivate", g);
                    e.removeEvent(a, "active", h);
                    a = null
                }
                ;
                return c
            }
        },
        "/core/utils/textareaUtils": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = {}
              , g = document.selection;
            f.selectionStart = function(a) {
                if (!g)
                    try {
                        return a.selectionStart
                    } catch (b) {
                        return 0
                    }
                var c = g.createRange(), d, e, f = 0, h = document.body.createTextRange();
                try {
                    h.moveToElementText(a)
                } catch (b) {}
                for (f; h.compareEndPoints("StartToStart", c) < 0; f++)
                    h.moveStart("character", 1);
                return f
            }
            ;
            f.selectionBefore = function(a) {
                return a.value.slice(0, f.selectionStart(a))
            }
            ;
            f.selectText = function(a, b, c) {
                a.focus();
                if (!g)
                    a.setSelectionRange(b, c);
                else {
                    var d = a.createTextRange();
                    d.collapse(1);
                    d.moveStart("character", b);
                    d.moveEnd("character", c - b);
                    d.select()
                }
            }
            ;
            f.insertText = function(a, b, c, d) {
                a.focus();
                d = d || 0;
                if (!g) {
                    var e = a.value
                      , h = c - d
                      , i = h + b.length;
                    a.value = e.slice(0, h) + b + e.slice(c, e.length);
                    f.selectText(a, i, i)
                } else {
                    var j = g.createRange();
                    j.moveStart("character", -d);
                    j.text = b
                }
            }
            ;
            f.replaceText = function(a, b) {
                a.focus();
                var c = a.value
                  , d = f.getSelectedText(a)
                  , e = d.length;
                if (d.length == 0)
                    f.insertText(a, b, f.getCursorPos(a));
                else {
                    var h = f.getCursorPos(a);
                    if (!g) {
                        var j = h + d.length;
                        a.value = c.slice(0, h) + b + c.slice(h + e, c.length);
                        f.setCursor(a, h + b.length);
                        return
                    }
                    var i = g.createRange();
                    i.text = b;
                    f.setCursor(a, h + b.length)
                }
            }
            ;
            f.getCursorPos = function(a) {
                var b = 0;
                if (e.core.util.browser.IE) {
                    a.focus();
                    var c = null;
                    c = g.createRange();
                    var d = c.duplicate();
                    d.moveToElementText(a);
                    d.setEndPoint("EndToEnd", c);
                    a.selectionStartIE = d.text.length - c.text.length;
                    a.selectionEndIE = a.selectionStartIE + c.text.length;
                    b = a.selectionStartIE
                } else if (a.selectionStart || a.selectionStart == "0")
                    b = a.selectionStart;
                return b
            }
            ;
            f.getSelectedText = function(a) {
                var b = ""
                  , c = function(a) {
                    return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
                };
                window.getSelection ? b = c(a) : b = g.createRange().text;
                return b
            }
            ;
            f.setCursor = function(a, b, c) {
                b = b == null ? a.value.length : b;
                c = c == null ? 0 : c;
                a.focus();
                if (a.createTextRange) {
                    var d = a.createTextRange();
                    d.move("character", b);
                    d.moveEnd("character", c);
                    d.select()
                } else
                    a.setSelectionRange(b, b + c)
            }
            ;
            f.unCoverInsertText = function(a, b, c) {
                c = c == null ? {} : c;
                c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
                c.rccl = c.rccl == null ? 0 : c.rccl * 1;
                var d = a.value
                  , e = d.slice(0, c.rcs)
                  , f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
                a.value = e + b + f;
                this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
            }
            ;
            a.exports = f
        },
        "/core/utils/setImmediate": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = function() {
                return window.setImmediate ? window.setImmediate : "onreadystatechange"in document.createElement("script") ? function(a) {
                    function b() {
                        c.onreadystatechange = null;
                        e.removeNode(c);
                        a()
                    }
                    var c = document.createElement("script");
                    c.onreadystatechange = b;
                    document.documentElement.appendChild(c)
                }
                : window.postMessage ? function(a) {
                    function c(d) {
                        if (d.data === b) {
                            window.removeEventListener("message", c, !0);
                            a()
                        }
                    }
                    var b = "UI_setImmediate_" + e.getUniqueKey();
                    window.addEventListener("message", c, !0);
                    window.postMessage(b, "*")
                }
                : window.setTimeout
            }();
            a.exports = f
        },
        "/helpers/toFunction": function(a, b, c, d) {
            function p(a, b) {
                function c(c, d) {
                    return new a(o(b, c, d))
                }
                c.constructor = a;
                return c
            }
            function o(a, b, c) {
                c = c || {};
                if (n(b) === m)
                    return g(c, c);
                if (a === "alert" || a === "confirm" || a === "notice" || a === "tipAlert" || a === "tipConfirm") {
                    if (n(b) === l)
                        return g(c, b);
                    c.notice = b;
                    return c
                }
                if (n(b) === k && (b = h(b)) && b.indexOf("<") !== 0) {
                    c.id = b;
                    c.node = i(b);
                    return c
                }
                if (n(b) === k && (b = h(b)) && b.indexOf("<") === 0) {
                    c.template = b;
                    return c
                }
                if (j(b)) {
                    c.node = b;
                    return c
                }
                return n(b) === l && !j(b) ? g(c, b) : c
            }
            function n(a) {
                return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.core.json.merge
              , h = e.trim
              , i = e.E
              , j = e.isNode
              , k = "string"
              , l = "object"
              , m = "undefined";
            a.exports = p
        },
        "/Class_mlayer": function(a, b, c, d) {
            function N(a) {
                var b = C(k(a));
                return {
                    node: B(b.box),
                    nodes: j(b.list)
                }
            }
            function M(a) {
                var b = document.createDocumentFragment();
                b.appendChild(a);
                return {
                    node: a,
                    nodes: j(C(b).list)
                }
            }
            function L(a, b) {
                a.style.top = b.top + "px";
                a.style.left = b.left + "px"
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = c("/templates/layer.html")
              , h = c("/css")
              , i = f.layoutPos
              , j = f.parseDOM
              , k = f.language
              , l = f.fix
              , m = f.drag
              , n = f.extend
              , o = f.proxy
              , p = f.setImmediate
              , q = e.addEvent
              , r = e.removeEvent
              , s = e.stopEvent
              , t = e.fixEvent
              , u = e.addClassName
              , v = e.removeClassName
              , w = e.custEvent
              , x = e.core.json.merge
              , y = e.core.dom.position
              , z = e.core.dom.getSize
              , A = e.core.dom.setXY
              , B = e.core.dom.firstChild
              , C = e.builder
              , D = e.removeNode
              , E = e.contains
              , F = e.core.util.winSize
              , G = e.core.util.scrollPos
              , H = e.delegatedEvent
              , I = e.isNode
              , J = "string"
              , K = "node-type"
              , O = c("/Class_base").extend({
                init: function(a) {
                    O.__super__.init.apply(this, arguments);
                    w.define(this, ["show", "shown", "beforeShow", "hide", "hidden", "beforeHide"]);
                    var b = this._;
                    b.node ? n(b, M(b.node)) : n(b, N(b.template));
                    b.node.id = b.id;
                    b.dEvent = H(b.node);
                    if (b.draggable) {
                        var c = b.draggable === !0 ? b.node : this.getDomList(!0)[b.draggable];
                        c && (b.drag = m(c, {
                            actObj: b.node,
                            moveDom: b.node,
                            pagePadding: b.draggPadding
                        }))
                    }
                    if (b.stopClickPropagation) {
                        b.proxyStopClickPropagation = function(a) {
                            s(a)
                        }
                        ;
                        q(b.node, "click", b.proxyStopClickPropagation)
                    }
                    b.proxyClickBlankToHide = o(function(a) {
                        a = t(a);
                        try {
                            b.node != a.target && !E(b.node, a.target) && this.hide()
                        } catch (a) {}
                    }, this);
                    if (b.heightWithAni) {
                        u(b.node, "UI_autoHeight");
                        u(this.getDomList(!0).autoHeight || b.node, "UI_autoHeightCtnt")
                    }
                },
                startBoxClose: function() {
                    var a = this._;
                    a.clickBlankToHide = !0;
                    if (this.getState()) {
                        r(document, "click", a.proxyClickBlankToHide);
                        q(document, "click", a.proxyClickBlankToHide)
                    }
                },
                stopBoxClose: function() {
                    var a = this._;
                    a.clickBlankToHide = !1;
                    r(document, "click", a.proxyClickBlankToHide)
                },
                on: function(a, b, c) {
                    arguments.length > 2 ? this._.dEvent.add(a, b, c) : O.__super__.on.apply(this, arguments);
                    return this
                },
                off: function(a, b, c) {
                    arguments.length > 2 ? this._.dEvent.remove(a, b, c) : O.__super__.off.apply(this, arguments);
                    return this
                },
                trigger: function(a, b, c) {
                    I(a) ? this._.dEvent.fireDom(a, b, c) : O.__super__.trigger.apply(this, arguments);
                    return this
                },
                dEvent: function() {
                    return this._.dEvent
                },
                autoHeight: function(a) {
                    if (this._.heightWithAni) {
                        function b() {
                            r(c, h.transitionend, b);
                            r(d, h.transitionend, b);
                            clearTimeout(i);
                            v(c, "UI_autoHeight_animated");
                            v(d, "UI_autoHeight_animated")
                        }
                        var c = this._.node, d = this.getDomList(!0).autoHeight || c, e = d.offsetHeight, f;
                        d.style.height = "auto";
                        f = d.offsetHeight;
                        d.style.height = "auto";
                        d.style.height = e + "px";
                        var g, i;
                        switch (a) {
                        case "top":
                            g = 0;
                            break;
                        case "bottom":
                            g = e - f;
                            break;
                        case "center":
                        case "middle":
                        default:
                            g = (e - f) / 2
                        }
                        setTimeout(function() {
                            u(c, "UI_autoHeight_animated");
                            u(d, "UI_autoHeight_animated");
                            q(c, h.transitionend, b);
                            q(d, h.transitionend, b);
                            i = setTimeout(b, 250);
                            c.style.top = parseInt(c.style.top) + g + "px";
                            d.style.height = f + "px"
                        }, 10)
                    }
                    return this
                },
                show: function(a) {
                    var b = this._;
                    if (!!b) {
                        a = I(a) ? a : b.node;
                        r(document, "click", b.proxyClickBlankToHide);
                        this.trigger("beforeShow");
                        delete b.hidding;
                        b.appendTo.appendChild(a);
                        this.trigger("show");
                        if (b.showWithAni) {
                            var c = b.showWithAni.split(":");
                            h.effect(b.node, c[0], c[1], o(function() {
                                this.trigger("shown")
                            }, this))
                        } else
                            this.trigger("shown");
                        if (b.heightWithAni) {
                            var d = this.getDomList(!0).autoHeight || b.node;
                            if (d) {
                                d.style.height = "auto";
                                d.style.height = d.offsetHeight + "px"
                            }
                        }
                        b.clickBlankToHide && setTimeout(o(function() {
                            q(document, "click", b.proxyClickBlankToHide)
                        }, this), 100);
                        return this
                    }
                },
                hide: function(a) {
                    var b = this._;
                    if (!!b) {
                        a = I(a) ? a : b.node;
                        this.trigger("beforeHide");
                        b.hidding = !0;
                        var c = o(function() {
                            if (b.hidding === !0) {
                                D(a);
                                delete b.hidding
                            }
                            this.trigger("hidden")
                        }, this);
                        if (b.hideWithAni) {
                            var d = b.hideWithAni.split(":");
                            h.effect(b.node, d[0], d[1], c);
                            this.trigger("hide")
                        } else {
                            this.trigger("hide");
                            p(c)
                        }
                        b.clickBlankToHide && r(document, "click", b.proxyClickBlankToHide);
                        b.autoRelease && setTimeout(o(this.destroy, this), 5e3);
                        return this
                    }
                },
                setTop: function(a) {
                    return this.show(a)
                },
                getDomList: function(a) {
                    var b = this._;
                    if (a) {
                        var c = b.node.getAttribute(K)
                          , d = C(b.node).list;
                        c && (d[c] === undefined ? d[c] = [b.node] : d[c].push(b.node));
                        b.nodes = j(d)
                    }
                    return b.nodes
                },
                getState: function() {
                    return !!this._ && E(document.body, this._.node) && this._.node.style.visibility != "hidden"
                },
                getID: function() {
                    return this._.node.id
                },
                getOuter: function() {
                    return this._.node
                },
                getBox: function() {
                    return this._.node
                },
                html: function(a, b) {
                    b = b || this._.node;
                    b.innerHTML = "";
                    typeof a === J ? b.innerHTML = a || "" : b.appendChild(a);
                    return this
                },
                setPosition: function(a) {
                    a.top = a.t = a.top || a.t || 0;
                    a.left = a.l = a.left || a.l || 0;
                    this._.node.parentNode === document.body ? L(this._.node, a) : A(this._.node, a);
                    return this
                },
                getPosition: function(a) {
                    var b = this._
                      , c = z(b.node)
                      , d = y(b.node);
                    switch (a) {
                    case "topright":
                        d.l = d.left = d.left + c.width;
                        break;
                    case "bottomleft":
                        d.t = d.top = d.top + c.height;
                        break;
                    case "bottomright":
                        d.l = d.left = d.left + c.width;
                        d.t = d.top = d.top + c.height;
                        break;
                    default:
                    }
                    return d
                },
                setLayoutPos: function(a, b) {
                    i(this._.node, a, b);
                    return this
                },
                beside: function(a, b) {
                    b = b || {};
                    var c = b.pos || "bottom-middle"
                      , d = c.split("-")
                      , e = this.getSize()
                      , f = d[0]
                      , g = d[1]
                      , h = b.offsetX || 0
                      , i = b.offsetY || 0;
                    switch (f) {
                    case "top":
                        i -= e.height;
                        break;
                    case "left":
                        h -= e.width
                    }
                    switch (g) {
                    case "right":
                        if (f === "top" || f === "bottom")
                            h -= e.width;
                        break;
                    case "bottom":
                        if (f === "left" || f === "right")
                            i -= e.height;
                        break;
                    case "middle":
                        if (f === "left" || f === "right")
                            i -= e.height / 2;
                        if (f === "top" || f === "bottom")
                            h -= e.width / 2
                    }
                    c = {
                        "top-left": "left-top",
                        "top-right": "right-top",
                        "top-middle": "center-top",
                        "top-center": "center-top",
                        "right-top": "right-top",
                        "right-bottom": "right-bottom",
                        "right-middle": "right-middle",
                        "right-center": "right-middle",
                        "bottom-left": "left-bottom",
                        "bottom-right": "right-bottom",
                        "bottom-middle": "center-bottom",
                        "bottom-center": "center-bottom",
                        "left-top": "left-top",
                        "left-bottom": "left-bottom",
                        "left-middle": "left-middle",
                        "left-center": "left-middle"
                    }[c];
                    return this.setLayoutPos(a, {
                        pos: c,
                        offsetX: h,
                        offsetY: i,
                        appendTo: b.appendTo
                    })
                },
                setMiddle: function() {
                    var a = F()
                      , b = this.getSize()
                      , c = G()
                      , d = Math.max((a.height - b.height) / 2, 0) + c.top
                      , e = Math.max((a.width - b.width) / 2, 0) + c.left;
                    return this.setPosition({
                        top: d,
                        left: e
                    })
                },
                setAlign: function(a) {
                    a = x({
                        type: "c",
                        offset: [0, 0]
                    }, a);
                    this._.domFix = l(this._.node, a.type, a.offset);
                    return this
                },
                getSize: function() {
                    return z(this._.node)
                },
                setIndex: function(a) {
                    this._.node.style.zIndex = a;
                    return this
                },
                destroy: function() {
                    var a = this._;
                    if (a) {
                        a.node && D(a.node);
                        a.dEvent && a.dEvent.destroy();
                        a.domFix && a.domFix.destroy();
                        a.drag && a.drag.destroy();
                        this._.proxyStopClickPropagation && r(a.node, "click", this._.proxyStopClickPropagation);
                        this._.proxyClickBlankToHide && r(document, "click", this._.proxyClickBlankToHide);
                        a.domFix = a.drag = a.dEvent = null;
                        O.__super__.destroy.apply(this, arguments)
                    }
                }
            });
            O.defalutOpts = n({}, O.defalutOpts, {
                id: "layer_" + e.core.util.getUniqueKey(),
                node: null,
                template: g,
                appendTo: document.body,
                draggable: !1,
                draggPadding: [5, 5, 5, 5],
                showWithAni: "fadeInDown:fast",
                hideWithAni: "fadeOutUp:fast",
                heightWithAni: !1,
                stopClickPropagation: !1,
                clickBlankToHide: !1,
                autoRelease: !1
            });
            a.exports = O
        },
        "/templates/layer.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer"></div>'
        },
        "/Class_base": function(a, b, c, d) {
            function k() {
                this.init.apply(this, arguments)
            }
            function j(a, b) {
                var c = this, d;
                a && a.hasOwnProperty("constructor") ? d = a.constructor : d = function() {
                    return c.apply(this, arguments)
                }
                ;
                h(d, c, b);
                var e = function() {
                    this.constructor = d
                };
                e.prototype = c.prototype;
                d.prototype = new e;
                a && h(d.prototype, a);
                d.__super__ = c.prototype;
                return d
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.core.json.merge
              , h = f.extend
              , i = e.custEvent;
            h(k.prototype, {
                init: function(a) {
                    this._ = g(this.constructor.defalutOpts, a)
                },
                destroy: function() {
                    i.undefine(this);
                    this._ = null
                }
            }, {
                on: function(a, b) {
                    i.define(this, a);
                    i.add(this, a, b);
                    return this
                },
                once: function(a, b) {
                    i.define(this, a);
                    i.once(this, a, b);
                    return this
                },
                off: function(a, b) {
                    i.remove(this, a, b);
                    return this
                },
                trigger: function(a, b) {
                    i.fire(this, a, b);
                    return this
                }
            });
            k.extend = j;
            k.defalutOpts = {};
            a.exports = k
        },
        "/Class_layer": function(a, b, c, d) {
            function F() {
                q(w, y)
            }
            function E() {
                p(w, y)
            }
            function D() {
                return r(w, y)
            }
            function C(a, b) {
                return a === w ? x.scrollTop = w.scrollTop = b : a.scrollTop = b
            }
            function B(a) {
                return a === w ? Math.max(window.pageYOffset, x.scrollTop, w.scrollTop) : a.scrollTop
            }
            function A() {
                var a;
                while (a = v[v.length - 1]) {
                    if (a && a.getState())
                        return a;
                    a.pop()
                }
                return null
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = c("/mask")
              , h = c("/css")
              , i = e.C
              , j = e.builder
              , k = e.core.dom.firstChild
              , l = e.scrollPos
              , m = e.removeNode
              , n = e.foreach
              , o = e.arrIndexOf
              , p = e.addClassName
              , q = e.removeClassName
              , r = e.core.dom.hasClassName
              , s = e.hotKey
              , t = f.extend
              , u = f.proxy
              , v = []
              , w = document.body
              , x = document.documentElement
              , y = "UI_freezed"
              , z = "px";
            s.add(document.documentElement, "esc", function() {
                var a = A();
                a && a.hide()
            }, {
                type: "keyup",
                disableInInput: !0
            });
            var G = c("/Class_mlayer").extend({
                init: function() {
                    G.__super__.init.apply(this, arguments);
                    this.on("show", u(function() {
                        this._.showWithSetMiddle && this.setMiddle();
                        this._.needMask && g.showUnderNode(this._.node)
                    }, this));
                    this.on("beforeShow", function() {
                        this._.lastFocus = document.activeElement
                    });
                    this.on("hidden", function() {
                        this._.lastFocus.focus();
                        delete this._.lastFocus
                    })
                },
                show: function() {
                    G.__super__.show.apply(this, arguments);
                    if (!this._.focusNode) {
                        this._.focusNode = i("div");
                        this._.focusNode.setAttribute("tabIndex", "0")
                    }
                    this._.node.firstChild ? this._.node.insertBefore(this._.focusNode, this._.node.firstChild).focus() : this._.node.appendChild(this._.focusNode).focus();
                    v.push(this);
                    return this
                },
                hide: function() {
                    var a = this.getState();
                    G.__super__.hide.apply(this, arguments);
                    if (a) {
                        this._.needMask && g.back();
                        v.splice(o(this, v), 1)
                    }
                    return this
                },
                setTop: function() {
                    return G.__super__.setTop.apply(this, [this._.frame])
                },
                isFreeze: function() {
                    return r(this._.frame, y)
                },
                freeze: function() {
                    var a = this._.frame;
                    if (this.isFreeze() !== !0 && !$IE6) {
                        a.style.top = -B(a) + z;
                        p(a, y);
                        C(a, 0);
                        return this
                    }
                },
                unfreeze: function() {
                    var a = this._.frame, b;
                    if (this.isFreeze() !== !1 && !$IE6) {
                        b = -parseInt(a.style.top);
                        q(a, y);
                        a.style.top = "";
                        C(a, b);
                        return this
                    }
                }
            });
            G.defalutOpts = t({}, G.defalutOpts, {
                needMask: !0,
                showWithAni: "bounceIn:fast",
                hideWithAni: "bounceOut:fast",
                showWithSetMiddle: !0
            });
            a.exports = G
        },
        "/mask": function(a, b, c, d) {
            function r(a) {
                var b;
                (b = a.getAttribute(m)) || a.setAttribute(m, b = e.getUniqueKey());
                return ">" + a.tagName.toLowerCase() + "[" + m + '="' + b + '"]'
            }
            function q() {
                i = e.C("div");
                var a = '<div node-type="outer">';
                e.core.util.browser.IE6 && (a += '<div style="position:absolute;width:100%;height:100%;"></div>');
                a += "</div>";
                i = e.builder(a).list.outer[0];
                document.body.appendChild(i);
                l = !0;
                k = g(i, "lt");
                var b = function() {
                    var a = e.core.util.winSize();
                    i.style.cssText = e.core.dom.cssText(i.style.cssText).push("width", a.width + "px").push("height", a.height + "px").getCss()
                };
                p.add(k, "beforeFix", b);
                b()
            }
            var e = c("/$")[0], f = c("/$")[1], g = f.fix, h, i, j = [], k, l = !1, m = "STK-Mask-Key", n = e.core.dom.setStyle, o = e.core.dom.getStyle, p = e.core.evt.custEvent, s = {
                getNode: function() {
                    return i
                },
                show: function(a, b) {
                    clearTimeout(h);
                    if (l) {
                        a = e.core.obj.parseParam({
                            opacity: .3,
                            background: "#000000"
                        }, a);
                        i.style.background = a.background;
                        n(i, "opacity", a.opacity);
                        i.style.display = "";
                        k.setAlign("lt");
                        b && b()
                    } else {
                        q();
                        s.show(a, b)
                    }
                    return s
                },
                hide: function() {
                    h = setTimeout(function() {
                        i.style.display = "none"
                    }, 10);
                    j = [];
                    return s
                },
                showUnderNode: function(a, b) {
                    e.isNode(a) && s.show(b, function() {
                        n(i, "zIndex", o(a, "zIndex"));
                        var b = r(a)
                          , c = e.core.arr.indexOf(b, j);
                        c != -1 && j.splice(c, 1);
                        j.push(b);
                        e.core.dom.insertElement(a, i, "beforebegin")
                    });
                    return s
                },
                back: function() {
                    if (j.length < 1)
                        return s;
                    var a, b;
                    j.pop();
                    if (j.length < 1)
                        s.hide();
                    else if ((b = j[j.length - 1]) && (a = e.sizzle(b, document.body)[0])) {
                        n(i, "zIndex", o(a, "zIndex"));
                        e.core.dom.insertElement(a, i, "beforebegin")
                    } else
                        s.back();
                    return s
                },
                resetSize: function() {
                    var a = e.core.util.winSize();
                    i.style.cssText = e.core.dom.cssText(i.style.cssText).push("width", a.width + "px").push("height", a.height + 22 + "px").getCss();
                    return s
                },
                destroy: function() {
                    p.remove(k);
                    i.style.display = "none"
                }
            };
            a.exports = s
        },
        "/Class_dialog": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.IE
              , h = f.extend
              , i = c("/templates/dialog.html")
              , j = f.proxy
              , k = e.addEvent
              , l = e.removeEvent
              , m = e.core.json.merge
              , n = e.core.dom.insertElement
              , o = c("/Class_layer").extend({
                init: function(a) {
                    o.__super__.init.apply(this, arguments);
                    this._.title && this.setTitle(this._.title);
                    this._.content && this.setContent(this._.content);
                    this._.proxyClose = j(this.hide, this);
                    this.getDomList().close && k(this.getDomList().close, "click", this._.proxyClose)
                },
                setTitle: function(a) {
                    return this.html(a || "", this.getDomList(!0).title)
                },
                setContent: function(a) {
                    return this.html(a || "", this.getDomList(!0).inner)
                },
                appendChild: function(a) {
                    this.getDomList(!0).inner.appendChild(a);
                    return this
                },
                insertElement: function(a, b) {
                    n(this.getDomList(!0).inner, a, b);
                    return this
                },
                hide: function() {
                    if (this.getState() && typeof this._.beforeHideFn == "function" && this._.beforeHideFn() === !1)
                        return !1;
                    return o.__super__.hide.apply(this, arguments)
                },
                clearContent: function() {
                    return this.setContent("")
                },
                setBeforeHideFn: function(a) {
                    this._.beforeHideFn = a;
                    return this
                },
                clearBeforeHideFn: function() {
                    this._.beforeHideFn = null;
                    return this
                },
                rebindClose: function() {
                    this.getDomList().close && l(this.getDomList().close, "click", this._.proxyClose);
                    if (this.getDomList(!0).close) {
                        l(this.getDomList().close, "click", this._.proxyClose);
                        k(this.getDomList().close, "click", this._.proxyClose)
                    }
                    return this
                },
                destroy: function() {
                    if (this._) {
                        this.getDomList(!0).close && this._.proxyClose && l(this.getDomList().close, "click", this._.proxyClose);
                        return o.__super__.destroy.apply(this, arguments)
                    }
                }
            });
            o.defalutOpts = h({}, o.defalutOpts, {
                template: i,
                draggable: "title"
            });
            a.exports = o
        },
        "/templates/dialog.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer">\n\t<div class="content" node-type="autoHeight">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a node-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner"></div>\n\t</div>\n</div>'
        },
        "/Class_alert": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.foreach
              , h = e.funcEmpty
              , i = e.custEvent
              , j = f.language
              , k = f.proxy
              , l = f.extend
              , m = c("/templates/alert.html")
              , n = c("/jsons/icons.json")
              , o = c("/helpers/render")
              , p = c("/Class_dialog").extend({
                init: function(a) {
                    p.__super__.init.apply(this, arguments);
                    i.define(this, ["ok"]);
                    this._.textSmall && (this._.notice = [this._.notice, this._.textSmall]);
                    this._.notice = [].concat(this._.notice);
                    this.setTitle(this._.title);
                    this.setNotice(this._.notice);
                    this.setIcon(this._.icon);
                    this.ok(this._.okText, this._.OK);
                    this.on("ok", "click", k(function() {
                        this._.alertIsOK = !0;
                        this.hide()
                    }, this));
                    this.show()
                },
                setNotice: function(a) {
                    var b = "";
                    g([].concat(a), function(a, c) {
                        var d = c === 0 ? "S_txt1" : "S_txt2";
                        b += o('<p class="{className}">{text}</p>', {
                            className: d,
                            text: a || ""
                        })
                    });
                    this.getDomList(!0).text.innerHTML = b;
                    return this
                },
                setIcon: function(a) {
                    this.getDomList(!0).icon.innerHTML = n[a] || "";
                    return this
                },
                ok: function(a, b) {
                    if (typeof a == "function") {
                        b = a;
                        a = undefined
                    }
                    typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
                    this.getDomList(!0).ok.innerHTML = this._.okText;
                    this.on("ok", b || h);
                    return this
                },
                show: function() {
                    var a = p.__super__.show.apply(this, arguments);
                    this.getDomList(!0).ok.focus();
                    return a
                },
                hide: function() {
                    this._.alertIsOK && this.trigger("ok");
                    p.__super__.hide.apply(this, arguments);
                    setTimeout(k(this.destroy, this), 2e3);
                    return this
                }
            });
            p.defalutOpts = l({}, p.defalutOpts, {
                template: m,
                title: j("提示"),
                okText: j("确定"),
                icon: "succB"
            });
            a.exports = p
        },
        "/templates/alert.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="W_layer_btn S_bg1">\n\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" action-type="ok" node-type="ok"></a>\n\t\t</div>\n\t</div>\n</div>'
        },
        "/jsons/icons.json": function(a, b, c, d) {
            a.exports = {
                succ: '<span class="W_icon icon_succ"></span>',
                succM: '<span class="W_icon icon_succM"></span>',
                succB: '<span class="W_icon icon_succB"></span>',
                delS: '<span class="W_icon icon_delS"></span>',
                delM: '<span class="W_icon icon_delM"></span>',
                delB: '<span class="W_icon icon_delB"></span>',
                errorS: '<span class="W_icon icon_errorS"></span>',
                errorM: '<span class="W_icon icon_errorM"></span>',
                errorB: '<span class="W_icon icon_errorB"></span>',
                askS: '<span class="W_icon icon_askS"></span>',
                questionM: '<span class="W_icon icon_questionM"></span>',
                questionB: '<span class="W_icon icon_questionB"></span>',
                warnS: '<span class="W_icon icon_warnS"></span>',
                warnM: '<span class="W_icon icon_warnM"></span>',
                warnB: '<span class="W_icon icon_warnB"></span>',
                rederrorS: '<span class="W_icon icon_rederrorS"></span>',
                rederrorM: '<span class="W_icon icon_rederrorM"></span>',
                rederrorB: '<span class="W_icon icon_rederrorB"></span>'
            }
        },
        "/helpers/render": function(a, b, c, d) {
            function e(a, b) {
                return a.replace(/\{([0-9a-zA-Z_]+)\}/g, function(a, c) {
                    return b[c]
                })
            }
            a.exports = e
        },
        "/Class_confirm": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.foreach
              , h = e.custEvent
              , i = e.funcEmpty
              , j = f.language
              , k = f.proxy
              , l = f.extend
              , m = c("/templates/confirm.html")
              , n = c("/jsons/icons.json")
              , o = c("/helpers/render")
              , p = c("/Class_dialog").extend({
                init: function() {
                    p.__super__.init.apply(this, arguments);
                    h.define(this, ["ok", "cancel"]);
                    this._.textSmall && (this._.notice = [this._.notice, this._.textSmall]);
                    this._.notice = [].concat(this._.notice);
                    this.setTitle(this._.title);
                    this.setNotice(this._.notice);
                    this.setIcon(this._.icon);
                    this.ok(this._.okText, this._.OK);
                    this.cancel(this._.cancelText, this._.cancel);
                    this.on("ok", "click", k(function() {
                        this._.confirmIsOK = !0;
                        this.hide()
                    }, this));
                    this.on("cancel", "click", k(this.hide, this));
                    this.show()
                },
                setNotice: function(a) {
                    var b = "";
                    g([].concat(a), function(a, c) {
                        var d = c === 0 ? "S_txt1" : "S_txt2";
                        b += o('<p class="{className}">{text}</p>', {
                            className: d,
                            text: a || ""
                        })
                    });
                    this.getDomList(!0).text.innerHTML = b;
                    return this
                },
                setIcon: function(a) {
                    this.getDomList(!0).icon.innerHTML = n[a] || "";
                    return this
                },
                ok: function(a, b) {
                    if (typeof a == "function") {
                        b = a;
                        a = undefined
                    }
                    typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
                    this.getDomList(!0).ok.innerHTML = this._.okText;
                    this.on("ok", b || i);
                    return this
                },
                cancel: function(a, b) {
                    if (typeof a == "function") {
                        b = a;
                        a = undefined
                    }
                    typeof a == "string" && (this._.cancelText = "<span>" + a + "</span>");
                    this.getDomList(!0).cancel.innerHTML = this._.cancelText;
                    this.on("cancel", b || i);
                    return this
                },
                show: function() {
                    var a = p.__super__.show.apply(this, arguments);
                    this.getDomList(!0).ok.focus();
                    return a
                },
                hide: function() {
                    this._.confirmIsOK ? this.trigger("ok") : this.trigger("cancel");
                    p.__super__.hide.apply(this, arguments);
                    setTimeout(k(this.destroy, this), 2e3);
                    return this
                }
            });
            p.defalutOpts = l({}, p.defalutOpts, {
                template: m,
                title: j("提示"),
                okText: j("确定"),
                cancelText: j("取消"),
                icon: "questionB"
            });
            a.exports = p
        },
        "/templates/confirm.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="title" class="W_layer_title"></div>\n\t\t<div class="W_layer_close"><a href="javascript:void(0);" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="W_layer_btn S_bg1">\n\t\t\t<a href="javascript:void(0);" class="W_btn_a btn_34px" node-type="ok" action-type="ok"></a>\n\t\t\t<a href="javascript:void(0);" class="W_btn_b btn_34px" node-type="cancel" action-type="cancel"></a>\n\t\t</div>\n\t</div>\n</div>\n'
        },
        "/Class_notice": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.foreach
              , h = e.funcEmpty
              , i = f.language
              , j = f.proxy
              , k = f.extend
              , l = c("/jsons/icons.json")
              , m = c("/templates/notice.html")
              , n = c("/helpers/render")
              , o = c("/Class_layer").extend({
                init: function(a) {
                    o.__super__.init.apply(this, arguments);
                    if (this._textLarge || this._textSmall)
                        this._.notice = [this._textLarge, this._textSmall];
                    this._.notice = [].concat(this._.notice);
                    this.setNotice(this._.notice);
                    this.setIcon(this._.icon);
                    this.show().setMiddle();
                    setTimeout(j(this.hide, this), this._.hideDelay)
                },
                setNotice: function(a) {
                    var b = "";
                    g([].concat(a), function(a, c) {
                        var d = c === 0 ? "S_txt1" : "S_txt2";
                        b += n('<p class="{className}">{text}</p>', {
                            className: d,
                            text: a || ""
                        })
                    });
                    this.getDomList(!0).text.innerHTML = b;
                    return this
                },
                setIcon: function(a) {
                    this.getDomList(!0).icon.innerHTML = l[a] || "";
                    return this
                },
                hide: function() {
                    o.__super__.hide.apply(this, arguments);
                    setTimeout(j(this.destroy, this), 2e3);
                    return this
                }
            });
            o.defalutOpts = k({}, o.defalutOpts, {
                template: m,
                icon: "succB",
                hideDelay: 1e3
            });
            a.exports = o
        },
        "/templates/notice.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer">\n\t<div class="content">\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point" >\n\t\t\t\t<dl class="point clearfix">\n\t\t\t\t\t<dt node-type="icon"></dt>\n\t\t\t\t\t<dd node-type="text"></dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>'
        },
        "/Class_bubble": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.C
              , h = e.replaceNode
              , i = e.core.dom.getSize
              , j = e.isNode
              , k = e.funcEmpty
              , l = e.getStyle
              , m = e.position
              , n = e.contains
              , i = e.core.dom.getSize
              , o = e.core.dom.insertElement
              , p = e.removeEvent
              , q = e.addEvent
              , r = f.proxy
              , s = f.extend
              , t = c("/templates/bubble.html")
              , u = 14
              , v = c("/Class_mlayer").extend({
                init: function() {
                    v.__super__.init.apply(this, arguments);
                    this._.proxyClose = r(this.hide, this);
                    this.getDomList().close && q(this.getDomList().close, "click", this._.proxyClose);
                    this.on("show", r(function() {
                        this._.showWithSetWidth && !this.getBox().style.width.length && this.fixWidth()
                    }, this))
                },
                setContent: function(a) {
                    return this.html(a || "", this.getDomList(!0).inner)
                },
                fixWidth: function() {
                    var a = this.getBox();
                    if (n(document.body, a)) {
                        var b = e.C("span");
                        h(b, a);
                        document.body.appendChild(a);
                        this.getBox().style.width = "";
                        this.getBox().style.width = this.getBox().offsetWidth + 1 + "px";
                        h(a, b)
                    }
                },
                appendChild: function(a) {
                    this.getDomList(!0).inner.appendChild(a);
                    return this
                },
                insertElement: function(a, b) {
                    o(this.getDomList(!0).inner, a, b);
                    return this
                },
                clearContent: function() {
                    return this.setContent("")
                },
                setArrow: function(a, b, c) {
                    var d, e, f = this.getDomList(!0).arrow, g = this.getSize(), h = {
                        left: "right",
                        top: "bottom",
                        right: "left",
                        bottom: "top"
                    };
                    switch (a) {
                    case "top":
                        d = "W_arrow_bor W_arrow_bor_t";
                        e = "left";
                        break;
                    case "right":
                        d = "W_arrow_bor W_arrow_bor_r";
                        e = "top";
                        break;
                    case "bottom":
                        d = "W_arrow_bor W_arrow_bor_b";
                        e = "left";
                        break;
                    case "left":
                        d = "W_arrow_bor W_arrow_bor_l";
                        e = "top"
                    }
                    if (d) {
                        f.className = d;
                        if (b !== undefined) {
                            g = g[{
                                left: "width",
                                top: "height"
                            }[e]];
                            b = parseFloat(b);
                            f.style.top = f.style.right = f.style.bottom = f.style.left = "";
                            c && (e = h[e]);
                            f.style[e] = Math.min(Math.max(b, 0), g - u) + "px";
                            f.style[h[e]] = "auto"
                        }
                    }
                    return this
                },
                beside: function(a, b) {
                    b = b || {};
                    var c = b.pos || "top-middle", d = c.split("-"), e = b.offsetX || 0, f = b.offsetY || 0, g, h, i = this.getSize();
                    switch (d[0]) {
                    case "top":
                        g = "bottom";
                        f -= u;
                        switch (d[1]) {
                        case "left":
                            h = 10;
                            break;
                        case "right":
                            h = -10;
                            break;
                        case "middle":
                            h = (i.width - u) / 2
                        }
                        break;
                    case "right":
                        g = "left";
                        e += u;
                        switch (d[1]) {
                        case "top":
                            h = 10;
                            break;
                        case "bottom":
                            h = -10;
                            break;
                        case "middle":
                            h = (i.height - u) / 2
                        }
                        break;
                    case "bottom":
                        g = "top";
                        f += u;
                        switch (d[1]) {
                        case "left":
                            h = 10;
                            break;
                        case "right":
                            h = -10;
                            break;
                        case "middle":
                            h = (i.width - u) / 2
                        }
                        break;
                    case "left":
                        g = "right";
                        e -= u;
                        switch (d[1]) {
                        case "top":
                            h = 10;
                            break;
                        case "bottom":
                            h = -10;
                            break;
                        case "middle":
                            h = (i.height - u) / 2
                        }
                    }
                    this.setArrow(g, Math.abs(h), h < 0);
                    v.__super__.beside.apply(this, [a, {
                        pos: c,
                        offsetX: e,
                        offsetY: f,
                        appendTo: b.appendTo
                    }]);
                    return this
                },
                setAlignPos: function(a, b, c) {
                    var d = this.getBox()
                      , e = this.getDomList(!0).arrow;
                    c = s({
                        offset: {
                            left: 0,
                            top: 0
                        },
                        arrowOffset: 0,
                        align: "left",
                        fail: r(function() {
                            this.beside(a, {
                                pos: "bottom-middle"
                            })
                        }, this)
                    }, c);
                    if (!!j(a) && !!j(b)) {
                        var f = a, g;
                        while (f !== document.body) {
                            f = f.parentNode;
                            g = l(f, "position");
                            if (g === "absolute")
                                break
                        }
                        f.appendChild(d);
                        g = m(f);
                        g || (g = {
                            l: 0,
                            t: 0
                        });
                        var h = m(b), k = m(a), n = i(a), o = 6, p, q, t, v = c.offset, w = c.arrowOffset, x = i(d), y = i(b), z = 2;
                        if (c.align === "left") {
                            if (x.width < k.l - h.l + Math.ceil(n.width / 2)) {
                                c.fail();
                                return
                            }
                        } else if (h.l + y.width - k.l - Math.ceil(n.width / 2) > x.width) {
                            c.fail();
                            return
                        }
                        c.align === "left" ? p = h.l - z : p = h.l + y.width - x.width + z;
                        q = k.t + n.height + o;
                        t = k.l + Math.ceil((n.width - u) / 2) - p;
                        q -= g.t;
                        p -= g.l;
                        q += v.top;
                        p += v.left;
                        t += w;
                        d.style.left = p + "px";
                        d.style.top = q + "px";
                        e && (e.style.left = t + "px");
                        return this
                    }
                },
                rebindClose: function() {
                    this.getDomList().close && p(this.getDomList().close, "click", this._.proxyClose);
                    if (this.getDomList(!0).close) {
                        p(this.getDomList().close, "click", this._.proxyClose);
                        q(this.getDomList().close, "click", this._.proxyClose)
                    }
                    return this
                },
                destroy: function() {
                    if (this._) {
                        this.getDomList(!0).close && this._.proxyClose && p(this.getDomList().close, "click", this._.proxyClose);
                        return v.__super__.destroy.apply(this, arguments)
                    }
                }
            });
            v.defalutOpts = s({}, v.defalutOpts, {
                template: t,
                showWithAni: "fadeInUp:fast",
                hideWithAni: "fadeOutDown:fast",
                showWithSetWidth: !0
            });
            a.exports = v
        },
        "/templates/bubble.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content">\n\t<div class="W_layer_close"><a href="javascript:void(0)" node-type="close" class="W_ficon ficon_close S_ficon">X</a></div>\n\t\t<div node-type="inner">\n\t\t\t<div class="layer_point"></div>\n\t\t</div>\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
        },
        "/Class_card": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = f.rects
              , h = f.setImmediate
              , i = f.proxy
              , j = f.extend
              , k = c("/css")
              , l = {
                t: ["showWithAniOnTop", "hideWithAniOnTop"],
                r: ["showWithAniOnRight", "hideWithAniOnRight"],
                b: ["showWithAniOnBottom", "hideWithAniOnBottom"],
                l: ["showWithAniOnLeft", "hideWithAniOnLeft"]
            }
              , m = c("/Class_bubble").extend({
                showByTarget: function(a, b) {
                    this._.lastTarget = a;
                    var c = this.getState(), d, e;
                    this._.showWithAni = null;
                    this.show();
                    this._.lastPos = d = g.setArrow({
                        evt: b,
                        node: a,
                        layer: this.getBox(),
                        arrow: this.getDomList(!0).arrow,
                        priority: this._.priority
                    });
                    e = l[d] && l[d][0];
                    e = (this._[e] || "").split(":");
                    c || e[0] && e[0].length && k.effect(this._.node, e[0], e[1]);
                    return this
                },
                hide: function() {
                    var a = l[this._.lastPos] && l[this._.lastPos][1];
                    this._.hideWithAni = this._[a];
                    m.__super__.hide.apply(this, arguments)
                },
                setPriority: function(a) {
                    this._.priority = a;
                    return this
                },
                lastTarget: function(a) {
                    return this._.lastTarget
                }
            });
            m.defalutOpts = j({}, m.defalutOpts, {
                lastPos: null,
                lastTarget: null,
                priority: "tbrl",
                showWithAniOnTop: "fadeInUp:fast",
                showWithAniOnRight: "fadeInRight:fast",
                showWithAniOnBottom: "fadeInDown:fast",
                hideWithAniOnLeft: "fadeOutLeft:fast",
                hideWithAniOnTop: "fadeOutDown:fast",
                hideWithAniOnRight: "fadeOutLeft:fast",
                hideWithAniOnBottom: "fadeOutUp:fast",
                hideWithAniOnLeft: "fadeOutRight:fast"
            });
            a.exports = m
        },
        "/Class_tipAlert": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.foreach
              , h = e.funcEmpty
              , i = e.core.dom.uniqueID
              , j = f.language
              , k = f.proxy
              , l = f.extend
              , m = c("/templates/tipAlert.html")
              , n = c("/jsons/icons.json")
              , o = c("/helpers/render")
              , p = {}
              , q = c("/Class_bubble").extend({
                init: function(a) {
                    q.__super__.init.apply(this, arguments);
                    if (this._textLarge || this._textSmall)
                        this._.notice = [this._textLarge, this._textSmall];
                    this._.notice = [].concat(this._.notice);
                    this.setNotice(this._.notice);
                    this.setIcon(this._.icon);
                    this._.autoHide && setTimeout(k(this.hide, this), this._.hideDelay);
                    this.show()
                },
                setNotice: function(a) {
                    var b = "";
                    g([].concat(a), k(function(a, c) {
                        c === 0 ? this.getDomList().text.innerHTML = a + (this._.autoHide ? "" : ' <a node-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a>') : b += o('<p class="sub_txt S_txt2">{text}</p>', {
                            text: a || ""
                        })
                    }, this));
                    this.getDomList().otherText.innerHTML = b;
                    this.rebindClose();
                    this.fixWidth();
                    return this
                },
                beside: function(a) {
                    var b = i(a);
                    this._.besideDOM = b;
                    if (p[b])
                        try {
                            p[b].hide()
                        } catch (c) {}
                    p[b] = this;
                    return q.__super__.beside.apply(this, arguments)
                },
                setIcon: function(a) {
                    this.getDomList(!0).icon.innerHTML = n[a] || "";
                    return this
                },
                hide: function() {
                    try {
                        p[this._.besideDOM] === this && delete p[this._.besideDOM]
                    } catch (a) {}
                    q.__super__.hide.apply(this, arguments);
                    setTimeout(k(this.destroy, this), 2e3);
                    return this
                }
            });
            q.defalutOpts = l({}, q.defalutOpts, {
                template: m,
                icon: "succ",
                autoHide: !0,
                stopClickPropagation: !0,
                hideDelay: 1e3
            });
            a.exports = q
        },
        "/templates/tipAlert.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_info">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon"></span>\n\t\t\t<span node-type="text"></span>\n\t\t</p>\n\t\t<div node-type="otherText"></div>\n\t\t\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
        },
        "/Class_tipConfirm": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.foreach
              , h = e.funcEmpty
              , i = e.core.dom.uniqueID
              , j = e.custEvent
              , k = f.language
              , l = f.proxy
              , m = f.extend
              , n = c("/templates/tipConfirm.html")
              , o = c("/jsons/icons.json")
              , p = c("/helpers/render")
              , q = {}
              , r = c("/Class_bubble").extend({
                init: function(a) {
                    r.__super__.init.apply(this, arguments);
                    j.define(this, ["ok", "cancel"]);
                    if (this._textLarge || this._textSmall)
                        this._.notice = [this._textLarge, this._textSmall];
                    this._.notice = [].concat(this._.notice);
                    this.setNotice(this._.notice);
                    this.setIcon(this._.icon);
                    this.ok(this._.okText, this._.ok);
                    this.cancel(this._.cancelText, this._.cancel);
                    this.on("ok", "click", l(function() {
                        this._.confirmIsOK = !0;
                        this.hide()
                    }, this));
                    this.on("cancel", "click", l(this.hide, this));
                    this.show()
                },
                setNotice: function(a) {
                    var b = "";
                    g([].concat(a), l(function(a, c) {
                        c === 0 ? this.getDomList(!0).text.innerHTML = a : b += p('<p class="sub_txt S_txt2">{text}</p>', {
                            text: a || ""
                        })
                    }, this));
                    this.getDomList(!0).otherText.innerHTML = b;
                    this.fixWidth();
                    return this
                },
                ok: function(a, b) {
                    if (typeof a == "function") {
                        b = a;
                        a = undefined
                    }
                    typeof a == "string" && (this._.okText = "<span>" + a + "</span>");
                    this.getDomList(!0).ok.innerHTML = this._.okText;
                    this.on("ok", b || h);
                    this.fixWidth();
                    return this
                },
                cancel: function(a, b) {
                    if (typeof a == "function") {
                        b = a;
                        a = undefined
                    }
                    typeof a == "string" && (this._.cancelText = "<span>" + a + "</span>");
                    this.getDomList(!0).cancel.innerHTML = this._.cancelText;
                    this.on("cancel", b || h);
                    this.fixWidth();
                    return this
                },
                setIcon: function(a) {
                    this.getDomList(!0).icon.innerHTML = o[a] || "";
                    return this
                },
                show: function() {
                    var a = r.__super__.show.apply(this, arguments);
                    setTimeout(l(function() {
                        this.getDomList(!0).ok.focus()
                    }, this), 100);
                    return a
                },
                beside: function(a) {
                    var b = i(a);
                    this._.besideDOM = b;
                    if (q[b])
                        try {
                            q[b].hide()
                        } catch (c) {}
                    q[b] = this;
                    return r.__super__.beside.apply(this, arguments)
                },
                hide: function() {
                    q[this._.besideDOM] === this && delete q[this._.besideDOM];
                    this._.confirmIsOK ? this.trigger("ok") : this.trigger("cancel");
                    r.__super__.hide.apply(this, arguments);
                    setTimeout(l(this.destroy, this), 2e3);
                    return this
                }
            });
            r.defalutOpts = m({}, r.defalutOpts, {
                template: n,
                icon: "askS",
                okText: k("确定"),
                cancelText: k("取消"),
                stopClickPropagation: !0
            });
            a.exports = r
        },
        "/templates/tipConfirm.html": function(a, b, c, d) {
            a.exports = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_opt">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon"></span>\n\t\t\t<span node-type="text"></span>\n\t\t</p>\n\t\t<div node-type="otherText"></div>\n\t\t<p class="btn">\n\t\t\t<a href="javascript:void(0);" node-type="ok" action-type="ok" class="W_btn_a"></a>\n\t\t\t<a href="javascript:void(0);" node-type="cancel" action-type="cancel" class="W_btn_b"></a>\n\t\t</p>\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
        },
        "/Widget_scrollView": function(a, b, c, d) {
            function t(a) {
                function D() {
                    m(b.content, "scroll", C);
                    m(b.barContainer, "mousedown", y);
                    m(document, "mousemove", z);
                    m(document, "mouseup", A);
                    n(b.container);
                    n(b.barContainer);
                    clearInterval(h);
                    while (t = b.container.firstChild)
                        a.appendChild(t)
                }
                function C() {
                    try {
                        var a = g.scrollWidth();
                        q && B(b.content) && (a = 0);
                        b.content.style.width = b.container.offsetWidth + a + "px";
                        b.barContent.style.height = w() / v() * 100 + "%";
                        b.barContent.style.top = u() / v() * 100 + "%";
                        b.barContainer.style.visibility = v() <= w() ? "hidden" : ""
                    } catch (c) {}
                }
                function B(a) {
                    return e.getStyle(a, "position") === "absolute" ? !0 : a === document.body ? !1 : a.parentNode ? B(a.parentNode) : !1
                }
                function A(a) {
                    d = !1;
                    j(document.body, "UI_scrolling")
                }
                function z(a) {
                    a = o(a);
                    d === !0 && u((a.clientY - f) / b.barContainer.offsetHeight * v())
                }
                function y(a) {
                    a = o(a);
                    var c = a.target;
                    if (a.which === 1) {
                        i(document.body, "UI_scrolling");
                        if (c === b.barContent) {
                            d = !0;
                            f = a.clientY - parseInt(b.barContent.style.top, 10) / 100 * b.barContainer.offsetHeight
                        } else
                            b.barContent.getBoundingClientRect().top < a.clientY ? u(u() + v() * .1) : u(u() - v() * .1)
                    }
                }
                function x(a) {
                    a = o(a);
                    var b = -a.wheelDelta;
                    isNaN(b) && (b = a.deltaY);
                    var c = b < 0
                      , d = b > 0;
                    (c && u() <= 0 || d && v() - u() - w() <= 0) && p(a)
                }
                function w() {
                    return b.content.offsetHeight
                }
                function v() {
                    return b.content.scrollHeight
                }
                function u(a) {
                    return arguments.length > 0 ? b.content.scrollTop = a : b.content.scrollTop
                }
                var b = r(k(s).list), c, d = !1, f, h;
                for (c in b)
                    b.hasOwnProperty(c) && b[c].removeAttribute("node-type");
                var t;
                while (t = a.firstChild)
                    b.content.appendChild(t);
                i(a, "UI_scrollView");
                a.appendChild(b.container);
                a.appendChild(b.barContainer);
                l(b.content, "scroll", C);
                l(b.barContainer, "mousedown", y);
                l(document, "mousemove", z);
                l(document, "mouseup", A);
                l(b.content, "mousewheel", x);
                l(b.content, "DOMMouseScroll", x);
                h = setInterval(function() {
                    try {
                        b.container.scrollLeft = 0
                    } catch (a) {}
                }, 1e3);
                C();
                return {
                    reset: C,
                    destroy: D,
                    scrollHeight: v,
                    scrollTop: u,
                    offsetHeight: w,
                    scrollEl: b.content
                }
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = c("/css")
              , h = e.C
              , i = e.addClassName
              , j = e.removeClassName
              , k = e.builder
              , l = e.addEvent
              , m = e.removeEvent
              , n = e.removeNode
              , o = e.fixEvent
              , p = e.stopEvent
              , q = e.core.util.browser.IE6 || e.core.util.browser.IE7
              , r = f.parseDOM
              , s = c("/templates/scrollview.html");
            a.exports = t
        },
        "/templates/scrollview.html": function(a, b, c, d) {
            a.exports = '<div class="UI_scrollContainer" node-type="container">\n\t<div class="UI_scrollContent" node-type="content"></div>\n</div>\n<div class="UI_scrollBar W_scroll_y S_bg1" node-type="barContainer"><div class="bar S_txt2_bg" node-type="barContent" style="top:0%; height:0;"></div></div>'
        },
        "/Widget_badge": function(a, b, c, d) {
            function m(a, b, c) {
                if (h.effectSuport) {
                    var d = a.innerHTML
                      , e = b;
                    c && (d = [e, e = d][0]);
                    var f = parseInt(g(a, "line-height"))
                      , m = i(l(k, {
                        oldValue: d,
                        newValue: e,
                        height: (f || a.offsetHeight) - 1
                    }))
                      , n = m.list.t[0]
                      , o = m.box;
                    a.innerHTML = "";
                    a.appendChild(o);
                    n.style.lineHeight = n.parentNode.offsetHeight + "px";
                    h.effect(n, c ? "badgeDown" : "badgeUp", "fast", function() {
                        j(a, n) && (a.innerHTML = b)
                    })
                } else
                    a.innerHTML = b
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = e.getStyle
              , h = c("/css")
              , i = e.builder
              , j = e.contains
              , k = c("/templates/badge.html")
              , l = c("/helpers/render");
            a.exports = m
        },
        "/templates/badge.html": function(a, b, c, d) {
            a.exports = '<span class="UI_badge" style="height:{height}px"><span class="UI_badge" node-type="t">{oldValue}<br/>{newValue}</span></span>'
        },
        "/Widget_suggest": function(a, b, c, d) {
            function z(a) {
                var b = a.length;
                while (b--)
                    if (l(a[b], "cur"))
                        return a[b];
                return null
            }
            var e = c("/$")[0]
              , f = c("/$")[1]
              , g = c("/Class_mlayer")
              , h = c("/css")
              , i = e.C
              , j = e.addClassName
              , k = e.removeClassName
              , l = e.core.dom.hasClassName
              , m = e.addEvent
              , n = e.removeEvent
              , o = e.builder
              , p = e.foreach
              , q = e.fixEvent
              , r = e.preventDefault
              , s = e.stopEvent
              , t = e.getUniqueKey
              , u = e.custEvent
              , v = f.parseDOM
              , w = f.extend
              , x = f.proxy
              , y = {
                ENTER: 13,
                ESC: 27,
                UP: 38,
                DOWN: 40,
                LEFT: 37,
                RIGHT: 39
            }
              , A = c("/Class_mlayer").extend({
                init: function() {
                    A.__super__.init.apply(this, arguments);
                    u.define(this, ["suggest", "submit"]);
                    var a = this._
                      , b = a.input
                      , c = a.proxyShow = x(this.show, this)
                      , d = a.proxyHide = x(this.hide, this)
                      , e = a.proxyKey = x(function(a) {
                        a = q(a);
                        var c, d;
                        if ((c = this.getDomList().list.childNodes) && c.length) {
                            d = z(c);
                            switch (a.keyCode) {
                            case y.ENTER:
                                d && (b.value = decodeURIComponent(d.getAttribute("value")));
                                b.blur();
                                this.trigger("submit", [b.value]);
                                r(a);
                                break;
                            case y.ESC:
                                b.blur();
                                s(a);
                                break;
                            case y.UP:
                                var e = d ? d.previousSibling : c[c.length - 1];
                                d && k(d, "cur");
                                e && j(e, "cur");
                                b.value = e ? decodeURIComponent(e.getAttribute("value")) : b._value;
                                s(a);
                                break;
                            case y.DOWN:
                                var e = d ? d.nextSibling : c[0];
                                d && k(d, "cur");
                                e && j(e, "cur");
                                b.value = e ? decodeURIComponent(e.getAttribute("value")) : b._value;
                                s(a);
                                break;
                            case y.LEFT:
                            case y.RIGHT:
                                break;
                            default:
                                setTimeout(function() {
                                    b._value = b.value
                                })
                            }
                        }
                    }, this)
                      , f = a.proxyOnkeydownIE9 = x(function() {
                        var a = window.event.keyCode;
                        (a == 8 || a == 46) && c
                    }, this);
                    m(b, "focus", c);
                    m(b, "blur", d);
                    m(b, "keydown", e);
                    window.addEventListener ? b.addEventListener("input", c, !1) : b.attachEvent("onpropertychange", c);
                    if (window.VBArray && window.addEventListener) {
                        b.attachEvent("onkeydown", f);
                        b.attachEvent("oncut", c)
                    }
                    this.on("select", "click", x(function(a) {
                        b.value = decodeURIComponent(a.el.getAttribute("value"));
                        this.trigger("submit", [b.value])
                    }, this));
                    b.setAttribute("autocomplete", "off");
                    b._value = b.value
                },
                html: function(a) {
                    return A.__super__.html.apply(this, [a, this.getDomList().list])
                },
                show: function() {
                    function b(b, c) {
                        if (this._.input != document.activeElement)
                            return this.hide();
                        if (c != this._.lastkey)
                            return this;
                        if (!b || b.length <= 0)
                            return this.hide();
                        var d = "";
                        p(b, function(a, b) {
                            a = [].concat(a);
                            a[1] = a[1] || a[0];
                            d += '<li action-type="select" value="' + encodeURIComponent(a[1]) + '"><a href="javascript:void(0);">' + a[0] + "</a></li>"
                        });
                        A.__super__.show.apply(this, a);
                        this.beside(this._.input, {
                            pos: this._.pos,
                            offsetX: this._.offsetX,
                            offsetY: this._.offsetY
                        });
                        var e = this._.width || this._.input.offsetWidth - 6;
                        this._.node.style.cssText += ";min-width:" + e + "px;_width:" + e + "px;";
                        this.html(d);
                        j(this._.node, "UI_autoHeight");
                        this.autoHeight();
                        return this
                    }
                    var a = arguments;
                    if (this._.input != document.activeElement)
                        return this;
                    this.trigger("suggest", [this._.input.value, x(b, this, this._.lastkey = t())]);
                    return this
                },
                hide: function() {
                    this.getBox().style.height = "";
                    setTimeout(x(function() {
                        this.html("");
                        A.__super__.hide.apply(this, arguments)
                    }, this), 200);
                    return this
                },
                destroy: function() {
                    var a = this._
                      , b = a.input;
                    n(b, "focus", a.proxyShow);
                    n(b, "blur", a.proxyHide);
                    n(b, "keydown", a.proxyKey);
                    window.addEventListener ? b.removeEventListener("input", a.proxyShow, !1) : b.detachEvent("onpropertychange", a.proxyShow);
                    if (window.VBArray && window.addEventListener) {
                        b.detachEvent("onkeydown", a.proxyOnkeydownIE9);
                        b.detachEvent("oncut", a.proxyShow)
                    }
                    return A.__super__.destroy.apply(this, arguments)
                }
            });
            A.defalutOpts = w({}, A.defalutOpts);
            A.defalutOpts.template = '<div class="layer_menu_list" style="overflow:hidden;"><ul node-type="list"></ul></div>';
            A.defalutOpts.pos = "bottom-left";
            A.defalutOpts.offsetX = 0;
            A.defalutOpts.offsetY = 0;
            A.defalutOpts.width = !1;
            A.defalutOpts.showWithAni = null;
            A.defalutOpts.hideWithAni = null;
            A.defalutOpts.heightWidthAni = !0;
            a.exports = function(a, b) {
                b = b || {};
                a && (b.input = a);
                return new A(b)
            }
        },
        "/core/utils/focusHistory": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a, b) {
                var c = []
                  , d = function(a) {
                    if (!a || a == document.body)
                        return !1;
                    if (a.getAttribute("action-history")) {
                        var b = e.core.json.queryToJson(a.getAttribute("action-history"));
                        if (b && b.rec && b.rec == 1)
                            return a
                    }
                    return arguments.callee(a.parentNode)
                }
                  , f = function(a) {
                    var a = e.fixEvent(a)
                      , b = d(a.target);
                    b && g.push(b)
                }
                  , g = {
                    push: function(a) {
                        c.push(a);
                        c.length > 3 && c.shift()
                    },
                    focusback: function(a) {
                        var b = c.pop();
                        if (!!b) {
                            b.getAttribute("tabIndex") || b.setAttribute("tabIndex", "0");
                            setTimeout(function() {
                                b.focus()
                            }, 200)
                        }
                    },
                    destroy: function() {
                        e.removeEvent(document.body, "click", f);
                        c = null
                    }
                }
                  , h = function() {
                    e.addEvent(document.body, "click", f)
                };
                h();
                return g
            }
        },
        "/core/utils/suggest": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = null
              , g = e.custEvent
              , h = g.define
              , i = g.fire
              , j = g.add
              , k = e.addEvent
              , l = e.removeEvent
              , m = e.stopEvent
              , n = []
              , o = {}
              , p = {
                ENTER: 13,
                ESC: 27,
                UP: 38,
                DOWN: 40,
                TAB: 9
            }
              , q = function(a) {
                var b = -1
                  , c = []
                  , d = a.textNode
                  , f = a.uiNode
                  , g = e.core.evt.delegatedEvent(f)
                  , n = h(d, ["open", "close", "indexChange", "onSelect", "onIndexChange", "onClose", "onOpen", "openSetFlag"]);
                n.setFlag = o;
                var o = function(b) {
                    a.flag = b
                }
                  , q = function() {
                    return e.sizzle(["[action-type=", a.actionType, "]"].join(""), f)
                }
                  , r = function() {
                    b = -1;
                    l(d, "keydown", s);
                    g.destroy()
                }
                  , s = function(c) {
                    var f, g;
                    if (!!(f = c) && !!(g = f.keyCode)) {
                        if (g == p.ENTER) {
                            i(n, "onSelect", [b, d, a.flag]);
                            e.preventDefault()
                        }
                        if (g == p.UP) {
                            m();
                            var h = q().length;
                            b = b < 1 ? h - 1 : b - 1;
                            i(n, "onIndexChange", [b]);
                            return !1
                        }
                        if (g == p.DOWN) {
                            m();
                            var h = q().length;
                            b = b == h - 1 ? 0 : b + 1;
                            i(n, "onIndexChange", [b]);
                            return !1
                        }
                        if (g == p.ESC) {
                            m();
                            r();
                            i(n, "onClose");
                            return !1
                        }
                        if (g == p.TAB) {
                            r();
                            i(n, "onClose");
                            return !1
                        }
                    }
                }
                  , t = function(b) {
                    i(n, "onSelect", [e.core.arr.indexOf(b.el, q()), d, a.flag])
                }
                  , u = function(a) {
                    b = e.core.arr.indexOf(a.el, q());
                    i(n, "onIndexChange", [e.core.arr.indexOf(a.el, q())])
                };
                j(n, "open", function(b, c) {
                    d = c;
                    r();
                    k(c, "keydown", s);
                    g.add(a.actionType, "mouseover", u);
                    g.add(a.actionType, "click", t);
                    i(n, "onOpen", [a.flag])
                });
                j(n, "openSetFlag", function(a, b) {
                    o(b)
                });
                j(n, "close", function() {
                    r();
                    i(n, "onClose", [a.flag])
                });
                j(n, "indexChange", function(c, d) {
                    b = d;
                    i(n, "onIndexChange", [b, a.flag])
                });
                return n
            }
              , r = function(a) {
                var b = a.textNode
                  , c = e.core.arr.indexOf(b, n);
                if (!o[c]) {
                    n[c = n.length] = b;
                    o[c] = q(a)
                }
                return o[c]
            };
            a.exports = function(a) {
                if (!!a.textNode && !!a.uiNode) {
                    a = e.parseParam({
                        textNode: f,
                        uiNode: f,
                        actionType: "item",
                        actionData: "index",
                        flag: ""
                    }, a);
                    return r(a)
                }
            }
        },
        "/core/utils/tab": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a) {
                var b = {}, c, d, f, g, h, i = {}, j = null, k = {
                    selectTab: function(a) {
                        if (!i[a]) {
                            e.custEvent.fire(m, "tabInit", a);
                            i[a] = !0
                        }
                        k.showTab(a);
                        j && e.custEvent.fire(m, "tabOut", j);
                        e.custEvent.fire(m, "tabIn", a);
                        j = a
                    },
                    showTab: function(a) {
                        if (j) {
                            d[j][0].className = b.defaultClassName;
                            d[j][1] && e.core.dom.setStyle(d[j][1], "display", "none")
                        }
                        d[a][0].className = b.currentClassName;
                        d[a][1] && e.core.dom.setStyle(d[a][1], "display", "")
                    }
                }, l = {
                    tabSwitch: function(a) {
                        var b = a.el
                          , c = b.getAttribute("node-type") || "";
                        c != j && k.selectTab(c)
                    }
                }, m = {
                    getOuter: function() {
                        return g
                    },
                    getDEvent: function() {
                        return h
                    },
                    getDom: function(a) {
                        return d[a] ? d[a] : null
                    },
                    setContent: function(a, b) {
                        typeof b == "string" ? d[a].innerHTML = b : e.isNode(b) && d[a].appendChild(b)
                    },
                    destroy: function() {
                        h.destroy();
                        i = null
                    }
                }, n = {
                    init: function() {
                        n.pars();
                        n.build();
                        n.bind();
                        k.selectTab(b.currentTab)
                    },
                    pars: function() {
                        b = e.core.obj.parseParam({
                            templete: "",
                            currentTab: "tab1",
                            eventType: "click",
                            currentClassName: "pftb_lk current S_line5 S_txt1 S_bg5",
                            defaultClassName: "pftb_lk S_line5 S_txt1 S_bg1"
                        }, a || {})
                    },
                    build: function() {
                        c = e.core.dom.builder(b.templete);
                        d = c.list;
                        f = d.content[0];
                        g = c.list.tabs[0]
                    },
                    bind: function() {
                        e.custEvent.define(m, ["tabInit", "tabIn", "tabOut"]);
                        h = e.core.evt.delegatedEvent(g);
                        h.add("tab", b.eventType, l.tabSwitch)
                    }
                };
                n.init();
                return m
            }
        },
        "/core/utils/slider": function(a, b, c, d) {
            var e = d("/core/theia") || STK
              , f = c("/core/utils/children")
              , g = c("/core/utils/parseDOM");
            a.exports = function(a, b) {
                e.core.dom.isNode(a) || e.log("[kit.extra.slider]: node is not a Node!");
                var c = {}, d = {}, h, i, j, k, l, m, n = !1, o = !1, p = e.core.dom.setStyle, q = {
                    isMouseLeaveOrEnter: function(a, b) {
                        if (a && a.type != "mouseout" && a.type != "mouseover")
                            return !1;
                        var c = a.relatedTarget ? a.relatedTarget : a.type == "mouseout" ? a.toElement : a.fromElement;
                        while (c && c != b)
                            c = c.parentNode;
                        return c != b
                    },
                    onMouseover: function(a) {
                        q.isMouseLeaveOrEnter(a, i) && clearInterval(l)
                    },
                    onMouseout: function(a) {
                        q.isMouseLeaveOrEnter(a, i) && (!n || b.autoRun) && (l = setInterval(t.autoSlideLeft, b.speed_banner))
                    }
                }, r = {
                    choice: function(a) {
                        var d = a.data;
                        n = !0;
                        o = !0;
                        var g = f(i)
                          , h = a.el;
                        e.core.arr.foreach(g, function(a, c) {
                            if (a != h)
                                e.core.dom.removeClassName(a, b.className);
                            else if (e.hasClassName(a, b.className)) {
                                e.core.dom.removeClassName(a, b.className);
                                n = !1;
                                o = !1
                            } else
                                e.core.dom.addClassName(a, b.className)
                        });
                        e.core.evt.custEvent.fire(c, "choice", d)
                    },
                    clickLeft: function() {
                        d.newTime = new Date;
                        d.stepTime = d.newTime - d.oldTime;
                        d.stepTime > 300 ? d.stepTime = b.speed_tween_fast : d.stepTime = 50;
                        d.oldTime = d.newTime;
                        clearInterval(l);
                        t.handleSlideRight(d.stepTime);
                        if (!n || b.autoRun == 0)
                            l = setInterval(t.autoSlideLeft, b.speed_banner)
                    },
                    clickRight: function() {
                        d.newTime = new Date;
                        d.stepTime = d.newTime - d.oldTime;
                        d.stepTime > 300 ? d.stepTime = b.speed_tween_fast : d.stepTime = 50;
                        d.oldTime = d.newTime;
                        clearInterval(l);
                        t.autoSlideLeft(d.stepTime);
                        if (!n || b.autoRun == 0)
                            l = setInterval(t.autoSlideLeft, b.speed_banner)
                    }
                }, s = {
                    slideDot: function(a, c) {
                        clearInterval(l);
                        var d = c.toPage - c.currentPage > 0 ? c.toPage - c.currentPage : c.totalPage - c.currentPage + c.toPage
                          , f = (b.eleWidth + b.eleMargin) * Math.abs(d)
                          , g = c.speed || b.speed_tween;
                        k = e.core.ani.tween(i, {
                            animationType: b.tween_algorithm,
                            duration: g,
                            end: function() {
                                for (var a = 0, b = d; a < b; a++) {
                                    var c = e.core.dom.firstChild(i);
                                    e.core.dom.insertElement(i, c, "beforeend")
                                }
                                p(i, "left", "0px")
                            }
                        }).play({
                            left: -f
                        });
                        l = setInterval(t.autoSlideLeft, b.speed_banner)
                    }
                }, t = {
                    autoSlideLeft: function(a) {
                        t.animate("left", function() {
                            for (var a = 0, c = b.num_everyTurn; a < c; a++) {
                                var d = e.core.dom.firstChild(i);
                                e.core.dom.insertElement(i, d, "beforeend")
                            }
                            p(i, "left", "0px")
                        }, a);
                        e.core.evt.custEvent.fire(c, "left")
                    },
                    handleSlideRight: function(a) {
                        for (var d = 0, f = b.num_everyTurn; d < f; d++) {
                            var g = e.core.dom.lastChild(i);
                            e.core.dom.insertElement(i, g, "afterbegin")
                        }
                        p(i, "left", -(m - b.fix_right) + "px");
                        t.animate("right", function() {}, a);
                        e.core.evt.custEvent.fire(c, "right")
                    },
                    animate: function(a, c, d) {
                        a = a == "left" ? m : 0;
                        d = d || b.speed_tween;
                        k = e.core.ani.tween(i, {
                            animationType: b.tween_algorithm,
                            duration: d,
                            end: c
                        }).play({
                            left: -a
                        })
                    }
                }, u = {
                    init: function() {
                        u.pars();
                        u.build();
                        u.bind();
                        if (b.num_all > b.num_everyTurn) {
                            if (b.num_all < 2 * b.num_everyTurn) {
                                var a = 2 * b.num_everyTurn - b.num_all;
                                for (var c = 0, d = a; c < d; c++) {
                                    var g = f(i)[c]
                                      , h = g.cloneNode(!0);
                                    e.core.dom.insertElement(i, h, "beforeend")
                                }
                                var j = (b.eleWidth + b.eleMargin) * 2 * b.num_everyTurn + b.fix;
                                p(i, "width", j + "px")
                            }
                            b.autoRun && (l = setInterval(t.autoSlideLeft, b.speed_banner))
                        }
                    },
                    pars: function() {
                        b = e.core.obj.parseParam({
                            speed_banner: 3e3,
                            speed_tween: 500,
                            speed_tween_fast: 300,
                            tween_algorithm: "easeoutcubic",
                            num_everyTurn: 1,
                            eleMargin: 0,
                            fix: 0,
                            fix_right: 0,
                            actionType: "choice",
                            className: "current",
                            autoRun: !0
                        }, b || {});
                        h = g(e.builder(a).list);
                        i = h.innerSlide;
                        b.num_all = f(i).length;
                        b.eleWidth = e.core.dom.firstChild(i).offsetWidth;
                        d.oldTime = new Date
                    },
                    build: function() {
                        i.style.left || p(i, "left", "0px");
                        p(i, "position", "relative");
                        var a = (b.eleWidth + b.eleMargin) * b.num_all + b.fix;
                        p(i, "width", a + "px");
                        m = (b.eleWidth + b.eleMargin) * b.num_everyTurn
                    },
                    bind: function() {
                        e.addEvent(i, "mouseover", q.onMouseover);
                        e.addEvent(i, "mouseout", q.onMouseout);
                        j = e.core.evt.delegatedEvent(a);
                        j.add("prev", "click", r.clickLeft);
                        j.add("next", "click", r.clickRight);
                        b.actionType && j.add(b.actionType, "click", r.choice);
                        e.core.evt.custEvent.define(c, ["left", "right", "choice", "changePage"]);
                        e.core.evt.custEvent.add(c, "changePage", s.slideDot)
                    },
                    destroy: function() {
                        clearInterval(l);
                        k.destroy();
                        e.removeEvent(i, "mouseover", q.onMouseover);
                        e.removeEvent(i, "mouseout", q.onMouseout);
                        e.core.evt.custEvent.remove(c);
                        j.destroy()
                    }
                };
                u.init();
                c.destroy = u.destroy;
                return c
            }
        },
        "/core/utils/children": function(a, b, c, d) {
            var e = d("/core/theia") || STK;
            a.exports = function(a) {
                if (!e.core.dom.isNode(a))
                    throw "Parameter must be an HTMLEelement!";
                var b = [];
                for (var c = 0, d = a.childNodes.length; c < d; c++)
                    a.childNodes[c].nodeType == 1 && b.push(a.childNodes[c]);
                return b
            }
        },
        "/calendar": function(a, b, c, d) {
            var e = c("/$")[0]
              , f = c("/$")[1].language
              , g = c("/Class_mlayer")
              , h = c("/templates/calendar.html");
            a.exports = function(a) {
                var b = {}, c, d = {
                    id: "",
                    data: {},
                    chooseDate: "",
                    source: null,
                    calNode: null,
                    layer: null,
                    today: {},
                    showDate: {},
                    start: null,
                    end: null,
                    count: null,
                    firstWeek: null,
                    format: [],
                    years: [],
                    changeDom: {},
                    defaultStartDate: new Date(2009,7,16,0,0,0,0),
                    daysOfMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    dateOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                }, i = {
                    close: function() {
                        e.core.evt.stopEvent();
                        e.removeEvent(document.body, "click", i.close);
                        d.layer.hide()
                    },
                    changeYear: function(a) {
                        a = e.fixEvent(a);
                        var b = a.target
                          , c = b.value;
                        if (c != d.showDate.year) {
                            d.showDate.year = c;
                            c == d.start.year && (d.showDate.month = d.start.month);
                            c == d.end.year && (d.showDate.month = d.end.month);
                            k.getCurrentMonthInfo(d.data.hidePastMonth);
                            l.drawCal()
                        }
                    },
                    changeMonth: function(a) {
                        a = e.fixEvent(a);
                        var b = a.target
                          , c = b.value;
                        if (c != d.showDate.month) {
                            d.showDate.month = c * 1;
                            k.getCurrentMonthInfo(d.data.hidePastMonth);
                            l.drawCal()
                        }
                    }
                }, j = {
                    date: function(a) {
                        var c = a.el.title;
                        c = c.replace(/(\d+)/g, function(a, b) {
                            return b.length == 1 ? "0" + b : b
                        });
                        d.chooseDate = c;
                        e.custEvent.fire(b, "choose", {
                            date: c
                        });
                        if (d.callback && typeof d.callback == "function") {
                            var f = {};
                            f.start = d.data.start;
                            f.end = d.data.end;
                            d.callback(c, f)
                        }
                    }
                }, k = {
                    parseDate: function(a) {
                        var b, c, d, e, f = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/, g, h;
                        if (!a)
                            b = new Date;
                        else if (typeof a == "string" && f.test(a)) {
                            b = a.match(f);
                            c = b[1] * 1;
                            d = b[2] * 1 - 1;
                            e = b[3] * 1;
                            b = new Date(c,d,e,0,0,0,0)
                        } else
                            a.constructor == Date ? b = a : typeof a == "object" ? b = new Date(a.year,a.month,a.date,0,0,0,0) : typeof a == "string" ? b = new Date(a) : b = new Date;
                        h = {
                            year: b.getFullYear(),
                            month: b.getMonth(),
                            date: b.getDate()
                        };
                        g = k.getMaxDays(h.year, h.month);
                        h.max = g;
                        return h
                    },
                    getMaxDays: function(a, b) {
                        return b == 1 ? a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? 29 : 28 : d.daysOfMonth[b]
                    },
                    getStartAndEndDays: function(a) {
                        if (a) {
                            d.start = a.start != null ? a.start : d.defaultStartDate;
                            d.end = a.end != null ? a.end : new Date;
                            d.start.toString().indexOf("-") != -1 && (d.start = d.start.replace(/-/g, "/"));
                            d.end.toString().indexOf("-") != -1 && (d.end = d.end.replace(/-/g, "/"));
                            d.defaultStartDate = new Date(d.start)
                        } else {
                            d.start = d.defaultStartDate;
                            d.end = new Date
                        }
                        d.start = k.parseDate(d.start);
                        d.end = k.parseDate(d.end)
                    },
                    getCurrentMonthInfo: function() {
                        var a = d.showDate
                          , b = a.year
                          , c = a.month
                          , f = a.date
                          , g = new Date(b,c,1,0,0,0,0);
                        d.count = k.getMaxDays(b, c);
                        d.firstWeek = g.getDay();
                        var h = e.core.arr.copy(d.dateOfMonth)
                          , i = d.firstWeek == 0 ? [] : Array(d.firstWeek).join().split(",");
                        d.format = i.concat(h.splice(0, d.count))
                    },
                    drawYear: function() {
                        var a = $CONFIG != null && $CONFIG.timeDiff != null ? $CONFIG.timeDiff : 0;
                        a = isNaN(a - 1) ? 0 : a;
                        var b = d.defaultStartDate.getFullYear()
                          , c = (new Date((new Date(d.end.year,d.end.month,d.end.date)).getTime() - a)).getFullYear()
                          , e = c - b
                          , f = 0;
                        d.years = [];
                        while (f <= e) {
                            d.years.push(b + f);
                            f++
                        }
                    },
                    getDate: function() {
                        return d.chooseDate
                    },
                    getDateOffset: function(a) {
                        var b = a;
                        return (new Date(b.year,b.month,b.date)).getTime()
                    }
                }, l = {
                    drawCal: function(a) {
                        d.data = {
                            today: d.today,
                            showDate: d.showDate,
                            start: d.start,
                            end: d.end,
                            dates: d.format,
                            years: d.years,
                            hidePastMonth: a,
                            currDate: k.getMaxDays()
                        };
                        d.data.showDateOffset = k.getDateOffset(d.showDate);
                        d.data.startOffset = k.getDateOffset(d.start);
                        d.data.endOffset = k.getDateOffset(d.end);
                        d.data.datesOffset = [];
                        for (var b = 0, c = d.data.dates.length; b < c; b++) {
                            var i = {
                                year: d.showDate.year,
                                month: d.showDate.month,
                                date: d.data.dates[b]
                            };
                            d.data.datesOffset.push({
                                d: d.data.dates[b],
                                dOffset: k.getDateOffset(i)
                            })
                        }
                        if (!d.layer) {
                            var j = new g({
                                id: "calendar_layer" + e.getUniqueKey(),
                                showWithAni: null,
                                hideWithAni: null
                            });
                            j.html(f(e.core.util.easyTemplate(h, d.data).toString()));
                            d.calNode = j.getBox();
                            d.calNode.className = "pc_caldr W_layer";
                            d.layer = j;
                            l.bind();
                            l.bindMonthYear()
                        } else {
                            d.layer.html(f(e.core.util.easyTemplate(h, d.data).toString()));
                            l.removeMonthYear();
                            l.bindMonthYear()
                        }
                        e.core.evt.stopEvent()
                    },
                    show: function(a, c) {
                        e.core.evt.stopEvent();
                        d.layer.show();
                        d.layer.beside(a, c);
                        e.addEvent(document.body, "click", i.close);
                        return b
                    },
                    hide: function() {
                        e.removeEvent(document.body, "click", i.close);
                        d.layer.hide();
                        return b
                    },
                    state: function() {
                        return d.layer.getState()
                    },
                    bind: function() {
                        c = e.delegatedEvent(d.calNode);
                        c.add("date", "click", j.date);
                        e.custEvent.define(b, ["choose"])
                    },
                    bindMonthYear: function() {
                        var a = d.layer.getDomList(!0);
                        d.changeDom.year = a.year;
                        d.changeDom.month = a.month;
                        e.addEvent(d.changeDom.year, "change", i.changeYear);
                        e.addEvent(d.changeDom.month, "change", i.changeMonth)
                    },
                    removeMonthYear: function() {
                        d.changeDom && d.changeDom.year && e.removeEvent(d.changeDom.year, "change", i.changeYear);
                        d.changeDom && d.changeDom.month && e.removeEvent(d.changeDom.month, "change", i.changeMonth)
                    }
                }, m = {
                    init: function() {
                        m.pars();
                        m.build();
                        m.bind()
                    },
                    pars: function() {
                        d.callback = a.callback;
                        d.currentDate = a.currentDate
                    },
                    build: function() {
                        d.today = k.parseDate();
                        for (var b in d.today)
                            d.showDate[b] = d.today[b];
                        k.getStartAndEndDays(a);
                        k.getCurrentMonthInfo();
                        k.drawYear();
                        l.drawCal(a.hidePastMonth)
                    },
                    bind: function() {
                        e.addEvent(d.calNode, "click", function() {
                            e.core.evt.stopEvent()
                        })
                    },
                    destroy: function() {
                        d.layer && d.layer.destroy();
                        d.layer = null;
                        l.removeMonthYear()
                    }
                };
                m.init();
                b.show = l.show;
                b.hide = l.hide;
                b.state = l.state;
                b.getDate = k.getDate;
                b.destroy = m.destroy;
                return b
            }
        },
        "/templates/calendar.html": function(a, b, c, d) {
            a.exports = '<#et userlist data>\n\t<div class="selector">\n\t\t<select node-type="month" class="month htc_select">\n\t\t<#if (data.hidePastMonth)>\n\t\t\t<#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\\\'selected=""\\\':\\\'\\\'}>#L{一月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\\\'selected=""\\\':\\\'\\\'}>#L{二月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\\\'selected=""\\\':\\\'\\\'}>#L{三月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\\\'selected=""\\\':\\\'\\\'}>#L{四月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\\\'selected=""\\\':\\\'\\\'}>#L{五月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\\\'selected=""\\\':\\\'\\\'}>#L{六月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\\\'selected=""\\\':\\\'\\\'}>#L{七月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\\\'selected=""\\\':\\\'\\\'}>#L{八月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\\\'selected=""\\\':\\\'\\\'}>#L{九月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\\\'selected=""\\\':\\\'\\\'}>#L{十月}</option></#if>\n\t\t\t<#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\\\'selected=""\\\':\\\'\\\'}>#L{十一月}</option></#if>\n\t\t\t<#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\\\'selected=""\\\':\\\'\\\'}>#L{十二月}</option></#if>\n\t\t<#else>\n\t\t\t<option value="0"  ${data.showDate.month==0?\\\'selected=""\\\':\\\'\\\'}>#L{一月}</option>\n\t\t\t<option value="1"  ${data.showDate.month==1?\\\'selected=""\\\':\\\'\\\'}>#L{二月}</option>\n\t\t\t<option value="2"  ${data.showDate.month==2?\\\'selected=""\\\':\\\'\\\'}>#L{三月}</option>\n\t\t\t<option value="3"  ${data.showDate.month==3?\\\'selected=""\\\':\\\'\\\'}>#L{四月}</option>\n\t\t\t<option value="4"  ${data.showDate.month==4?\\\'selected=""\\\':\\\'\\\'}>#L{五月}</option>\n\t\t\t<option value="5"  ${data.showDate.month==5?\\\'selected=""\\\':\\\'\\\'}>#L{六月}</option>\n\t\t\t<option value="6"  ${data.showDate.month==6?\\\'selected=""\\\':\\\'\\\'}>#L{七月}</option>\n\t\t\t<option value="7"  ${data.showDate.month==7?\\\'selected=""\\\':\\\'\\\'}>#L{八月}</option>\n\t\t\t<option value="8"  ${data.showDate.month==8?\\\'selected=""\\\':\\\'\\\'}>#L{九月}</option>\n\t\t\t<option value="9"  ${data.showDate.month==9?\\\'selected=""\\\':\\\'\\\'}>#L{十月}</option>\n\t\t\t<option value="10" ${data.showDate.month==10?\\\'selected=""\\\':\\\'\\\'}>#L{十一月}</option>\n\t\t\t<option value="11" ${data.showDate.month==11?\\\'selected=""\\\':\\\'\\\'}>#L{十二月}</option>\n\t\t</#if>\n\t\t</select>\n\t\t<select node-type="year" class="year htc_select">\n\t\t\t<#list data.years as year>\n\t\t\t\t<option value="${year}"${(data.showDate.year==year)?\\\' selected=""\\\':""}>${year}</option>\n\t\t\t</#list>\n\t\t</select>\n\t</div>\n\t<ul class="weeks">\n\t\t<li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li>\n\t</ul>\n\t<ul class="days">\n\t<#list data.datesOffset as list>\n\t\t<li>\n\t\t<#if (list!="")>\n\t\t\t<#if (data.startOffset <= list.dOffset && list.dOffset <=data.endOffset)>\n\t\t\t\t<a action-type="date" href="#date" onclick="return false;" \n\t\t\t\t\ttitle="${data.showDate.year}-${data.showDate.month+1}-${list.d}"\n\t\t\t\t\tyear="${data.showDate.year}" month="${data.showDate.month+1}" day="${list.d}"\n\t\t\t\t\t${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list.d==data.showDate.date)?\\\' class="day"\\\':\\\'\\\'}><strong>${list.d}</strong></a>\n\t\t\t<#else>\n\t\t\t\t${list.d}\n\t\t\t</#if>\n\t\t</#if> \n\t\t</li>\n\t</#list>\n\t</ul>\n</#et>'
        }
    });
    (function() {
        if (!a)
            var a = function() {
                var a = {}, b = "theia", c = [], d = 200, e;
                a[b] = {
                    IE: /msie/i.test(navigator.userAgent),
                    E: function(a) {
                        return typeof a == "string" ? document.getElementById(a) : a
                    },
                    C: function(a) {
                        var b;
                        a = a.toUpperCase();
                        a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
                        return b
                    },
                    log: function() {
                        var a, b = arguments, f = b.length, g = [].slice.apply(b, [0, f]), h = "error", i;
                        while (g[--f])
                            if (g[f]instanceof Error) {
                                a = g.splice(f, 1)[0];
                                break
                            }
                        if (!a) {
                            a = new Error;
                            h = "log"
                        }
                        i = [g, h, (new Date).getTime(), a.message, a.stack];
                        if (e)
                            try {
                                e.apply(null, i)
                            } catch (j) {}
                        else {
                            c.length >= d && c.shift();
                            c.push(i)
                        }
                    },
                    _regLogFn: function(a) {
                        e = a
                    },
                    _clearLogList: function() {
                        return c.splice(0, c.length)
                    }
                };
                var f = a[b];
                f.register = function(c, d, e) {
                    if (!e || typeof e != "string")
                        e = b;
                    a[e] || (a[e] = {});
                    var f = a[e]
                      , h = c.split(".")
                      , i = f
                      , j = null;
                    while (j = h.shift())
                        if (h.length) {
                            i[j] === undefined && (i[j] = {});
                            i = i[j]
                        } else if (i[j] === undefined)
                            try {
                                if (e && e !== b) {
                                    if (c === "core.util.listener") {
                                        i[j] = a[b].core.util.listener;
                                        return !0
                                    }
                                    if (c === "core.util.connect") {
                                        i[j] = a[b].core.util.connect;
                                        return !0
                                    }
                                }
                                i[j] = d(f);
                                return !0
                            } catch (k) {
                                setTimeout(function() {
                                    console.log(k)
                                }, 0)
                            }
                    return !1
                }
                ;
                f.unRegister = function(c, d) {
                    if (!d || typeof d != "string")
                        d = b;
                    var e = a[d]
                      , f = c.split(".")
                      , h = e
                      , i = null;
                    while (i = f.shift())
                        if (f.length) {
                            if (h[i] === undefined)
                                return !1;
                            h = h[i]
                        } else if (h[i] !== undefined) {
                            delete h[i];
                            return !0
                        }
                    return !1
                }
                ;
                f.regShort = function(a, b) {
                    if (f[a] !== undefined)
                        throw "[" + a + "] : short : has been register";
                    f[a] = b
                }
                ;
                f.shortRegister = function(c, d, e) {
                    if (!e || typeof e != "string")
                        e = b;
                    var f = a[e]
                      , h = c.split(".");
                    if (!d)
                        return !1;
                    if (f[d])
                        return !1;
                    var i = f
                      , j = null;
                    while (j = h.shift())
                        if (h.length) {
                            if (i[j] === undefined)
                                return !1;
                            i = i[j]
                        } else if (i[j] !== undefined) {
                            if (f[d])
                                return !1;
                            f[d] = i[j];
                            return !0
                        }
                    return !1
                }
                ;
                f.getPKG = function(c) {
                    if (!c || typeof c != "string")
                        c = b;
                    return a[c]
                }
                ;
                return f
            }();
        a.register("core.dom.removeNode", function(a) {
            return function(c) {
                c = a.E(c) || c;
                try {
                    c.parentNode.removeChild(c)
                } catch (d) {}
            }
        });
        a.register("core.arr.isArray", function(a) {
            return function(a) {
                return Object.prototype.toString.call(a) === "[object Array]"
            }
        });
        a.register("core.func.bind", function(a) {
            return function(c, d, e) {
                e = a.core.arr.isArray(e) ? e : [e];
                return function() {
                    return d.apply(c, e)
                }
            }
        });
        a.register("core.func.empty", function() {
            return function() {}
        });
        a.register("core.evt.addEvent", function(a) {
            return function(c, d, e) {
                c = a.E(c);
                if (c == null)
                    return !1;
                if (typeof e != "function")
                    return !1;
                c.addEventListener ? c.addEventListener(d, e, !1) : c.attachEvent ? c.attachEvent("on" + d, e) : c["on" + d] = e;
                return !0
            }
        });
        a.register("core.evt.removeEvent", function(a) {
            return function(c, d, e) {
                c = a.E(c);
                if (c == null)
                    return !1;
                if (typeof e != "function")
                    return !1;
                c.removeEventListener ? c.removeEventListener(d, e, !1) : c.detachEvent && c.detachEvent("on" + d, e);
                c["on" + d] = null;
                return !0
            }
        });
        a.register("core.obj.parseParam", function(a) {
            return function(a, b, c) {
                var d, e = {};
                b = b || {};
                for (d in a) {
                    e[d] = a[d];
                    b[d] != null && (c ? a.hasOwnProperty(d) && (e[d] = b[d]) : e[d] = b[d])
                }
                return e
            }
        });
        a.register("core.arr.indexOf", function(a) {
            return function(a, b) {
                if (b.indexOf)
                    return b.indexOf(a);
                for (var c = 0, d = b.length; c < d; c++)
                    if (b[c] === a)
                        return c;
                return -1
            }
        });
        a.register("core.arr.inArray", function(a) {
            return function(c, d) {
                return a.core.arr.indexOf(c, d) > -1
            }
        });
        a.register("core.dom.isNode", function(a) {
            return function(a) {
                return a != undefined && Boolean(a.nodeName) && Boolean(a.nodeType)
            }
        });
        a.register("core.json.merge", function(a) {
            var b = function(b) {
                return b === undefined ? !0 : b === null ? !0 : a.core.arr.inArray(typeof b, ["number", "string", "function", "boolean"]) ? !0 : a.core.dom.isNode(b) ? !0 : !1
            }
              , c = function(d, e, f) {
                if (b(f))
                    d[e] = f;
                else {
                    if (a.core.arr.isArray(f)) {
                        a.core.arr.isArray(d[e]) || (d[e] = []);
                        for (var g = 0, h = f.length; g < h; g += 1)
                            c(d[e], g, f[g]);
                        return
                    }
                    if (typeof f == "object") {
                        if (b(d[e]) || a.core.arr.isArray(d[e]))
                            d[e] = {};
                        for (var i in f)
                            c(d[e], i, f[i]);
                        return
                    }
                }
            }
              , d = function(a, b, d) {
                var e = {};
                if (d) {
                    for (var f in a)
                        c(e, f, a[f]);
                    for (var f in b)
                        c(e, f, b[f])
                } else {
                    for (var f in a)
                        e[f] = a[f];
                    for (var f in b)
                        e[f] = b[f]
                }
                return e
            };
            return function(b, c, f) {
                var g = a.core.obj.parseParam({
                    isDeep: !1
                }, f);
                return d(b, c, g.isDeep)
            }
        });
        a.register("core.json.strToJson", function(a) {
            var b, c, d = {
                '"': '"',
                "\\": "\\",
                "/": "/",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "\t"
            }, e, f = function(a) {
                throw {
                    name: "SyntaxError",
                    message: a,
                    at: b,
                    text: e
                }
            }, g = function(a) {
                a && a !== c && f("Expected '" + a + "' instead of '" + c + "'");
                c = e.charAt(b);
                b += 1;
                return c
            }, h = function() {
                var a, b = "";
                if (c === "-") {
                    b = "-";
                    g("-")
                }
                while (c >= "0" && c <= "9") {
                    b += c;
                    g()
                }
                if (c === ".") {
                    b += ".";
                    while (g() && c >= "0" && c <= "9")
                        b += c
                }
                if (c === "e" || c === "E") {
                    b += c;
                    g();
                    if (c === "-" || c === "+") {
                        b += c;
                        g()
                    }
                    while (c >= "0" && c <= "9") {
                        b += c;
                        g()
                    }
                }
                a = +b;
                if (isNaN(a))
                    f("Bad number");
                else
                    return a
            }, i = function() {
                var a, b, e = "", h;
                if (c === '"')
                    while (g()) {
                        if (c === '"') {
                            g();
                            return e
                        }
                        if (c === "\\") {
                            g();
                            if (c === "u") {
                                h = 0;
                                for (b = 0; b < 4; b += 1) {
                                    a = parseInt(g(), 16);
                                    if (!isFinite(a))
                                        break;
                                    h = h * 16 + a
                                }
                                e += String.fromCharCode(h)
                            } else if (typeof d[c] == "string")
                                e += d[c];
                            else
                                break
                        } else
                            e += c
                    }
                f("Bad string")
            }, j = function() {
                while (c && c <= " ")
                    g()
            }, k = function() {
                switch (c) {
                case "t":
                    g("t");
                    g("r");
                    g("u");
                    g("e");
                    return !0;
                case "f":
                    g("f");
                    g("a");
                    g("l");
                    g("s");
                    g("e");
                    return !1;
                case "n":
                    g("n");
                    g("u");
                    g("l");
                    g("l");
                    return null
                }
                f("Unexpected '" + c + "'")
            }, l, m = function() {
                var a = [];
                if (c === "[") {
                    g("[");
                    j();
                    if (c === "]") {
                        g("]");
                        return a
                    }
                    while (c) {
                        a.push(l());
                        j();
                        if (c === "]") {
                            g("]");
                            return a
                        }
                        g(",");
                        j()
                    }
                }
                f("Bad array")
            }, n = function() {
                var a, b = {};
                if (c === "{") {
                    g("{");
                    j();
                    if (c === "}") {
                        g("}");
                        return b
                    }
                    while (c) {
                        a = i();
                        j();
                        g(":");
                        Object.hasOwnProperty.call(b, a) && f('Duplicate key "' + a + '"');
                        b[a] = l();
                        j();
                        if (c === "}") {
                            g("}");
                            return b
                        }
                        g(",");
                        j()
                    }
                }
                f("Bad object")
            };
            l = function() {
                j();
                switch (c) {
                case "{":
                    return n();
                case "[":
                    return m();
                case '"':
                    return i();
                case "-":
                    return h();
                default:
                    return c >= "0" && c <= "9" ? h() : k()
                }
            }
            ;
            return function(a, d) {
                if (window.JSON && window.JSON.parse)
                    return window.JSON.parse(a, d);
                var g;
                e = a;
                b = 0;
                c = " ";
                g = l();
                j();
                c && f("Syntax error");
                return typeof d == "function" ? function h(a, b) {
                    var c, e, f = a[b];
                    if (f && typeof f == "object")
                        for (c in f)
                            if (Object.hasOwnProperty.call(f, c)) {
                                e = h(f, c);
                                e !== undefined ? f[c] = e : delete f[c]
                            }
                    return d.call(a, b, f)
                }({
                    "": g
                }, "") : g
            }
        });
        a.register("core.json.jsonToStr", function(a) {
            function j(a, b) {
                var c, d, g, l, m = e, n, o = b[a];
                o && typeof o == "object" && typeof o.toJSON == "function" && (o = o.toJSON(a));
                typeof h == "function" && (o = h.call(b, a, o));
                switch (typeof o) {
                case "string":
                    return i(o);
                case "number":
                    return isFinite(o) ? String(o) : "null";
                case "boolean":
                case "null":
                    return String(o);
                case "object":
                    if (!o)
                        return "null";
                    e += f;
                    n = [];
                    if (Object.prototype.toString.apply(o) === "[object Array]") {
                        l = o.length;
                        for (c = 0; c < l; c += 1)
                            n[c] = j(c, o) || "null";
                        g = n.length === 0 ? "[]" : e ? "[\n" + e + n.join(",\n" + e) + "\n" + m + "]" : "[" + n.join(",") + "]";
                        e = m;
                        return g
                    }
                    if (h && typeof h == "object") {
                        l = h.length;
                        for (c = 0; c < l; c += 1) {
                            d = h[c];
                            if (typeof d == "string") {
                                g = j(d, o);
                                g && n.push(i(d) + (e ? ": " : ":") + g)
                            }
                        }
                    } else
                        for (d in o)
                            if (Object.hasOwnProperty.call(o, d)) {
                                g = j(d, o);
                                g && n.push(i(d) + (e ? ": " : ":") + g)
                            }
                    g = n.length === 0 ? "{}" : e ? "{\n" + e + n.join(",\n" + e) + "\n" + m + "}" : "{" + n.join(",") + "}";
                    e = m;
                    return g
                }
            }
            function i(a) {
                d.lastIndex = 0;
                return d.test(a) ? '"' + a.replace(d, function(a) {
                    var b = g[a];
                    return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
            }
            function b(a) {
                return a < 10 ? "0" + a : a
            }
            if (typeof Date.prototype.toJSON != "function") {
                Date.prototype.toJSON = function(a) {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
                }
                ;
                String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
                    return this.valueOf()
                }
            }
            var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, f, g = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, h;
            return function(a, b, c) {
                if (window.JSON && window.JSON.stringify)
                    return window.JSON.stringify(a, b, c);
                var d;
                e = "";
                f = "";
                if (typeof c == "number")
                    for (d = 0; d < c; d += 1)
                        f += " ";
                else
                    typeof c == "string" && (f = c);
                h = b;
                if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number")
                    return j("", {
                        "": a
                    });
                throw new Error("JSON.stringify")
            }
        });
        a.register("core.util.getUniqueKey", function(a) {
            var b = (new Date).getTime().toString()
              , c = 1;
            return function() {
                return b + c++
            }
        });
        a.register("core.str.parseURL", function(a) {
            return function(a) {
                var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
                  , c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"]
                  , d = b.exec(a)
                  , e = {};
                for (var f = 0, g = c.length; f < g; f += 1)
                    e[c[f]] = d[f] || "";
                return e
            }
        });
        a.register("core.str.trim", function(a) {
            return function(a) {
                if (typeof a != "string")
                    throw "trim need a string as parameter";
                var b = a.length
                  , c = 0
                  , d = /(\u3000|\s|\t|\u00A0)/;
                while (c < b) {
                    if (!d.test(a.charAt(c)))
                        break;
                    c += 1
                }
                while (b > c) {
                    if (!d.test(a.charAt(b - 1)))
                        break;
                    b -= 1
                }
                return a.slice(c, b)
            }
        });
        a.register("core.json.queryToJson", function(a) {
            return function(c, d) {
                var e = a.core.str.trim(c).split("&")
                  , f = {}
                  , g = function(a) {
                    return d ? decodeURIComponent(a) : a
                };
                for (var h = 0, i = e.length; h < i; h++)
                    if (e[h]) {
                        var j = e[h].split("=")
                          , k = j[0]
                          , l = j[1];
                        if (j.length < 2) {
                            l = k;
                            k = "$nullName"
                        }
                        if (!f[k])
                            f[k] = g(l);
                        else {
                            a.core.arr.isArray(f[k]) != !0 && (f[k] = [f[k]]);
                            f[k].push(g(l))
                        }
                    }
                return f
            }
        });
        a.register("core.json.jsonToQuery", function(a) {
            var b = function(b, c) {
                b = b == null ? "" : b;
                b = a.core.str.trim(b.toString());
                return c ? encodeURIComponent(b) : b
            };
            return function(a, d) {
                var e = [];
                if (typeof a == "object")
                    for (var f in a) {
                        if (f === "$nullName") {
                            e = e.concat(a[f]);
                            continue
                        }
                        if (a[f]instanceof Array)
                            for (var g = 0, h = a[f].length; g < h; g++)
                                e.push(f + "=" + b(a[f][g], d));
                        else
                            typeof a[f] != "function" && e.push(f + "=" + b(a[f], d))
                    }
                return e.length ? e.join("&") : ""
            }
        });
        a.register("core.util.URL", function(a) {
            return function(c, d) {
                var e = a.core.obj.parseParam({
                    isEncodeQuery: !1,
                    isEncodeHash: !1
                }, d || {})
                  , f = {}
                  , g = a.core.str.parseURL(c)
                  , h = a.core.json.queryToJson(g.query)
                  , i = a.core.json.queryToJson(g.hash);
                f.setParam = function(a, b) {
                    h[a] = b;
                    return this
                }
                ;
                f.getParam = function(a) {
                    return h[a]
                }
                ;
                f.setParams = function(a) {
                    for (var b in a)
                        f.setParam(b, a[b]);
                    return this
                }
                ;
                f.setHash = function(a, b) {
                    i[a] = b;
                    return this
                }
                ;
                f.getHash = function(a) {
                    return i[a]
                }
                ;
                f.valueOf = f.toString = function() {
                    var c = []
                      , d = a.core.json.jsonToQuery(h, e.isEncodeQuery)
                      , f = a.core.json.jsonToQuery(i, e.isEncodeQuery);
                    if (g.scheme != "") {
                        c.push(g.scheme + ":");
                        c.push(g.slash)
                    }
                    if (g.host != "") {
                        c.push(g.host);
                        if (g.port != "") {
                            c.push(":");
                            c.push(g.port)
                        }
                    }
                    c.push("/");
                    c.push(g.path);
                    d != "" && c.push("?" + d);
                    f != "" && c.push("#" + f);
                    return c.join("")
                }
                ;
                return f
            }
        });
        a.register("core.io.scriptLoader", function(a) {
            var b = {}
              , c = {
                url: "",
                charset: "UTF-8",
                timeout: 3e4,
                args: {},
                onComplete: a.core.func.empty,
                onTimeout: a.core.func.empty,
                isEncode: !1,
                uniqueID: null
            };
            return function(e) {
                var f, g, h = a.core.obj.parseParam(c, e);
                if (h.url == "")
                    throw "scriptLoader: url is null";
                var i = h.uniqueID || a.core.util.getUniqueKey();
                f = b[i];
                if (f != null && a.IE != !0) {
                    a.core.dom.removeNode(f);
                    f = null
                }
                f == null && (f = b[i] = a.C("script"));
                f.charset = h.charset;
                f.id = "scriptRequest_script_" + i;
                f.type = "text/javascript";
                h.onComplete != null && (a.IE ? f.onreadystatechange = function() {
                    if (f.readyState.toLowerCase() == "loaded" || f.readyState.toLowerCase() == "complete") {
                        try {
                            clearTimeout(g);
                            document.getElementsByTagName("head")[0].removeChild(f);
                            f.onreadystatechange = null
                        } catch (a) {}
                        h.onComplete()
                    }
                }
                : f.onload = function() {
                    try {
                        clearTimeout(g);
                        a.core.dom.removeNode(f)
                    } catch (b) {}
                    h.onComplete()
                }
                );
                f.src = a.core.util.URL(h.url, {
                    isEncodeQuery: h.isEncode
                }).setParams(h.args).toString();
                document.getElementsByTagName("head")[0].appendChild(f);
                h.timeout > 0 && (g = setTimeout(function() {
                    try {
                        document.getElementsByTagName("head")[0].removeChild(f)
                    } catch (a) {}
                    h.onTimeout()
                }, h.timeout));
                return f
            }
        });
        a.register("core.io.jsonp", function(a) {
            return function(c) {
                var d = a.core.obj.parseParam({
                    url: "",
                    charset: "UTF-8",
                    timeout: 3e4,
                    args: {},
                    onComplete: null,
                    onTimeout: null,
                    responseName: null,
                    isEncode: !1,
                    varkey: "callback"
                }, c)
                  , e = -1
                  , f = d.responseName || "STK_" + a.core.util.getUniqueKey();
                d.args[d.varkey] = f;
                var g = d.onComplete
                  , h = d.onTimeout;
                window[f] = function(a) {
                    if (e != 2 && g != null) {
                        e = 1;
                        g(a)
                    }
                }
                ;
                d.onComplete = null;
                d.onTimeout = function() {
                    if (e != 1 && h != null) {
                        e = 2;
                        h()
                    }
                }
                ;
                return a.core.io.scriptLoader(d)
            }
        });
        (function() {
            var b = a.core
              , c = {
                removeNode: b.dom.removeNode,
                bind: b.func.bind,
                empty: b.func.empty,
                addEvent: b.evt.addEvent,
                removeEvent: b.evt.removeEvent,
                parseParam: b.obj.parseParam,
                merge: b.json.merge,
                str2Json: b.json.strToJson,
                json2Str: b.json.jsonToStr,
                jsonp: b.io.jsonp,
                scriptLoader: b.io.scriptLoader
            };
            for (var d in c)
                c[d] && a.regShort(d, c[d])
        }
        )();
        a.register("core.util.listener", function(a) {
            return function() {
                var a = {}, b = [], c, d = function() {
                    if (b.length != 0) {
                        clearTimeout(c);
                        var a = b.splice(0, 1)[0];
                        try {
                            a.func.apply(a.func, [].concat(a.data))
                        } catch (g) {}
                        c = setTimeout(d, 25)
                    }
                };
                return {
                    register: function(b, c, d) {
                        a[b] = a[b] || {};
                        a[b][c] = a[b][c] || [];
                        a[b][c].push(d)
                    },
                    fire: function(c, g, h) {
                        var i, j, k;
                        if (a[c] && a[c][g] && a[c][g].length > 0) {
                            i = a[c][g];
                            i.data_cache = h;
                            for (j = 0,
                            k = i.length; j < k; j++)
                                b.push({
                                    channel: c,
                                    evt: g,
                                    func: i[j],
                                    data: h
                                });
                            d()
                        }
                    },
                    remove: function(b, c, d) {
                        if (a[b] && a[b][c])
                            for (var e = 0, f = a[b][c].length; e < f; e++)
                                if (a[b][c][e] === d) {
                                    a[b][c].splice(e, 1);
                                    break
                                }
                    },
                    list: function() {
                        return a
                    },
                    cache: function(b, c) {
                        if (a[b] && a[b][c])
                            return a[b][c].data_cache
                    }
                }
            }()
        });
        a.register("common.listener", function(a) {
            var b = {}
              , c = {};
            c.define = function(c, e) {
                if (b[c] != null)
                    throw "common.listener.define: 频道已被占用";
                b[c] = e;
                var f = {};
                f.register = function(e, f) {
                    if (b[c] == null)
                        throw "common.listener.define: 频道未定义";
                    a.core.util.listener.register(c, e, f)
                }
                ;
                f.fire = function(e, f) {
                    if (b[c] == null)
                        throw "commonlistener.define: 频道未定义";
                    a.core.util.listener.fire(c, e, f)
                }
                ;
                f.remove = function(b, d) {
                    a.core.util.listener.remove(c, b, d)
                }
                ;
                return f
            }
            ;
            return c
        });
        a.register("common.channel.plugin", function(a) {
            return a.common.listener.define("common.channel.plugin", ["getinfo_error", "getuserinfo_ready", "getuserinfo_timeout", "getuserticket_ready", "getuserticket_timeout", "login_success", "login_failure"])
        });
        a.register("core.dom.addHTML", function(a) {
            return function(a, b) {
                if (a.insertAdjacentHTML)
                    a.insertAdjacentHTML("BeforeEnd", b);
                else {
                    var c = a.ownerDocument.createRange();
                    c.setStartBefore(a);
                    var d = c.createContextualFragment(b);
                    a.appendChild(d)
                }
            }
        });
        a.register("core.arr.foreach", function(a) {
            var b = function(a, b) {
                var c = [];
                for (var d = 0, e = a.length; d < e; d += 1) {
                    var f = b(a[d], d);
                    if (f === !1)
                        break;
                    f !== null && (c[d] = f)
                }
                return c
            }
              , c = function(a, b) {
                var c = {};
                for (var d in a) {
                    var e = b(a[d], d);
                    if (e === !1)
                        break;
                    e !== null && (c[d] = e)
                }
                return c
            };
            return function(e, f) {
                if (a.core.arr.isArray(e) || e.length && e[0] !== undefined)
                    return b(e, f);
                if (typeof e == "object")
                    return c(e, f);
                return null
            }
        });
        a.register("common.util.request", function(a) {
            var b = {};
            b.proxySrc = "about:blank";
            b.proxyDiv = a.C("div");
            b.createIframe = function() {
                var a = "iframe" + (new Date).getTime()
                  , c = a;
                b.proxyDiv.innerHTML = '<iframe id="' + a + '" src="' + b.proxySrc + '" name="' + c + '"" style="display:none;"></iframe>';
                iframe = b.proxyDiv.children[0];
                document.body.appendChild(iframe);
                return iframe
            }
            ;
            b.createForm = function(b, d, e) {
                var f = a.C("form")
                  , g = "form" + (new Date).getTime();
                f.id = g;
                f.style.display = "none";
                f.method = "post";
                f.action = b;
                f.target = d;
                a.core.arr.foreach(e || {}, function(a, b) {
                    b = b;
                    a = a;
                    f.innerHTML += '<input type="hidden" name=' + b + " value=" + a + ">"
                });
                document.body.appendChild(f);
                return f
            }
            ;
            b.getDocOfIframe = function(a) {
                return a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document
            }
            ;
            b.iframeLoad = function(b, d) {
                a.addEvent(b, "load", d)
            }
            ;
            b.iframeUnload = function(b, d) {
                a.removeEvent(b, "load", d)
            }
            ;
            return function(d) {
                d = a.core.obj.parseParam({
                    url: "",
                    data: null,
                    complete: null,
                    fail: null,
                    timeout: null
                }, d);
                var e = b.createIframe(), f, g = function() {
                    try {
                        var i = e.contentWindow
                          , j = i.location.href
                          , k = b.getDocOfIframe(e)
                          , l = k.body.getElementsByTagName("textarea")[0];
                        clearTimeout(f);
                        try {
                            a.core.dom.removeNode(h);
                            h = null
                        } catch (m) {}
                        b.iframeUnload(e, g);
                        e.src = b.proxySrc;
                        a.core.dom.removeNode(e);
                        e = null;
                        if (!l)
                            d.fail && d.fail();
                        else {
                            var n = a.core.json.strToJson(l.value) || "test json";
                            d.complete && d.complete(n)
                        }
                    } catch (m) {}
                };
                b.iframeLoad(e, g);
                var h = b.createForm(d.url, e.name, d.data);
                h.submit();
                f = setTimeout(function() {
                    a.core.dom.removeNode(h);
                    e.src = b.proxySrc;
                    a.core.dom.removeNode(e);
                    d.timeout && d.timeout()
                }, 1e4)
            }
        });
        a.register("comp.plugin", function(a) {
            var b = a.common.channel.plugin
              , c = a.common.util.request
              , d = {}
              , e = {};
            e.canPostMessage = !1;
            var f = {
                iframeUrl: "//login.sina.com.cn/plugin_proxy.html",
                proxyUrl: "",
                getinfos_timeout: 1e4,
                getticket_timeout: 1e4,
                entry: "sso",
                domain: "weibo.com",
                savestate: "30",
                crossdomain_timeout: 1e4,
                login_request_timeout: 1e4
            };
            d.init = function(c) {
                f = a.merge(f, c);
                e.canPostMessage = !e.isIE() || e.isIE() && e.isIE() > 8;
                if (!e.canPostMessage && !f.proxyUrl)
                    b.fire("getinfo_error", {
                        code: "-3",
                        msg: "br can't support postMessage, please provide proxy html"
                    });
                else {
                    e.canPostMessage && a.addEvent(window, "message", e.handleMsgEvt);
                    d.getUserInfos()
                }
            }
            ;
            e.isIE = function() {
                var a = navigator.userAgent.toLowerCase();
                if (/msie/.test(a)) {
                    var b = a.match(/msie (\d+)/)
                      , c = parseInt(b[1]);
                    return c
                }
                return !1
            }
            ;
            e.createIframe = function(b, c) {
                var d = "plugin_sso_iframe" + (new Date).getTime()
                  , f = d;
                e.proxyDiv = a.C("div");
                e.proxyDiv.innerHTML = '<iframe id="' + d + '" src="' + b + '" name="' + f + '"" style=""></iframe>';
                e.iframeDom = e.proxyDiv.children[0];
                e.iframeDom.style.top = "-1000px";
                e.iframeDom.style.left = "-1000px";
                e.iframeDom.style.position = "absolute";
                document.body.appendChild(e.iframeDom);
                e.iframeHandle = window.frames[f];
                a.addEvent(e.iframeDom, "load", c)
            }
            ;
            e.destroyIframe = function(b) {
                e.iframeDom.src = "about:blank";
                a.removeEvent(e.iframeDom, "load", b);
                a.removeNode(e.iframeDom);
                e.iframeDom = null;
                e.iframeHandle = null
            }
            ;
            e.handleMsgEvt = function(c) {
                if (!e.canPostMessage || c.origin == "//login.sina.com.cn") {
                    clearTimeout(e.getInfosTimeout);
                    e.getInfosTimeout = null;
                    clearTimeout(e.getTicketTimeout);
                    e.getTicketTimeout = null;
                    if (!c || !c.data || e.canPostMessage && c.origin != "//login.sina.com.cn") {
                        b.fire("getinfo_error", {
                            code: "-3",
                            msg: "error data"
                        });
                        return
                    }
                    var d = a.str2Json(decodeURIComponent(c.data));
                    if (!d || d.code != "0" && d.code != "-1")
                        b.fire("getinfo_error", d);
                    else if (d.type == "userinfo")
                        b.fire("getuserinfo_ready", d);
                    else if (d.type == "userticket") {
                        b.fire("getuserticket_ready", d);
                        a.removeEvent(window, "message", e.handleMsgEvt);
                        e.login(d)
                    }
                    if (!e.canPostMessage)
                        try {
                            e.destroyIframe(e.getUserInfos);
                            e.destroyIframe(e.getUserTicket)
                        } catch (f) {}
                }
            }
            ;
            e.login = function(c) {
                if (!!c) {
                    var d = c && c.data
                      , h = d.uid
                      , i = d.alc;
                    a.jsonp({
                        url: "https://login.sina.com.cn/sso/login.php",
                        timeout: f.login_request_timeout,
                        args: {
                            entry: f.entry,
                            returntype: "TEXT",
                            crossdomain: 1,
                            cdult: 3,
                            domain: f.domain,
                            alt: i,
                            savestate: f.savestate
                        },
                        onComplete: function(a) {
                            a.retcode != 0 ? b.fire("login_failure", {
                                code: a.retcode,
                                msg: a.reason
                            }) : e.crossdomain(a, function(c) {
                                c.result === !1 ? b.fire("login_failure", {
                                    code: -2,
                                    msg: "登录失败"
                                }) : b.fire("login_success", a)
                            })
                        },
                        onTimeout: function() {
                            b.fire("login_failure", {
                                code: -1,
                                msg: "登录超时"
                            })
                        },
                        isEncode: !0,
                        varkey: "callback"
                    })
                }
            }
            ;
            e.crossdomain = function(b, c) {
                var d = b.crossDomainUrlList.length;
                if (d == 0)
                    c({
                        result: !0
                    });
                else {
                    var e = setTimeout(function() {
                        d = -1;
                        c({
                            result: !1
                        })
                    }, f.crossdomain_timeout);
                    for (var g in b.crossDomainUrlList)
                        a.scriptLoader({
                            url: b.crossDomainUrlList[g],
                            charset: "UTF-8",
                            args: {
                                action: "login"
                            },
                            onComplete: function() {
                                d--;
                                if (d == 0) {
                                    clearTimeout(e);
                                    c({
                                        result: !0
                                    })
                                }
                            }
                        })
                }
            }
            ;
            e.getUserInfos = function() {
                if (e.canPostMessage) {
                    var c = {
                        type: "userinfo"
                    };
                    c = a.json2Str(c);
                    e.iframeHandle && e.iframeHandle.postMessage(c, f.iframeUrl)
                }
                e.getInfosTimeout || (e.getInfosTimeout = setTimeout(function() {
                    b.fire("getuserinfo_timeout", {
                        code: "-2",
                        msg: "getuserinfo_timeout"
                    });
                    e.getInfosTimeout = null
                }, f.getinfos_timeout))
            }
            ;
            e.getUserTicket = function(c) {
                if (e.canPostMessage) {
                    var d = {
                        type: "userticket",
                        uid: c
                    };
                    d = a.json2Str(d);
                    e.iframeHandle.postMessage(d, f.iframeUrl)
                }
                e.getTicketTimeout || (e.getTicketTimeout = setTimeout(function() {
                    b.fire("getuserticket_timeout", {
                        code: "-2",
                        msg: "getuserticket_timeout"
                    });
                    e.getTicketTimeout = null
                }, f.getticket_timeout))
            }
            ;
            d.callbacks = {};
            e.setCallback = function() {
                var a = "callback_" + (+(new Date)).toString(16);
                d.callbacks[a] = function(b) {
                    e.handleMsgEvt(b);
                    delete d.callbacks[a]
                }
                ;
                return ["SINA_USER_PLUGIN", "callbacks", a].join(".")
            }
            ;
            d.getUserInfos = function() {
                var a = ""
                  , b = "";
                if (e.iframeDom)
                    e.getUserInfos();
                else {
                    if (e.canPostMessage)
                        var b = f.iframeUrl;
                    else {
                        a = e.setCallback();
                        var b = f.iframeUrl + "?proxy=" + f.proxyUrl + "&type=userinfo&callback=" + a
                    }
                    e.createIframe(b, e.getUserInfos)
                }
            }
            ;
            d.getUserTicket = function(a) {
                var b = ""
                  , c = "";
                if (e.iframeDom)
                    e.getUserTicket(a);
                else {
                    if (e.canPostMessage)
                        var c = f.iframeUrl;
                    else {
                        b = e.setCallback();
                        var c = f.iframeUrl + "?proxy=" + f.proxyUrl + "&type=userticket&uid=" + a + "&callback=" + b
                    }
                    e.createIframe(c, e.getUserTicket)
                }
            }
            ;
            d.login = function(a) {
                d.getUserTicket(a)
            }
            ;
            d.register = function(a, c) {
                b.register(a, c);
                return d
            }
            ;
            d.remove = function(a, c) {
                b.remove(a, c);
                return d
            }
            ;
            d.destroy = function() {}
            ;
            return d
        });
        (function(b) {
            var c = a.comp.plugin;
            c.listener = b.common.channel.plugin;
            c.getVersion = function() {
                return "1.0.0"
            }
            ;
            c.STK = a;
            this.SINA_USER_PLUGIN = c
        }
        ).call(this, a)
    }
    ).call(this);
    STK.register("v6.lib.kit.extra.listener", function(a) {
        var b = {}
          , c = {};
        c.define = function(c, d) {
            if (b[c] != null)
                throw "common.listener.define: 频道已被占用";
            b[c] = d;
            var e = {};
            e.register = function(d, e) {
                if (b[c] == null)
                    throw "common.listener.define: 频道未定义";
                a.listener.register(c, d, e)
            }
            ;
            e.fire = function(d, e) {
                if (b[c] == null)
                    throw "commonlistener.define: 频道未定义";
                a.listener.fire(c, d, e)
            }
            ;
            e.remove = function(b, d) {
                a.listener.remove(c, b, d)
            }
            ;
            e.cache = function(b) {
                return a.listener.cache(c, b)
            }
            ;
            return e
        }
        ;
        return c
    });
    STK.register("v6.conf.channel.sso.desktop", function(a) {
        var b = ["getuserinfo_ready", "getuserinfo_timeout", "getuserticket_ready", "getuserticket_timeout", "init", "login", "login_success", "login_error", "getinfo_error"];
        return a.v6.lib.kit.extra.listener.define("v6.conf.channel.sso.desktop", b)
    });
    STK.register("v6.pub.plugin.sso.desktopbridge", function(a) {
        var b = window.SINA_USER_PLUGIN
          , c = a.v6.conf.channel.sso.desktop;
        return function(a) {
            var d = !1
              , e = {
                init: function() {
                    if (!d) {
                        e.bind();
                        d = !0
                    }
                },
                bind: function() {
                    for (var a in e.send)
                        b.register(a, e.send[a]);
                    for (var a in e.handle)
                        c.register(a, e.handle[a])
                },
                unbind: function() {},
                send: {
                    getuserinfo_ready: function(a) {
                        c.fire("getuserinfo_ready", a)
                    },
                    getuserinfo_timeout: function(a) {
                        c.fire("getuserinfo_timeout", a)
                    },
                    getuserticket_ready: function(a) {
                        c.fire("getuserticket_ready", a)
                    },
                    getuserticket_timeout: function(a) {
                        c.fire("getuserticket_timeout", a)
                    },
                    login_success: function(a) {
                        c.fire("login_success", a)
                    },
                    login_failure: function(a) {
                        c.fire("login_failure", a)
                    },
                    getinfo_error: function(a) {
                        c.fire("getinfo_error", a)
                    }
                },
                handle: {
                    init: function() {
                        b.init({
                            iframeUrl: "//login.sina.com.cn/plugin_proxy.html",
                            proxyUrl: "//weibo.com/sso/desktopcallback",
                            getinfos_timeout: 5e3,
                            getticket_timeout: 5e3
                        })
                    },
                    login: function(a) {
                        b.login(a)
                    }
                }
            }
              , f = {};
            e.init();
            return f
        }
    });
    function SSOController() {
        var undefined, me = this, updateCookieTimer = null, updateCookieTimeHardLimit = 1800, cookieExpireTimeLength = 86400, crossDomainForward = null, crossDomainTimer = null, crossDomainTime = 3, autoLoginCallBack2 = null, ssoCrosssDomainUrl = "https://login.sina.com.cn/sso/crossdomain.php", ssoLoginUrl = "https://login.sina.com.cn/sso/login.php", ssoLogoutUrl = "https://login.sina.com.cn/sso/logout.php", ssoUpdateCookieUrl = "https://login.sina.com.cn/sso/updatetgt.php", ssoPreLoginUrl = "https://login.sina.com.cn/sso/prelogin.php", pincodeUrl = "https://login.sina.com.cn/cgi/pin.php", vfValidUrl = "http://weibo.com/sguide/vdun.php", generateVisitorUrl = "https://passport.weibo.com/visitor/visitor", crossDomainUrlList = null, loginMethod = "", ssoServerTimeTimer = null, ssoLoginTimer = null, loginByConfig = null, loginMethodCheck = null, https = 1, rsa = 2, wsse = 4, pcid = "", tmpData = {}, preloginTimeStart = 0, preloginTime = 0, callbackLogoutStatus;
        this.https = 1;
        this.rsa = 2;
        this.wsse = 4;
        this.name = "sinaSSOController";
        this.loginFormId = "ssoLoginForm";
        this.scriptId = "ssoLoginScript";
        this.ssoCrossDomainScriptId = "ssoCrossDomainScriptId";
        this.loginFrameName = "ssoLoginFrame";
        this.appLoginURL = {
            "weibo.com": "https://passport.weibo.com/wbsso/login"
        };
        this.appDomainService = {
            "weibo.com": "miniblog"
        };
        this.loginExtraQuery = {};
        this.setDomain = !1;
        this.feedBackUrl = "";
        this.service = "sso";
        this.domain = "sina.com.cn";
        this.from = "";
        this.pageCharset = "GB2312";
        this.useTicket = !1;
        this.isCheckLoginState = !1;
        this.isUpdateCookieOnLoad = !0;
        this.useIframe = !0;
        this.noActiveTime = 7200;
        this.autoUpdateCookieTime = 1800;
        this.loginType = rsa;
        this.timeoutEnable = !1;
        this.loginTimeout = 5e3;
        this.crossDomain = !0;
        this.scriptLoginHttps = !1;
        this.allowAutoFoundServerTime = !1;
        this.allowAutoFoundServerTimeError = !0;
        this.calcServerTimeInterval = 2e3;
        this.servertime = null;
        this.nonce = null;
        this.rsaPubkey = null;
        this.rsakv = null;
        this.loginExtraFlag = {};
        this.cdult = !1;
        this.crossDomainTime = 5;
        this.failRedirect = !1;
        this.isGenerateVisitor = !0;
        this.generateVisitorProbability = 1;
        this.generateVisitorDelay = 6;
        this.generateVisitorDomain = ["^.*sina.com.cn$"];
        this.getVersion = function() {
            return "ssologin.js(v1.4.19) 2017-01-09"
        }
        ;
        this.getEntry = function() {
            return me.entry
        }
        ;
        this.getClientType = function() {
            return me.getVersion().split(" ")[0]
        }
        ;
        this.init = function() {
            if (getType(arguments[0]) === "object")
                return customPrepare(arguments[0]);
            me.setLoginType(me.loginType);
            var a = window.sinaSSOConfig;
            typeof a != "object" && (a = {});
            var b;
            for (b in a)
                me[b] = a[b];
            me.entry || (me.entry = me.service);
            me.isUpdateCookieOnLoad && setTimeout(me.name + ".updateCookie()", 1e4);
            me.isGenerateVisitor && self === top && Math.random() < me.generateVisitorProbability && location.protocol !== "https:" && setTimeout(me.name + ".generateVisitor()", me.generateVisitorDelay * 1e3);
            me.isCheckLoginState && addEventListener(window, "load", function() {
                me.checkLoginState()
            });
            me.allowAutoFoundServerTime && ssoLoginServerTime && me.setServerTime(ssoLoginServerTime);
            me.customInit()
        }
        ;
        this.getLoginInfo = function() {
            var a = getCookie("sso_info");
            if (!a)
                return {};
            try {
                return parse_str(sinaSSOEncoder.Cookie.decode(a))
            } catch (b) {
                return {}
            }
        }
        ;
        this.customInit = function() {}
        ;
        this.customUpdateCookieCallBack = function(a) {}
        ;
        this.customLoginCallBack = function(a) {}
        ;
        this.customLogoutCallBack = function(a) {
            me.customLoginCallBack({
                result: !1
            })
        }
        ;
        var customLogin, customPrepare, customLogout;
        (function() {
            var a = function() {}
              , b = {
                username: "",
                password: "",
                savestate: 0,
                vsnf: 0,
                vsnval: "",
                door: "",
                setCookie: 1,
                ssoSimpleLogin: 0,
                onComplete: a,
                onSuccess: a,
                onFailure: a
            }
              , c = {
                onComplete: a,
                onSuccess: a,
                onFailure: a
            }
              , d = {
                vsnf: "vsnf",
                vsnval: "vsnval",
                door: "door",
                setCookie: "s",
                ssoSimpleLogin: "ssosimplelogin"
            }
              , e = {}
              , f = {}
              , g = function(a, b) {
                var c, d = {};
                a = a || {};
                b = b || {};
                objMerge(d, a);
                for (c in b)
                    a.hasOwnProperty(c) && (d[c] = b[c]);
                return d
            }
              , h = function(a, b, c) {
                typeof a[b] == "function" && a[b](c)
            };
            this.callbackLoginStatus = function(a) {
                me.customLoginCallBack(a);
                h(e, "onComplete", a);
                a && a.result === !0 ? h(e, "onSuccess", a) : h(e, "onFailure", a)
            }
            ;
            callbackLogoutStatus = function(a) {
                me.customLogoutCallBack(a);
                h(f, "onComplete", a);
                a && a.result === !0 ? h(f, "onSuccess", a) : h(f, "onFailure", a)
            }
            ;
            customPrepare = function(a) {
                var c;
                a = a || {};
                e = objMerge({
                    entry: "sso",
                    useTicket: !1,
                    service: "sso",
                    domain: "sina.com.cn",
                    feedBackUrl: "",
                    setDomain: !1,
                    crossDomain: !0,
                    name: "sinaSSOController"
                }, b);
                e = g(e, a);
                window[e.name] = window[e.name] || me;
                for (c in e)
                    b.hasOwnProperty(c) || (me[c] = e[c]);
                me.loginExtraQuery = {};
                objMerge(me.loginExtraQuery, e.loginExtraQuery);
                for (c in d)
                    e.hasOwnProperty(c) && (me.loginExtraQuery[d[c]] = e[c])
            }
            ;
            customLogin = function(a) {
                a = a || {};
                customPrepare(a);
                me.login(e.username, e.password, e.savestate)
            }
            ;
            customLogout = function(a) {
                a = a || {};
                f = objMerge({}, c);
                f = g(f, a);
                me.logout()
            }
        }
        ).apply(this);
        this.login = function(a, b, c) {
            var d = arguments[3] ? arguments[3] : !1;
            if (getType(arguments[0]) === "object")
                return customLogin(arguments[0]);
            ssoLoginTimer ? ssoLoginTimer.clear() : ssoLoginTimer = new prototypeTimer(me.timeoutEnable);
            ssoLoginTimer.start(me.loginTimeout, function() {
                ssoLoginTimer.clear();
                me.callbackLoginStatus({
                    result: !1,
                    errno: -1,
                    reason: unescape("%u767B%u5F55%u8D85%u65F6%uFF0C%u8BF7%u91CD%u8BD5")
                })
            });
            c = c == undefined ? 0 : c;
            tmpData.savestate = c;
            loginByConfig = function() {
                if (!me.feedBackUrl && loginByXMLHttpRequest(a, b, c, d))
                    return !0;
                if (me.useIframe && (me.setDomain || me.feedBackUrl)) {
                    if (me.setDomain) {
                        document.domain = me.domain;
                        !me.feedBackUrl && me.domain != "sina.com.cn" && (me.feedBackUrl = makeURL(me.appLoginURL[me.domain], {
                            domain: 1
                        }))
                    }
                    loginMethod = "post";
                    var e = loginByIframe(a, b, c, d);
                    if (!e) {
                        loginMethod = "get";
                        me.scriptLoginHttps ? me.setLoginType(me.loginType | https) : me.setLoginType(me.loginType | rsa);
                        loginByScript(a, b, c, d)
                    }
                } else {
                    loginMethod = "get";
                    loginByScript(a, b, c, d)
                }
                me.nonce = null
            }
            ;
            loginMethodCheck = function() {
                if (me.loginType & wsse || me.loginType & rsa) {
                    if (me.servertime) {
                        me.nonce || (me.nonce = makeNonce(6));
                        loginByConfig();
                        return !0
                    }
                    me.getServerTime(a, loginByConfig)
                } else
                    loginByConfig()
            }
            ;
            loginMethodCheck();
            return !0
        }
        ;
        this.prelogin = function(a, b) {
            var c = ssoPreLoginUrl
              , d = a.username || "";
            d = sinaSSOEncoder.base64.encode(urlencode(d));
            delete a.username;
            var e = {
                entry: me.entry,
                callback: me.name + ".preloginCallBack",
                su: d,
                rsakt: "mod"
            };
            c = makeURL(c, objMerge(e, a));
            me.preloginCallBack = function(a) {
                if (a && a.retcode == 0) {
                    me.setServerTime(a.servertime);
                    me.nonce = a.nonce;
                    me.rsaPubkey = a.pubkey;
                    me.rsakv = a.rsakv;
                    pcid = a.pcid;
                    preloginTime = (new Date).getTime() - preloginTimeStart - (parseInt(a.exectime, 10) || 0)
                }
                typeof b == "function" && b(a)
            }
            ;
            preloginTimeStart = (new Date).getTime();
            excuteScript(me.scriptId, c)
        }
        ;
        this.getServerTime = function(a, b) {
            if (me.servertime) {
                typeof b == "function" && b({
                    retcode: 0,
                    servertime: me.servertime
                });
                return !0
            }
            me.prelogin({
                username: a
            }, b)
        }
        ;
        this.logout = function() {
            try {
                if (getType(arguments[0]) === "object")
                    return customLogout(arguments[0]);
                var a = {
                    entry: me.getEntry(),
                    callback: me.name + ".ssoLogoutCallBack"
                };
                try {
                    a.sr = window.screen.width + "*" + window.screen.height
                } catch (b) {}
                var c = makeURL(ssoLogoutUrl, a);
                excuteScript(me.scriptId, c)
            } catch (b) {}
            return !0
        }
        ;
        this.ssoLogoutCallBack = function(a) {
            a.arrURL && me.setCrossDomainUrlList(a);
            me.crossDomainAction("logout", function() {
                callbackLogoutStatus({
                    result: !0
                })
            })
        }
        ;
        this.updateCookie = function() {
            try {
                if (me.autoUpdateCookieTime > 5) {
                    updateCookieTimer != null && clearTimeout(updateCookieTimer);
                    updateCookieTimer = setTimeout(me.name + ".updateCookie()", me.autoUpdateCookieTime * 1e3)
                }
                var a = me.getCookieExpireTime()
                  , b = (new Date).getTime() / 1e3
                  , c = {};
                a == null ? c = {
                    retcode: 6102
                } : a < b ? c = {
                    retcode: 6203
                } : a - cookieExpireTimeLength + updateCookieTimeHardLimit > b ? c = {
                    retcode: 6110
                } : a - b > me.noActiveTime && (c = {
                    retcode: 6111
                });
                if (c.retcode !== undefined) {
                    me.customUpdateCookieCallBack(c);
                    return !1
                }
                var d = makeURL(ssoUpdateCookieUrl, {
                    entry: me.getEntry(),
                    callback: me.name + ".updateCookieCallBack"
                });
                excuteScript(me.scriptId, d)
            } catch (e) {}
            return !0
        }
        ;
        this.setCrossDomainUrlList = function(a) {
            crossDomainUrlList = a
        }
        ;
        this.checkAltLoginName = function() {
            return !0
        }
        ;
        this.callFeedBackUrl = function(a) {
            try {
                var b = {
                    callback: me.name + ".feedBackUrlCallBack"
                };
                a.ticket && (b.ticket = a.ticket);
                a.retcode !== undefined && (b.retcode = a.retcode);
                var c = makeURL(me.feedBackUrl, b);
                excuteScript(me.scriptId, c)
            } catch (d) {}
            return !0
        }
        ;
        this.loginCallBack = function(a) {
            try {
                if (me.timeoutEnable && !ssoLoginTimer.isset())
                    return;
                ssoLoginTimer.clear();
                me.loginExtraFlag = {};
                var b = {}
                  , c = a.ticket
                  , d = a.uid;
                if (d) {
                    b.result = !0;
                    b.retcode = 0;
                    b.userinfo = {
                        uniqueid: a.uid
                    };
                    c && (b.ticket = c);
                    a.cookie && (b.cookie = a.cookie);
                    if (me.feedBackUrl)
                        me.crossDomain ? me.crossDomainAction("login", function() {
                            me.callFeedBackUrl(b)
                        }) : me.callFeedBackUrl(b);
                    else if (me.crossDomain) {
                        a.crossDomainUrlList && me.setCrossDomainUrlList({
                            retcode: 0,
                            arrURL: a.crossDomainUrlList
                        });
                        me.crossDomainAction("login", function() {
                            if (c && me.appLoginURL[me.domain])
                                me.appLogin(c, me.domain, me.name + ".callbackLoginStatus");
                            else {
                                b.userinfo = objMerge(b.userinfo, me.getSinaCookie());
                                me.callbackLoginStatus(b)
                            }
                        })
                    } else
                        me.callbackLoginStatus(b)
                } else {
                    if (loginMethodCheck && a.retcode == "2092" && me.allowAutoFoundServerTimeError) {
                        me.setServerTime(0);
                        me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                            wsseretry: "servertime_error"
                        });
                        loginMethodCheck();
                        loginMethodCheck = null;
                        return !1
                    }
                    b.result = !1;
                    b.errno = a.retcode;
                    if (b.errno == "4069") {
                        var e = a.reason.split("|");
                        b.reason = e[0];
                        e.length == 2 && (b.rurl = e[1]);
                        if (b.rurl)
                            try {
                                top.location.href = b.rurl;
                                return
                            } catch (f) {}
                    } else
                        b.reason = a.reason;
                    a.retcode == "2071" && "protection_url"in a && a.protection_url && (b.protection_url = decodeURIComponent(a.protection_url));
                    a.retcode == "8120" && "logout_confirm_url"in a && a.logout_confirm_url && (b.logout_confirm_url = decodeURIComponent(a.logout_confirm_url));
                    me.callbackLoginStatus(b)
                }
            } catch (f) {}
            return !0
        }
        ;
        this.updateCookieCallBack = function(a) {
            a.retcode == 0 ? me.crossDomainAction("update", function() {
                me.customUpdateCookieCallBack(a)
            }) : me.customUpdateCookieCallBack(a)
        }
        ;
        this.feedBackUrlCallBack = function(a) {
            if (loginMethod != "post" || !me.timeoutEnable || !!ssoLoginTimer.isset()) {
                a.errno == "2092" && me.setServerTime(0);
                if (loginMethodCheck && a.errno == "2092" && me.allowAutoFoundServerTimeError) {
                    me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                        wsseretry: "servertime_error"
                    });
                    loginMethodCheck();
                    loginMethodCheck = null;
                    return !1
                }
                ssoLoginTimer && ssoLoginTimer.clear();
                if (a.errno == "4069") {
                    var b = a.reason.split("|");
                    a.reason = b[0];
                    if (b.length == 2) {
                        a.rurl = b[1];
                        try {
                            top.location.href = a.rurl;
                            return
                        } catch (c) {}
                    }
                }
                me.callbackLoginStatus(a);
                removeNode(me.loginFrameName)
            }
        }
        ;
        this.doCrossDomainCallBack = function(a) {
            me.crossDomainCounter++;
            a && removeNode(a.scriptId);
            if (me.crossDomainCounter == me.crossDomainCount) {
                clearTimeout(crossDomainTimer);
                me.crossDomainResult()
            }
        }
        ;
        this.crossDomainCallBack = function(a) {
            removeNode(me.ssoCrossDomainScriptId);
            if (!a || a.retcode != 0)
                return !1;
            var b = a.arrURL, c, d, e = {
                callback: me.name + ".doCrossDomainCallBack"
            };
            me.crossDomainCount = b.length;
            me.crossDomainCounter = 0;
            if (b.length == 0) {
                clearTimeout(crossDomainTimer);
                me.crossDomainResult();
                return !0
            }
            for (var f = 0; f < b.length; f++) {
                c = b[f];
                d = "ssoscript" + f;
                e.scriptId = d;
                c = makeURL(c, e);
                isSafari() ? excuteIframe(d, c) : excuteScript(d, c)
            }
        }
        ;
        this.crossDomainResult = function() {
            crossDomainUrlList = null;
            typeof crossDomainForward == "function" && crossDomainForward()
        }
        ;
        this.crossDomainAction = function(a, b) {
            crossDomainTimer = setTimeout(me.name + ".crossDomainResult()", crossDomainTime * 1e3);
            typeof b == "function" ? crossDomainForward = b : crossDomainForward = null;
            if (crossDomainUrlList) {
                me.crossDomainCallBack(crossDomainUrlList);
                return !1
            }
            var c = me.domain;
            if (a == "update") {
                a = "login";
                c = "sina.com.cn"
            }
            var d = {
                scriptId: me.ssoCrossDomainScriptId,
                callback: me.name + ".crossDomainCallBack",
                action: a,
                domain: c,
                sr: window.screen.width + "*" + window.screen.height
            }
              , e = makeURL(ssoCrosssDomainUrl, d);
            excuteScript(me.ssoCrossDomainScriptId, e)
        }
        ;
        this.checkLoginState = function(a) {
            a ? me.autoLogin(a) : me.autoLogin(function(a) {
                var b = {};
                if (a !== null) {
                    var c = {
                        displayname: a.nick,
                        uniqueid: a.uid,
                        userid: a.user
                    };
                    b.result = !0;
                    b.userinfo = c
                } else {
                    b.result = !1;
                    b.reason = ""
                }
                me.callbackLoginStatus(b)
            })
        }
        ;
        this.getCookieExpireTime = function() {
            return getCookieExpireTimeByDomain(me.domain)
        }
        ;
        this.getSinaCookie = function(a) {
            var b = getCookie("SUBP");
            if (!b)
                return null;
            var c = sinaSSOEncoder.getSUBPCookie.decode(b);
            try {
                c.uid = c.uid.replace(/(^\s*)|(\s*$)/g, "");
                c.nick = decodeURIComponent(c.nick.replace(/(^\s*)|(\s*$)/g, ""))
            } catch (d) {
                return null
            }
            return c
        }
        ;
        this.get51UCCookie = function() {
            return me.getSinaCookie()
        }
        ;
        this.isPreLoginState = function() {
            var a = getCookie("SUBP");
            if (!a)
                return !1;
            var b = sinaSSOEncoder.getSUBPCookie.decode(a);
            return b && b.status == "40" ? !0 : !1
        }
        ;
        this.isVisitor = function() {
            var a = getCookie("SUBP");
            if (!a)
                return !1;
            var b = sinaSSOEncoder.getSUBPCookie.decode(a);
            return b && b.status == "20" ? !0 : !1
        }
        ;
        this.autoLogin = function(a, b) {
            if (me.domain == "sina.com.cn") {
                if (getCookie("SUBP") === null && getCookie("ALF") !== null) {
                    sinaAutoLogin(a);
                    return !0
                }
            } else if (getCookie("SUBP") === null && (b || getCookie("SSOLoginState") !== null || getCookie("ALF") !== null)) {
                sinaAutoLogin(a);
                return !0
            }
            a(me.getSinaCookie());
            return !0
        }
        ;
        this.autoLoginCallBack2 = function(a) {
            try {
                autoLoginCallBack2(me.getSinaCookie())
            } catch (b) {}
            return !0
        }
        ;
        this.appLogin = function(a, b, c) {
            var d = tmpData.savestate ? parseInt((new Date).getTime() / 1e3 + tmpData.savestate * 86400) : 0
              , e = getCookie("ALF") ? getCookie("ALF") : 0
              , f = {
                callback: c,
                ticket: a,
                ssosavestate: d || e
            }
              , g = me.appLoginURL[b]
              , h = makeURL(g, f);
            excuteScript(me.scriptId, h, "gb2312");
            return !0
        }
        ;
        this.autoLoginCallBack3 = function(a) {
            if (a.retcode != 0) {
                me.autoLoginCallBack2(a);
                return !1
            }
            var b = me.domain == "sina.com.cn" ? "weibo.com" : me.domain;
            me.appLogin(a.ticket, b, me.name + ".autoLoginCallBack2");
            return !0
        }
        ;
        this.setLoginType = function(a) {
            var b = location.protocol == "https:" ? me.https : 0;
            b && (me.crossDomain = !1);
            me.loginType = a | b;
            return !0
        }
        ;
        this.setServerTime = function(a) {
            ssoServerTimeTimer || (ssoServerTimeTimer = new prototypeTimer(!0));
            if (a == 0) {
                ssoServerTimeTimer.clear();
                me.servertime = a;
                return !0
            }
            if (a < 1294935546)
                return !1;
            var b = function() {
                if (me.servertime) {
                    me.servertime += me.calcServerTimeInterval / 1e3;
                    ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
                }
            };
            me.servertime = a;
            ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
        }
        ;
        this.getPinCodeUrl = function(a) {
            a == undefined && (a = 0);
            pcid && (me.loginExtraQuery.pcid = pcid);
            return pincodeUrl + "?r=" + Math.floor(Math.random() * 1e8) + "&s=" + a + (pcid.length > 0 ? "&p=" + pcid : "")
        }
        ;
        this.showPinCode = function(a) {
            me.$(a).src = me.getPinCodeUrl()
        }
        ;
        this.isVfValid = function() {
            return me.getSinaCookie(!0).vf != 1
        }
        ;
        this.getVfValidUrl = function() {
            return vfValidUrl
        }
        ;
        this.enableFailRedirect = function() {
            me.failRedirect = !0
        }
        ;
        var makeNonce = function(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
              , c = "";
            for (var d = 0; d < a; d++)
                c += b.charAt(Math.ceil(Math.random() * 1e6) % b.length);
            return c
        }
          , sinaAutoLogin = function(a) {
            autoLoginCallBack2 = a;
            var b = {
                entry: me.getEntry(),
                service: me.service,
                encoding: "UTF-8",
                gateway: 1,
                returntype: "TEXT",
                from: me.from
            };
            if (me.domain == "sina.com.cn") {
                b.callback = me.name + ".autoLoginCallBack3";
                b.service = "miniblog";
                b.useticket = 1
            } else {
                b.callback = me.name + ".autoLoginCallBack3";
                b.useticket = 1
            }
            var c = makeURL(ssoLoginUrl, b);
            excuteScript(me.scriptId, c, "gb2312");
            return !0
        }
          , getCookieExpireTimeByDomain = function(a) {
            var b = null
              , c = null;
            c = me.getSinaCookie();
            c && (b = c.et);
            return b
        }
          , addEventListener = function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        }
          , prototypeTimer = function(a) {
            var b = !1;
            this.start = function(c, d) {
                a && (b = setTimeout(d, c))
            }
            ;
            this.clear = function(c) {
                if (a) {
                    clearTimeout(b);
                    b = !1
                }
            }
            ;
            this.isset = function() {
                return b !== !1
            }
        }
          , excuteScript = function(a, b, c) {
            removeNode(a);
            var d = document.getElementsByTagName("head")[0]
              , e = document.createElement("script");
            e.charset = c || "gb2312";
            e.id = a;
            e.type = "text/javascript";
            e.src = makeURL(b, {
                client: me.getClientType(),
                _: (new Date).getTime()
            });
            d.appendChild(e)
        }
          , excuteIframe = function(a, b) {
            removeNode(a);
            var c = document.getElementsByTagName("body")[0]
              , d = document.createElement("iframe");
            d.style.display = "none";
            d.src = makeURL(b, {
                client: me.getClientType(),
                _: (new Date).getTime()
            });
            d.isReady = !1;
            addEventListener(d, "load", function() {
                if (!d.isReady) {
                    d.isReady = !0;
                    me.doCrossDomainCallBack({
                        scriptId: a
                    })
                }
            });
            c.appendChild(d)
        }
          , makeRequest = function(a, b, c, d) {
            var e = {
                entry: me.getEntry(),
                gateway: 1,
                from: me.from,
                savestate: c,
                qrcode_flag: d,
                useticket: me.useTicket ? 1 : 0
            };
            me.failRedirect && (me.loginExtraQuery.frd = 1);
            e = objMerge(e, {
                pagerefer: document.referrer || ""
            });
            e = objMerge(e, me.loginExtraFlag);
            e = objMerge(e, me.loginExtraQuery);
            e.su = sinaSSOEncoder.base64.encode(urlencode(a));
            me.service && (e.service = me.service);
            if (me.loginType & rsa && me.servertime && sinaSSOEncoder && sinaSSOEncoder.RSAKey) {
                e.servertime = me.servertime;
                e.nonce = me.nonce;
                e.pwencode = "rsa2";
                e.rsakv = me.rsakv;
                var f = new sinaSSOEncoder.RSAKey;
                f.setPublic(me.rsaPubkey, "10001");
                b = f.encrypt([me.servertime, me.nonce].join("\t") + "\n" + b)
            } else if (me.loginType & wsse && me.servertime && sinaSSOEncoder && sinaSSOEncoder.hex_sha1) {
                e.servertime = me.servertime;
                e.nonce = me.nonce;
                e.pwencode = "wsse";
                b = sinaSSOEncoder.hex_sha1("" + sinaSSOEncoder.hex_sha1(sinaSSOEncoder.hex_sha1(b)) + me.servertime + me.nonce)
            }
            e.sp = b;
            try {
                e.sr = window.screen.width + "*" + window.screen.height
            } catch (g) {}
            return e
        }
          , loginByXMLHttpRequest = function(a, b, c, d) {
            if (typeof XMLHttpRequest == "undefined")
                return !1;
            var e = new XMLHttpRequest;
            if (!1 in e)
                return !1;
            var f = makeXMLRequestQuery(a, b, c, d)
              , g = makeURL(ssoLoginUrl, {
                client: me.getClientType(),
                _: (new Date).getTime()
            });
            try {
                e.open("POST", g, !0);
                e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                e.withCredentials = !0;
                e.onreadystatechange = function() {
                    e.readyState == 4 && e.status == 200 && me.loginCallBack(parseJSON(e.responseText))
                }
                ;
                e.send(httpBuildQuery(f))
            } catch (h) {
                return !1
            }
            return !0
        }
          , makeXMLRequestQuery = function(a, b, c, d) {
            if (me.appLoginURL[me.domain]) {
                me.useTicket = 1;
                me.service = me.appDomainService[me.domain] || me.service
            }
            var e = 0;
            me.domain && (e = 2);
            me.appLoginURL[me.domain] || (e = 3);
            me.cdult !== !1 && (e = me.cdult);
            if (e == 3) {
                crossDomainTime = me.crossDomainTime;
                delete me.appLoginURL[me.domain]
            }
            var f = makeRequest(a, b, c, d);
            return objMerge(f, {
                encoding: "UTF-8",
                cdult: e,
                domain: me.domain,
                useticket: me.appLoginURL[me.domain] ? 1 : 0,
                prelt: preloginTime,
                returntype: "TEXT"
            })
        }
          , loginByScript = function(a, b, c, d) {
            var e = makeXMLRequestQuery(a, b, c, d);
            e = objMerge(e, {
                callback: me.name + ".loginCallBack"
            });
            var f = makeURL(ssoLoginUrl, e);
            excuteScript(me.scriptId, f, "gb2312")
        }
          , loginByIframe = function(a, b, c, d) {
            createIFrame(me.loginFrameName);
            var e = createForm(me.loginFormId)
              , f = makeRequest(a, b, c, d);
            f.encoding = "UTF-8";
            me.crossDomain == !1 && (f.crossdomain = 0);
            f.prelt = preloginTime;
            if (me.feedBackUrl) {
                f.url = makeURL(me.feedBackUrl, {
                    framelogin: 1,
                    callback: "parent." + me.name + ".feedBackUrlCallBack"
                });
                f.returntype = "META"
            } else {
                f.callback = "parent." + me.name + ".loginCallBack";
                f.returntype = "IFRAME";
                f.setdomain = me.setDomain ? 1 : 0
            }
            for (var g in me.loginExtraQuery) {
                if (typeof me.loginExtraQuery[g] == "function")
                    continue;
                f[g] = me.loginExtraQuery[g]
            }
            for (var h in f)
                e.addInput(h, f[h]);
            var i = makeURL(ssoLoginUrl, objMerge({
                client: me.getClientType()
            }, me.loginExtraFlag));
            e.method = "post";
            e.action = i;
            e.target = me.loginFrameName;
            var j = !0;
            try {
                e.submit()
            } catch (k) {
                removeNode(me.loginFrameName);
                j = !1
            }
            setTimeout(function() {
                removeNode(e)
            }, 10);
            return j
        }
          , createIFrame = function(a, b) {
            b == null && (b = "javascript:false;");
            removeNode(a);
            var c = document.createElement("iframe");
            c.height = 0;
            c.width = 0;
            c.style.display = "none";
            c.name = a;
            c.id = a;
            c.src = b;
            appendChild(document.body, c);
            window.frames[a].name = a;
            return c
        }
          , createForm = function(a, b) {
            b == null && (b = "none");
            removeNode(a);
            var c = document.createElement("form");
            c.height = 0;
            c.width = 0;
            c.style.display = b;
            c.name = a;
            c.id = a;
            appendChild(document.body, c);
            document.forms[a].name = a;
            c.addInput = function(a, b, c) {
                c == null && (c = "text");
                var d = this.getElementsByTagName("input")[a];
                d && this.removeChild(d);
                d = document.createElement("input");
                this.appendChild(d);
                d.id = a;
                d.name = a;
                d.type = c;
                d.value = b
            }
            ;
            return c
        }
          , removeNode = function(a) {
            try {
                typeof a == "string" && (a = me.$(a));
                a.parentNode.removeChild(a)
            } catch (b) {}
        }
          , getType = function(a) {
            return typeof a == "undefined" ? "undefined" : a === null ? "null" : Object.prototype.toString.call(a).replace(/^\[object\s|\]$/gi, "").toLowerCase()
        }
          , isSafari = function() {
            var a = navigator.userAgent.toLowerCase();
            return /webkit/i.test(a) && !/chrome/i.test(a)
        }
          , appendChild = function(a, b) {
            a.appendChild(b)
        }
          , getCookie = function(a) {
            var b = (new RegExp(a + "=([^;]+)")).exec(document.cookie);
            return b == null ? null : b[1]
        }
          , makeURL = function(a, b) {
            return a + urlAndChar(a) + httpBuildQuery(b)
        }
          , urlAndChar = function(a) {
            return /\?/.test(a) ? "&" : "?"
        }
          , urlencode = function(a) {
            return encodeURIComponent(a)
        }
          , urldecode = function(a) {
            if (a == null)
                return "";
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return ""
            }
        }
          , httpBuildQuery = function(a) {
            if (typeof a != "object")
                return "";
            var b = [];
            for (var c in a) {
                if (typeof a[c] == "function")
                    continue;
                b.push(c + "=" + urlencode(a[c]))
            }
            return b.join("&")
        }
          , parse_str = function(a) {
            var b = a.split("&"), c, d = {};
            for (var e = 0; e < b.length; e++) {
                c = b[e].split("=");
                d[c[0]] = urldecode(c[1])
            }
            return d
        }
          , parseJSON = function(str) {
            return typeof str == "object" ? str : window.JSON ? JSON.parse(str) : eval("(" + str + ")")
        }
          , objMerge = function(a, b) {
            for (var c in b)
                a[c] = b[c];
            return a
        };
        this.$ = function(a) {
            return document.getElementById(a)
        }
        ;
        this.generateVisitor = function() {
            var a, b = !1;
            for (var c = 0; c < this.generateVisitorDomain.length; c++) {
                a = new RegExp(this.generateVisitorDomain[c]);
                if (a.test(document.domain)) {
                    b = !0;
                    break
                }
            }
            if (!b)
                return !1;
            try {
                if (me.shouldGenerateVisitor() && !me.$("visitorfrm84747h4784")) {
                    document.body.insertAdjacentHTML("beforeEnd", "<iframe id='visitorfrm84747h4784' style='position:absolute;left:0;top:0;border:none;width:1px;height:1px' src='" + generateVisitorUrl + "?from=iframe'/>");
                    setTimeout(function() {
                        try {
                            var a = me.$("visitorfrm84747h4784");
                            a && a.parentNode.removeChild(a)
                        } catch (b) {}
                    }, 3e4)
                }
            } catch (d) {
                return !1
            }
            return !0
        }
        ;
        this.shouldGenerateVisitor = function() {
            var a = !1
              , b = !1
              , c = getCookie("SUBP");
            c && (a = !0);
            var d = getCookie("SUP");
            d && (b = !0);
            return !a && !b ? !0 : !1
        }
    }
    var sinaSSOEncoder = sinaSSOEncoder || {};
    (function() {
        var a = 0
          , b = 8;
        this.hex_sha1 = function(a) {
            return i(c(h(a), a.length * b))
        }
        ;
        var c = function(a, b) {
            a[b >> 5] |= 128 << 24 - b % 32;
            a[(b + 64 >> 9 << 4) + 15] = b;
            var c = Array(80)
              , h = 1732584193
              , i = -271733879
              , j = -1732584194
              , k = 271733878
              , l = -1009589776;
            for (var m = 0; m < a.length; m += 16) {
                var n = h
                  , o = i
                  , p = j
                  , q = k
                  , r = l;
                for (var s = 0; s < 80; s++) {
                    s < 16 ? c[s] = a[m + s] : c[s] = g(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                    var t = f(f(g(h, 5), d(s, i, j, k)), f(f(l, c[s]), e(s)));
                    l = k;
                    k = j;
                    j = g(i, 30);
                    i = h;
                    h = t
                }
                h = f(h, n);
                i = f(i, o);
                j = f(j, p);
                k = f(k, q);
                l = f(l, r)
            }
            return [h, i, j, k, l]
        }
          , d = function(a, b, c, d) {
            return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
        }
          , e = function(a) {
            return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
        }
          , f = function(a, b) {
            var c = (a & 65535) + (b & 65535)
              , d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | c & 65535
        }
          , g = function(a, b) {
            return a << b | a >>> 32 - b
        }
          , h = function(a) {
            var c = []
              , d = (1 << b) - 1;
            for (var e = 0; e < a.length * b; e += b)
                c[e >> 5] |= (a.charCodeAt(e / b) & d) << 24 - e % 32;
            return c
        }
          , i = function(b) {
            var c = a ? "0123456789ABCDEF" : "0123456789abcdef"
              , d = "";
            for (var e = 0; e < b.length * 4; e++)
                d += c.charAt(b[e >> 2] >> (3 - e % 4) * 8 + 4 & 15) + c.charAt(b[e >> 2] >> (3 - e % 4) * 8 & 15);
            return d
        }
          , j = function(a) {
            var b = ""
              , c = 0;
            for (; c < a.length; c++)
                b += "%" + k(a[c]);
            return decodeURIComponent(b)
        }
          , k = function(a) {
            var b = "0" + a.toString(16);
            return b.length <= 2 ? b : b.substr(1)
        };
        this.base64 = {
            encode: function(a) {
                a = "" + a;
                if (a == "")
                    return "";
                var b = "", c, d, e = "", f, g, h, i = "", j = 0;
                do {
                    c = a.charCodeAt(j++);
                    d = a.charCodeAt(j++);
                    e = a.charCodeAt(j++);
                    f = c >> 2;
                    g = (c & 3) << 4 | d >> 4;
                    h = (d & 15) << 2 | e >> 6;
                    i = e & 63;
                    isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64);
                    b = b + this._keys.charAt(f) + this._keys.charAt(g) + this._keys.charAt(h) + this._keys.charAt(i);
                    c = d = e = "";
                    f = g = h = i = ""
                } while (j < a.length);return b
            },
            decode: function(a, b, c) {
                var d = function(a, b) {
                    for (var c = 0; c < a.length; c++)
                        if (a[c] === b)
                            return c;
                    return -1
                };
                typeof a == "string" && (a = a.split(""));
                var e = [], f, g, h = "", i, j, k, l = "";
                a.length % 4 == 0;
                var m = /[^A-Za-z0-9+\/=]/
                  , n = this._keys.split("");
                if (b == "urlsafe") {
                    m = /[^A-Za-z0-9-_=]/;
                    n = this._keys_urlsafe.split("")
                }
                if (b == "subp_v2") {
                    m = /[^A-Za-z0-9_=-]/;
                    n = this._subp_v2_keys.split("")
                }
                if (b == "subp_v3_3") {
                    m = /[^A-Za-z0-9-_.-]/;
                    n = this._subp_v3_keys_3.split("")
                }
                var o = 0;
                if (b == "binnary") {
                    n = [];
                    for (o = 0; o <= 64; o++)
                        n[o] = o + 128
                }
                if (b != "binnary" && m.test(a.join("")))
                    return c == "array" ? [] : "";
                o = 0;
                do {
                    i = d(n, a[o++]);
                    j = d(n, a[o++]);
                    k = d(n, a[o++]);
                    l = d(n, a[o++]);
                    f = i << 2 | j >> 4;
                    g = (j & 15) << 4 | k >> 2;
                    h = (k & 3) << 6 | l;
                    e.push(f);
                    k != 64 && k != -1 && e.push(g);
                    l != 64 && l != -1 && e.push(h);
                    f = g = h = "";
                    i = j = k = l = ""
                } while (o < a.length);if (c == "array")
                    return e;
                var p = ""
                  , q = 0;
                for (; q < e.lenth; q++)
                    p += String.fromCharCode(e[q]);
                return p
            },
            _keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
            _subp_v2_keys: "uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=",
            _subp_v3_keys_3: "5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t"
        };
        this.Cookie = {
            decode: function(a) {
                var b = []
                  , c = a.substr(0, 3)
                  , d = a.substr(3);
                switch (c) {
                case "v01":
                    for (var e = 0; e < d.length; e += 2)
                        b.push(parseInt(d.substr(e, 2), 16));
                    return decodeURIComponent(j(sinaSSOEncoder.base64.decode(b, "binnary", "array")));
                case "v02":
                    d = d.replace(/\./g, "=");
                    b = sinaSSOEncoder.base64.decode(d, "urlsafe", "array");
                    return j(sinaSSOEncoder.base64.decode(b, "binnary", "array"));
                default:
                    return decodeURIComponent(a)
                }
            }
        };
        this.getSUBPCookie = {
            __parse: function(a) {
                var b, c, d, e, f, g = 0, h, i = {}, k = "", l = "";
                if (!a)
                    return i;
                do {
                    c = a[g];
                    b = ++g;
                    for (h = g; h < c + b; h++,
                    g++)
                        k += String.fromCharCode(a[h]);
                    e = a[g];
                    b = ++g;
                    if (k == "status" || k == "flag")
                        for (h = g; h < e + b; h++,
                        g++)
                            l += a[h];
                    else {
                        l = a.slice(b, e + b);
                        try {
                            l = j(l)
                        } catch (m) {
                            l = ""
                        }
                        g += e
                    }
                    i[k] = l;
                    k = "";
                    l = ""
                } while (g < a.length);return i
            },
            decode: function(a) {
                var b = [], c, d = a.substr(0, 3), e = decodeURIComponent(a.substr(3));
                switch (d) {
                case "002":
                    b = sinaSSOEncoder.base64.decode(e, "subp_v2", "array");
                    return sinaSSOEncoder.getSUBPCookie.__parse(b);
                case "003":
                    c = e.substr(0, 1);
                    e = e.substr(1);
                    b = sinaSSOEncoder.base64.decode(e, "subp_v3_" + c, "array");
                    return sinaSSOEncoder.getSUBPCookie.__parse(b);
                default:
                    return decodeURIComponent(a)
                }
            }
        }
    }
    ).call(sinaSSOEncoder);
    (function() {
        function bt(a) {
            var b = bp(a, this.n.bitLength() + 7 >> 3);
            if (b == null)
                return null;
            var c = this.doPublic(b);
            if (c == null)
                return null;
            var d = c.toString(16);
            return (d.length & 1) == 0 ? d : "0" + d
        }
        function bs(a) {
            return a.modPowInt(this.e, this.n)
        }
        function br(a, b) {
            if (a != null && b != null && a.length > 0 && b.length > 0) {
                this.n = bm(a, 16);
                this.e = parseInt(b, 16)
            } else
                alert("Invalid RSA public key")
        }
        function bq() {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null
        }
        function bp(a, b) {
            if (b < a.length + 11) {
                alert("Message too long for RSA");
                return null
            }
            var c = []
              , e = a.length - 1;
            while (e >= 0 && b > 0) {
                var f = a.charCodeAt(e--);
                if (f < 128)
                    c[--b] = f;
                else if (f > 127 && f < 2048) {
                    c[--b] = f & 63 | 128;
                    c[--b] = f >> 6 | 192
                } else {
                    c[--b] = f & 63 | 128;
                    c[--b] = f >> 6 & 63 | 128;
                    c[--b] = f >> 12 | 224
                }
            }
            c[--b] = 0;
            var g = new bl
              , h = [];
            while (b > 2) {
                h[0] = 0;
                while (h[0] == 0)
                    g.nextBytes(h);
                c[--b] = h[0]
            }
            c[--b] = 2;
            c[--b] = 0;
            return new d(c)
        }
        function bo(a) {
            return a < 16 ? "0" + a.toString(16) : a.toString(16)
        }
        function bn(a, b) {
            var c = ""
              , d = 0;
            while (d + b < a.length) {
                c += a.substring(d, d + b) + "\n";
                d += b
            }
            return c + a.substring(d, a.length)
        }
        function bm(a, b) {
            return new d(a,b)
        }
        function bl() {}
        function bk(a) {
            var b;
            for (b = 0; b < a.length; ++b)
                a[b] = bj()
        }
        function bj() {
            if (bc == null) {
                bg();
                bc = ba();
                bc.init(bd);
                for (be = 0; be < bd.length; ++be)
                    bd[be] = 0;
                be = 0
            }
            return bc.next()
        }
        function bg() {
            bf((new Date).getTime())
        }
        function bf(a) {
            bd[be++] ^= a & 255;
            bd[be++] ^= a >> 8 & 255;
            bd[be++] ^= a >> 16 & 255;
            bd[be++] ^= a >> 24 & 255;
            be >= bb && (be -= bb)
        }
        function ba() {
            return new Z
        }
        function _() {
            var a;
            this.i = this.i + 1 & 255;
            this.j = this.j + this.S[this.i] & 255;
            a = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = a;
            return this.S[a + this.S[this.i] & 255]
        }
        function $(a) {
            var b, c, d;
            for (b = 0; b < 256; ++b)
                this.S[b] = b;
            c = 0;
            for (b = 0; b < 256; ++b) {
                c = c + this.S[b] + a[b % a.length] & 255;
                d = this.S[b];
                this.S[b] = this.S[c];
                this.S[c] = d
            }
            this.i = 0;
            this.j = 0
        }
        function Z() {
            this.i = 0;
            this.j = 0;
            this.S = []
        }
        function Y(a, b) {
            var c;
            a < 256 || b.isEven() ? c = new J(b) : c = new Q(b);
            return this.exp(a, c)
        }
        function X(a, b) {
            if (a > 4294967295 || a < 1)
                return d.ONE;
            var c = e()
              , f = e()
              , g = b.convert(this)
              , h = y(a) - 1;
            g.copyTo(c);
            while (--h >= 0) {
                b.sqrTo(c, f);
                if ((a & 1 << h) > 0)
                    b.mulTo(f, g, c);
                else {
                    var i = c;
                    c = f;
                    f = i
                }
            }
            return b.revert(c)
        }
        function W() {
            return (this.t > 0 ? this[0] & 1 : this.s) == 0
        }
        function V(a, b, c) {
            a.multiplyTo(b, c);
            this.reduce(c)
        }
        function U(a, b) {
            a.squareTo(b);
            this.reduce(b)
        }
        function T(a) {
            while (a.t <= this.mt2)
                a[a.t++] = 0;
            for (var b = 0; b < this.m.t; ++b) {
                var c = a[b] & 32767
                  , d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
                c = b + this.m.t;
                a[c] += this.m.am(0, d, a, b, 0, this.m.t);
                while (a[c] >= a.DV) {
                    a[c] -= a.DV;
                    a[++c]++
                }
            }
            a.clamp();
            a.drShiftTo(this.m.t, a);
            a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
        }
        function S(a) {
            var b = e();
            a.copyTo(b);
            this.reduce(b);
            return b
        }
        function R(a) {
            var b = e();
            a.abs().dlShiftTo(this.m.t, b);
            b.divRemTo(this.m, null, b);
            a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b);
            return b
        }
        function Q(a) {
            this.m = a;
            this.mp = a.invDigit();
            this.mpl = this.mp & 32767;
            this.mph = this.mp >> 15;
            this.um = (1 << a.DB - 15) - 1;
            this.mt2 = 2 * a.t
        }
        function P() {
            if (this.t < 1)
                return 0;
            var a = this[0];
            if ((a & 1) == 0)
                return 0;
            var b = a & 3;
            b = b * (2 - (a & 15) * b) & 15;
            b = b * (2 - (a & 255) * b) & 255;
            b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
            b = b * (2 - a * b % this.DV) % this.DV;
            return b > 0 ? this.DV - b : -b
        }
        function O(a, b) {
            a.squareTo(b);
            this.reduce(b)
        }
        function N(a, b, c) {
            a.multiplyTo(b, c);
            this.reduce(c)
        }
        function M(a) {
            a.divRemTo(this.m, null, a)
        }
        function L(a) {
            return a
        }
        function K(a) {
            return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
        }
        function J(a) {
            this.m = a
        }
        function I(a) {
            var b = e();
            this.abs().divRemTo(a, null, b);
            this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b);
            return b
        }
        function H(a, b, c) {
            var f = a.abs();
            if (!(f.t <= 0)) {
                var g = this.abs();
                if (g.t < f.t) {
                    b != null && b.fromInt(0);
                    c != null && this.copyTo(c);
                    return
                }
                c == null && (c = e());
                var h = e()
                  , i = this.s
                  , j = a.s
                  , k = this.DB - y(f[f.t - 1]);
                if (k > 0) {
                    f.lShiftTo(k, h);
                    g.lShiftTo(k, c)
                } else {
                    f.copyTo(h);
                    g.copyTo(c)
                }
                var l = h.t
                  , m = h[l - 1];
                if (m == 0)
                    return;
                var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0)
                  , o = this.FV / n
                  , p = (1 << this.F1) / n
                  , q = 1 << this.F2
                  , r = c.t
                  , s = r - l
                  , t = b == null ? e() : b;
                h.dlShiftTo(s, t);
                if (c.compareTo(t) >= 0) {
                    c[c.t++] = 1;
                    c.subTo(t, c)
                }
                d.ONE.dlShiftTo(l, t);
                t.subTo(h, h);
                while (h.t < l)
                    h[h.t++] = 0;
                while (--s >= 0) {
                    var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
                    if ((c[r] += h.am(0, u, c, s, 0, l)) < u) {
                        h.dlShiftTo(s, t);
                        c.subTo(t, c);
                        while (c[r] < --u)
                            c.subTo(t, c)
                    }
                }
                if (b != null) {
                    c.drShiftTo(l, b);
                    i != j && d.ZERO.subTo(b, b)
                }
                c.t = l;
                c.clamp();
                k > 0 && c.rShiftTo(k, c);
                i < 0 && d.ZERO.subTo(c, c)
            }
        }
        function G(a) {
            var b = this.abs()
              , c = a.t = 2 * b.t;
            while (--c >= 0)
                a[c] = 0;
            for (c = 0; c < b.t - 1; ++c) {
                var d = b.am(c, b[c], a, 2 * c, 0, 1);
                if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
                    a[c + b.t] -= b.DV;
                    a[c + b.t + 1] = 1
                }
            }
            a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
            a.s = 0;
            a.clamp()
        }
        function F(a, b) {
            var c = this.abs()
              , e = a.abs()
              , f = c.t;
            b.t = f + e.t;
            while (--f >= 0)
                b[f] = 0;
            for (f = 0; f < e.t; ++f)
                b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
            b.s = 0;
            b.clamp();
            this.s != a.s && d.ZERO.subTo(b, b)
        }
        function E(a, b) {
            var c = 0
              , d = 0
              , e = Math.min(a.t, this.t);
            while (c < e) {
                d += this[c] - a[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            if (a.t < this.t) {
                d -= a.s;
                while (c < this.t) {
                    d += this[c];
                    b[c++] = d & this.DM;
                    d >>= this.DB
                }
                d += this.s
            } else {
                d += this.s;
                while (c < a.t) {
                    d -= a[c];
                    b[c++] = d & this.DM;
                    d >>= this.DB
                }
                d -= a.s
            }
            b.s = d < 0 ? -1 : 0;
            d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
            b.t = c;
            b.clamp()
        }
        function D(a, b) {
            b.s = this.s;
            var c = Math.floor(a / this.DB);
            if (c >= this.t)
                b.t = 0;
            else {
                var d = a % this.DB
                  , e = this.DB - d
                  , f = (1 << d) - 1;
                b[0] = this[c] >> d;
                for (var g = c + 1; g < this.t; ++g) {
                    b[g - c - 1] |= (this[g] & f) << e;
                    b[g - c] = this[g] >> d
                }
                d > 0 && (b[this.t - c - 1] |= (this.s & f) << e);
                b.t = this.t - c;
                b.clamp()
            }
        }
        function C(a, b) {
            var c = a % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
            for (h = this.t - 1; h >= 0; --h) {
                b[h + f + 1] = this[h] >> d | g;
                g = (this[h] & e) << c
            }
            for (h = f - 1; h >= 0; --h)
                b[h] = 0;
            b[f] = g;
            b.t = this.t + f + 1;
            b.s = this.s;
            b.clamp()
        }
        function B(a, b) {
            for (var c = a; c < this.t; ++c)
                b[c - a] = this[c];
            b.t = Math.max(this.t - a, 0);
            b.s = this.s
        }
        function A(a, b) {
            var c;
            for (c = this.t - 1; c >= 0; --c)
                b[c + a] = this[c];
            for (c = a - 1; c >= 0; --c)
                b[c] = 0;
            b.t = this.t + a;
            b.s = this.s
        }
        function z() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
        }
        function y(a) {
            var b = 1, c;
            if ((c = a >>> 16) != 0) {
                a = c;
                b += 16
            }
            if ((c = a >> 8) != 0) {
                a = c;
                b += 8
            }
            if ((c = a >> 4) != 0) {
                a = c;
                b += 4
            }
            if ((c = a >> 2) != 0) {
                a = c;
                b += 2
            }
            if ((c = a >> 1) != 0) {
                a = c;
                b += 1
            }
            return b
        }
        function x(a) {
            var b = this.s - a.s;
            if (b != 0)
                return b;
            var c = this.t;
            b = c - a.t;
            if (b != 0)
                return b;
            while (--c >= 0)
                if ((b = this[c] - a[c]) != 0)
                    return b;
            return 0
        }
        function w() {
            return this.s < 0 ? this.negate() : this
        }
        function v() {
            var a = e();
            d.ZERO.subTo(this, a);
            return a
        }
        function u(a) {
            if (this.s < 0)
                return "-" + this.negate().toString(a);
            var b;
            if (a == 16)
                b = 4;
            else if (a == 8)
                b = 3;
            else if (a == 2)
                b = 1;
            else if (a == 32)
                b = 5;
            else if (a == 4)
                b = 2;
            else
                return this.toRadix(a);
            var c = (1 << b) - 1, d, e = !1, f = "", g = this.t, h = this.DB - g * this.DB % b;
            if (g-- > 0) {
                if (h < this.DB && (d = this[g] >> h) > 0) {
                    e = !0;
                    f = n(d)
                }
                while (g >= 0) {
                    if (h < b) {
                        d = (this[g] & (1 << h) - 1) << b - h;
                        d |= this[--g] >> (h += this.DB - b)
                    } else {
                        d = this[g] >> (h -= b) & c;
                        if (h <= 0) {
                            h += this.DB;
                            --g
                        }
                    }
                    d > 0 && (e = !0);
                    e && (f += n(d))
                }
            }
            return e ? f : "0"
        }
        function t() {
            var a = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == a)
                --this.t
        }
        function s(a, b) {
            var c;
            if (b == 16)
                c = 4;
            else if (b == 8)
                c = 3;
            else if (b == 256)
                c = 8;
            else if (b == 2)
                c = 1;
            else if (b == 32)
                c = 5;
            else if (b == 4)
                c = 2;
            else {
                this.fromRadix(a, b);
                return
            }
            this.t = 0;
            this.s = 0;
            var e = a.length
              , f = !1
              , g = 0;
            while (--e >= 0) {
                var h = c == 8 ? a[e] & 255 : o(a, e);
                if (h < 0) {
                    a.charAt(e) == "-" && (f = !0);
                    continue
                }
                f = !1;
                if (g == 0)
                    this[this.t++] = h;
                else if (g + c > this.DB) {
                    this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g;
                    this[this.t++] = h >> this.DB - g
                } else
                    this[this.t - 1] |= h << g;
                g += c;
                g >= this.DB && (g -= this.DB)
            }
            if (c == 8 && (a[0] & 128) != 0) {
                this.s = -1;
                g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)
            }
            this.clamp();
            f && d.ZERO.subTo(this, this)
        }
        function r(a) {
            var b = e();
            b.fromInt(a);
            return b
        }
        function q(a) {
            this.t = 1;
            this.s = a < 0 ? -1 : 0;
            a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
        }
        function p(a) {
            for (var b = this.t - 1; b >= 0; --b)
                a[b] = this[b];
            a.t = this.t;
            a.s = this.s
        }
        function o(a, b) {
            var c = k[a.charCodeAt(b)];
            return c == null ? -1 : c
        }
        function n(a) {
            return j.charAt(a)
        }
        function h(a, b, c, d, e, f) {
            var g = b & 16383
              , h = b >> 14;
            while (--f >= 0) {
                var i = this[a] & 16383
                  , j = this[a++] >> 14
                  , k = h * i + j * g;
                i = g * i + ((k & 16383) << 14) + c[d] + e;
                e = (i >> 28) + (k >> 14) + h * j;
                c[d++] = i & 268435455
            }
            return e
        }
        function g(a, b, c, d, e, f) {
            var g = b & 32767
              , h = b >> 15;
            while (--f >= 0) {
                var i = this[a] & 32767
                  , j = this[a++] >> 15
                  , k = h * i + j * g;
                i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
                e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
                c[d++] = i & 1073741823
            }
            return e
        }
        function f(a, b, c, d, e, f) {
            while (--f >= 0) {
                var g = b * this[a++] + c[d] + e;
                e = Math.floor(g / 67108864);
                c[d++] = g & 67108863
            }
            return e
        }
        function e() {
            return new d(null)
        }
        function d(a, b, c) {
            a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
        }
        var a, b = 0xdeadbeefcafe, c = (b & 16777215) == 15715070;
        if (c && navigator.appName == "Microsoft Internet Explorer") {
            d.prototype.am = g;
            a = 30
        } else if (c && navigator.appName != "Netscape") {
            d.prototype.am = f;
            a = 26
        } else {
            d.prototype.am = h;
            a = 28
        }
        d.prototype.DB = a;
        d.prototype.DM = (1 << a) - 1;
        d.prototype.DV = 1 << a;
        var i = 52;
        d.prototype.FV = Math.pow(2, i);
        d.prototype.F1 = i - a;
        d.prototype.F2 = 2 * a - i;
        var j = "0123456789abcdefghijklmnopqrstuvwxyz", k = [], l, m;
        l = "0".charCodeAt(0);
        for (m = 0; m <= 9; ++m)
            k[l++] = m;
        l = "a".charCodeAt(0);
        for (m = 10; m < 36; ++m)
            k[l++] = m;
        l = "A".charCodeAt(0);
        for (m = 10; m < 36; ++m)
            k[l++] = m;
        J.prototype.convert = K;
        J.prototype.revert = L;
        J.prototype.reduce = M;
        J.prototype.mulTo = N;
        J.prototype.sqrTo = O;
        Q.prototype.convert = R;
        Q.prototype.revert = S;
        Q.prototype.reduce = T;
        Q.prototype.mulTo = V;
        Q.prototype.sqrTo = U;
        d.prototype.copyTo = p;
        d.prototype.fromInt = q;
        d.prototype.fromString = s;
        d.prototype.clamp = t;
        d.prototype.dlShiftTo = A;
        d.prototype.drShiftTo = B;
        d.prototype.lShiftTo = C;
        d.prototype.rShiftTo = D;
        d.prototype.subTo = E;
        d.prototype.multiplyTo = F;
        d.prototype.squareTo = G;
        d.prototype.divRemTo = H;
        d.prototype.invDigit = P;
        d.prototype.isEven = W;
        d.prototype.exp = X;
        d.prototype.toString = u;
        d.prototype.negate = v;
        d.prototype.abs = w;
        d.prototype.compareTo = x;
        d.prototype.bitLength = z;
        d.prototype.mod = I;
        d.prototype.modPowInt = Y;
        d.ZERO = r(0);
        d.ONE = r(1);
        Z.prototype.init = $;
        Z.prototype.next = _;
        var bb = 256, bc, bd, be;
        if (bd == null) {
            bd = [];
            be = 0;
            var bh;
            if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof window.crypto.random == "function") {
                var bi = window.crypto.random(32);
                for (bh = 0; bh < bi.length; ++bh)
                    bd[be++] = bi.charCodeAt(bh) & 255
            }
            while (be < bb) {
                bh = Math.floor(65536 * Math.random());
                bd[be++] = bh >>> 8;
                bd[be++] = bh & 255
            }
            be = 0;
            bg()
        }
        bl.prototype.nextBytes = bk;
        bq.prototype.doPublic = bs;
        bq.prototype.setPublic = br;
        bq.prototype.encrypt = bt;
        this.RSAKey = bq
    }
    ).call(sinaSSOEncoder);
    sinaSSOController = new SSOController;
    sinaSSOController.init();
    STK.register("v6.conf.channel.sso.login", function(a) {
        var b = ["login", "logout", "verify.extra", "verify.username", "pincode", "pincode.create", "login.complete", "login.success", "login.failure", "logout.complete", "logout.success", "logout.failure", "verify.update", "verify.failure", "verify.complete", "pincode.update", "yalogin.verify", "yalogin.active", "yalogin.deny"];
        return a.v6.lib.kit.extra.listener.define("v6.conf.channel.sso.login", b)
    });
    STK.register("v6.pub.plugin.sso.loginbridge", function(a) {
        var b = window.sinaSSOController
          , c = a.v6.conf.channel.sso.login
          , d = {
            savestate: 0,
            vsnf: 0,
            hold_login_state: !1,
            cookie_timeout: 0,
            extraTypes: ["verifycode", "vsncode"],
            extraConf: {
                verifycode: [1, 4049, 2070],
                vsncode: [2, 5024, 5025],
                password: [80]
            }
        }
          , e = {
            entry: "sinaoauth",
            domain: "sina.com.cn",
            service: "sinaoauth",
            useTicket: !0,
            crossDomain: !1,
            feedBackUrl: ""
        }
          , f = !1;
        return function(g) {
            var h = {
                param: {},
                extra: !1
            }
              , i = {
                init: function() {
                    if (!f) {
                        i.setOptions(g);
                        i.bind();
                        i.getUniqueKey();
                        f = !0
                    }
                },
                setOptions: function(b) {
                    b = b || {};
                    d = a.core.json.merge(d, b);
                    e = a.core.obj.parseParam(e, b);
                    i.setSSO(b)
                },
                setSSO: function(c) {
                    var d = a.core.json.merge(e, c || {});
                    for (var f in d)
                        d[f] !== undefined && (b[f] = d[f])
                },
                cleanExtra: function() {
                    b.loginExtraQuery || (b.loginExtraQuery = {});
                    var a = b.loginExtraQuery.pcid;
                    b.loginExtraQuery = {};
                    a && (b.loginExtraQuery.pcid = a)
                },
                setExtra: function(c) {
                    c = c || {};
                    i.cleanExtra();
                    if (c.door)
                        delete b.loginExtraQuery.vsnval;
                    else if (c.vsnval) {
                        delete b.loginExtraQuery.door;
                        delete b.loginExtraQuery.pcid
                    } else {
                        delete b.loginExtraQuery.door;
                        delete b.loginExtraQuery.pcid;
                        delete b.loginExtraQuery.vsnval
                    }
                    d.cookie_timeout && (c.ct = conf.cookie_timeout);
                    d.hold_login_state && (c.s = 1);
                    c.vsnf = d.vsnf;
                    c.hasOwnProperty("username") && delete c.username;
                    c.hasOwnProperty("password") && delete c.password;
                    c.hasOwnProperty("savestate") && delete c.savestate;
                    b.loginExtraQuery = a.core.json.merge(b.loginExtraQuery, c)
                },
                login: function(a, c, e, f) {
                    e = e || {};
                    if (f.verifycode) {
                        f.door = "" + f.verifycode;
                        h.extra = "verifycode";
                        delete f.verifycode
                    } else if (f.vsncode) {
                        f.vsnval = f.vsncode;
                        h.extra = "vsncode";
                        delete f.vsncode
                    } else
                        h.extra = !1;
                    i.setSSO(e);
                    h.param.userid = a;
                    h.param.password = c;
                    var g = e.savestate || d.savestate;
                    g && (h.param.savestate = g);
                    i.setExtra(f);
                    b.login(h.param.userid, h.param.password, h.param.savestate)
                },
                logout: function() {
                    b.logout()
                },
                verify: {
                    extra: function(a, c, d) {
                        switch (a) {
                        case "vsn":
                            i.setExtra({
                                vsnval: c
                            });
                            break;
                        case "code":
                            i.setExtra({
                                door: c
                            })
                        }
                        i.setSSO(d || {});
                        d.savestate > -1 && (h.param.savestate = d.savestate);
                        b.login(h.param.userid, h.param.password, h.param.savestate)
                    },
                    username: function(a) {
                        b.prelogin({
                            username: a,
                            checkpin: 1
                        }, i.callback.verify.username)
                    },
                    yalogin: function() {
                        b.prelogin({}, i.callback.verify.yalogin)
                    }
                },
                callback: {
                    login: function(b) {
                        c.fire("login.complete", b);
                        if (b.result) {
                            typeof d.loginSuccessUrl != "undefined" && d.loginSuccessUrl != "" && (b.redirect = d.loginSuccessUrl);
                            c.fire("login.success", b)
                        } else {
                            var e = i.extraType(b.errno);
                            a.inArray(e, d.extraTypes) ? c.fire("verify.failure", e) : h.extra && c.fire("verify.update", h.extra);
                            var f = {
                                code: b.errno,
                                reason: b.reason,
                                type: e || "username"
                            };
                            f.code == "2071" && "protection_url"in b && b.protection_url && (f.protection_url = b.protection_url);
                            f.code == "8120" && "logout_confirm_url"in b && b.logout_confirm_url && (f.logout_confirm_url = b.logout_confirm_url);
                            c.fire("login.failure", f)
                        }
                    },
                    logout: function(a) {
                        c.fire("logout.complete", a);
                        a.result ? c.fire("logout.success", a) : c.fire("logout.failure", a)
                    },
                    verify: {
                        username: function(a) {
                            if (a.nopwd && a.nopwd == 1) {
                                a.code = 4098;
                                a.type = i.extraType(4098) || "username"
                            }
                            c.fire("verify.complete", a);
                            if (a && a.showpin > 0) {
                                var b = i.extraType(a.showpin);
                                b && c.fire("verify.update", b)
                            }
                        },
                        yalogin: function(a) {
                            a.hasOwnProperty("uid") ? c.fire("yalogin.active", a.uid) : c.fire("yalogin.deny")
                        }
                    }
                },
                bind: function() {
                    b.customLoginCallBack = i.callback.login;
                    b.customLogoutCallBack = i.callback.logout;
                    c.register("login", i.login);
                    c.register("logout", i.logout);
                    c.register("verify.username", i.verify.username);
                    c.register("pincode.create", i.getUniqueKey);
                    c.register("pincode", i.getPincodeUrl);
                    c.register("yalogin.verify", i.verify.yalogin)
                },
                getUniqueKey: function() {
                    b.getServerTime()
                },
                getPincodeUrl: function() {
                    var a = b.getPinCodeUrl();
                    c.fire("pincode.update", a)
                },
                extraType: function(a) {
                    if (!d.extraRule) {
                        d.extraRule = {};
                        var b, c;
                        for (b in d.extraConf)
                            for (c in d.extraConf[b])
                                d.extraRule["" + d.extraConf[b][c]] = b
                    }
                    return d.extraRule["" + a] || !1
                }
            };
            i.init();
            var j = {};
            return j
        }
    });
    (function() {
        if (!a)
            var a = function() {
                var a = {}, b = "theia", c = [], d = 200, e;
                a[b] = {
                    IE: /msie/i.test(navigator.userAgent),
                    E: function(a) {
                        return typeof a == "string" ? document.getElementById(a) : a
                    },
                    C: function(a) {
                        var b;
                        a = a.toUpperCase();
                        a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
                        return b
                    },
                    log: function() {
                        var a, b = arguments, f = b.length, g = [].slice.apply(b, [0, f]), h = "error", i;
                        while (g[--f])
                            if (g[f]instanceof Error) {
                                a = g.splice(f, 1)[0];
                                break
                            }
                        if (!a) {
                            a = new Error;
                            h = "log"
                        }
                        i = [g, h, (new Date).getTime(), a.message, a.stack];
                        if (e)
                            try {
                                e.apply(null, i)
                            } catch (j) {}
                        else {
                            c.length >= d && c.shift();
                            c.push(i)
                        }
                    },
                    _regLogFn: function(a) {
                        e = a
                    },
                    _clearLogList: function() {
                        return c.splice(0, c.length)
                    }
                };
                var f = a[b];
                f.register = function(c, d, e) {
                    if (!e || typeof e != "string")
                        e = b;
                    a[e] || (a[e] = {});
                    var f = a[e]
                      , h = c.split(".")
                      , i = f
                      , j = null;
                    while (j = h.shift())
                        if (h.length) {
                            i[j] === undefined && (i[j] = {});
                            i = i[j]
                        } else if (i[j] === undefined)
                            try {
                                if (e && e !== b) {
                                    if (c === "core.util.listener") {
                                        i[j] = a[b].core.util.listener;
                                        return !0
                                    }
                                    if (c === "core.util.connect") {
                                        i[j] = a[b].core.util.connect;
                                        return !0
                                    }
                                }
                                i[j] = d(f);
                                return !0
                            } catch (k) {
                                setTimeout(function() {
                                    console.log(k)
                                }, 0)
                            }
                    return !1
                }
                ;
                f.unRegister = function(c, d) {
                    if (!d || typeof d != "string")
                        d = b;
                    var e = a[d]
                      , f = c.split(".")
                      , h = e
                      , i = null;
                    while (i = f.shift())
                        if (f.length) {
                            if (h[i] === undefined)
                                return !1;
                            h = h[i]
                        } else if (h[i] !== undefined) {
                            delete h[i];
                            return !0
                        }
                    return !1
                }
                ;
                f.regShort = function(a, b) {
                    if (f[a] !== undefined)
                        throw "[" + a + "] : short : has been register";
                    f[a] = b
                }
                ;
                f.shortRegister = function(c, d, e) {
                    if (!e || typeof e != "string")
                        e = b;
                    var f = a[e]
                      , h = c.split(".");
                    if (!d)
                        return !1;
                    if (f[d])
                        return !1;
                    var i = f
                      , j = null;
                    while (j = h.shift())
                        if (h.length) {
                            if (i[j] === undefined)
                                return !1;
                            i = i[j]
                        } else if (i[j] !== undefined) {
                            if (f[d])
                                return !1;
                            f[d] = i[j];
                            return !0
                        }
                    return !1
                }
                ;
                f.getPKG = function(c) {
                    if (!c || typeof c != "string")
                        c = b;
                    return a[c]
                }
                ;
                return f
            }();
        a.register("core.util.listener", function(a) {
            return function() {
                var a = {}, b = [], c, d = function() {
                    if (b.length != 0) {
                        clearTimeout(c);
                        var a = b.splice(0, 1)[0];
                        try {
                            a.func.apply(a.func, [].concat(a.data))
                        } catch (g) {}
                        c = setTimeout(d, 25)
                    }
                };
                return {
                    register: function(b, c, d) {
                        a[b] = a[b] || {};
                        a[b][c] = a[b][c] || [];
                        a[b][c].push(d)
                    },
                    fire: function(c, g, h) {
                        var i, j, k;
                        if (a[c] && a[c][g] && a[c][g].length > 0) {
                            i = a[c][g];
                            i.data_cache = h;
                            for (j = 0,
                            k = i.length; j < k; j++)
                                b.push({
                                    channel: c,
                                    evt: g,
                                    func: i[j],
                                    data: h
                                });
                            d()
                        }
                    },
                    remove: function(b, c, d) {
                        if (a[b] && a[b][c])
                            for (var e = 0, f = a[b][c].length; e < f; e++)
                                if (a[b][c][e] === d) {
                                    a[b][c].splice(e, 1);
                                    break
                                }
                    },
                    list: function() {
                        return a
                    },
                    cache: function(b, c) {
                        if (a[b] && a[b][c])
                            return a[b][c].data_cache
                    }
                }
            }()
        });
        a.register("core.obj.parseParam", function(a) {
            return function(a, b, c) {
                var d, e = {};
                b = b || {};
                for (d in a) {
                    e[d] = a[d];
                    b[d] != null && (c ? a.hasOwnProperty(d) && (e[d] = b[d]) : e[d] = b[d])
                }
                return e
            }
        });
        a.register("core.dom.removeNode", function(a) {
            return function(c) {
                c = a.E(c) || c;
                try {
                    c.parentNode.removeChild(c)
                } catch (d) {}
            }
        });
        a.register("core.util.getUniqueKey", function(a) {
            var b = (new Date).getTime().toString()
              , c = 1;
            return function() {
                return b + c++
            }
        });
        a.register("core.func.empty", function() {
            return function() {}
        });
        a.register("core.str.parseURL", function(a) {
            return function(a) {
                var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
                  , c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"]
                  , d = b.exec(a)
                  , e = {};
                for (var f = 0, g = c.length; f < g; f += 1)
                    e[c[f]] = d[f] || "";
                return e
            }
        });
        a.register("core.arr.isArray", function(a) {
            return function(a) {
                return Object.prototype.toString.call(a) === "[object Array]"
            }
        });
        a.register("core.str.trim", function(a) {
            return function(a) {
                if (typeof a != "string")
                    throw "trim need a string as parameter";
                var b = a.length
                  , c = 0
                  , d = /(\u3000|\s|\t|\u00A0)/;
                while (c < b) {
                    if (!d.test(a.charAt(c)))
                        break;
                    c += 1
                }
                while (b > c) {
                    if (!d.test(a.charAt(b - 1)))
                        break;
                    b -= 1
                }
                return a.slice(c, b)
            }
        });
        a.register("core.json.queryToJson", function(a) {
            return function(c, d) {
                var e = a.core.str.trim(c).split("&")
                  , f = {}
                  , g = function(a) {
                    return d ? decodeURIComponent(a) : a
                };
                for (var h = 0, i = e.length; h < i; h++)
                    if (e[h]) {
                        var j = e[h].split("=")
                          , k = j[0]
                          , l = j[1];
                        if (j.length < 2) {
                            l = k;
                            k = "$nullName"
                        }
                        if (!f[k])
                            f[k] = g(l);
                        else {
                            a.core.arr.isArray(f[k]) != !0 && (f[k] = [f[k]]);
                            f[k].push(g(l))
                        }
                    }
                return f
            }
        });
        a.register("core.json.jsonToQuery", function(a) {
            var b = function(b, c) {
                b = b == null ? "" : b;
                b = a.core.str.trim(b.toString());
                return c ? encodeURIComponent(b) : b
            };
            return function(a, d) {
                var e = [];
                if (typeof a == "object")
                    for (var f in a) {
                        if (f === "$nullName") {
                            e = e.concat(a[f]);
                            continue
                        }
                        if (a[f]instanceof Array)
                            for (var g = 0, h = a[f].length; g < h; g++)
                                e.push(f + "=" + b(a[f][g], d));
                        else
                            typeof a[f] != "function" && e.push(f + "=" + b(a[f], d))
                    }
                return e.length ? e.join("&") : ""
            }
        });
        a.register("core.util.URL", function(a) {
            return function(c, d) {
                var e = a.core.obj.parseParam({
                    isEncodeQuery: !1,
                    isEncodeHash: !1
                }, d || {})
                  , f = {}
                  , g = a.core.str.parseURL(c)
                  , h = a.core.json.queryToJson(g.query)
                  , i = a.core.json.queryToJson(g.hash);
                f.setParam = function(a, b) {
                    h[a] = b;
                    return this
                }
                ;
                f.getParam = function(a) {
                    return h[a]
                }
                ;
                f.setParams = function(a) {
                    for (var b in a)
                        f.setParam(b, a[b]);
                    return this
                }
                ;
                f.setHash = function(a, b) {
                    i[a] = b;
                    return this
                }
                ;
                f.getHash = function(a) {
                    return i[a]
                }
                ;
                f.valueOf = f.toString = function() {
                    var c = []
                      , d = a.core.json.jsonToQuery(h, e.isEncodeQuery)
                      , f = a.core.json.jsonToQuery(i, e.isEncodeQuery);
                    if (g.scheme != "") {
                        c.push(g.scheme + ":");
                        c.push(g.slash)
                    }
                    if (g.host != "") {
                        c.push(g.host);
                        if (g.port != "") {
                            c.push(":");
                            c.push(g.port)
                        }
                    }
                    c.push("/");
                    c.push(g.path);
                    d != "" && c.push("?" + d);
                    f != "" && c.push("#" + f);
                    return c.join("")
                }
                ;
                return f
            }
        });
        a.register("core.io.scriptLoader", function(a) {
            var b = {}
              , c = {
                url: "",
                charset: "UTF-8",
                timeout: 3e4,
                args: {},
                onComplete: a.core.func.empty,
                onTimeout: a.core.func.empty,
                isEncode: !1,
                uniqueID: null
            };
            return function(e) {
                var f, g, h = a.core.obj.parseParam(c, e);
                if (h.url == "")
                    throw "scriptLoader: url is null";
                var i = h.uniqueID || a.core.util.getUniqueKey();
                f = b[i];
                if (f != null && a.IE != !0) {
                    a.core.dom.removeNode(f);
                    f = null
                }
                f == null && (f = b[i] = a.C("script"));
                f.charset = h.charset;
                f.id = "scriptRequest_script_" + i;
                f.type = "text/javascript";
                h.onComplete != null && (a.IE ? f.onreadystatechange = function() {
                    if (f.readyState.toLowerCase() == "loaded" || f.readyState.toLowerCase() == "complete") {
                        try {
                            clearTimeout(g);
                            document.getElementsByTagName("head")[0].removeChild(f);
                            f.onreadystatechange = null
                        } catch (a) {}
                        h.onComplete()
                    }
                }
                : f.onload = function() {
                    try {
                        clearTimeout(g);
                        a.core.dom.removeNode(f)
                    } catch (b) {}
                    h.onComplete()
                }
                );
                f.src = a.core.util.URL(h.url, {
                    isEncodeQuery: h.isEncode
                }).setParams(h.args).toString();
                document.getElementsByTagName("head")[0].appendChild(f);
                h.timeout > 0 && (g = setTimeout(function() {
                    try {
                        document.getElementsByTagName("head")[0].removeChild(f)
                    } catch (a) {}
                    h.onTimeout()
                }, h.timeout));
                return f
            }
        });
        a.register("core.io.jsonp", function(a) {
            return function(c) {
                var d = a.core.obj.parseParam({
                    url: "",
                    charset: "UTF-8",
                    timeout: 3e4,
                    args: {},
                    onComplete: null,
                    onTimeout: null,
                    responseName: null,
                    isEncode: !1,
                    varkey: "callback"
                }, c)
                  , e = -1
                  , f = d.responseName || "STK_" + a.core.util.getUniqueKey();
                d.args[d.varkey] = f;
                var g = d.onComplete
                  , h = d.onTimeout;
                window[f] = function(a) {
                    if (e != 2 && g != null) {
                        e = 1;
                        g(a)
                    }
                }
                ;
                d.onComplete = null;
                d.onTimeout = function() {
                    if (e != 1 && h != null) {
                        e = 2;
                        h()
                    }
                }
                ;
                return a.core.io.scriptLoader(d)
            }
        });
        a.register("common.listener", function(a) {
            var b = {}
              , c = {};
            c.define = function(c, e) {
                if (b[c] != null)
                    throw "common.listener.define: 频道已被占用";
                b[c] = e;
                var f = {};
                f.register = function(e, f) {
                    if (b[c] == null)
                        throw "common.listener.define: 频道未定义";
                    a.core.util.listener.register(c, e, f)
                }
                ;
                f.fire = function(e, f) {
                    if (b[c] == null)
                        throw "commonlistener.define: 频道未定义";
                    a.core.util.listener.fire(c, e, f)
                }
                ;
                f.remove = function(b, d) {
                    a.core.util.listener.remove(c, b, d)
                }
                ;
                return f
            }
            ;
            return c
        });
        a.register("common.channel.qrcode_login", function(a) {
            return a.common.listener.define("common.channel.qrcode_login", ["qrcode_scanned", "qrcode_used", "qrcode_timeout", "qrcode_exception", "login_failure", "login_success"])
        });
        a.register("jobs.qrcode_login", function(a) {
            var b = {}, c = a.common.channel.qrcode_login, d = {
                entry: "sso",
                domain: "weibo.com",
                get_image_timeout: 1e4,
                check_request_timeout: 1e4,
                qrcode_size: 180,
                crossdomain_timeout: 3e3,
                savestate: 30
            }, e = {
                qrcode_image: "https://login.sina.com.cn/sso/qrcode/image",
                qrcode_check: "https://login.sina.com.cn/sso/qrcode/check",
                qrcode_login: "https://login.sina.com.cn/sso/login.php"
            }, f, g = 0, h = 3e3, i;
            b.set = function(a) {
                for (var c in a)
                    d[c] = a[c];
                return b
            }
            ;
            b.getQRcode = function(a) {
                return j(function(b) {
                    a(b)
                })
            }
            ;
            b.getQRcodeId = function() {
                return f
            }
            ;
            b.start = function() {
                i = !1;
                g++;
                k(g)
            }
            ;
            b.cancel = function() {
                i = !0
            }
            ;
            b.register = function(a, d) {
                c.register(a, d);
                return b
            }
            ;
            b.remove = function(a, d) {
                c.remove(a, d);
                return b
            }
            ;
            var j = function(g) {
                a.core.io.jsonp({
                    url: e.qrcode_image,
                    timeout: d.get_image_timeout,
                    args: {
                        entry: d.entry,
                        size: d.qrcode_size
                    },
                    onComplete: function(a) {
                        if (!a || a.retcode != 2e7)
                            g(a);
                        else {
                            var b = a.data;
                            b.interval && (h = b.interval);
                            f = b.qrid;
                            g(a)
                        }
                    },
                    onTimeout: function() {
                        c.fire("get_image_timeout")
                    },
                    isEncode: !0,
                    varkey: "callback"
                });
                return b
            }
              , k = function(a) {
                var b = function(d) {
                    d.retcode == 2e7 ? m(d) : d.retcode == 50114002 ? c.fire("qrcode_scanned", [d]) : d.retcode == 50114003 ? c.fire("qrcode_timeout", [d]) : d.retcode == 50114004 && c.fire("qrcode_used", [d]);
                    (d.retcode == 50114001 || d.retcode == 50114002) && setTimeout(function() {
                        if (!(a < g)) {
                            if (i)
                                return;
                            l(b)
                        }
                    }, h)
                };
                l(b)
            }
              , l = function(b) {
                a.core.io.jsonp({
                    url: e.qrcode_check,
                    timeout: d.check_request_timeout,
                    args: {
                        entry: d.entry,
                        qrid: f
                    },
                    onComplete: function(a) {
                        a ? b(a) : b({
                            retcode: -1
                        })
                    },
                    onTimeout: function() {
                        c.fire("check_timeout")
                    },
                    isEncode: !0,
                    varkey: "callback"
                })
            }
              , m = function(b) {
                a.core.io.jsonp({
                    url: e.qrcode_login,
                    timeout: d.login_request_timeout,
                    args: {
                        entry: d.entry,
                        returntype: "TEXT",
                        crossdomain: 1,
                        cdult: 3,
                        domain: d.domain,
                        alt: b.data.alt,
                        savestate: d.savestate
                    },
                    onComplete: function(a) {
                        a.retcode != 0 ? c.fire("login_failure", {
                            retcode: a.retcode,
                            msg: a.reason
                        }) : n(a, function(b) {
                            b.result === !1 ? c.fire("login_failure", {
                                retcode: -2,
                                msg: "登录失败"
                            }) : c.fire("login_success", a)
                        })
                    },
                    onTimeout: function() {
                        c.fire("login_failure", {
                            retcode: -1,
                            msg: "登录超时"
                        })
                    },
                    isEncode: !0,
                    varkey: "callback"
                })
            }
              , n = function(b, c) {
                var e = b.crossDomainUrlList.length;
                if (e == 0)
                    c({
                        result: !0
                    });
                else {
                    var f = setTimeout(function() {
                        e = -1;
                        c({
                            result: !1
                        })
                    }, d.crossdomain_timeout);
                    for (var g in b.crossDomainUrlList)
                        a.core.io.scriptLoader({
                            url: b.crossDomainUrlList[g],
                            charset: "UTF-8",
                            args: {
                                action: "login"
                            },
                            onComplete: function() {
                                e--;
                                if (e == 0) {
                                    clearTimeout(f);
                                    c({
                                        result: !0
                                    })
                                }
                            }
                        })
                }
            };
            return b
        });
        (function(a) {
            var b = a.jobs.qrcode_login;
            b.getVersion = function() {
                return "qrcode_login.js(v1.0.1) 2013-12-02"
            }
            ;
            b.STK = a;
            this.SINA_QRCODE_LOGIN = b
        }
        ).call(this, a)
    }
    ).call(this);
    STK.register("v6.conf.channel.sso.qrcode", function(a) {
        var b = ["qrcode_scanned", "qrcode_used", "qrcode_timeout", "qrcode_exception", "login_success", "login_failure", "getQRcode", "getQRcode_success", "start", "cancel", "set"];
        return a.v6.lib.kit.extra.listener.define("v6.conf.channel.sso.qrcode", b)
    });
    STK.register("v6.pub.plugin.sso.qrcodebridge", function(a) {
        var b = window.SINA_QRCODE_LOGIN
          , c = a.v6.conf.channel.sso.qrcode;
        return function(a) {
            var d = !1
              , e = {
                init: function() {
                    if (!d) {
                        e.bind();
                        d = !0
                    }
                },
                bind: function() {
                    for (var a in e.send)
                        b.register(a, e.send[a]);
                    for (var a in e.handle)
                        c.register(a, e.handle[a])
                },
                unbind: function() {},
                send: {
                    qrcode_scanned: function(a) {
                        c.fire("qrcode_scanned", a)
                    },
                    qrcode_used: function(a) {
                        c.fire("qrcode_used", a)
                    },
                    qrcode_timeout: function(a) {
                        c.fire("qrcode_timeout", a)
                    },
                    qrcode_exception: function(a) {
                        c.fire("qrcode_exception", a)
                    },
                    login_success: function(a) {
                        c.fire("login_success", a)
                    },
                    login_failure: function(a) {
                        c.fire("login_failure", a)
                    }
                },
                handle: {
                    getQRcode: function() {
                        b.getQRcode(function(a) {
                            if (a.retcode == "20000000") {
                                c.fire("getQRcode_success", a);
                                b.start()
                            }
                        })
                    },
                    cancel: function() {
                        b.cancel()
                    },
                    start: function() {
                        b.start()
                    },
                    set: function(a) {
                        b.set(a)
                    }
                }
            }
              , f = {};
            e.init();
            return f
        }
    });
    STK.register("v6.pl.open.loginlayer.source.pluginloader", function(a) {
        var b = !1;
        return function(c) {
            var d = {
                desktop: !1,
                login: !1,
                qrcode: !1
            }
              , e = {
                vsnf: 1,
                hold_login_state: !1,
                cookie_timeout: 0,
                entry: "weibo",
                domain: "weibo.com",
                service: "miniblog",
                useTicket: !0,
                crossDomain: !0,
                feedBackUrl: $CONFIG && $CONFIG.loginFeedBackUrl ? $CONFIG.loginFeedBackUrl : location.protocol + "//" + window.location.hostname + "/ajaxlogin.php",
                loginSuccessUrl: ""
            }
              , f = {
                init: function() {
                    if (!b) {
                        b = !0;
                        f.parseParam();
                        f.initPlugin()
                    }
                },
                parseParam: function() {
                    d = a.core.obj.parseParam(d, c.plugins || {});
                    e = a.core.obj.parseParam(e, c.loginParam || {})
                },
                initPlugin: function() {
                    d.login && (d.login = a.v6.pub.plugin.sso.loginbridge(e));
                    d.desktop && (d.desktop = a.v6.pub.plugin.sso.desktopbridge());
                    d.qrcode && (d.qrcode = a.v6.pub.plugin.sso.qrcodebridge())
                },
                destroy: function() {
                    d.login && d.login.destroy && d.login.destroy();
                    d.desktop && d.desktop.destroy && d.desktop.destroy();
                    d.qrcode && d.qrcode.destroy && d.qrcode.destroy();
                    d = {
                        desktop: !1,
                        login: !1,
                        qrcode: !1
                    };
                    b = !1
                }
            };
            f.init();
            var g = {};
            g.destroy = f.destroy;
            return g
        }
    });
    STK.register("v6.lib.kit.extra.jsPath", function(a) {
        var b = {
            path: $CONFIG.jsPath || "//js.t.sinajs.cn/t5/",
            mPath: $CONFIG.mJsPath
        }, c, d = function() {
            c = [""];
            for (var a = b.mPath[1]; a <= b.mPath[2]; a++)
                c.push(a.toString())
        }, e = function() {
            if (typeof b.mPath != "undefined") {
                !c && d();
                return b.mPath[0].replace("{n}", c[Math.ceil(Math.random() * 10) % c.length])
            }
            return b.path
        };
        return e
    });
    STK.register("v6.lib.kit.extra.cssPath", function(a) {
        var b = {
            path: $CONFIG.cssPath || "//img.t.sinajs.cn/t6/",
            mPath: $CONFIG.mCssPath
        }, c, d = function() {
            c = [""];
            for (var a = b.mPath[1]; a <= b.mPath[2]; a++)
                c.push(a.toString())
        }, e = function() {
            if (typeof b.mPath != "undefined") {
                !c && d();
                return b.mPath[0].replace("{n}", c[Math.ceil(Math.random() * 10) % c.length])
            }
            return b.path
        };
        return e
    });
    STK.register("v6.lib.kit.io.cssLoader", function(a) {
        var b = ""
          , c = "//img.t.sinajs.cn/t4/"
          , d = "//timg.sjs.sinajs.cn/t4/";
        if (typeof $CONFIG != "undefined") {
            c = $CONFIG.cssPath || c;
            b = $CONFIG.version || ""
        }
        var e = {};
        return function(f, g, h, i, j) {
            i = i || b;
            h = h || function() {}
            ;
            var k = function(a, b) {
                var c = e[a] || (e[a] = {
                    loaded: !1,
                    list: []
                });
                if (c.loaded) {
                    b(a);
                    return !1
                }
                c.list.push(b);
                return c.list.length > 1 ? !1 : !0
            }
              , l = function(a) {
                var b = e[a].list;
                for (var c = 0; c < b.length; c++)
                    b[c](a);
                e[a].loaded = !0;
                delete e[a].list
            };
            if (!!k(f, h)) {
                var m;
                /^(http:|https:|\/\/)/i.test(f) ? m = f : j ? m = d + f : m = c + f + "?version=" + i;
                var n = a.C("link");
                n.setAttribute("rel", "Stylesheet");
                n.setAttribute("type", "text/css");
                n.setAttribute("charset", "utf-8");
                n.setAttribute("href", m);
                document.getElementsByTagName("head")[0].appendChild(n);
                var o = a.C("div");
                o.id = g;
                a.core.util.hideContainer.appendChild(o);
                var p = 30
                  , q = function() {
                    if (parseInt(a.core.dom.getStyle(o, "height")) == 42) {
                        a.core.util.hideContainer.removeChild(o);
                        l(f)
                    } else if (--p > 0)
                        setTimeout(q, 10);
                    else {
                        a.log(f + "timeout!");
                        a.core.util.hideContainer.removeChild(o);
                        delete e[f]
                    }
                };
                setTimeout(q, 50)
            }
        }
    });
    STK.register("v6.lib.kit.io.jsonp", function(a) {
        return function(b) {
            var c = a.parseParam({
                url: "",
                method: "get",
                responseType: "json",
                varkey: "_v",
                timeout: 3e4,
                onComplete: a.funcEmpty,
                onTraning: a.funcEmpty,
                onFail: a.funcEmpty,
                isEncode: !0
            }, b)
              , d = []
              , e = {}
              , f = !1
              , g = function() {
                if (!!d.length) {
                    if (f === !0)
                        return;
                    f = !0;
                    e.args = d.shift();
                    e.onComplete = function(a) {
                        f = !1;
                        c.onComplete(a, e.args);
                        setTimeout(g, 0)
                    }
                    ;
                    e.onFail = function(a) {
                        f = !1;
                        c.onFail(a);
                        setTimeout(g, 0)
                    }
                    ;
                    a.jsonp(a.core.json.merge(c, {
                        args: e.args,
                        onComplete: function(a) {
                            e.onComplete(a)
                        },
                        onFail: function(a) {
                            try {
                                e.onFail(a)
                            } catch (b) {}
                        }
                    }))
                }
            }
              , h = {};
            h.request = function(a) {
                a || (a = {});
                d.push(a);
                a._t = 1;
                g()
            }
            ;
            h.abort = function(a) {
                while (d.length)
                    d.shift();
                f = !1;
                e = null
            }
            ;
            return h
        }
    });
    STK.register("v6.lib.kit.dom.parseDOM", function(a) {
        return function(a) {
            for (var b in a)
                a[b] && a[b].length == 1 && (a[b] = a[b][0]);
            return a
        }
    });
    STK.register("v6.lib.kit.extra.parseLanguage", function(a) {
        var b, c = function(d) {
            if (typeof d == "string")
                return a.core.util.language(d, b);
            for (var e in d)
                d[e] = c(d[e]);
            return d
        };
        return function(a, d) {
            b = d || window.$LANG || {};
            return c(a)
        }
    });
    STK.register("kit.dom.layoutPos", function(a) {
        return function(b, c, d) {
            if (!a.isNode(c))
                throw "kit.dom.layerOutElement need element as first parameter";
            if (c === document.body)
                return !1;
            if (!c.parentNode)
                return !1;
            if (c.style.display === "none")
                return !1;
            var e, f, g, h, i, j, k;
            e = a.parseParam({
                pos: "left-bottom",
                offsetX: 0,
                offsetY: 0
            }, d);
            f = c;
            if (!f)
                return !1;
            while (f !== document.body) {
                f = f.parentNode;
                if (f.style.display === "none")
                    return !1;
                j = a.getStyle(f, "position");
                k = f.getAttribute("layout-shell");
                if (j === "absolute" || j === "fixed")
                    break;
                if (k === "true" && j === "relative")
                    break
            }
            f.appendChild(b);
            g = a.position(c, {
                parent: f
            });
            h = {
                w: c.offsetWidth,
                h: c.offsetHeight
            };
            i = e.pos.split("-");
            i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
            i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
            return !0
        }
    });
    STK.register("kit.dom.parseDOM", function(a) {
        return function(a) {
            for (var b in a)
                a[b] && a[b].length == 1 && (a[b] = a[b][0]);
            return a
        }
    });
    STK.register("kit.dom.firstChild", function(a) {
        var b = a.core.dom.next;
        return function(a) {
            var c = a.firstChild;
            c && c.nodeType != 1 && (c = b(c));
            return c
        }
    });
    STK.register("kit.extra.textareaUtils", function(a) {
        var b = {}
          , c = document.selection;
        b.selectionStart = function(a) {
            if (!c)
                try {
                    return a.selectionStart
                } catch (b) {
                    return 0
                }
            var d = c.createRange(), e, f, g = 0, h = document.body.createTextRange();
            try {
                h.moveToElementText(a)
            } catch (b) {}
            for (g; h.compareEndPoints("StartToStart", d) < 0; g++)
                h.moveStart("character", 1);
            return g
        }
        ;
        b.selectionBefore = function(a) {
            return a.value.slice(0, b.selectionStart(a))
        }
        ;
        b.selectText = function(a, b, d) {
            a.focus();
            if (!c)
                a.setSelectionRange(b, d);
            else {
                var e = a.createTextRange();
                e.collapse(1);
                e.moveStart("character", b);
                e.moveEnd("character", d - b);
                e.select()
            }
        }
        ;
        b.insertText = function(a, d, e, f) {
            a.focus();
            f = f || 0;
            if (!c) {
                var g = a.value
                  , h = e - f
                  , i = h + d.length;
                a.value = g.slice(0, h) + d + g.slice(e, g.length);
                b.selectText(a, i, i)
            } else {
                var j = c.createRange();
                j.moveStart("character", -f);
                j.text = d
            }
        }
        ;
        b.replaceText = function(a, d) {
            a.focus();
            var e = a.value
              , f = b.getSelectedText(a)
              , g = f.length;
            if (f.length == 0)
                b.insertText(a, d, b.getCursorPos(a));
            else {
                var h = b.getCursorPos(a);
                if (!c) {
                    var j = h + f.length;
                    a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                    b.setCursor(a, h + d.length);
                    return
                }
                var i = c.createRange();
                i.text = d;
                b.setCursor(a, h + d.length)
            }
        }
        ;
        b.getCursorPos = function(a) {
            var b = 0;
            if (STK.core.util.browser.IE) {
                a.focus();
                var d = null;
                d = c.createRange();
                var e = d.duplicate();
                e.moveToElementText(a);
                e.setEndPoint("EndToEnd", d);
                a.selectionStartIE = e.text.length - d.text.length;
                a.selectionEndIE = a.selectionStartIE + d.text.length;
                b = a.selectionStartIE
            } else if (a.selectionStart || a.selectionStart == "0")
                b = a.selectionStart;
            return b
        }
        ;
        b.getSelectedText = function(a) {
            var b = ""
              , d = function(a) {
                return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
            };
            window.getSelection ? b = d(a) : b = c.createRange().text;
            return b
        }
        ;
        b.setCursor = function(a, b, c) {
            b = b == null ? a.value.length : b;
            c = c == null ? 0 : c;
            a.focus();
            if (a.createTextRange) {
                var d = a.createTextRange();
                d.move("character", b);
                d.moveEnd("character", c);
                d.select()
            } else
                a.setSelectionRange(b, b + c)
        }
        ;
        b.unCoverInsertText = function(a, b, c) {
            c = c == null ? {} : c;
            c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
            c.rccl = c.rccl == null ? 0 : c.rccl * 1;
            var d = a.value
              , e = d.slice(0, c.rcs)
              , f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
            a.value = e + b + f;
            this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
        }
        ;
        return b
    });
    STK.register("kit.io.jsonp", function(a) {
        return function(b) {
            var c = a.parseParam({
                url: "",
                method: "get",
                responseType: "json",
                varkey: "_v",
                timeout: 3e4,
                onComplete: a.funcEmpty,
                onTraning: a.funcEmpty,
                onFail: a.funcEmpty,
                isEncode: !0
            }, b)
              , d = []
              , e = {}
              , f = !1
              , g = function() {
                if (!!d.length) {
                    if (f === !0)
                        return;
                    f = !0;
                    e.args = d.shift();
                    e.onComplete = function(a) {
                        f = !1;
                        c.onComplete(a, e.args);
                        setTimeout(g, 0)
                    }
                    ;
                    e.onFail = function(a) {
                        f = !1;
                        c.onFail(a);
                        setTimeout(g, 0)
                    }
                    ;
                    a.jsonp(a.core.json.merge(c, {
                        args: e.args,
                        onComplete: function(a) {
                            e.onComplete(a)
                        },
                        onFail: function(a) {
                            try {
                                e.onFail(a)
                            } catch (b) {}
                        }
                    }))
                }
            }
              , h = {};
            h.request = function(a) {
                a || (a = {});
                d.push(a);
                a._t = 1;
                g()
            }
            ;
            h.abort = function(a) {
                while (d.length)
                    d.shift();
                f = !1;
                e = null
            }
            ;
            return h
        }
    });
    STK.register("common.extra.parseLanguage", function(a) {
        var b, c = function(d) {
            if (typeof d == "string")
                return a.core.util.language(d, b);
            for (var e in d)
                d[e] = c(d[e]);
            return d
        };
        return function(a, d) {
            b = d || window.$LANG || {};
            return c(a)
        }
    });
    STK.register("v6.conf.data.iconType", function(a) {
        return function() {
            var a = ["succ", "succM", "succB", "delS", "delM", "delB", "errorS", "errorM", "errorB", "askS", "questionM", "questionB", "warnS", "warnM", "warnB", "rederrorS", "rederrorM", "rederrorB"];
            return a
        }
    });
    STK.register("v6.pub.ui.tipAlert", function(a) {
        return function(b) {
            var c, d = '<div class="Bv6_layer Bv6_layer_pop">\n\t<div class="content layer_mini_info">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon"></span>\n\t\t\t<span node-type="text"></span>\n\t\t</p>\n\t\t<div node-type="otherText"></div>\n\t\t\n\t\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>', e = {
                init: function() {},
                show: function(b, e) {
                    e = a.parseParam({
                        el: null,
                        box: null,
                        icon: null,
                        offsetX: 0,
                        offsetY: 0,
                        useNewTemplate: !0,
                        pos: null
                    }, e || {});
                    if (!!e.el && !!a.isNode(e.el)) {
                        a.isNode(e.box) || (e.box = e.el);
                        e.icon in a.v6.conf.data.iconType || (e.icon = "rederrorS");
                        e.autoHide = !!e.autoHide;
                        var f = {
                            icon: e.icon,
                            autoHide: e.autoHide,
                            stopClickPropagation: !1,
                            showWithSetWidth: !1
                        };
                        e.useNewTemplate && (f.template = d);
                        var g = {
                            offsetX: e.offsetX,
                            offsetY: e.offsetY || 5
                        };
                        e.pos && (g.pos = e.pos);
                        c = a.v6.conf.core.ui.tipAlert(b, f).beside(e.box, g)
                    }
                },
                hide: function() {
                    c && c.hide()
                },
                destroy: function() {
                    c && c.destroy();
                    c = null
                }
            }, f = {
                layer: c,
                show: e.show,
                hide: e.hide,
                destroy: e.destroy
            };
            return f
        }
    });
    STK.register("common.extra.keyboardCapture", function(a) {
        var b = {
            13: "enter",
            27: "esc",
            32: "space",
            38: "up",
            40: "down",
            9: "tab"
        };
        return function(c, d) {
            d = d || {};
            var e = {}, f, g = {
                keydown: function(c) {
                    d.stopScroll && a.stopEvent();
                    var f, g;
                    !!(f = c) && !!(g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
                }
            }, h = {
                init: function() {
                    h.pars();
                    h.bind()
                },
                pars: function() {},
                bind: function() {
                    for (var b in g)
                        a.addEvent(c, b, g[b])
                },
                getKey: function(a) {
                    return b[a]
                },
                destroy: function() {
                    for (var b in g)
                        a.removeEvent(c, b, g[b])
                }
            };
            h.init();
            e.getKey = h.getKey;
            e.destroy = h.destroy;
            return e
        }
    });
    STK.register("kit.extra.language", function(a) {
        window.$LANG || (window.$LANG = {});
        return function(b) {
            var c = [].splice.call(arguments, 1, arguments.length)
              , d = [b, $LANG].concat(c)
              , e = a.core.util.language.apply(this, d);
            return e
        }
    });
    STK.register("common.layer.emailAutocomplete", function(a) {
        var b = a.kit.extra.textareaUtils
          , c = a.kit.extra.language
          , d = ["sina.com", "163.com", "qq.com", "126.com", "vip.sina.com", "sina.cn", "hotmail.com", "gmail.com", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"]
          , e = {
            panel: ['<div node-type="layer" class="layer_menu_list" style="display:none;">', '<ul><li class="note">#L{请选择邮箱类型}</li></ul>', '<ul node-type="panel"></ul>', "</div>"].join(""),
            item: ["<#et userlist data>", "<#list data.data as item>", '<li action-type="item" action-data="value=${data.key}@${item}" ><a href="#">${data.key}@${item}</a></li>', "</#list>", "</#et>"].join("")
        }
          , f = ["enter", "esc", "up", "down"]
          , g = [/^[0-9a-z_][_.0-9a-z-]{0,31}$/, /^[0-9a-zA-Z_][_.0-9a-zA-Z-]{0,31}$/]
          , h = {};
        return function(b, i) {
            var j, k, l, m, n, o, p, q = !1, r = {
                get: function(a) {
                    var b = a.split("@")
                      , c = b.length;
                    if (c == 2) {
                        var e = b[1].toLowerCase();
                        if (!!e && !/^[0-9a-z]+[0-9a-z-.]*$/.test(e))
                            return null;
                        if (e) {
                            !h[e] && r.run(e);
                            return h[e]
                        }
                        return d
                    }
                    return null
                },
                run: function(a) {
                    var b = new RegExp("^" + a + "");
                    h[a] = [];
                    for (var c in d) {
                        c = d[c];
                        !!b.exec(c) && h[a].push(c)
                    }
                },
                checkFormat: function(a, b) {
                    b = !b ? 0 : 1;
                    return g[b].test(a)
                }
            }, s, t = {
                build: function() {
                    var b = a.builder(c(j.template.panel));
                    k = b.list.layer[0];
                    l = b.list.panel[0];
                    document.body.appendChild(b.box)
                },
                show: function() {
                    var c = a.core.dom.position(b)
                      , d = a.core.dom.getSize(b)
                      , e = ["position:absolute", "display:inline-block", "z-index:10010", "left:" + (c.l + j.offsetX) + "px", "top:" + (c.t + d.height + j.offsetY) + "px"];
                    if (j.width > 0) {
                        e.push("width:" + j.width + "px");
                        e.push("overflow:hidden")
                    }
                    k.style.cssText = e.join(";");
                    q = !0
                },
                hide: function() {
                    setTimeout(function() {
                        k.style.display = "none";
                        q = !1
                    }, 300)
                },
                refresh: function(b, c, d) {
                    l.innerHTML = a.core.util.easyTemplate(j.template.item, {
                        key: encodeURIComponent(b),
                        domain: c,
                        data: d
                    }).toString();
                    s = null
                },
                indexChange: function(b) {
                    var c = p.length;
                    if (!(c < 1)) {
                        var d = a.sizzle("li.cur", l)[0];
                        if (d) {
                            var e = a.core.dom[b > 0 ? "next" : "prev"](d);
                            e ? s = e : s = a.core.dom[(b > 0 ? "first" : "last") + "Child"](l);
                            s && a.removeClassName(d, "cur")
                        } else {
                            var f = a.sizzle("li", l);
                            s = a.sizzle("li", l)[0]
                        }
                        a.addClassName(s, "cur")
                    }
                },
                onShown: function() {
                    return q
                },
                hasCurrent: function() {
                    var b = a.sizzle("li.cur", l)[0];
                    return b ? !0 : !1
                }
            }, u = {
                enter: function() {
                    var c = b.value;
                    j.autoTrim && (c = c.replace(/^\s+/g, ""));
                    var d = a.queryToJson(s.getAttribute("action-data"));
                    if (d.value.indexOf(c) === 0 && c !== "") {
                        b.value = d.value;
                        b.blur()
                    }
                },
                esc: function() {
                    x.hide()
                },
                up: function() {
                    t.indexChange(-1);
                    a.preventDefault()
                },
                down: function() {
                    t.indexChange(1);
                    a.preventDefault()
                }
            }, v = {
                focus: function() {
                    x.show()
                },
                blur: function() {
                    x.hide()
                },
                keyup: function(a) {
                    var b = a.keyCode;
                    !u[n.getKey(b)] && !m && (m = setTimeout(function() {
                        x.show();
                        clearTimeout(m);
                        m = null
                    }, 500))
                }
            }, w = {
                mousedown: {
                    item: function(a) {
                        b.value = a.data.value
                    }
                },
                click: {
                    item: function(b) {
                        a.preventDefault();
                        x.hide()
                    }
                }
            }, x = {
                init: function() {
                    if (!a.isNode(b))
                        throw "input is undefined";
                    x.pars();
                    x.build();
                    x.bind()
                },
                pars: function() {
                    j = a.parseParam({
                        template: e,
                        autoTrim: !1,
                        autoCase: !1,
                        width: -1,
                        offsetX: 0,
                        offsetY: 0
                    }, i || {});
                    d = $CONFIG.emailDomains || i && i.domains || d
                },
                build: function() {
                    t.build();
                    n = a.common.extra.keyboardCapture(b)
                },
                bind: function() {
                    a.custEvent.define(n, f);
                    for (var c = 0, d = f.length; c < d; c++)
                        a.custEvent.add(n, f[c], u[f[c]]);
                    for (var e in v)
                        a.addEvent(b, e, v[e]);
                    o = a.delegatedEvent(l);
                    for (var e in w) {
                        var g = w[e];
                        for (var h in g)
                            o.add(h, e, g[h])
                    }
                },
                show: function() {
                    p = r.get(b.value);
                    var a = b.value.split("@")
                      , c = a[0]
                      , d = a[1];
                    j.autoTrim && (c = c.replace(/^\s+/g, ""));
                    if (p && p[0] && r.checkFormat(c, j.autoCase)) {
                        if (p.length == 1 && d == p[0])
                            return;
                        t.refresh(c, d, p);
                        t.show()
                    } else
                        t.hide()
                },
                hide: function() {
                    t.hide()
                },
                destroy: function() {
                    for (var c in v)
                        a.removeEvent(b, c, v[c]);
                    a.custEvent.undefine(n, f);
                    o.destroy();
                    n.destroy()
                },
                onShown: t.onShown,
                onActive: function() {
                    return t.onShown() && t.hasCurrent()
                }
            };
            x.init();
            var y = {};
            y.show = x.show;
            y.hide = x.hide;
            y.onShown = x.onShown;
            y.onActive = x.onActive;
            y.destroy = x.destroy;
            return y
        }
    });
    STK.register("common.extra.inputMonitor", function(a) {
        var b = {
            m: 100,
            s: 1e3,
            f: 5e3
        };
        return function(c, d) {
            var e, f, g = {}, h = {}, i = !1, j = {
                init: function() {
                    j.parseParam();
                    j.bind()
                },
                parseParam: function() {
                    d = a.parseParam(b, d || {})
                },
                bind: function() {
                    a.custEvent.define(h, ["change"]);
                    a.addEvent(c, "focus", j.start);
                    a.addEvent(c, "blur", j.stop)
                },
                start: function() {
                    g.f && clearTimeout(g.f);
                    !g.m && (g.m = setInterval(j.check, d.m))
                },
                stop: function() {
                    g.f && clearTimeout(g.f);
                    g.f = setTimeout(function() {
                        if (g.m) {
                            clearInterval(g.m);
                            g.m = null
                        }
                    }, d.f)
                },
                check: function() {
                    e = c.value;
                    if (!j.isSame(e)) {
                        if (!i) {
                            i = !0;
                            a.custEvent.fire(h, "change")
                        }
                        f = e;
                        j.inputing()
                    }
                },
                inputing: function() {
                    g.s && clearTimeout(g.s);
                    g.s = setTimeout(function() {
                        i = !1
                    }, d.s)
                },
                isSame: function(a) {
                    return a === f
                },
                destroy: function() {
                    for (var b in g)
                        g[b] && clearTimeout(g[b]);
                    a.removeEvent(c, "focus", j.start);
                    a.removeEvent(c, "blur", j.stop);
                    a.custEvent.undefine(h);
                    f = g = d = e = h = j = null
                }
            };
            j.init();
            h.destroy = j.destroy;
            return h
        }
    });
    STK.register("v6.lib.kit.extra.orderStr", function(a) {
        return function(a, b) {
            if (!a || !b)
                throw "orderStr error!";
            typeof a != "string" && (a = a + "");
            typeof b != "string" && (b = b + "");
            var c = a.charCodeAt(0)
              , d = b.charCodeAt(0)
              , e = c > d;
            if (e) {
                var f = c;
                c = d;
                d = f
            }
            var g = [];
            for (var h = c; h <= d; h++)
                g.push(String.fromCharCode(h));
            e && g.reverse();
            return g.join("")
        }
    });
    STK.register("v6.pub.form.rule", function(a) {
        var b = a.v6.lib.kit.extra.orderStr
          , c = {};
        c.isEmpty = function(a) {
            return /^\s*$/g.test(a.replace(/^\s+|\s+$/g, ""))
        }
        ;
        c.isNumber = function(a) {
            return /^[+\-]?\d+(\.\d+)?$/.test(a)
        }
        ;
        c.isName = function(a) {
            return /^[0-9a-zA-Z\u4e00-\u9fa5_-]+$/.test(a)
        }
        ;
        c.isRealName = function(a) {
            return /^[\u4e00-\u9fa5]{2,6}$/.test(a) ? !0 : /^[a-zA-Z]{2,20}$/.test(a) ? !0 : /[a-zA-Z0-9\u3000|\s|\t|\uff00-\uffff～！@#￥%……&×（）——『』【】、。‘“《》\?\~\!\@\#\$\%\^\&\*\\\+\`\=\[\]\(\)\{\}\|\;\'\:\"\,\/\<\>]+/.test(a) ? !1 : !0
        }
        ;
        c.isCompany = function(a) {
            return /^[^"'<>]+$/.test(a)
        }
        ;
        c.isChinese = function(a) {
            return /[\u4e00-\u9fa5]+$/.test(a)
        }
        ;
        c.isCName = function(a) {
            return /^[\u4e00-\u9fa5]+[\u00b7\.]?[\u4e00-\u9fa5]+$/.test(a)
        }
        ;
        c.isEmail = function(a) {
            if (!/^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/.test(a))
                return !1;
            if (a && a != "" && a.indexOf("@") != -1) {
                var b = a.indexOf("@")
                  , c = a.substring(0, b);
                return c.length > 64 || a.length > 256 ? !1 : !0
            }
            return !1
        }
        ;
        c.isYahoo = function(a) {
            return /^.*@((yahoo\.com\.cn)||(yahoo\.cn))$/.test(a)
        }
        ;
        c.isEmailName = function(a) {
            return /^[0-9a-z_][_.0-9a-z-]{0,31}$/.test(a)
        }
        ;
        c.isIDNumber = function(a) {
            return /^[\d]{15}$/.test(a) || /^[\d]{17}([Xx\d]{1}$)$/.test(a)
        }
        ;
        c.isMobile = function(a) {
            return /^1[3|4|5|7|8][0-9]{9}$/.test(a)
        }
        ;
        c.isWeird = function(a) {
            return !/^[0-9a-zA-Z~!@#$%^&*()_+`\-={}|\[\]\\\:\";'<\>?,.\/]+$/i.test(a)
        }
        ;
        c.isPassportID = function(a) {
            return /^[a-zA-Z0-9]{8,20}$/.test(a)
        }
        ;
        c.isAbroadName = function(a) {
            return /^[a-zA-Z\u4e00-\u9fa5]+([\u00b7\.\- ]?[a-zA-Z\u4e00-\u9fa5]+)*$/.test(a)
        }
        ;
        c.lenLimit = function(b, c, d) {
            var e = a.bLength(b);
            return !(e < c || e > d)
        }
        ;
        c.isUrl = function(a) {
            return /^http:\/\/([\w-]+(\.[\w-]+)+(\/[\w-   .\/\?%@&+=\u4e00-\u9fa5]*)?)?$/i.test(a)
        }
        ;
        c.turnBoolean = function(a) {
            switch (typeof a) {
            case "boolean":
                return a;
            case "number":
                return !!a;
            case "string":
                return a == "true" || a == "1"
            }
        }
        ;
        c.reNullChar = function(a) {
            return a.replace(/^\s+|\s+$/g, "")
        }
        ;
        var d = [b("a", "z"), b("z", "a"), b("0", "9"), b("9", "0")];
        c.isOrder = function(a) {
            return a && a.length && a.length > 1 && function() {
                for (var b = 0; b < d.length; b++)
                    if (d[b].indexOf(a) >= 0)
                        return !0;
                return !1
            }()
        }
        ;
        c.isWeakPasswd = function(b) {
            var d = ["000000", "111111", "11111111", "112233", "123123", "123321", "123456", "12345678", "654321", "666666", "888888", "abcdef", "abcabc", "abc123", "a1b2c3", "aaa111", "123qwe", "qwerty", "qweasd", "admin", "password", "p@ssword", "passwd", "iloveyou", "5201314"];
            if (a.inArray(b, d))
                return !0;
            if (/^([a-zA-Z0-9])\1+$/.test(b))
                return !0;
            if (c.isOrder(b))
                return !0;
            if (/^([a-zA-Z]+)([0-9]+)$/.test(b) || /^([0-9]+)([a-zA-Z]+)$/.test(b)) {
                var e = RegExp.$1
                  , f = RegExp.$2;
                if (c.isOrder(e) && c.isOrder(f))
                    return !0
            }
            return !1
        }
        ;
        c.isStrongPasswd = function(a) {
            var b = a.match(/[a-z]/ig)
              , c = a.match(/[0-9]/ig)
              , d = a.match(/([^a-z0-9])/ig);
            if (b && c && d)
                return !0;
            if (b && c)
                return b.length + c.length >= 11;
            if (b && d)
                return b.length + d.length >= 11;
            if (c && d)
                return c.length + d.length >= 11
        }
        ;
        c.isMobileSea = function(a, b) {
            switch (b) {
            case "0086":
                return c.isMobile(a);
            case "00852":
                return /^[569]\d{7}$/.test(a);
            case "00853":
                return /^6\d{7}$/.test(a);
            case "00886":
                return /^9\d{8}$/.test(a);
            case "001":
                return /^\d{10}$/.test(a);
            case "0060":
                return /^1\d{8,9}$/.test(a);
            case "0061":
                return /^4\d{8}$/.test(a);
            case "0081":
                return /^[789]0\d{8}$/.test(a);
            case "0082":
                return /^1[016789]\d{8}$/.test(a);
            case "0065":
                return /^[89]\d{7}$/.test(a);
            case "0044":
                return /^(7[45789]\d{8})|7624\d{6}$/.test(a);
            case "0033":
                return /^((6\d{8})|(7[345678]\d{7}))$/.test(a);
            case "007":
                return /^((90[12345689]\d{7})|(9[1236]\d{8})|(95[0123]\d{7}))$/.test(a);
            case "0091":
                return /^[987]\d{9}$/.test(a);
            case "0066":
                return /^0[986]\d{8}$/.test(a);
            case "0049":
                return /^(15[12579]\d{7}|16[023]\d{7}|160\d{8}|17[012345789]\d{7}|176\d{8}|700\d{8})$/.test(a);
            case "0055":
                return /^(\d{2}[6789]\d{7,8})$/.test(a);
            default:
                return !0
            }
        }
        ;
        return c
    });
    STK.register("v6.pub.form.textCopy", function(a) {
        var b = a.v6.pub.form.rule
          , c = a.core.dom.uniqueID
          , d = {
            text: "text"
        }
          , e = function(a) {
            var b = [];
            for (var c in a)
                b.push(a[c]);
            return b
        };
        return function(e, f) {
            var g, h = {
                blur: function(b) {
                    var c = a.fixEvent(b).target;
                    i.text.reset(c);
                    a.custEvent.fire(o, "blur", {
                        type: options.actionType,
                        el: c
                    });
                    var d = c.getAttribute("no_cls");
                    d != "true" && a.removeClassName(c, options.focusCS)
                },
                focus: function(b) {
                    var c = a.fixEvent(b).target;
                    i.text.place(c);
                    a.custEvent.fire(o, "focus", {
                        type: options.actionType,
                        el: c
                    });
                    var d = c.getAttribute("no_cls");
                    d != "true" && a.addClassName(c, options.focusCS)
                },
                keyup: function(b) {
                    var c = a.fixEvent(b).target;
                    a.custEvent.fire(o, "keyup", {
                        type: options.actionType,
                        el: c
                    })
                }
            }, i = {
                text: {
                    place: function(a) {
                        a.value && a.value.replace(/^\s+|\s+$/g, "") == k[c(a)].data[d.text] && (a.value = "")
                    },
                    reset: function(a) {
                        b.isEmpty(a.value) && (a.value = k[c(a)].data[d.text] || "")
                    }
                }
            }, j = function(a) {
                m.buildItem(a);
                m.active(a.el)
            }, k = {}, l = {
                click: j,
                focusin: j
            }, m = {
                init: function() {
                    m.parseParam();
                    m.bind()
                },
                parseParam: function() {
                    options = a.parseParam({
                        actionType: "text_copy",
                        focusCS: "W_input_focus"
                    }, f);
                    d = a.parseParam(d, f)
                },
                bind: function() {
                    g = a.core.evt.delegatedEvent(e);
                    for (var b in l)
                        g.add(options.actionType, b, l[b])
                },
                destroy: function() {
                    g.destroy();
                    for (var b in k)
                        for (var c in h)
                            a.removeEvent(b.el, c, h[c])
                },
                buildItem: function(b) {
                    var e = c(b.el);
                    if (!k[e]) {
                        k[e] = {
                            el: b.el || "",
                            data: {}
                        };
                        for (var f in d)
                            k[e].data[d[f]] = b.data[d[f]] || "";
                        for (var g in h)
                            a.addEvent(b.el, g, h[g])
                    }
                },
                active: function(b) {
                    i.text.place(b);
                    a.custEvent.fire(o, "focus", {
                        type: options.actionType,
                        el: b
                    });
                    var c = b.getAttribute("no_cls");
                    c != "true" && a.addClassName(b, options.focusCS)
                }
            }, n = {
                isCopyText: function(b) {
                    var c = b.getAttribute("action-type")
                      , d = a.queryToJson(b.getAttribute("action-data"));
                    return b.value.replace(/^\s+|\s+$/g, "") == (d[c].replace(/^\s+|\s+$/g, "") || "")
                },
                build: m.buildItem
            };
            m.init();
            var o = {};
            o.API = n;
            o.destroy = m.destroy;
            return o
        }
    });
    STK.register("common.setting.form", function(a) {
        var b = ["input", "textarea", "select", "a", "div", "ul", "li", "em"];
        return function(c, d) {
            var e = {}, f, g = "form", h = {
                ctls: {},
                states: {}
            }, i = {
                reset: function(a) {
                    for (var b in a)
                        h.states[b] = a[b]
                }
            }, j = {
                init: function() {
                    j.pars();
                    j.build();
                    j.bind()
                },
                pars: function() {
                    if (!c)
                        throw "from is undefined";
                    f = a.parseParam({
                        proxy: null
                    }, d)
                },
                build: function() {
                    e.domList = a.builder(c).list
                },
                bind: function() {
                    a.custEvent.define(e, ["reset"]);
                    a.custEvent.add(e, "reset", i.reset)
                },
                add: function(a, b) {
                    h.ctls[a] = b
                },
                getData: function() {
                    var d = {};
                    for (var e in h.ctls) {
                        var f = h.ctls[e];
                        d[f.name()] = f.value()
                    }
                    return a.parseParam(a.htmlToJson(c, b), d)
                },
                check: function(a) {
                    if (a) {
                        var b = h.ctls[a];
                        h.states[a] = b.check();
                        return h.states[a].type
                    }
                    var c = !0;
                    for (var d in h.ctls) {
                        var b = h.ctls[d];
                        b.pars.iorecords ? h.states[d] = b.msg : h.states[d] = b.check();
                        c = c && h.states[d].state
                    }
                    return c
                },
                reset: function() {
                    for (var a in h.ctls)
                        h.states[a].reset()
                },
                states: function() {
                    for (var a in h.ctls)
                        h.states[a] = h.ctls[a].msg;
                    return h.states
                },
                destroy: function() {
                    for (var a in h.ctls)
                        h.ctls[a].destroy()
                }
            };
            j.init();
            e.ctls = function() {
                return h.ctls
            }();
            e.states = j.states;
            e.add = j.add;
            e.getData = j.getData;
            e.check = j.check;
            e.reset = j.reset;
            e.destroy = j.destroy;
            return e
        }
    });
    STK.register("common.setting.base", function(a) {
        return function() {
            var b = {};
            b.frame = ["id", "preInit", "init", "initPars", "build", "bind", "errText", "setMust", "setMsg", "disabled", "check", "name", "value", "reset", "fire", "destroy"];
            for (var c in b.frame)
                b[b.frame[c]] = a.core.func.empty;
            return b
        }
    });
    STK.register("common.setting.dataType", function(a) {
        var b = a.kit.extra.language
          , c = {
            msg: {
                id: "",
                state: !0,
                type: "empty",
                code: "",
                action: "",
                msg: "",
                iodata: null,
                iorecords: !1
            },
            initPars: {
                text: "",
                hook: null,
                type: "",
                proxy: null,
                iokey: null,
                disabled: !1,
                iodelay: 0,
                must: !0,
                auto: !0
            },
            errText: {
                E00: b("#L{系统繁忙}")
            }
        }
          , d = {};
        d.get = function(b) {
            return a.core.json.clone(c[b]) || {}
        }
        ;
        return d
    });
    STK.register("kit.extra.orderStr", function(a) {
        return function(a, b) {
            if (!a || !b)
                throw "orderStr error!";
            typeof a != "string" && (a = a + "");
            typeof b != "string" && (b = b + "");
            var c = a.charCodeAt(0)
              , d = b.charCodeAt(0)
              , e = c > d;
            if (e) {
                var f = c;
                c = d;
                d = f
            }
            var g = [];
            for (var h = c; h <= d; h++)
                g.push(String.fromCharCode(h));
            e && g.reverse();
            return g.join("")
        }
    });
    STK.register("common.setting.rule", function(a) {
        var b = a.kit.extra.orderStr
          , c = {};
        c.isEmpty = function(a) {
            return /^\s*$/g.test(a.replace(/^\s+|\s+$/g, ""))
        }
        ;
        c.isNumber = function(a) {
            return /^[+\-]?\d+(\.\d+)?$/.test(a)
        }
        ;
        c.isName = function(a) {
            return /^[0-9a-zA-Z\u4e00-\u9fa5_-]+$/.test(a)
        }
        ;
        c.isRealName = function(a) {
            return /^[\u4e00-\u9fa5]{2,6}$/.test(a) ? !0 : /^[a-zA-Z]{2,20}$/.test(a) ? !0 : /[a-zA-Z0-9\u3000|\s|\t|\uff00-\uffff～！@#￥%……&×（）——『』【】、。‘“《》\?\~\!\@\#\$\%\^\&\*\\\+\`\=\[\]\(\)\{\}\|\;\'\:\"\,\/\<\>]+/.test(a) ? !1 : !0
        }
        ;
        c.isCompany = function(a) {
            return /^[^"'<>]+$/.test(a)
        }
        ;
        c.isChinese = function(a) {
            return /[\u4e00-\u9fa5]+$/.test(a)
        }
        ;
        c.isCName = function(a) {
            return /^[\u4e00-\u9fa5]+[\u00b7\.]?[\u4e00-\u9fa5]+$/.test(a)
        }
        ;
        c.isEmail = function(a) {
            if (!/^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/.test(a))
                return !1;
            if (a && a != "" && a.indexOf("@") != -1) {
                var b = a.indexOf("@")
                  , c = a.substring(0, b);
                return c.length > 64 || a.length > 256 ? !1 : !0
            }
            return !1
        }
        ;
        c.isYahoo = function(a) {
            return /^.*@((yahoo\.com\.cn)||(yahoo\.cn))$/.test(a)
        }
        ;
        c.isEmailName = function(a) {
            return /^[0-9a-z_][_.0-9a-z-]{0,31}$/.test(a)
        }
        ;
        c.isIDNumber = function(a) {
            return /^[\d]{15}$/.test(a) || /^[\d]{17}([Xx\d]{1}$)$/.test(a)
        }
        ;
        c.isMobile = function(a) {
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(a)
        }
        ;
        c.isWeird = function(a) {
            return !/^[0-9a-zA-Z~!@#$%^&*()_+`\-={}|\[\]\\\:\";'<\>?,.\/]+$/i.test(a)
        }
        ;
        c.isPassportID = function(a) {
            return /^[a-zA-Z0-9]{8,20}$/.test(a)
        }
        ;
        c.isAbroadName = function(a) {
            return /^[a-zA-Z\u4e00-\u9fa5]+([\u00b7\.\- ]?[a-zA-Z\u4e00-\u9fa5]+)*$/.test(a)
        }
        ;
        c.lenLimit = function(b, c, d) {
            var e = a.bLength(b);
            return !(e < c || e > d)
        }
        ;
        c.isUrl = function(a) {
            return /^http:\/\/([\w-]+(\.[\w-]+)+(\/[\w-   .\/\?%@&+=\u4e00-\u9fa5]*)?)?$/i.test(a)
        }
        ;
        c.turnBoolean = function(a) {
            switch (typeof a) {
            case "boolean":
                return a;
            case "number":
                return !!a;
            case "string":
                return a == "true" || a == "1"
            }
        }
        ;
        c.reNullChar = function(a) {
            return a.replace(/^\s+|\s+$/g, "")
        }
        ;
        var d = [b("a", "z"), b("z", "a"), b("0", "9"), b("9", "0")];
        c.isOrder = function(a) {
            return a && a.length && a.length > 1 && function() {
                for (var b = 0; b < d.length; b++)
                    if (d[b].indexOf(a) >= 0)
                        return !0;
                return !1
            }()
        }
        ;
        c.isWeakPasswd = function(b) {
            var d = ["000000", "111111", "11111111", "112233", "123123", "123321", "123456", "12345678", "654321", "666666", "888888", "abcdef", "abcabc", "abc123", "a1b2c3", "aaa111", "123qwe", "qwerty", "qweasd", "admin", "password", "p@ssword", "passwd", "iloveyou", "5201314"];
            if (a.inArray(b, d))
                return !0;
            if (/^([a-zA-Z0-9])\1+$/.test(b))
                return !0;
            if (c.isOrder(b))
                return !0;
            if (/^([a-zA-Z]+)([0-9]+)$/.test(b) || /^([0-9]+)([a-zA-Z]+)$/.test(b)) {
                var e = RegExp.$1
                  , f = RegExp.$2;
                if (c.isOrder(e) && c.isOrder(f))
                    return !0
            }
            return !1
        }
        ;
        c.isStrongPasswd = function(a) {
            var b = a.match(/[a-z]/ig)
              , c = a.match(/[0-9]/ig)
              , d = a.match(/([^a-z0-9])/ig);
            if (b && c && d)
                return !0;
            if (b && c)
                return b.length + c.length >= 11;
            if (b && d)
                return b.length + d.length >= 11;
            if (c && d)
                return c.length + d.length >= 11
        }
        ;
        c.isMobileSea = function(a, b) {
            switch (b) {
            case "0086":
                return c.isMobile(a);
            case "00852":
                return /^[569]\d{7}$/.test(a);
            case "00853":
                return /^6\d{7}$/.test(a);
            case "00886":
                return /^9\d{8}$/.test(a);
            case "001":
                return /^\d{10}$/.test(a);
            case "0060":
                return /^1\d{8,9}$/.test(a);
            case "0061":
                return /^4\d{8}$/.test(a);
            case "0081":
                return /^[789]0\d{8}$/.test(a);
            case "0082":
                return /^1[016789]\d{8}$/.test(a);
            case "0065":
                return /^[89]\d{7}$/.test(a);
            case "0044":
                return /^(7[45789]\d{8})|7624\d{6}$/.test(a);
            case "0033":
                return /^((6\d{8})|(7[345678]\d{7}))$/.test(a);
            case "007":
                return /^((90[12345689]\d{7})|(9[1236]\d{8})|(95[0123]\d{7}))$/.test(a);
            case "0091":
                return /^[987]\d{9}$/.test(a);
            case "0066":
                return /^0[986]\d{8}$/.test(a);
            case "0049":
                return /^(15[12579]\d{7}|16[023]\d{7}|160\d{8}|17[012345789]\d{7}|176\d{8}|700\d{8})$/.test(a);
            case "0055":
                return /^(\d{2}[6789]\d{7,8})$/.test(a);
            case "0062":
                return /^(8\d{8,10})$/.test(a);
            case "00855":
                return /^([19]\d{7,9})$/.test(a);
            case "0095":
                return /^((9\d{7,9})|((64|69|80)\d{6,8}))$/.test(a);
            case "00673":
                return /^((85|86|87|88)\d{5,6})$/.test(a);
            case "0063":
                return /^(9\d{9})$/.test(a);
            case "0084":
                return /^(9\d{8,9})$/.test(a);
            case "00856":
                return /^(20\d{7,8})$/.test(a);
            case "0039":
                return /^(3\d{8,9})$/.test(a);
            case "0034":
                return /^([67]\d{8})$/.test(a);
            default:
                return !0
            }
        }
        ;
        return c
    });
    STK.register("common.setting.control", function(a) {
        return function(b, c, d) {
            var e = a.common.setting.base();
            e.preInit = function() {
                e.id = a.core.dom.uniqueID(b);
                e.dataType = a.common.setting.dataType;
                e.rule = a.common.setting.rule;
                e.pars = a.parseParam(e.dataType.get("initPars"), c)
            }
            ;
            e.init = function() {
                e.initPars();
                e.build();
                e.bind()
            }
            ;
            e.initPars = function() {
                e.check();
                e.msg.msg = e.errText[e.msg.code] || "";
                e.msg.action = "init";
                e.cache_value = null;
                e.old_value = e.value();
                var a = ["must", "disabled"];
                for (var b = 0, c = a.length; b < c; b++) {
                    var d = a[b];
                    e.pars[d] = e.rule.turnBoolean(e.pars[d])
                }
            }
            ;
            e.build = function() {
                e.rule.isEmpty(b.defaultValue) && (e.pars.text ? b.value = e.pars.text : b.value = "");
                e.pars.disabled && e.disabled(e.pars.disabled);
                e.node = b
            }
            ;
            e.bind = function() {
                for (var c in d.evtAct)
                    a.addEvent(b, c, d.evtAct[c]);
                if (e.pars.iokey) {
                    var f = function() {
                        e.pars.iorecords = !1
                    };
                    a.addEvent(b, "change", f)
                }
            }
            ;
            e.check = function() {
                e.msg = e.dataType.get("msg");
                e.msg.id = e.id;
                e.msg.action = "check";
                if (e.pars.disabled) {
                    e.msg.state = !0;
                    e.msg.type = "empty";
                    e.msg.code = "E01"
                } else
                    d.check && d.check();
                e.msg.msg = e.errText[e.msg.code];
                return e.msg
            }
            ;
            e.setMust = function(a) {
                a = e.rule.turnBoolean(a);
                a != undefined && (e.pars.disabled = a)
            }
            ;
            e.setMsg = function(b) {
                e.pars.iokey && (e.pars.iorecords = !1);
                e.msg = a.parseParam(e.dataType.get("msg"), b)
            }
            ;
            e.fire = function() {
                e.errText[e.msg.code] && (e.msg.msg = e.errText[e.msg.code]);
                var b = {};
                b[e.type] = e.msg;
                e.pars.hook && a.custEvent.fire(e.pars.hook, "check", b)
            }
            ;
            e.disabled = function(a) {
                a = e.rule.turnBoolean(a);
                if (a != undefined) {
                    e.pars.disabled = a;
                    a ? b.disabled = !0 : b.disabled = !1
                }
            }
            ;
            e.name = function() {
                return b.getAttribute("name") || e.id
            }
            ;
            e.value = function(a) {
                if (typeof a != "undefined")
                    b.value = a;
                else
                    return b.value === e.pars.text ? "" : b.value.replace(/^\s+|\s+$/g, "")
            }
            ;
            e.reset = function(b) {
                e.value(e.old_value);
                e.pars = a.parseParam(e.dataType.get("initPars"), c);
                e.check();
                e.msg.action = "reset";
                !b && e.fire()
            }
            ;
            e.destroy = function() {
                for (var c in d.evtAct)
                    a.removeEvent(b, c, d.evtAct[c])
            }
            ;
            e.preInit();
            return e
        }
    });
    STK.register("common.setting.verifycode", function(a) {
        var b = {
            E01: "",
            E02: "#L{请输入验证码}",
            E03: "#L{验证码输入有误}"
        };
        return function(c, d) {
            var e = function() {
                var a = g.value().replace(/^\s+|\s+$/g, "")
                  , b = !1;
                if (!g.pars.must && g.rule.isEmpty(a)) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else {
                    if (!b && g.rule.isEmpty(a)) {
                        b = !0;
                        g.msg.type = "empty";
                        g.msg.code = "E02"
                    }
                    if (!b && !g.rule.lenLimit(a, 1, 6)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E03"
                    }
                    if (!b) {
                        g.msg.state = !0;
                        g.msg.type = "empty";
                        g.msg.code = "E01"
                    } else
                        g.msg.state = !1
                }
            }
              , f = {
                focus: function() {
                    g.cache_value = g.value();
                    if (g.rule.isEmpty(g.cache_value)) {
                        g.msg.state = !1;
                        g.msg.action = "focus";
                        g.msg.type = "tip";
                        g.msg.code = "E02";
                        g.fire()
                    }
                },
                blur: function() {
                    c.value = g.rule.reNullChar(c.value);
                    g.msg.action = "focus";
                    e();
                    g.fire()
                }
            }
              , g = a.common.setting.control(c, d, {
                evtAct: f,
                check: e
            })
              , h = a.core.obj.sup(g, ["initPars"]);
            g.initPars = function() {
                h.initPars();
                g.errText = a.common.extra.parseLanguage(b);
                g.type = "verifycode"
            }
            ;
            g.pars.auto && g.init();
            return g
        }
    });
    STK.register("common.setting.vsncode", function(a) {
        var b = {
            E01: "",
            E02: "#L{请输入微盾动态码}",
            E03: "#L{动态码有误，请重新输入}"
        };
        return function(c, d) {
            var e = function() {
                var a = g.value().replace(/^\s+|\s+$/g, "")
                  , b = !1;
                if (!g.pars.must && g.rule.isEmpty(a)) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E02"
                } else {
                    if (!b && g.rule.isEmpty(a)) {
                        b = !0;
                        g.msg.type = "empty";
                        g.msg.code = "E02"
                    }
                    if (!b && !g.rule.lenLimit(a, 1, 6)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E03"
                    }
                    if (!b) {
                        g.msg.state = !0;
                        g.msg.type = "empty";
                        g.msg.code = "E01"
                    } else
                        g.msg.state = !1
                }
            }
              , f = {
                focus: function() {
                    g.cache_value = g.value();
                    if (g.rule.isEmpty(g.cache_value)) {
                        g.msg.state = !1;
                        g.msg.action = "focus";
                        g.msg.type = "tip";
                        g.msg.code = "E02";
                        g.fire()
                    }
                },
                blur: function() {
                    c.value = g.rule.reNullChar(c.value);
                    g.msg.action = "blur";
                    e();
                    g.fire()
                }
            }
              , g = a.common.setting.control(c, d, {
                evtAct: f,
                check: e
            })
              , h = a.core.obj.sup(g, ["initPars"]);
            g.initPars = function() {
                h.initPars();
                g.errText = a.common.extra.parseLanguage(b);
                g.type = "vsncode"
            }
            ;
            g.pars.auto && g.init();
            return g
        }
    });
    STK.register("common.setting.username", function(a) {
        var b = {
            E01: "",
            E02: "#L{请输入登录名}",
            E03: "#L{请输入正确的登录名}"
        };
        return function(c, d) {
            var e, f = function() {
                var a = h.value()
                  , b = !1;
                if (!h.pars.must && h.rule.isEmpty(a)) {
                    h.msg.state = !0;
                    h.msg.type = "empty";
                    h.msg.code = "E01"
                } else {
                    if (!b && h.rule.isEmpty(a)) {
                        b = !0;
                        h.msg.type = "empty";
                        h.msg.code = "E02"
                    }
                    if (!b && !h.rule.lenLimit(a, 1, 128)) {
                        b = !0;
                        h.msg.type = "err";
                        h.msg.code = "E03"
                    }
                    if (!b) {
                        h.msg.state = !0;
                        h.msg.type = "ok";
                        h.msg.code = "E01"
                    } else
                        h.msg.state = !1
                }
            }, g = {}, h = a.common.setting.control(c, d, {
                evtAct: g,
                check: f
            }), i = a.core.obj.sup(h, ["initPars"]);
            h.initPars = function() {
                i.initPars();
                h.errText = a.common.extra.parseLanguage(b);
                h.type = "username"
            }
            ;
            h.pars.auto && h.init();
            return h
        }
    });
    STK.register("common.setting.passwordlite", function(a) {
        var b = {
            E01: "",
            E02: "#L{请输入密码}",
            E03: "#L{请输入正确的密码}"
        }, c;
        return function(d, e) {
            var f = function() {
                var a = j.value()
                  , b = !1;
                if (!j.pars.must && j.rule.isEmpty(a)) {
                    j.msg.state = !0;
                    j.msg.type = "empty";
                    j.msg.code = "E01"
                } else {
                    if (!b && j.rule.isEmpty(a)) {
                        b = !0;
                        j.msg.type = "empty";
                        j.msg.code = "E02"
                    }
                    if (!b && !j.rule.lenLimit(a, 1, 24)) {
                        b = !0;
                        j.msg.type = "err";
                        j.msg.code = "E03"
                    }
                    if (!b) {
                        j.msg.state = !0;
                        j.msg.type = "ok";
                        j.msg.code = "E01"
                    } else
                        j.msg.state = !1
                }
            }
              , g = a.core.dom.next(d)
              , h = {
                init: function() {
                    h.auto()
                },
                auto: function() {
                    j.rule.isEmpty(j.value()) ? h.show() : h.hide()
                },
                show: function() {
                    if (g) {
                        g.style.display = "";
                        a.addEvent(g, "click", function() {
                            d.focus();
                            a.removeEvent(g, "click", arguments.callee)
                        })
                    }
                },
                hide: function() {
                    g && (g.style.display = "none")
                }
            }
              , i = {
                focus: function() {
                    j.cache_value = j.value();
                    if (j.rule.isEmpty(j.cache_value)) {
                        j.msg.state = !1;
                        j.msg.action = "focus";
                        j.msg.type = "tip";
                        j.msg.code = "E02";
                        j.fire()
                    }
                    h.hide()
                },
                blur: function() {
                    c && clearTimeout(c);
                    d.value = j.rule.reNullChar(d.value);
                    j.msg.action = "blur";
                    f();
                    j.fire();
                    h.auto()
                }
            }
              , j = a.common.setting.control(d, e, {
                evtAct: i,
                check: f
            })
              , k = a.core.obj.sup(j, ["initPars"]);
            j.initPars = function() {
                k.initPars();
                j.errText = a.common.extra.parseLanguage(b);
                j.type = "password"
            }
            ;
            j.pars.auto && j.init();
            h.init();
            return j
        }
    });
    STK.register("v6.pub.form.verifycodeSSO", function(a) {
        var b = a.v6.conf.channel.sso.login;
        return function(c) {
            var d = {
                init: function() {
                    if (!a.core.dom.isNode(c))
                        throw "Node of verify photo is necessary!";
                    d.bind();
                    b.fire("pincode")
                },
                bind: function() {
                    b.register("pincode.update", d.callback)
                },
                callback: function(a) {
                    c.src = a;
                    d.destroy()
                },
                destroy: function() {
                    b.remove("pincode.update", d.callback)
                }
            };
            d.init();
            return {}
        }
    });
    STK.register("common.form.ssoErrCode", function(a) {
        var b = window.top == window.self;
        return {
            4038: '#L{登录次数过于频繁，}<a href="http://help.weibo.com/faq/q/85/12699#12699" target="_blank">#L{查看帮助}</a>',
            4049: "#L{请填写验证码}",
            4010: '#L{帐号尚未激活。}<a target="_blank" href="http://weibo.com/signup/v5/resend?username=#{USERNAME}">#L{重发激活邮件}</a>',
            4090: "#L{此帐号未激活，请登录原帐号}",
            5024: "#L{请填写正确的微盾动态码}",
            5025: "#L{动态码有误，请重新输入}",
            5: '#L{尚未注册微博，}<a href="http://weibo.com/logout.php?backurl=' + encodeURIComponent("//weibo.com/signup/signup.php") + '"' + (b ? "" : ' target="_blank"') + ">#L{马上注册}</a>",
            101: '#L{用户名或密码错误。}<a href="http://help.weibo.com/faq/q/85/12606#12606" target="_blank">#L{查看帮助}</a>',
            4098: '#L{您的帐号还没有设置密码，为方便登录请}<a href="https://login.sina.com.cn/getpass.html?entry=weibo" target="_blank">#L{重置密码}</a>',
            9999: "#L{当前网络超时，请稍后再试}",
            2071: "#L{您已开启登录保护，请扫码登录}"
        }
    });
    STK.register("v6.pub.login.form", function(a) {
        var b = ["username", "password", "verifycode", "vsncode"], c = a.core.util.templet, d = a.v6.conf.channel.sso.login, e = a.v6.pub.form.verifycodeSSO, f = a.core.evt.hotKey, g = a.kit.extra.textareaUtils, h = $CONFIG && $CONFIG.register_url || "//weibo.com/signup/signup.php" + (Boolean(a.URL(window.location.href).getParam("c")) ? "?backurl=" + encodeURI(window.location.href) : ""), i = {
            CAPSLOCK: "#L{键盘大写锁定已打开，请注意}",
            ERRTIP: {
                CODE: a.common.form.ssoErrCode
            },
            SAVE_STATE_LAYER: '<div class="layer_pop" node-type="outer" style="position:absolute;"><p node-type="content"></p></div>',
            MAIN: '<div node-type="prename_box" class="info_list pre_info clearfix"></div><div node-type="username_box" class="info_list"><div class="inp username"><input autocomplete="off" maxlength="128" tabindex="1" node-type="username" name="username" type="text" class="W_input" action-type="text_copy" action-data="text=#L{邮箱/会员帐号/手机号}" value="" /></div></div><div node-type="password_box" class="info_list"><div class="inp password"><input maxlength="24" tabindex="2" node-type="password" name="password" type="password" class="W_input" action-type="text_copy" value="" /><span class="enter_psw">#L{请输入密码}</span></div></div><div node-type="verifycode_box" class="info_list" style="display: none;"><div class="inp verify"><input maxlength="6" tabindex="3" node-type="verifycode" name="verifycode" type="text" class="W_input" value="" action-type="text_copy" action-data="text=#L{验证码}" /><a class="code" href="javascript:void(0);" onclick="return false;"><img src="" node-type="verifycode_image" action-type="btn_change_verifycode" width="100" height="40"></a><a node-type="btn_change_verifycode" action-type="btn_change_verifycode" class="verify_refresh" href="javascript:void(0);" onclick="return false;">#L{换一换}</a></div></div><div node-type="vsncode_box" class="info_list" style="display: none;"><div class="inp wei_dun"><input maxlength="6" tabindex="4" node-type="vsncode" name="vsncode" type="text" class="W_input" action-type="text_copy" action-data="text=#L{请输入微盾动态码}" value="" /><a node-type="btn_vsncode_recover" href="http://account.weibo.com/forgot/vdun">#L{微盾挂失}</a></div></div><div class="info_list"><div class="inp automatic clearfix"><div class="right"><a suda-data="key=tblog_weibologin3&value=click_forgetpwd" action-type="btn_password_recover" target="_blank" node-type="btn_password_recover" href="https://login.sina.com.cn/getpass.html?entry=weibo">#L{忘记密码}</a></div><label action-type="customTip" action-data="content=#L{建议在网吧或公共电脑上取消该选项。}" title="#L{建议在网吧或公共电脑上取消该选项。}" for="login_form_savestate"><input tabindex="5" id="login_form_savestate" checked="checked" node-type="savestate" type="checkbox" class="W_checkbox" />#L{下次自动登录}</label><a suda-data="key=tblog_weibologin3&value=click_help" action-type="customTip" action-data="content=#L{记不住登录状态，怎么办？}" title="#L{记不住登录状态，怎么办？}" target="_blank" class="icon_ask" href="http://help.weibo.com/faq/q/85/12524#12524"></a></div></div><div class="info_list no_reg"><a tabindex="6" suda-data="key=tblog_weibologin3&value=click_sign" node-type="submitBtn" action-type="btn_submit" class="W_btn_g" href="javascript:void(0)"><span node-type="submitStates">#L{登录}</span></a></div>',
            SUBMIT: {
                NORMAL: "<em>#L{登录}</em>",
                ONSUBMIT: '<i class="W_loading"></i><em>#L{登录}</em>'
            },
            PRENAME_BOX: '<div class="W_tips tips_warn clearfix" action-type="closeTip"><p class="icon"><span class="W_icon icon_warnS"></span></p><p class="txt">为了您的安全，请确认登录</p></div><div class="item user_card clearfix"><div class="img_wrap W_fl"><img width="50" height="50" class="W_face_radius" src="#{AVATAR}"></div><div class="account W_fl"><p class="account_name W_autocut S_txt1">#{LOGIN_NAME_HAZY}</p><a href="javascript:void(0)" action-type="use_username">#L{换个账号登录}</a></div></div>'
        }, j = {
            panel: ['<div node-type="layer" class="Bv6_layer_menu_list" style="display:none;">', '<ul><li class="note">#L{请选择邮箱类型}</li></ul>', '<ul node-type="panel"></ul>', "</div>"].join(""),
            item: ["<#et userlist data>", "<#list data.data as item>", '<li action-type="item" action-data="value=${data.key}@${item}" ><a href="#">${data.key}@${item}</a></li>', "</#list>", "</#et>"].join("")
        }, k = {
            username: a.common.setting.username,
            password: a.common.setting.passwordlite,
            verifycode: a.common.setting.verifycode,
            vsncode: a.common.setting.vsncode
        }, l = function() {
            var a, b = {
                save: function(b) {
                    a = b
                },
                load: function() {
                    return a
                },
                reset: function() {
                    b.save("")
                },
                cached: function(b) {
                    return a === b
                }
            };
            return b
        }(), m = {
            cookie: {
                name: "un",
                conf: {
                    expire: 240,
                    path: "/",
                    domain: window.location.hostname,
                    encode: !0
                }
            },
            verifyCodeDelay: 3e5,
            savestateDelay: 600,
            errtipDelay: 5e3
        }, n, o = function(b) {
            if (!n) {
                n = [];
                for (var c in i.ERRTIP.CODE)
                    n.push(c)
            }
            return a.inArray("" + b, n)
        };
        return function(f, h) {
            var n, p, q, r, s = {}, t, u, v, w = {
                yalogin: !1,
                nopwd: !1,
                unChecked: !1
            }, x = {
                init: function() {
                    x.parseParam();
                    x.parseDOM();
                    x.initPlugin();
                    x.bind()
                },
                initPlugin: function() {
                    y.init();
                    v = a.v6.pub.ui.tipAlert()
                },
                parseParam: function() {
                    h = h || {};
                    i = a.common.extra.parseLanguage(a.core.obj.parseParam(i, h.TEMP));
                    h = a.parseParam(m, h)
                },
                parseDOM: function() {
                    if (!a.core.dom.isNode(f))
                        throw "Login form node is necessary";
                    a.core.dom.isNode(a.kit.dom.firstChild(f)) || (f.innerHTML = i.MAIN)
                },
                bind: function() {
                    n = a.core.evt.delegatedEvent(f);
                    n.add("btn_submit", "click", y.submit.active);
                    n.add("btn_change_verifycode", "click", y.resetVerifycode);
                    n.add("use_username", "click", z.use_username);
                    n.add("btn_password_recover", "click", z.passwordRecover);
                    a.addEvent(q.username, "focus", z.stopCheckUsername);
                    a.addEvent(q.username, "blur", z.checkUsername);
                    a.addEvent(q.submitBtn, "focus", y.submit.focus);
                    a.addEvent(q.submitBtn, "blur", y.submit.blur);
                    a.foreach(p.ctls, function(b) {
                        b.pars.disabled || a.addEvent(b.node, "keydown", A.enter)
                    });
                    a.addEvent(q.submitBtn, "keydown", A.enter);
                    a.addEvent(q.password, "keypress", A.capslock);
                    a.custEvent.define(D, ["closeTip"]);
                    a.custEvent.add(D, "closeTip", y.errTip.hide);
                    d.register("verify.update", B.verify.update);
                    d.register("verify.failure", B.verify.failure);
                    d.register("verify.complete", B.verify.complete);
                    d.register("login.success", B.login.success);
                    d.register("login.failure", B.login.failure);
                    d.register("login.complete", B.login.complete);
                    d.register("logout.success", B.logout.success);
                    d.register("logout.failure", B.logout.failure);
                    d.register("logout.complete", B.logout.complete);
                    d.register("yalogin.active", B.yalogin.active);
                    d.register("yalogin.deny", B.yalogin.deny)
                },
                unbind: function() {
                    n.remove("btn_submit", "click", y.submit.active);
                    n.remove("btn_change_verifycode", "click", y.resetVerifycode);
                    n.remove("use_username", "click", z.use_username);
                    n.destroy();
                    a.removeEvent(q.username, "focus", z.stopCheckUsername);
                    a.removeEvent(q.username, "blur", z.checkUsername);
                    a.removeEvent(q.submitBtn, "focus", y.submit.focus);
                    a.removeEvent(q.submitBtn, "blur", y.submit.blur);
                    a.foreach(p.ctls, function(b) {
                        a.removeEvent(b.node, "keydown", A.enter)
                    });
                    a.removeEvent(q.submitBtn, "keydown", A.enter);
                    a.removeEvent(q.password, "keypress", A.capslock);
                    a.custEvent.remove(D, "closeTip", y.errTip.hide);
                    a.custEvent.undefine(D, ["closeTip"]);
                    d.remove("verify.update", B.verify.update);
                    d.remove("verify.failure", B.verify.failure);
                    d.remove("verify.complete", B.verify.complete);
                    d.remove("login.success", B.login.success);
                    d.remove("login.failure", B.login.failure);
                    d.remove("login.complete", B.login.complete);
                    d.remove("logout.success", B.logout.success);
                    d.remove("logout.failure", B.logout.failure);
                    d.remove("logout.complete", B.logout.complete);
                    d.remove("yalogin.active", B.yalogin.active);
                    d.remove("yalogin.deny", B.yalogin.deny)
                },
                destroy: function() {
                    x.unbind();
                    y.destroy();
                    v.destroy();
                    for (var a in s)
                        s[a] && clearTimeout(s[a]);
                    n = s = y = A = C = B = D = x = v = customTip = w = null
                }
            }, y = {
                init: function() {
                    r = a.v6.pub.form.textCopy(f);
                    a.custEvent.define(r, ["focus", "blur", "keyup"]);
                    a.custEvent.add(r, "focus", y.textCopyHandle);
                    a.custEvent.add(r, "blur", y.textCopyHandle);
                    p = a.common.setting.form(f);
                    q = a.kit.dom.parseDOM(p.domList);
                    var c;
                    for (var d in q)
                        a.inArray(d, b) && k[d] && y.item(d);
                    C.verifycode.disable();
                    C.vsncode.disable();
                    u = a.common.layer.emailAutocomplete(q.username, {
                        autoTrim: !0,
                        autoCase: !0,
                        offsetX: -35,
                        offsetY: 4,
                        width: a.core.dom.getSize(q.username.parentNode).width - 4,
                        template: j
                    });
                    t = a.common.extra.inputMonitor(q.username);
                    a.custEvent.add(t, "change", function() {
                        y.changeExtra();
                        l.reset();
                        w.nopwd = !1;
                        w.unChecked = !1
                    });
                    y.prenameBox()
                },
                item: function(b) {
                    _data = a.queryToJson(q[b].getAttribute("action-data") || "");
                    p.add(b, k[b](q[b], a.core.json.merge({
                        hook: p
                    }, _data)));
                    a.core.util.browser.MOZ && r.API.build({
                        el: q[b],
                        data: _data
                    })
                },
                textCopyHandle: function(b, c) {
                    b.type == "focus" && y.errTip.hide();
                    a.inArray(c.el, [q.username, q.password]) && (b.type == "focus" ? a.addClassName(c.el.parentNode, "W_input_focus") : b.type == "blur" && a.removeClassName(c.el.parentNode, "W_input_focus"))
                },
                getData: function() {
                    var a = p.states();
                    if (p.check()) {
                        var b = p.getData();
                        q.savestate.checked && (b.savestate = 7);
                        if (w.yalogin !== !1) {
                            b.username = "" + w.yalogin;
                            b.logintype = "sub"
                        }
                        return b
                    }
                    for (var c in C)
                        if (C[c].isVisible()) {
                            C[c].reset();
                            break
                        }
                    if (!a.password.state) {
                        w.unChecked || y.checkUsername();
                        if (w.nopwd) {
                            a.password.state = !0;
                            a.username.state = !1;
                            a.username.msg = i.ERRTIP.CODE[4098]
                        }
                    }
                    y.errTip.show(a, 1);
                    return !1
                },
                prenameBox: function() {
                    if (!q.prename_box)
                        y.usernameBox();
                    else if (a.isNode(a.kit.dom.firstChild(q.prename_box))) {
                        w.yalogin = q.preuid.value;
                        p.ctls.username.value(q.prename.value);
                        a.setStyle(q.prename_box, "display", "");
                        q.qq_box && a.setStyle(q.qq_box, "display", "none");
                        y.checkUsername()
                    } else
                        d.fire("yalogin.verify")
                },
                usernameBox: function() {
                    w.yalogin = !1;
                    q.prename_box && a.core.dom.removeNode(q.prename_box);
                    a.setStyle(q.username_box, "display", "");
                    q.qq_box && a.setStyle(q.qq_box, "display", "");
                    y.remember.place()
                },
                checkUsername: function() {
                    s.checkUsername && clearTimeout(s.checkUsername);
                    s.checkUsername = setTimeout(function() {
                        var a = p.ctls.username;
                        if (a.check().state) {
                            a.value(a.value());
                            var b = a.value();
                            if (!l.cached(b)) {
                                y.lock("username");
                                d.fire("verify.username", b);
                                l.save(b)
                            }
                        }
                    }, 200)
                },
                stopCheckUsername: function() {
                    s.checkUsername && clearTimeout(s.checkUsername);
                    s.checkUsername = null
                },
                errTip: {
                    show: function(b, c) {
                        for (var d in b)
                            if (!b[d].state) {
                                var e = "" + b[d].msg;
                                if (typeof c != "undefined" && a.getStyle(q[d + "_box"], "display") != "none") {
                                    q[d].blur();
                                    g.setCursor(q[d])
                                }
                                d == "username" && a.getStyle(q[d + "_box"], "display") == "none" && (d = "password");
                                setTimeout(function() {
                                    v.show(e, {
                                        el: q[d],
                                        box: q[d + "_box"]
                                    })
                                }, 0);
                                break
                            }
                    },
                    hide: function() {
                        v.hide()
                    }
                },
                changeExtra: function(a) {
                    for (var b in C)
                        typeof a != "undefined" && a == b ? C[b].isVisible() ? C[b].reset() : C[b].enable() : C[b].isVisible() && C[b].disable()
                },
                resetVerifycode: function(b) {
                    b && a.preventDefault(b.evt);
                    C.verifycode.reset();
                    return !1
                },
                lock: function(b) {
                    if (typeof b != "undefined" && p.ctls[b])
                        a.getStyle(q[b + "_box"], "display") != "none" && !p.ctls[b].pars.disabled && p.ctls[b].disabled(1);
                    else
                        for (var b in p.ctls)
                            a.getStyle(q[b + "_box"], "display") != "none" && !p.ctls[b].pars.disabled && p.ctls[b].disabled(1)
                },
                unlock: function() {
                    for (var b in p.ctls)
                        a.getStyle(q[b + "_box"], "display") != "none" && p.ctls[b].pars.disabled && p.ctls[b].disabled(0)
                },
                remember: {
                    mark: function() {
                        var b = p.ctls.username.value();
                        b && a.cookie.set(h.cookie.name, b, h.cookie.conf)
                    },
                    place: function() {
                        var b = p.ctls.username.value();
                        if (!b) {
                            var c = a.cookie.get(h.cookie.name);
                            c = unescape(c);
                            c && p.ctls.username.value(c)
                        }
                    },
                    clear: function() {
                        a.cookie.remove(h.cookie.name, h.cookie.conf)
                    }
                },
                customTip: {
                    show: function(a) {
                        customTip.show(a.el, a.data.content)
                    },
                    hide: function() {
                        customTip.hide()
                    }
                },
                reset: function() {
                    y.errTip.hide()
                },
                submit: {
                    active: function() {
                        s.checkUsername && clearTimeout(s.checkUsername);
                        a.preventDefault();
                        y.errTip.hide();
                        u.hide();
                        var b = y.getData();
                        if (b) {
                            y.submit.start();
                            y.lock();
                            d.fire("login", [b.username, b.password, b, b])
                        }
                        return !1
                    },
                    start: function() {
                        q.submitBtn.innerHTML = i.SUBMIT.ONSUBMIT;
                        a.addClassName(q.submitBtn, "W_btn_a_disable")
                    },
                    stop: function() {
                        q.submitBtn.innerHTML = i.SUBMIT.NORMAL;
                        a.removeClassName(q.submitBtn, "W_btn_a_disable")
                    },
                    focus: function(b) {
                        b = a.fixEvent(b);
                        a.addClassName(b.target, "W_btn_g_current")
                    },
                    blur: function(b) {
                        b = a.fixEvent(b);
                        a.removeClassName(b.target, "W_btn_g_current")
                    }
                },
                destroy: function() {
                    y.stopCheckUsername();
                    y.errTip.hide();
                    a.custEvent.undefine(r);
                    r.destroy();
                    t.destroy();
                    p.destroy();
                    u.destroy();
                    t = p = r = u = null
                }
            }, z = {
                use_username: function(b) {
                    a.preventDefault(b.evt);
                    p.ctls.username.value("");
                    p.ctls.password.value("");
                    q.password.focus();
                    q.password.blur();
                    y.usernameBox();
                    g.setCursor(q.username);
                    return !1
                },
                checkUsername: function(b) {
                    a.preventDefault(b.evt || b);
                    y.checkUsername();
                    return !1
                },
                stopCheckusername: function(b) {
                    a.preventDefault(b.evt);
                    y.stopCheckUsername();
                    return !1
                },
                passwordRecover: function(b) {
                    var c = p.ctls.username.value();
                    if (c) {
                        a.preventDefault(b.evt);
                        window.open(b.el.href += "&loginname=" + c)
                    }
                }
            }, A = {
                enter: function(b) {
                    b = a.fixEvent(b);
                    y.errTip.hide();
                    if (b.keyCode === 13) {
                        if (u.onActive())
                            return;
                        p.check();
                        var c = p.states()
                          , d = b.target.getAttribute("node-type");
                        if (d == "password" && w.nopwd) {
                            y.errTip.show({
                                username: {
                                    state: !1,
                                    msg: i.ERRTIP.CODE[4098]
                                }
                            });
                            return
                        }
                        d == "username" && !w.unChecked && y.checkUsername();
                        if (c[d].state == !1 && c[d].type == "empty")
                            return;
                        for (var e in p.ctls)
                            if (e != d && !p.ctls[e].pars.disabled && c[e].state == !1) {
                                setTimeout(function() {
                                    g.setCursor(q[e])
                                }, 0);
                                return
                            }
                        y.submit.active()
                    }
                },
                capslock: function(b) {
                    b = a.fixEvent(b);
                    var c = b.keyCode || b.which
                      , d = b.shiftKey || c == 16 || !1;
                    (c >= 65 && c <= 90 && !d || c >= 97 && c <= 122 && d) && y.errTip.show({
                        password: {
                            msg: i.CAPSLOCK
                        }
                    })
                }
            }, B = {
                login: {
                    complete: function() {
                        y.unlock();
                        y.submit.stop()
                    },
                    success: function(a) {
                        y.remember.mark();
                        if (a.result) {
                            var b;
                            $CONFIG.redirect ? b = $CONFIG.redirect : a.redirect ? b = a.redirect : a.userinfo && a.userinfo.userdomain ? b = "//" + window.location.hostname + "/" + a.userinfo.userdomain : b = "//" + window.location.hostname;
                            window.location.replace(b)
                        }
                    },
                    failure: function(b) {
                        var d;
                        if (b.code == "2071")
                            if ("protection_url"in b && b.protection_url) {
                                var e = encodeURIComponent(window.location.hash ? window.location.href.replace(new RegExp(location.hash,["g"]), "") : window.location.href)
                                  , g = a.core.util.URL(b.protection_url).setParam("callback_url", e).toString();
                                window.open(g, "_self")
                            } else {
                                var h = f.parentNode;
                                h && a.sizzle("[node-type=qrcode_tab]", h)[0].click()
                            }
                        b.code == "50113021" && y.usernameBox();
                        if (b.code == "8120" && b.logout_confirm_url)
                            window.open(b.logout_confirm_url, "_self");
                        else {
                            o(b.code) ? d = c(i.ERRTIP.CODE["" + b.code], {
                                USERNAME: p.ctls.username.value()
                            }) : d = !b.reason || b.reason === "" ? i.ERRTIP.CODE[9999] + "(" + b.code + ")" : b.reason;
                            var j = {};
                            j[b.type] = {
                                msg: d,
                                state: !1
                            };
                            y.errTip.show(j, 1)
                        }
                    }
                },
                logout: {
                    complete: function() {},
                    success: function() {},
                    failure: function() {}
                },
                verify: {
                    complete: function(b) {
                        y.unlock();
                        if (b.code && b.code == 4098) {
                            var c = {};
                            c[b.type] = {
                                msg: i.ERRTIP.CODE["" + b.code],
                                state: !1
                            };
                            y.errTip.show(c);
                            w.nopwd = !0
                        }
                        if (b.is_openlock === 1 && !("not_tab_qrcode"in b && b.not_tab_qrcode == 1)) {
                            y.errTip.show({
                                username: {
                                    msg: i.ERRTIP.CODE[2071]
                                }
                            });
                            var d = f.parentNode;
                            d && a.sizzle("[node-type=qrcode_tab]", d)[0].click()
                        }
                        w.unChecked = !0
                    },
                    update: function(a) {
                        y.changeExtra(a);
                        w.unChecked = !0
                    },
                    failure: function(a) {
                        y.changeExtra(a);
                        q[a].value = ""
                    }
                },
                yalogin: {
                    active: function(b) {
                        var d = !1
                          , e = setTimeout(function() {
                            d = !0;
                            y.usernameBox()
                        }, 2500);
                        a.kit.io.jsonp({
                            url: "//" + (window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com") + "/a/aj/prelogin/status",
                            onComplete: function(f) {
                                if (!d) {
                                    e && clearTimeout(e);
                                    if (f.code == "100000") {
                                        var g = f.data;
                                        if (g.uid == b) {
                                            q.prename_box.innerHTML = c(i.PRENAME_BOX, {
                                                AVATAR: g.avatar,
                                                LOGIN_NAME_HAZY: g.account,
                                                NICKNAME: g.nickname
                                            });
                                            w.yalogin = g.uid;
                                            p.ctls.username.value(g.loginname);
                                            a.setStyle(q.username_box, "display", "none");
                                            a.setStyle(q.prename_box, "display", "");
                                            q.qq_box && a.setStyle(q.qq_box, "display", "none");
                                            y.checkUsername();
                                            return
                                        }
                                    }
                                    y.usernameBox()
                                }
                            },
                            onFail: function() {
                                y.usernameBox()
                            }
                        }).request()
                    },
                    deny: function() {
                        y.usernameBox()
                    }
                }
            }, C = {
                verifycode: {
                    enable: function() {
                        q.verifycode_box.style.display = "";
                        p.ctls.verifycode.disabled(0);
                        C.verifycode.reset();
                        a.addEvent(q.verifycode, "keydown", A.enter)
                    },
                    disable: function() {
                        s.verifycode_auto && clearTimeout(s.verifycode_auto);
                        q.verifycode_box.style.display = "none";
                        p.ctls.verifycode.disabled(1);
                        a.removeEvent(q.verifycode, "keydown", A.enter)
                    },
                    reset: function() {
                        s.verifycode_auto && clearTimeout(s.verifycode_auto);
                        s.verifycode_auto = setTimeout(C.verifycode.reset, h.verifyCodeDelay);
                        e(q.verifycode_image);
                        q.verifycode.value = "" + p.ctls.verifycode.pars.text
                    },
                    isVisible: function() {
                        return !p.ctls.verifycode.pars.disabled
                    }
                },
                vsncode: {
                    enable: function() {
                        q.vsncode_box.style.display = "";
                        p.ctls.vsncode.disabled(0);
                        C.vsncode.reset();
                        a.addEvent(q.vsncode, "keydown", A.enter)
                    },
                    disable: function() {
                        q.vsncode_box.style.display = "none";
                        p.ctls.vsncode.disabled(1);
                        a.removeEvent(q.vsncode, "keydown", A.enter)
                    },
                    reset: function() {
                        q.vsncode.value = "" + p.ctls.vsncode.pars.text
                    },
                    isVisible: function() {
                        return !p.ctls.vsncode.pars.disabled
                    }
                }
            }, D = {
                destroy: x.destroy
            };
            x.init();
            return D
        }
    });
    STK.register("ui.mod.layer", function(a) {
        var b = function(a) {
            var b = {};
            if (a.style.display == "none") {
                a.style.visibility = "hidden";
                a.style.display = "";
                b.w = a.offsetWidth;
                b.h = a.offsetHeight;
                a.style.display = "none";
                a.style.visibility = "visible"
            } else {
                b.w = a.offsetWidth;
                b.h = a.offsetHeight
            }
            return b
        }
          , c = function(c, d) {
            d = d || "topleft";
            var e = null;
            if (c.style.display == "none") {
                c.style.visibility = "hidden";
                c.style.display = "";
                e = a.core.dom.position(c);
                c.style.display = "none";
                c.style.visibility = "visible"
            } else
                e = a.core.dom.position(c);
            if (d !== "topleft") {
                var f = b(c);
                if (d === "topright")
                    e.l = e.l + f.w;
                else if (d === "bottomleft")
                    e.t = e.t + f.h;
                else if (d === "bottomright") {
                    e.l = e.l + f.w;
                    e.t = e.t + f.h
                }
            }
            return e
        };
        return function(d) {
            var e = a.core.dom.builder(d)
              , f = e.list.outer[0]
              , g = e.list.inner[0]
              , h = a.core.dom.uniqueID(f)
              , i = {}
              , j = a.core.evt.custEvent.define(i, "show");
            a.core.evt.custEvent.define(j, "hide");
            var k = null;
            i.show = function() {
                f.style.display = "";
                a.core.evt.custEvent.fire(j, "show");
                return i
            }
            ;
            i.hide = function() {
                f.style.display = "none";
                a.custEvent.fire(j, "hide");
                return i
            }
            ;
            i.getPosition = function(a) {
                return c(f, a)
            }
            ;
            i.getSize = function(a) {
                if (a || !k)
                    k = b.apply(i, [f]);
                return k
            }
            ;
            i.html = function(a) {
                a !== undefined && (g.innerHTML = a);
                return g.innerHTML
            }
            ;
            i.text = function(b) {
                b !== undefined && (g.innerHTML = a.core.str.encodeHTML(b));
                return a.core.str.decodeHTML(g.innerHTML)
            }
            ;
            i.appendChild = function(a) {
                g.appendChild(a);
                return i
            }
            ;
            i.getUniqueID = function() {
                return h
            }
            ;
            i.getOuter = function() {
                return f
            }
            ;
            i.getInner = function() {
                return g
            }
            ;
            i.getParentNode = function() {
                return f.parentNode
            }
            ;
            i.getDomList = function() {
                return e.list
            }
            ;
            i.getDomListByKey = function(a) {
                return e.list[a]
            }
            ;
            i.getDom = function(a, b) {
                return e.list[a] ? e.list[a][b || 0] : !1
            }
            ;
            i.getCascadeDom = function(b, c) {
                return e.list[b] ? a.core.dom.cascadeNode(e.list[b][c || 0]) : !1
            }
            ;
            return i
        }
    });
    STK.register("v6.pub.login.qrcode", function(a) {
        return function(b, c) {
            var d, e, f, g, h = a.kit.extra.language, i = a.v6.conf.channel.sso.qrcode, j = !0, k = {
                scanSucc: h('<div node-type="outer" style="width:208px" class="layer_form_tips"><div class="bg"><div node-type="inner" class="content qrcode_tips"><a class="W_ico12 icon_close" node-type="close"></a><div class="W_tips empty clearfix"><p class="icon"><span class="icon_succ"></span></p><p class="txt">#L{扫描成功}！<br>#L{点击手机上的确认即可登录}</p></div></div><div class="arrow arrow_tips"></div></div>')
            }, l = function(b) {
                var c = '<span class="W_icon icon_rederrorB"></span><div class="res_info">#L{出错了，}<a href="javascript:void(0);" action-type="change">#L{重新扫描}</a></div>';
                if (!b)
                    return a.common.extra.parseLanguage(c);
                switch (b) {
                case "qrcode_used":
                    c = '<span class="W_icon icon_rederrorB"></span><div class="res_info">#L{二维码已使用，}<a href="javascript:void(0);" action-type="change">#L{点击更换}</a></div>';
                    break;
                case "qrcode_timeout":
                    c = '<span class="W_icon icon_rederrorB"></span><div class="res_info">#L{二维码已超时，}<a href="javascript:void(0);" action-type="change">#L{点击更换}</a></div>';
                    break;
                case "qrcode_exception":
                    c = '<span class="W_icon icon_rederrorB"></span><div class="res_info">#L{二维码获取异常，}<a href="javascript:void(0);" action-type="change">#L{点击更换}</a></div>'
                }
                return a.common.extra.parseLanguage(c)
            }, m = function(b) {
                var c = '<span class="W_icon icon_rederrorB"></span><div class="res_info">#text#</div>'
                  , d = "";
                switch (b) {
                case "-4098":
                    d = "您尚未设置密码，请使用短信验证码登录（-4098）";
                    break;
                case "-4080":
                    d = "请稍后重试或用客户端登录（-4080）";
                    break;
                case "-4076":
                    d = "请使用微博官方客户端登录（-4076）";
                    break;
                case "-4071":
                    d = "账号异常，请使用客户端登录微博（-4071）";
                    break;
                case "-4057":
                    d = "网络异常，请稍后再试(-4057)";
                    break;
                case "-1":
                case "-2":
                    d = '抱歉，系统开小差了，请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。';
                    break;
                case "1":
                    d = '(1) - 系统异常，请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。';
                    break;
                case "5":
                    d = "用户不存在，请先<a onclick=\"window.open('https://weibo.com/signup/signup.php', '_self')\" href=\"javascript:void(0);\">注册微博</a>";
                    break;
                case "4038":
                    d = "请使用扫码方式登录，或去客户端登录";
                    break;
                case "50114013":
                    d = "请稍后重试，或使用客户端登录微博（-100）";
                    break;
                case "50114014":
                    d = "请稍后重试，或使用客户端登录微博（-101）";
                    break;
                case "50114015":
                    d = "请稍后重试，或使用客户端登录微博（-102）";
                    break;
                case "50114018":
                    d = '网络超时，请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重新扫码';
                    break;
                default:
                    d = '登录失败，<br/>请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。(' + b + ")"
                }
                return a.common.extra.parseLanguage(c.replace(/#text#/g, d))
            }, n = {
                init: function() {
                    i.fire("set", {
                        entry: "weibo",
                        domain: "weibo.com"
                    });
                    c = c || {};
                    n.parseDOM();
                    c.isLayer || n.initPlugins();
                    n.bind()
                },
                parseDOM: function() {
                    d = a.kit.dom.parseDOM(a.builder(b).list)
                },
                bind: function() {
                    a.addEvent(d.qrcode_src, "mouseover", n.tips.show);
                    a.addEvent(d.qrcode_src, "mouseout", n.tips.hide);
                    for (var c in n.handle)
                        i.register(c, n.handle[c]);
                    e = a.delegatedEvent(b);
                    e.add("change", "click", n.devts.change);
                    a.custEvent.define(o, ["enable", "disable"]);
                    a.custEvent.add(o, "enable", n.enable);
                    a.custEvent.add(o, "disable", n.disable)
                },
                initPlugins: function() {
                    f = a.ui.mod.layer(k.scanSucc);
                    g = f.getDom("close");
                    a.addEvent(g, "click", f.hide)
                },
                unbind: function() {},
                devts: {
                    change: function() {
                        if (!c.isLayer) {
                            f && f.hide();
                            n.getQRcode()
                        } else {
                            n.getQRcode();
                            d.qrcode_err.innerHTML = l();
                            d.qrcode_err && (d.qrcode_err.style.display = "none");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "none");
                            d.qrcode_bg && (d.qrcode_bg.style.display = "none")
                        }
                    }
                },
                handle: {
                    getQRcode_success: function(a) {
                        d.qrcode_src.src = a.data.image;
                        if (!c.isLayer)
                            f && f.hide();
                        else {
                            d.qrcode_err.innerHTML = l();
                            d.qrcode_err && (d.qrcode_err.style.display = "none");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "none");
                            d.qrcode_bg && (d.qrcode_bg.style.display = "none")
                        }
                    },
                    qrcode_scanned: function(e) {
                        if (!c.isLayer) {
                            var g = f.getDom("outer")
                              , h = a.core.dom.position(b);
                            a.core.dom.setStyle(g, "top", h.t - 32 + "px");
                            a.core.dom.setStyle(g, "left", h.l - 10 + "px");
                            if (j) {
                                document.body.appendChild(g);
                                j = !1
                            }
                            f.show()
                        } else {
                            d.qrcode_err.innerHTML = l();
                            d.qrcode_bg && (d.qrcode_bg.style.display = "");
                            d.qrcode_err && (d.qrcode_err.style.display = "none");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "")
                        }
                    },
                    qrcode_used: function(a) {
                        if (!c.isLayer) {
                            f && f.hide();
                            n.getQRcode()
                        } else {
                            d.qrcode_err.innerHTML = l("qrcode_used");
                            d.qrcode_bg && (d.qrcode_bg.style.display = "");
                            d.qrcode_err && (d.qrcode_err.style.display = "");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "none")
                        }
                    },
                    qrcode_timeout: function(a) {
                        f && f.hide();
                        n.getQRcode()
                    },
                    qrcode_exception: function(a) {
                        if (!c.isLayer) {
                            f && f.hide();
                            n.getQRcode()
                        } else {
                            d.qrcode_err.innerHTML = l("qrcode_exception");
                            d.qrcode_bg && (d.qrcode_bg.style.display = "");
                            d.qrcode_err && (d.qrcode_err.style.display = "");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "none")
                        }
                    },
                    login_success: function(a) {
                        if (!c.isLayer) {
                            f && f.hide();
                            window.location.reload()
                        } else
                            window.location.reload()
                    },
                    login_failure: function(a) {
                        if (!c.isLayer) {
                            f && f.hide();
                            n.getQRcode()
                        } else {
                            var b = m("")
                              , e = a && a.retcode ? a.retcode : "0";
                            if (e == "4069") {
                                var g = a.msg.split("|");
                                if (g.length == 2 && g[1]) {
                                    window.location.href = g[1];
                                    return
                                }
                            } else
                                b = m(e);
                            d.qrcode_err.innerHTML = b;
                            d.qrcode_bg && (d.qrcode_bg.style.display = "");
                            d.qrcode_err && (d.qrcode_err.style.display = "");
                            d.qrcode_succ && (d.qrcode_succ.style.display = "none")
                        }
                    }
                },
                getQRcode: function() {
                    i.fire("getQRcode")
                },
                enable: function() {
                    d.qrcode_src.src ? i.fire("start") : n.getQRcode()
                },
                disable: function() {
                    i.fire("cancel")
                },
                tips: {
                    show: function() {
                        if (d.icon_ask) {
                            d.icon_ask.style.display = "block";
                            a.setStyle(d.icon_ask, "zIndex", "9999")
                        }
                    },
                    hide: function() {
                        d.icon_ask && (d.icon_ask.style.display = "none")
                    }
                },
                destroy: function() {
                    e && e.destroy && e.destroy()
                }
            }, o = {
                enable: n.enable,
                disable: n.disable
            };
            n.init();
            return o
        }
    });
    STK.register("common.setting.mobile", function(a) {
        var b = {
            E01: "",
            E02: "#L{目前支持大陆、港澳台手机号注册}",
            E03: "#L{请输入手机号码}",
            E04: "#L{手机号长度11位，以13/14/15/16/17/18/19开头}"
        };
        return function(c, d) {
            var e = function() {
                var a = g.value()
                  , b = !1;
                if (!g.pars.must && g.rule.isEmpty(a)) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else {
                    if (!b && g.rule.isEmpty(a)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E03"
                    }
                    if (!b && !g.rule.isMobile(a)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E04"
                    }
                    if (!b) {
                        g.msg.state = !0;
                        g.msg.type = "ok";
                        g.msg.code = "E01"
                    } else
                        g.msg.state = !1
                }
            }
              , f = {
                focus: function() {
                    g.cache_value = g.value();
                    if (g.rule.isEmpty(g.cache_value)) {
                        g.msg.state = !1;
                        g.msg.action = "focus";
                        g.msg.type = "tip";
                        g.msg.code = "E02";
                        g.fire()
                    }
                },
                blur: function() {
                    c.value = g.rule.reNullChar(c.value);
                    g.msg.action = "blur";
                    var b = g.value();
                    if (!(b && g.cache_value == b && g.pars.proxy && g.pars.iokey)) {
                        g.cache_value = null;
                        if (g.pars.iodelay === 0 && !g.pars.proxy && !g.pars.iokey) {
                            e();
                            g.fire()
                        } else
                            ioDelay = setTimeout(function() {
                                e();
                                if (g.msg.state && g.pars.proxy && g.pars.iokey) {
                                    g.msg.type = "loading";
                                    g.pars.iorecords = !0;
                                    g.pars.proxy.request(g.pars.iokey, {
                                        onSuccess: function(b) {
                                            g.msg = a.parseParam(g.msg, b.data || {});
                                            g.msg.state = !0;
                                            g.fire()
                                        },
                                        onError: function(b) {
                                            g.msg = a.parseParam(g.msg, b.data || {});
                                            g.msg.state = !1;
                                            g.fire()
                                        }
                                    }, {
                                        type: g.type,
                                        value: encodeURIComponent(g.value())
                                    })
                                }
                                g.fire()
                            }, g.pars.iodelay)
                    }
                }
            }
              , g = a.common.setting.control(c, d, {
                evtAct: f,
                check: e
            })
              , h = a.core.obj.sup(g, ["initPars"]);
            g.initPars = function() {
                h.initPars();
                g.errText = a.common.extra.parseLanguage(b);
                g.type = "mobile"
            }
            ;
            g.pars.auto && g.init();
            return g
        }
    });
    STK.register("common.setting.activation", function(a) {
        var b = {
            E01: "",
            E02: "#L{请输入短信激活码}",
            E03: "#L{激活码输入有误}"
        };
        return function(c, d) {
            var e = function() {
                var a = g.value().replace(/^\s+|\s+$/g, "")
                  , b = !1;
                if (!g.pars.must && g.rule.isEmpty(a)) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else {
                    if (!b && g.rule.isEmpty(a)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E02"
                    }
                    if (!b && !g.rule.lenLimit(a, 0, 6)) {
                        b = !0;
                        g.msg.type = "err";
                        g.msg.code = "E03"
                    }
                    if (!b) {
                        g.msg.state = !0;
                        g.msg.type = "empty";
                        g.msg.code = "E01"
                    } else
                        g.msg.state = !1
                }
            }
              , f = {
                focus: function() {
                    g.cache_value = g.value();
                    if (g.rule.isEmpty(g.cache_value)) {
                        g.msg.state = !1;
                        g.msg.action = "focus";
                        g.msg.type = "tip";
                        g.msg.code = "E02";
                        g.fire()
                    }
                },
                blur: function() {
                    c.value = g.rule.reNullChar(c.value);
                    g.msg.action = "blur";
                    e();
                    g.fire()
                }
            }
              , g = a.common.setting.control(c, d, {
                evtAct: f,
                check: e
            })
              , h = a.core.obj.sup(g, ["initPars"]);
            g.initPars = function() {
                h.initPars();
                g.errText = a.common.extra.parseLanguage(b);
                g.type = "activation"
            }
            ;
            g.pars.auto && g.init();
            return g
        }
    });
    STK.register("v6.pub.form.timer", function(a) {
        var b = {
            ss: 1,
            mm: 60,
            hh: 3600,
            dd: 86400
        };
        return function(c, d) {
            var e = {}, f, g, h = {
                init: function() {
                    f = a.parseParam({
                        time: 0,
                        loop: "ss"
                    }, c);
                    d = d || function() {}
                },
                start: function() {
                    var a = f.time
                      , c = function() {
                        d({
                            last: a,
                            dd: Math.floor(a / b.dd),
                            hh: Math.floor(a % b.dd / b.hh),
                            mm: Math.floor(a % b.dd % b.hh / b.mm),
                            ss: a % b.mm
                        });
                        a == 0 && clearInterval(g);
                        a -= b[f.loop]
                    };
                    g = setInterval(c, b[f.loop] * 1e3)
                },
                stop: function() {
                    clearInterval(g);
                    d({
                        last: 0
                    })
                },
                destroy: function() {}
            };
            h.init();
            e.start = h.start;
            e.stop = h.stop;
            e.destroy = h.destroy;
            return e
        }
    });
    STK.register("v6.lib.kit.io.ajax", function(a) {
        var b = function(b, c, d) {
            c = c | 0 || 1;
            d = d || "fail";
            var e = b.args;
            e.__rnd && delete e.__rnd;
            (new Image).src = "//weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d;
            (new Image).src = "//s1.sinaedge.com/whb.gif?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
        };
        return function(c) {
            var d = {}
              , e = []
              , f = null
              , g = !1
              , h = a.parseParam({
                url: "",
                method: "get",
                responseType: "json",
                timeout: 3e4,
                onTraning: a.funcEmpty,
                isEncode: !0
            }, c);
            h.onComplete = function(a) {
                g = !1;
                c.onComplete(a, h.args);
                setTimeout(i, 0)
            }
            ;
            h.onFail = function(a) {
                g = !1;
                if (typeof c.onFail == "function")
                    try {
                        c.onFail(a, h.args)
                    } catch (d) {}
                setTimeout(i, 0);
                try {
                    b(h)
                } catch (d) {}
            }
            ;
            h.onTimeout = function(a) {
                try {
                    b(h);
                    c.onTimeout(a)
                } catch (d) {}
            }
            ;
            var i = function() {
                if (!!e.length) {
                    if (g === !0)
                        return;
                    g = !0;
                    h.args = e.shift();
                    if (h.method.toLowerCase() == "post") {
                        var b = a.core.util.URL(h.url);
                        b.setParam("__rnd", +(new Date));
                        h.url = b.toString()
                    }
                    f = a.ajax(h)
                }
            }
              , j = function(a) {
                while (e.length)
                    e.shift();
                g = !1;
                if (f)
                    try {
                        f.abort()
                    } catch (b) {}
                f = null
            };
            d.request = function(a) {
                a || (a = {});
                c.noQueue && j();
                if (!c.uniqueRequest || !f) {
                    e.push(a);
                    a._t = 0;
                    i()
                }
            }
            ;
            d.abort = j;
            return d
        }
    });
    STK.register("v6.lib.kit.io.ijax", function(a) {
        return function(b) {
            var c = a.parseParam({
                url: "",
                timeout: 3e4,
                isEncode: !0,
                abaurl: null,
                responseName: null,
                varkey: "callback",
                abakey: "callback"
            }, b)
              , d = []
              , e = null
              , f = !1;
            c.onComplete = function(a, d) {
                f = !1;
                b.onComplete(a, c.form, d);
                c.form = null;
                c.args = null;
                setTimeout(g, 0)
            }
            ;
            c.onFail = function(a, d) {
                f = !1;
                b.onFail(a, c.form, d);
                c.form = null;
                c.args = null;
                setTimeout(g, 0)
            }
            ;
            var g = function() {
                var b;
                if (!!d.length) {
                    if (f === !0)
                        return;
                    f = !0;
                    b = d.shift();
                    c.args = b.args;
                    c.form = b.form;
                    e = a.ijax(c)
                }
            }
              , h = function(a) {
                while (d.length)
                    d.shift();
                f = !1;
                if (e)
                    try {
                        e.abort()
                    } catch (b) {}
                e = null
            }
              , i = {};
            i.request = function(c, e) {
                if (!a.isNode(c))
                    throw "[lib.kit.io.ijax.request] need a form as first parameter";
                e || (e = {});
                b.noQueue && h();
                d.push({
                    form: c,
                    args: e
                });
                g()
            }
            ;
            i.abort = h;
            return i
        }
    });
    STK.register("v6.lib.kit.io.inter", function(a) {
        var b = a.core.json.merge;
        return function() {
            var c = {}
              , d = {}
              , e = {}
              , f = function(a, b) {
                return function(c, d) {
                    try {
                        b.onComplete(c, d)
                    } catch (f) {}
                    try {
                        c.code === "100000" ? b.onSuccess(c, d) : b.onError(c, d)
                    } catch (f) {}
                    for (var g in e[a])
                        try {
                            e[a][g](c, d)
                        } catch (f) {}
                }
            }
              , g = function(a, b, c) {
                return function(d) {
                    try {
                        b.onComplete(d, c)
                    } catch (f) {}
                    try {
                        d.code === "100000" ? b.onSuccess(d, c) : b.onError(d, c)
                    } catch (f) {}
                    for (var g in e[a])
                        try {
                            e[a][g](d, c)
                        } catch (f) {}
                }
            };
            c.register = function(a, b) {
                if (typeof d[a] != "undefined")
                    throw a + " registered";
                b.url && (b.url += b.url.indexOf("?") >= 0 ? "&ajwvr=6" : "?ajwvr=6");
                d[a] = b;
                e[a] = {}
            }
            ;
            c.addHook = function(b, c) {
                var d = a.core.util.getUniqueKey();
                e[b][d] = c;
                return d
            }
            ;
            c.rmHook = function(a, b) {
                e[a] && e[a][b] && delete e[a][b]
            }
            ;
            c.getTrans = function(c, e) {
                var g = b(d[c], e);
                g.onComplete = f(c, e);
                var h = d[c].requestMode
                  , i = "ajax";
                if (h === "jsonp" || h === "ijax")
                    i = h;
                return a.v6.lib.kit.io[i](g)
            }
            ;
            c.request = function(c, e, f) {
                var h = b(d[c], e);
                h.onComplete = g(c, e, f);
                h = a.core.obj.cut(h, ["noqueue"]);
                h.args = f;
                var i = d[c].requestMode;
                return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
            }
            ;
            return c
        }
    });
    STK.register("v6.conf.trans.sso.message", function(a) {
        var b = a.v6.lib.kit.io.inter()
          , c = b.register;
        c("send_sms", {
            url: "//login.sina.com.cn/sso/msglogin",
            requestMode: "jsonp",
            varkey: "callback"
        });
        return b
    });
    STK.register("v6.pub.login.message", function(a) {
        var b = ["mobile", "activation"], c = a.core.util.templet, d = a.v6.conf.channel.sso.login, e = a.v6.conf.trans.sso.message, f = a.kit.extra.textareaUtils, g = {
            TIPS: {
                SEND_SMS_SUCCESS: "#L{发送成功，请填写收到的验证码}",
                SEND_SMS_ERROR: '#L{验证码无法发送，请稍<a href="javascript:window.location.reload()">刷新页面</a>后再试}',
                LOGIN_SMS_ERROR: "#L{验证码输入有误}",
                MOBILE_FORMAT_ERROR: "#L{请输入正确的手机号}",
                SEND_SMS_TOOFAST: "#L{发送验证码过频，请稍后再试}",
                MOBILE_NOT_REGISTER: '#L{此号码尚未注册，<a href="http://weibo.com/signup/signup.php">立即注册</a>}',
                ACTIVATION_EMPTY: "#L{请输入短信验证码}"
            },
            ERRTIP: {
                CODE: a.common.form.ssoErrCode
            },
            SUBMIT: {
                NORMAL: "#L{登录}",
                ONSUBMIT: '<i class="W_loading"></i>#L{登录}'
            }
        }, h = function() {
            var a, b = {
                save: function(b) {
                    a = b
                },
                load: function() {
                    return a
                },
                reset: function() {
                    b.save("")
                },
                cached: function(b) {
                    return a === b
                }
            };
            return b
        }(), i, j = function(b) {
            if (!i) {
                i = [];
                for (var c in g.ERRTIP.CODE)
                    i.push(c)
            }
            return a.inArray("" + b, i)
        };
        return function(i, k) {
            var l, m, n, o, p, q, r = {}, s = {
                unChecked: !1
            }, t = null, u = {
                init: function() {
                    u.parseParam();
                    u.initPlugins();
                    u.bind()
                },
                parseParam: function() {
                    g = a.common.extra.parseLanguage(g)
                },
                bind: function() {
                    o = a.core.evt.delegatedEvent(i);
                    for (var b in u.domEvt)
                        o.add(b, "click", u.domEvt[b]);
                    a.addEvent(m.mobile, "focus", v.stopCheckUsername);
                    a.addEvent(m.mobile, "blur", v.checkUsername);
                    a.addEvent(m.submitBtn, "focus", v.submit.focus);
                    a.addEvent(m.submitBtn, "blur", v.submit.blur);
                    a.custEvent.define(x, ["disable", "closeTip"]);
                    a.custEvent.add(x, "disable", u.disable);
                    a.custEvent.add(x, "closeTip", v.errTip.hide);
                    d.register("verify.update", w.verify.update);
                    d.register("verify.failure", w.verify.failure);
                    d.register("verify.complete", w.verify.complete);
                    d.register("login.success", w.login.success);
                    d.register("login.failure", w.login.failure);
                    d.register("login.complete", w.login.complete);
                    d.register("logout.success", w.logout.success);
                    d.register("logout.failure", w.logout.failure);
                    d.register("logout.complete", w.logout.complete)
                },
                unbind: function() {
                    for (var b in u.domEvt)
                        o.remove(b, "click", u.domEvt[b]);
                    o.destroy();
                    a.removeEvent(m.mobile, "focus", v.stopCheckUsername);
                    a.removeEvent(m.mobile, "blur", v.checkUsername);
                    a.removeEvent(m.submitBtn, "focus", v.submit.focus);
                    a.removeEvent(m.submitBtn, "blur", v.submit.blur);
                    a.custEvent.remove(x, "closeTip", v.errTip.hide);
                    a.custEvent.remove(x, "disable", u.disable);
                    a.custEvent.undefine(x, ["disable", "closeTip"]);
                    d.remove("verify.update", w.verify.update);
                    d.remove("verify.failure", w.verify.failure);
                    d.remove("verify.complete", w.verify.complete);
                    d.remove("login.success", w.login.success);
                    d.remove("login.failure", w.login.failure);
                    d.remove("login.complete", w.login.complete);
                    d.remove("logout.success", w.logout.success);
                    d.remove("logout.failure", w.logout.failure);
                    d.remove("logout.complete", w.logout.complete)
                },
                initPlugins: function() {
                    v.init();
                    q = a.v6.pub.ui.tipAlert()
                },
                domEvt: {
                    btn_sms_activation: function(b) {
                        a.preventDefault();
                        r.checkUsername && clearTimeout(r.checkUsername);
                        v.errTip.hide();
                        var c = l.ctls.mobile.check();
                        if (!c.state)
                            v.errTip.show({
                                mobile: c
                            });
                        else if (!s.unChecked) {
                            t = v.sendSMS;
                            h.reset();
                            v.checkUsername()
                        } else
                            v.sendSMS()
                    },
                    btn_submit: function() {
                        a.preventDefault();
                        v.submit.active()
                    }
                },
                disable: function() {
                    v.errTip.hide();
                    p && p.stop();
                    for (var a in l.ctls)
                        l.ctls[a].value(l.ctls[a].pars.text)
                },
                destroy: function() {
                    u.unbind();
                    v.destroy();
                    q.destroy();
                    p = q = r = s = t = null
                }
            }, v = {
                init: function() {
                    n = a.v6.pub.form.textCopy(i);
                    a.custEvent.define(n, ["focus", "blur", "keyup"]);
                    a.custEvent.add(n, "focus", v.handle.textCopy);
                    a.custEvent.add(n, "blur", v.handle.textCopy);
                    l = a.common.setting.form(i);
                    m = a.kit.dom.parseDOM(l.domList);
                    var c, d;
                    for (var e in b) {
                        d = b[e];
                        if (a.common.setting[d]) {
                            c = a.queryToJson(m[d].getAttribute("action-data") || "");
                            l.add(d, a.common.setting[d](m[d], a.core.json.merge({
                                hook: l
                            }, c)));
                            a.core.util.browser.MOZ && n.API.build({
                                el: m[d],
                                data: c
                            })
                        }
                    }
                    monitor = a.common.extra.inputMonitor(m.mobile);
                    a.custEvent.add(monitor, "change", function() {
                        h.reset();
                        s.unChecked = !1;
                        typeof t == "function" && (t = null)
                    })
                },
                handle: {
                    textCopy: function(b, c) {
                        b.type == "focus" && v.errTip.hide();
                        a.inArray(c.el, [m.mobile]) && (b.type == "focus" ? a.addClassName(c.el.parentNode, "W_input_focus") : b.type == "blur" && a.removeClassName(c.el.parentNode, "W_input_focus"))
                    }
                },
                errTip: {
                    show: function(a, b) {
                        for (var c in a)
                            if (!a[c].state) {
                                var d = "" + a[c].msg
                                  , e = a[c].offsetX;
                                c == "username" && (c = "mobile");
                                if (c == "mobile")
                                    switch (a[c].code) {
                                    case "E04":
                                        d = g.TIPS.MOBILE_FORMAT_ERROR
                                    }
                                if (c == "activation")
                                    switch (a[c].code) {
                                    case "E02":
                                        d = g.TIPS.ACTIVATION_EMPTY
                                    }
                                if (typeof b != "undefined") {
                                    m[c].blur();
                                    f.setCursor(m[c])
                                }
                                setTimeout(function() {
                                    q.show(d, {
                                        el: m[c],
                                        box: m[c + "_box"],
                                        offsetX: e
                                    })
                                }, 0);
                                break
                            }
                    },
                    hide: function() {
                        q.hide()
                    }
                },
                getData: function() {
                    var a = l.states();
                    if (l.check()) {
                        var b = l.getData();
                        m.savestate.checked && (b.savestate = 7);
                        return b
                    }
                    v.errTip.show(a, 1);
                    return !1
                },
                lock: function(a) {
                    if (typeof a != "undefined" && l.ctls[a])
                        l.ctls[a].disabled(1);
                    else
                        for (var a in l.ctls)
                            l.ctls[a].disabled(1)
                },
                unlock: function() {
                    for (var b in l.ctls)
                        (!m[b + "_box"] || a.getStyle(m[b + "_box"], "display") != "none") && l.ctls[b].pars.disabled && l.ctls[b].disabled(0)
                },
                submit: {
                    active: function() {
                        r.checkUsername && clearTimeout(r.checkUsername);
                        v.errTip.hide();
                        var a = v.getData();
                        if (a) {
                            v.submit.start();
                            v.lock();
                            a.cfrom = 1;
                            d.fire("login", [a.username, a.password, a, a])
                        }
                        return !1
                    },
                    start: function() {
                        m.submitBtn.innerHTML = g.SUBMIT.ONSUBMIT;
                        a.addClassName(m.submitBtn, "W_btn_a_disable")
                    },
                    stop: function() {
                        m.submitBtn.innerHTML = g.SUBMIT.NORMAL;
                        a.removeClassName(m.submitBtn, "W_btn_a_disable")
                    },
                    focus: function(b) {
                        b = a.fixEvent(b);
                        a.addClassName(b.target, "W_btn_g_current")
                    },
                    blur: function(b) {
                        b = a.fixEvent(b);
                        a.removeClassName(b.target, "W_btn_g_current")
                    }
                },
                checkUsername: function() {
                    a.preventDefault();
                    r.checkUsername && clearTimeout(r.checkUsername);
                    r.checkUsername = setTimeout(function() {
                        var a = l.ctls.mobile;
                        if (a.check().state) {
                            a.value(a.value());
                            var b = a.value();
                            if (!h.cached(b)) {
                                v.lock("mobile");
                                d.fire("verify.username", b);
                                h.save(b)
                            }
                        }
                    }, 200)
                },
                stopCheckUsername: function(b) {
                    b && a.preventDefault(b);
                    r.checkUsername && clearTimeout(r.checkUsername);
                    r.checkUsername = null
                },
                sendSMS: function() {
                    if (l.ctls.mobile.msg.state && l.ctls.mobile.msg.type == "ok") {
                        var b = {
                            type: "sendsms"
                        };
                        b.value = l.ctls.mobile.value();
                        p = a.v6.pub.form.timer({
                            time: 59
                        }, function(a) {
                            m.sms_timer.innerHTML = a.last;
                            m.btn_sms_activation_disable.style.display = a.last == 0 ? "none" : "";
                            m.btn_sms_activation.style.display = a.last == 0 ? "" : "none"
                        });
                        p.start();
                        e.getTrans("send_sms", {
                            onComplete: function(a) {
                                var b = {
                                    activation: {
                                        state: !1,
                                        msg: a.msg
                                    }
                                };
                                if (a.retcode == 2e7) {
                                    b = {
                                        activation: {
                                            state: !1,
                                            msg: g.TIPS.SEND_SMS_SUCCESS,
                                            offsetX: -18
                                        }
                                    };
                                    v.errTip.show(b)
                                } else {
                                    if (a.retcode == 50110801) {
                                        b = {
                                            mobile: {
                                                state: !1,
                                                msg: g.TIPS.MOBILE_NOT_REGISTER
                                            }
                                        };
                                        p.stop()
                                    }
                                    if (a.retcode == 50110810 || a.retcode == 50110811)
                                        b = {
                                            activation: {
                                                state: !1,
                                                msg: g.TIPS.SEND_SMS_TOOFAST,
                                                offsetX: -18
                                            }
                                        };
                                    v.errTip.show(b)
                                }
                            },
                            onFailure: function(a) {
                                p.stop()
                            }
                        }).request({
                            entry: "weibo",
                            mobile: b.value,
                            s: s.unChecked
                        })
                    } else
                        v.errTip.show({
                            mobile: l.ctls.mobile.msg
                        }, 1);
                    typeof t == "function" && (t = null)
                },
                destroy: function() {
                    v.stopCheckUsername();
                    v.errTip.hide();
                    a.custEvent.undefine(n);
                    n.destroy();
                    monitor.destroy();
                    l.destroy();
                    monitor = l = n = null
                }
            }, w = {
                login: {
                    complete: function() {
                        v.unlock();
                        v.submit.stop()
                    },
                    success: function(a) {
                        if (a.result) {
                            var b;
                            $CONFIG.redirect ? b = $CONFIG.redirect : a.redirect ? b = a.redirect : a.userinfo && a.userinfo.userdomain ? b = "//" + window.location.hostname + "/" + a.userinfo.userdomain : b = "//" + window.location.hostname;
                            window.location.replace(b)
                        }
                    },
                    failure: function(a) {
                        var b;
                        j(a.code) ? b = c(g.ERRTIP.CODE["" + a.code], {
                            USERNAME: l.ctls.mobile.value()
                        }) : b = a.reason;
                        if (a.code == "8120")
                            a.logout_confirm_url ? window.open(a.logout_confirm_url, "_self") : setTimeout(function() {
                                var c = a.type == "username" ? "mobile" : a.type;
                                q.show(b, {
                                    el: m[c],
                                    box: m[c + "_box"],
                                    offsetX: -18
                                })
                            }, 0);
                        else {
                            if (a.code == "101") {
                                a.type = "activation";
                                b = g.TIPS.LOGIN_SMS_ERROR;
                                l.ctls.activation.value("")
                            }
                            var d = {};
                            d[a.type] = {
                                msg: b,
                                state: !1
                            };
                            v.errTip.show(d, 1)
                        }
                    }
                },
                logout: {
                    complete: function() {},
                    success: function() {},
                    failure: function() {}
                },
                verify: {
                    complete: function(b) {
                        v.unlock();
                        b.smsurl && (s.unChecked = a.core.util.URL(b.smsurl).getParam("s"));
                        typeof t == "function" && (s.unChecked ? t() : v.errTip.show({
                            activation: {
                                state: !1,
                                msg: g.TIPS.SEND_SMS_ERROR
                            }
                        }))
                    },
                    update: function(a) {},
                    failure: function(a) {
                        m[a].value = ""
                    }
                }
            }, x = {
                destroy: u.destroy
            };
            u.init();
            return x
        }
    });
    STK.register("v6.pub.third.iframe", function(a) {
        var b = {}
          , c = {}
          , d = function(c, d, e, f) {
            try {
                var g = a.jsonToStr({
                    cid: d,
                    call: e,
                    rs: f
                });
                b[c] && b[c].contentWindow && b[c].contentWindow.postMessage ? b[c].contentWindow.postMessage(g, "*") : window.navigator["STK_IFRAME_CONNECT_REG_" + c] && window.navigator["STK_IFRAME_CONNECT_REG_" + c](g)
            } catch (h) {}
        }
          , e = function(e) {
            try {
                var f = a.strToJson(e.data);
                if (f.iid in c) {
                    a.custEvent.define(c[f.iid], [f.cmd]);
                    a.custEvent.fire(c[f.iid], f.cmd, [b[f.iid], f.param, function(a, b) {
                        return d(f.iid, f.cid, a, b)
                    }
                    ])
                }
            } catch (g) {}
        };
        window.postMessage ? a.addEvent(window, "message", e) : window.navigator.STK_IFRAME_CONNECT_REG_OUT = function(a) {
            e({
                data: a
            })
        }
        ;
        return function(e) {
            if (!e)
                return !1;
            e.contentWindow.name = e.name = e.name || "iframe_" + a.getUniqueKey();
            if (e.name in b) {
                if (b[e.name] != e)
                    throw "iframe:" + e.name + " is existed! "
            } else {
                b[e.name] = e;
                c[e.name] = {};
                e.src = e.getAttribute("_src");
                e.removeAttribute("_src");
                e.contentWindow.name = e.name
            }
            return {
                trigger: function(a, b) {
                    d(e.name, "_EVENT_", a, b)
                },
                on: function(b, d) {
                    a.custEvent.define(c[e.name], b);
                    a.custEvent.add(c[e.name], b, d)
                },
                off: function(b, d) {
                    a.custEvent.remove(c[e.name], b, d)
                },
                destroy: function() {
                    a.custEvent.undefine(c[e.name]);
                    delete c[e.name];
                    delete b[e.name]
                }
            }
        }
    });
    STK.register("v6.pub.dialog.login", function(a) {
        var b = document.location.protocol == "https:" ? "https:" : "http:"
          , c = {
            DIALOG_FRAME: '<div class="Bv6_layer" node-type="outer"><div class="content" node-type="layoutContent"><div node-type="title" class="W_layer_title" style="cursor: move;"></div><div class="W_layer_close"><a node-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a></div><div class="layer_login_register_v2 clearfix" node-type="inner"> </div></div></div>',
            FRAME: '<div class="tab_bar"><a href="javascript:void(0);" node-type="login_tab" action-type="switch" action-data="tabname=login" class="cur">#L{帐号登录}</a><a href="javascript:void(0);" node-type="qrcode_tab" action-type="switch" action-data="tabname=qrcode" >#L{安全登录}</a><a style="display:none;" href="javascript:void(0);" node-type="message_tab" action-type="switch" action-data="tabname=message">#L{短信登录}</a></div><div node-type="qrcode_frame" style="display: none;"><div class="qrcode_con qrcode_con_hover"><img node-type="qrcode_src" style="width:180px;height:180px;"><div class="note S_txt1">#L{请用最新版微博客户端扫码}</div><div class="bg" node-type="qr_help"></div></div><div class="opacity_bg" node-type="qrcode_bg" style="display:none"></div><div node-type="qrcode_succ" class="result res_succ" style="display:none"><span class="W_icon icon_succB"></span><div class="res_info">#L{扫描成功，点击手机上的确认即可登录}</div></div><div node-type="qrcode_err" class="result res_error" style="display:none"><span class="W_icon icon_rederrorB"></span><div class="res_info">#L{出错了，}<a href="javascript:void(0);" action-type="change">#L{重新扫描}</a></div></div><div class="text_info W_tc"><a href="http://weibo.com/signup/signup.php" target="_blank" class="S_txt1">#L{立即注册}</a><a href="javascript:void(0);" action-type="switch" action-data="tabname=message" class="S_txt1">#L{短信登录}</a></div></div><div class="B_login form_login_register" node-type="login_frame" style="display: none;"><div node-type="prename_box"></div><div class="item username input_wrap" node-type="username_box"><input autocomplete="off" maxlength="128" tabindex="3" node-type="username" name="username" type="text" class="W_input" action-type="text_copy" action-data="text=#L{邮箱/会员帐号/手机号}" value="" /></div><div class="item password input_wrap" node-type="password_box"><input maxlength="24" tabindex="4" node-type="password" name="password" type="password" class="W_input" action-type="text_copy" value="" /><span class="enter_psw">#L{请输入密码}</span></div><div class="item weidun" style="display: none" node-type="vsncode_box"><input maxlength="6" tabindex="4" node-type="vsncode" name="vsncode" type="text" class="W_input" value="" action-type="text_copy" action-data="text=#L{请输入微盾动态码}"><a href="http://account.weibo.com/forgot/vdun" node-type="btn_vsncode_recover" class="S_txt1">微盾挂失</a></div><div class="item verify" style="display: none" node-type="verifycode_box"><input maxlength="6" tabindex="3" node-type="verifycode" name="verifycode" type="text" class="W_input" value="" action-type="text_copy" action-data="text=#L{验证码}"><a class="code" href="javascript:void(0);"><img node-type="verifycode_image" action-type="btn_change_verifycode" width="100" height="40" alt="" src=""></a><a node-type="btn_change_verifycode" action-type="btn_change_verifycode" href="javascript:void(0);" class="S_txt1">换一张</a></div><div class="item auto_login"><input type="checkbox" tabindex="5" id="login_form_savestate" checked="checked" node-type="savestate" type="checkbox"><label for="login_form_savestate" class="S_txt2">#L{下次自动登录}</label><span class="forget_psw"><a suda-data="key=tblog_weibologin3&value=click_forgetpwd" action-type="btn_password_recover" target="_blank" node-type="btn_password_recover" href="https://login.sina.com.cn/getpass.html?entry=weibo" target="_blank" class="S_txt2">忘记密码</a></span></div><div class="item_btn"><a class="W_btn_a btn_34px" tabindex="6" suda-data="key=tblog_weibologin3&value=click_sign" node-type="submitBtn" action-type="btn_submit" href="javascript:void(0)"><em>#L{登录}</em></a></div><div class="item_btn login_qq" node-type="qq_box"><a target="_blank" class="W_btn_b btn_34px" href="https://passport.weibo.com/othersitebind/authorize?entry=miniblog&site=qq' + (document.location.host == "krcom.cn" ? "&callback=" + b + "//krcom.cn" : "") + '"><i class="icon_qq"></i><em>#L{使用QQ直接登录}</em></a>' + "</div>" + '<div class="text_info W_tc">' + '<a href="http://weibo.com/signup/signup.php" target="_blank" class="S_txt1">#L{立即注册}</a>' + '<a href="javascript:void(0);" action-type="switch" action-data="tabname=message" class="S_txt1">#L{短信登录}</a>' + "</div>" + "</div>" + '<div class="B_login form_login_register" node-type="message_frame" style="display: none;">' + '<div class="item phone input_wrap" node-type="mobile_box">' + '<input type="text" class="W_input" autocomplete="off" value="" name="username" action-type="text_copy" action-data="text=#L{请输入您的手机号码}" node-type="mobile" no_cls="true">' + "</div>" + '<div class="item msg_code">' + '<a class="W_btn_b S_txt1" action-data="type=sendsms" node-type="btn_sms_activation" action-type="btn_sms_activation" href="javascript:void(0);">#L{获取短信验证码}</a><a node-type="btn_sms_activation_disable" href="javascript:void(0);" class="W_btn_b W_btn_b_disable" style="display:none"><em node-type="sms_timer">180</em>#L{秒后再获取短信}</a><input action-type="text_copy" class="W_input" type="text" action-data="text=#L{短信验证码}" maxlength="6" autocomplete="off" value="#L{短信验证码}" name="password" node-type="activation">' + "</div>" + '<div class="item auto_login">' + '<input type="checkbox" tabindex="5" id="message_form_savestate" checked="checked" node-type="savestate">' + '<label for="message_form_savestate" class="S_txt2">#L{下次自动登录}</label>' + "</div>" + '<div class="item_btn">' + '<a tabindex="6" suda-data="key=tblog_weibologin3&value=click_sign" node-type="submitBtn" action-type="btn_submit" class="W_btn_a btn_34px" href="javascript:void(0)"><em>#L{登录}</em></a>' + "</div>" + '<div class="item_btn login_qq">' + '<a target="_blank" class="W_btn_b btn_34px" href="https://passport.weibo.com/othersitebind/authorize?entry=miniblog&site=qq' + (document.location.host == "krcom.cn" ? "&callback=" + b + "//krcom.cn" : "") + '"><i class="icon_qq"></i><em>#L{使用QQ直接登录}</em></a>' + "</div>" + "</div>",
            MESSAGE_LOGIN_LINK: '<p class="info W_tr"><a href="http://weibo.com/#type=message" target="_blank">#L{短信验证码登录}</a></p>'
        }
          , d = window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com"
          , e = a.v6.conf.core.ui.dialog({
            template: c.DIALOG_FRAME,
            isHold: !0
        })
          , f = e.getDomList().inner;
        return function(b) {
            function q(a) {
                a = a || window.event;
                if (o(a, d.qrcode_src)) {
                    clearTimeout(n);
                    d.qr_help.style.display = "none"
                }
            }
            function p(a) {
                a = a || window.event;
                if (o(a, d.qrcode_src)) {
                    clearTimeout(n);
                    d.qr_help.style.display = "block"
                }
            }
            function o(a, b) {
                if (a && a.type != "mouseout" && a.type != "mouseover")
                    return !1;
                var c = a.relatedTarget ? a.relatedTarget : a.type == "mouseout" ? a.toElement : a.fromElement;
                while (c && c != b)
                    c = c.parentNode;
                return c != b
            }
            var d, g, h = null, i = null, j = null, k, l, m = {
                init: function() {
                    m.parseParam();
                    m.initPlugin();
                    m.show();
                    m.bind()
                },
                initPlugin: function() {
                    var a = "_loginLayer_" + (new Date).getTime();
                    window.FM && window.FM.setPlainHash ? FM.setPlainHash(a, !0) : location.hash = a
                },
                parseParam: function() {
                    c = a.common.extra.parseLanguage(c);
                    b = b || {}
                },
                show: function() {
                    e.setContent(a.core.util.templet(c.FRAME, {
                        MESSAGE_LOGIN_LINK: m.is.visitor() ? "" : c.MESSAGE_LOGIN_LINK
                    }) + m.extdata());
                    d = a.kit.dom.parseDOM(a.builder(f).list);
                    e.show();
                    m.handle.change("login")
                },
                bind: function() {
                    g = a.delegatedEvent(f);
                    for (var b in m.domEvts)
                        g.add(b, "click", m.domEvts[b]);
                    a.custEvent.add(e, "hide", function() {
                        h && h.destroy();
                        i && i.disable();
                        j && j.destroy();
                        g.remove("switch", "click", m.domEvts.change);
                        g.destroy();
                        l && l.destroy();
                        i = h = j = d = l = null;
                        a.custEvent.remove(e, "hide", arguments.callee);
                        window.$CONFIG.sinaSSOControllerTemporary = window.$CONFIG.sinaSSOControllerTemporary || {};
                        window.$CONFIG.sinaSSOControllerTemporary.lock = !1;
                        if (window.$CONFIG.sinaSSOControllerTemporary.oth) {
                            window.sinaSSOController.loginSuccessUrl && window.sinaSSOController.loginSuccessUrl.indexOf("comefrom=loginlayer") > -1 ? window.$CONFIG.sinaSSOControllerTemporary.top = window.sinaSSOController : window.$CONFIG.sinaSSOControllerTemporary.oth = window.sinaSSOController;
                            window.sinaSSOController = window.$CONFIG.sinaSSOControllerTemporary.oth
                        }
                    })
                },
                domEvts: {
                    "switch": function(b) {
                        a.preventDefault(b.evt);
                        m.handle.change(b.data.tabname)
                    },
                    changeTab: function() {
                        var a = arguments[2];
                        m.handle.change(a)
                    },
                    closeTip: function(b) {
                        a.preventDefault(b.evt);
                        var c = a.fixEvent(b.evt).target;
                        c.tagName.toLowerCase() == "a" && (b.el.style.display = "none")
                    }
                },
                handle: {
                    otherForm: function() {
                        a.kit.io.jsonp({
                            url: "//" + (window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com") + "/a/aj/bind/qlogin",
                            onComplete: function(b) {
                                if (b && b.code == "100000") {
                                    d.otherForm.innerHTML = b.data;
                                    a.setStyle(d.otherForm, "display", "")
                                }
                            }
                        }).request()
                    },
                    qrcodeForm: function() {
                        i || (i = a.v6.pub.login.qrcode(d.qrcode_frame, {
                            isLayer: !0
                        }));
                        i.enable();
                        m.handle.loginFocus()
                    },
                    loginForm: function() {
                        h || (h = a.v6.pub.login.form(d.login_frame));
                        m.handle.loginFocus()
                    },
                    messageForm: function() {
                        j || (j = a.v6.pub.login.message(d.message_frame));
                        m.handle.loginFocus()
                    },
                    loginFocus: function() {
                        var b = a.builder('<div style="height:0px;width:0px;font-size:0px;position:absolute;left:-9999px"><input node-type="loginFocus" type="text" /></div>');
                        a.core.dom.insertElement(f, b.box);
                        b.list.loginFocus[0].focus();
                        b.list.loginFocus[0].blur();
                        a.core.dom.removeNode(b.box);
                        b = null
                    },
                    change: function(b) {
                        b = b || "login";
                        a.foreach(["qrcode", "login", "message"], function(c) {
                            if (b === c) {
                                a.addClassName(d[c + "_tab"], "cur");
                                a.setStyle(d[c + "_frame"], "display", "")
                            } else {
                                a.removeClassName(d[c + "_tab"], "cur");
                                a.setStyle(d[c + "_frame"], "display", "none")
                            }
                        });
                        setTimeout(function() {
                            m.handle[b + "Form"]();
                            b != "qrcode" && i && i.disable();
                            b != "login" && h && a.custEvent.fire(h, "closeTip");
                            b != "message" && h && a.custEvent.fire(j, "disable")
                        }, 0)
                    }
                },
                is: {
                    visitor: function() {
                        return $CONFIG && $CONFIG.uid && $CONFIG.uid === "3655689037" ? !0 : !1
                    }
                },
                extdata: function() {
                    var b = '<img src="//rs.sinajs.cn/xdht.gif?lglayer=show&_rnd=' + (new Date).getTime()
                      , c = a.URL(decodeURI(window.location.href)).getParam("c");
                    c && (b = b + "&c=" + encodeURIComponent(c));
                    m.is.visitor() ? b = b + "&visitor=1" : b = b + "&visitor=0";
                    b = b + '" />';
                    return b
                }
            };
            m.init();
            var n;
            a.addEvent(d.qrcode_src, "mouseover", p);
            a.addEvent(d.qrcode_src, "mouseout", q);
            n = setTimeout(function() {
                d && d.qr_help && (d.qr_help.style.display = "none")
            }, 5e3);
            var r = {};
            return r
        }
    });
    STK.register("v6.pl.open.loginlayer.source.main", function(a) {
        var b = !1
          , c = !1;
        return function(d) {
            var e = {};
            e.parseParam = function() {
                d = a.core.obj.parseParam({
                    lang: "zh-cn",
                    opener: "",
                    currentTab: ""
                }, d || {});
                d.lang = d.lang || "zh-cn"
            }
            ;
            e.init = function() {
                e.parseParam();
                e.getVersion()
            }
            ;
            e.randVersion = function(a) {
                a = a || 16;
                var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                  , c = b.length
                  , d = [];
                for (var e = 0; e < a; e++)
                    d.push(b.charAt(Math.floor(Math.random() * c)));
                return d.join("")
            }
            ;
            e.getVersion = function() {
                var b = a.cookie.get("WBtopGlobal_register_version");
                if (b) {
                    d.version = b;
                    e.getVersionHandle()
                } else
                    a.v6.lib.kit.io.jsonp({
                        url: window.location.protocol + "//" + (window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com") + "/signup/v5/getjsversion",
                        onComplete: function(a) {
                            a.code == "100000" && a.data && a.data.version && (d.version = a.data.version);
                            e.getVersionHandle()
                        },
                        onFail: function(a) {
                            e.getVersionHandle()
                        },
                        onTimeout: function(a) {
                            e.getVersionHandle()
                        }
                    }).request()
            }
            ;
            e.getVersionHandle = function() {
                d.version || (d.version = e.randVersion());
                e.loadCss();
                a.cookie.set("WBtopGlobal_register_version", d.version, {
                    encode: !1
                })
            }
            ;
            e.loadCss = function() {
                b ? e.loadLanguage() : a.v6.lib.kit.io.cssLoader(a.v6.lib.kit.extra.cssPath().replace("t4", "t6").replace("t5", "t6") + "style/css/module/growth/layer_login_register_v2.css?version=" + d.version, "js_style_css_module_growth_layer_login_register_v2", function() {
                    b = !0;
                    e.loadLanguage()
                })
            }
            ;
            e.loadLanguage = function() {
                !c && d.lang != "zh-cn" ? a.core.io.scriptLoader({
                    timeout: 1e3,
                    url: a.v6.lib.kit.extra.jsPath().replace("t4", "t5") + "lang/jsloginlayer/mo/" + d.lang + ".js?version=" + d.version,
                    onComplete: function() {
                        c = !0;
                        e.showlayer()
                    },
                    onTimeout: e.showlayer
                }) : e.showlayer()
            }
            ;
            e.showlayer = function() {
                a.v6.pub.dialog.login(d)
            }
            ;
            e.init();
            return
        }
    });
    return function(b) {
        ssoConf = a.core.obj.parseParam({
            feedBackUrl: "",
            loginSuccessUrl: encodeURIComponent(window.location.href)
        }, b || {});
        ssoConf.loginSuccessUrl = "//" + (window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com") + "/login.php?url=" + (decodeURIComponent(ssoConf.loginSuccessUrl) == ssoConf.loginSuccessUrl ? encodeURIComponent(ssoConf.loginSuccessUrl) : ssoConf.loginSuccessUrl) + "&comefrom=loginlayer";
        var c = {
            plugins: {
                desktop: !0,
                login: !0,
                qrcode: !0
            },
            loginParam: ssoConf
        };
        a.v6.pl.open.loginlayer.source.pluginloader(c);
        return a.v6.pl.open.loginlayer.source.main(b)
    }
}());
