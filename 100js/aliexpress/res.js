t = this;

function e() {
    // !function (t, e) {
    //     if (!(t instanceof e))
    //         throw new TypeError("Cannot call a class as a function")
    // }(this, e);
    // var i = function (t, e) {
    //     if (!t)
    //         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    //     return !e || "object" != typeof e && "function" != typeof e ? t : e
    // }(this, t.call(this, n));
    var i = {};
    return i.state = {
            phoneCode: i.getDefaultCountryData().phoneCode,
            countryCode: i.getDefaultCountryData().countryCode,
            isSubmit: !1,
            keepLogin: !1,
            submitBtnDisable: !1,
            showBindDialog: !1,
            bindDialogMsg: null,
            countryData: i.getDefaultCountryData()
        },
        i.defaultLoginId = window.viewConfig.loginId || "",
        i.defaultSmsLoginId = window.viewConfig.smsLoginId || "",
        i.toastErrorStyle = window.viewConfig.toastErrorStyle || !1,
        i.errorTipStyle = window.viewConfig.errorTipStyle,
        i.commonDialogNode = null,
        i.api = i.setLoginHost(window.viewConfig.api),
        i.config = o({}, window.viewConfig, {
            countryList: window.viewData.countryAreaConfig ? window.viewData.countryAreaConfig.countryList : [],
            hotCountryList: window.viewData.countryAreaConfig ? window.viewData.countryAreaConfig.hotCountryList : []
        }),
        i.viewData = window.viewData,
        i.loginData = window.viewData.loginFormData || {},
        i.isMobile = i.viewData.isMobile,
        i.i18n = window._lang,
        i.viewCfg = {},
        i.handleLoginResult = function (t) {
            if ((t.redirect || t.parentRedirect || t.iframeRedirect && !window.loginNoIframe && self !== top) && (i.isRedirect = !0),
                t.asyncUrls && t.asyncUrls.length > 0) {
                var e = void 0;
                for (e in t.asyncUrls) {
                    var n = document.createElement("img");
                    n.setAttribute("src", t.asyncUrls[e]),
                        n.setAttribute("style", "display:none"),
                        document.body.appendChild(n)
                }
                setTimeout(function () {
                    i.handelResult(t)
                }, 500)
            } else if (t.miniLogouts && t.miniLogouts.length > 0 || t.miniVsts) {
                var o = void 0;
                for (o in t.miniLogouts) {
                    var r = document.createElement("script");
                    r.setAttribute("type", "text/javascript"),
                        r.setAttribute("src", t.miniLogouts[o]),
                        document.body.appendChild(r)
                }
                for (o in t.miniVsts) {
                    var a = document.createElement("img");
                    a.setAttribute("src", t.miniVsts[o]),
                        a.setAttribute("style", "display:none"),
                        document.body.appendChild(a)
                }
                setTimeout(function () {
                    i.handelResult(t)
                }, 500)
            } else
                t.conToken && t.scene && (i.conToken = t.conToken,
                    i.scene = t.scene,
                    "changeBind" === t.scene) ? i.setState({
                    showBindDialog: !0,
                    bindDialogMsg: t.message
                }) : i.handelResult(t)
        },
        i.handelResult = function (t) {
            t.action = "loginResult",
                t.titleMsg ? i.showError(t.titleMsg, t.actionType) : i.hideError(),
                t.redirect ? top.location.href = t.redirectUrl : t.parentRedirect ? parent.location.href = t.parentRedirectUrl : t.iframeRedirect ? window.loginNoIframe && self === top ? i.showIframeDialog(t) : location.href = t.iframeRedirectUrl : (t.isCheckCodeShowed ? i.showCheckcode() : i.hideCheckcode(),
                    t.loginId = i.loginIdNode ? i.loginIdNode.value() : "",
                    t.st && (r.default.sendMessage(t),
                        window.events && window.events.publish("afterHandleLoginResult", t)))
        },
        i.getClientInfo = function () {
            return {
                screenPixel: window.screen.width + "x" + window.screen.height,
                navlanguage: navigator.language,
                navUserAgent: navigator.userAgent,
                navPlatform: navigator.platform
            }
        },
        i.showError = function (t, e) {
            e = (e = e || i.errorTipStyle) || (i.toastErrorStyle ? "toast" : "text"),
                i.errorTipNode && i.errorTipNode.showError(t, e, function () {
                    i.resetCheckcode(),
                        r.default.resizeIframe()
                })
        },
        i.hideError = function () {
            i.errorTipNode && i.errorTipNode.hideError(function () {
                r.default.resizeIframe()
            })
        },
        i.rsaPassword = function (t) {
            var e = new l.default;
            return e.setPublic(i.config.rsaModulus, i.config.rsaExponent),
                e.encrypt(t)
        },
        i.showDialog = function (t) {
            window.commonDialogNode && window.commonDialogNode.show(t)
        },
        i.hideDialog = function () {
            window.commonDialogNode && window.commonDialogNode.hide()
        },
        i.viewCfg = n.viewCfg || {},
        i.setDomain(),
        window.miniLogin = {
            handleLoginResult: i.handleLoginResult,
            rsaPassword: i.rsaPassword
        },
        window.showDialog = i.showDialog,
        window.hideDialog = i.hideDialog,
        i
}
// return function(t, e) {
//     // if ("function" != typeof e && null !== e)
//     //     throw new TypeError("Super expression must either be null or a function, not " + typeof e);
//     // t.prototype = Object.create(e && e.prototype, {
//     //     constructor: {
//     //         value: t,
//     //         enumerable: !1,
//     //         writable: !0,
//     //         configurable: !0
//     //     }
//     // }),
//     e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
// }(e, t),
e.prototype.getDefaultCountryData = function () {
        var t = {
            phoneCode: "86",
            countryCode: "CN"
        };
        if (window.viewData && window.viewData.countryAreaConfig) {
            var e = window.viewData.countryAreaConfig.countryList.filter(function (t) {
                return t.countryCode === window.viewData.countryAreaConfig.defaultCountryCode
            });
            return e && 0 != e.length || !window.viewData.countryAreaConfig.hotCountryList || (e = window.viewData.countryAreaConfig.hotCountryList.filter(function (t) {
                    return t.countryCode === window.viewData.countryAreaConfig.defaultCountryCode
                })),
                e ? e[0] : t
        }
        return t
    },
    e.prototype.showCheckCodeError = function () {
        var t = this.i18n;
        this.checkCodeNode.isImageMachineVerify() ? this.showError(t["error-login-checkcode-empty"]) : this.checkCodeNode.isNocaptchaMachineVerify() ? this.showError(t["error-login-nocaptcha-empty"]) : this.checkCodeNode.isClickNocaptchaMachineVerify() && this.showError(t["error-login-click-nocaptcha-empty"])
    },
    e.prototype.showCheckcode = function (t) {
        this.checkCodeNode && this.checkCodeNode.show(t)
    },
    e.prototype.hideCheckcode = function () {
        this.checkCodeNode && this.checkCodeNode.hide()
    },
    e.prototype.reloadCheckcode = function () {
        this.checkCodeNode && this.checkCodeNode.reload()
    },
    e.prototype.resetCheckcode = function () {
        this.checkCodeNode && this.checkCodeNode.reset()
    },
    e.prototype.componentDidMount = function () {
        window.PAGE_START_LOAD_TIME ? r.default.sendMessage({
                action: "afterPageInit",
                time: (new Date).getTime() - window.PAGE_START_LOAD_TIME
            }) : r.default.sendMessage({
                action: "afterPageInit"
            }),
            window.viewConfig.errorMsg && (this.showError(window.viewConfig.errorMsg),
                window.viewConfig.errorMsg = ""),
            window.sendAfterInitMessageTimes = 0,
            this.sendAfterInitMessage()
    },
    e.prototype.isUmdReady = function () {
        return window.umidToken || window.um && window.um.getStatus(!0) > 200
    },
    e.prototype.sendAfterInitMessage = function () {
        var t = this;
        window.sendAfterInitMessageInterval && clearInterval(window.sendAfterInitMessageInterval),
            window.sendAfterInitMessageInterval = setInterval(function () {
                if (window.afterInitSent || window.sendAfterInitMessageTimes > 5)
                    return clearInterval(window.sendAfterInitMessageInterval),
                        void t.postHasLoginMessage();
                window.sendAfterInitMessageTimes = window.sendAfterInitMessageTimes + 1,
                    t.isUmdReady() && t.postHasLoginMessage()
            }, 100)
    },
    e.prototype.postHasLoginMessage = function () {
        r.default.sendMessage(o({
                action: "afterInit"
            }, this.loginData)),
            r.default.resizeIframe(),
            window.afterInitSent = !0
    },
    e.prototype.getCommonLoginData = function (t) {
        var e = o({}, t, {
            ua: window.UA_Opt ? window[UA_Opt.LogVal] : "",
            umidGetStatusVal: window.um ? um.getStatus(!0) : null
        }, this.getClientInfo(), this.loginData, {
            umidToken: window.umidToken || this.loginData.umidToken
        });
        if (this.checkCodeNode && this.checkCodeNode.isShow()) {
            var n = this.checkCodeNode.getData();
            e = o({}, e, n)
        }
        return e
    },
    e.prototype.renderBlock = function (t) {
        var e = this;
        return (0,
            i.h)(a.default, {
            moduleCfg: this.getViewCfg() ? this.getViewCfg().moduleCfg : {},
            name: t,
            onKeepLoginChange: function (t) {
                e.setState({
                    keepLogin: t
                })
            },
            keepLoginChecked: this.state.keepLogin,
            onAgreementChange: function (t) {
                e.setState({
                    submitBtnDisable: !t
                })
            }
        })
    },
    e.prototype.getViewCfg = function () {
        return this.viewCfg || {}
    },
    e.prototype.setDomain = function () {
        "passport.aliexpress.com" == location.hostname || "passport.daily.aliexpress.com" == location.hostname ? document.domain = "aliexpress.com" : "passport.alibaba.com" != location.hostname && "passport.daily.alibaba.com" != location.hostname || (document.domain = "alibaba.com")
    },
    e.prototype.continueLogin = function (t) {
        var e = this,
            n = t || this.getCommonLoginData({
                conToken: this.conToken,
                scene: this.scene
            });
        this.reqPost(this.api.conLoginApi, f.default.stringify(n), function (t) {
            var n = t.data.content.data;
            n.resultCode && 100 === n.resultCode && e.handleLoginResult(n)
        }, function (t) {})
    },
    e.prototype.renderCommonDialog = function () {
        return (0,
            i.h)(c.default, {
            id: "common-dialog-id",
            ref: function (t) {
                t && (window.commonDialogNode = t)
            }
        })
    },
    e.prototype.renderBindDialog = function (t) {
        var e = this,
            n = t.visible,
            o = t.message,
            r = t.okText,
            a = void 0 === r ? "确定" : r,
            c = t.cancelText,
            u = void 0 === c ? "取消" : c;
        return (0,
            i.h)(s.default, {
            onClose: function () {
                e.setState({
                    showBindDialog: !1
                })
            },
            visible: n,
            maskClosable: !1,
            style: {
                width: 320
            },
            footer: (0,
                i.h)("div", null, (0,
                i.h)("button", {
                className: "dialog-btn dialog-btn-cancel",
                onClick: function () {
                    e.setState({
                            showBindDialog: !1
                        }),
                        e.conToken = null,
                        e.scene = null
                }
            }, u), (0,
                i.h)("button", {
                className: "dialog-btn dialog-btn-ok",
                onClick: function () {
                    e.setState({
                            showBindDialog: !1
                        }),
                        e.continueLogin()
                }
            }, a))
        }, o)
    },
    e.prototype.setLoginHost = function (t) {
        for (var e in t) {
            var n = t[e];
            window.loginHost && n.indexOf(window.loginHost) < 0 && (t[e] = window.loginHost + n)
        }
        return t
    },
    e.prototype.showIframeDialog = function (t) {
        var e = this,
            n = t.iframeRedirectUrl;
        !n || n && n.toLowerCase().indexOf("javascript:") >= 0 || (this.showDialog({
                prefixCls: "login-check",
                url: n,
                style: "iframe"
            }),
            window.addEventListener("message", function (t) {
                if (!window.loginHost || t.origin === window.loginHost) {
                    var n = null;
                    try {
                        t.data.indexOf("action") > -1 && (n = JSON.parse(decodeURIComponent(t.data))) && "loginResult" == n.action && (e.hideDialog(),
                            e.handelResult(o({}, n)))
                    } catch (t) {}
                }
            }))
    }



function getPwd(passwd) {
    var dd = new e();
    return dd;
    return dd.rsaPassword(passwd);
}


console.log(getPwd('dasdad'))