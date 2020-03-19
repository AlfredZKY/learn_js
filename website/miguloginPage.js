/*! Min - v2.1.0.2 - 2020-03-03 20:01:24 */
define("loginPage", ["lib/util/req_global_file", "lib/util/html", "lib/util/msg", "lib/util/selectbox", "lib/util/main", "lib/util/eye", "lib/util/imgslide", "lib/fingerprint/fingerprint", "lib/rsa/rsa", "lib/artDialog/jquery.artDialog", "lib/validform/core.source", "lib/util/placeholder"], function (a) {
        function b(a) {
            var b = $(".J_ValidOneForm"),
                c = b.find("input:submit");
            l.tip.ajaxloaded(c);
            var d = 5004 == a.status ? j.ajax.pollTimeoutError : 504 == a.status ? j.ajax.timeoutError : j.ajax.sysError;
            x.tipError(d)
        }

        function c() {
            var a = $("#J_PhoneOne");
            a.length > 0 && l.common.ajax({
                url: $(".J_ValidOneForm").attr("cmcc-rsaAjax"),
                async: !1,
                success: function (b) {
                    (b.status = j.ajax.SUCCESS) && a.each(function () {
                        var a = $(this),
                            c = new m.RSAKey;
                        c.setPublic(b.result.modulus, b.result.publicExponent);
                        var d = c.encrypt(a.val());
                        a.siblings(".J_RsaPhone").val(d)
                    })
                }
            });
            var d = {
                isAsync: !0
            };
            d[l.common.getCmccName(".J_RsaPhone")] = ".J_RsaPhone".val(),
                d[l.common.getCmccName("#sourceID")] = $("#sourceID").val(),
                l.common.ajax({
                    url: $(".J_ValidOneForm").attr("cmcc-pollAjax"),
                    data: d,
                    success: function (a) {
                        var d = $(".J_ValidOneForm"),
                            f = d.find("input:submit"),
                            g = $("#J_ImgCodeOne").parent();
                        if (a.status == j.ajax.SUCCESS)
                            l.tip.ajaxloaded(f),
                            window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token;
                        else if (a.status == j.ajax.LOGIN.IMGCODEERR)
                            l.tip.ajaxloaded(f),
                            g.is(":hidden") && D.addRule([{
                                ele: "#J_ImgCodeOne",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodeOne").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            g.show().find(".J_ImgCodeView img").trigger("click"),
                            x.tipError(a.message),
                            e();
                        else if (a.status == j.ajax.LOGIN.POLLING) {
                            var h = l.common.getCookie("polling_Cookie_One"),
                                i = (new Date).getTime();
                            h ? (h = parseInt(h, 10) - i,
                                h > 500 ? setTimeout(function () {
                                    c()
                                }, h > B ? B : h - 500) : b({
                                    status: 5004
                                })) : b({
                                status: 5004
                            })
                        } else
                            l.tip.ajaxloaded(f),
                            g.is(":visible") && g.find(".J_ImgCodeView img").trigger("click"),
                            x.tipError(a.message),
                            e()
                    },
                    error: b
                })
        }

        function d() {
            var a = l.common.getSecurityCode();
            $("#J_SecurityCode").val(a).siblings(".dynamiccode").find("span").text(a)
        }

        function e() {
            var a = Math.ceil($(".J_FormLogin").parent().height()),
                b = $("#J_ParentUrl").val();
            window.postMessage ? window.parent.postMessage(a, l.urlParame.getHost(b)) : window.parent.location.replace(l.urlParame.modifyHash(b, {
                height: a
            }))
        }

        function f(a) {
            var b = $(".J_Imgbox .J_ImgCodeView");
            if (!$(".j_imgdisplay").length > 0)
                return !1;
            if (0 == a)
                $(".J_Imgbox").hide(),
                l.common.setMsgDefault(["J_PhoneOne"], "J_GetMsgCodeOne"),
                b.find(".J_TypesHidden").remove();
            else {
                var c = "",
                    d = "";
                1 == a ? (c = b.parents(".overseas").length > 0 ? "请输入图中的结果" : "请输入右图计算结果",
                        d = b.find("img").attr("cmccnum-ajax"),
                        $.extend(D.dataType, {
                            imgcode: /^(?:[0-9]|[1-9][0-9])$/
                        }),
                        l.page.setImgType(0, !0)) : 3 == a ? l.page.setImgType(2, !0) : (c = b.parents(".overseas").length > 0 ? "请输入下图中的汉字" : "请输入右图中的汉字",
                        d = b.find("img").attr("cmccch-ajax"),
                        $.extend(D.dataType, {
                            imgcode: /^[\u4e00-\u9fa5]{2,4}$/
                        }),
                        l.page.setImgType(1, !0)),
                    $(".J_Imgbox #J_ImgCodeOne").attr("placeholder", c),
                    b.find("img").attr("cmcc-ajax", d).trigger("click"),
                    $(".J_Imgbox").show(),
                    l.common.setMsgDefault(["J_PhoneOne", "J_ImgCodeOne"], "J_GetMsgCodeOne");
                var e = $("#J_GetMsgCodeOne").data("msgValid");
                if (e.J_PhoneOne = 1,
                    D.addRule([{
                        ele: "#J_ImgCodeOne",
                        datatype: "imgcode",
                        ajaxurl: $("#J_ImgCodeOne").attr("cmcc-ajax"),
                        nullmsg: u.imgcode.nullmsg,
                        errormsg: u.imgcode.errormsg
                    }]),
                    $("[placeholder]").placeholder(k.placeholder),
                    b.parent().find(".J_TypesHidden").length > 0)
                    return !1;
                var f = b.find("img"),
                    g = f.attr("cmcc-ajax"),
                    h = l.urlParame.getValByKey(g, "imgcodeType");
                h.length > 0 && b.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + h + '"/>')
            }
        }

        function g(a, b) {
            var c = (new Date).getTime();
            return localStorage.setItem(a, JSON.stringify({
                data: b,
                time: c
            }))
        }

        function h(a, b) {
            var c = localStorage.getItem(a),
                d = JSON.parse(c);
            if (d) {
                if (!((new Date).getTime() - d.time > b)) {
                    var e = d.data,
                        f = d.time,
                        g = e + "&" + f;
                    return g
                }
                localStorage.removeItem("key1"),
                    localStorage.clear()
            }
        }

        function i() {
            var a = h("J_PhonNumber", 18e5),
                b = "";
            a && (b = a.split("&"),
                T = b[0],
                U = b[1]);
            var c = h("J_AccountNumber", 18e5),
                d = "";
            c && (d = c.split("&"),
                V = d[0],
                W = d[1])
        }
        a("lib/util/req_global_file");
        var j = a("lib/util/msg"),
            k = a("lib/util/html"),
            l = a("lib/util/main"),
            m = a("lib/rsa/rsa");
        a("lib/validform/core.source"),
            a("lib/util/placeholder");
        var n = function () {
            return -1 !== navigator.userAgent.toLowerCase().indexOf("micromessenger")
        }();
        if (n) {
            if ("" != $(".j_bannerurl").val() && $(".j_bannerurl").length > 0) {
                var o = $(".j_bannerurl").val();
                o = o.split(","),
                    $(".newlogin .banner-box").css({
                        background: "url(" + o[0] + ") no-repeat center top",
                        "background-size": "cover",
                        height: "460px",
                        "background-color": "" != o[1] ? o[1] : "#411775"
                    })
            }
        } else if ("" != $(".j_bannerurl").val() && $(".j_bannerurl").length > 0) {
            var o = $(".j_bannerurl").val();
            o = o.split(","),
                $(".newlogin .banner-box").css({
                    background: "url(" + o[0] + ") no-repeat center top",
                    height: "570px",
                    "background-color": "" != o[1] ? o[1] : "#411775"
                })
        }
        var p = $("#logintype").val();
        4 == p ? ($(".clearfix .accountLg").addClass("active").siblings(".msgLg").removeClass("active"),
                $(".J_ValidPsdForm").show()) : ($(".clearfix .msgLg").addClass("active"),
                $(".J_ValidOneForm").show()),
            j.validInfo.phone.errorcmccmsg = j.validInfo.phone.erroronemsg,
            a("lib/fingerprint/fingerprint"),
            l.page.saveFingerprint(),
            function () {
                var a = {},
                    b = navigator.userAgent;
                a.iphone = b.indexOf("iPhone") > -1,
                    a.ipod = b.indexOf("iPod") > -1,
                    a.ipad = b.indexOf("iPad") > -1,
                    a.nokiaN = b.indexOf("NokiaN") > -1,
                    /Win(?:dows )?([^do]{2})/.test(b),
                    a.winMobile = /^CE|Ph$/.test(RegExp.$1),
                    a.ios = 0 == navigator.platform.indexOf("Mac") && b.indexOf("Mobile") > -1,
                    a.android = b.indexOf("Android") > -1;
                var c = a.iphone || a.ipod || a.ipad || a.nokiaN || a.winMobile || a.ios || a.android;
                c && ($(".noform-item a").attr("target", "_self"),
                    $(".J_FormLogin").parent().css("padding-bottom", "300px"))
            }();
        var q = $(".J_FormLogin");
        l.valid.setDefault();
        var r, s, t, u = j.validInfo,
            v = function (a, b) {
                a.status == j.ajax.SUCCESS ? (a.status = "y",
                        a.info = "") : (a.status = "n",
                        a.info = j.ajax.imgError,
                        b.parent().find(".J_ImgCodeView img").trigger("click")),
                    b[0].validform_lastval = null
            },
            w = function (a, b, c) {
                if (!b.obj.is("form")) {
                    var d = l.common.createEleBySelector(b.obj, ".Validform_checktip", ".form-item:first", k.validMsg.span);
                    c(d, b.type);
                    var f = ["", "error", "success", "error", ""];
                    3 == b.type && d.html("" == a && 3 == b.type ? a : k.validMsg.q + a),
                        d.parent().removeClass(f[b.type - 1]).addClass(f[b.type]),
                        2 == b.type && d.remove(),
                        e();
                    var g = b.obj.attr("cmcc-btn"),
                        h = b.obj.parents("form:first");
                    if (g && !h.is("[isFormSubmit=1]")) {
                        var g = $("#" + g),
                            i = g.data("msgValid");
                        if (2 == b.type) {
                            i[b.obj.attr("id")] = 1;
                            var j = !0;
                            for (var m in i)
                                if (0 == i[m]) {
                                    j = !1;
                                    break
                                }
                            j ? /\d/.test(g.val()) || g.removeClass("disabled") : g.addClass("disabled")
                        } else
                            i[b.obj.attr("id")] = 0
                    }
                    3 == b.type && h.removeAttr("isFormSubmit")
                }
            },
            x = {
                tipErrorTime: void 0,
                tipMsgSucTime: void 0,
                tipMsgErrorTime: void 0,
                creatEle: function () {
                    var a = $(".J_FormLogin"),
                        b = a.find("#J_CommonMsg");
                    return b[0] || (b = $(k.validMsg.commonMsg),
                            a.append(b)),
                        b
                },
                createSpan: function (a) {
                    var b = a.parent(),
                        c = b.find(".Validform_checktip");
                    return c[0] || (c = $(k.validMsg.span),
                            b.append(c)),
                        c
                },
                creatReVerfyEle: function () {
                    var a = $("#J_ReVerfy"),
                        b = a.find(".J_ReVerfyMsg");
                    return b[0] || (b = $(k.validMsg.commonMsgReVerfy),
                            a.find("form").prepend(b)),
                        b
                },
                tipError: function (a, b, c) {
                    b = b || 2e3;
                    var d = this.creatEle().empty();
                    if (a.length > 24)
                        var e = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var e = $(k.validMsg.span).html("<q></q>" + a);
                    d.addClass("error J_LoginTipMark").append(e),
                        e = null,
                        c && (d.parent().removeAttr("style"),
                            d.siblings(".J_Tabs").children("ul").removeAttr("style"))
                },
                tipErrorReVerfy: function (a, b) {
                    b = b || 2e3;
                    var c = this.creatReVerfyEle().empty();
                    if (a.length > 24)
                        var d = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var d = $(k.validMsg.span).html("<q></q>" + a);
                    c.addClass("error J_LoginTipMark").append(d),
                        d = null
                },
                creatPhoneEle: function () {
                    var a = $("#J_BindPhone"),
                        b = a.find(".J_ReVerfyMsg");
                    return b[0] || (b = $(k.validMsg.commonMsgReVerfy),
                            a.find("form").prepend(b)),
                        b
                },
                tipErrorPhone: function (a, b) {
                    b = b || 2e3;
                    var c = this.creatPhoneEle().empty();
                    if (a.length > 24)
                        var d = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var d = $(k.validMsg.span).html("<q></q>" + a);
                    c.addClass("error J_LoginTipMark").append(d),
                        d = null
                },
                creatPassEle: function () {
                    var a = $("#H_Pass"),
                        b = a.find(".J_ReVerfyMsg");
                    return b[0] || (b = $(k.validMsg.commonMsgReVerfy),
                            a.find("form").prepend(b)),
                        b
                },
                tipErrorPass: function (a, b) {
                    b = b || 2e3;
                    var c = this.creatPassEle().empty();
                    if (a.length > 24)
                        var d = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var d = $(k.validMsg.span).html("<q></q>" + a);
                    c.addClass("error J_LoginTipMark").append(d),
                        d = null
                },
                creatVoiceEle: function () {
                    var a = $("#J_ReVoice"),
                        b = a.find(".J_ReVerfyMsg");
                    return b[0] || (b = $(k.validMsg.commonMsgReVerfy),
                            a.find("form").prepend(b)),
                        b
                },
                tipErrorReVoice: function (a, b) {
                    b = b || 2e3;
                    var c = this.creatVoiceEle().empty();
                    if (a.length > 24)
                        var d = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var d = $(k.validMsg.span).html("<q></q>" + a);
                    c.addClass("error J_LoginTipMark").append(d),
                        d = null
                },
                tipMsgSuccess: function (a, b, c) {
                    b = b || 2e3;
                    var d = this.createSpan(c);
                    d.parent().removeClass("error success").addClass("success").end().html(a)
                },
                tipMsgError: function (a, b, c) {
                    b = b || 2e3;
                    var d = this.createSpan(c);
                    d.parent().removeClass("error success").addClass("error").end().html("<q></q>" + a)
                }
            },
            y = $.extend(!0, {}, l.valid.config, {
                ajaxurl: {
                    success: v
                },
                tiptype: w,
                beforeSubmit: function (a) {
                    var b = l.page.getImgType();
                    if (2 == b.val && b.isRisk && b.isPreventImgSlide)
                        return l.page.setImgType(2, !0, !1),
                            l.page.imgCodeHandler(),
                            !1;
                    l.tip.ajaxloading(a.find("input:submit")),
                        a.removeAttr("isFormSubmit");
                    var c;
                    c = a.find(":password").not(".J_NoPsdEye").length > 0 && a.find("input[cmcc-type=password]").length > 0 ? a.find(":password,input[cmcc-type=password]").not(".J_NoPsdEye") : a.find(":password").not(".J_NoPsdEye").length > 0 && 0 == a.find("input[cmcc-type=password]").length ? a.find(":password").not(".J_NoPsdEye") : a.find("input[cmcc-type=password]");
                    var d = a.find("#J_AccountPsd"),
                        e = a.find(".J_FingerPrint,.J_FingerPrintDetail");
                    (c.length > 0 || d.length > 0 || e.length > 0) && l.common.ajax({
                        url: a.attr("cmcc-rsaAjax"),
                        async: !1,
                        success: function (a) {
                            if (a.status = j.ajax.SUCCESS) {
                                c.each(function () {
                                        var b = $(this),
                                            c = new m.RSAKey;
                                        c.setPublic(a.result.modulus, a.result.publicExponent);
                                        var d = c.encrypt(b.val());
                                        b.siblings(".J_RsaPsd").val(d)
                                    }),
                                    d.each(function () {
                                        var b = $(this),
                                            c = new m.RSAKey;
                                        c.setPublic(a.result.modulus, a.result.publicExponent);
                                        var d = c.encrypt(b.val());
                                        b.siblings(".J_RsaAccout").val(d)
                                    });
                                var b = l.page.rsaFingerprint(a.result.modulus, a.result.publicExponent);
                                e.filter(".J_FingerPrint").val(b.result).end().filter(".J_FingerPrintDetail").val(b.details)
                            }
                        }
                    })
                },
                callback: function (a) {
                    var b = $(".J_ValidPsdForm"),
                        c = b.find("input:submit");
                    l.tip.ajaxloaded(c);
                    var d = b.find(".cc .J_ImgCodeView"),
                        f = $("#J_ImgCodePsd").parent(),
                        h = l.page.getImgType(),
                        i = "",
                        m = "";
                    if (a.status == j.ajax.SUCCESS) {
                        var n = $("#J_AccountPsd").val();
                        g("J_AccountNumber", n),
                            window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token
                    } else if (a.status == j.ajax.LOGIN.IMGCODEERR)
                        2 == h.val && h.isRisk && l.page.setImgType(2, !0, !0),
                        f.is(":hidden") && z.addRule([{
                            ele: "#J_ImgCodePsd",
                            datatype: "imgcode",
                            ajaxurl: $("#J_ImgCodePsd").attr("cmcc-ajax"),
                            nullmsg: u.imgcode.nullmsg,
                            errormsg: u.imgcode.errormsg
                        }]),
                        f.show().find(".J_ImgCodeView img").trigger("click"),
                        x.tipError(a.message),
                        e();
                    else if (a.status == j.ajax.LOGIN.NOUPGRADE) {
                        2 == h.val && h.isRisk && l.page.setImgType(2, !0, !0),
                            x.tipError(j.ajax.loginNoUpgradeError, void 0, !0);
                        var o = $("#J_UpgradeUrl").val(),
                            p = o.indexOf("?") > -1 ? "&" : "?";
                        o += p + "platforms=" + a.result.platforms + "&loginid=" + $("#J_AccountPsd").val(),
                            b.parent().addClass("form-special").find(".J_LoginUpgradeUrl").attr("href", o),
                            f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                            e()
                    } else if (a.status == j.ajax.LOGIN.UNREG)
                        2 == h.val && h.isRisk && l.page.setImgType(2, !0, !0),
                        x.tipError(j.ajax.loginUnregError, void 0, !0),
                        b.parent().addClass("form-special").find(".J_LoginRegUrl").attr("href", $("#J_RegUrl").val()),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        e();
                    else if (a.status == j.ajax.LOGIN.REVERIFICATION)
                        $(".J_FormLogin").hide(),
                        $("#J_ReVerfy").show().find("#J_PhoneReVerfy").val(a.result.msisdnRSA).end().find("#J_GetMsgCodeReVerfy").removeClass("disabled").prop("disabled", !1).trigger("click"),
                        $("#J_ReVerfy").find(".J_PhoneReVerfyVal").text(a.result.msisdnHide),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.BINDPHONE)
                        $(".J_FormLogin").hide(),
                        $("#J_BindPhone").show(),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.REVOICE)
                        $(".J_FormLogin").hide(),
                        $("#J_ReVoice").show().find("#J_PhoneReVoice").val(a.result.msisdnRSA).end().find("#J_GetMsgCodeReVoice").removeClass("disabled").prop("disabled", !1).trigger("click"),
                        $("#J_ReVoice").find(".J_PhoneReVoiceVal").text(a.result.msisdnHide),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.EMAILBINDPHONE)
                        location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val());
                    else if (a.status == j.ajax.LOGIN.NUMIMG) {
                        if (l.page.setImgType(0, !0),
                            b.find(".cc").show(),
                            i = "请输入右图计算结果",
                            m = d.find("img").attr("cmccnum-ajax"),
                            $.extend(z.dataType, {
                                imgcode: /^(?:[0-9]|[1-9][0-9])$/
                            }),
                            z.addRule([{
                                ele: "#J_ImgCodePsd",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePsd").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            b.find(".cc #J_ImgCodePsd").attr("placeholder", i),
                            d.find("img").attr("cmcc-ajax", m).trigger("click"),
                            $("[placeholder]").placeholder(k.placeholder),
                            e(),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var q = d.find("img"),
                            r = q.attr("cmcc-ajax"),
                            s = l.urlParame.getValByKey(r, "imgcodeType");
                        s.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + s + '"/>')
                    } else if (a.status == j.ajax.LOGIN.CHIMG) {
                        if (l.page.setImgType(1, !0),
                            b.find(".cc").show(),
                            i = "请输入右图中的汉字",
                            m = d.find("img").attr("cmccch-ajax"),
                            $.extend(z.dataType, {
                                imgcode: /^[\u4e00-\u9fa5]{2,4}$/
                            }),
                            z.addRule([{
                                ele: "#J_ImgCodePsd",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePsd").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            b.find(".cc #J_ImgCodePsd").attr("placeholder", i),
                            d.find("img").attr("cmcc-ajax", m).trigger("click"),
                            $("[placeholder]").placeholder(k.placeholder),
                            e(),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var q = d.find("img"),
                            r = q.attr("cmcc-ajax"),
                            s = l.urlParame.getValByKey(r, "imgcodeType");
                        s.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + s + '"/>')
                    } else if (a.status == j.ajax.LOGIN.SLIDEIMG) {
                        if (l.page.setImgType(2, !0),
                            b.find(".cc").show(),
                            z.addRule([{
                                ele: "#J_ImgCodePsd",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePsd").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            d.find("img").trigger("click"),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var q = d.find("img"),
                            r = q.attr("cmcc-ajax") || q.attr("cmccnum-ajax"),
                            s = l.urlParame.getValByKey(r, "imgcodeType");
                        s.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + s + '"/>'),
                            e()
                    } else
                        2 == h.val && h.isRisk && l.page.setImgType(2, !0, !0),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        x.tipError(a.message),
                        e()
                }
            }),
            z = q.find(".J_ValidPsdForm").Validform(y),
            A = $("#J_AccountType").val();
        1 == A ? (r = "phone",
                s = u.loginAccount.errormsg_phoneand,
                t = "手机号") : 2 == A ? (r = "phone|email",
                s = u.loginAccount.errormsg_peand,
                t = "手机号/邮箱",
                $("#J_AccountPsd").dropdownbox()) : (r = "*",
                s = u.loginAccount.errormsg,
                t = "手机号/邮箱/用户名",
                $("#J_AccountPsd").dropdownbox()),
            $("#J_AccountPsd").attr("placeholder", t),
            z.addRule([{
                ele: "#J_AccountPsd",
                datatype: r,
                nullmsg: u.loginAccount.nullmsg,
                errormsg: s
            }, {
                ele: "#J_PasswordPsd",
                datatype: "*",
                nullmsg: u.psdvalid.nullmsg,
                errormsg: u.psdvalid.nullmsg
            }]),
            $("#J_ImgCodePsd").parent().is(function () {
                return "none" != this.style.display
            }) && (z.addRule([{
                    ele: "#J_ImgCodePsd",
                    datatype: "imgcode",
                    ajaxurl: $("#J_ImgCodePsd").attr("cmcc-ajax"),
                    nullmsg: u.imgcode.nullmsg,
                    errormsg: u.imgcode.errormsg
                }]),
                $("#J_ImgCodePsd").siblings(".J_ImgCodeView").children("a").trigger("click"));
        var B = 2e3;
        d();
        var C = $.extend(!0, {}, l.valid.config, {
                ajaxurl: {
                    success: v
                },
                tiptype: w,
                beforeSubmit: function (a) {
                    l.tip.ajaxloading(a.find("input:submit")),
                        a.removeAttr("isFormSubmit");
                    var b = a.find("#J_PhoneOne"),
                        c = a.find(".J_FingerPrint,.J_FingerPrintDetail");
                    (b.length > 0 || c.length > 0) && l.common.ajax({
                        url: a.attr("cmcc-rsaAjax"),
                        async: !1,
                        success: function (a) {
                            if (a.status = j.ajax.SUCCESS) {
                                b.each(function () {
                                    var b = $(this),
                                        c = new m.RSAKey;
                                    c.setPublic(a.result.modulus, a.result.publicExponent);
                                    var d = c.encrypt(b.val());
                                    b.siblings(".J_RsaPhone").val(d)
                                });
                                var d = l.page.rsaFingerprint(a.result.modulus, a.result.publicExponent);
                                c.filter(".J_FingerPrint").val(d.result).end().filter(".J_FingerPrintDetail").val(d.details)
                            }
                        }
                    })
                },
                callback: function (a) {
                    var b = $(".J_ValidOneForm"),
                        d = b.find("input:submit"),
                        f = $("#J_ImgCodeOne").parent();
                    return a.status == j.ajax.SUCCESS ? void(b.is("[isMsgAjax=1]") ? (l.tip.ajaxloaded(d),
                        window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token) : (l.common.setCookie("polling_Cookie_One", (new Date).getTime() + 6e4, 60),
                        c())) : void(a.status == j.ajax.LOGIN.IMGCODEERR ? (l.tip.ajaxloaded(d),
                        f.is(":hidden") && D.addRule([{
                            ele: "#J_ImgCodeOne",
                            datatype: "imgcode",
                            ajaxurl: $("#J_ImgCodeOne").attr("cmcc-ajax"),
                            nullmsg: u.imgcode.nullmsg,
                            errormsg: u.imgcode.errormsg
                        }]),
                        f.show().find(".J_ImgCodeView img").trigger("click"),
                        x.tipError(a.message),
                        e()) : a.status == j.ajax.LOGIN.MSGERROR ? (l.tip.ajaxloaded(d),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        x.tipMsgError(a.message, void 0, b.find("#J_GetMsgCodeOne")),
                        e()) : (l.tip.ajaxloaded(d),
                        a.status == j.ajax.LOGIN.NO_SIM_ABILITY && (D.unignore("#J_MsgCodeOne"),
                            b.attr({
                                action: b.attr("cmcc-msgAjax"),
                                isMsgAjax: "1"
                            }),
                            $("#J_SecurityCode").parent().hide(),
                            $("#J_GetMsgCodeOne").removeClass("disabled").prop("disabled", !1).parent().show().end().trigger("click"),
                            e()),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        x.tipError(a.message),
                        e()))
                }
            }),
            D = q.find(".J_ValidOneForm").attr("cmcc-oneAjax", function () {
                return $(this).attr("action")
            }).attr({
                action: q.find(".J_ValidOneForm").attr("cmcc-msgAjax"),
                isMsgAjax: "1"
            }).Validform(C);
        D.addRule([{
                ele: "#J_PhoneOne",
                datatype: "phone",
                nullmsg: u.phone.nullmsg,
                errormsg: u.phone.errormsg
            }, {
                ele: "#J_MsgCodeOne",
                datatype: "msgcode",
                nullmsg: u.msgcode.nullmsg,
                errormsg: u.msgcode.errormsg
            }]).ignore("#J_MsgCodeOne"),
            $("#J_ImgCodeOne").parent().is(function () {
                return "none" != this.style.display
            }) && (D.addRule([{
                    ele: "#J_ImgCodeOne",
                    datatype: "imgcode",
                    ajaxurl: $("#J_ImgCodeOne").attr("cmcc-ajax"),
                    nullmsg: u.imgcode.nullmsg,
                    errormsg: u.imgcode.errormsg
                }]),
                $("#J_ImgCodeOne").siblings(".J_ImgCodeView").children("a").trigger("click")),
            $("#J_MsgCodeOne").parent().is(function () {
                return "none" != this.style.display
            }) && D.unignore("#J_MsgCodeOne");
        var E = $.extend(!0, {}, l.valid.config, {
                ajaxurl: {
                    success: v
                },
                tiptype: w,
                beforeSubmit: function (a) {
                    var b = l.page.getImgType();
                    if (2 == b.val && b.isRisk && b.isPreventImgSlide)
                        return l.page.setImgType(2, !0, !1),
                            l.page.imgCodeHandler(),
                            !1;
                    l.tip.ajaxloading(a.find("input:submit")),
                        a.removeAttr("isFormSubmit");
                    var c;
                    c = a.find(":password").not(".J_NoPsdEye").length > 0 && a.find("input[cmcc-type=password]").length > 0 ? a.find(":password,input[cmcc-type=password]").not(".J_NoPsdEye") : a.find(":password").not(".J_NoPsdEye").length > 0 && 0 == a.find("input[cmcc-type=password]").length ? a.find(":password").not(".J_NoPsdEye") : a.find("input[cmcc-type=password]");
                    var d = a.find("#J_AccountPass"),
                        e = a.find(".J_FingerPrint,.J_FingerPrintDetail");
                    (c.length > 0 || d.length > 0 || e.length > 0) && l.common.ajax({
                        url: a.attr("cmcc-rsaAjax"),
                        async: !1,
                        success: function (a) {
                            if (a.status = j.ajax.SUCCESS) {
                                c.each(function () {
                                        var b = $(this),
                                            c = new m.RSAKey;
                                        c.setPublic(a.result.modulus, a.result.publicExponent);
                                        var d = c.encrypt(b.val());
                                        b.siblings(".J_RsaPsd").val(d)
                                    }),
                                    d.each(function () {
                                        var b = $(this),
                                            c = new m.RSAKey;
                                        c.setPublic(a.result.modulus, a.result.publicExponent);
                                        var d = c.encrypt(b.val());
                                        b.siblings(".J_RsaPass").val(d)
                                    });
                                var b = l.page.rsaFingerprint(a.result.modulus, a.result.publicExponent);
                                e.filter(".J_FingerPrint").val(b.result).end().filter(".J_FingerPrintDetail").val(b.details)
                            }
                        }
                    })
                },
                callback: function (a) {
                    var b = $(".J_ValidPassForm"),
                        c = b.find("input:submit");
                    l.tip.ajaxloaded(c);
                    var d = b.find(".cc .J_ImgCodeView"),
                        f = $("#J_ImgCodePass").parent(),
                        g = l.page.getImgType(),
                        h = "",
                        i = "";
                    if (a.status == j.ajax.SUCCESS)
                        window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token;
                    else if (a.status == j.ajax.LOGIN.IMGCODEERR)
                        2 == g.val && g.isRisk && l.page.setImgType(2, !0, !0),
                        f.is(":hidden") && F.addRule([{
                            ele: "#J_ImgCodePass",
                            datatype: "imgcode",
                            ajaxurl: $("#J_ImgCodePass").attr("cmcc-ajax"),
                            nullmsg: u.imgcode.nullmsg,
                            errormsg: u.imgcode.errormsg
                        }]),
                        f.show().find(".J_ImgCodeView img").trigger("click"),
                        x.tipErrorPass(a.message),
                        e();
                    else if (a.status == j.ajax.LOGIN.NOUPGRADE) {
                        2 == g.val && g.isRisk && l.page.setImgType(2, !0, !0),
                            x.tipErrorPass(j.ajax.loginNoUpgradeError, void 0, !0);
                        var m = $("#J_UpgradeUrl").val(),
                            n = m.indexOf("?") > -1 ? "&" : "?";
                        m += n + "platforms=" + a.result.platforms + "&loginid=" + $("#J_AccountPass").val(),
                            b.parent().addClass("form-special").find(".J_LoginUpgradeUrl").attr("href", m),
                            f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                            e()
                    } else if (a.status == j.ajax.LOGIN.UNREG)
                        2 == g.val && g.isRisk && l.page.setImgType(2, !0, !0),
                        x.tipErrorPass(j.ajax.loginUnregError, void 0, !0),
                        b.parent().addClass("form-special").find(".J_LoginRegUrl").attr("href", $("#J_RegUrl").val()),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        e();
                    else if (a.status == j.ajax.LOGIN.REVERIFICATION)
                        $(".J_FormPass").hide(),
                        $("#J_ReVerfy").show().end().find("#J_GetMsgCodeReVerfy").removeClass("disabled").prop("disabled", !1).trigger("click"),
                        $("#J_ReVerfy").find(".J_PhoneReVerfyVal").text(a.result.msisdnHide),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.BINDPHONE)
                        $(".J_FormPass").hide(),
                        $("#J_BindPhone").show(),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.REVOICE)
                        $(".J_FormPass").hide(),
                        $("#J_ReVoice").show().find("#J_GetMsgCodeReVoice").removeClass("disabled").prop("disabled", !1).trigger("click"),
                        $("#J_ReVoice").find(".J_PhoneReVoiceVal").text(a.result.msisdnHide),
                        $("[placeholder]").placeholder(k.placeholder),
                        e();
                    else if (a.status == j.ajax.LOGIN.EMAILBINDPHONE)
                        location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val());
                    else if (a.status == j.ajax.LOGIN.NUMIMG) {
                        if (l.page.setImgType(0, !0),
                            b.find(".cc").show(),
                            h = "请输入右图计算结果",
                            i = d.find("img").attr("cmccnum-ajax"),
                            $.extend(F.dataType, {
                                imgcode: /^(?:[0-9]|[1-9][0-9])$/
                            }),
                            F.addRule([{
                                ele: "#J_ImgCodePass",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePass").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            b.find(".cc #J_ImgCodePass").attr("placeholder", h),
                            d.find("img").attr("cmcc-ajax", i).trigger("click"),
                            $("[placeholder]").placeholder(k.placeholder),
                            e(),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var o = d.find("img"),
                            p = o.attr("cmcc-ajax"),
                            q = l.urlParame.getValByKey(p, "imgcodeType");
                        q.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + q + '"/>')
                    } else if (a.status == j.ajax.LOGIN.CHIMG) {
                        if (l.page.setImgType(1, !0),
                            b.find(".cc").show(),
                            h = "请输入右图中的汉字",
                            i = d.find("img").attr("cmccch-ajax"),
                            $.extend(F.dataType, {
                                imgcode: /^[\u4e00-\u9fa5]{2,4}$/
                            }),
                            F.addRule([{
                                ele: "#J_ImgCodePass",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePass").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            b.find(".cc #J_ImgCodePass").attr("placeholder", h),
                            d.find("img").attr("cmcc-ajax", i).trigger("click"),
                            $("[placeholder]").placeholder(k.placeholder),
                            e(),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var o = d.find("img"),
                            p = o.attr("cmcc-ajax"),
                            q = l.urlParame.getValByKey(p, "imgcodeType");
                        q.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + q + '"/>')
                    } else if (a.status == j.ajax.LOGIN.SLIDEIMG) {
                        if (l.page.setImgType(2, !0),
                            b.find(".cc").show(),
                            F.addRule([{
                                ele: "#J_ImgCodePass",
                                datatype: "imgcode",
                                ajaxurl: $("#J_ImgCodePass").attr("cmcc-ajax"),
                                nullmsg: u.imgcode.nullmsg,
                                errormsg: u.imgcode.errormsg
                            }]),
                            d.find("img").trigger("click"),
                            d.parent().find(".J_TypesHidden").length > 0)
                            return !1;
                        var o = d.find("img"),
                            p = o.attr("cmcc-ajax") || o.attr("cmccnum-ajax"),
                            q = l.urlParame.getValByKey(p, "imgcodeType");
                        q.length > 0 && d.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + q + '"/>'),
                            e()
                    } else
                        2 == g.val && g.isRisk && l.page.setImgType(2, !0, !0),
                        f.is(":visible") && f.find(".J_ImgCodeView img").trigger("click"),
                        x.tipErrorPass(a.message),
                        e()
                }
            }),
            F = $("#H_Pass").find(".J_ValidPassForm").Validform(E);
        F.addRule([{
                ele: "#J_AccountPass",
                datatype: "phone",
                nullmsg: u.phone.nullmsg,
                errormsg: u.phone.errormsg
            }, {
                ele: "#P_PasswordPsd",
                datatype: "*",
                nullmsg: u.psdvalid.nullmsg,
                errormsg: u.psdvalid.nullmsg
            }]),
            $("#J_ImgCodePsd").parent().is(function () {
                return "none" != this.style.display
            }) && (F.addRule([{
                    ele: "#J_ImgCodePass",
                    datatype: "imgcode",
                    ajaxurl: $("#J_ImgCodePass").attr("cmcc-ajax"),
                    nullmsg: u.imgcode.nullmsg,
                    errormsg: u.imgcode.errormsg
                }]),
                $("#J_ImgCodePass").siblings(".J_ImgCodeView").children("a").trigger("click"));
        var G = $.extend(!0, {}, l.valid.config, {
                tiptype: w,
                callback: function (a) {
                    var b = $("#J_ReVerfy").find("form"),
                        c = b.find("input:submit");
                    a.status == j.ajax.SUCCESS ? (l.tip.ajaxloaded(c),
                        c.val("验证成功").attr("disabled", "disabled"),
                        l.page.successSubmit(c),
                        setTimeout(function () {
                            window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token
                        }, 2e3)) : (l.tip.ajaxloaded(c),
                        x.tipErrorReVerfy(a.message),
                        e())
                }
            }),
            H = $("#J_ReVerfy").find("form").Validform(G);
        H.addRule([{
            ele: "#J_MsgCodeReVerfy",
            datatype: "msgcode",
            nullmsg: u.msgcode.nullmsg,
            errormsg: u.msgcode.errormsg
        }]);
        var I;
        l.common.setMsgDefault(["J_PhoneOne"], "J_GetMsgCodeOne"),
            $("#J_GetMsgCodeOne").click(function () {
                var a = $,
                    b = a(this);
                setTimeout(function () {
                    if (b.hasClass("disabled"))
                        return !1;
                    var c = l.page.getImgType();
                    if (2 == c.val && c.isRisk && c.isPreventImgSlide)
                        return l.page.setImgType(2, !0, !1),
                            void l.page.imgCodeHandler();
                    var d = a("#J_PhoneOne");
                    d.length > 0 && l.common.ajax({
                        url: b.attr("cmcc-rsaAjax"),
                        async: !1,
                        success: function (a) {
                            (a.status = j.ajax.SUCCESS) && d.each(function () {
                                var b = $(this),
                                    c = new m.RSAKey;
                                c.setPublic(a.result.modulus, a.result.publicExponent);
                                var d = c.encrypt(b.val());
                                b.siblings(".J_RsaPhone").val(d)
                            })
                        }
                    });
                    var g = a(".J_RsaPhone").val(),
                        h = {
                            isAsync: !0
                        };
                    I = null,
                        I = l.common.buttonSecond(b, 60),
                        h[l.common.getCmccName(".J_RsaPhone")] = g,
                        h[l.common.getCmccName("#J_ImgCodeOne")] = $("#J_ImgCodeOne").val(),
                        h[l.common.getCmccName("#sourceID")] = $("#sourceID").val(),
                        h.imgcodeType = b.parents("form:first").find(".J_TypesHidden").val();
                    var i = l.page.getFingerRsaParams(b.attr("cmcc-rsaAjax"));
                    h[$(".J_FingerPrint").attr("name")] = i.result,
                        h[$(".J_FingerPrintDetail").attr("name")] = i.details;
                    var k = "" == h.fingerPrint || "" == h.fingerPrintDetail;
                    l.common.ajax({
                        url: b.attr("cmcc-ajax"),
                        data: h,
                        success: function (c) {
                            var d = a("#J_ImgCodeOne").parent(),
                                g = l.page.getImgType();
                            c.status == j.ajax.SUCCESS ? (x.tipMsgSuccess(c.message, void 0, b),
                                b.parent().removeClass("ajaxerror"),
                                b.siblings(".J_MsgCodeID").val(c.result.captchaId).end().siblings(".txt").focus(),
                                b.data("isLastTrue", !0)) : k ? (x.tipError("网络异常，请点击登录重试"),
                                e()) : c.status == j.ajax.LOGIN.IMGCODEERR ? (2 == g.val && g.isRisk && (b.data("isLastTrue") ? b.data("isLastTrue", !1) : l.page.setImgType(2, !0, !0)),
                                d.is(":hidden") && D.addRule([{
                                    ele: "#J_ImgCodeOne",
                                    datatype: "imgcode",
                                    ajaxurl: a("#J_ImgCodeOne").attr("cmcc-ajax"),
                                    nullmsg: u.imgcode.nullmsg,
                                    errormsg: u.imgcode.errormsg
                                }]),
                                d.show().find(".J_ImgCodeView img").trigger("click"),
                                I.stop(),
                                x.tipError(c.message),
                                b.parent().addClass("ajaxerror"),
                                e()) : c.status == j.ajax.LOGIN.NUMIMG ? (I.stop(),
                                f(1),
                                b.parent().addClass("ajaxerror"),
                                e()) : c.status == j.ajax.LOGIN.CHIMG ? (I.stop(),
                                f(2),
                                b.parent().addClass("ajaxerror"),
                                e()) : c.status == j.ajax.LOGIN.SLIDEIMG ? (I.stop(),
                                f(3),
                                b.parent().addClass("ajaxerror"),
                                b.data("isLastTrue", !1)) : c.status == j.ajax.LOGIN.CMBLACKLIST || c.status == j.ajax.LOGIN.UNCMBLACKLIST ? (2 == g.val && g.isRisk && (b.data("isLastTrue") ? b.data("isLastTrue", !1) : l.page.setImgType(2, !0, !0)),
                                d.is(":visible") && d.find(".J_ImgCodeView img").trigger("click"),
                                I.stop(),
                                x.tipError(c.message),
                                e()) : (2 == g.val && g.isRisk && (b.data("isLastTrue") ? b.data("isLastTrue", !1) : l.page.setImgType(2, !0, !0)),
                                d.is(":visible") && d.find(".J_ImgCodeView img").trigger("click"),
                                I.stop(),
                                c.status == j.ajax.PLATFORM.ISVISIBLE ? x.tipMsgError(c.message, void 0, $("#J_PhoneOne")) : x.tipError(c.message),
                                b.parent().addClass("ajaxerror"),
                                $(".J_Imgbox").is(":visible") || b.removeClass("disabled"),
                                e())
                        },
                        error: function () {
                            I.stop(),
                                x.tipMsgError(j.ajax.sysError, void 0, b)
                        }
                    })
                }, 300)
            });
        var J;
        l.common.setMsgDefault(["J_PhoneReVerfy"], "J_GetMsgCodeReVerfy"),
            $("#J_GetMsgCodeReVerfy").click(function () {
                var a = $,
                    b = a(this);
                if (b.hasClass("disabled"))
                    return !1;
                var c = a("#J_PhoneReVerfy").val(),
                    d = {
                        isAsync: !0
                    };
                !!J && J.stop(),
                    J = null,
                    J = l.common.buttonSecond(b, 60),
                    d[l.common.getCmccName("#J_PhoneReVerfy")] = c,
                    d[l.common.getCmccName("#J_SouceIDReVerfy")] = a("#J_SouceIDReVerfy").val();
                var f = l.page.getFingerRsaParams(b.attr("cmcc-rsaAjax"));
                d[$(".J_FingerPrint").attr("name")] = f.result,
                    d[$(".J_FingerPrintDetail").attr("name")] = f.details;
                var g = "" == d.fingerPrint || "" == d.fingerPrintDetail;
                l.common.ajax({
                    url: b.attr("cmcc-ajax"),
                    data: d,
                    success: function (a) {
                        if (b.parent().removeAttr("style").find(".Validform_checktip").removeAttr("style"),
                            a.status == j.ajax.SUCCESS)
                            x.tipMsgSuccess(a.message, void 0, b),
                            b.parent().removeClass("ajaxerror"),
                            b.siblings(".J_MsgCodeID").val(a.result.captchaId).end().siblings(".txt").focus();
                        else if (g)
                            x.tipErrorReVerfy("网络异常，请点击登录重试"),
                            e();
                        else {
                            J.stop(),
                                x.tipErrorReVerfy(a.message),
                                b.parent().addClass("ajaxerror");
                            var c = b.siblings(".Validform_checktip"),
                                d = c.width(),
                                f = c.parent().width(),
                                h = 21 * Math.ceil(d / f);
                            d > f && c.css({
                                    right: "0",
                                    width: "100%",
                                    "white-space": "normal",
                                    height: h + "px",
                                    "line-height": "1.5"
                                }).parent().css({
                                    "margin-bottom": 16 + h + "px"
                                }),
                                e()
                        }
                    },
                    error: function () {
                        J.stop(),
                            x.tipErrorReVerfy("网络异常，请点击登录重试")
                    }
                })
            }),
            $("#J_MsgCodeOne,#J_MsgCodeReVerfy").on("blur", function () {
                this.validform_lastval = null
            }),
            q.find(".J_Tabs").click(function (a) {
                var b = $(a.target).closest("li");
                if (b[0]) {
                    var c = $(this);
                    if (c.find("li").removeClass("active").end().siblings("form").hide().eq(b.index()).show(),
                        b.addClass("active"),
                        c.siblings(".J_LoginTipMark").empty(),
                        e(),
                        1 == b.index() && "" != $("#J_PhoneOne").val()) {
                        var d = $("#J_PhoneOne").val();
                        $("#J_PhoneOne").val("").focus().val(d)
                    }
                    $("[placeholder]").placeholder(k.placeholder)
                }
            }),
            $("#J_ReVerfy,#J_BindPhone,#J_ReVoice,#H_Pass").find(".J_Back").on("click", function () {
                return $(".J_FormLogin").show(),
                    $("#J_ReVerfy,#J_BindPhone,#J_ReVoice,#H_Pass").hide().find(".J_ReVerfyMsg").empty(),
                    e(),
                    !1
            }),
            q = null,
            e();
        var K;
        l.common.setMsgDefault(["J_Phone"], "J_GetMsgCodePhone");
        var L = $.extend(!0, {}, l.valid.config, {
                tiptype: w,
                beforeSubmit: function (a) {
                    Util.tip.ajaxloading(a.find("input:submit")),
                        a.removeAttr("isFormSubmit");
                    var b = a.find("#J_Phone"),
                        c = a.find(".J_FingerPrint,.J_FingerPrintDetail");
                    (b.length > 0 || c.length > 0) && l.common.ajax({
                        url: a.attr("cmcc-rsaAjax"),
                        async: !1,
                        success: function (a) {
                            if (a.status = j.ajax.SUCCESS) {
                                b.each(function () {
                                    var b = $(this),
                                        c = new m.RSAKey;
                                    c.setPublic(a.result.modulus, a.result.publicExponent);
                                    var d = c.encrypt(b.val());
                                    b.siblings(".J_RsaPhoneNm").val(d)
                                });
                                var d = l.page.rsaFingerprint(a.result.modulus, a.result.publicExponent);
                                c.filter(".J_FingerPrint").val(d.result).end().filter(".J_FingerPrintDetail").val(d.details)
                            }
                        }
                    })
                },
                callback: function (a) {
                    var b = $("#J_BindPhone").find("form"),
                        c = b.find("input:submit");
                    a.status == j.ajax.SUCCESS ? (l.tip.ajaxloaded(c),
                        c.val("绑定成功").attr("disabled", "disabled"),
                        l.page.successSubmit(c),
                        setTimeout(function () {
                            window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token
                        }, 2e3)) : (l.tip.ajaxloaded(c),
                        x.tipErrorPhone(a.message),
                        e())
                }
            }),
            M = $("#J_BindPhone").find("form").Validform(L);
        M.addRule([{
                ele: "#J_Phone",
                datatype: "phone",
                nullmsg: u.phone.nullmsg,
                errormsg: u.phone.errormsg
            }, {
                ele: "#J_MsgCodePhone",
                datatype: "msgcode",
                nullmsg: u.msgcode.nullmsg,
                errormsg: u.msgcode.errormsg
            }]),
            $("#J_GetMsgCodePhone").click(function () {
                var a = $,
                    b = a(this);
                if (b.hasClass("disabled"))
                    return !1;
                var c = a("#J_Phone");
                c.length > 0 && l.common.ajax({
                    url: b.attr("cmcc-rsaAjax"),
                    async: !1,
                    success: function (a) {
                        (a.status = j.ajax.SUCCESS) && c.each(function () {
                            var b = $(this),
                                c = new m.RSAKey;
                            c.setPublic(a.result.modulus, a.result.publicExponent);
                            var d = c.encrypt(b.val());
                            b.siblings(".J_RsaPhone").val(d)
                        })
                    }
                });
                var d = a(".J_RsaPhone").val(),
                    f = {
                        isAsync: !0
                    };
                !!K && K.stop(),
                    K = null,
                    K = l.common.buttonSecond(b, 60),
                    f[l.common.getCmccName(".J_RsaPhone")] = d,
                    f[l.common.getCmccName("#J_SouceIDPhone")] = a("#J_SouceIDPhone").val();
                var g = l.page.getFingerRsaParams(b.attr("cmcc-rsaAjax"));
                f[$(".J_FingerPrint").attr("name")] = g.result,
                    f[$(".J_FingerPrintDetail").attr("name")] = g.details;
                var h = "" == f.fingerPrint || "" == f.fingerPrintDetail;
                l.common.ajax({
                    url: b.attr("cmcc-ajax"),
                    data: f,
                    success: function (a) {
                        if (b.parent().removeAttr("style").find(".Validform_checktip").removeAttr("style"),
                            a.status == j.ajax.SUCCESS)
                            x.tipMsgSuccess(a.message, void 0, b),
                            b.parent().removeClass("ajaxerror"),
                            b.siblings(".J_MsgCodeID").val(a.result.captchaId).end().siblings(".txt").focus();
                        else if (a.status == j.ajax.PLATFORM.ISVISIBLE)
                            K.stop(),
                            x.tipMsgError(a.message, void 0, $("#J_BindPhone #J_Phone")),
                            e();
                        else if (h)
                            K.stop(),
                            x.tipMsgError("网络异常，请点击登录重试"),
                            e();
                        else {
                            K.stop(),
                                x.tipErrorPhone(a.message),
                                b.parent().addClass("ajaxerror");
                            var c = b.siblings(".Validform_checktip"),
                                d = c.width(),
                                f = c.parent().width(),
                                g = 21 * Math.ceil(d / f);
                            d > f && c.css({
                                    right: "0",
                                    width: "100%",
                                    "white-space": "normal",
                                    height: g + "px",
                                    "line-height": "1.5"
                                }).parent().css({
                                    "margin-bottom": 16 + g + "px"
                                }),
                                e()
                        }
                    },
                    error: function () {
                        K.stop(),
                            x.tipErrorPhone(j.ajax.sysError, void 0, b)
                    }
                })
            });
        var N;
        l.common.setMsgDefault(["J_PhoneReVoice"], "J_GetMsgCodeReVoice");
        var O = $.extend(!0, {}, l.valid.config, {
                tiptype: w,
                callback: function (a) {
                    var b = $("#J_ReVoice").find("form"),
                        c = b.find("input:submit");
                    a.status == j.ajax.SUCCESS ? (l.tip.ajaxloaded(c),
                        c.val("验证成功").attr("disabled", "disabled"),
                        l.page.successSubmit(c),
                        setTimeout(function () {
                            window.location.href = l.urlParame.modifyUrlBySearch(a.result.redirectURL) + "callbackURL=" + encodeURIComponent($("#callbackURL").val()) + "&relayState=" + encodeURIComponent($("#relayState").val()) + "&token=" + a.result.token
                        }, 2e3)) : (l.tip.ajaxloaded(c),
                        x.tipErrorReVoice(a.message),
                        e())
                }
            }),
            P = $("#J_ReVoice").find("form").Validform(O);
        P.addRule([{
                ele: "#J_MsgCodeReVoice",
                datatype: "msgcode",
                nullmsg: u.voicecode.nullmsg,
                errormsg: u.voicecode.errormsg
            }]),
            $("#J_GetMsgCodeReVoice").click(function () {
                var a = $,
                    b = a(this);
                if (b.hasClass("disabled"))
                    return !1;
                var c = a("#J_PhoneReVoice").val(),
                    d = {
                        isAsync: !0
                    };
                !!N && N.stop(),
                    N = null,
                    N = l.common.buttonSecond(b, 60),
                    d[l.common.getCmccName("#J_PhoneReVoice")] = c,
                    d[l.common.getCmccName("#J_SouceIDReVoice")] = a("#J_SouceIDReVoice").val(),
                    l.common.ajax({
                        url: b.attr("cmcc-ajax"),
                        data: d,
                        success: function (a) {
                            if (b.parent().removeAttr("style").find(".Validform_checktip").removeAttr("style"),
                                a.status == j.ajax.SUCCESS)
                                x.tipMsgSuccess(a.message, void 0, b),
                                b.parent().removeClass("ajaxerror"),
                                b.siblings(".J_MsgCodeID").val(a.result.captchaId).end().siblings(".txt").focus();
                            else {
                                N.stop(),
                                    x.tipErrorReVoice(a.message),
                                    b.parent().addClass("ajaxerror");
                                var c = b.siblings(".Validform_checktip"),
                                    d = c.width(),
                                    f = c.parent().width(),
                                    g = 21 * Math.ceil(d / f);
                                d > f && c.css({
                                        right: "0",
                                        width: "100%",
                                        "white-space": "normal",
                                        height: g + "px",
                                        "line-height": "1.5"
                                    }).parent().css({
                                        "margin-bottom": 16 + g + "px"
                                    }),
                                    e()
                            }
                        },
                        error: function () {
                            N.stop(),
                                x.tipErrorReVoice(j.ajax.sysError)
                        }
                    })
            }),
            $("#J_IsRemPsd").checkbox().click(function () {
                $("#J_RemPsd").val($(this).prop("checked") ? 1 : 0)
            }),
            f(parseInt($(".j_imgdisplay").val(), 10)),
            l.page.dynamicHandler = function () {
                $(".J_ValidPsdForm").is(":visible") ? $(".J_ValidPsdForm").find("input:submit").trigger("click") : $("#J_GetMsgCodeOne").trigger("click")
            },
            $(".hpass").click(function () {
                $(".J_FormLogin").hide(),
                    $("#H_Pass").show(),
                    e()
            }),
            $("#J_UPsdDoor").on("click", function () {
                return l.common.ajax({
                        url: $(this).attr("cmcc-ajax"),
                        async: !1,
                        type: "get",
                        success: function (a) {
                            if (a.status == j.ajax.SUCCESS) {
                                var b = $("#openPage").val();
                                1 == b ? window.location.href = a.result.redirect : window.open(a.result.redirect)
                            }
                        }
                    }),
                    !1
            });
        var Q = $("#J_PhoneOne"),
            R = /^1[0-9]{10}$/;
        Q.bind("input propertychange", function () {
            var a = Q.val();
            a && R.test(a) && g("J_PhonNumber", a)
        });
        var S = $("#J_AccountPsd");
        S.bind("input propertychange", function () {
            var a = S.val();
            a && g("J_AccountNumber", a)
        });
        var T = "",
            U = "",
            V = "",
            W = "";
        $(".msgLg").click(function () {
                i(),
                    Q.val(V && R.test(V) && W > U ? V : T)
            }),
            $(".accountLg").click(function () {
                i(),
                    S.val(V ? R.test(V) && W > U ? V : R.test(V) && U > W ? T : V : T)
            }),
            $(document).ready(function () {
                i(),
                    V ? R.test(V) && W > U ? (Q.val(V),
                        S.val(V)) : R.test(V) && U > W ? (Q.val(T),
                        S.val(T)) : (Q.val(T),
                        S.val(V)) : (Q.val(T),
                        S.val(T))
            }),
            "" !== $("#J_PhoneOne").val() && ($("#J_GetMsgCodeOne").removeClass("disabled"),
                $("#J_GetMsgCodeOne").removeAttr("disabled"))
    }),
    define("lib/util/req_global_file", ["lib/util/html", "lib/util/msg", "lib/util/selectbox", "lib/util/main", "lib/rsa/rsa", "lib/artDialog/jquery.artDialog", "lib/util/eye", "lib/util/imgslide", "lib/fingerprint/fingerprint"], function (a) {
        a("lib/util/html"),
            a("lib/util/msg"),
            a("lib/util/selectbox"),
            a("lib/util/main"),
            a("lib/util/eye"),
            a("lib/util/imgslide"),
            a("lib/fingerprint/fingerprint")
    }),
    define("lib/util/html", [], function (a, b, c) {
        var d = '<div class="aui-title"><span class="aui-cmcc"></span><q></q><span class="aui-one">和通行证</span></div>',
            e = {
                validMsg: {
                    span: '<span class="Validform_checktip"></span>',
                    q: "<q></q>",
                    commonMsg: '<div class="common-msg" id="J_CommonMsg"></div>',
                    commonMsgReVerfy: '<div class="common-msg J_ReVerfyMsg"></div>',
                    commonLoading: '<span class="Validform_checktip Validform_loading"><q></q></span>',
                    commMsg: '<div class="form-item J_CommMsgFormItem"></div>',
                    gameerror: '<div class="validform_bg validform_tip_bg"></div><div class="successvoice-str"></div>'
                },
                placeholder: '<label class="pholder">{{text}}</label>',
                checkbox: '<q class="checkbox"></q>',
                radiobox: '<q class="radiobox"></q>',
                selectbox: '<#WRAP#><span class="select_box"></span><#/WRAP#><# BODY #><span class="select_up"><span class="select_up_text"></span><b></b></span><span class="select_list" style="display:none;"><span class="select_rope"></span></span><# /BODY #><# OPTION #><a href="javascript:;" data-value="{{value}}">{{text}}</a><# /OPTION #>',
                list: {
                    page: '<div><a href="javascript:;" class="J_PrevPage">&lt;</a><a href="javascript:;" class="J_NextPage">&gt;</a></div>'
                },
                successvoice: '<div class="validform_bg"></div><div class="successvoice-str"></div>',
                dialog: {
                    title: '<span class="aui-cmcc"></span><q></q><span class="aui-one">和通行证</span>',
                    content: "",
                    iframeDialog: '<div id="J_LoginIframe"><iframe frameborder="0" name="loginIframe" allowtransparency="true" src="{{src}}" style="width:100%; height:100%;"></iframe><a href="javascript:;" class="aui-close J_Close">×</a></div>',
                    agreement: '<div class="agreementpage" style="height:{{height}}"><div class="content"><h1 class="titler clearfix">咪咕用户服务协议</h1><dl class="agreement"><dd><p>为了更好地向您提供服务，请您仔细阅读《咪咕用户服务协议》（以下简称“本协议”）。在您开始使用咪咕产品之前，请您务必认真阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单项协议(如有)，并选择接受或不接受。</p></dd><dt>第一条</dt><dd><p>本协议双方为咪咕公司（以下也可以用“我们”来指代“咪咕公司”）与您（以下也可以用“用户”来指代“您”），本协议条款构成您使用咪咕公司所提供的服务及其衍生服务之先决条件，<b>您如不同意或不愿意接受本协议/或任何对其的修改，应不使用或立即停止咪咕公司提供的任何服务。</b>您如继续使用咪咕公司提供的服务，则视为您已充分理解本协议各项内容，包括咪咕公司对本协议所做的任何修改，并承诺作为协议一方当事人接受本协议的约束。</p></dd><dt>第二条</dt><dd><p>本协议内容包括协议正文及咪咕产品上发布的声明和规则，包括但不限于版权声明、管理规定、使用说明、隐私政策和投诉规则等。所有声明、政策和规则等与协议正文具有同等法律效力，共同构成完整的《咪咕用户服务协议》。</p></dd><dt>第三条　定义</dt><dd><p>1、咪咕公司：咪咕文化科技有限公司及其五个子公司咪咕音乐有限公司、咪咕视讯科技有限公司、咪咕数字传媒有限公司、咪咕互动娱乐有限公司及咪咕动漫有限公司。</p><p>2、咪咕产品：咪咕公司开发、运营的咪咕音乐、咪咕视频、咪咕直播、咪咕影院、咪咕阅读、咪咕善跑、咪咕游戏、咪咕圈圈、咪咕灵犀、咪咕趣等网站或者移动应用软件。</p><p>3、服务：咪咕公司通过上述咪咕产品向用户提供的音乐、视频、直播、阅读等服务。</p><p>4、咪咕账号：用户通过手机或邮箱注册的用于获取咪咕公司服务的账号，用户可以使用咪咕账号享受所有咪咕服务（包括但不限于咪咕音乐、阅读、视频、动漫和游戏）。如咪咕产品上设置了相关路径，用户也可通过与咪咕合作的第三方账号（例如，微信、微博等）使用咪咕产品，享受咪咕服务，用户通过第三方账号登录使用咪咕产品的，视为注册咪咕账号。</p></dd><dt>第四条</dt><dd><p>用户在注册咪咕账号时点选同意《咪咕用户服务协议》后，本协议即在咪咕公司和用户之间产生法律效力。<b>用户直接或通过各类方式（包括但不限于站外 API 引用等）间接使用咪咕服务和数据的行为，都将被视作已完全接受本协议全部内容。</b>用户如为未满18周岁的自然人，应在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。未成年人行使和履行本协议项下的权利和义务视为已获得了法定监护人的认可。</p></dd><dt>第五条</dt><dd><p>我们将适时修改或重新制定本协议，如该修订造成您的权利实质性减少，我们将通过公告等模式对用户进行通知。在这种情况下，如您继续使用我们的服务，即表示您同意并受经修订的本协议的约束。</p></dd><dt>第六条</dt><dd><p>本协议适用于咪咕公司提供的全部服务。为避免疑义，咪咕公司和用户共同确认：基于咪咕产品的服务由各家咪咕公司独立运营，就某项服务而产生的责任和义务仅限于提供该项服务的咪咕公司，其他咪咕公司对此不承担任何责任和义务。</p></dd><dt>第七条　咪咕账号使用规则</dt><dd><p>1、咪咕账号获取方式：用户可以通过注册或者升级原有独立产品账号的方式获取咪咕账号。当用户申请注册咪咕账号时，需提供有效的手机号码（可正常接收短信），并提供真实身份信息认证后注册咪咕账号。用户在咪咕账号首页完成注册流程后，即可使用咪咕服务。用户应保证申请咪咕账号过程中填写的个人信息和注册信息的真实性、合法性、准确性和及时性，否则可能无法使用服务或在使用过程中受到限制。如果上述信息发生变化，用户应及时更改。</p><p>2、咪咕账号的使用：用户可以使用咪咕账号享受所有咪咕服务（包括但不限于咪咕音乐、阅读、视频、动漫和游戏，但如果涉及收费服务，应遵守本协议第九条的规定），但一键登录只支持中国移动手机用户。用户在注册和使用咪咕账号时，应当遵守相关法律法规，其提供、注册或上传的信息和内容不得含有本协议第十一条第2款各项所列内容。</p><p>3、咪咕账号的安全：咪咕账号密码由用户自行设定。用户应妥善保管账号与密码。咪咕公司会不断更新技术措施，努力保护用户的咪咕账号在服务器端的安全；同时强烈建议用户从官方渠道或咪咕公司授权的渠道下载安装应用，并养成良好的网络浏览习惯，定期修改密码并使用强密码设置等措施加强账号安全等级。<b>用户承诺在咪咕账号或密码遭到未获授权的使用，或者发生其他任何安全问题时，用户应立即有效地迅速通知咪咕公司，否则未经授权的使用行为均视为用户本人的行为。非咪咕公司原因致使用户账号或密码泄漏以及因用户保管、使用不当造成任何损失的，咪咕公司无须承担与此有关的任何责任。</b></p><p>4、咪咕账号找回：用户可以通过手机、邮箱或者密码保护问题找回咪咕账号密码。</p><p>5、咪咕账号的停止使用：当用户注销或更换手机号码时，需提前自行删除咪咕账号关联业务和服务内的所有数据，以防个人信息泄露；重要资料需自行备份。<b>咪咕公司不承担由此引发的用户数据丢失等责任及纠纷。</b></p><p>6、咪咕账号沉默用户清理规则：<b>如果在连续的180天内用户没有登录且没有使用咪咕账号，咪咕公司保留清理该账号的权利，包括注销咪咕账号，解除咪咕账号与其所关联的各业务及服务的关联。咪咕公司不承担由此引发的用户数据丢失等责任及纠纷。</b></p><p>7、第三方账号的使用：如果用户通过与咪咕合作的第三方账号（例如，微信、微博等）登录使用咪咕产品的，仍应遵守本协议与咪咕账号有关的规定。因为系统兼容、升级、与第三方合作内容的变更以及其他原因而可能导致该用户无法继续通过第三方账号登录的，或者无法正常使用咪咕产品和服务的，咪咕公司可以要求该用户及时采取重新注册咪咕账号、提供或更新注册信息等措施；该用户也可以根据咪咕公司的通知内容，在限定期限内自行停止使用咪咕产品和服务。<b>如果该用户未能在限定期限之前及时采取相应的措施，应承担因此而导致的所有后果，咪咕公司不承担由此引发的用户数据丢失等责任及纠纷。</b></p><p>8、用户不得利用咪咕账号进行如下行为：<br>（1）提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的；<br>（2）强制、诱导其他用户关注、点击链接页面或分享信息的；<br>（3）虚构事实、隐瞒真相以误导、欺骗他人的；<br>（4）利用技术手段批量建立虚假账号的；<br>（5）利用咪咕账号或本服务从事任何违法犯罪活动或法律禁止行为的；<br>（6）制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；<br>（7）其他违反法律法规规定、侵犯其他用户合法权益、干扰咪咕产品正常运营或咪咕公司未明示授权的行为。</p></dd><dt>第八条</dt><dd><p>为使用咪咕产品服务，用户需自行承担网络通信费用，包括但不限于网络通信费、网络流量费、短信通信费等，上述费用由运营商收取。</p></dd><dt>第九条</dt><dd><p>咪咕公司提供的部分服务为收费的服务，咪咕公司根据用户所选服务按照资费标准收取服务资费。对于收费的服务，咪咕公司会在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该等收费服务。如用户拒绝支付相关费用，则咪咕公司有权不向用户提供该等收费服务。咪咕公司可能根据实际需要变更收费服务的收费标准、方式及收费服务范围。用户不同意上述变更的，应停止使用相应服务。咪咕公司对用户的收费方式为从用户手机话费账户或第三方支付账户内扣除。</p></dd><dt>第十条　知识产权归属</dt><dd><p>1、除非另有约定或咪咕公司另行声明，咪咕产品内的所有内容（用户自行上传和咪咕公司合作伙伴依法享有权利的内容除外）、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有知识产权（包括但不限于著作权、商标权、专利权、商业秘密等）及相关权利，均归咪咕公司所有。未经咪咕公司许可，任何人不得擅自使用（包括但不限于复制、传播、展示、镜像、上载、下载、修改、出租），且不得对咪咕产品提供的服务所涉及的技术和软件进行任何反向工程、反向编译、反汇编或其他类似行为。</p><p>2、用户可在咪咕产品指定版块上传作品等内容，其形式包括但不限于文字、图片、音频、视频等（以下简称“用户上传作品”）。用户上传作品的著作权及其他权利及责任由上传用户自行负责。</p></dd><dt>第十一条　作品权利及合法性保证</dt><dd><p>1、用户承诺：<b>对用户上传作品拥有完整的著作权或已获得了著作权人的相应授权，其上传行为不侵犯他人著作权或其他权益。否则，咪咕公司将主动或根据用户或第三方投诉删除、下架或屏蔽相应的用户上传作品，无须通知上传用户。</b>用户应承担其侵权行为导致的全部责任并赔偿因此给咪咕公司造成的一切损失（包括但不限于赔偿金、罚款、罚金、律师费、诉讼费、执行费、公告费等）。</p><p>2、用户承诺：用户上传作品不得含有以下内容：<br>（1）反对宪法确定的基本原则的；<br>（2）危害国家统一、主权和领土完整的；<br>（3）泄露国家秘密、危害国家安全或者损害国家荣誉和利益的；<br>（4）煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；<br>（5）宣扬恐怖主义、极端主义、邪教或封建迷信的；<br>（6）编造、传播虚假信息，扰乱经济秩序和社会秩序，破坏社会稳定的；<br>（7）教唆犯罪或者散布暴力、凶杀、淫秽、色情、赌博、恐怖活动的；<br>（8）侮辱或者诽谤他人，侵害他人名誉、隐私、知识产权等其他合法权益的；<br>（9）危害社会公德，损害民族优秀文化传统的；<br>（10）有违背公序良俗的着装、发型、语言、动作，以低俗或不宜面向公众公开讨论的内容制造话题的；<br>（11）有关法律、行政法规和国家规定禁止的其他内容。<br><b>用户上传作品中含有上述内容的，咪咕公司有权依据自己的独立判断采取直接删除、下架或屏蔽相应作品，禁用上传用户账号部分功能，注销账号等方式处理，并向有关部门报告。</b>此外，用户应承担其违反行为导致的全部责任并赔偿因此给咪咕公司造成的一切损失（包括但不限于赔偿金、罚款、罚金、律师费、诉讼费、执行费、公告费等）。</p><p>3、除特别签订协议或者咪咕公司特别许可外，用户利用咪咕产品制作、上传、发布、传播的视频等内容不得含有广告信息。否则，咪咕公司有权依据自己的独立判断采取直接删除、下架或屏蔽相应内容，禁用上传用户账号部分功能，注销账号等方式处理，并向有关部门报告。此外，用户应承担其行为导致的全部责任并赔偿因此给咪咕公司造成的一切损失（包括但不限于赔偿金、罚款、罚金、律师费、诉讼费、执行费、公告费等）。</p></dd><dt>第十二条　作品授权</dt><dd><p>1、用户授权咪咕公司对用户上传作品（包括作品本身及作品中的人物形象、图片等素材）行使如下权利：修改、复制、编辑出版、改编、翻译、汇编、表演和展览等现行法律规定和将来法律赋予的著作权权利；通过有线或无线网络向用户的计算机终端、移动通讯终端（包括但不限于便携式通讯设备如手机和智能平板电脑等）、手持数字影音播放设备、电视接收设备（模拟信号接收设备、数字信号接收设备、数字电视、IPTV、带互联网接入功能的播放设备等）等提供信息的下载、点播、数据传输、移动视频业务（包括但不限于SMS、MMS、WAP、IVR、Streaming、3G、4G、手机视频等无线服务）、及其相关的宣传和推广等服务的权利；以咪咕公司的名义提起诉讼，由咪咕公司委派的或其指定的适当人士为代理人，对侵犯用户上传作品著作权的一切侵权行为采取法律措施（包括但不限于调查、搜集证据，申请办理公证事宜，发送律师函、警告函，诉讼，申请财产保全、证据保全、诉前禁令、强制执行，收取和解费、赔偿款、退费、补偿款、强制执行费用等）的权利。如无特殊约定，上述授权为在全球范围内的、免费的、长期有效的非独家授权。</p><p>2、咪咕公司根据上述授权进行创作或委托他人创作，产生的新作品的著作权及其他一切合法权益由咪咕公司享有。</p><p>3、用户保证咪咕公司行使上述授权时无须再向用户或任何第三人征得任何形式的许可或/及支付任何费用。<b>如咪咕公司因上述权利的行使侵犯他人著作权或其他权益，用户应承担全部责任并赔偿因此给咪咕公司造成的一切损失（包括但不限于赔偿金、罚款、罚金、律师费、诉讼费、执行费、公告费等）。</b></p></dd><dt>第十三条　作品使用</dt><dd><p>1、用户使用咪咕产品上其他用户上传作品的，使用行为应当符合《著作权法》等规定，不得侵犯其他用户的著作权以及其他合法权益。</p><p>2、咪咕公司享有著作权的作品，未经相应的著作权人事先书面同意，任何用户/第三方不得发布、转发或以其他任何方式使用或创作衍生作品。否则，咪咕公司将采取法律手段，制止侵权行为、维护其合法权益。</p></dd><dt>第十四条</dt><dd><p>用户使用咪咕公司提供的服务时，视为用户同意咪咕公司按照本协议的规定、为本协议之目的收集、存储、使用、披露和保护用户的个人信息。<b>但用户使用咪咕产品上的第三方所提供服务的，咪咕公司对该第三方使用用户信息不承担任何责任，用户应自行确认该第三方的个人信息使用政策。</b></p></dd><dt>第十五条　信息收集</dt><dd><p>1、为了向用户提供更好、更优、更个性化的服务，咪咕公司可能会收集、储存和使用如下和用户有关的信息。如果您不提供相关信息，可能无法注册成为咪咕公司的用户或无法享受咪咕公司提供的某些服务，或者无法达到相关服务拟达到的效果。相关用户信息的方式和范围如下：<br>（1）用户在注册账号、使用咪咕公司提供的相关服务时填写及/或提交、储存、共享的信息；<br>（2）用户使用服务过程中咪咕公司收集的信息（包括日志信息、设备/软件信息、位置信息等）；<br>（3）咪咕公司合作伙伴依据法律的规定或与用户的约定，向咪咕公司分享的有关您的共享信息。</p><p>2、我们可能将在向您提供服务的过程中所收集的信息用作下列用途：<br>（1）向您提供服务；<br>（2）在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；<br>（3）帮助我们设计新服务，改善我们现有的服务；<br>（4）向您提供与您更加相关的广告以替代普遍投放的广告；<br>（5）评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；<br>（6）软件认证或管理软件升级；<br>（7）让您参与有关我们产品和服务的调查。</p></dd><dt>第十六条　用户信息使用</dt><dd><p>1、咪咕公司承诺，除以下情形外，未经您同意，我们以及我们的关联方不会与任何第三方分享您的个人信息：我们以及我们的关联方，可能将您的个人信息与我们的关联方、合作伙伴及第三方服务供应商、承包商及代理（例如代表我们发出推送通知的信息服务提供商）分享，仅用作下列用途：<br>（1）向您提供、设计、维护、改进我们的服务；<br>（2）履行本协议中约定的义务或行使我们的权利。</p><p>2、我们以及我们的关联方还可能为以下需要而保存或披露您的个人信息：<br>（1）遵守适用的法律法规；<br>（2）遵守法院命令或其他法律程序的规定；<br>（3）遵守相关政府机关的要求；<br>（4）用以预防、发现、调查涉及到欺诈、危害安全、非法或违反与咪咕公司协议、政策或规则的行为，以保护用户或咪咕公司的合法权益。</p><p>3、如咪咕公司或其关联方在上述情形下与任何第三方分享用户信息，咪咕公司将努力确保该等第三方在使用用户信息时遵守咪咕公司关于用户信息使用和保护的制度及咪咕公司要求其遵守的其他适当的保密和安全措施。</p><p>4、按照《网络安全法》等相关法律法规规定，上述用户信息经过处理无法识别特定个人且不能复原后，咪咕公司对处理后信息的使用将不受到本条限制。</p><p>5、用户在此同意咪咕公司在提供服务的过程中以各种方式投放商业性广告或其他任何类型的商业信息（包括但不限于在咪咕产品平台的任何位置上投放广告，在用户上传、传播的内容中投放广告）。<b>用户同意接受咪咕公司通过短信、电子邮件或其他方式向用户发送商品促销或其他相关商业信息，如果用户不希望收到这样的信息或邮件，应在注册用户账号时或其他任何时候明确告知。</b></p></dd><dt>第十七条　用户信息保护</dt><dd><p>咪咕公司努力采取各种合理的物理、电子和管理方面的安全措施来保护用户信息，包括但不限于SSL、信息加密存储、数据中心的访问控制，尽力保护用户信息不被泄漏、毁损或丢失。在发生或者可能发生个人信息泄露、毁损、丢失的情况时，咪咕公司会及时采取补救措施，按照法律法规规定及时告知用户并向有关主管部门报告。</p><p><p>用户应妥善保管账户及密码信息。用户在使用服务进行网上交易时，应妥善保护自己的个人信息。</p>如发现自己的个人信息泄密，用户应立即联络客服，以便采取相应措施。</p></dd><dt>第十八条　未成年人保护</dt><dd><p>除非所在地法律允许并且监护人同意，禁止未成年人注册账户或向咪咕公司发送姓名、住址、电话、邮件地址等个人信息。如果在不知情的情况下收集到了未成年人的信息，咪咕公司将在知情后会尽快删除。如果用户认为咪咕公司可能不当地持有来自于或关于未成年人的信息，应与咪咕公司取得联系。</p></dd><dt>第十九条</dt><dd><p>基于不可抗力、意外事件等原因造成咪咕产品无法正常运行，咪咕公司不承担任何责任。本协议所称不可抗力、意外事件是指不能预见、不能克服、不能避免的客观事件，包括但不限于自然灾害、社会事件、政府行为等。<b>鉴于计算机及互联网的特殊性，因黑客、病毒、电信部门技术调整等引起的事件，视同不可抗力、意外事件，咪咕公司不承担因此导致的任何责任。</b></p></dd><dt>第二十条</dt><dd><p><b>基于版权重大纠纷、系统升级等原因造成咪咕产品无法正常运行的，咪咕公司首先会中断服务并告知用户，并退回用户相关的订购费用（如有），在此情况下咪咕公司不承担任何其他责任。</b></p></dd><dt>第二十一条</dt><dd><p><b>咪咕公司与第三方合作向用户提供产品并由第三方向用户提供该产品的升级、维护、客服等后续工作，由该第三方对该产品的质量问题或其本身的原因导致的一切纠纷或用户损失承担责任，用户在此同意将向该第三方主张与此有关的一切权利和损失，咪咕公司不承担任何责任。</b></p></dd><dt>第二十二条</dt><dd><p>由于咪咕产品的平台特性，咪咕产品上发布的任何信息、作品中的任何观点不代表咪咕公司之立场，咪咕公司亦不对其完整性、真实性、准确性或可靠性负责。对于可能会接触到的非法的、非道德的、错误的或存在其他失宜之处的信息，被错误归类或是带有欺骗性的发布内容，及在咪咕产品上发布的广告信息，用户应自行做出判断。除法律明确规定外，对于用户因上述信息而遭受的损失或损害，咪咕公司不承担责任。</p></dd><dt>第二十三条</dt><dd><p>鉴于咪咕产品的部分功能/服务是只提供给中国移动用户的，如果用户手机中SIM卡的所属运营商不是中国移动，用户将无法使用咪咕产品的部分功能/服务。在该情况下，<b>对于上述服务，咪咕公司只负责宣传推广服务，用户不能基于功能服务内容向咪咕公司主张任何权利或要求咪咕公司承担任何责任。</b>用户可以使用中国移动手机号码凭密码在其他设备上使用上述服务。</p></dd><dt>第二十四条</dt><dd><p>用户应保管好账户密码，因密码泄露、破解、盗用造成的个人信息泄露或其他损失，由用户自行承担。<b>用户以虚假信息骗取账户名称注册，或者其账户相关注册信息存在违法和不良信息的，咪咕公司有权根据具体情况采取通知期限改正、暂停使用、注销登记等措施，并且用户应自行承担由此产生的一切责任和损失。</b></p></dd><dt>第二十五条</dt><dd><p><b>咪咕公司依照法律法规、本协议或业务规则限制、冻结或终止用户的咪咕账号使用，由此可能会给用户造成的损失，由用户自行承担。</b></p></dd><dt>第二十六条</dt><dd><p>咪咕公司将以以下合理的方式向用户送达各类通知：</p><p>1、公示的文案；</p><p>2、客户端推送的消息；</p><p>3、根据用户预留的联系方式发出的电子邮件、手机短信、函件等；</p><p>4、合理的其他通知方式。</p></dd><dt>第二十七条</dt><dd><p>本协议将在包括但不限于用户自行注销账户和咪咕公司根据本协议约定及相关法律法规规定注销用户账户等情形下终止。<b>本协议终止后，除法律有明确规定外，咪咕公司无义务向用户或用户指定的第三方披露用户账户中的任何信息。</b>对于用户在协议履行期间的违约行为，咪咕公司仍可依据法律法规和本协议追究其相应的责任。</p></dd><dt>第二十八条</dt><dd><p>本协议的生效、履行、解释及争议的解决均适用中华人民共和国法律，本协议因与中华人民共和国现行法律相抵触或其他原因而导致部分条款无效的，不影响其他部分的效力。</p></dd><dt>第二十九条</dt><dd><p>如在使用咪咕产品过程中就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，则争议各方一致同意将发生的争议提交运营该咪咕产品的咪咕公司所在地有管辖权的法院裁决。</p></dd><dt>附：相关产品运营公司</dt><dd><p>1、咪咕音乐APP：咪咕音乐有限公司，所在地为成都；</p><p>2、咪咕视频、咪咕直播、咪咕影院APP：咪咕视讯科技有限公司，所在地为上海；</p><p>3、咪咕阅读、咪咕灵犀APP：咪咕数字传媒有限公司，所在地为杭州；</p><p>4、咪咕善跑、咪咕游戏、咪咕趣APP：咪咕互动娱乐有限公司，所在地为南京；</p><p>5、咪咕圈圈：咪咕动漫有限公司，所在地为厦门。</p><p>咪咕产品的名称可能会有变动，以应用市场发布的APP最新版本为准。</p></dd></dl><div class="tc"><a href="javascript:;" class="login-submit" onclick=\'$.dialog({id:"agreementDialog"}).close();\'>我已阅读相关服务条款</a></div></div></div>'
                },
                ajaxload: d + '<div class="ajaxloading"></div>',
                tip: d + '<div class="tip">{{text}}</div>',
                tipSuccess: d + '<div class="tipSuccess">{{text}}</div>',
                tipError: d + '<div class="tipError">{{text}}</div>',
                alert: d + '<div class="alert">{{text}}</div>',
                alertSuccess: d + '<div class="alertSuccess">{{text}}</div>',
                alertError: d + '<div class="alertError">{{text}}</div>',
                confirm: d + '<div class="confirm">{{text}}</div>',
                alert2: '<div class="tip-wrap"><div class="tip-con"><p>{{text}}</p></div><div class="tip-btn"><a href="javascript:;" class="btn5 J_Sure">{{btnname}}</a></div></div>',
                goEmail: {
                    btnHtml: '<a href="{{href}}" class="submit" target="_blank">去邮箱</a>',
                    btnTxt: "请登录邮箱点击验证链接"
                }
            };
        c.exports = e
    }),
    define("lib/util/msg", [], function (a, b, c) {
        var d = {
            validInfo: {
                phone: {
                    nullmsg: "手机号码不能为空",
                    errormsg: "手机号码输入错误",
                    errorcmccmsg: "目前仅支持中国移动手机号码",
                    errornomsg: "本号段暂不支持短信验证码验证",
                    errorfindpsdmsg: "联通、电信用户请使用其他方式找回密码",
                    errormodifymsg: "联通、电信用户请使用密保问题验证",
                    errorbindmsg: "暂不支持绑定非移动号码",
                    erroronemsg: "联通、电信用户请使用密码登录",
                    errorurlmsg: "<a href={{href}}>联通、电信用户请使用邮箱注册&gt;&gt;</a>",
                    errorupgrademsg: "<a href={{href}}>联通、电信用户请使用邮箱升级&gt;&gt;</a>"
                },
                photo: {
                    nullmsg: "请上传头像",
                    errormsg: "您上传的图片格式非法"
                },
                email: {
                    nullmsg: "邮箱不能为空",
                    errormsg: "邮箱格式不正确"
                },
                imgcode: {
                    nullmsg: "验证码不能为空",
                    errormsg: "验证码错误或已失效"
                },
                imgcodeinter: {
                    nullmsg: "圖形驗證碼不能為空",
                    errormsg: "圖形驗證碼錯誤或已失效"
                },
                msgcode: {
                    nullmsg: "短信验证码不能为空",
                    errormsg: "短信验证码错误或已失效"
                },
                intermsgcode: {
                    nullmsg: "驗證碼不能為空",
                    errormsg: "驗證碼錯誤或已失效"
                },
                psdvalid: {
                    nullmsg: "密码不能为空",
                    errormsg: "请输入6-16位数字、字母或符号的组合",
                    errormsg_special: "密码不能包含字符",
                    errormsg_tooeasy: "密码过于简单",
                    errormsg_block: "密码过于简单",
                    errormsg_space: "密码不能包含空格",
                    errormsg_diff: "新旧密码不能相同，请重新输入"
                },
                psdintervalid: {
                    nullmsg: "密碼不能為空",
                    errormsg: "請輸入6-16位數字、字母或符號的組合",
                    errormsg_space: "密碼不能包含空格"
                },
                oldpaypsd: {
                    nullmsg: "请输入您的原支付密码",
                    waynullmsg: "请输入您的支付密码",
                    errormsg: ""
                },
                newpaypsd: {
                    nullmsg: "请设置您的支付密码",
                    numerrormsg: "支付密码必须为6位数字",
                    errormsg: "您输入的新密码与原密码一致，建议您换个密码"
                },
                surepaypsd: {
                    nullmsg: "请确认您的支付密码",
                    errormsg: "两次密码输入不一致，请重新输入"
                },
                psdconfirm: {
                    nullmsg: "确认密码不能为空",
                    errormsg: "两次密码输入不一致，请重新输入"
                },
                checkbox: {
                    nullmsg: "请勾选协议"
                },
                question: {
                    nullmsg: "请选择问题"
                },
                answer: {
                    nullmsg: "答案不能为空",
                    errormsg: "密保答案相同"
                },
                account: {
                    nullmsg: "帐号不能为空",
                    errormsg: "请输入正确的帐号"
                },
                loginAccount: {
                    nullmsg: "用户名不能为空",
                    errormsg: "",
                    errormsg_phoneand: "手机号码输入错误",
                    errormsg_peand: "手机号码或邮箱输入错误"
                },
                loginInterAccount: {
                    nullmsg: "郵箱或手機號碼不能為空",
                    errormsg_peand: "郵箱或手機號碼輸入錯誤"
                },
                voicecode: {
                    nullmsg: "语音验证码不能为空",
                    errormsg: "语音验证码输入错误"
                }
            },
            page: {
                nick: {
                    errormsg: "您输入的昵称含有非法字符",
                    nullmsg: "昵称不能为空"
                }
            },
            ajax: {
                SUCCESS: "2000",
                LOGIN: {
                    IMGCODEERR: "4002",
                    NO_SIM_ABILITY: "4003",
                    POLLING: "4004",
                    NOUPGRADE: "4012",
                    UNREG: "4011",
                    CMBLACKLIST: "4023",
                    UNCMBLACKLIST: "4024",
                    REVERIFICATION: "6103",
                    BINDPHONE: "6119",
                    REVOICE: "6118",
                    MSGERROR: "4005",
                    NUMIMG: "4044",
                    CHIMG: "4045",
                    SLIDEIMG: "6123",
                    NOMOBILEBLACK: "4034",
                    MOBILEBLACK: "4033",
                    EMAILBINDPHONE: "4049",
                    PHONEERROR: "4001",
                    PSWMAX: "4016"
                },
                PLATFORM: {
                    IMGCODEERR: "4009",
                    MSGCODEERR: "4008",
                    NOAUTHEN: "4006",
                    PSDEASYERR: "4023",
                    PSDILLEGALERR: "4004",
                    ISVISIBLE: "4007",
                    INTERMSGERR: "4068"
                },
                REGISTER: {
                    USEREXISTS: "4003"
                },
                imgError: "验证码错误或已失效",
                msgError: "请获取短信验证码并填写",
                sysError: "系统错误，请稍后再试",
                timeoutError: "服务器请求超时,请稍后重试",
                rsaKeyError: "加密失败，请重新提交",
                pollTimeoutError: "因长时间未确认，验证已失效",
                toolargeError: "您上传的图片文件过大",
                loginNoUpgradeError: '咪咕客服仅支持咪咕帐号登录，<a href="#" class="J_LoginUpgradeUrl" target="_top">立即升级&gt;&gt;</a>',
                loginUnregError: '您尚未注册咪咕帐号，<a href="#" class="J_LoginRegUrl" target="_top">现在去注册&gt;&gt;</a>'
            },
            goEmail: {
                "139.com": "http://mail.10086.cn/",
                "163.com": "http://hw.mail.163.com/",
                "126.com": "http://hw.mail.163.com/",
                "yeah.net": "http://hw.mail.163.com/",
                "sohu.com": "http://mail.sohu.com/",
                "gmail.com": "http://gmail.google.com/",
                "qq.com": "http://mail.qq.com/",
                "foxmail.com": "http://mail.qq.com/",
                "sina.com": "http://mail.sina.com.cn/",
                "sina.cn": "http://mail.sina.com.cn/",
                "yahoo.cn": "http://mail.cn.yahoo.com/",
                "hotmail.com": "https://login.live.com/",
                "live.com": "https://login.live.com/",
                "live.cn": "https://login.live.com/",
                "wo.com": "http://mail.wo.com.cn/",
                "21cn.com": "http://mail.21cn.com/"
            },
            emailTip: ["139.com", "163.com", "126.com", "qq.com", "sina.com", "vip.sina.com", "hotmail.com", "gmail.com", "sina.cn", "sohu.com", "yahoo.cn", "wo.com.cn", "189.cn"],
            interemailTip: ["gmail.com", "126.com", "139.com", "163.com", "hotmail.com", "qq.com", "sina.com", "sohu.com", "yahoo.com"]
        };
        c.exports = d
    }),
    define("lib/util/selectbox", [], function () {
        var a = function (a, b) {
                return a.replace(/\{\s*\{\s*([a-zA-Z_]+)\s*\}\s*\}/g, "{{$1}}").replace(/\{\{[a-zA-Z_]+\}\}/g, function (a) {
                    return b[a.substr(2, a.length - 4)]
                })
            },
            b = function (a) {
                a.removeClass("hover").children(".select_list").hide(),
                    a.parents(".form-item").css({
                        "z-index": 98
                    })
            },
            c = function (a) {
                a.addClass("hover").children(".select_list").show(),
                    a.parents(".form-item").css({
                        "z-index": 99
                    })
            };
        $.fn.extend({
                selectbox: function (d) {
                    var e = /<#\s*WRAP\s*#>(.+)<#\s*\/WRAP\s*#>/i,
                        f = /<#\s*BODY\s*#>(.+)<#\s*\/BODY\s*#>/i,
                        g = /<#\s*OPTION\s*#>(.+)<#\s*\/OPTION\s*#>/i,
                        h = /<#\s*GROUPLABEl\s*#>(.+)<#\s*\/GROUPLABEl\s*#>/i,
                        i = /<#\s*GROUPWRAP\s*#>(.+)<#\s*\/GROUPWRAP\s*#>/i,
                        j = /<#=\s*OPTION\s*#>/i,
                        k = d.match(e),
                        l = d.match(f),
                        m = d.match(g),
                        n = d.match(h),
                        o = d.match(i);
                    return null == k || null == l || null == m ? this : this.each(function () {
                        var d = l[1],
                            e = "",
                            f = $(this).parent().is(".select_box"),
                            g = $(this).outerWidth();
                        $(this).hide(),
                            f || $(this).wrap(k[1]).parent().append(d),
                            d = "",
                            $(this).is(":disabled") ? $(this).parent().addClass("disabled") : $(this).parent().removeClass("disabled"),
                            $(this).children("option,optgroup").each(function () {
                                if ($(this).is("option")) {
                                    var b = {
                                        value: $(this).val(),
                                        text: $(this).text()
                                    };
                                    d += a(m[1], b)
                                } else if (null == n || null == o)
                                    alert("optgroup 缺少相对应的模拟块");
                                else {
                                    var c = $(this).index(),
                                        b = {
                                            index: c,
                                            text: $(this).attr("label")
                                        };
                                    d += a(n[1], b);
                                    var f = "";
                                    $(this).children("option").each(function () {
                                            b = {
                                                    value: $(this).val(),
                                                    text: $(this).text()
                                                },
                                                f += a(m[1], b)
                                        }),
                                        e += a(o[1], {
                                            index: c
                                        }).replace(j, f)
                                }
                            }).end().parent().find(".select_list").width(g).find(".select_rope").empty().append(d + e).children(".erji").width(g).end().end().end().children(".select_up").width(g).children(".select_up_text").text($(this).find("option:selected").text()).attr({
                                "data-dval": $(this).val()
                            }),
                            $(this).find("option").length > 5 && $(this).parent().find(".select_list").addClass("select_list_mh"),
                            f || $(this).parent().click(function (a) {
                                if (a.stopPropagation(),
                                    !$(this).hasClass("disabled")) {
                                    var d = $(this).children(".select_list");
                                    if (d.is(":visible"))
                                        b($(this));
                                    else {
                                        {
                                            var e = $(this).offset(),
                                                f = $(this).children(".select_up").outerHeight(),
                                                g = d.outerHeight(),
                                                h = $(window).height() + $(window).scrollTop();
                                            $(window).width() + $(window).scrollLeft()
                                        }
                                        e.top + f + g > h && (f = -g),
                                            d.css({
                                                top: f - 1 + "px"
                                            }),
                                            b($(".select_box")),
                                            c($(this))
                                    }
                                }
                            }).find(".select_list").click(function (a) {
                                a.stopPropagation();
                                var c = $(a.target).closest("[data-value]");
                                if (!(c.length <= 0)) {
                                    var d = $(this).siblings(".select_up").children(".select_up_text").attr("data-dval"),
                                        e = c.attr("data-value");
                                    if (d == e && "click" != $(this).siblings("select:first").attr("data-change"))
                                        return void b($(this).parent());
                                    c.parents(".erji:first").hide(),
                                        b($(this).parent()),
                                        $(this).parent().find(".select_up .select_up_text").text(c.text()).attr({
                                            "data-dval": e
                                        }).end().find("select").val(e).trigger("change")
                                }
                            }).children(".erji").hover(function () {
                                $(this).show()
                            }, function () {
                                $(this).hide()
                            }).end().children("[data-group]").hover(function () {
                                var a = $(this).position(),
                                    b = $(this).offset(),
                                    c = $(window).height() + $(window).scrollTop(),
                                    d = $(window).width() + $(window).scrollLeft(),
                                    e = $(this).siblings("." + $(this).attr("data-group")),
                                    f = e.outerWidth(),
                                    h = e.outerHeight(),
                                    i = a.left + g,
                                    j = a.top;
                                b.left + g + f > d && (i = -f),
                                    b.top + h > c && (j = a.top + $(this).outerHeight() - h),
                                    e.css({
                                        top: j + "px",
                                        left: i + "px"
                                    }).show()
                            }, function () {
                                $(this).siblings("." + $(this).attr("data-group")).hide()
                            })
                    })
                }
            }),
            $(document).click(function (a) {
                $(a.target).closest(".select_box").length > 0 || b($(".select_box"))
            })
    }),
    define("lib/util/main", ["lib/util/msg", "lib/util/html", "lib/rsa/rsa", "lib/artDialog/jquery.artDialog"], function (a, b, c) {
        function d(a, b, c) {
            this.btn = a,
                this.btnText = c || a.val(),
                this.secs = b || 60,
                this._time = 1e3,
                this.cleartime = void 0,
                this.start()
        }

        function e(a) {
            this.btn = a,
                this.isButton = a.is("input,button"),
                this.btnText = this.isButton ? a.val() : a.text(),
                this.loadingText = a.attr("cmcc-txt") ? a.attr("cmcc-txt") + "..." : a.val() + "...",
                this._time = 1e3,
                this.timeMark,
                this.start()
        }

        function f(a, b) {
            this.oo = a,
                this.Max = b
        }

        function g(a) {
            this.wrapEle = a.wrap,
                this.formEle = this.wrapEle.children("form"),
                this.listEle = this.wrapEle.find(a.listExpr).first(),
                this.pageEle = this.wrapEle.children(a.pageExpr),
                this.scriptEle = this.wrapEle.children("script"),
                this.itemFunc = "function" == typeof a.itemFunc ? a.itemFunc : i.common.noop,
                this.afterRender = "function" == typeof a.afterRender ? a.afterRender : i.common.noop,
                this.autoLoad = void 0 === a.autoLoad ? !0 : !!a.autoLoad,
                this.init()
        }

        function h(a) {
            if (String(a).indexOf("@") > 0) {
                var b = a.split("@"),
                    c = "",
                    d = "";
                if (b[0].length > 2) {
                    for (var e = 2; e < b[0].length; e++)
                        c += "*";
                    d = b[0].substr(0, 2) + c + "@" + b[1]
                } else {
                    for (var e = 1; e < b[0].length; e++)
                        c += "*";
                    d = b[0].substr(0, 1) + c + "@" + b[1]
                }
            }
            return d
        }
        var i = {},
            j = a("lib/util/msg"),
            k = a("lib/util/html"),
            l = j.validInfo,
            m = a("lib/rsa/rsa");
        a("lib/artDialog/jquery.artDialog"),
            $.fn.extend({
                checkbox: function () {
                    return this.each(function () {
                        var a = $(this).hide(),
                            b = $(k.checkbox).addClass(a.is(":checked") ? "checked" : "");
                        a.after(b),
                            b.click(function () {
                                var a = $(this).hasClass("checked");
                                a ? $(this).removeClass("checked").prev().prop("checked", !1) : $(this).addClass("checked").prev().prop("checked", !0),
                                    $(this).prev().triggerHandler("click")
                            })
                    })
                },
                radiobox: function () {
                    var a = k.radiobox;
                    return this.each(function () {
                        var b = $(this),
                            c = $(a),
                            d = b.parent().children(),
                            e = "J_RadioBox_" + b.attr("name"),
                            f = "checked",
                            g = "disabled";
                        b.parent().append(c.addClass(e)),
                            c.append(d),
                            c.click(function () {
                                var a = $(this).children("input:radio");
                                a.prop("disabled") || a.prop("checked", !0).trigger("click")
                            }),
                            b.hide().click(function (a) {
                                a.stopPropagation(),
                                    $(this).prop("disabled") || ($("." + e).removeClass(f),
                                        $(this).parent().addClass(f))
                            }),
                            c[b.prop("checked") ? "addClass" : "removeClass"](f),
                            c[b.prop("disabled") ? "addClass" : "removeClass"](g)
                    })
                },
                dropdownbox: function () {
                    return this.each(function () {
                        var a = new i.common.mSift("emailTip", 11);
                        a.Data = j.emailTip,
                            a.Create(this)
                    })
                },
                interdropdownbox: function () {
                    return this.each(function () {
                        var a = new i.common.mSift("emailTip", 11);
                        a.Data = j.interemailTip,
                            a.Create(this)
                    })
                },
                placeholder: function (a) {
                    return "placeholder" in $('<input type="text"/>')[0] ? this : this.each(function () {
                        var b, c = $(this),
                            d = c.val();
                        if (c.is("[placeholder-id]"))
                            b = $("#" + c.attr("placeholder-id"));
                        else {
                            b = $(i.common.text2html(a, {
                                text: c.attr("placeholder")
                            }));
                            var e = i.common.generateRandomName();
                            c.attr("placeholder-id", e).after(b.attr("id", e));
                            var f = function () {
                                var a = $(this),
                                    b = a.parent().children("#" + a.attr("placeholder-id"));
                                "" == a.val() ? b.show() : b.hide()
                            };
                            c.on("keyup", f).on("blur", function () {
                                    var a = this;
                                    setTimeout(function () {
                                        f.call(a),
                                            a = null
                                    }, 100)
                                }),
                                b.on("click", function () {
                                    $(this).parent().children("[placeholder-id=" + $(this).attr("id") + "]").trigger("focus")
                                })
                        }
                        "" == d ? b.show() : b.hide();
                        var g = c.position(),
                            h = c.height(),
                            j = c.width(),
                            k = parseInt(c.css("padding-left")),
                            l = parseInt(c.css("padding-right")),
                            m = parseInt(c.css("margin-left"));
                        b.css({
                                top: g.top + "px",
                                left: g.left + k + m + "px",
                                width: j + l + "px",
                                height: h + "px",
                                "padding-top": c.css("padding-top"),
                                "padding-bottom": c.css("padding-bottom"),
                                "line-height": c.css("line-height"),
                                "font-size": c.css("font-size")
                            }),
                            c = b = null
                    })
                }
            }),
            d.prototype = {
                constructor: d,
                start: function () {
                    this.btn.addClass("disabled countdown").removeClass("msgdisabled").attr("disabled", "disabled"),
                        this.update()
                },
                update: function () {
                    if (this.secs <= 0)
                        return void this.stop();
                    $("body").hasClass("internetlogin") ? this.btn.val("已發送，" + this.secs + "s") : this.btn.hasClass("J_AgainEmail") ? this.btn.text(this.btnText + "(" + this.secs + "s)") : this.btn.val($(".overseas").length > 0 || $(".internetlogin").length > 0 || $(".newtv").length > 0 || $(".login-game-wrap").length > 0 || $(".gamesdk").length > 0 ? this.btnText + "(" + this.secs + ")" : "重新获取(" + this.secs + "s)"),
                        this.secs--;
                    var a = this,
                        b = arguments.callee;
                    this.cleartime = window.setTimeout(function () {
                        b.call(a)
                    }, this._time)
                },
                stop: function (a) {
                    this.secs = 0,
                        clearTimeout(this.cleartime),
                        this.btn.hasClass("J_AgainEmail") ? this.btn.text(this.btnText) : this.btn.val(this.btnText),
                        this.btn.removeClass("countdown").removeAttr("disabled"),
                        a || this.btn.removeClass("disabled").addClass("msgdisabled");
                    var b = 0,
                        c = 0,
                        d = this.btn.parents("form").find("input[cmcc-btn=" + this.btn.attr("id") + "]"),
                        e = d.length;
                    d.each(function (a) {
                            var d = $.trim($(this).val());
                            "" != d && c++,
                                0 == a ? $("body").hasClass("internetlogin") ? (/^[0-9]{8}$/.test(d) || /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/.test(d)) && b++ : /^1[0-9]{10}$/.test(d) && b++ : (/^(?:[0-9]|[1-9][0-9])$/.test(d) || /^[\u4e00-\u9fa5]{2,4}$/.test(d) || "dataIgnore" == $(this).data("dataIgnore")) && b++
                        }),
                        b != e || c != e || this.btn.hasClass("countdown") ? b == e || c != e || this.btn.hasClass("countdown") ? this.btn.removeClass("msgdisabled").addClass("disabled") : this.btn.addClass("msgdisabled").addClass("disabled") : this.btn.addClass("msgdisabled")
                }
            },
            e.prototype = {
                constructor: e,
                start: function () {
                    $(".login-game-wrap").length > 0 ? this.btn.attr("disabled", "disabled").parent().addClass("disabled") : this.btn.addClass("disabled").attr("disabled", "disabled"),
                        this.update()
                },
                update: function () {
                    this.btn[this.isButton ? "val" : "text"](this.loadingText);
                    var a = this,
                        b = arguments.callee;
                    this.timeMark = window.setTimeout(function () {
                        b.call(a)
                    }, this._time)
                },
                stop: function () {
                    window.clearTimeout(this.timeMark),
                        $(".login-game-wrap").length > 0 ? this.btn.removeAttr("disabled")[this.isButton ? "val" : "text"](this.btnText).parent().removeClass("disabled") : this.btn.removeClass("disabled").removeAttr("disabled")[this.isButton ? "val" : "text"](this.btnText)
                }
            },
            f.prototype = {
                constructor: f,
                Varsion: "v2010.10.29 by AngusYoung | mrxcool.com",
                Target: Object,
                TgList: Object,
                Listeners: null,
                SelIndex: 0,
                Data: [],
                ReData: [],
                Create: function (a) {
                    var b = this,
                        c = document.createElement("ul");
                    c.style.display = "none",
                        c.className = "interemail",
                        a.parentNode.insertBefore(c, a),
                        b.TgList = c,
                        $(c).mouseover(function (a) {
                            var c = $(a.target).closest("li");
                            c[0] && (b.ChangeOn(c[0]),
                                b.SelIndex = c.index())
                        }).mousedown(function (a) {
                            var c = $(a.target).closest("li");
                            c[0] && b.Select()
                        }),
                        a.onkeydown = a.onclick = function (a) {
                            b.Listen(this, a)
                        },
                        a.onblur = function () {
                            setTimeout(function () {
                                b.Clear()
                            }, 100)
                        }
                },
                Complete: function () {},
                Select: function () {
                    var a = this;
                    a.ReData.length > 0 && (a.Target.value = a.ReData[a.SelIndex].replace(/\*/g, "*").replace(/\|/g, "|"),
                            a.Clear()),
                        a.Complete()
                },
                Listen: function (a) {
                    var b = this;
                    b.Target = a;
                    var c = arguments[arguments.length - 1],
                        d = window.event || c;
                    switch (d.keyCode) {
                        case 9:
                            return;
                        case 13:
                            return b.Select(),
                                void b.Target.onblur();
                        case 38:
                            b.SelIndex = b.SelIndex > 0 ? b.SelIndex - 1 : b.ReData.length - 1;
                            break;
                        case 40:
                            b.SelIndex = b.SelIndex < b.ReData.length - 1 ? b.SelIndex + 1 : 0;
                            break;
                        default:
                            b.SelIndex = 0
                    }
                    b.Listeners && clearInterval(b.Listeners),
                        b.Listeners = setInterval(function () {
                            b.Get()
                        }, 10)
                },
                Get: function () {
                    var a = this;
                    if ("" == a.Target.value)
                        return void a.Clear();
                    a.Listeners && clearInterval(a.Listeners),
                        a.ReData = [];
                    var b = "";
                    if (a.Target.value.toLowerCase().indexOf("@") >= 1)
                        for (var c = 0; c < a.Data.length; c++) {
                            var d = a.Target.value.toLowerCase().indexOf("@"),
                                e = a.Target.value.toLowerCase().substring(0, d) + "@" + a.Data[c].toLowerCase();
                            if (e.indexOf(a.Target.value.toLowerCase()) >= 0) {
                                if (a.ReData.length == a.Max)
                                    break;
                                if (a.ReData.length == a.Data.length)
                                    break;
                                a.ReData.push(e)
                            }
                        }
                    var f = a.Target.value.replace(/\*/g, "*");
                    f = f.replace(/\|/g, "|"),
                        f = f.replace(/\+/g, "\\+"),
                        f = f.replace(/\./g, "\\."),
                        f = f.replace(/\?/g, "\\?"),
                        f = f.replace(/\^/g, "\\^"),
                        f = f.replace(/\$/g, "\\$"),
                        f = f.replace(/\(/g, "\\("),
                        f = f.replace(/\)/g, "\\)"),
                        f = f.replace(/\[/g, "\\["),
                        f = f.replace(/\]/g, "\\]"),
                        f = f.replace(/\\/g, "\\\\");
                    for (var g = new RegExp(f, "i"), c = 0; c < a.ReData.length; c++)
                        a.Target.value.indexOf("*") >= 0 && (a.ReData[c] = a.ReData[c].replace(/\*/g, "*")),
                        a.Target.value.indexOf("|") >= 0 && (a.ReData[c] = a.ReData[c].replace(/\|/g, "|")),
                        b += '<li style="padding:0;line-height:37px;cursor:default;border-bottom: 1px solid #EBEBEB;">' + a.ReData[c].replace(g, function (a) {
                            return '<span style="background:#ff9;font-weight:bold;font-style:normal;color:#e60;">' + a + "</span>"
                        });
                    if ("" == b)
                        a.Clear();
                    else {
                        $(a.TgList).html(b);
                        var h = $(a.Target);
                        a.TgList.style.cssText = "z-index:100;overflow:auto;display:block;position:absolute; max-height:200px; box-shadow: 0 4px 8px 0 rgba(33,28,28,0.09); border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px;background:#fff;margin:0px 0 0;padding: 0 15px;list-style:none;font-size:12px;",
                            a.TgList.style.top = h.position().top + h.innerHeight() + 2 + "px",
                            a.TgList.style.width = a.Target.offsetWidth - 32 + "px"
                    }
                    var i = a.TgList.getElementsByTagName("li");
                    i.length > 0 && (i[a.SelIndex].style.cssText = "padding:0; border-bottom: 1px solid #EBEBEB; line-height:37px;cursor:default;color:#333;")
                },
                ChangeOn: function (a) {
                    for (var b = a.parentNode.getElementsByTagName("li"), c = 0, d = b.length; d > c; c++)
                        b[c].style.cssText = "padding:0;line-height:37px;cursor:default; border-bottom: 1px solid #EBEBEB;";
                    a.style.cssText = "padding:0;line-height:37px;cursor:default;color:#333; border-bottom: 1px solid #EBEBEB;"
                },
                Clear: function () {
                    var a = this;
                    a.TgList && (a.TgList.style.display = "none",
                        a.ReData = [],
                        a.SelIndex = 0)
                }
            },
            i.common = {
                noop: "function" == typeof $.noop ? $.noop : function () {},
                createEleBySelector: function (a, b, c, d) {
                    $(".Validform_checktip").remove();
                    var e = a.parents(c).find(b);
                    return e[0] || (e = null,
                            e = $(d),
                            a.parents(c).append(e)),
                        e
                },
                getSecurityCode: function () {
                    var a = Math.floor(9 * Math.random());
                    return a++,
                        Math.floor(1e3 * (a + Math.random()))
                },
                getCmccName: function (a) {
                    var b = $(a);
                    return b.attr(b.is("[cmcc-name]") ? "cmcc-name" : "name")
                },
                setMsgDefault: function (a, b) {
                    for (var c = 0, d = 0, e = a.length; e > d; d++) {
                        $("#" + a[d]).attr("cmcc-btn", b);
                        var f = $("#" + b);
                        "" == $.trim($("#" + a[d]).val()) && c++,
                            f.addClass("disabled");
                        var g = f.data("msgValid");
                        g || (g = {},
                                f.data("msgValid", g)),
                            g[a[d]] = 0,
                            $("#" + a[d]).off("input.disabledNameSpace").on("input.disabledNameSpace", function () {
                                var a = $(this),
                                    b = a.attr("cmcc-btn"),
                                    c = $("#" + b).data("msgValid"),
                                    d = [];
                                for (var e in c)
                                    d.push(e);
                                var g = d.length,
                                    h = 0;
                                a.parents("form").find("input[cmcc-btn=" + b + "]").each(function () {
                                        var a = $(this);
                                        "" != $.trim(a.val()) && h++
                                    }),
                                    h != g || f.hasClass("countdown") ? f.removeClass("msgdisabled") : f.addClass("msgdisabled"),
                                    f.addClass("disabled")
                            })
                    }
                    c > 0 ? f.removeClass("msgdisabled") : f.addClass("msgdisabled")
                },
                splitUrl: function (a) {
                    if (/\,/.test(a.url)) {
                        var b = a.url.split(",");
                        a.type = b[0],
                            a.url = b[b.length - 1]
                    }
                },
                findSearchParams: function (a) {
                    var b = location.search;
                    b = /\?/.test(b) ? b.substr(1) : b;
                    for (var c = b.split("&"), d = c.length - 1; d > -1; d--) {
                        var e = c[d].split("=");
                        if (e[0] == a)
                            return e[1]
                    }
                    return null
                },
                newfindSearchParams: function (a, b) {
                    var c = b;
                    c = /\?/.test(c) ? c.substr(1) : c;
                    for (var d = c.split("&"), e = d.length - 1; e > -1; e--) {
                        var f = d[e].split("=");
                        if (f[0] == a)
                            return f[1]
                    }
                    return null
                },
                setCookie: function (a, b, c) {
                    var d = new Date;
                    !!c && d.setTime(d.getTime() + 1e3 * c),
                        document.cookie = a + "=" + encodeURIComponent(b) + (c ? ";expires=" + d.toGMTString() : "")
                },
                getCookie: function (a) {
                    var b = document.cookie;
                    if (b.length > 0) {
                        var c = b.split(a + "=");
                        if (c.length > 1)
                            return decodeURIComponent(c[1].split(";")[0])
                    }
                    return null
                },
                getJson: function (a) {
                    return "string" == typeof a && (a = $.parseJSON(a)),
                        a
                },
                ajax: function (a) {
                    a.data && (a.data.isAsync = !0),
                        this.splitUrl(a),
                        a = $.extend(!0, {}, {
                            type: "POST",
                            dataType: "json",
                            cache: !1,
                            error: function () {},
                            complete: function () {}
                        }, a);
                    var b = a.success,
                        c = this;
                    a.success = function (a) {
                            a = c.getJson(a),
                                "function" == typeof b && b(a)
                        },
                        $.ajax(a)
                },
                buttonSecond: function (a, b, c) {
                    return new d(a, b, c)
                },
                text2val: function (a, b) {
                    return a.replace(/\{\s*\{\s*([a-zA-Z_]+)\s*\}\s*\}/g, "{{$1}}").replace(/\{\{[a-zA-Z_]+\}\}/g, function (a) {
                        return b[a.substr(2, a.length - 4)]
                    })
                },
                text2html: function (a, b) {
                    return a.replace(/\{\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*\}/g, "{{$1}}").replace(/\{\{[a-zA-Z0-9_]+\}\}/g, function (a) {
                        var c = b[a.substr(2, a.length - 4)];
                        return void 0 === c ? "" : c
                    })
                },
                generateRandomName: function () {
                    var a = "",
                        b = [],
                        c = 0,
                        d = "0123456789ABCDEF";
                    for (c = 0; 32 > c; c++)
                        b[c] = d.substr(Math.floor(16 * Math.random()), 1);
                    return b[12] = "4",
                        b[16] = d.substr(3 & b[16] | 8, 1),
                        a = "placeholder_" + b.join("")
                },
                mSift: f
            },
            i.page = {
                loadList: function (a) {
                    var b = $(a.wrapExpr),
                        c = b.length;
                    if (0 >= c)
                        return null;
                    if (1 == c)
                        return a.wrap = b,
                            new g(a);
                    var d = [];
                    return b.each(function () {
                            var b = $.extend(!0, {}, a, {
                                wrap: $(this)
                            });
                            d.push(new g(b))
                        }),
                        b = null,
                        d
                },
                scrollToMobile: function (a) {
                    1 != $("#J_IsPc").val() && $(window).scrollTop($(a).offset().top)
                },
                newtvTip: function (a) {
                    $("#J_NewTVTip")[0] || ($("body").append('<div class="newtv-tip" id="J_NewTVTip">' + a + '</div><div class="newtv-mask" id="J_NewTVMask"></div>'),
                        setTimeout(function () {
                            $("#J_NewTVTip,#J_NewTVMask").remove()
                        }, 2e3))
                },
                saveFingerprint: function () {
                    var a, b = "{",
                        c = new Fingerprint2({
                            excludeCanvas: !0,
                            excludeWebGL: !0
                        });
                    c.get(function (c, d) {
                        if ("undefined" != typeof window.console) {
                            for (var e in d) {
                                var f = d[e],
                                    g = f.value;
                                b += '"' + f.key + '":"' + g.toString().substr(0, 100) + '",'
                            }
                            b = b.substring(0, b.length - 1),
                                b += "}"
                        }
                        a = c,
                            $.fingerprint = {
                                details: b,
                                result: a
                            }
                    })
                },
                rsaFingerprint: function (a, b) {
                    if (!$.fingerprint)
                        return {
                            details: "",
                            result: ""
                        };
                    var c = $.fingerprint.details,
                        d = $.fingerprint.result,
                        e = c.length,
                        f = "",
                        g = new m.RSAKey;
                    g.setPublic(a, b);
                    for (var h = g.encrypt(d), i = 0; e > i; i += 117)
                        f += g.encrypt(c.substr(i, 117));
                    return {
                        details: f,
                        result: h
                    }
                },
                getFingerRsaParams: function (a) {
                    var b = {};
                    return i.common.ajax({
                            url: a,
                            async: !1,
                            success: function (a) {
                                (a.status = j.ajax.SUCCESS) && (b = i.page.rsaFingerprint(a.result.modulus, a.result.publicExponent))
                            }
                        }),
                        b
                },
                saveFingerResult: function (a, b) {
                    var c = new Fingerprint2({
                        excludeCanvas: !0,
                        excludeWebGL: !0
                    });
                    c.get(function (c) {
                        i.common.ajax({
                            url: a,
                            async: !1,
                            success: function (a) {
                                if (a.status = j.ajax.SUCCESS) {
                                    var d = new m.RSAKey;
                                    d.setPublic(a.result.modulus, a.result.publicExponent);
                                    var e = d.encrypt(c);
                                    b(e)
                                }
                            }
                        })
                    })
                },
                rsaLongStr: function (a, b) {
                    var c = [];
                    return i.common.ajax({
                            url: a,
                            async: !1,
                            success: function (a) {
                                if (a.status = j.ajax.SUCCESS) {
                                    var d = new m.RSAKey;
                                    d.setPublic(a.result.modulus, a.result.publicExponent);
                                    for (var e = 0, f = b.length; f > e; e += 117)
                                        c.push(d.encrypt(b.substr(e, 117)))
                                }
                            }
                        }),
                        c.join(",")
                },
                imgCodeHandler: $.noop,
                setImgType: function (a, b, c) {
                    $(".j_imgtype:first").val(a).data("isRisk", b).data("isPreventImgSlide", c)
                },
                getImgType: function () {
                    var a = $(".j_imgtype:first");
                    return {
                        val: a.val(),
                        isRisk: !!a.data("isRisk"),
                        isPreventImgSlide: !!a.data("isPreventImgSlide")
                    }
                },
                getImgSlideStatus: $.noop,
                dynamicHandler: $.noop,
                staticSubmitHandler: $.noop,
                successSubmit: function (a) {
                    var b = a,
                        c = b.position(),
                        d = c.left,
                        e = c.top,
                        f = parseInt(b.css("marginTop").replace("px", ""), 10);
                    width = b.outerWidth(),
                        height = b.outerHeight() - 16,
                        d = d + width / 2 + 35,
                        e = e + f + height / 2;
                    var g = '<div style="left:' + d + "px; position: absolute; top: " + e + 'px;"><img src="/images/success.gif?r=' + Math.random() + '"></div>';
                    b.parent().append(g)
                }
            },
            i.tip = {
                tipErrorTime: void 0,
                tipMsgSucTime: void 0,
                tipMsgErrorTime: void 0,
                creatEle: function (a) {
                    return !a.hasClass("J_CommMsgFormItem") && a.addClass("J_CommMsgFormItem"),
                        a
                },
                submitcreatEle: function () {
                    var a = $("form"),
                        b = a.find("#J_CommonMsg");
                    return b[0] || (b = $(k.validMsg.commonMsg),
                            a.prepend(b)),
                        b
                },
                createSpan: function (a) {
                    var b = a.find(".Validform_checktip");
                    return b[0] || (b = $(k.validMsg.span),
                            a.append(b)),
                        b
                },
                ajaxloading: function (a) {
                    return a[0].ButtonLoading || (a[0].ButtonLoading = new e(a)),
                        this
                },
                ajaxloaded: function (a) {
                    return a[0].ButtonLoading.stop(),
                        a[0].ButtonLoading = null,
                        this
                },
                tipError: function (a, b) {
                    b = b || 2e3;
                    var c = this.submitcreatEle().empty();
                    if (a.length > 24)
                        var d = $(k.validMsg.span).html("<q></q><i>" + a + "</i>");
                    else
                        var d = $(k.validMsg.span).html("<q></q>" + a);
                    c.addClass("error J_LoginTipMark").append(d),
                        d = null
                },
                tipMsgSuccess: function (a, b, c) {
                    c = c || 2e3,
                        a = "" == a ? a : k.validMsg.q + a;
                    this.createSpan(b).html(a);
                    b.removeClass("error success").addClass("success")
                },
                tipMsgError: function (a, b, c) {
                    c = c || 2e3,
                        a = "" == a ? a : k.validMsg.q + a;
                    this.createSpan(b).html(a);
                    b.removeClass("error success").addClass("error")
                },
                open: function (a) {
                    return a = $.extend(!0, {
                            lock: !0,
                            padding: 0,
                            esc: !1,
                            fixed: !0,
                            resize: !1,
                            drag: !1,
                            opacity: .3,
                            duration: 0
                        }, a),
                        $.dialog(a),
                        $.dialog(a)
                },
                alert: function (a, b, c) {
                    b = b || i.common.noop,
                        c = c || "确定";
                    var d = $.dialog({
                        id: "alertDialog",
                        title: "",
                        content: i.common.text2html(k.alert2, {
                            text: a,
                            btnname: c
                        }),
                        width: 390,
                        lock: !0,
                        padding: 0,
                        fixed: !0,
                        resize: !0,
                        opacity: .3,
                        duration: 0,
                        drag: !0
                    });
                    d.DOM.content.find(".J_Sure").click(function () {
                        b(),
                            d.close(),
                            d = null
                    }).end().find(".J_Close").click(function () {
                        d.close(),
                            d = null
                    })
                }
            },
            i.valid = {
                setDefault: function () {
                    $.Tipmsg.r = "",
                        $.Tipmsg.c = "&nbsp;",
                        $.Tipmsg.v = ""
                },
                config: {
                    tiptype: function (a, b, c) {
                        if (!b.obj.is("form")) {
                            var d = i.common.createEleBySelector(b.obj, ".Validform_checktip", ".form-item:first", k.validMsg.span);
                            c(d, b.type);
                            var e = ["", "", "success", "error", ""];
                            3 == b.type && ($(".J_Pswtip").remove(),
                                    d.html("" == a && 3 == b.type ? a : k.validMsg.q + a)),
                                d.parent().removeClass(e[b.type - 1]).addClass(e[b.type]),
                                2 == b.type && (d.parent().removeClass(e[b.type + 1]),
                                    d.remove());
                            var f = b.obj.attr("cmcc-btn"),
                                g = b.obj.parents("form:first");
                            if (f && !g.is("[isFormSubmit=1]")) {
                                var f = $("#" + f),
                                    h = f.data("msgValid");
                                if (2 == b.type) {
                                    h[b.obj.attr("id")] = 1;
                                    var j = !0;
                                    for (var l in h)
                                        if (0 == h[l]) {
                                            j = !1;
                                            break
                                        }
                                    j ? /\d/.test(f.val()) || f.removeClass("disabled") : f.addClass("disabled")
                                } else
                                    h[b.obj.attr("id")] = 0
                            }
                            3 == b.type && g.removeAttr("isFormSubmit")
                        }
                    },
                    showAllError: !1,
                    isFocus: !1,
                    datatype: {
                        "*": function (a, b) {
                            return a = $.trim(a),
                                "" == a ? b.attr("nullmsg") : /[\w\W]+/.test(a)
                        },
                        email: function (a, b) {
                            var c = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/;
                            return a = $.trim(a),
                                c.test(a) && b.val(a),
                                c.test(a)
                        },
                        phone: function (a) {
                            return /^1[0-9]{10}$/.test(a)
                        },
                        interphone: function (a) {
                            return /^[0-9]{8}$/.test(a)
                        },
                        phone2: function (a) {
                            return /^1[0-9]{10}$/.test(a)
                        },
                        imgcode: /^[\u4e00-\u9fa5]{2,4}$/,
                        msgcode: /^(\d{6}|\d{4})$/,
                        imgcodech: /^[\u4e00-\u9fa5]{2,4}$/,
                        psdvalid: function (a) {
                            var b = a.length;
                            return 6 > b || b > 16 ? l.psdvalid.errormsg : /\s/.test(a) ? l.psdvalid.errormsg_space : /^([0-9]*)$|^([a-zA-Z]*)$|^(([\u0021-\u002f]|[\u003a-\u0040]|[\u005b-\u0060]|[\u007b-\u007e])*)$|^([\s\S]*[\u0001-\u0020]+[\s\S]*)$|^([\s\S]*[\u007f-\uffff]+[\s\S]*)$/.test(a) ? l.psdvalid.errormsg : !0
                        },
                        headname: function (a, b) {
                            return a = $.trim(a),
                                "" == a ? b.attr("nullmsg") : !/(?:\ud83c[\udf00-\udfff\udc00-\ude4f\ude80-\udeff]|\:[a-z0-9_]+\:)/.test(a)
                        },
                        interpsdvalid: function (a) {
                            var b = a.length;
                            return 6 > b || b > 16 ? l.psdintervalid.errormsg : /\s/.test(a) ? l.psdintervalid.errormsg_space : /^([0-9]*)$|^([a-zA-Z]*)$|^(([\u0021-\u002f]|[\u003a-\u0040]|[\u005b-\u0060]|[\u007b-\u007e])*)$|^([\s\S]*[\u0001-\u0020]+[\s\S]*)$|^([\s\S]*[\u007f-\uffff]+[\s\S]*)$/.test(a) ? l.psdintervalid.errormsg : !0
                        },
                        paypsd: /^\d{6}$/,
                        paypsddiff: function (a, b) {
                            if (!/^\d{6}$/.test(a))
                                return l.newpaypsd.numerrormsg;
                            var c = $("#" + b.attr("cmcc-psddiff")).val();
                            return a != c
                        },
                        diff: function (a, b) {
                            return /^\s+|\s+$/.test(a) && (a = $.trim(a),
                                    b.val(a)),
                                "" == a ? l.answer.nullmsg : !0
                        },
                        account: function (a, b) {
                            var c = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/,
                                d = /^1[0-9]{10}$/,
                                e = $.trim(a);
                            return c.test(e) && (a = e,
                                    b.val(e)),
                                c.test(a) || d.test(a)
                        },
                        nonum: function (a, b) {
                            return "" == a ? b.attr("nullmsg") : !/^[0-9]+$/.test(a)
                        }
                    },
                    ajaxurl: {
                        success: function (a, b) {
                            if (a.status != j.ajax.SUCCESS && b.parent().find(".J_ImgCodeView img").trigger("click"),
                                b.parents(".form-item:first")[a.status == j.ajax.SUCCESS ? "addClass" : "removeClass"]("ajaxsuc"),
                                a.status = a.status == j.ajax.SUCCESS ? "y" : "n",
                                a.info = a.message,
                                b[0].validform_lastval = null,
                                "y" != a.status)
                                $("#" + b.attr("cmcc-btn")).addClass("disabled").removeClass("msgdisabled");
                            else if (b.parents(".form-item").hasClass("J_Imgbox") && b.attr("cmcc-btn")) {
                                var c = $("#" + b.attr("cmcc-btn")).siblings(".Validform_checktip"),
                                    d = c.html();
                                /^\<q\>\<\/q\>验证码错误或已失效$/.test(d) && (c.parents(".form-item").removeClass("error"),
                                    c.remove())
                            }
                        },
                        error: function (a, b) {
                            b[0].validform_lastval = null
                        },
                        setParams: function (a, b, c, d) {
                            var e = $(d),
                                f = e.attr(e.is("[cmcc-name]") ? "cmcc-name" : "name");
                            if (a.url = b,
                                i.common.splitUrl(a),
                                a.data = "isAsync=true&" + encodeURIComponent(f) + "=" + encodeURIComponent(c),
                                e.is("[datatype=imgcode]")) {
                                a.data += "&imgcodeType=" + e.siblings(".J_TypesHidden").val();
                                var g = e.parent().find("img"),
                                    h = g.attr("cmcc-ajax") || g.attr("cmccnum-ajax"),
                                    j = i.urlParame.getValByKey(h, "sourceid");
                                a.data += "&sourceid=" + j
                            }
                        }
                    },
                    beforeCheck: function (a) {
                        a.attr("isFormSubmit", 1).find(".txt").removeAttr("ignore")
                    },
                    beforeSubmit: function (a) {
                        i.tip.ajaxloading(a.find("input:submit")),
                            a.removeAttr("isFormSubmit");
                        var b;
                        b = a.find(":password").not(".J_NoPsdEye").length > 0 && a.find("input[cmcc-type=password]").length > 0 ? a.find(":password,input[cmcc-type=password]").not(".J_NoPsdEye") : a.find(":password").not(".J_NoPsdEye").length > 0 && 0 == a.find("input[cmcc-type=password]").length ? a.find(":password").not(".J_NoPsdEye") : a.find("input[cmcc-type=password]");
                        var c = a.find(".J_FingerPrint,.J_FingerPrintDetail");
                        (b.length > 0 || c.length > 0) && i.common.ajax({
                            url: a.attr("cmcc-rsaAjax"),
                            async: !1,
                            success: function (a) {
                                if (a.status = j.ajax.SUCCESS) {
                                    b.each(function () {
                                        var b = $(this),
                                            c = new m.RSAKey;
                                        c.setPublic(a.result.modulus, a.result.publicExponent);
                                        var d = c.encrypt(b.val());
                                        b.siblings(".J_RsaPsd").val(d)
                                    });
                                    var d = i.page.rsaFingerprint(a.result.modulus, a.result.publicExponent);
                                    c.filter(".J_FingerPrint").val(d.result).end().filter(".J_FingerPrintDetail").val(d.details)
                                }
                            }
                        })
                    },
                    ajaxPost: !0,
                    callback: function (a) {
                        var b = $(".J_ValidForm"),
                            c = b.find("input:submit");
                        i.tip.ajaxloaded(c),
                            a.status == j.ajax.SUCCESS ? window.location.href = a.result.redirect : 401 == a.status ? location.reload() : i.tip.tipError("网络异常，请点击登录重试")
                    }
                }
            },
            i.urlParame = {
                getHost: function (a) {
                    var b = a.match(/http[s]?\:\/\/[^\/]+\//);
                    return null == b ? location.protocol + "//" + location.host + "/" : b[0]
                },
                modifyHash: function (a, b) {
                    var c = a.split("#"),
                        d = "";
                    if (/\#/.test(a)) {
                        d = "&" + c[1];
                        for (var e in b) {
                            var f = new RegExp("&" + e + "(=[^&]+)?(?=&|$)");
                            f.test(d) ? d = d.replace(f, "&" + e + "=" + b[e]) : d += "&" + e + "=" + b[e]
                        }
                    } else
                        for (var e in b)
                            d += "&" + e + "=" + b[e];
                    return c[0] + "#" + d.substr(1)
                },
                modifyUrlBySearch: function (a) {
                    var b = a.indexOf("?") > -1;
                    return a + (b ? "&" : "?")
                },
                getValByKey: function (a, b) {
                    if (a.indexOf("?") < 0)
                        return "";
                    if (a = a.split("?")[1],
                        "" == a)
                        return "";
                    for (var c = {}, d = a.split("&"), e = 0, f = d.length; f > e; e++) {
                        var g = d[e].split("=");
                        c[g[0]] = g[1]
                    }
                    return c[b] ? c[b] : ""
                }
            },
            g.prototype = {
                constructor: g,
                init: function () {
                    var a = this;
                    return this.formEle.delegate("input:submit", "click", function () {
                            return a.formEle.find(".J_CurrentPageHidden").val(1),
                                a.formSubmit(),
                                !1
                        }),
                        this.pageEvent(),
                        this.autoLoad && this.formSubmit(),
                        this
                },
                formSubmit: function () {
                    if (this.wrapEle.hasClass("J_LoadingJsMark"))
                        return this;
                    this._html = this.scriptEle.html();
                    var a = this.createLoading();
                    return i.common.ajax({
                            url: this.formEle.attr("action"),
                            data: this.formEle.serialize(),
                            success: function (b) {
                                if (b.status == j.ajax.SUCCESS) {
                                    var c = b.result.data;
                                    c && c.length > 0 ? a.createItems(b) : a.createNoCon(),
                                        a.createPage(b.result)
                                } else
                                    alert(b.message)
                            },
                            complete: function () {
                                a.wrapEle.removeClass("J_LoadingJsMark").find(".J_ListLoading").remove()
                            },
                            error: function () {}
                        }),
                        this
                },
                pageEvent: function () {
                    var a = this;
                    return a.pageEle.delegate("a", "click", function () {
                            var b = $(this);
                            if (!b.hasClass("disabled")) {
                                var c = a.formEle.find(".J_CurrentPageHidden"),
                                    d = parseInt(c.val());
                                b.hasClass("J_PrevPage") ? d-- : b.hasClass("J_NextPage") && d++,
                                    c.val(d),
                                    a.formSubmit()
                            }
                        }),
                        this
                },
                createPage: function (a) {
                    var b = a.page,
                        c = k.list.page,
                        d = $(this.text2html(c, b));
                    return this.pageDisabled(d, b),
                        0 == b.isPrevPage && 0 == b.isNextPage ? this.pageEle.empty() : this.pageEle.empty().append(d),
                        this
                },
                pageDisabled: function (a, b) {
                    a.find(".J_PrevPage")[1 == b.isPrevPage ? "removeClass" : "addClass"]("disabled"),
                        a.find(".J_NextPage")[1 == b.isNextPage ? "removeClass" : "addClass"]("disabled")
                },
                createLoading: function () {
                    var a = this._html,
                        b = /<#\s*LOADING\s*#>([\s\S]+)<#\s*\/LOADING\s*#>/i,
                        c = a.match(b)[1],
                        d = this.text2html(c, {});
                    return this.wrapEle.addClass("J_LoadingJsMark"),
                        this.listEle.prepend($(d).addClass("J_ListLoading")),
                        this
                },
                createNoCon: function () {
                    var a = this._html,
                        b = /<#\s*NOCONTENT\s*#>([\s\S]+)<#\s*\/NOCONTENT\s*#>/i,
                        c = a.match(b)[1],
                        d = this.text2html(c, {});
                    this.listEle.html(d)
                },
                createSubItems: function (a, b, c) {
                    for (var d = "", e = a[b], f = e instanceof Array ? e.length : 0, g = 0; f > g; g++)
                        d += this.text2html(c, e[g]);
                    return a[b] = d,
                        this
                },
                getSubStrs: function () {
                    var a = this._html,
                        b = /<#\s*SUBCON\s*#>([\s\S]+)<#\s*\/SUBCON\s*#>/i,
                        c = a.match(b),
                        d = {};
                    if (c) {
                        c = c[1];
                        for (var e = c.match(/<#\s*[^\/]+?\s*#>/gi), f = 0, g = e.length; g > f; f++) {
                            var h = e[f].replace(/<#\s*([\s\S]+)\s*#>/i, "$1");
                            d[h] = c.match(new RegExp("<#\\s*" + h + "\\s*#>([\\s\\S]+)<#\\s*\\/" + h + "\\s*#>", "i"))[1]
                        }
                    }
                    return d
                },
                createItems: function (a) {
                    for (var b = a.result.data, c = this._html, d = /<#\s*CONTENT\s*#>([\s\S]+)<#\s*\/CONTENT\s*#>/i, e = "", f = b instanceof Array ? b.length : 0, g = c.match(d)[1], h = this.getSubStrs(), i = 0; f > i; i++) {
                        this.itemFunc(b[i]);
                        for (var j in h)
                            this.createSubItems(b[i], j, h[j]);
                        e += this.text2html(g, b[i])
                    }
                    var k = $(e);
                    this.afterRender(k, a),
                        this.listEle.empty().append(k)
                },
                text2html: i.common.text2html,
                listUpdate: function () {
                    return this.formSubmit(),
                        this
                }
            };
        var n = $("#headAccout").text();
        if (/^1[0-9]{10}$/.test(n)) {
            var o = n.replace(n.substring(3, 7), "****");
            $("#headAccout").text("").text(o)
        } else if (/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/.test(n)) {
            var p = h(n);
            $("#headAccout").text("").text(p)
        } else
            $("#headAccout").text("").text(n);
        $("#headAccout").css("display", "block"),
            c.exports = i
    }),
    define("lib/util/eye", [], function () {
        $.fn.extend({
            psdEye: function () {
                return $("[cmcc-psdId]")[0] || $(window).on("resize", function () {
                        $("[cmcc-psdId]").each(function () {
                            var a = $(this),
                                b = a.position(),
                                c = b.left,
                                d = b.top,
                                e = a.outerWidth(),
                                f = a.outerHeight();
                            $("#" + a.attr("cmcc-psdId")).css({
                                left: c + "px",
                                top: d + "px",
                                width: e + "px"
                            }).siblings("em").css({
                                "margin-top": function () {
                                    return parseInt((f - $(this).height()) / 2, 10) + "px"
                                }
                            })
                        })
                    }),
                    this.each(function () {
                        var a = $(this);
                        if (!a.hasClass("J_NoPsdEye")) {
                            var b = a.position(),
                                c = b.left,
                                d = b.top,
                                e = a.outerWidth(),
                                f = a.outerHeight(),
                                g = function () {
                                    var a = "",
                                        b = [],
                                        c = 0,
                                        d = "0123456789ABCDEF";
                                    for (c = 0; 32 > c; c++)
                                        b[c] = d.substr(Math.floor(16 * Math.random()), 1);
                                    return b[12] = "4",
                                        b[16] = d.substr(3 & b[16] | 8, 1),
                                        a = "J_Eye_" + b.join("")
                                }(),
                                h = '<div id="' + g + '" class="psdeyewrap" style="left:' + c + "px; top:" + d + "px; width:" + e + 'px; height:0;"><em></em></div>',
                                i = $(h);
                            a.parent().append(i),
                                i.find("em").css({
                                    "margin-top": function () {
                                        return parseInt((f - $(this).height()) / 2, 10) + "px"
                                    }
                                }),
                                a.attr("cmcc-psdId", g).on("keyup", function (a) {
                                    var b = a.which;
                                    return 18 == b ? !1 : void 0
                                }).on("paste", function () {}).on("focus", function () {
                                    var a = $(this);
                                    if (a.hasClass("J_NoTip") || a.siblings(".J_Pswtip").length > 0)
                                        return !1;
                                    var b = '<div class="pswtip J_Pswtip"><q></q>请输入6-16位数字、字母或符号的组合</div>';
                                    a.parents(".form-item").append(b)
                                }).on("blur", function () {
                                    var a = $(this);
                                    setTimeout(function () {
                                        a.is(":focus") || $(".J_Pswtip").remove()
                                    }, 100)
                                }),
                                $("#" + g).find(":text").on("keyup", function () {}).on("input", function () {}).on("paste", function () {}).on("blur", function () {}).on("focus", function () {
                                    $(".txt").attr("ignore", "ignore")
                                }).end().find("em").on("click", function () {
                                    var a = $(this);
                                    a.parents(".form-item").addClass("eyenotip"),
                                        a.hasClass("see") ? (a.parents(".form-item").find("input[type=text]").attr("type", "password").removeAttr("cmcc-type"),
                                            $("[cmcc-psdId=" + a.parent().attr("id") + "]").trigger("focus"),
                                            a.removeClass("see")) : (a.parents(".form-item").find("input[type=password]").attr({
                                                type: "text",
                                                "cmcc-type": "password"
                                            }),
                                            $("[cmcc-psdId=" + a.parent().attr("id") + "]").trigger("focus"),
                                            a.addClass("see")),
                                        setTimeout(function () {
                                            a.parents(".form-item").addClass("focus").removeClass("eyenotip")
                                        }, 90),
                                        $(".login-game-wrap").length > 0 && ($("body").addClass("eyetip"),
                                            $(window).trigger("resize"))
                                }),
                                a = null
                        }
                    })
            },
            psdEye1: function () {
                return $("[cmcc-psdId]")[0] || $(window).on("resize", function () {
                        $("[cmcc-psdId]").each(function () {
                            {
                                var a = $(this),
                                    b = (a.position(),
                                        0),
                                    c = 0,
                                    d = 308;
                                a.outerHeight()
                            }
                            $("#" + a.attr("cmcc-psdId")).css({
                                left: b + "px",
                                top: c + "px",
                                width: d + "px"
                            }).siblings("em").css({
                                "margin-top": function () {
                                    return "15px"
                                }
                            })
                        })
                    }),
                    this.each(function () {
                        var a = $(this);
                        if (!a.hasClass("J_NoPsdEye")) {
                            var b = (a.position(),
                                    0),
                                c = 0,
                                d = 308,
                                e = (a.outerHeight(),
                                    function () {
                                        var a = "",
                                            b = [],
                                            c = 0,
                                            d = "0123456789ABCDEF";
                                        for (c = 0; 32 > c; c++)
                                            b[c] = d.substr(Math.floor(16 * Math.random()), 1);
                                        return b[12] = "4",
                                            b[16] = d.substr(3 & b[16] | 8, 1),
                                            a = "J_Eye_" + b.join("")
                                    }()),
                                f = '<div id="' + e + '" class="psdeyewrap" style="left:' + b + "px; top:" + c + "px; width:" + d + 'px; height:0;"><em></em></div>',
                                g = $(f);
                            a.parent().append(g),
                                g.find("em").css({
                                    "margin-top": function () {
                                        return "15px"
                                    }
                                }),
                                a.attr("cmcc-psdId", e).on("keyup", function (a) {
                                    var b = a.which;
                                    return 18 == b ? !1 : void 0
                                }).on("paste", function () {}).on("focus", function () {
                                    var a = $(this);
                                    if (a.hasClass("J_NoTip") || a.siblings(".J_Pswtip").length > 0)
                                        return !1;
                                    var b = '<div class="pswtip J_Pswtip"><q></q>请输入6-16位数字、字母或符号的组合</div>';
                                    a.parents(".form-item").append(b)
                                }).on("blur", function () {
                                    var a = $(this);
                                    setTimeout(function () {
                                        a.is(":focus") || $(".J_Pswtip").remove()
                                    }, 100)
                                }),
                                $("#" + e).find(":text").on("keyup", function () {}).on("input", function () {}).on("paste", function () {}).on("blur", function () {}).on("focus", function () {
                                    $(".txt").attr("ignore", "ignore")
                                }).end().find("em").on("click", function () {
                                    var a = $(this);
                                    a.parents(".form-item").addClass("eyenotip"),
                                        a.hasClass("see") ? (a.parents(".form-item").find("input[type=text]").attr("type", "password").removeAttr("cmcc-type"),
                                            $("[cmcc-psdId=" + a.parent().attr("id") + "]").trigger("focus"),
                                            a.removeClass("see")) : (a.parents(".form-item").find("input[type=password]").attr({
                                                type: "text",
                                                "cmcc-type": "password"
                                            }),
                                            $("[cmcc-psdId=" + a.parent().attr("id") + "]").trigger("focus"),
                                            a.addClass("see")),
                                        setTimeout(function () {
                                            a.parents(".form-item").addClass("focus").removeClass("eyenotip")
                                        }, 90),
                                        $(".login-game-wrap").length > 0 && ($("body").addClass("eyetip"),
                                            $(window).trigger("resize"))
                                }),
                                a = null
                        }
                    })
            }
        })
    }),
    define("lib/util/imgslide", [], function (a, b, c) {
        function d(a) {
            this.wrapEle = a.wrapEle,
                this.ajaxSuc = a.success || $.noop,
                this.dataHandler = a.dataHandler || $.noop,
                this.dataValidHandler = a.dataValidHandler || $.noop,
                this.isSta = a.isSta || !this.isPc,
                this.isActive = !a.isDisabled,
                this.data = {
                    tempArr: []
                },
                this.init()
        }

        function e(a) {
            $(a.expr).each(function () {
                new d($.extend({
                    wrapEle: $(this)
                }, a))
            })
        }
        d.prototype = {
                constructor: d,
                init: function () {
                    this.initHtml().refresh().handlerHover().dragStart().dragMove().dragEnd().onRefresh().onClear()
                },
                initHtml: function () {
                    var a = '<div class="imgslide"><div class="imgs' + (this.isSta ? "" : " img-abs img-hide") + '"><div class="img-bg"></div><div class="img-cut"></div><a href="javascript:;" class="img-refresh J_ImgRefresh"></a></div><div class="drag' + (this.isActive ? " drag-active" : "") + '" style="display:none;"><div class="drag-txt">向右滑动验证</div><div class="drag-line"></div><div class="handler"></div></div><div class="loader"><em></em><span>加载中</span></div></div>';
                    this.wrapEle.append(a);
                    var b = this.wrapEle.attr("cmcc-imgbg"),
                        c = this.wrapEle.attr("cmcc-imgcut");
                    return b && this.wrapEle.find(".img-bg").css("background-image", b).siblings(".img-cut").css("background-image", c),
                        this
                },
                loadImg: function (a, b) {
                    var c = new Image;
                    return c.onload = b,
                        c.onerror = function () {
                            alert("img load error")
                        },
                        c.src = a,
                        this
                },
                refresh: function () {
                    var a = this;
                    this.wrapEle.find(".drag").hide().removeClass("result-err").find(".drag-txt").text("向右滑动验证").end().end().find(".loader").show();
                    var b = {};
                    return a.dataHandler(b),
                        $.ajax({
                            url: a.wrapEle.attr("cmcc-refreshAjax"),
                            type: "post",
                            data: b,
                            dataType: "json",
                            success: function (b) {
                                if (2e3 == b.status) {
                                    var c = function () {
                                        a.bgLoaded && a.cutLoaded && (a.data.loadTime = (new Date).getTime(),
                                            a.data.filenum = b.result.filenum,
                                            a.data.sessionID = b.result.sessionID || "",
                                            a.data.pictureWidth = b.result.pictureWidth || a.imgEle.width,
                                            a.data.pictureHeight = b.result.pictureHeight || a.imgEle.height,
                                            a.wrapEle.find(".img-bg").css({
                                                "background-image": "url(" + b.result.bgurl + ")"
                                            }).siblings(".img-cut").css({
                                                "background-image": "url(" + b.result.cuturl + ")",
                                                width: a.cutEle.width + "px",
                                                height: a.cutEle.height + "px",
                                                left: 0
                                            }).end().end().find(".loader").hide().siblings(".drag").show())
                                    };
                                    a.loadImg(b.result.bgurl, function () {
                                        a.bgLoaded = !0,
                                            a.imgEle = this,
                                            c()
                                    }).loadImg(b.result.cuturl, function () {
                                        a.cutLoaded = !0,
                                            a.cutEle = this,
                                            c()
                                    })
                                } else {
                                    var d = '获取滑验失败，请点此<span class="J_ImgRefresh">刷新</span>';
                                    6124 == b.status ? d = '刷新过于频繁，点此<span class="J_ImgClear">重试</span>' : 6125 == b.status ? d = '失败过多，点此<span class="J_ImgClear">重试</span>' : 4067 == b.status && (d = "页面已失效，请刷新页面"),
                                        a.wrapEle.find(".loader").hide().siblings(".drag").show(),
                                        a.refreshErrFunc(d)
                                }
                            },
                            error: function () {
                                a.wrapEle.find(".loader").hide().siblings(".drag").show(),
                                    a.refreshErrFunc('获取滑验失败，请点此<span class="J_ImgRefresh">刷新</span>')
                            }
                        }),
                        this
                },
                isPc: function () {
                    var a = {},
                        b = navigator.userAgent;
                    a.iphone = b.indexOf("iPhone") > -1,
                        a.ipod = b.indexOf("iPod") > -1,
                        a.ipad = b.indexOf("iPad") > -1,
                        a.nokiaN = b.indexOf("NokiaN") > -1,
                        /Win(?:dows )?([^do]{2})/.test(b),
                        a.winMobile = /^CE|Ph$/.test(RegExp.$1),
                        a.ios = 0 == navigator.platform.indexOf("Mac") && b.indexOf("Mobile") > -1,
                        a.android = b.indexOf("Android") > -1;
                    var c = a.iphone || a.ipod || a.ipad || a.nokiaN || a.winMobile || a.ios || a.android;
                    return !c
                }(),
                getPageX: function (a) {
                    return this.getPageX = this.isPc ? function (a) {
                            return Math.round(a.pageX)
                        } :
                        function (a) {
                            return Math.round(a.originalEvent.targetTouches[0].pageX)
                        },
                        this.getPageX(a)
                },
                getPageY: function (a) {
                    return this.getPageY = this.isPc ? function (a) {
                            return Math.round(a.pageY)
                        } :
                        function (a) {
                            return Math.round(a.originalEvent.targetTouches[0].pageY)
                        },
                        this.getPageY(a)
                },
                handlerHover: function () {
                    var a = this;
                    return this.isPc && this.wrapEle.delegate(".handler", "mouseenter", function () {
                            a.wrapEle.find(".drag").hasClass("drag-active") && !a.wrapEle.find(".drag").is(".drag-suc,.drag-err") && a.wrapEle.find(".imgs").removeClass("img-hide").siblings(".drag").addClass("drag-hover")
                        }).delegate(".handler", "mouseleave", function () {
                            a.wrapEle.find(".drag").removeClass("drag-hover")
                        }),
                        this.isSta || $("body").on("click", function (b) {
                            var c = $(b.target).closest(".imgslide");
                            c[0] || a.wrapEle.find(".imgs").addClass("img-hide")
                        }),
                        this
                },
                dragStart: function () {
                    var a = this.isPc ? "mousedown" : "touchstart",
                        b = this;
                    return this.wrapEle.delegate(".handler", a, function (a) {
                            if (b.wrapEle.find(".drag").hasClass("drag-active") && !b.wrapEle.find(".drag").is(".drag-suc,.drag-err")) {
                                b.data.operateStartTime = (new Date).getTime(),
                                    b.data.operateStartTrackX = b.getPageX(a),
                                    b.data.operateStartTrackY = b.getPageY(a),
                                    b.data.tempArr = null,
                                    b.data.tempArr = [];
                                var c = $(this),
                                    d = c.parent(),
                                    e = b.wrapEle.find(".img-cut");
                                return b.isMove = !0,
                                    b._x = b.getPageX(a),
                                    b.imgMaxWidth = d.width() - e.width(),
                                    b.handlerMaxWidth = d.width() - c.width(),
                                    d.addClass("drag-move drag-ctxt"),
                                    $(":focus").blur(),
                                    !1
                            }
                        }),
                        this
                },
                dragMove: function () {
                    var a = this.isPc ? "mousemove" : "touchmove",
                        b = this;
                    return $(document).on(a, function (a) {
                            if (b.wrapEle.find(".drag").hasClass("drag-active") && !b.wrapEle.find(".drag").is(".drag-suc,.drag-err") && b.isMove) {
                                var c = b.wrapEle.find(".handler"),
                                    d = b.getPageX(a) - b._x,
                                    e = d;
                                0 > d ? e = 0 : d > b.handlerMaxWidth && (e = b.handlerMaxWidth),
                                    c.css({
                                        left: e + "px"
                                    }).siblings(".drag-line").css({
                                        width: e + 20 + "px"
                                    });
                                var f = d;
                                0 > d ? f = 0 : d > b.imgMaxWidth ? f = b.imgMaxWidth : b.data.tempArr.push({
                                        x: b.getPageX(a),
                                        y: b.getPageY(a),
                                        time: (new Date).getTime().toString()
                                    }),
                                    b.wrapEle.find(".img-cut").css({
                                        left: f + "px"
                                    })
                            }
                        }),
                        this
                },
                dragEnd: function () {
                    var a = this.isPc ? "mouseup" : "touchend",
                        b = this;
                    return $(document).on(a, function (a) {
                            if (b.wrapEle.find(".drag").hasClass("drag-active") && !b.wrapEle.find(".drag").is(".drag-suc,.drag-err") && b.isMove) {
                                var c = b.wrapEle.find(".handler"),
                                    d = c.parent();
                                d.removeClass("drag-move").addClass("valid-loading"),
                                    b.isMove = !1;
                                var e = {};
                                e.operateEndTime = (new Date).getTime(),
                                    e.operateStartTime = b.data.operateStartTime,
                                    e.operateStartTrackX = b.data.operateStartTrackX,
                                    e.operateStartTrackY = b.data.operateStartTrackY,
                                    e.loadTime = b.data.loadTime,
                                    e.sessionID = b.data.sessionID,
                                    e.filenum = b.data.filenum,
                                    e.pictureWidth = b.data.pictureWidth,
                                    e.pictureHeight = b.data.pictureHeight;
                                var f = b.data.tempArr.length,
                                    g = Math.max(Math.floor(f / 6), 1);
                                f = Math.min(f, 6 * g);
                                for (var h = g; f > h; h += g) {
                                    var i = b.data.tempArr[h],
                                        j = h / g;
                                    e["slideTime" + j] = i.time,
                                        e["slideTrackX" + j] = i.x,
                                        e["slideTrackY" + j] = i.y
                                }
                                b.isPc ? (e.slideEndLeft = Math.round(a.pageX) - b._x,
                                    e.operateEndTrackX = Math.round(a.pageX),
                                    e.operateEndTrackY = Math.round(a.pageY)) : (e.slideEndLeft = Math.round(a.originalEvent.changedTouches[0].pageX) - b._x,
                                    e.operateEndTrackX = Math.round(a.originalEvent.changedTouches[0].pageX),
                                    e.operateEndTrackY = Math.round(a.originalEvent.changedTouches[0].pageY));
                                var k = {},
                                    l = "{";
                                for (var m in e)
                                    l += '"' + m + '":"' + e[m] + '",';
                                l = l.substring(0, l.length - 1),
                                    l += "}",
                                    k.captcha = l,
                                    b.dataValidHandler(k),
                                    $.ajax({
                                        url: b.wrapEle.attr("cmcc-validAjax"),
                                        type: "post",
                                        data: k,
                                        dataType: "json",
                                        success: function (a) {
                                            d.removeClass("valid-loading"),
                                                2e3 == a.status ? b.sucFunc(a) : 4065 == a.status ? b.specialErrFunc('图片已失效，点此<span class="J_ImgClear">重试</span>') : 6124 == a.status ? b.specialErrFunc('刷新过于频繁，点此<span class="J_ImgClear">重试</span>') : 6125 == a.status ? b.specialErrFunc('失败过多，点此<span class="J_ImgClear">重试</span>') : 4067 == a.status ? b.specialErrFunc("页面已失效，请刷新页面") : b.errFunc()
                                        },
                                        error: function () {
                                            d.removeClass("valid-loading"),
                                                b.errFunc()
                                        }
                                    })
                            }
                        }),
                        this
                },
                onRefresh: function () {
                    var a = this;
                    return this.wrapEle.delegate(".J_ImgRefresh", "click", function () {
                            a.refresh()
                        }),
                        this
                },
                onClear: function () {
                    var a = this;
                    return this.wrapEle.delegate(".J_ImgClear", "click", function () {
                            var b = {};
                            a.dataHandler(b),
                                a.refresh()
                        }),
                        this
                },
                sucFunc: function (a) {
                    var b = this,
                        c = this.wrapEle.find(".drag").addClass("drag-suc");
                    return $.ajax({
                            url: this.wrapEle.attr("cmcc-clearAjax"),
                            type: "post",
                            data: a,
                            dataType: "json"
                        }),
                        setTimeout(function () {
                            this.isSta || c.siblings(".imgs").hide(),
                                b.ajaxSuc(a),
                                b = null
                        }, 600),
                        this
                },
                refreshErrFunc: function (a) {
                    return this.wrapEle.find(".drag").removeClass("drag-ctxt").addClass("result-err").find(".drag-txt").html(a).siblings(".handler").css({
                            left: 0
                        }),
                        this
                },
                specialErrFunc: function (a) {
                    var b = this.wrapEle.find(".drag").addClass("drag-err");
                    return setTimeout(function () {
                            b.removeClass("drag-err drag-ctxt").addClass("result-err").find(".drag-txt").html(a).siblings(".handler").css({
                                left: 0
                            })
                        }, 600),
                        this
                },
                errFunc: function () {
                    var a = this;
                    return this.wrapEle.find(".drag").addClass("drag-err"),
                        setTimeout(function () {
                            a.wrapEle.find(".handler").animate({
                                left: 0
                            }, 500, function () {
                                $(this).parent().removeClass("drag-err drag-ctxt"),
                                    a.refresh()
                            }).siblings(".drag-line").animate({
                                width: 20
                            })
                        }, 500),
                        this
                }
            },
            c.exports = e
    }),
    define("lib/fingerprint/fingerprint", [], function (a, b, c) {
        ! function (a, b, d) {
            "use strict";
            "function" == typeof window.define && window.define.amd ? window.define(d) : "undefined" != typeof c && c.exports ? c.exports = d() : b.exports ? b.exports = d() : b[a] = d()
        }("Fingerprint2", this, function () {
            "use strict";
            var a = function (b) {
                if (!(this instanceof a))
                    return new a(b);
                var c = {
                    swfContainerId: "fingerprintjs2",
                    swfPath: "flash/compiled/FontList.swf",
                    detectScreenOrientation: !0,
                    sortPluginsFor: [/palemoon/i],
                    userDefinedFonts: []
                };
                this.options = this.extend(b, c),
                    this.nativeForEach = Array.prototype.forEach,
                    this.nativeMap = Array.prototype.map
            };
            return a.prototype = {
                    extend: function (a, b) {
                        if (null == a)
                            return b;
                        for (var c in a)
                            null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
                        return b
                    },
                    get: function (a) {
                        var b = this,
                            c = {
                                data: [],
                                addPreprocessedComponent: function (a) {
                                    var c = a.value;
                                    "function" == typeof b.options.preprocessor && (c = b.options.preprocessor(a.key, c)),
                                        this.data.push({
                                            key: a.key,
                                            value: c
                                        })
                                }
                            };
                        c = this.userAgentKey(c),
                            c = this.languageKey(c),
                            c = this.colorDepthKey(c),
                            c = this.pixelRatioKey(c),
                            c = this.hardwareConcurrencyKey(c),
                            c = this.screenResolutionKey(c),
                            c = this.availableScreenResolutionKey(c),
                            c = this.timezoneOffsetKey(c),
                            c = this.sessionStorageKey(c),
                            c = this.localStorageKey(c),
                            c = this.indexedDbKey(c),
                            c = this.addBehaviorKey(c),
                            c = this.openDatabaseKey(c),
                            c = this.cpuClassKey(c),
                            c = this.platformKey(c),
                            c = this.doNotTrackKey(c),
                            c = this.pluginsKey(c),
                            c = this.canvasKey(c),
                            c = this.webglKey(c),
                            c = this.webglVendorAndRendererKey(c),
                            c = this.adBlockKey(c),
                            c = this.hasLiedLanguagesKey(c),
                            c = this.hasLiedResolutionKey(c),
                            c = this.hasLiedOsKey(c),
                            c = this.hasLiedBrowserKey(c),
                            c = this.touchSupportKey(c),
                            c = this.customEntropyFunction(c),
                            this.fontsKey(c, function (c) {
                                var d = [];
                                b.each(c.data, function (a) {
                                    var b = a.value;
                                    null !== a.value && "undefined" != typeof a.value.join && (b = a.value.join(";")),
                                        d.push(b)
                                });
                                var e = b.x64hash128(d.join("~~~"), 31);
                                return a(e, c.data)
                            })
                    },
                    customEntropyFunction: function (a) {
                        return "function" == typeof this.options.customFunction && a.addPreprocessedComponent({
                                key: "custom",
                                value: this.options.customFunction()
                            }),
                            a
                    },
                    userAgentKey: function (a) {
                        return this.options.excludeUserAgent || a.addPreprocessedComponent({
                                key: "user_agent",
                                value: this.getUserAgent()
                            }),
                            a
                    },
                    getUserAgent: function () {
                        return navigator.userAgent
                    },
                    languageKey: function (a) {
                        return this.options.excludeLanguage || a.addPreprocessedComponent({
                                key: "language",
                                value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
                            }),
                            a
                    },
                    colorDepthKey: function (a) {
                        return this.options.excludeColorDepth || a.addPreprocessedComponent({
                                key: "color_depth",
                                value: window.screen.colorDepth || -1
                            }),
                            a
                    },
                    pixelRatioKey: function (a) {
                        return this.options.excludePixelRatio || a.addPreprocessedComponent({
                                key: "pixel_ratio",
                                value: this.getPixelRatio()
                            }),
                            a
                    },
                    getPixelRatio: function () {
                        return window.devicePixelRatio || ""
                    },
                    screenResolutionKey: function (a) {
                        return this.options.excludeScreenResolution ? a : this.getScreenResolution(a)
                    },
                    getScreenResolution: function (a) {
                        var b;
                        return b = this.options.detectScreenOrientation && window.screen.height > window.screen.width ? [window.screen.height, window.screen.width] : [window.screen.width, window.screen.height],
                            "undefined" != typeof b && a.addPreprocessedComponent({
                                key: "resolution",
                                value: b
                            }),
                            a
                    },
                    availableScreenResolutionKey: function (a) {
                        return this.options.excludeAvailableScreenResolution ? a : this.getAvailableScreenResolution(a)
                    },
                    getAvailableScreenResolution: function (a) {
                        var b;
                        return window.screen.availWidth && window.screen.availHeight && (b = this.options.detectScreenOrientation ? window.screen.availHeight > window.screen.availWidth ? [window.screen.availHeight, window.screen.availWidth] : [window.screen.availWidth, window.screen.availHeight] : [window.screen.availHeight, window.screen.availWidth]),
                            "undefined" != typeof b && a.addPreprocessedComponent({
                                key: "available_resolution",
                                value: b
                            }),
                            a
                    },
                    timezoneOffsetKey: function (a) {
                        return this.options.excludeTimezoneOffset || a.addPreprocessedComponent({
                                key: "timezone_offset",
                                value: (new Date).getTimezoneOffset()
                            }),
                            a
                    },
                    sessionStorageKey: function (a) {
                        return !this.options.excludeSessionStorage && this.hasSessionStorage() && a.addPreprocessedComponent({
                                key: "session_storage",
                                value: 1
                            }),
                            a
                    },
                    localStorageKey: function (a) {
                        return !this.options.excludeSessionStorage && this.hasLocalStorage() && a.addPreprocessedComponent({
                                key: "local_storage",
                                value: 1
                            }),
                            a
                    },
                    indexedDbKey: function (a) {
                        return !this.options.excludeIndexedDB && this.hasIndexedDB() && a.addPreprocessedComponent({
                                key: "indexed_db",
                                value: 1
                            }),
                            a
                    },
                    addBehaviorKey: function (a) {
                        return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && a.addPreprocessedComponent({
                                key: "add_behavior",
                                value: 1
                            }),
                            a
                    },
                    openDatabaseKey: function (a) {
                        return !this.options.excludeOpenDatabase && window.openDatabase && a.addPreprocessedComponent({
                                key: "open_database",
                                value: 1
                            }),
                            a
                    },
                    cpuClassKey: function (a) {
                        return this.options.excludeCpuClass || a.addPreprocessedComponent({
                                key: "cpu_class",
                                value: this.getNavigatorCpuClass()
                            }),
                            a
                    },
                    platformKey: function (a) {
                        return this.options.excludePlatform || a.addPreprocessedComponent({
                                key: "navigator_platform",
                                value: this.getNavigatorPlatform()
                            }),
                            a
                    },
                    doNotTrackKey: function (a) {
                        return this.options.excludeDoNotTrack || a.addPreprocessedComponent({
                                key: "do_not_track",
                                value: this.getDoNotTrack()
                            }),
                            a
                    },
                    canvasKey: function (a) {
                        return !this.options.excludeCanvas && this.isCanvasSupported() && a.addPreprocessedComponent({
                                key: "canvas",
                                value: this.getCanvasFp()
                            }),
                            a
                    },
                    webglKey: function (a) {
                        return !this.options.excludeWebGL && this.isWebGlSupported() && a.addPreprocessedComponent({
                                key: "webgl",
                                value: this.getWebglFp()
                            }),
                            a
                    },
                    webglVendorAndRendererKey: function (a) {
                        return !this.options.excludeWebGLVendorAndRenderer && this.isWebGlSupported() && a.addPreprocessedComponent({
                                key: "webgl_vendor",
                                value: this.getWebglVendorAndRenderer()
                            }),
                            a
                    },
                    adBlockKey: function (a) {
                        return this.options.excludeAdBlock || a.addPreprocessedComponent({
                                key: "adblock",
                                value: this.getAdBlock()
                            }),
                            a
                    },
                    hasLiedLanguagesKey: function (a) {
                        return this.options.excludeHasLiedLanguages || a.addPreprocessedComponent({
                                key: "has_lied_languages",
                                value: this.getHasLiedLanguages()
                            }),
                            a
                    },
                    hasLiedResolutionKey: function (a) {
                        return this.options.excludeHasLiedResolution || a.addPreprocessedComponent({
                                key: "has_lied_resolution",
                                value: this.getHasLiedResolution()
                            }),
                            a
                    },
                    hasLiedOsKey: function (a) {
                        return this.options.excludeHasLiedOs || a.addPreprocessedComponent({
                                key: "has_lied_os",
                                value: this.getHasLiedOs()
                            }),
                            a
                    },
                    hasLiedBrowserKey: function (a) {
                        return this.options.excludeHasLiedBrowser || a.addPreprocessedComponent({
                                key: "has_lied_browser",
                                value: this.getHasLiedBrowser()
                            }),
                            a
                    },
                    fontsKey: function (a, b) {
                        return this.options.excludeJsFonts ? this.flashFontsKey(a, b) : this.jsFontsKey(a, b)
                    },
                    flashFontsKey: function (a, b) {
                        return this.options.excludeFlashFonts ? b(a) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? "undefined" == typeof this.options.swfPath ? b(a) : void this.loadSwfAndDetectFonts(function (c) {
                            a.addPreprocessedComponent({
                                    key: "swf_fonts",
                                    value: c.join(";")
                                }),
                                b(a)
                        }) : b(a)
                    },
                    jsFontsKey: function (a, b) {
                        var c = this;
                        return setTimeout(function () {
                            var d = ["monospace", "sans-serif", "serif"],
                                e = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"],
                                f = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
                            c.options.extendedJsFonts && (e = e.concat(f)),
                                e = e.concat(c.options.userDefinedFonts);
                            var g = "mmmmmmmmmmlli",
                                h = "72px",
                                i = document.getElementsByTagName("body")[0],
                                j = document.createElement("div"),
                                k = document.createElement("div"),
                                l = {},
                                m = {},
                                n = function () {
                                    var a = document.createElement("span");
                                    return a.style.position = "absolute",
                                        a.style.left = "-9999px",
                                        a.style.fontSize = h,
                                        a.style.lineHeight = "normal",
                                        a.innerHTML = g,
                                        a
                                },
                                o = function (a, b) {
                                    var c = n();
                                    return c.style.fontFamily = "'" + a + "'," + b,
                                        c
                                },
                                p = function () {
                                    for (var a = [], b = 0, c = d.length; c > b; b++) {
                                        var e = n();
                                        e.style.fontFamily = d[b],
                                            j.appendChild(e),
                                            a.push(e)
                                    }
                                    return a
                                },
                                q = function () {
                                    for (var a = {}, b = 0, c = e.length; c > b; b++) {
                                        for (var f = [], g = 0, h = d.length; h > g; g++) {
                                            var i = o(e[b], d[g]);
                                            k.appendChild(i),
                                                f.push(i)
                                        }
                                        a[e[b]] = f
                                    }
                                    return a
                                },
                                r = function (a) {
                                    for (var b = !1, c = 0; c < d.length; c++)
                                        if (b = a[c].offsetWidth !== l[d[c]] || a[c].offsetHeight !== m[d[c]])
                                            return b;
                                    return b
                                },
                                s = p();
                            i.appendChild(j);
                            for (var t = 0, u = d.length; u > t; t++)
                                l[d[t]] = s[t].offsetWidth,
                                m[d[t]] = s[t].offsetHeight;
                            var v = q();
                            i.appendChild(k);
                            for (var w = [], x = 0, y = e.length; y > x; x++)
                                r(v[e[x]]) && w.push(e[x]);
                            i.removeChild(k),
                                i.removeChild(j),
                                a.addPreprocessedComponent({
                                    key: "js_fonts",
                                    value: w
                                }),
                                b(a)
                        }, 1)
                    },
                    pluginsKey: function (a) {
                        return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || a.addPreprocessedComponent({
                                key: "ie_plugins",
                                value: this.getIEPlugins()
                            }) : a.addPreprocessedComponent({
                                key: "regular_plugins",
                                value: this.getRegularPlugins()
                            })),
                            a
                    },
                    getRegularPlugins: function () {
                        for (var a = [], b = 0, c = navigator.plugins.length; c > b; b++)
                            a.push(navigator.plugins[b]);
                        return this.pluginsShouldBeSorted() && (a = a.sort(function (a, b) {
                                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                            })),
                            this.map(a, function (a) {
                                var b = this.map(a, function (a) {
                                    return [a.type, a.suffixes].join("~")
                                }).join(",");
                                return [a.name, a.description, b].join("::")
                            }, this)
                    },
                    getIEPlugins: function () {
                        var a = [];
                        if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
                            var b = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                            a = this.map(b, function (a) {
                                try {
                                    return new window.ActiveXObject(a),
                                        a
                                } catch (b) {
                                    return null
                                }
                            })
                        }
                        return navigator.plugins && (a = a.concat(this.getRegularPlugins())),
                            a
                    },
                    pluginsShouldBeSorted: function () {
                        for (var a = !1, b = 0, c = this.options.sortPluginsFor.length; c > b; b++) {
                            var d = this.options.sortPluginsFor[b];
                            if (navigator.userAgent.match(d)) {
                                a = !0;
                                break
                            }
                        }
                        return a
                    },
                    touchSupportKey: function (a) {
                        return this.options.excludeTouchSupport || a.addPreprocessedComponent({
                                key: "touch_support",
                                value: this.getTouchSupport()
                            }),
                            a
                    },
                    hardwareConcurrencyKey: function (a) {
                        return this.options.excludeHardwareConcurrency || a.addPreprocessedComponent({
                                key: "hardware_concurrency",
                                value: this.getHardwareConcurrency()
                            }),
                            a
                    },
                    hasSessionStorage: function () {
                        try {
                            return !!window.sessionStorage
                        } catch (a) {
                            return !0
                        }
                    },
                    hasLocalStorage: function () {
                        try {
                            return !!window.localStorage
                        } catch (a) {
                            return !0
                        }
                    },
                    hasIndexedDB: function () {
                        try {
                            return !!window.indexedDB
                        } catch (a) {
                            return !0
                        }
                    },
                    getHardwareConcurrency: function () {
                        return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown"
                    },
                    getNavigatorCpuClass: function () {
                        return navigator.cpuClass ? navigator.cpuClass : "unknown"
                    },
                    getNavigatorPlatform: function () {
                        return navigator.platform ? navigator.platform : "unknown"
                    },
                    getDoNotTrack: function () {
                        return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
                    },
                    getTouchSupport: function () {
                        var a = 0,
                            b = !1;
                        "undefined" != typeof navigator.maxTouchPoints ? a = navigator.maxTouchPoints : "undefined" != typeof navigator.msMaxTouchPoints && (a = navigator.msMaxTouchPoints);
                        try {
                            document.createEvent("TouchEvent"),
                                b = !0
                        } catch (c) {}
                        var d = "ontouchstart" in window;
                        return [a, b, d]
                    },
                    getCanvasFp: function () {
                        var a = [],
                            b = document.createElement("canvas");
                        b.width = 2e3,
                            b.height = 200,
                            b.style.display = "inline";
                        var c = b.getContext("2d");
                        return c.rect(0, 0, 10, 10),
                            c.rect(2, 2, 6, 6),
                            a.push("canvas winding:" + (c.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")),
                            c.textBaseline = "alphabetic",
                            c.fillStyle = "#f60",
                            c.fillRect(125, 1, 62, 20),
                            c.fillStyle = "#069",
                            c.font = this.options.dontUseFakeFontInCanvas ? "11pt Arial" : "11pt no-real-font-123",
                            c.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                            c.fillStyle = "rgba(102, 204, 0, 0.2)",
                            c.font = "18pt Arial",
                            c.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                            c.globalCompositeOperation = "multiply",
                            c.fillStyle = "rgb(255,0,255)",
                            c.beginPath(),
                            c.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                            c.closePath(),
                            c.fill(),
                            c.fillStyle = "rgb(0,255,255)",
                            c.beginPath(),
                            c.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                            c.closePath(),
                            c.fill(),
                            c.fillStyle = "rgb(255,255,0)",
                            c.beginPath(),
                            c.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                            c.closePath(),
                            c.fill(),
                            c.fillStyle = "rgb(255,0,255)",
                            c.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                            c.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                            c.fill("evenodd"),
                            a.push("canvas fp:" + b.toDataURL()),
                            a.join("~")
                    },
                    getWebglFp: function () {
                        var a, b = function (b) {
                                return a.clearColor(0, 0, 0, 1),
                                    a.enable(a.DEPTH_TEST),
                                    a.depthFunc(a.LEQUAL),
                                    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
                                    "[" + b[0] + ", " + b[1] + "]"
                            },
                            c = function (a) {
                                var b = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
                                if (b) {
                                    var c = a.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                                    return 0 === c && (c = 2),
                                        c
                                }
                                return null
                            };
                        if (a = this.getWebglCanvas(),
                            !a)
                            return null;
                        var d = [],
                            e = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}",
                            f = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}",
                            g = a.createBuffer();
                        a.bindBuffer(a.ARRAY_BUFFER, g);
                        var h = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                        a.bufferData(a.ARRAY_BUFFER, h, a.STATIC_DRAW),
                            g.itemSize = 3,
                            g.numItems = 3;
                        var i = a.createProgram(),
                            j = a.createShader(a.VERTEX_SHADER);
                        a.shaderSource(j, e),
                            a.compileShader(j);
                        var k = a.createShader(a.FRAGMENT_SHADER);
                        a.shaderSource(k, f),
                            a.compileShader(k),
                            a.attachShader(i, j),
                            a.attachShader(i, k),
                            a.linkProgram(i),
                            a.useProgram(i),
                            i.vertexPosAttrib = a.getAttribLocation(i, "attrVertex"),
                            i.offsetUniform = a.getUniformLocation(i, "uniformOffset"),
                            a.enableVertexAttribArray(i.vertexPosArray),
                            a.vertexAttribPointer(i.vertexPosAttrib, g.itemSize, a.FLOAT, !1, 0, 0),
                            a.uniform2f(i.offsetUniform, 1, 1),
                            a.drawArrays(a.TRIANGLE_STRIP, 0, g.numItems),
                            null != a.canvas && d.push(a.canvas.toDataURL()),
                            d.push("extensions:" + a.getSupportedExtensions().join(";")),
                            d.push("webgl aliased line width range:" + b(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE))),
                            d.push("webgl aliased point size range:" + b(a.getParameter(a.ALIASED_POINT_SIZE_RANGE))),
                            d.push("webgl alpha bits:" + a.getParameter(a.ALPHA_BITS)),
                            d.push("webgl antialiasing:" + (a.getContextAttributes().antialias ? "yes" : "no")),
                            d.push("webgl blue bits:" + a.getParameter(a.BLUE_BITS)),
                            d.push("webgl depth bits:" + a.getParameter(a.DEPTH_BITS)),
                            d.push("webgl green bits:" + a.getParameter(a.GREEN_BITS)),
                            d.push("webgl max anisotropy:" + c(a)),
                            d.push("webgl max combined texture image units:" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
                            d.push("webgl max cube map texture size:" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE)),
                            d.push("webgl max fragment uniform vectors:" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)),
                            d.push("webgl max render buffer size:" + a.getParameter(a.MAX_RENDERBUFFER_SIZE)),
                            d.push("webgl max texture image units:" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)),
                            d.push("webgl max texture size:" + a.getParameter(a.MAX_TEXTURE_SIZE)),
                            d.push("webgl max varying vectors:" + a.getParameter(a.MAX_VARYING_VECTORS)),
                            d.push("webgl max vertex attribs:" + a.getParameter(a.MAX_VERTEX_ATTRIBS)),
                            d.push("webgl max vertex texture image units:" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
                            d.push("webgl max vertex uniform vectors:" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)),
                            d.push("webgl max viewport dims:" + b(a.getParameter(a.MAX_VIEWPORT_DIMS))),
                            d.push("webgl red bits:" + a.getParameter(a.RED_BITS)),
                            d.push("webgl renderer:" + a.getParameter(a.RENDERER)),
                            d.push("webgl shading language version:" + a.getParameter(a.SHADING_LANGUAGE_VERSION)),
                            d.push("webgl stencil bits:" + a.getParameter(a.STENCIL_BITS)),
                            d.push("webgl vendor:" + a.getParameter(a.VENDOR)),
                            d.push("webgl version:" + a.getParameter(a.VERSION));
                        try {
                            var l = a.getExtension("WEBGL_debug_renderer_info");
                            l && (d.push("webgl unmasked vendor:" + a.getParameter(l.UNMASKED_VENDOR_WEBGL)),
                                d.push("webgl unmasked renderer:" + a.getParameter(l.UNMASKED_RENDERER_WEBGL)))
                        } catch (m) {}
                        return a.getShaderPrecisionFormat ? (d.push("webgl vertex shader high float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision),
                            d.push("webgl vertex shader high float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).rangeMin),
                            d.push("webgl vertex shader high float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).rangeMax),
                            d.push("webgl vertex shader medium float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision),
                            d.push("webgl vertex shader medium float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).rangeMin),
                            d.push("webgl vertex shader medium float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).rangeMax),
                            d.push("webgl vertex shader low float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).precision),
                            d.push("webgl vertex shader low float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).rangeMin),
                            d.push("webgl vertex shader low float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).rangeMax),
                            d.push("webgl fragment shader high float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision),
                            d.push("webgl fragment shader high float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).rangeMin),
                            d.push("webgl fragment shader high float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).rangeMax),
                            d.push("webgl fragment shader medium float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).precision),
                            d.push("webgl fragment shader medium float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).rangeMin),
                            d.push("webgl fragment shader medium float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).rangeMax),
                            d.push("webgl fragment shader low float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).precision),
                            d.push("webgl fragment shader low float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).rangeMin),
                            d.push("webgl fragment shader low float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).rangeMax),
                            d.push("webgl vertex shader high int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).precision),
                            d.push("webgl vertex shader high int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).rangeMin),
                            d.push("webgl vertex shader high int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).rangeMax),
                            d.push("webgl vertex shader medium int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).precision),
                            d.push("webgl vertex shader medium int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).rangeMin),
                            d.push("webgl vertex shader medium int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).rangeMax),
                            d.push("webgl vertex shader low int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).precision),
                            d.push("webgl vertex shader low int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).rangeMin),
                            d.push("webgl vertex shader low int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).rangeMax),
                            d.push("webgl fragment shader high int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).precision),
                            d.push("webgl fragment shader high int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).rangeMin),
                            d.push("webgl fragment shader high int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).rangeMax),
                            d.push("webgl fragment shader medium int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).precision),
                            d.push("webgl fragment shader medium int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).rangeMin),
                            d.push("webgl fragment shader medium int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).rangeMax),
                            d.push("webgl fragment shader low int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).precision),
                            d.push("webgl fragment shader low int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).rangeMin),
                            d.push("webgl fragment shader low int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).rangeMax),
                            d.join("~")) : d.join("~")
                    },
                    getWebglVendorAndRenderer: function () {
                        try {
                            var a = this.getWebglCanvas(),
                                b = a.getExtension("WEBGL_debug_renderer_info");
                            return a.getParameter(b.UNMASKED_VENDOR_WEBGL) + "~" + a.getParameter(b.UNMASKED_RENDERER_WEBGL)
                        } catch (c) {
                            return null
                        }
                    },
                    getAdBlock: function () {
                        var a = document.createElement("div");
                        a.innerHTML = "&nbsp;",
                            a.className = "adsbox";
                        var b = !1;
                        try {
                            document.body.appendChild(a),
                                b = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight,
                                document.body.removeChild(a)
                        } catch (c) {
                            b = !1
                        }
                        return b
                    },
                    getHasLiedLanguages: function () {
                        if ("undefined" != typeof navigator.languages)
                            try {
                                var a = navigator.languages[0].substr(0, 2);
                                if (a !== navigator.language.substr(0, 2))
                                    return !0
                            } catch (b) {
                                return !0
                            }
                        return !1
                    },
                    getHasLiedResolution: function () {
                        return window.screen.width < window.screen.availWidth ? !0 : window.screen.height < window.screen.availHeight ? !0 : !1
                    },
                    getHasLiedOs: function () {
                        var a, b = navigator.userAgent.toLowerCase(),
                            c = navigator.oscpu,
                            d = navigator.platform.toLowerCase();
                        a = b.indexOf("windows phone") >= 0 ? "Windows Phone" : b.indexOf("win") >= 0 ? "Windows" : b.indexOf("android") >= 0 ? "Android" : b.indexOf("linux") >= 0 ? "Linux" : b.indexOf("iphone") >= 0 || b.indexOf("ipad") >= 0 ? "iOS" : b.indexOf("mac") >= 0 ? "Mac" : "Other";
                        var e;
                        if (e = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? !0 : !1,
                            e && "Windows Phone" !== a && "Android" !== a && "iOS" !== a && "Other" !== a)
                            return !0;
                        if ("undefined" != typeof c) {
                            if (c = c.toLowerCase(),
                                c.indexOf("win") >= 0 && "Windows" !== a && "Windows Phone" !== a)
                                return !0;
                            if (c.indexOf("linux") >= 0 && "Linux" !== a && "Android" !== a)
                                return !0;
                            if (c.indexOf("mac") >= 0 && "Mac" !== a && "iOS" !== a)
                                return !0;
                            if ((-1 === c.indexOf("win") && -1 === c.indexOf("linux") && -1 === c.indexOf("mac")) != ("Other" === a))
                                return !0
                        }
                        return d.indexOf("win") >= 0 && "Windows" !== a && "Windows Phone" !== a ? !0 : (d.indexOf("linux") >= 0 || d.indexOf("android") >= 0 || d.indexOf("pike") >= 0) && "Linux" !== a && "Android" !== a ? !0 : (d.indexOf("mac") >= 0 || d.indexOf("ipad") >= 0 || d.indexOf("ipod") >= 0 || d.indexOf("iphone") >= 0) && "Mac" !== a && "iOS" !== a ? !0 : (-1 === d.indexOf("win") && -1 === d.indexOf("linux") && -1 === d.indexOf("mac")) != ("Other" === a) ? !0 : "undefined" == typeof navigator.plugins && "Windows" !== a && "Windows Phone" !== a ? !0 : !1
                    },
                    getHasLiedBrowser: function () {
                        var a, b = navigator.userAgent.toLowerCase(),
                            c = navigator.productSub;
                        if (a = b.indexOf("firefox") >= 0 ? "Firefox" : b.indexOf("opera") >= 0 || b.indexOf("opr") >= 0 ? "Opera" : b.indexOf("chrome") >= 0 ? "Chrome" : b.indexOf("safari") >= 0 ? "Safari" : b.indexOf("trident") >= 0 ? "Internet Explorer" : "Other",
                            ("Chrome" === a || "Safari" === a || "Opera" === a) && "20030107" !== c)
                            return !0;
                        var d = eval.toString().length;
                        if (37 === d && "Safari" !== a && "Firefox" !== a && "Other" !== a)
                            return !0;
                        if (39 === d && "Internet Explorer" !== a && "Other" !== a)
                            return !0;
                        if (33 === d && "Chrome" !== a && "Opera" !== a && "Other" !== a)
                            return !0;
                        var e;
                        try {
                            throw "a"
                        } catch (f) {
                            try {
                                f.toSource(),
                                    e = !0
                            } catch (g) {
                                e = !1
                            }
                        }
                        return e && "Firefox" !== a && "Other" !== a ? !0 : !1
                    },
                    isCanvasSupported: function () {
                        var a = document.createElement("canvas");
                        return !(!a.getContext || !a.getContext("2d"))
                    },
                    isWebGlSupported: function () {
                        if (!this.isCanvasSupported())
                            return !1;
                        var a = this.getWebglCanvas();
                        return !!window.WebGLRenderingContext && !!a
                    },
                    isIE: function () {
                        return "Microsoft Internet Explorer" === navigator.appName ? !0 : "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
                    },
                    hasSwfObjectLoaded: function () {
                        return "undefined" != typeof window.swfobject
                    },
                    hasMinFlashInstalled: function () {
                        return window.swfobject.hasFlashPlayerVersion("9.0.0")
                    },
                    addFlashDivNode: function () {
                        var a = document.createElement("div");
                        a.setAttribute("id", this.options.swfContainerId),
                            document.body.appendChild(a)
                    },
                    loadSwfAndDetectFonts: function (a) {
                        var b = "___fp_swf_loaded";
                        window[b] = function (b) {
                            a(b)
                        };
                        var c = this.options.swfContainerId;
                        this.addFlashDivNode();
                        var d = {
                                onReady: b
                            },
                            e = {
                                allowScriptAccess: "always",
                                menu: "false"
                            };
                        window.swfobject.embedSWF(this.options.swfPath, c, "1", "1", "9.0.0", !1, d, e, {})
                    },
                    getWebglCanvas: function () {
                        var a = document.createElement("canvas"),
                            b = null;
                        try {
                            b = a.getContext("webgl") || a.getContext("experimental-webgl")
                        } catch (c) {}
                        return b || (b = null),
                            b
                    },
                    each: function (a, b, c) {
                        if (null !== a)
                            if (this.nativeForEach && a.forEach === this.nativeForEach)
                                a.forEach(b, c);
                            else if (a.length === +a.length) {
                            for (var d = 0, e = a.length; e > d; d++)
                                if (b.call(c, a[d], d, a) === {})
                                    return
                        } else
                            for (var f in a)
                                if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === {})
                                    return
                    },
                    map: function (a, b, c) {
                        var d = [];
                        return null == a ? d : this.nativeMap && a.map === this.nativeMap ? a.map(b, c) : (this.each(a, function (a, e, f) {
                                d[d.length] = b.call(c, a, e, f)
                            }),
                            d)
                    },
                    x64Add: function (a, b) {
                        a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]],
                            b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]];
                        var c = [0, 0, 0, 0];
                        return c[3] += a[3] + b[3],
                            c[2] += c[3] >>> 16,
                            c[3] &= 65535,
                            c[2] += a[2] + b[2],
                            c[1] += c[2] >>> 16,
                            c[2] &= 65535,
                            c[1] += a[1] + b[1],
                            c[0] += c[1] >>> 16,
                            c[1] &= 65535,
                            c[0] += a[0] + b[0],
                            c[0] &= 65535,
                            [c[0] << 16 | c[1], c[2] << 16 | c[3]]
                    },
                    x64Multiply: function (a, b) {
                        a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]],
                            b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]];
                        var c = [0, 0, 0, 0];
                        return c[3] += a[3] * b[3],
                            c[2] += c[3] >>> 16,
                            c[3] &= 65535,
                            c[2] += a[2] * b[3],
                            c[1] += c[2] >>> 16,
                            c[2] &= 65535,
                            c[2] += a[3] * b[2],
                            c[1] += c[2] >>> 16,
                            c[2] &= 65535,
                            c[1] += a[1] * b[3],
                            c[0] += c[1] >>> 16,
                            c[1] &= 65535,
                            c[1] += a[2] * b[2],
                            c[0] += c[1] >>> 16,
                            c[1] &= 65535,
                            c[1] += a[3] * b[1],
                            c[0] += c[1] >>> 16,
                            c[1] &= 65535,
                            c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0],
                            c[0] &= 65535,
                            [c[0] << 16 | c[1], c[2] << 16 | c[3]]
                    },
                    x64Rotl: function (a, b) {
                        return b %= 64,
                            32 === b ? [a[1], a[0]] : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b] : (b -= 32,
                                [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b])
                    },
                    x64LeftShift: function (a, b) {
                        return b %= 64,
                            0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
                    },
                    x64Xor: function (a, b) {
                        return [a[0] ^ b[0], a[1] ^ b[1]]
                    },
                    x64Fmix: function (a) {
                        return a = this.x64Xor(a, [0, a[0] >>> 1]),
                            a = this.x64Multiply(a, [4283543511, 3981806797]),
                            a = this.x64Xor(a, [0, a[0] >>> 1]),
                            a = this.x64Multiply(a, [3301882366, 444984403]),
                            a = this.x64Xor(a, [0, a[0] >>> 1])
                    },
                    x64hash128: function (a, b) {
                        a = a || "",
                            b = b || 0;
                        for (var c = a.length % 16, d = a.length - c, e = [0, b], f = [0, b], g = [0, 0], h = [0, 0], i = [2277735313, 289559509], j = [1291169091, 658871167], k = 0; d > k; k += 16)
                            g = [255 & a.charCodeAt(k + 4) | (255 & a.charCodeAt(k + 5)) << 8 | (255 & a.charCodeAt(k + 6)) << 16 | (255 & a.charCodeAt(k + 7)) << 24, 255 & a.charCodeAt(k) | (255 & a.charCodeAt(k + 1)) << 8 | (255 & a.charCodeAt(k + 2)) << 16 | (255 & a.charCodeAt(k + 3)) << 24],
                            h = [255 & a.charCodeAt(k + 12) | (255 & a.charCodeAt(k + 13)) << 8 | (255 & a.charCodeAt(k + 14)) << 16 | (255 & a.charCodeAt(k + 15)) << 24, 255 & a.charCodeAt(k + 8) | (255 & a.charCodeAt(k + 9)) << 8 | (255 & a.charCodeAt(k + 10)) << 16 | (255 & a.charCodeAt(k + 11)) << 24],
                            g = this.x64Multiply(g, i),
                            g = this.x64Rotl(g, 31),
                            g = this.x64Multiply(g, j),
                            e = this.x64Xor(e, g),
                            e = this.x64Rotl(e, 27),
                            e = this.x64Add(e, f),
                            e = this.x64Add(this.x64Multiply(e, [0, 5]), [0, 1390208809]),
                            h = this.x64Multiply(h, j),
                            h = this.x64Rotl(h, 33),
                            h = this.x64Multiply(h, i),
                            f = this.x64Xor(f, h),
                            f = this.x64Rotl(f, 31),
                            f = this.x64Add(f, e),
                            f = this.x64Add(this.x64Multiply(f, [0, 5]), [0, 944331445]);
                        switch (g = [0, 0],
                            h = [0, 0],
                            c) {
                            case 15:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 14)], 48));
                            case 14:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 13)], 40));
                            case 13:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 12)], 32));
                            case 12:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 11)], 24));
                            case 11:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 10)], 16));
                            case 10:
                                h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 9)], 8));
                            case 9:
                                h = this.x64Xor(h, [0, a.charCodeAt(k + 8)]),
                                    h = this.x64Multiply(h, j),
                                    h = this.x64Rotl(h, 33),
                                    h = this.x64Multiply(h, i),
                                    f = this.x64Xor(f, h);
                            case 8:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 7)], 56));
                            case 7:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 6)], 48));
                            case 6:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 5)], 40));
                            case 5:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 4)], 32));
                            case 4:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 3)], 24));
                            case 3:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 2)], 16));
                            case 2:
                                g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 1)], 8));
                            case 1:
                                g = this.x64Xor(g, [0, a.charCodeAt(k)]),
                                    g = this.x64Multiply(g, i),
                                    g = this.x64Rotl(g, 31),
                                    g = this.x64Multiply(g, j),
                                    e = this.x64Xor(e, g)
                        }
                        return e = this.x64Xor(e, [0, a.length]),
                            f = this.x64Xor(f, [0, a.length]),
                            e = this.x64Add(e, f),
                            f = this.x64Add(f, e),
                            e = this.x64Fmix(e),
                            f = this.x64Fmix(f),
                            e = this.x64Add(e, f),
                            f = this.x64Add(f, e),
                            ("00000000" + (e[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[1] >>> 0).toString(16)).slice(-8)
                    }
                },
                a.VERSION = "1.5.1",
                window.Fingerprint2 = a,
                a
        })
    }),
    define("lib/rsa/rsa", [], function (a, b, c) {
        function d(a, b, c) {
            null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
        }

        function e() {
            return new d(null)
        }

        function f(a, b, c, d, e, f) {
            for (; --f >= 0;) {
                var g = b * this[a++] + c[d] + e;
                e = Math.floor(g / 67108864),
                    c[d++] = 67108863 & g
            }
            return e
        }

        function g(a, b, c, d, e, f) {
            for (var g = 32767 & b, h = b >> 15; --f >= 0;) {
                var i = 32767 & this[a],
                    j = this[a++] >> 15,
                    k = h * i + j * g;
                i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e),
                    e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30),
                    c[d++] = 1073741823 & i
            }
            return e
        }

        function h(a, b, c, d, e, f) {
            for (var g = 16383 & b, h = b >> 14; --f >= 0;) {
                var i = 16383 & this[a],
                    j = this[a++] >> 14,
                    k = h * i + j * g;
                i = g * i + ((16383 & k) << 14) + c[d] + e,
                    e = (i >> 28) + (k >> 14) + h * j,
                    c[d++] = 268435455 & i
            }
            return e
        }

        function i(a) {
            return nb.charAt(a)
        }

        function j(a, b) {
            var c = ob[a.charCodeAt(b)];
            return null == c ? -1 : c
        }

        function k(a) {
            for (var b = this.t - 1; b >= 0; --b)
                a[b] = this[b];
            a.t = this.t,
                a.s = this.s
        }

        function l(a) {
            this.t = 1,
                this.s = 0 > a ? -1 : 0,
                a > 0 ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0
        }

        function m(a) {
            var b = e();
            return b.fromInt(a),
                b
        }

        function n(a, b) {
            var c;
            if (16 == b)
                c = 4;
            else if (8 == b)
                c = 3;
            else if (256 == b)
                c = 8;
            else if (2 == b)
                c = 1;
            else if (32 == b)
                c = 5;
            else {
                if (4 != b)
                    return void this.fromRadix(a, b);
                c = 2
            }
            this.t = 0,
                this.s = 0;
            for (var e = a.length, f = !1, g = 0; --e >= 0;) {
                var h = 8 == c ? 255 & a[e] : j(a, e);
                0 > h ? "-" == a.charAt(e) && (f = !0) : (f = !1,
                    0 == g ? this[this.t++] = h : g + c > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g,
                        this[this.t++] = h >> this.DB - g) : this[this.t - 1] |= h << g,
                    g += c,
                    g >= this.DB && (g -= this.DB))
            }
            8 == c && 0 != (128 & a[0]) && (this.s = -1,
                    g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)),
                this.clamp(),
                f && d.ZERO.subTo(this, this)
        }

        function o() {
            for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a;)
                --this.t
        }

        function p(a) {
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
            var c, d = (1 << b) - 1,
                e = !1,
                f = "",
                g = this.t,
                h = this.DB - g * this.DB % b;
            if (g-- > 0)
                for (h < this.DB && (c = this[g] >> h) > 0 && (e = !0,
                        f = i(c)); g >= 0;)
                    b > h ? (c = (this[g] & (1 << h) - 1) << b - h,
                        c |= this[--g] >> (h += this.DB - b)) : (c = this[g] >> (h -= b) & d,
                        0 >= h && (h += this.DB,
                            --g)),
                    c > 0 && (e = !0),
                    e && (f += i(c));
            return e ? f : "0"
        }

        function q() {
            var a = e();
            return d.ZERO.subTo(this, a),
                a
        }

        function r() {
            return this.s < 0 ? this.negate() : this
        }

        function s(a) {
            var b = this.s - a.s;
            if (0 != b)
                return b;
            var c = this.t;
            if (b = c - a.t,
                0 != b)
                return this.s < 0 ? -b : b;
            for (; --c >= 0;)
                if (0 != (b = this[c] - a[c]))
                    return b;
            return 0
        }

        function t(a) {
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

        function u() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + t(this[this.t - 1] ^ this.s & this.DM)
        }

        function v(a, b) {
            var c;
            for (c = this.t - 1; c >= 0; --c)
                b[c + a] = this[c];
            for (c = a - 1; c >= 0; --c)
                b[c] = 0;
            b.t = this.t + a,
                b.s = this.s
        }

        function w(a, b) {
            for (var c = a; c < this.t; ++c)
                b[c - a] = this[c];
            b.t = Math.max(this.t - a, 0),
                b.s = this.s
        }

        function x(a, b) {
            var c, d = a % this.DB,
                e = this.DB - d,
                f = (1 << e) - 1,
                g = Math.floor(a / this.DB),
                h = this.s << d & this.DM;
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

        function y(a, b) {
            b.s = this.s;
            var c = Math.floor(a / this.DB);
            if (c >= this.t)
                return void(b.t = 0);
            var d = a % this.DB,
                e = this.DB - d,
                f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g)
                b[g - c - 1] |= (this[g] & f) << e,
                b[g - c] = this[g] >> d;
            d > 0 && (b[this.t - c - 1] |= (this.s & f) << e),
                b.t = this.t - c,
                b.clamp()
        }

        function z(a, b) {
            for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c;)
                d += this[c] - a[c],
                b[c++] = d & this.DM,
                d >>= this.DB;
            if (a.t < this.t) {
                for (d -= a.s; c < this.t;)
                    d += this[c],
                    b[c++] = d & this.DM,
                    d >>= this.DB;
                d += this.s
            } else {
                for (d += this.s; c < a.t;)
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

        function A(a, b) {
            var c = this.abs(),
                e = a.abs(),
                f = c.t;
            for (b.t = f + e.t; --f >= 0;)
                b[f] = 0;
            for (f = 0; f < e.t; ++f)
                b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
            b.s = 0,
                b.clamp(),
                this.s != a.s && d.ZERO.subTo(b, b)
        }

        function B(a) {
            for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0;)
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

        function C(a, b, c) {
            var f = a.abs();
            if (!(f.t <= 0)) {
                var g = this.abs();
                if (g.t < f.t)
                    return null != b && b.fromInt(0),
                        void(null != c && this.copyTo(c));
                null == c && (c = e());
                var h = e(),
                    i = this.s,
                    j = a.s,
                    k = this.DB - t(f[f.t - 1]);
                k > 0 ? (f.lShiftTo(k, h),
                    g.lShiftTo(k, c)) : (f.copyTo(h),
                    g.copyTo(c));
                var l = h.t,
                    m = h[l - 1];
                if (0 != m) {
                    var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0),
                        o = this.FV / n,
                        p = (1 << this.F1) / n,
                        q = 1 << this.F2,
                        r = c.t,
                        s = r - l,
                        u = null == b ? e() : b;
                    for (h.dlShiftTo(s, u),
                        c.compareTo(u) >= 0 && (c[c.t++] = 1,
                            c.subTo(u, c)),
                        d.ONE.dlShiftTo(l, u),
                        u.subTo(h, h); h.t < l;)
                        h[h.t++] = 0;
                    for (; --s >= 0;) {
                        var v = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
                        if ((c[r] += h.am(0, v, c, s, 0, l)) < v)
                            for (h.dlShiftTo(s, u),
                                c.subTo(u, c); c[r] < --v;)
                                c.subTo(u, c)
                    }
                    null != b && (c.drShiftTo(l, b),
                            i != j && d.ZERO.subTo(b, b)),
                        c.t = l,
                        c.clamp(),
                        k > 0 && c.rShiftTo(k, c),
                        0 > i && d.ZERO.subTo(c, c)
                }
            }
        }

        function D(a) {
            var b = e();
            return this.abs().divRemTo(a, null, b),
                this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b),
                b
        }

        function E(a) {
            this.m = a
        }

        function F(a) {
            return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
        }

        function G(a) {
            return a
        }

        function H(a) {
            a.divRemTo(this.m, null, a)
        }

        function I(a, b, c) {
            a.multiplyTo(b, c),
                this.reduce(c)
        }

        function J(a, b) {
            a.squareTo(b),
                this.reduce(b)
        }

        function K() {
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

        function L(a) {
            this.m = a,
                this.mp = a.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << a.DB - 15) - 1,
                this.mt2 = 2 * a.t
        }

        function M(a) {
            var b = e();
            return a.abs().dlShiftTo(this.m.t, b),
                b.divRemTo(this.m, null, b),
                a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b),
                b
        }

        function N(a) {
            var b = e();
            return a.copyTo(b),
                this.reduce(b),
                b
        }

        function O(a) {
            for (; a.t <= this.mt2;)
                a[a.t++] = 0;
            for (var b = 0; b < this.m.t; ++b) {
                var c = 32767 & a[b],
                    d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
                for (c = b + this.m.t,
                    a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;)
                    a[c] -= a.DV,
                    a[++c]++
            }
            a.clamp(),
                a.drShiftTo(this.m.t, a),
                a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
        }

        function P(a, b) {
            a.squareTo(b),
                this.reduce(b)
        }

        function Q(a, b, c) {
            a.multiplyTo(b, c),
                this.reduce(c)
        }

        function R() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }

        function S(a, b) {
            if (a > 4294967295 || 1 > a)
                return d.ONE;
            var c = e(),
                f = e(),
                g = b.convert(this),
                h = t(a) - 1;
            for (g.copyTo(c); --h >= 0;)
                if (b.sqrTo(c, f),
                    (a & 1 << h) > 0)
                    b.mulTo(f, g, c);
                else {
                    var i = c;
                    c = f,
                        f = i
                }
            return b.revert(c)
        }

        function T(a, b) {
            var c;
            return c = 256 > a || b.isEven() ? new E(b) : new L(b),
                this.exp(a, c)
        }

        function U() {
            this.i = 0,
                this.j = 0,
                this.S = new Array
        }

        function V(a) {
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

        function W() {
            var a;
            return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                a = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = a,
                this.S[a + this.S[this.i] & 255]
        }

        function X() {
            return new U
        }

        function Y(a) {
            qb[rb++] ^= 255 & a,
                qb[rb++] ^= a >> 8 & 255,
                qb[rb++] ^= a >> 16 & 255,
                qb[rb++] ^= a >> 24 & 255,
                rb >= sb && (rb -= sb)
        }

        function Z() {
            Y((new Date).getTime())
        }

        function $() {
            if (null == pb) {
                for (Z(),
                    pb = X(),
                    pb.init(qb),
                    rb = 0; rb < qb.length; ++rb)
                    qb[rb] = 0;
                rb = 0
            }
            return pb.next()
        }

        function _(a) {
            var b;
            for (b = 0; b < a.length; ++b)
                a[b] = $()
        }

        function ab() {}

        function bb(a, b) {
            return new d(a, b)
        }

        function cb(a, b) {
            if (b < a.length + 11)
                return alert("Message too long for RSA"),
                    null;
            for (var c = new Array, e = a.length - 1; e >= 0 && b > 0;) {
                var f = a.charCodeAt(e--);
                128 > f ? c[--b] = f : f > 127 && 2048 > f ? (c[--b] = 63 & f | 128,
                    c[--b] = f >> 6 | 192) : (c[--b] = 63 & f | 128,
                    c[--b] = f >> 6 & 63 | 128,
                    c[--b] = f >> 12 | 224)
            }
            c[--b] = 0;
            for (var g = new ab, h = new Array; b > 2;) {
                for (h[0] = 0; 0 == h[0];)
                    g.nextBytes(h);
                c[--b] = h[0]
            }
            return c[--b] = 2,
                c[--b] = 0,
                new d(c)
        }

        function db() {
            this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
        }

        function eb(a, b) {
            null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = bb(a, 16),
                this.e = parseInt(b, 16)) : alert("网络异常，请点击登录重试")
        }

        function fb(a) {
            return a.modPowInt(this.e, this.n)
        }

        function gb(a) {
            var b = cb(a, this.n.bitLength() + 7 >> 3);
            if (null == b)
                return null;
            var c = this.doPublic(b);
            if (null == c)
                return null;
            var d = c.toString(16);
            return 0 == (1 & d.length) ? d : "0" + d
        }
        var hb, ib = 0xdeadbeefcafe,
            jb = 15715070 == (16777215 & ib);
        jb && "Microsoft Internet Explorer" == navigator.appName ? (d.prototype.am = g,
                hb = 30) : jb && "Netscape" != navigator.appName ? (d.prototype.am = f,
                hb = 26) : (d.prototype.am = h,
                hb = 28),
            d.prototype.DB = hb,
            d.prototype.DM = (1 << hb) - 1,
            d.prototype.DV = 1 << hb;
        var kb = 52;
        d.prototype.FV = Math.pow(2, kb),
            d.prototype.F1 = kb - hb,
            d.prototype.F2 = 2 * hb - kb;
        var lb, mb, nb = "0123456789abcdefghijklmnopqrstuvwxyz",
            ob = new Array;
        for (lb = "0".charCodeAt(0),
            mb = 0; 9 >= mb; ++mb)
            ob[lb++] = mb;
        for (lb = "a".charCodeAt(0),
            mb = 10; 36 > mb; ++mb)
            ob[lb++] = mb;
        for (lb = "A".charCodeAt(0),
            mb = 10; 36 > mb; ++mb)
            ob[lb++] = mb;
        E.prototype.convert = F,
            E.prototype.revert = G,
            E.prototype.reduce = H,
            E.prototype.mulTo = I,
            E.prototype.sqrTo = J,
            L.prototype.convert = M,
            L.prototype.revert = N,
            L.prototype.reduce = O,
            L.prototype.mulTo = Q,
            L.prototype.sqrTo = P,
            d.prototype.copyTo = k,
            d.prototype.fromInt = l,
            d.prototype.fromString = n,
            d.prototype.clamp = o,
            d.prototype.dlShiftTo = v,
            d.prototype.drShiftTo = w,
            d.prototype.lShiftTo = x,
            d.prototype.rShiftTo = y,
            d.prototype.subTo = z,
            d.prototype.multiplyTo = A,
            d.prototype.squareTo = B,
            d.prototype.divRemTo = C,
            d.prototype.invDigit = K,
            d.prototype.isEven = R,
            d.prototype.exp = S,
            d.prototype.toString = p,
            d.prototype.negate = q,
            d.prototype.abs = r,
            d.prototype.compareTo = s,
            d.prototype.bitLength = u,
            d.prototype.mod = D,
            d.prototype.modPowInt = T,
            d.ZERO = m(0),
            d.ONE = m(1),
            U.prototype.init = V,
            U.prototype.next = W;
        var pb, qb, rb, sb = 256;
        if (null == qb) {
            qb = new Array,
                rb = 0;
            var tb;
            if (window.crypto && window.crypto.getRandomValues) {
                var ub = new Uint8Array(32);
                for (window.crypto.getRandomValues(ub),
                    tb = 0; 32 > tb; ++tb)
                    qb[rb++] = ub[tb]
            }
            if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
                var vb = window.crypto.random(32);
                for (tb = 0; tb < vb.length; ++tb)
                    qb[rb++] = 255 & vb.charCodeAt(tb)
            }
            for (; sb > rb;)
                tb = Math.floor(65536 * Math.random()),
                qb[rb++] = tb >>> 8,
                qb[rb++] = 255 & tb;
            rb = 0,
                Z()
        }
        ab.prototype.nextBytes = _,
            db.prototype.doPublic = fb,
            db.prototype.setPublic = eb,
            db.prototype.encrypt = gb,
            c.exports = {
                RSAKey: db
            }
    }),
    define("lib/artDialog/jquery.artDialog", [], function () {
        ! function (a, b, c) {
            a.noop = a.noop || function () {};
            var d, e, f, g, h = 0,
                i = a(b),
                j = a(document),
                k = a("html"),
                l = document.documentElement,
                m = b.VBArray && !b.XMLHttpRequest,
                n = "createTouch" in document && !("onmousemove" in l) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
                o = "artDialog" + +new Date,
                p = function (b, e, f) {
                    b = b || {},
                        ("string" == typeof b || 1 === b.nodeType) && (b = {
                            content: b,
                            fixed: !n
                        });
                    var g, i = p.defaults,
                        j = b.follow = 1 === this.nodeType && this || b.follow;
                    for (var k in i)
                        b[k] === c && (b[k] = i[k]);
                    return a.each({
                            ok: "yesFn",
                            cancel: "noFn",
                            close: "closeFn",
                            init: "initFn",
                            okVal: "yesText",
                            cancelVal: "noText"
                        }, function (a, d) {
                            b[a] = b[a] !== c ? b[a] : b[d]
                        }),
                        "string" == typeof j && (j = a(j)[0]),
                        b.id = j && j[o + "follow"] || b.id || o + h,
                        g = p.list[b.id],
                        j && g ? g.follow(j).zIndex().focus() : g ? g.zIndex().focus() : (n && (b.fixed = !1),
                            a.isArray(b.button) || (b.button = b.button ? [b.button] : []),
                            e !== c && (b.ok = e),
                            f !== c && (b.cancel = f),
                            b.ok && b.button.push({
                                name: b.okVal,
                                callback: b.ok,
                                focus: !0
                            }),
                            b.cancel && b.button.push({
                                name: b.cancelVal,
                                callback: b.cancel
                            }),
                            p.defaults.zIndex = b.zIndex,
                            h++,
                            p.list[b.id] = d ? d._init(b) : new p.fn._init(b))
                };
            if (p.fn = p.prototype = {
                    version: "4.1.7",
                    closed: !0,
                    _init: function (a) {
                        var c, e = this,
                            f = a.icon,
                            g = f && (m ? {
                                png: "icons/" + f + ".png"
                            } : {
                                backgroundImage: "url('" + a.path + "/skins/icons/" + f + ".png')"
                            });
                        return e.closed = !1,
                            e.config = a,
                            e.DOM = c = e.DOM || e._getDOM(),
                            c.wrap.addClass(a.skin),
                            c.close[a.cancel === !1 ? "hide" : "show"](),
                            c.icon[0].style.display = f ? "" : "none",
                            c.iconBg.css(g || {
                                background: "none"
                            }),
                            c.se.css("cursor", a.resize ? "se-resize" : "auto"),
                            c.title.css("cursor", a.drag ? "move" : "auto"),
                            c.content.css("padding", a.padding),
                            e[a.show ? "show" : "hide"](!0),
                            e.button(a.button).title(a.title).content(a.content, !0).size(a.width, a.height).time(a.time),
                            a.follow ? e.follow(a.follow) : e.position(a.left, a.top),
                            e.zIndex().focus(),
                            a.lock && e.lock(),
                            e._addEvent(),
                            e._ie6PngFix(),
                            d = null,
                            a.init && a.init.call(e, b),
                            e
                    },
                    content: function (a) {
                        var b, d, e, f, g = this,
                            h = g.DOM,
                            i = h.wrap[0],
                            j = i.offsetWidth,
                            k = i.offsetHeight,
                            l = parseInt(i.style.left),
                            m = parseInt(i.style.top),
                            n = i.style.width,
                            o = h.content,
                            p = o[0];
                        return g._elemBack && g._elemBack(),
                            i.style.width = "auto",
                            a === c ? p : ("string" == typeof a ? o.html(a) : a && 1 === a.nodeType && (f = a.style.display,
                                    b = a.previousSibling,
                                    d = a.nextSibling,
                                    e = a.parentNode,
                                    g._elemBack = function () {
                                        b && b.parentNode ? b.parentNode.insertBefore(a, b.nextSibling) : d && d.parentNode ? d.parentNode.insertBefore(a, d) : e && e.appendChild(a),
                                            a.style.display = f,
                                            g._elemBack = null
                                    },
                                    o.html(""),
                                    p.appendChild(a),
                                    a.style.display = "block"),
                                arguments[1] || (g.config.follow ? g.follow(g.config.follow) : (j = i.offsetWidth - j,
                                        k = i.offsetHeight - k,
                                        l -= j / 2,
                                        m -= k / 2,
                                        i.style.left = Math.max(l, 0) + "px",
                                        i.style.top = Math.max(m, 0) + "px"),
                                    n && "auto" !== n && (i.style.width = i.offsetWidth + "px"),
                                    g._autoPositionType()),
                                g._ie6SelectFix(),
                                g._runScript(p),
                                g)
                    },
                    title: function (a) {
                        var b = this.DOM,
                            d = b.wrap,
                            e = b.title,
                            f = "aui_state_noTitle";
                        return a === c ? e[0] : (a === !1 ? (e.hide().html(""),
                                d.addClass(f)) : (e.show().html(a || ""),
                                d.removeClass(f)),
                            this)
                    },
                    position: function (a, b) {
                        var d = this,
                            e = d.config,
                            f = d.DOM.wrap[0],
                            g = m ? !1 : e.fixed,
                            h = m && d.config.fixed,
                            k = j.scrollLeft(),
                            l = j.scrollTop(),
                            n = g ? 0 : k,
                            o = g ? 0 : l,
                            p = i.width(),
                            q = i.height(),
                            r = f.offsetWidth,
                            s = f.offsetHeight,
                            t = f.style;
                        return (a || 0 === a) && (d._left = -1 !== a.toString().indexOf("%") ? a : null,
                                a = d._toNumber(a, p - r),
                                "number" == typeof a ? (a = h ? a += k : a + n,
                                    t.left = Math.max(a, n) + "px") : "string" == typeof a && (t.left = a)),
                            (b || 0 === b) && (d._top = -1 !== b.toString().indexOf("%") ? b : null,
                                b = d._toNumber(b, q - s),
                                "number" == typeof b ? (b = h ? b += l : b + o,
                                    t.top = Math.max(b, o) + "px") : "string" == typeof b && (t.top = b)),
                            a !== c && b !== c && (d._follow = null,
                                d._autoPositionType()),
                            d
                    },
                    size: function (a, b) {
                        var c, d, e, f, g = this,
                            h = (g.config,
                                g.DOM),
                            j = h.wrap,
                            k = h.main,
                            l = j[0].style,
                            m = k[0].style;
                        return a && (g._width = -1 !== a.toString().indexOf("%") ? a : null,
                                c = i.width() - j[0].offsetWidth + k[0].offsetWidth,
                                e = g._toNumber(a, c),
                                a = e,
                                "number" == typeof a ? (l.width = "auto",
                                    m.width = Math.max(g.config.minWidth, a) + "px",
                                    l.width = j[0].offsetWidth + "px") : "string" == typeof a && (m.width = a,
                                    "auto" === a && j.css("width", "auto"))),
                            b && (g._height = -1 !== b.toString().indexOf("%") ? b : null,
                                d = i.height() - j[0].offsetHeight + k[0].offsetHeight,
                                f = g._toNumber(b, d),
                                b = f,
                                "number" == typeof b ? m.height = Math.max(g.config.minHeight, b) + "px" : "string" == typeof b && (m.height = b)),
                            g._ie6SelectFix(),
                            g
                    },
                    follow: function (b) {
                        var c, d = this,
                            e = d.config;
                        if (("string" == typeof b || b && 1 === b.nodeType) && (c = a(b),
                                b = c[0]),
                            !b || !b.offsetWidth && !b.offsetHeight)
                            return d.position(d._left, d._top);
                        var f = o + "follow",
                            g = i.width(),
                            h = i.height(),
                            k = j.scrollLeft(),
                            l = j.scrollTop(),
                            n = c.offset(),
                            p = b.offsetWidth,
                            q = b.offsetHeight,
                            r = m ? !1 : e.fixed,
                            s = r ? n.left - k : n.left,
                            t = r ? n.top - l : n.top,
                            u = d.DOM.wrap[0],
                            v = u.style,
                            w = u.offsetWidth,
                            x = u.offsetHeight,
                            y = s - (w - p) / 2,
                            z = t + q,
                            A = r ? 0 : k,
                            B = r ? 0 : l;
                        return y = A > y ? s : y + w > g && s - w > A ? s - w + p : y,
                            z = z + x > h + B && t - x > B ? t - x : z,
                            v.left = y + "px",
                            v.top = z + "px",
                            d._follow && d._follow.removeAttribute(f),
                            d._follow = b,
                            b[f] = e.id,
                            d._autoPositionType(),
                            d
                    },
                    button: function () {
                        var b = this,
                            d = arguments,
                            e = b.DOM,
                            f = e.buttons,
                            g = f[0],
                            h = "aui_state_highlight",
                            i = b._listeners = b._listeners || {},
                            j = a.isArray(d[0]) ? d[0] : [].slice.call(d);
                        return d[0] === c ? g : (a.each(j, function (c, d) {
                                var e = d.name,
                                    f = !i[e],
                                    j = f ? document.createElement("button") : i[e].elem;
                                i[e] || (i[e] = {}),
                                    d.callback && (i[e].callback = d.callback),
                                    d.className && (j.className = d.className),
                                    d.focus && (b._focus && b._focus.removeClass(h),
                                        b._focus = a(j).addClass(h),
                                        b.focus()),
                                    j.setAttribute("type", "button"),
                                    j[o + "callback"] = e,
                                    j.disabled = !!d.disabled,
                                    f && (j.innerHTML = e,
                                        i[e].elem = j,
                                        g.appendChild(j))
                            }),
                            f[0].style.display = j.length ? "" : "none",
                            b._ie6SelectFix(),
                            b)
                    },
                    show: function () {
                        return this.DOM.wrap.show(),
                            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.show(),
                            this
                    },
                    hide: function () {
                        return this.DOM.wrap.hide(),
                            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.hide(),
                            this
                    },
                    close: function () {
                        if (this.closed)
                            return this;
                        var a = this,
                            c = a.DOM,
                            e = c.wrap,
                            f = p.list,
                            g = a.config.close,
                            h = a.config.follow;
                        if (a.time(),
                            "function" == typeof g && g.call(a, b) === !1)
                            return a;
                        a.unlock(),
                            a._elemBack && a._elemBack(),
                            e[0].className = e[0].style.cssText = "",
                            c.title.html(""),
                            c.content.html(""),
                            c.buttons.html(""),
                            p.focus === a && (p.focus = null),
                            h && h.removeAttribute(o + "follow"),
                            delete f[a.config.id],
                            a._removeEvent(),
                            a.hide(!0)._setAbsolute();
                        for (var i in a)
                            a.hasOwnProperty(i) && "DOM" !== i && delete a[i];
                        return d ? e.remove() : d = a,
                            a
                    },
                    time: function (a) {
                        var b = this,
                            c = b.config.cancelVal,
                            d = b._timer;
                        return d && clearTimeout(d),
                            a && (b._timer = setTimeout(function () {
                                b._click(c)
                            }, 1e3 * a)),
                            b
                    },
                    focus: function () {
                        try {
                            if (this.config.focus) {
                                var a = this._focus && this._focus[0] || this.DOM.close[0];
                                a && a.focus()
                            }
                        } catch (b) {}
                        return this
                    },
                    zIndex: function () {
                        var a = this,
                            b = a.DOM,
                            c = b.wrap,
                            d = p.focus,
                            e = p.defaults.zIndex++;
                        return c.css("zIndex", e),
                            a._lockMask && a._lockMask.css("zIndex", e - 1),
                            d && d.DOM.wrap.removeClass("aui_state_focus"),
                            p.focus = a,
                            c.addClass("aui_state_focus"),
                            a
                    },
                    lock: function () {
                        if (this._lock)
                            return this;
                        var b = this,
                            c = p.defaults.zIndex - 1,
                            d = b.DOM.wrap,
                            e = b.config,
                            f = j.width(),
                            g = j.height(),
                            h = b._lockMaskWrap || a(document.body.appendChild(document.createElement("div"))),
                            i = b._lockMask || a(h[0].appendChild(document.createElement("div"))),
                            k = "(document).documentElement",
                            l = n ? "width:" + f + "px;height:" + g + "px" : "width:100%;height:100%",
                            o = m ? "position:absolute;left:expression(" + k + ".scrollLeft);top:expression(" + k + ".scrollTop);width:expression(" + k + ".clientWidth);height:expression(" + k + ".clientHeight)" : "";
                        return b.zIndex(),
                            d.addClass("aui_state_lock"),
                            h[0].style.cssText = l + ";position:fixed;z-index:" + c + ";top:0;left:0;overflow:hidden;" + o,
                            i[0].style.cssText = "height:100%;background:" + e.background + ";filter:alpha(opacity=0);opacity:0",
                            m && i.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>'),
                            i.stop(),
                            i.bind("click", function () {
                                b._reset()
                            }).bind("dblclick", function () {}),
                            0 === e.duration ? i.css({
                                opacity: e.opacity
                            }) : i.animate({
                                opacity: e.opacity
                            }, e.duration),
                            b._lockMaskWrap = h,
                            b._lockMask = i,
                            b._lock = !0,
                            b
                    },
                    unlock: function () {
                        var a = this,
                            b = a._lockMaskWrap,
                            c = a._lockMask;
                        if (!a._lock)
                            return a;
                        var e = b[0].style,
                            f = function () {
                                m && (e.removeExpression("width"),
                                        e.removeExpression("height"),
                                        e.removeExpression("left"),
                                        e.removeExpression("top")),
                                    e.cssText = "display:none",
                                    d && b.remove()
                            };
                        return c.stop().unbind(),
                            a.DOM.wrap.removeClass("aui_state_lock"),
                            a.config.duration ? c.animate({
                                opacity: 0
                            }, a.config.duration, f) : f(),
                            a._lock = !1,
                            a
                    },
                    _getDOM: function () {
                        var b = document.createElement("div"),
                            c = document.body;
                        b.style.cssText = "position:absolute;left:0;top:0",
                            b.innerHTML = p._templates,
                            c.insertBefore(b, c.firstChild);
                        for (var d, e = 0, f = {
                                wrap: a(b)
                            }, g = b.getElementsByTagName("*"), h = g.length; h > e; e++)
                            d = g[e].className.split("aui_")[1],
                            d && (f[d] = a(g[e]));
                        return f
                    },
                    _toNumber: function (a, b) {
                        if (!a && 0 !== a || "number" == typeof a)
                            return a;
                        var c = a.length - 1;
                        return a.lastIndexOf("px") === c ? a = parseInt(a) : a.lastIndexOf("%") === c && (a = parseInt(b * a.split("%")[0] / 100)),
                            a
                    },
                    _ie6PngFix: m ? function () {
                        for (var a, b, c, d, e = 0, f = p.defaults.path + "/skins/", g = this.DOM.wrap[0].getElementsByTagName("*"); e < g.length; e++)
                            a = g[e],
                            b = a.currentStyle.png,
                            b && (c = f + b,
                                d = a.runtimeStyle,
                                d.backgroundImage = "none",
                                d.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "',sizingMethod='crop')")
                    } : a.noop,
                    _ie6SelectFix: m ? function () {
                        var a = this.DOM.wrap,
                            b = a[0],
                            c = o + "iframeMask",
                            d = a[c],
                            e = b.offsetWidth,
                            f = b.offsetHeight;
                        e += "px",
                            f += "px",
                            d ? (d.style.width = e,
                                d.style.height = f) : (d = b.appendChild(document.createElement("iframe")),
                                a[c] = d,
                                d.src = "about:blank",
                                d.style.cssText = "position:absolute;z-index:-1;left:0;top:0;filter:alpha(opacity=0);width:" + e + ";height:" + f)
                    } : a.noop,
                    _runScript: function (a) {
                        for (var b, c = 0, d = 0, e = a.getElementsByTagName("script"), f = e.length, g = []; f > c; c++)
                            "text/dialog" === e[c].type && (g[d] = e[c].innerHTML,
                                d++);
                        g.length && (g = g.join(""),
                            b = new Function(g),
                            b.call(this))
                    },
                    _autoPositionType: function () {
                        this[this.config.fixed ? "_setFixed" : "_setAbsolute"]()
                    },
                    _setFixed: function () {
                        return m && a(function () {
                                var b = "backgroundAttachment";
                                "fixed" !== k.css(b) && "fixed" !== a("body").css(b) && k.css({
                                    zoom: 1,
                                    backgroundImage: "url(about:blank)",
                                    backgroundAttachment: "fixed"
                                })
                            }),
                            function () {
                                var a = this.DOM.wrap,
                                    b = a[0].style;
                                if (m) {
                                    var c = parseInt(a.css("left")),
                                        d = parseInt(a.css("top")),
                                        e = j.scrollLeft(),
                                        f = j.scrollTop(),
                                        g = "(document.documentElement)";
                                    this._setAbsolute(),
                                        b.setExpression("left", "eval(" + g + ".scrollLeft + " + (c - e) + ') + "px"'),
                                        b.setExpression("top", "eval(" + g + ".scrollTop + " + (d - f) + ') + "px"')
                                } else
                                    b.position = "fixed"
                            }
                    }(),
                    _setAbsolute: function () {
                        var a = this.DOM.wrap[0].style;
                        m && (a.removeExpression("left"),
                                a.removeExpression("top")),
                            a.position = "absolute"
                    },
                    _click: function (a) {
                        var c = this,
                            d = c._listeners[a] && c._listeners[a].callback;
                        return "function" != typeof d || d.call(c, b) !== !1 ? c.close() : c
                    },
                    _reset: function (a) {
                        var b, c = this,
                            d = c._winSize || i.width() * i.height(),
                            e = c._follow,
                            f = c._width,
                            g = c._height,
                            h = c._left,
                            j = c._top;
                        a && (b = c._winSize = i.width() * i.height(),
                            d === b) || ((f || g) && c.size(f, g),
                            e ? c.follow(e) : (h || j) && c.position(h, j))
                    },
                    _addEvent: function () {
                        var a, c = this,
                            d = c.config,
                            e = "CollectGarbage" in b,
                            f = c.DOM;
                        c._winResize = function () {
                                a && clearTimeout(a),
                                    a = setTimeout(function () {
                                        c._reset(e)
                                    }, 40)
                            },
                            i.bind("resize", c._winResize),
                            f.wrap.bind("click", function (a) {
                                var b, e = a.target;
                                return e.disabled ? !1 : e === f.close[0] ? (c._click(d.cancelVal),
                                    !1) : (b = e[o + "callback"],
                                    b && c._click(b),
                                    c._ie6SelectFix(),
                                    void 0)
                            }).bind("mousedown", function () {
                                c.zIndex()
                            })
                    },
                    _removeEvent: function () {
                        var a = this,
                            b = a.DOM;
                        b.wrap.unbind(),
                            i.unbind("resize", a._winResize)
                    }
                },
                p.fn._init.prototype = p.fn,
                a.fn.dialog = a.fn.artDialog = function () {
                    var a = arguments;
                    return this[this.live ? "live" : "bind"]("click", function () {
                            return p.apply(this, a),
                                !1
                        }),
                        this
                },
                p.focus = null,
                p.get = function (a) {
                    return a === c ? p.list : p.list[a]
                },
                p.list = {},
                j.bind("keydown", function (a) {
                    var b = a.target,
                        c = b.nodeName,
                        d = /^INPUT|TEXTAREA$/,
                        e = p.focus,
                        f = a.keyCode;
                    e && e.config.esc && !d.test(c) && 27 === f && e._click(e.config.cancelVal)
                }),
                g = b._artDialog_path || function (a, b, c) {
                    for (b in a)
                        a[b].src && -1 !== a[b].src.indexOf("artDialog") && (c = a[b]);
                    return e = c || a[a.length - 1],
                        c = e.src.replace(/\\/g, "/"),
                        c.lastIndexOf("/") < 0 ? "." : c.substring(0, c.lastIndexOf("/"))
                }(document.getElementsByTagName("script")),
                f = e.src.split("skin=")[1],
                f) {
                var q = document.createElement("link");
                q.rel = "stylesheet",
                    q.href = g + "/skins/" + f + ".css?" + p.fn.version,
                    e.parentNode.insertBefore(q, e)
            }
            i.bind("load", function () {
                setTimeout(function () {
                    h || p({
                        left: "-9999em",
                        time: 9,
                        fixed: !1,
                        lock: !1,
                        focus: !1
                    })
                }, 150)
            });
            try {
                document.execCommand("BackgroundImageCache", !1, !0)
            } catch (r) {}
            p._templates = '<div class="aui_outer"><table class="aui_border"><tbody><tr><td class="aui_nw"></td><td class="aui_n"></td><td class="aui_ne"></td></tr><tr><td class="aui_w"></td><td class="aui_c"><div class="aui_inner"><table class="aui_dialog"><tbody><tr><td colspan="2" class="aui_header"><div class="aui_titleBar"><div class="aui_title"></div><a class="aui_close" href="javascript:/*artDialog*/;">×</a></div></td></tr><tr><td class="aui_icon"><div class="aui_iconBg"></div></td><td class="aui_main"><div class="aui_content"></div></td></tr><tr><td colspan="2" class="aui_footer"><div class="aui_buttons"></div></td></tr></tbody></table></div></td><td class="aui_e"></td></tr><tr><td class="aui_sw"></td><td class="aui_s"></td><td class="aui_se"></td></tr></tbody></table></div>',
                p.defaults = {
                    content: '<div class="aui_loading"><span>loading..</span></div>',
                    title: "消息",
                    button: null,
                    ok: null,
                    cancel: null,
                    init: null,
                    close: null,
                    okVal: "确定",
                    cancelVal: "取消",
                    width: "auto",
                    height: "auto",
                    minWidth: 96,
                    minHeight: 32,
                    padding: "20px 25px",
                    skin: "",
                    icon: null,
                    time: null,
                    esc: !0,
                    focus: !0,
                    show: !0,
                    follow: null,
                    path: g,
                    lock: !1,
                    background: "#000",
                    opacity: .7,
                    duration: 300,
                    fixed: !1,
                    left: "50%",
                    top: "38.2%",
                    zIndex: 1987,
                    resize: !0,
                    drag: !0
                },
                b.artDialog = a.dialog = a.artDialog = p
        }(this.art || this.jQuery && (this.art = jQuery), this),
        function (a) {
            var b, c, d = a(window),
                e = a(document),
                f = document.documentElement,
                g = !("minWidth" in f.style),
                h = "onlosecapture" in f,
                i = "setCapture" in f;
            artDialog.dragEvent = function () {
                    var a = this,
                        b = function (b) {
                            var c = a[b];
                            a[b] = function () {
                                return c.apply(a, arguments)
                            }
                        };
                    b("start"),
                        b("move"),
                        b("end")
                },
                artDialog.dragEvent.prototype = {
                    onstart: a.noop,
                    start: function (a) {
                        return e.bind("mousemove", this.move).bind("mouseup", this.end),
                            this._sClientX = a.clientX,
                            this._sClientY = a.clientY,
                            this.onstart(a.clientX, a.clientY),
                            !1
                    },
                    onmove: a.noop,
                    move: function (a) {
                        return this._mClientX = a.clientX,
                            this._mClientY = a.clientY,
                            this.onmove(a.clientX - this._sClientX, a.clientY - this._sClientY),
                            !1
                    },
                    onend: a.noop,
                    end: function (a) {
                        return e.unbind("mousemove", this.move).unbind("mouseup", this.end),
                            this.onend(a.clientX, a.clientY),
                            !1
                    }
                },
                c = function (a) {
                    var c, f, j, k, l, m, n = artDialog.focus,
                        o = n.DOM,
                        p = o.wrap,
                        q = o.title,
                        r = o.main,
                        s = "getSelection" in window ? function () {
                            window.getSelection().removeAllRanges()
                        } :
                        function () {
                            try {
                                document.selection.empty()
                            } catch (a) {}
                        };
                    b.onstart = function () {
                            m ? (f = r[0].offsetWidth,
                                    j = r[0].offsetHeight) : (k = p[0].offsetLeft,
                                    l = p[0].offsetTop),
                                e.bind("dblclick", b.end),
                                !g && h ? q.bind("losecapture", b.end) : d.bind("blur", b.end),
                                i && q[0].setCapture(),
                                p.addClass("aui_state_drag"),
                                n.focus()
                        },
                        b.onmove = function (a, b) {
                            if (m) {
                                var d = p[0].style,
                                    e = r[0].style,
                                    g = a + f,
                                    h = b + j;
                                d.width = "auto",
                                    e.width = Math.max(0, g) + "px",
                                    d.width = p[0].offsetWidth + "px",
                                    e.height = Math.max(0, h) + "px"
                            } else {
                                var e = p[0].style,
                                    i = Math.max(c.minX, Math.min(c.maxX, a + k)),
                                    o = Math.max(c.minY, Math.min(c.maxY, b + l));
                                e.left = i + "px",
                                    e.top = o + "px"
                            }
                            s(),
                                n._ie6SelectFix()
                        },
                        b.onend = function () {
                            e.unbind("dblclick", b.end),
                                !g && h ? q.unbind("losecapture", b.end) : d.unbind("blur", b.end),
                                i && q[0].releaseCapture(),
                                g && !n.closed && n._autoPositionType(),
                                p.removeClass("aui_state_drag")
                        },
                        m = a.target === o.se[0] ? !0 : !1,
                        c = function () {
                            var a, b, c = n.DOM.wrap[0],
                                f = "fixed" === c.style.position,
                                g = c.offsetWidth,
                                h = c.offsetHeight,
                                i = d.width(),
                                j = d.height(),
                                k = f ? 0 : e.scrollLeft(),
                                l = f ? 0 : e.scrollTop(),
                                a = i - g + k;
                            return b = j - h + l, {
                                minX: k,
                                minY: l,
                                maxX: a,
                                maxY: b
                            }
                        }(),
                        b.start(a)
                },
                e.bind("mousedown", function (a) {
                    var d = artDialog.focus;
                    if (d) {
                        var e = a.target,
                            f = d.config,
                            g = d.DOM;
                        return f.drag !== !1 && e === g.title[0] || f.resize !== !1 && e === g.se[0] ? (b = b || new artDialog.dragEvent,
                            c(a),
                            !1) : void 0
                    }
                })
        }(this.art || this.jQuery && (this.art = jQuery))
    }),
    define("lib/validform/core.source", [], function () {
        ! function (a, b, c) {
            function d(b, c) {
                var d = (a(window).width() - b.outerWidth()) / 2,
                    e = (a(window).height() - b.outerHeight()) / 2,
                    e = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + (e > 0 ? e : 0);
                b.css({
                    left: d
                }).animate({
                    top: e
                }, {
                    duration: c,
                    queue: !1
                })
            }

            function e() {
                return 0 !== a("#Validform_msg").length ? !1 : (g = a('<div id="Validform_msg"><div class="Validform_title">' + i.tit + '<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body"),
                    g.find("a.Validform_close").click(function () {
                        return g.hide(),
                            h = !0,
                            f && f.focus().addClass("Validform_error"),
                            !1
                    }).focus(function () {
                        this.blur()
                    }),
                    void a(window).bind("scroll resize", function () {
                        !h && d(g, 400)
                    }))
            }
            var f = null,
                g = null,
                h = !0,
                i = {
                    tit: "提示信息",
                    w: {
                        "*": "不能为空！",
                        "*6-16": "请填写6到16位任意字符！",
                        n: "请填写数字！",
                        "n6-16": "请填写6到16位数字！",
                        s: "不能输入特殊字符！",
                        "s6-18": "请填写6到18位字符！",
                        p: "请填写邮政编码！",
                        m: "请填写手机号码！",
                        e: "邮箱地址格式不对！",
                        url: "请填写网址！"
                    },
                    def: "请填写正确信息！",
                    undef: "datatype未定义！",
                    reck: "两次输入的内容不一致！",
                    r: "通过信息验证！",
                    c: "正在检测信息…",
                    s: "请{填写|选择}{0|信息}！",
                    v: "所填信息没有经过验证，请稍后…",
                    p: "正在提交数据…"
                };
            a.Tipmsg = i;
            var j = function (b, d, f) {
                var d = a.extend({}, j.defaults, d);
                d.datatype && a.extend(j.util.dataType, d.datatype);
                var g = this;
                return g.tipmsg = {
                        w: {}
                    },
                    g.forms = b,
                    g.objects = [],
                    f === !0 ? !1 : (b.each(function () {
                            if ("inited" == this.validform_inited)
                                return !0;
                            this.validform_inited = "inited";
                            var b = this;
                            b.settings = a.extend({}, d);
                            var e = a(b);
                            b.validform_status = "normal",
                                e.data("tipmsg", g.tipmsg),
                                e.delegate("[datatype]", "blur", function () {
                                    var a = arguments[1];
                                    j.util.check.call(this, e, a)
                                }),
                                e.delegate(":text", "keypress", function (a) {
                                    13 == a.keyCode && 0 == e.find(":submit").length && e.submit()
                                }),
                                j.util.enhance.call(e, b.settings.tiptype, b.settings.usePlugin, b.settings.tipSweep),
                                b.settings.btnSubmit && e.find(b.settings.btnSubmit).bind("click", function () {
                                    return e.trigger("submit"),
                                        !1
                                }),
                                e.submit(function () {
                                    var a;
                                    try {
                                        a = j.util.submitForm.call(e, b.settings),
                                            a === c && (a = !0)
                                    } catch (d) {
                                        a = !1
                                    }
                                    return a
                                }),
                                e.find("[type='reset']").add(e.find(b.settings.btnReset)).bind("click", function () {
                                    j.util.resetForm.call(e)
                                })
                        }),
                        void((1 == d.tiptype || (2 == d.tiptype || 3 == d.tiptype) && d.ajaxPost) && e()))
            };
            j.defaults = {
                    tiptype: 1,
                    tipSweep: !1,
                    showAllError: !1,
                    postonce: !1,
                    ajaxPost: !1
                },
                j.util = {
                    dataType: {
                        "*": /[\w\W]+/,
                        "*6-16": /^[\w\W]{6,16}$/,
                        n: /^\d+$/,
                        "n6-16": /^\d{6,16}$/,
                        s: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
                        "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
                        p: /^[0-9]{6}$/,
                        m: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
                        e: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/
                    },
                    toString: Object.prototype.toString,
                    isEmpty: function (b) {
                        return "" === b || b === a.trim(this.attr("tip"))
                    },
                    getValue: function (b) {
                        var d, e = this;
                        return b.is(":radio") ? (d = e.find(":radio[name='" + b.attr("name") + "']:checked").val(),
                                d = d === c ? "" : d) : b.is(":checkbox") ? (d = "",
                                e.find(":checkbox[name='" + b.attr("name") + "']:checked").each(function () {
                                    d += a(this).val() + ","
                                }),
                                d = d === c ? "" : d) : d = b.val(),
                            j.util.isEmpty.call(b, d) ? "" : d
                    },
                    enhance: function (b, c, d, e) {
                        var f = this;
                        f.find("[datatype]").each(function () {
                                2 == b ? 0 == a(this).parent().next().find(".Validform_checktip").length && (a(this).parent().next().append("<span class='Validform_checktip' />"),
                                    a(this).siblings(".Validform_checktip").remove()) : (3 == b || 4 == b) && 0 == a(this).siblings(".Validform_checktip").length && (a(this).parent().append("<span class='Validform_checktip' />"),
                                    a(this).parent().next().find(".Validform_checktip").remove())
                            }),
                            f.find("input[recheck]").each(function () {
                                if ("inited" == this.validform_inited)
                                    return !0;
                                this.validform_inited = "inited";
                                var b = a(this),
                                    c = f.find("#" + a(this).attr("recheck"));
                                c.bind("keyup", function () {
                                    return "" != b.val() ? c.val() == b.val() && "" != c.val() && c.attr("tip") && c.attr("tip") == c.val() ? !1 : void b.trigger("blur") : void 0
                                }).bind("blur", function () {
                                    if (c.val() != b.val() && "" != b.val()) {
                                        if (b.attr("tip") && b.attr("tip") == b.val())
                                            return !1;
                                        b.triggerHandler("blur")
                                    }
                                })
                            }),
                            f.find("[tip]").each(function () {
                                if ("inited" == this.validform_inited)
                                    return !0;
                                this.validform_inited = "inited";
                                var b = a(this).attr("tip"),
                                    c = a(this).attr("altercss");
                                a(this).focus(function () {
                                    a(this).val() == b && (a(this).val(""),
                                        c && a(this).removeClass(c))
                                }).blur(function () {
                                    "" === a.trim(a(this).val()) && (a(this).val(b),
                                        c && a(this).addClass(c))
                                })
                            }),
                            f.find(":checkbox[datatype],:radio[datatype]").each(function () {
                                if ("inited" == this.validform_inited)
                                    return !0;
                                this.validform_inited = "inited";
                                var b = a(this),
                                    c = b.attr("name");
                                f.find("[name='" + c + "']").filter(":checkbox,:radio").bind("click", function () {
                                    setTimeout(function () {
                                        b.trigger("blur")
                                    }, 0)
                                })
                            }),
                            f.find("select[datatype][multiple]").bind("click", function () {
                                var b = a(this);
                                setTimeout(function () {
                                    b.trigger("blur")
                                }, 0)
                            }),
                            j.util.usePlugin.call(f, c, b, d, e)
                    },
                    usePlugin: function (b, c, d, e) {
                        var f = this,
                            b = b || {};
                        if (f.find("input[plugin='swfupload']").length && "undefined" != typeof swfuploadhandler) {
                            var g = {
                                custom_settings: {
                                    form: f,
                                    showmsg: function (a, b) {
                                        j.util.showmsg.call(f, a, c, {
                                            obj: f.find("input[plugin='swfupload']"),
                                            type: b,
                                            sweep: d
                                        })
                                    }
                                }
                            };
                            g = a.extend(!0, {}, b.swfupload, g),
                                f.find("input[plugin='swfupload']").each(function (b) {
                                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited",
                                        a(this).val(""),
                                        void swfuploadhandler.init(g, b))
                                })
                        }
                        if (f.find("input[plugin='datepicker']").length && a.fn.datePicker && (b.datepicker = b.datepicker || {},
                                b.datepicker.format && (Date.format = b.datepicker.format,
                                    delete b.datepicker.format),
                                b.datepicker.firstDayOfWeek && (Date.firstDayOfWeek = b.datepicker.firstDayOfWeek,
                                    delete b.datepicker.firstDayOfWeek),
                                f.find("input[plugin='datepicker']").each(function () {
                                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited",
                                        b.datepicker.callback && a(this).bind("dateSelected", function () {
                                            var c = new Date(a.event._dpCache[this._dpId].getSelected()[0]).asString(Date.format);
                                            b.datepicker.callback(c, this)
                                        }),
                                        void a(this).datePicker(b.datepicker))
                                })),
                            f.find("input[plugin*='passwordStrength']").length && a.fn.passwordStrength && (b.passwordstrength = b.passwordstrength || {},
                                b.passwordstrength.showmsg = function (a, b, e) {
                                    j.util.showmsg.call(f, b, c, {
                                        obj: a,
                                        type: e,
                                        sweep: d
                                    })
                                },
                                f.find("input[plugin='passwordStrength']").each(function () {
                                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited",
                                        void a(this).passwordStrength(b.passwordstrength))
                                })),
                            "addRule" != e && b.jqtransform && a.fn.jqTransSelect) {
                            if ("true" == f[0].jqTransSelected)
                                return;
                            f[0].jqTransSelected = "true";
                            var h = function (b) {
                                    var c = a(".jqTransformSelectWrapper ul:visible");
                                    c.each(function () {
                                        var c = a(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                                        b && c.oLabel && c.oLabel.get(0) == b.get(0) || a(this).hide()
                                    })
                                },
                                i = function (b) {
                                    0 === a(b.target).parents(".jqTransformSelectWrapper").length && h(a(b.target))
                                },
                                k = function () {
                                    a(document).mousedown(i)
                                };
                            b.jqtransform.selector ? (f.find(b.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton(),
                                    f.find(b.jqtransform.selector).filter("input:text, input:password").jqTransInputText(),
                                    f.find(b.jqtransform.selector).filter("input:checkbox").jqTransCheckBox(),
                                    f.find(b.jqtransform.selector).filter("input:radio").jqTransRadio(),
                                    f.find(b.jqtransform.selector).filter("textarea").jqTransTextarea(),
                                    f.find(b.jqtransform.selector).filter("select").length > 0 && (f.find(b.jqtransform.selector).filter("select").jqTransSelect(),
                                        k())) : f.jqTransform(),
                                f.find(".jqTransformSelectWrapper").find("li a").click(function () {
                                    a(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur")
                                })
                        }
                    },
                    getNullmsg: function (a) {
                        var b, c = this,
                            d = /[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g,
                            e = a[0].settings.label || ".Validform_label";
                        if (e = c.siblings(e).eq(0).text() || c.siblings().find(e).eq(0).text() || c.parent().siblings(e).eq(0).text() || c.parent().siblings().find(e).eq(0).text(),
                            e = e.replace(/\s(?![a-zA-Z])/g, "").match(d),
                            e = e ? e.join("") : [""],
                            d = /\{(.+)\|(.+)\}/,
                            b = a.data("tipmsg").s || i.s,
                            "" != e) {
                            if (b = b.replace(/\{0\|(.+)\}/, e),
                                c.attr("recheck"))
                                return b = b.replace(/\{(.+)\}/, ""),
                                    c.attr("nullmsg", b),
                                    b
                        } else
                            b = c.is(":checkbox,:radio,select") ? b.replace(/\{0\|(.+)\}/, "") : b.replace(/\{0\|(.+)\}/, "$1");
                        return b = c.is(":checkbox,:radio,select") ? b.replace(d, "$2") : b.replace(d, "$1"),
                            c.attr("nullmsg", b),
                            b
                    },
                    getErrormsg: function (b, c, d) {
                        var e, f = /^(.+?)((\d+)-(\d+))?$/,
                            g = /^(.+?)(\d+)-(\d+)$/,
                            h = /(.*?)\d+(.+?)\d+(.*)/,
                            j = c.match(f);
                        if ("recheck" == d)
                            return e = b.data("tipmsg").reck || i.reck;
                        var k = a.extend({}, i.w, b.data("tipmsg").w);
                        if (j[0] in k)
                            return b.data("tipmsg").w[j[0]] || i.w[j[0]];
                        for (var l in k)
                            if (-1 != l.indexOf(j[1]) && g.test(l))
                                return e = (b.data("tipmsg").w[l] || i.w[l]).replace(h, "$1" + j[3] + "$2" + j[4] + "$3"),
                                    b.data("tipmsg").w[j[0]] = e,
                                    e;
                        return b.data("tipmsg").def || i.def
                    },
                    _regcheck: function (a, b, d, e) {
                        var e = e,
                            f = null,
                            g = !1,
                            h = /\/.+\//g,
                            k = /^(.+?)(\d+)-(\d+)$/,
                            l = 3;
                        if (h.test(a)) {
                            var m = a.match(h)[0].slice(1, -1),
                                n = a.replace(h, ""),
                                o = RegExp(m, n);
                            g = o.test(b)
                        } else if ("[object Function]" == j.util.toString.call(j.util.dataType[a]))
                            g = j.util.dataType[a](b, d, e, j.util.dataType),
                            g === !0 || g === c ? g = !0 : (f = g,
                                g = !1);
                        else {
                            if (!(a in j.util.dataType)) {
                                var p, q = a.match(k);
                                if (q) {
                                    for (var r in j.util.dataType)
                                        if (p = r.match(k),
                                            p && q[1] === p[1]) {
                                            var s = j.util.dataType[r].toString(),
                                                n = s.match(/\/[mgi]*/g)[1].replace("/", ""),
                                                t = new RegExp("\\{" + p[2] + "," + p[3] + "\\}", "g");
                                            s = s.replace(/\/[mgi]*/g, "/").replace(t, "{" + q[2] + "," + q[3] + "}").replace(/^\//, "").replace(/\/$/, ""),
                                                j.util.dataType[a] = new RegExp(s, n);
                                            break
                                        }
                                } else
                                    g = !1,
                                    f = e.data("tipmsg").undef || i.undef
                            }
                            "[object RegExp]" == j.util.toString.call(j.util.dataType[a]) && (g = j.util.dataType[a].test(b))
                        }
                        if (g) {
                            if (l = 2,
                                f = d.attr("sucmsg") || e.data("tipmsg").r || i.r,
                                d.attr("recheck")) {
                                var u = e.find("#" + d.attr("recheck"));
                                b != u.val() && (g = !1,
                                    l = 3,
                                    f = d.attr("errormsg") || j.util.getErrormsg.call(d, e, a, "recheck"))
                            }
                        } else
                            f = f || d.attr("errormsg") || j.util.getErrormsg.call(d, e, a),
                            j.util.isEmpty.call(d, b) && (f = d.attr("nullmsg") || j.util.getNullmsg.call(d, e));
                        return {
                            passed: g,
                            type: l,
                            info: f
                        }
                    },
                    regcheck: function (a, b, c) {
                        var d = this,
                            e = null;
                        if ("ignore" === c.attr("ignore") && j.util.isEmpty.call(c, b))
                            return c.data("cked") && (e = ""), {
                                passed: !0,
                                type: 4,
                                info: e
                            };
                        c.data("cked", "cked");
                        for (var f, g = j.util.parseDatatype(a), h = 0; h < g.length; h++) {
                            for (var i = 0; i < g[h].length && (f = j.util._regcheck(g[h][i], b, c, d),
                                    f.passed); i++)
                            ;
                            if (f.passed)
                                break
                        }
                        return f
                    },
                    parseDatatype: function (a) {
                        var b = /\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
                            c = a.match(b),
                            d = a.replace(b, "").replace(/\s*/g, "").split(""),
                            e = [],
                            f = 0;
                        e[0] = [],
                            e[0].push(c[0]);
                        for (var g = 0; g < d.length; g++)
                            "|" == d[g] && (f++,
                                e[f] = []),
                            e[f].push(c[g + 1]);
                        return e
                    },
                    showmsg: function (b, e, f, i) {
                        if (b != c && ("bycheck" != i || !f.sweep || (!f.obj || f.obj.is(".Validform_error")) && "function" != typeof e)) {
                            if (a.extend(f, {
                                    curform: this
                                }),
                                "function" == typeof e)
                                return void e(b, f, j.util.cssctl);
                            (1 == e || "byajax" == i && 4 != e) && g.find(".Validform_info").html(b),
                                (1 == e && "bycheck" != i && 2 != f.type || "byajax" == i && 4 != e) && (h = !1,
                                    g.find(".iframe").css("height", g.outerHeight()),
                                    g.show(),
                                    d(g, 100)),
                                2 == e && f.obj && (f.obj.parent().next().find(".Validform_checktip").html(b),
                                    j.util.cssctl(f.obj.parent().next().find(".Validform_checktip"), f.type)),
                                3 != e && 4 != e || !f.obj || (f.obj.siblings(".Validform_checktip").html(b),
                                    j.util.cssctl(f.obj.siblings(".Validform_checktip"), f.type))
                        }
                    },
                    cssctl: function (a, b) {
                        switch (b) {
                            case 1:
                                a.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip Validform_loading");
                                break;
                            case 2:
                                a.removeClass("Validform_wrong Validform_loading").addClass("Validform_checktip Validform_right");
                                break;
                            case 4:
                                a.removeClass("Validform_right Validform_wrong Validform_loading").addClass("Validform_checktip");
                                break;
                            default:
                                a.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong")
                        }
                    },
                    check: function (b, c, d) {
                        var e = b[0].settings,
                            c = c || "",
                            g = j.util.getValue.call(b, a(this));
                        if (e.ignoreHidden && a(this).is(":hidden") || "dataIgnore" === a(this).data("dataIgnore"))
                            return !0;
                        if (e.dragonfly && !a(this).data("cked") && j.util.isEmpty.call(a(this), g) && "ignore" != a(this).attr("ignore"))
                            return !1;
                        var h = j.util.regcheck.call(b, a(this).attr("datatype"), g, a(this));
                        if (g == this.validform_lastval && !a(this).attr("recheck") && "" == c)
                            return h.passed ? !0 : !1;
                        this.validform_lastval = g;
                        var k;
                        if (f = k = a(this),
                            !h.passed)
                            return j.util.abort.call(k[0]),
                                d || (j.util.showmsg.call(b, h.info, e.tiptype, {
                                        obj: a(this),
                                        type: h.type,
                                        sweep: e.tipSweep
                                    }, "bycheck"),
                                    !e.tipSweep && k.addClass("Validform_error")),
                                !1;
                        var l = a(this).attr("ajaxurl");
                        if (l && !j.util.isEmpty.call(a(this), g) && !d) {
                            var m = a(this);
                            if (m[0].validform_subpost = "postform" == c ? "postform" : "",
                                "posting" === m[0].validform_valid && g == m[0].validform_ckvalue)
                                return "ajax";
                            m[0].validform_valid = "posting",
                                m[0].validform_ckvalue = g,
                                j.util.showmsg.call(b, b.data("tipmsg").c || i.c, e.tiptype, {
                                    obj: m,
                                    type: 1,
                                    sweep: e.tipSweep
                                }, "bycheck"),
                                j.util.abort.call(k[0]);
                            var n = a.extend(!0, {}, e.ajaxurl || {});
                            "function" == typeof n.setParams && n.setParams(n, l, g, this);
                            var o = {
                                type: "POST",
                                cache: !1,
                                url: l,
                                data: encodeURIComponent(a(this).attr("name")) + "=" + encodeURIComponent(g),
                                success: function (c) {
                                    "y" === a.trim(c.status) ? (m[0].validform_valid = "true",
                                            c.info && m.attr("sucmsg", c.info),
                                            j.util.showmsg.call(b, m.attr("sucmsg") || b.data("tipmsg").r || i.r, e.tiptype, {
                                                obj: m,
                                                type: 2,
                                                sweep: e.tipSweep
                                            }, "bycheck"),
                                            k.removeClass("Validform_error"),
                                            f = null,
                                            "postform" == m[0].validform_subpost && b.trigger("submit")) : (m[0].validform_valid = c.info,
                                            j.util.showmsg.call(b, c.info, e.tiptype, {
                                                obj: m,
                                                type: 3,
                                                sweep: e.tipSweep
                                            }),
                                            k.addClass("Validform_error")),
                                        k[0].validform_ajax = null
                                },
                                error: function (a) {
                                    if ("200" == a.status)
                                        return n.success("y" == a.responseText ? {
                                                status: "y"
                                            } : {
                                                status: "n",
                                                info: a.responseText
                                            }),
                                            !1;
                                    if ("abort" !== a.statusText) {
                                        var c = "status: " + a.status + "; statusText: " + a.statusText;
                                        j.util.showmsg.call(b, c, e.tiptype, {
                                                obj: m,
                                                type: 3,
                                                sweep: e.tipSweep
                                            }),
                                            k.addClass("Validform_error")
                                    }
                                    return m[0].validform_valid = a.statusText,
                                        k[0].validform_ajax = null,
                                        !0
                                }
                            };
                            if (n.success) {
                                var p = n.success;
                                n.success = function (a) {
                                    p(a, m),
                                        o.success(a)
                                }
                            }
                            if (n.error) {
                                var q = n.error;
                                n.error = function (a) {
                                    o.error(a) && q(a, m)
                                }
                            }
                            return n = a.extend({}, o, n, {
                                    dataType: "json"
                                }),
                                k[0].validform_ajax = a.ajax(n),
                                "ajax"
                        }
                        return l && j.util.isEmpty.call(a(this), g) && (j.util.abort.call(k[0]),
                                k[0].validform_valid = "true"),
                            d || (j.util.showmsg.call(b, h.info, e.tiptype, {
                                    obj: a(this),
                                    type: h.type,
                                    sweep: e.tipSweep
                                }, "bycheck"),
                                k.removeClass("Validform_error")),
                            f = null,
                            !0
                    },
                    submitForm: function (b, c, d, e, g) {
                        var h = this;
                        if ("posting" === h[0].validform_status)
                            return !1;
                        if (b.postonce && "posted" === h[0].validform_status)
                            return !1;
                        var k = b.beforeCheck && b.beforeCheck(h);
                        if (k === !1)
                            return !1;
                        var l, m = !0;
                        if (h.find("[datatype]").each(function () {
                                if (c)
                                    return !1;
                                if (b.ignoreHidden && a(this).is(":hidden") || "dataIgnore" === a(this).data("dataIgnore"))
                                    return !0;
                                var d, e = j.util.getValue.call(h, a(this));
                                if (f = d = a(this),
                                    l = j.util.regcheck.call(h, a(this).attr("datatype"), e, a(this)),
                                    !l.passed)
                                    return j.util.showmsg.call(h, l.info, b.tiptype, {
                                            obj: a(this),
                                            type: l.type,
                                            sweep: b.tipSweep
                                        }),
                                        d.addClass("Validform_error"),
                                        b.showAllError ? (m && (m = !1),
                                            !0) : (!!b.isFocus && d.focus(),
                                            m = !1,
                                            !1);
                                if (a(this).attr("ajaxurl") && !j.util.isEmpty.call(a(this), e)) {
                                    if ("true" !== this.validform_valid) {
                                        var g = a(this);
                                        return j.util.showmsg.call(h, h.data("tipmsg").v || i.v, b.tiptype, {
                                                obj: g,
                                                type: 3,
                                                sweep: b.tipSweep
                                            }),
                                            d.addClass("Validform_error"),
                                            g.trigger("blur", ["postform"]),
                                            b.showAllError ? (m && (m = !1),
                                                !0) : (m = !1,
                                                !1)
                                    }
                                } else
                                    a(this).attr("ajaxurl") && j.util.isEmpty.call(a(this), e) && (j.util.abort.call(this),
                                        this.validform_valid = "true");
                                j.util.showmsg.call(h, l.info, b.tiptype, {
                                        obj: a(this),
                                        type: l.type,
                                        sweep: b.tipSweep
                                    }),
                                    d.removeClass("Validform_error"),
                                    f = null
                            }),
                            b.showAllError && h.find(".Validform_error:first").focus(),
                            m) {
                            var n = b.beforeSubmit && b.beforeSubmit(h);
                            if (n === !1)
                                return !1;
                            if (h[0].validform_status = "posting",
                                !b.ajaxPost && "ajaxPost" !== e) {
                                b.postonce || (h[0].validform_status = "normal");
                                var d = d || b.url;
                                return d && h.attr("action", d),
                                    b.callback && b.callback(h)
                            }
                            var o = a.extend(!0, {}, b.ajaxpost || {});
                            if (o.url = d || o.url || b.url || h.attr("action"),
                                j.util.showmsg.call(h, h.data("tipmsg").p || i.p, b.tiptype, {
                                    obj: h,
                                    type: 1,
                                    sweep: b.tipSweep
                                }, "byajax"),
                                g ? o.async = !1 : g === !1 && (o.async = !0),
                                o.success) {
                                var p = o.success;
                                o.success = function (c) {
                                    b.callback && b.callback(c),
                                        h[0].validform_ajax = null,
                                        h[0].validform_status = "y" === a.trim(c.status) ? "posted" : "normal",
                                        p(c, h)
                                }
                            }
                            if (o.error) {
                                var q = o.error;
                                o.error = function (a) {
                                    b.callback && b.callback(a),
                                        h[0].validform_status = "normal",
                                        h[0].validform_ajax = null,
                                        q(a, h)
                                }
                            }
                            var r = h.serializeArray();
                            r.push({
                                name: "isAsync",
                                value: !0
                            });
                            var s = {
                                type: "POST",
                                async: !0,
                                data: r,
                                success: function (c) {
                                    "y" === a.trim(c.status) ? (h[0].validform_status = "posted",
                                            j.util.showmsg.call(h, c.info, b.tiptype, {
                                                obj: h,
                                                type: 2,
                                                sweep: b.tipSweep
                                            }, "byajax")) : (h[0].validform_status = "normal",
                                            j.util.showmsg.call(h, c.info, b.tiptype, {
                                                obj: h,
                                                type: 3,
                                                sweep: b.tipSweep
                                            }, "byajax")),
                                        b.callback && b.callback(c),
                                        h[0].validform_ajax = null
                                },
                                error: function (a) {
                                    var c = "status: " + a.status + "; statusText: " + a.statusText;
                                    j.util.showmsg.call(h, c, b.tiptype, {
                                            obj: h,
                                            type: 3,
                                            sweep: b.tipSweep
                                        }, "byajax"),
                                        b.callback && b.callback(a),
                                        h[0].validform_status = "normal",
                                        h[0].validform_ajax = null
                                }
                            };
                            o = a.extend({}, s, o, {
                                    dataType: "json"
                                }),
                                h[0].validform_ajax = a.ajax(o)
                        }
                        return !1
                    },
                    resetForm: function () {
                        var a = this;
                        a.each(function () {
                                this.reset && this.reset(),
                                    this.validform_status = "normal"
                            }),
                            a.find(".Validform_right").text(""),
                            a.find(".J_Strength").children().removeClass("bgStrength"),
                            a.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading"),
                            a.find(".Validform_error").removeClass("Validform_error"),
                            a.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function () {
                                this.validform_lastval = null
                            }),
                            a.eq(0).find("input:first").focus()
                    },
                    abort: function () {
                        this.validform_ajax && this.validform_ajax.abort()
                    }
                },
                a.Datatype = j.util.dataType,
                j.prototype = {
                    dataType: j.util.dataType,
                    eq: function (b) {
                        var c = this;
                        return b >= c.forms.length ? null : (b in c.objects || (c.objects[b] = new j(a(c.forms[b]).get(), {}, !0)),
                            c.objects[b])
                    },
                    resetStatus: function () {
                        var b = this;
                        return a(b.forms).each(function () {
                                this.validform_status = "normal"
                            }),
                            this
                    },
                    setStatus: function (b) {
                        var c = this;
                        return a(c.forms).each(function () {
                                this.validform_status = b || "posting"
                            }),
                            this
                    },
                    getStatus: function () {
                        var b = this,
                            c = a(b.forms)[0].validform_status;
                        return c
                    },
                    ignore: function (b) {
                        var c = this,
                            b = b || "[datatype]";
                        return a(c.forms).find(b).each(function () {
                                a(this).data("dataIgnore", "dataIgnore").removeClass("Validform_error")
                            }),
                            this
                    },
                    unignore: function (b) {
                        var c = this,
                            b = b || "[datatype]";
                        return a(c.forms).find(b).each(function () {
                                a(this).removeData("dataIgnore")
                            }),
                            this
                    },
                    addRule: function (b) {
                        for (var c = this, b = b || [], d = 0; d < b.length; d++) {
                            var e = a(c.forms).find(b[d].ele);
                            for (var f in b[d])
                                "ele" !== f && e.attr(f, b[d][f])
                        }
                        return a(c.forms).each(function () {
                                var b = a(this);
                                j.util.enhance.call(b, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep, "addRule")
                            }),
                            this
                    },
                    ajaxPost: function (b, c, d) {
                        var f = this;
                        return a(f.forms).each(function () {
                                (1 == this.settings.tiptype || 2 == this.settings.tiptype || 3 == this.settings.tiptype) && e(),
                                    j.util.submitForm.call(a(f.forms[0]), this.settings, b, d, "ajaxPost", c)
                            }),
                            this
                    },
                    submitForm: function (b, d) {
                        var e = this;
                        return a(e.forms).each(function () {
                                var e = j.util.submitForm.call(a(this), this.settings, b, d);
                                e === c && (e = !0),
                                    e === !0 && this.submit()
                            }),
                            this
                    },
                    resetForm: function () {
                        var b = this;
                        return j.util.resetForm.call(a(b.forms)),
                            this
                    },
                    abort: function () {
                        var b = this;
                        return a(b.forms).each(function () {
                                j.util.abort.call(this)
                            }),
                            this
                    },
                    check: function (b, c) {
                        var c = c || "[datatype]",
                            d = this,
                            e = a(d.forms),
                            f = !0;
                        return e.find(c).each(function () {
                                j.util.check.call(this, e, "", b) || (f = !1)
                            }),
                            f
                    },
                    config: function (b) {
                        var c = this;
                        return b = b || {},
                            a(c.forms).each(function () {
                                var c = a(this);
                                this.settings = a.extend(!0, this.settings, b),
                                    j.util.enhance.call(c, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep)
                            }),
                            this
                    }
                },
                a.fn.Validform = function (a) {
                    return new j(this, a)
                },
                a.Showmsg = function (a) {
                    e(),
                        j.util.showmsg.call(b, a, 1, {})
                },
                a.Hidemsg = function () {
                    g.hide(),
                        h = !0
                },
                a.ValidformDataType = j.util.dataType,
                a.fn.passwordStrength = function (b) {
                    b = a.extend({}, a.fn.passwordStrength.defaults, b),
                        this.each(function () {
                            var c = a(this),
                                d = !1,
                                e = c.parents("form:first"),
                                f = e.find(".J_Strength"),
                                g = e[0].settings.datatype.psdvalid;
                            c.bind("keyup blur", function (h) {
                                var i = c.val();
                                if ("" == i && "ignore" == c.attr("ignore")) {
                                    var j = ["", "低", "中", "高"];
                                    return void f.removeClass("strength-L1 strength-L2 strength-L3 strength-d1 strength-d2 strength-d3 strength-d4 strength-d5").find(".brief strong").text(j[0])
                                }
                                var k = g(i, c, e, void 0);
                                d = k === !0,
                                    !d && c.attr("errormsg", k),
                                    b.trigger(c, !d, h);
                                var j = ["", "低", "中", "高"];
                                if (f.removeClass("strength-L1 strength-L2 strength-L3 strength-d1 strength-d2 strength-d3 strength-d4 strength-d5").find(".brief strong").text(j[0]),
                                    d) {
                                    var l = a.fn.passwordStrength.getLevel(i);
                                    f.addClass("strength-L" + l).find(".brief strong").text(j[l]);
                                    for (var m = a.fn.passwordStrength.getDetail(i), n = 0, o = m.length; o > n; n++)
                                        f.addClass("strength-d" + m[n]);
                                    b.showmsg(c, "", 2)
                                } else
                                    b.showmsg(c, c.attr("" == i ? "nullmsg" : "errormsg"), 3)
                            })
                        })
                },
                a.fn.passwordStrength.regEn = /[a-zA-Z]/,
                a.fn.passwordStrength.regNum = /[0-9]/,
                a.fn.passwordStrength.regSpec = /[^a-zA-Z0-9]/,
                a.fn.passwordStrength.getLevel = function (a) {
                    var b = this.regEn.test(a),
                        c = this.regNum.test(a),
                        d = this.regSpec.test(a);
                    return b && c && d ? 3 : b && c || b && d || c && d ? 2 : 1
                },
                a.fn.passwordStrength.getDetail = function (a) {
                    var b = [1, 5];
                    return /[A-Z]/.test(a) && b.push(2),
                        /[a-z]/.test(a) && b.push(3),
                        this.regNum.test(a) && b.push(4),
                        b
                },
                a.fn.passwordStrength.defaults = {
                    trigger: a.noop
                }
        }(jQuery, window)
    }),
    define("lib/util/placeholder", [], function () {
        var a = {
            text2html: function (a, b) {
                return a.replace(/\{\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*\}/g, "{{$1}}").replace(/\{\{[a-zA-Z0-9_]+\}\}/g, function (a) {
                    var c = b[a.substr(2, a.length - 4)];
                    return void 0 === c ? "" : c
                })
            },
            generateRandomName: function () {
                var a = "",
                    b = [],
                    c = 0,
                    d = "0123456789ABCDEF";
                for (c = 0; 32 > c; c++)
                    b[c] = d.substr(Math.floor(16 * Math.random()), 1);
                return b[12] = "4",
                    b[16] = d.substr(3 & b[16] | 8, 1),
                    a = "placeholder_" + b.join("")
            }
        };
        $.fn.extend({
            placeholder: function (b) {
                return "placeholder" in $('<input type="text"/>')[0] ? this : this.each(function () {
                    var c, d = $(this),
                        e = d.val();
                    if ("" == !d.attr("placeholder")) {
                        if (d.is("[placeholder-id]"))
                            c = $("#" + d.attr("placeholder-id"));
                        else {
                            c = $(a.text2html(b, {
                                text: d.attr("placeholder")
                            }));
                            var f = a.generateRandomName();
                            d.parent().hasClass("psdeyewrap") || d.attr("placeholder-id", f).after(c.attr("id", f));
                            var g = function () {
                                var a = $(this),
                                    b = a.parent().children("#" + a.attr("placeholder-id"));
                                "" == a.val() ? b.show() : b.hide()
                            };
                            d.on("keyup", g).on("blur", function () {
                                    var a = this;
                                    setTimeout(function () {
                                        g.call(a),
                                            a = null
                                    }, 100)
                                }),
                                c.on("click", function () {
                                    $(this).parent().children("[placeholder-id=" + $(this).attr("id") + "]").trigger("focus")
                                })
                        }
                        "" == e ? c.show() : c.hide();
                        var h = d.position(),
                            i = d.height(),
                            j = (d.width(),
                                parseInt(d.css("padding-left"))),
                            k = (parseInt(d.css("padding-right")),
                                parseInt(d.css("margin-left")));
                        c.css({
                                top: h.top + "px",
                                left: h.left + j + k + "px",
                                width: "auto",
                                height: i + "px",
                                "padding-top": d.css("padding-top"),
                                "padding-bottom": d.css("padding-bottom"),
                                "line-height": d.css("line-height"),
                                "font-size": d.css("font-size"),
                                "z-index": "10"
                            }),
                            d = c = null
                    }
                })
            }
        })
    }),
    define("global", ["lib/util/html", "lib/util/main", "lib/util/msg", "lib/rsa/rsa", "lib/artDialog/jquery.artDialog", "lib/util/imgslide", "lib/util/selectbox", "lib/util/eye", "lib/util/placeholder", "lib/fingerprint/fingerprint"], function (a) {
        function b(a) {
            var b = a;
            if (b.hasClass("J_NoDelect") || !b.hasClass("J_DelectIcon"))
                return $(".J_Delectwrap").remove(),
                    !1;
            if ("" != b.val() && 0 == b.parent().find(".J_Delectwrap").length) {
                $(".J_Delectwrap").remove();
                var c = b.position(),
                    d = c.left,
                    e = c.top,
                    f = b.outerWidth(),
                    g = b.outerHeight();
                if (b.siblings(".psdeyewrap").length > 0 || b.parent().hasClass("psdeyewrap")) {
                    f -= 30;
                    var h = '<div class="delectwrap J_Delectwrap" style="left:' + d + "px; top:" + e + "px; width:" + f + 'px; height:0;"><em></em></div>'
                } else if (b.siblings(".J_ImgCodeView").length > 0) {
                    f -= $(".J_ImgCodeView").width();
                    var h = '<div class="delectwrap J_Delectwrap" style="left:' + d + "px; top:" + e + "px; width:" + f + 'px; height:0;"><em></em></div>'
                } else
                    var h = '<div class="delectwrap J_Delectwrap" style="left:' + d + "px; top:" + e + "px; width:" + f + 'px; height:0;"><em></em></div>';
                var i = $(h);
                b.parents(".form-item").append(i),
                    i.find("em").css({
                        "margin-top": function () {
                            return parseInt((g - $(this).height()) / 2, 10) + "px"
                        }
                    }),
                    $(".J_Delectwrap em").click(function () {
                        b.parents(".form-item").find(".psdeyewrap").length > 0 ? (b.focus(),
                                b.parents(".form-item").removeClass("error").find(".Validform_checktip").remove(),
                                b.parents(".form-item").find("input[type=text],input[type=password]").val("")) : (b.parents(".form-item").removeClass("error").find(".Validform_checktip").remove(),
                                b.val("").focus(),
                                b.attr("cmcc-btn") && $("#" + b.attr("cmcc-btn")).addClass("disabled").removeClass("msgdisabled")),
                            b.parents(".form-item").addClass("delectfocus"),
                            $(".J_Delectwrap").remove()
                    })
            } else
                "" == b.val() && $(".J_Delectwrap").remove()
        }

        function c() {
            if ($(".J_FormLogin").length > 0 && $("#J_ParentUrl").length > 0) {
                var a = Math.ceil($(".J_FormLogin").parent().height()) + Math.ceil($(".J_FormLogin").parent().css("paddingTop").replace("px", "")) + Math.ceil($(".J_FormLogin").parent().css("paddingBottom").replace("px", "")),
                    b = $("#J_ParentUrl").val();
                window.postMessage ? window.parent.postMessage(a, g.urlParame.getHost(b)) : window.parent.location.replace(g.urlParame.modifyHash(b, {
                    height: a
                }))
            }
        }

        function d() {
            var a = $(this);
            $(".txt").attr("ignore", "ignore"),
                $(".J_Delectwrap").remove(),
                a.parents(".form-item:first").addClass("focus"),
                $(".J_TipMark").hide(),
                $(".J_LoginTipMark").empty().parent().removeClass("form-special"),
                b($(this)),
                c()
        }

        function e(a) {
            0 == a ? ($.extend(g.valid.config.datatype, {
                    imgcode: /^(?:[0-9]|[1-9][0-9])$/
                }),
                $.extend($.ValidformDataType, {
                    imgcode: /^(?:[0-9]|[1-9][0-9])$/
                })) : ($.extend(g.valid.config.datatype, {
                    imgcode: /^[\u4e00-\u9fa5]{2,4}$/
                }),
                $.extend($.ValidformDataType, {
                    imgcode: /^[\u4e00-\u9fa5]{2,4}$/
                }))
        }
        var f = a("lib/util/html"),
            g = a("lib/util/main"),
            h = a("lib/util/msg"),
            i = a("lib/util/imgslide");
        a("lib/util/selectbox"),
            a("lib/util/eye"),
            a("lib/util/placeholder"),
            a("lib/fingerprint/fingerprint");
        var j = $(window).height(),
            k = $(document.body).height();
        if (j > k) {
            var l = j - 211;
            $(".bodier").css("min-height", l + "px")
        }
        $(".J_Checkbox").checkbox().click(function () {
                var a = $(this),
                    b = a.is(":checked");
                a.parents("form:first").find(":submit").prop("disabled", b ? !1 : !0)[b ? "removeClass" : "addClass"]("disabled")
            }),
            $("input:radio").radiobox(),
            $(".txt").focus(d).blur(function () {
                var a = $(this).parents(".form-item:first");
                a.removeClass("delectfocus"),
                    setTimeout(function () {
                        a.removeClass("focus"),
                            c()
                    }, 100),
                    "" == $(this).val() && a.removeClass("error success ajaxsuc").find(".Validform_checktip").remove(),
                    a.hasClass("ajaxerror") && a.removeAttr("style").find(".Validform_checktip").removeAttr("style"),
                    setTimeout(function () {
                        $("input[type=text],input[type=password]").is(":focus") || $(".J_Delectwrap").remove()
                    }, 200)
            }).on("input", function () {
                b($(this))
            }).on("keyup", function () {
                b($(this))
            }),
            $("body").delegate(".psdeyewrap input", "focus", function () {
                b($(this))
            }),
            $(".J_SelectBox").selectbox(f.selectbox).change(function () {
                $(this).trigger("blur");
                var a = $(this).val(),
                    b = $(this).attr("cmcc-dval");
                ("" == a || "" != a && b) && $(".J_SelectBox").find("option").filter(function () {
                        return $(this).val() == b
                    }).show().end().end().siblings(".select_list").find("a").filter(function () {
                        return $(this).attr("data-value") == b
                    }).show(),
                    "" != a && $(".J_SelectBox").find("option").filter(function () {
                        return $(this).val() == a
                    }).hide().end().end().siblings(".select_list").find("a").filter(function () {
                        return $(this).attr("data-value") == a
                    }).hide(),
                    $(this).attr("cmcc-dval", a)
            }),
            $(".J_Href").click(function () {
                window.location.href = $(this).attr("cmcc-href")
            }),
            $(".J_GoEmailBtn").each(function () {
                var a = g.common.findSearchParams($(this).attr("cmcc-urlname") || "email");
                if (!/@/.test(a))
                    return !0;
                var b = h.goEmail[a.split("@")[1]];
                $(this).html(b ? g.common.text2val(f.goEmail.btnHtml, {
                    href: b
                }) : f.goEmail.btnTxt)
            }),
            $(".J_GetUrlVal").each(function () {
                var a = g.common.findSearchParams($(this).attr("cmcc-urlname"));
                $(this).val(a ? a : "")
            }),
            $("#J_Email,#J_Account").dropdownbox(),
            $(window).keydown(function (a) {
                var b = $(a.target).closest(".txt");
                13 == a.keyCode && setTimeout(function () {
                    b.closest("form").find(":submit").trigger("click"),
                        b = null
                }, 10)
            }),
            $("[diff]").keyup(function () {
                var a = $(this),
                    b = $.trim(a.val());
                if ("" != b) {
                    var c = a.parents("form:first").find("[diff]").not(a[0]);
                    c.each(function () {
                        var a = $.trim($(this).val());
                        ("" != a || b == a) && (this.validform_lastval = null,
                            $(this).trigger("blur"))
                    })
                }
            }),
            $(".migubtn").mouseenter(function () {
                var a = Math.round(1e6 * Math.random());
                $("#j-miguwelcome-tips .miguwelcome-titler dt img,.J_ScrollBox:gt(0) .photo .back img").attr("src", function (b, c) {
                    return c.split("?")[0] + "?t=" + a
                })
            }),
            $("input[type=password]").not(".J_PwPsd").psdEye(),
            $(".J_PwPsd").psdEye1();
        var m = parseInt($(".j_imgtype:first").val(), 10);
        e(m),
            $(".J_ImgCodeView").on("click.imgcodeSpace", function (a) {
                var b = $(a.target).closest("img,a");
                if (b[0] && (g.page.imgCodeHandler(),
                        2 != $(".j_imgtype:first").val())) {
                    var c = $(this).find("img"),
                        d = {
                            url: c.attr("cmcc-ajax") || c.attr("cmccnum-ajax")
                        };
                    g.common.splitUrl(d);
                    var f = $(this),
                        i = f.siblings("input:text");
                    0 == $(".j_imgtype:first").val() ? $(".overseas").length > 0 || $(".newtv").length > 0 || $(".login-game-wrap").length > 0 || $(".gamesdk").length > 0 ? i.attr("placeholder", "请输入图中的结果") : $(".internetlogin").length > 0 ? i.attr("placeholder", "請輸入圖中結果") : i.attr("placeholder", "请输入右图计算结果") : $(".overseas").length > 0 || $(".newtv").length > 0 || $(".login-game-wrap").length > 0 || $(".gamesdk").length > 0 ? i.attr("placeholder", "请输入下图中的汉字") : $(".internetlogin").length > 0 ? i.attr("placeholder", "請輸入圖中漢字") : i.attr("placeholder", "请输入右图中的汉字"),
                        g.common.ajax({
                            url: d.url,
                            type: "post",
                            dataType: "json",
                            success: function (a) {
                                a.status == h.ajax.SUCCESS ? (e(a.result.graphtype),
                                    c.attr("src", a.result.captchaurl),
                                    i.val(""),
                                    f.parents(".J_Imgbox").is(":visible") && $("#" + i.attr("cmcc-btn")).removeClass("msgdisabled")) : g.valid.config.tiptype(a.message, {
                                    type: 3,
                                    obj: i
                                }, g.common.noop)
                            },
                            error: function () {
                                g.valid.config.tiptype(h.ajax.sysError, {
                                    type: 3,
                                    obj: f.siblings("input:text")
                                }, g.common.noop)
                            },
                            complete: function () {
                                b = f = c = null
                            }
                        })
                }
            }).each(function () {
                var a = $(this),
                    b = a.find("img"),
                    c = b.attr("cmcc-ajax") || b.attr("cmccnum-ajax"),
                    d = g.urlParame.getValByKey(c, "imgcodeType");
                d.length > 0 && a.after('<input type="hidden" class="J_TypesHidden" name="imgcodeType" value="' + d + '"/>')
            }),
            g.page.imgCodeHandler = function () {
                var a = $(".j_imgtype:first"),
                    b = a.val(),
                    c = a.data("isRisk");
                if (2 != b || !c || !g.page.getImgType().isPreventImgSlide) {
                    var d = $("#J_MsgCodeRefreshUrl").val(),
                        e = $("#J_MsgCodeValidUrl").val(),
                        f = $("#J_MsgCodeRsaUrl").val(),
                        h = $("#J_MsgCodeClearUrl").val(),
                        j = $("form:visible .J_ImgCodeView").parent(),
                        k = j.find(".img-bg"),
                        l = "",
                        m = "";
                    k[0] && (l = k.css("background-image").replace(/\"/g, ""),
                            m = j.find(".img-cut").css("background-image").replace(/\"/g, "")),
                        k = null,
                        j.removeClass("flip-mode J_FlipMode").siblings(".J_FlipModeMark").remove().end().children("input:text,label,.J_ImgCodeView").show().siblings(".J_ImgSlideWrap,p,h3,.J_ImgSlideClose").remove(),
                        2 == b ? g.page.saveFingerResult(f, function (a) {
                            function b(a) {
                                var b = a.attr("cmccnum-ajax") || a.attr("cmcc-ajax");
                                if (b.indexOf("imgcodeType=") > -1) {
                                    var c = b.split("imgcodeType=");
                                    b = c[1].split("&")[0]
                                } else
                                    b = "";
                                return b
                            }

                            function k(a) {
                                if (a.parents(".form-item:first").hasClass("J_Imgbox") && a.attr("cmcc-btn")) {
                                    var b = $("#" + a.attr("cmcc-btn")).siblings(".Validform_checktip"),
                                        c = b.html();
                                    /^\<q\>\<\/q\>验证码错误或已失效$/.test(c) && (b.parents(".form-item").removeClass("error"),
                                        b.remove())
                                }
                            }

                            function n() {
                                $(".J_TipMark").hide(),
                                    $(".J_LoginTipMark").empty().parent().removeClass("form-special")
                            }
                            var o = function (c) {
                                    c.fingerPrint = a,
                                        c.imgcodeType = b(this.wrapEle.siblings(".J_ImgCodeView").find("img"))
                                },
                                p = function (c) {
                                    c.captcha = g.page.rsaLongStr(f, c.captcha),
                                        c.fingerPrint = a,
                                        c.imgcodeType = b(this.wrapEle.siblings(".J_ImgCodeView").find("img")),
                                        c.terminalType = "0"
                                };
                            j.each(function () {
                                var a = $(this),
                                    b = a.find("input[type=text]");
                                if (b.val("").attr("nullmsg-bak", b.attr("nullmsg")).attr("nullmsg", "请验证滑块").removeAttr("maxlength").data("dataIgnore", ""),
                                    c) {
                                    setTimeout(function () {
                                        $(":focus").blur()
                                    }, 100);
                                    var f = {},
                                        j = navigator.userAgent;
                                    f.iphone = j.indexOf("iPhone") > -1,
                                        f.ipod = j.indexOf("iPod") > -1,
                                        f.ipad = j.indexOf("iPad") > -1,
                                        f.nokiaN = j.indexOf("NokiaN") > -1,
                                        /Win(?:dows )?([^do]{2})/.test(j),
                                        f.winMobile = /^CE|Ph$/.test(RegExp.$1),
                                        f.ios = 0 == navigator.platform.indexOf("Mac") && j.indexOf("Mobile") > -1,
                                        f.android = j.indexOf("Android") > -1;
                                    var q = f.iphone || f.ipod || f.ipad || f.nokiaN || f.winMobile || f.ios || f.android;
                                    a.addClass("flip-mode J_FlipMode" + (q ? "" : " back-mode")).removeClass("flip-fly").after('<div class="mark J_FlipModeMark"></div>').children().hide(),
                                        a.prepend("<h3>安全验证</h3><p>" + $("#J_ImgSlideTxt").val() + '</p><div class="J_ImgSlideWrap" style="width:310px;" cmcc-refreshAjax="' + d + '" cmcc-validAjax="' + e + '" cmcc-clearAjax="' + h + '" cmcc-imgbg="' + l + '" cmcc-imgcut="' + m + '"></div><a href="javascript:;" class="J_ImgSlideClose">×</a>'),
                                        i({
                                            expr: a.find(".J_ImgSlideWrap"),
                                            success: function (b) {
                                                var c = a.find("input[type=text]");
                                                c.val(b.result.checktoken).data("dataIgnore", "dataIgnore"),
                                                    n.call(c[0]),
                                                    k(c),
                                                    $(".J_FlipMode").addClass("flip-fly").siblings(".J_FlipModeMark").hide(),
                                                    g.valid.config.tiptype("", {
                                                        type: 2,
                                                        obj: c
                                                    }, g.common.noop),
                                                    g.page.setImgType(2, !0, !1),
                                                    g.page.dynamicHandler(),
                                                    a = null;
                                                var d = c.attr("cmcc-btn");
                                                if (d) {
                                                    c.removeAttr("cmcc-btn");
                                                    var e = $("#" + d),
                                                        f = e.data("msgValid");
                                                    if (f) {
                                                        var h = c.attr("id");
                                                        for (var i in f)
                                                            i == h ? delete f[i] : $("#" + i)[0].validform_lastval = null
                                                    }
                                                }
                                            },
                                            isSta: !0,
                                            dataHandler: o,
                                            dataValidHandler: p
                                        })
                                } else
                                    a.children("label:not(.pholder)").text("验证").siblings().hide(),
                                    b.before('<div class="J_ImgSlideWrap" style="width:310px; float:left;" cmcc-refreshAjax="' + d + '" cmcc-validAjax="' + e + '" cmcc-clearAjax="' + h + '" cmcc-imgbg="' + l + '" cmcc-imgcut="' + m + '"></div>'),
                                    i({
                                        expr: a.find(".J_ImgSlideWrap"),
                                        success: function (b) {
                                            var c = a.find("input[type=text]");
                                            c.val(b.result.checktoken).data("dataIgnore", "dataIgnore"),
                                                n.call(c[0]),
                                                k(c),
                                                g.valid.config.tiptype("", {
                                                    type: 2,
                                                    obj: c
                                                }, g.common.noop),
                                                g.page.staticSubmitHandler(),
                                                a = null
                                        },
                                        dataHandler: o,
                                        dataValidHandler: p
                                    }),
                                    g.page.getImgSlideStatus();
                                b = null
                            })
                        }) : j.find("input[type=text]").data("dataIgnore", "").attr("nullmsg", function (a, b) {
                            return $(this).attr("nullmsg-bak") || b
                        }).attr("maxlength", 4)
                }
            },
            $(".J_ImgCodeView").parent().on("click", function (a) {
                var b = $(a.target).closest(".J_ImgSlideClose");
                if (b[0]) {
                    $(this).addClass("flip-fly").siblings(".J_FlipModeMark").remove(),
                        g.page.setImgType(2, !0, !0);
                    var c = b.siblings("input[type=text]"),
                        d = c.data("dataIgnore", "dataIgnore").attr("cmcc-btn");
                    if (d) {
                        c.removeAttr("cmcc-btn");
                        var e = $("#" + d);
                        e.removeAttr("disabled").removeClass("disabled");
                        var f = e.data("msgValid");
                        if (f) {
                            var h = c.attr("id");
                            for (var i in f)
                                i == h ? delete f[i] : $("#" + i)[0].validform_lastval = null
                        }
                    }
                }
            }),
            setTimeout(function () {
                $("[placeholder]").placeholder(f.placeholder)
            }, 100)
    }),
    seajs.use(["global"]),
    seajs.use(["loginPage"]);