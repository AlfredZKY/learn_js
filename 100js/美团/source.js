;
require = (function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    50: [function (require, module, exports) {
        //var sign = require('./sign');
        var csrf = $('#csrf').text();

        $.ajaxSettings.beforeSend = function (xhr, settings) {
            xhr.setRequestHeader('X-Client', 'javascript');
            xhr.setRequestHeader('X-CSRF-Token', csrf);

            //var method = settings.method;
            //var url = settings.url;
            //var date = (new Date).toGMTString();
            //var authorization;
            //try {
            //authorization = sign(date, method, url);
            //} catch(err) {
            //xhr.setRequestHeader('X-Error', err.name + ' ' + err.message);
            //}
            //xhr.setRequestHeader('X-Date', date);
            //xhr.setRequestHeader('X-Authorization', authorization);
        }

    }, {}]
}, {}, [50]);

;
require = (function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    40: [function (require, module, exports) {
        (function (global) {
            /*jshint white:true, unused:true, curly:false, sub:true, plusplus:false*/
            /*global require,module*/
            var $each = require('lodash.foreach');
            var Formchecker = require('@sso/scripts/formchecker');
            var initDetectZoom = require('@sso/scripts/zoom');
            var utility = require('@sso/scripts/util');
            var yodaApi = require('@sso/scripts/yodaapi');
            var JSEncrypt = require("jsencrypt").JSEncrypt;
            var changeSettokenToHttps = require('@sso/scripts/changeSettokenToHttps').changeSettokenToHttps
            var normalizeUrl = require('@sso/scripts/changeSettokenToHttps').normalizeUrl

            var UnitLogin = function () {
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                }
                var isDialog = 0;
                var service = 'www';
                var paramStr = $('.login-section').attr('data-params');

                this.$Container = $('.login-section');

                if (paramStr) {
                    if ($.parseJSON(paramStr).isDialog) {
                        isDialog = 1;
                    }

                    if ($.parseJSON(paramStr).service) {
                        service = $.parseJSON(paramStr).service;
                    }
                }
                this.isDialog = isDialog;
                this.service = service;
                this.tempYodaPrama = {};

                this.$NormalForm = $('#J-normal-form');
                this.$MobileForm = $('#J-mobile-form');
                var continueUrl = $('#mobileLoginContinue') && $('#mobileLoginContinue').text();
                this.continue = continueUrl ? changeSettokenToHttps(continueUrl) : 'https://www.meituan.com/account/settoken';

                this.accountLogin = {
                    $emailInput: $('#login-email'),
                    $pwInput: $('#login-password'),
                    $countrycodeInput: this.$NormalForm.find('input[name=countrycode]'),
                    $phoneInputWrapper: this.$NormalForm.find('.phone-input-wrapper'),
                    $pwInputWrapper: this.$NormalForm.find('.pw-input-wrapper'),
                }

                this.mobileLogin = {
                    $countrycodeInput: this.$MobileForm.find('input[name=countrycode]'),
                    $codeInput: $('#login-verify-code')
                }

                if (this.$NormalForm.css('display') !== 'block') {
                    this.formType = 'mobile';
                } else {
                    this.formType = 'normal';
                }

                this.mobileConfig = {
                    lockedMobile: '', // 记录被锁手机号
                    isVerifySuccess: false // 是否已经成功获取手机验证码
                };

                this.bindNormalEvents();
                this.bindMobileEvents();

                initDetectZoom();

                $('.stick-qrcode .close').click(function (e) {
                    e.preventDefault();
                    $('.stick-qrcode').hide();
                });

                this.publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRD8YahHualjGxPMzeIWnAqVGMIrWrrkr5L7gw+5XT55iIuYXZYLaUFMTOD9iSyfKlL9mvD3ReUX6Lieph3ajJAPPGEuSHwoj5PN1UiQXK3wzAPKcpwrrA2V4Agu1/RZsyIuzboXgcPexyUYxYUTJH48DeYBGJe2GrYtsmzuIu6QIDAQAB";
            };

            UnitLogin.ERROR_TIP_CLASS = 'verify-tip--error';

            // 普通登陆事件监听
            UnitLogin.prototype.bindNormalEvents = function () {
                var instance = this;
                var fields = {
                    email: {
                        node: '#login-email',
                        tip: {
                            error: '账号'
                        },
                        checkFn: function (value) {
                            return ($.trim(value) === '');
                        }
                    },
                    pwd: {
                        node: '#login-password',
                        tip: {
                            error: '密码'
                        },
                        checkFn: function (value) {
                            return ($.trim(value) === '');
                        }
                    }
                };

                // 表单检验
                instance.normalChecker = new Formchecker('#J-normal-form', {
                    listen: {
                        focus: false,
                        blur: false,
                        keyup: false,
                        submit: true
                    },
                    fields: fields,
                    setTip: instance.setTip
                });

                instance.$Container.delegate('#login-email', 'focus', function (e) {
                    setErrorMessage('');
                    instance.accountLogin.$phoneInputWrapper.removeClass('form-field--error');
                    instance.accountLogin.$phoneInputWrapper.addClass('focus');
                    instance.oldLoginName = instance.$Container.find('#login-email').val();
                });

                instance.$Container.delegate('#login-email', 'blur', function (e) {
                    instance.accountLogin.$phoneInputWrapper.removeClass('focus');
                    instance.newLoginName = instance.$Container.find('#login-email').val();
                });
                instance.$Container.delegate('#login-password', 'focus', function (e) {
                    setErrorMessage('');
                    instance.accountLogin.$pwInputWrapper.removeClass('form-field--error');
                });

                // 切换手机登录
                instance.$Container.delegate('#J-mobile-link', 'click', function (e) {
                    e.preventDefault();
                    instance.toggleForm();
                });

                // 普通登录方式formchecker验证通过
                // formchecker只是判定不为空
                instance.$NormalForm.on('submitSuccess', function () {
                    if (!utility.checkPhone(instance.accountLogin.$emailInput.val(), instance.accountLogin.$countrycodeInput.val())) {
                        setErrorMessage('请输入正确的手机号');
                        instance.accountLogin.$phoneInputWrapper.addClass('form-field--error');
                        return;
                    }
                    var $SubmitBtn = $(this).find('[name=commit]');
                    utility.toggleButtonDisabled($SubmitBtn, true);
                    $SubmitBtn.val('登录中...');
                    instance.handleSubmitSuccess(instance.$NormalForm);
                });
            };

            // 手机登陆事件监听
            UnitLogin.prototype.bindMobileEvents = function () {
                var instance = this;

                var fields = {
                    mobile: {
                        node: '#login-mobile',
                        tip: {
                            error: '手机号'
                        },
                        checkFn: function (value) {
                            return ($.trim(value) === '');
                        }
                    },
                    vcode: {
                        node: '#login-verify-code',
                        tip: {
                            error: '动态码'
                        },
                        checkFn: function (value) {
                            return ($.trim(value) === '');
                        }
                    }
                };

                // 表单检验
                instance.mobileChecker = new Formchecker('#J-mobile-form', {
                    listen: {
                        focus: false,
                        blur: false,
                        keyup: false,
                        submit: true
                    },
                    fields: fields,
                    setTip: instance.setTip
                });

                // 切换登录方式
                instance.$Container.delegate('#J-normal-link', 'click', function (e) {
                    e.preventDefault();
                    instance.toggleForm();
                });

                instance.$Container.delegate('#login-mobile', 'focus', function (e) {
                    instance.oldLoginName = instance.$Container.find('#login-mobile').val();
                });

                instance.$Container.delegate('#login-mobile', 'blur', function (e) {
                    instance.newLoginName = instance.$Container.find('#login-mobile').val();
                    if (instance.oldLoginName !== instance.newLoginName) {
                        setErrorMessage('');
                    }
                });

                instance.bindSendSmsEvents();
                instance.bindLockMobileEvents();

                // formChecker检验通过
                instance.$MobileForm.on('submitSuccess', function () {
                    var $SubmitBtn = $(this).find('[name=commit]');
                    var $Tip = $('#J-verify-tip');

                    // 未发送短信验证码，则提示重新发送短信验证
                    if (!instance.mobileConfig.isVerifySuccess) {
                        if (!$Tip.hasClass(UnitLogin.ERROR_TIP_CLASS)) {
                            $Tip.html('请获取动态码').addClass(UnitLogin.ERROR_TIP_CLASS);
                        }
                        return;
                    }
                    utility.toggleButtonDisabled($SubmitBtn, true);
                    $SubmitBtn.val('登录中...');
                    instance.handleSubmitSuccess(instance.$MobileForm);
                });
            };

            // 锁定手机
            UnitLogin.prototype.bindLockMobileEvents = function () {
                var instance = this;
                var $MobileForm = instance.$MobileForm;
                var lockedMobile;
                var $SendBtn = $('#J-verify-btn');

                // 手机号被锁，输入新手机号时重置状态
                $MobileForm.delegate('#login-mobile', 'keyup', function () {
                    var mobileNum = $.trim($(this).val());

                    lockedMobile = instance.mobileConfig.lockedMobile;

                    /**
                     * 满足以下条件才重置发送短信按钮状态
                     * 1. 之前的手机号被锁定
                     * 2. 用户重新输入11位新的非锁定手机号
                     */
                    if (lockedMobile !== '' && mobileNum.length === 11 && lockedMobile !== mobileNum) {

                        utility.toggleButtonDisabled($SendBtn, false);
                        $SendBtn.val('重新获取');

                        instance.mobileConfig.lockedMobile = '';
                        setErrorMessage('');
                    }
                });
            };

            // 发送手机短信功能
            UnitLogin.prototype.bindSendSmsEvents = function () {
                var instance = this;
                var asyncCode;
                var mobileField = instance.mobileChecker.fields.mobile;
                var $MobileForm = instance.$MobileForm;
                var sendSmsSelector = '#J-verify-btn';
                var $SendBtn = $(sendSmsSelector);

                $MobileForm.delegate(sendSmsSelector, 'click', function () {
                    console.log('click sendmsg')
                    var countryCode = instance.accountLogin.$countrycodeInput.val();
                    var value = $(mobileField.node).val();
                    if (!utility.checkPhone(value, countryCode)) {
                        setErrorMessage('手机号输入不正确，请重新输入');
                        return;
                    }
                    // 检测手机号码
                    if (instance.mobileChecker.checkField(mobileField) === Formchecker.STATUS_OK) {
                        sendRequest($.trim($(mobileField.node).val()), instance.mobileLogin.$countrycodeInput.val());
                    }
                });

                // 发送短信验证码的内联函数
                function sendRequest(num, countryCode) {
                    if (asyncCode && asyncCode.readyState !== 4) return;
                    var api = '//passport.meituan.com/api/v3/account/mobileloginapply';
                    if (window.mtUnitLoginEnv === 'test') {
                        api = '//passport-wpt-test.sankuai.com/api/v3/account/mobileloginapply'
                    } else if (window.mtUnitLoginEnv === 'staging') {
                        api = '//passport-wpt-st.sankuai.com/api/v3/account/mobileloginapply'
                    }
                    var data = {
                        mobile: num,
                        verifyLevel: 2, // 值为1表示验证码长度为4位，值为2表示验证码长度为6位
                        countryCode: countryCode,
                        h5Fingerprint: utility.getH5fingerprint(api)
                    };

                    var sec = instance.$MobileForm.find('[name="sec"]').val();
                    if (sec) {
                        data.sec = sec;
                    }
                    var uuid = instance.$MobileForm.find('.form-uuid').text();
                    var risk_partner = instance.$MobileForm.find('.risk_partner').text();
                    var risk_smsTemplateId = instance.$MobileForm.find('.risk_smsTemplateId').text();
                    var risk_smsPrefixId = instance.$MobileForm.find('.risk_smsPrefixId').text();
                    var apiQuery = {
                        uuid: uuid,
                        partner: 'nodejs', // 兼容老逻辑
                        sdkType: 'pc',
                        risk_platform: 1,
                        risk_partner: risk_partner,
                        risk_app: -1,
                        risk_smsTemplateId: risk_smsTemplateId,
                        risk_smsPrefixId: risk_smsPrefixId
                    }

                    asyncCode = $.ajax({
                        url: api + '?' + $.param(apiQuery),
                        type: 'POST',
                        data: data,
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function () {
                            // 只是为了覆盖全局的beforeSend，不需要设置X-CSRF-Token的header
                        }
                    }).done(function (res) {
                        if (typeof res !== "object") {
                            res = $.parseJSON(res);
                        }
                        var error = res.error;
                        if (error.code === 101190) { // 风控验证
                            var requestCode = res.error.data.requestCode;
                            yodaApi.getPageData(requestCode, function (res2) {
                                if (res2 && res2.status === 1) {
                                    instance.mobileLogin.extInfoParam = {
                                        id: res2.data.riskLevel,
                                        request_code: requestCode,
                                        fingerprint: '',
                                        mobile: num
                                    }
                                    instance.mobileLogin.action = res2.data.action;
                                    instance.requestExtInfo(instance.mobileLogin.action, instance.mobileLogin.extInfoParam);
                                } else {
                                    Owl.addError({
                                        name: 'yodaVerify',
                                        msg: res2.error.message
                                    })
                                    setErrorMessage(res2.error.message);
                                }
                            });
                        } else {
                            handleVerifyFailure({
                                msg: error.message
                            }, num);
                        }
                        // if (res.status === 1 || (res.data && res.data.success === 1)) {
                        //     handleVerifySuccess();
                        // } else if (res.data && res.data.success === 0) {
                        //     handleVerifySuccess();
                        // } else {
                        //     handleVerifyFailure(res, num);
                        // }
                    }).fail(function (jqXHR, textStatus, error) {
                        var msgObj = {
                            msg: '网络故障，请稍后重试',
                            content: 'textStatus:' + textStatus + '|error:' + error
                        }
                        Owl.addError({
                            name: 'sendRequestFailCb', //对应错误的子分类
                            msg: JSON.stringify(msgObj)
                        });
                        handleVerifyFailure({
                            msg: '网络故障，请稍后重试'
                        }, num);
                    });
                }

                // 处理正确信息
                function handleVerifySuccess() {
                    var count = 60;
                    var $Tip = $('#J-verify-tip');
                    var $CodeInput = instance.$MobileForm.find('#login-verify-code');

                    // 清除错误提醒
                    setErrorMessage('');
                    utility.toggleButtonDisabled($SendBtn, true);

                    // 验证码发送成功
                    instance.mobileConfig.isVerifySuccess = true;

                    // 重置动态码输入框
                    utility.toggleButtonDisabled($CodeInput, false);

                    // 发送提示
                    if (!$Tip) {
                        $('.form-field--info').append('<span class="verify-tip" id="J-verify-tip" style="zoom: 1;"></span>');
                        $Tip = $('#J-verify-tip');
                    }
                    $Tip.html('已发送，1分钟后可重新获取').removeClass(UnitLogin.ERROR_TIP_CLASS);

                    // 倒计时
                    (function countDown() {
                        var timer;
                        if (count >= 2) {
                            count--;
                            $SendBtn.val('重新获取(' + count + ')');
                            timer = setTimeout(countDown, 1000);
                        } else {
                            $SendBtn.val('重新获取');
                            $Tip.html('');
                            clearTimeout(timer);
                            utility.toggleButtonDisabled($SendBtn, false);
                        }
                    })();
                }

                // 处理错误信息
                function handleVerifyFailure(res, num) {
                    var msg = res.msg;

                    msg = msg || (res.error && res.error.message);
                    setErrorMessage(msg);
                    $SendBtn.val('重新获取');

                    // 发送验证码失败
                    instance.mobileConfig.isVerifySuccess = false;

                    // Node.js API
                    if (res.error) {
                        switch (res.error.code) {
                            // 申请动态码次数过多，限制登录
                            case 101000:
                                instance.mobileConfig.lockedMobile = num;
                                utility.toggleButtonDisabled($SendBtn, true);
                                break;
                                // 要求添加图片验证码
                            case 101091: // XXX: not sure
                                $SendBtn.val('免费获取手机动态码');
                                setErrorMessage('获取动态码前，请先输入验证码');
                                break;
                            case 121048: // XXX: not sure
                                $SendBtn.val('免费获取手机动态码');
                                setErrorMessage('获取动态码前，请先输入验证码');
                                break;
                            case 101092: //验证码错误
                                instance.mobileConfig.needCaptcha = true;
                                instance.toggleMobileCaptcha(true);
                                Owl.addError({
                                    name: 'captchaError', //对应错误的子分类
                                    msg: res.message //对应错误的日志内容
                                });
                                break;
                            default:
                                break;
                        }
                    }
                }
            };

            UnitLogin.prototype.handleSendSmsCodeSucc = function () {
                var instance = this;
                var count = 60;
                var $Tip = $('#J-verify-tip');
                var $SendBtn = $('#J-verify-btn');
                var $CodeInput = instance.$MobileForm.find('#login-verify-code');

                // 清除错误提醒
                setErrorMessage('');
                utility.toggleButtonDisabled($SendBtn, true);

                // 验证码发送成功
                instance.mobileConfig.isVerifySuccess = true;

                // 重置动态码输入框
                utility.toggleButtonDisabled($CodeInput, false);

                // 发送提示
                if (!$Tip) {
                    $('.form-field--info').append('<span class="verify-tip" id="J-verify-tip" style="zoom: 1;"></span>');
                    $Tip = $('#J-verify-tip');
                }
                $Tip.html('已发送，1分钟后可重新获取').removeClass(UnitLogin.ERROR_TIP_CLASS);

                // 倒计时
                (function countDown() {
                    var timer;
                    if (count >= 2) {
                        count--;
                        $SendBtn.val('重新获取(' + count + ')');
                        timer = setTimeout(countDown, 1000);
                    } else {
                        $SendBtn.val('重新获取');
                        $Tip.html('');
                        clearTimeout(timer);
                        utility.toggleButtonDisabled($SendBtn, false);
                    }
                })();
            }

            UnitLogin.prototype.requestExtInfo = function (action, extInfoParam) {
                var instance = this;
                yodaApi.getExtInfo(action, extInfoParam, function (res) {
                    if (res && res.status === 1) { // 风控放行 
                        instance.handleSendSmsCodeSucc();
                    } else {
                        var error = res.error;
                        if (!error.request_code) {
                            setErrorMessage(error.message);
                            return;
                        }
                        instance.yodaVerify(error.request_code);
                    }
                })
            }

            UnitLogin.prototype.toggleForm = function () {
                if (this.formType === 'normal') { // 当前表单为普通登录
                    this.formType = 'mobile';
                } else {
                    this.formType = 'normal';
                }
                this.$NormalForm.toggle();
                this.$MobileForm.toggle();
                this.$Container.find('.J-treaty-block').toggle();
                setErrorMessage('');
            };

            UnitLogin.prototype.setTip = function (field) {
                var msg = '请输入';
                var checker = this;
                var errArr = [];

                // 只有当所有字段都校验了才显示提示信息
                if (!field.last) return;

                // 登录模块的错误提示需要将所有的错误放在一起显示
                $each(checker.fields, function (field) {
                    if (field.status === Formchecker.STATUS_ERROR) {
                        errArr.push(field.tip.error);
                    }
                });

                if (errArr.length === 0) return;

                msg = msg + errArr.join('和');
                setErrorMessage(msg);
            };

            /**
             * 处理提交成功
             * @param $Form jQueryObject 需要处理的form表单节点
             */
            UnitLogin.prototype.handleSubmitSuccess = function ($Form) {
                var instance = this;

                // 清空错误提示信息
                setErrorMessage('');
                // 统计多少人通过了前端校验并点击登录按钮——>发送xhr的次数
                var url = $Form.attr('action');
                url = instance.formType === 'normal' ? url.indexOf('continue') > -1 ? normalizeUrl(url, 'continue') : url : url;
                var data = $Form.serialize();
                var dataJson = utility.urlParamsToObj(data);
                dataJson.h5Fingerprint = utility.getH5fingerprint(window.location.origin + url);
                if (instance.formType === 'normal') {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(this.publicKey);
                    dataJson.password = encrypt.encrypt(dataJson.password);
                    loginRequest(url, dataJson);
                } else if (instance.formType === 'mobile') {
                    instance.mobileLogin.extInfoParam.smscode = instance.mobileLogin.$codeInput.val();
                    yodaApi.getVerifyInfo(instance.mobileLogin.action, instance.mobileLogin.extInfoParam, function (info) {
                        if (info.status === 0) {
                            loginFail(info.error);
                            return;
                        }
                        var v3loginQuery = {
                            partner: 'nodejs',
                            sdkType: 'pc'
                        }
                        url = url + '&' + $.param(v3loginQuery);
                        dataJson.requestCode = instance.mobileLogin.extInfoParam.request_code;
                        dataJson.responseCode = info.data.response_code;
                        beforeSend = function () {};
                        loginRequest(url, dataJson, beforeSend);
                    })
                }

                function loginRequest(url, dataJson, beforeSend) {
                    var ajaxParam = {
                        url: url,
                        type: 'POST',
                        data: dataJson,
                        xhrFields: {
                            withCredentials: true
                        }
                    }
                    if (beforeSend) {
                        ajaxParam.beforeSend = beforeSend;
                    }
                    $.ajax(ajaxParam).done(function (res) {
                        var config;
                        if (typeof res !== "object") {
                            res = $.parseJSON(res);
                        }
                        if (res.status) {
                            config = res.data;
                            config.isDialog = instance.isDialog;
                            config.service = instance.service;
                            // not showing the failure message
                            instance.createAutoLoginForm(config);
                            return;
                        } else {
                            // Node.js API
                            // TODO: liujingwei02, Maybe move this to a separate file

                            var loginAPIError = res.error;
                            if (loginAPIError) {
                                if (loginAPIError.message) {
                                    loginFail(loginAPIError);
                                }

                                if (loginAPIError.code === 101157) {
                                    cookieUtil.set('userTicket', loginAPIError.data.userTicket);
                                    var href = loginAPIError.data.jumpUrl + '?' + loginAPIError.data.param + '&succCallbackUrl=' + encodeURIComponent(window.location.origin + '/account/secondverify');
                                    if (location.search.search('isdialog=1') >= 0) {
                                        if (cookieUtil.get('userTicket')) {
                                            window.parent.location.href = href;
                                        } else {
                                            // 当无法设置cookie时。
                                            Owl.addError({
                                                name: 'canNotSetCookie', //对应错误的子分类
                                                msg: loginAPIError.message //对应错误的日志内容
                                            });
                                            window.parent.location.href = "/account/transition" + location.search + "&ticket=" + loginAPIError.data.userTicket + "&verifyurl=" + encodeURIComponent(href)
                                        }
                                    } else {
                                        window.location.href = href;
                                    }
                                } else if (loginAPIError.code === 101190) { // yoda验证(如滑块、九宫格等)
                                    instance.yodaVerify(loginAPIError.data.requestCode);
                                } else if (loginAPIError.code === 101155) {
                                    // 账号密码登录未绑定手机号----->继续走绑手机号登录
                                    // 理论上不会走到此分支，若走动此分支则直接上报错误
                                    // todo Owl
                                    Owl.addError({
                                        name: 'loginAPIError', //对应错误的子分类
                                        msg: loginAPIError.message //对应错误的日志内容
                                    });
                                }
                            } else {
                                // 手机号验证码登录升级之后，data格式与node转发的接口不一致，在这抹平
                                // https://km.sankuai.com/page/28173643
                                if (instance.formType === 'mobile') {
                                    config = res.user;
                                    config.isDialog = instance.isDialog;
                                    config.service = instance.service;
                                    config.continue = instance.continue;
                                    instance.createAutoLoginForm(config);
                                    return;
                                }
                                // Node.js Login success
                                if (res.data) {
                                    config = res.data;
                                    config.isDialog = instance.isDialog;
                                    config.service = instance.service;
                                    instance.createAutoLoginForm(config);
                                    // not showing the failure message
                                    return;
                                }
                            }
                        }
                    }).fail(function (jqXHR, textStatus, error) {
                        var msgObj = {
                            type: instance.formType,
                            msg: '网络故障，请稍后重试',
                            content: 'textStatus:' + textStatus + '|error:' + error
                        }
                        Owl.addError({
                            name: 'loginFailCb', //对应错误的子分类
                            msg: JSON.stringify(msgObj)
                        });
                        loginFail({
                            msg: '网络故障，请稍后重试'
                        });
                    });
                }
                // login failure
                function loginFail(res) {
                    var $SubmitBtn = $Form.find('[name=commit]'),
                        $VerifyInput;

                    utility.toggleButtonDisabled($SubmitBtn, false);
                    // msg for php message for nodejs
                    if (res.code) {
                        // 后端接口返回的错误信息，如果账号密码错误、验证码输入错误等等
                        // 做一个数量上监控，正常用户会触发这些错误，但是如果量级过高要么就是有问题，要么就是被攻击
                        Owl.addError({
                            name: res.code + '', //对应错误的子分类
                            msg: res.message //对应错误的日志内容
                        });
                    }
                    setErrorMessage(res.msg || res.message);
                    $SubmitBtn.val('登录');

                    if (instance.$MobileForm && instance.$MobileForm === $Form) {
                        $VerifyInput = $Form.find('#login-verify-code');
                        if (res.errType === 1) {
                            // 表单提交次数过多，要求重新发送动态码
                            utility.toggleButtonDisabled($VerifyInput, false);
                            // for Node.js API
                        } else if (res.type === 101089 || res.type === 101090) {
                            utility.toggleButtonDisabled($VerifyInput, false);
                        }
                    }
                }

            };

            /**
             * 创建一个自动提交的表单
             * @param config {Object} 表单需要提交的信息
             */
            UnitLogin.prototype.createAutoLoginForm = function (config) {
                var instance = this;
                var loginType = this.formType === 'normal' ? 'normal' : 'dynamic';
                var formStr =
                    '<form method="POST" class="J-form" style="display:none">' +
                    '    <input class="J-token" name="token" value="' + config['token'] + '" />' +
                    '    <input class="J-expire" name="expire" value="' + config['expire'] + '"/>' +
                    '    <input class="J-isdialog" name="isdialog" value="' + config['isDialog'] + '" />' +
                    '    <input class="J-autologin" name="autologin" value="' + config['autologin'] + '" />' +
                    '    <input name="logintype" value="' + loginType + '" />' +
                    '</form>';

                instance.$Container.append(formStr);
                setTimeout(function () {
                    var tempForm = instance.$Container.find('.J-form');
                    tempForm.attr("action", config.continue);
                    tempForm.submit();
                }, 0);
            };

            /**
             * 切换提示信息的现实与隐藏
             * @param {string} message Could be undefined when state is false
             * @param {object} options 
             *      @param {boolean} options.showBtn         是否展示按钮
             *      @param {function} options.onClickOk      点击确定触发的事件
             *      @param {function} options.onClickCancel  点击取消触发的事件
             */
            function setErrorMessage(message, options) {
                if (options && options.showBtn) {
                    $('.login-section').find('.validate-info')
                        .html('<i class="tip-status tip-status--opinfo"></i>' + message +
                            '<div class="tip-btn-wrapper"><span id="tip-ok-btn" class="tip-btn">确定</span>' +
                            '<span id="tip-cancel-btn" class="tip-btn">取消</span></div>'
                        )
                        .css('visibility', message ? 'visible' : 'hidden');
                    $('.login-section').one('click', '#tip-ok-btn', function (e) {
                        options.onClickOk();
                    });
                    $('.login-section').one('click', '#tip-cancel-btn', function (e) {
                        options.onClickCancel();
                    });
                } else {
                    $('.login-section').find('.validate-info')
                        .html('<i class="tip-status tip-status--opinfo"></i>' + message)
                        .css('visibility', message ? 'visible' : 'hidden');
                }
            }

            var unitlogin;

            function initUnitLogin() {
                if (!unitlogin) {
                    unitlogin = new UnitLogin();
                }
                return unitlogin;
            }

            var cookieUtil = (function () {
                var _cookie = "cookie",
                    _exp = "; expires=",
                    _domain = "; domain=",
                    doc = document;

                return {
                    get: function (a, b) {
                        b = doc[_cookie].match("(?:;|^)\\s*" + a + "\\s*=\\s*([^;]+)\\s*(?:;|$)");
                        return b && b[1]
                    },
                    set: function (a, b, c, d) {
                        if (location.host.indexOf('meituan.com') != -1 && !d) {
                            d = 'meituan.com'
                        }
                        b = doc[_cookie] = a + "=" + b + (c ? _exp + (new Date(new Date().getTime() + c * 1000)).toGMTString() : "") + (d ? _domain + d : '') + '; path=/';
                    }
                }
            })();

            function insIMG(name, url) {
                var img = document.createElement('img');
                var cfg = {
                    host: name,
                    app: global.agent,
                    osi: global.isAndroid ? "android" : global.isIos ? "ios" : "other"
                }
                img.onload = function (e) {
                    mta('count', 'mtcdn.succ', 1, cfg);
                }

                img.onerror = function (e) {
                    cfg.code = e.code;
                    mta('count', 'mtcdn.err', 1, cfg);
                }

                img.onabort = function () {
                    mta('count', 'mtcdn.abort', 1, cfg);
                }

                img.src = 'ht' + 'tps://' + url;
            }

            function httpsTest() {
                if (cookieUtil.get('mtcdn') != 'K') {
                    insIMG('p0s', 'p0.meituan.net/0.0.o/codeman/6240129933d381268bf5d3c097ff0ac341774.jpg?');
                    insIMG('p1s', 'p1.meituan.net/0.0.o/codeman/6240129933d381268bf5d3c097ff0ac341774.jpg');
                    // insIMG('tcs', 'ping.qcloudcdn.com/xf/weimei1020.jpg');
                    // insIMG('bds', 'img6.bdstatic.com/img/image/smallpic/weimei1020.jpg');
                    // insIMG('xs01', 'xs01.meituan.net/cdn/weimei1020.jpg');

                    cookieUtil.set('mtcdn', 'K', 3600 * 24 * 7);
                }
            }

            initUnitLogin();
            httpsTest();

            UnitLogin.prototype.yodaVerify = function (requestCode) {
                var instance = this;
                var options = {
                    requestCode: requestCode, //授权码
                    succCallbackFun: "yodaVerifySuccCb", //成功回调函数
                    failCallbackFun: "yodaVerifyFailCb", //失败回调函数
                    root: "yodaVerifyRoot", //挂载业务方页面节点id
                    theme: "meituan",
                    mounted: function () {
                        $('#mtdp-login-bg').show();
                    }
                }
                window.yodaVerifySuccCb = function (data) {
                    if (instance.formType === 'normal') {
                        instance.$NormalForm.find('input[name="requestCode"]').val(data.requestCode);
                        instance.$NormalForm.find('input[name="responseCode"]').val(data.responseCode);
                        instance.$NormalForm.submit();
                    } else {
                        instance.requestExtInfo(instance.mobileLogin.action, instance.mobileLogin.extInfoParam);
                    }
                    resetYodaCode();
                };
                window.yodaVerifyFailCb = function (data) {
                    $('#mtdp-login-bg').hide();
                    setErrorMessage('验证失败请重试');
                    resetYodaCode();
                };
                if (window.YodaSeed) {
                    if (window.mtUnitLoginEnv === 'test') { // 测试环境
                        YodaSeed(options, 'test');
                    } else if (window.mtUnitLoginEnv === 'staging') { // st环境
                        YodaSeed(options, 'staging');
                    } else { // 线上
                        YodaSeed(options);
                    }
                }

            }

            function resetYodaCode() {
                unitlogin.$NormalForm.find('input[name="requestCode"]').val('');
                unitlogin.$NormalForm.find('input[name="responseCode"]').val('');
                $('#mtdp-login-bg').hide();
                $('#yodaVerifyRoot').html('');
            }

            $('#mtdp-login-bg').on('click', function (e) {
                $(this).hide();
                $('#yodaVerifyRoot').html('');
            });

            // 移动端协议更换为i版
            if (utility.isMobile()) {
                $('#meituanTos').attr('href', 'https://i.meituan.com/about/terms');
                $('#yodaVerifyRoot').addClass('mobile-yoda-verify');
            }

            // 第三方登录更新
            $('#J-third-tencent').on('click', function () {
                var href = window.location.origin + $(this).attr('data-href');
                var JthirdToken = utility.getH5fingerprint(href);
                localStorage.setItem('JthirdToken', JthirdToken);
                localStorage.setItem('JthirdReloginUrl', window.location.href);
                localStorage.setItem('JthirdRiskpartner', $('#thirdLoginRiskpartner').attr('data-riskpartner'));
                window.location.href = href;
            });

            $('#J-third-sina').on('click', function () {
                var href = window.location.origin + $(this).attr('data-href');
                var JthirdToken = utility.getH5fingerprint(href);
                localStorage.setItem('JthirdToken', JthirdToken);
                localStorage.setItem('JthirdReloginUrl', window.location.href);
                localStorage.setItem('JthirdRiskpartner', $('#thirdLoginRiskpartner').attr('data-riskpartner'));
                window.location.href = href;
            });

            module.exports = initUnitLogin;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "@sso/scripts/changeSettokenToHttps": 49,
        "@sso/scripts/formchecker": 54,
        "@sso/scripts/util": 56,
        "@sso/scripts/yodaapi": 57,
        "@sso/scripts/zoom": 58,
        "jsencrypt": 2,
        "lodash.foreach": 21
    }],
    58: [function (require, module, exports) {
        var Cookie = require('js-cookie');
        var config = require('./config');
        var browser = require('./browser');
        var ua = require('ua-parser-js');

        /**
         * 初始化
         */
        function DetectZoom() {
            // 当用户已经点击不再提示
            if (Cookie.get(DetectZoom.COOKIE_NAME)) return;
            // 当页面被包裹在iframe中时outerWidth是整个窗体的宽度，而innerWidth是iframe的宽度
            // http://careers.stackoverflow.com/ ie8 bugfixed;
            if (window != window.top) return;

            var isZoom = this._detect();
            if (!isZoom) return;

            this._showMsg();
            this._bindEvent();
        }

        DetectZoom.COOKIE_NAME = 'ignore-zoom';
        DetectZoom.OS = ua().os.name;

        /**
         * 检测缩放函数
         * @private
         * @method detect
         * @return isZoom {Boolean}
         */
        DetectZoom.prototype._detect = function () {
            var ratio = 1,
                isZoom = false,
                zoomLevels = [0.9, 1.1]; // 浏览器缩放都是按照指定尺度，1.1、1.25...5，只要精确到小数点后一位且在1级缩放区间内，就不算缩放。

            // 对非主流浏览器不进行判断
            if (browser.ie && (browser.version < 8 && browser.version > 0) ||
                browser.chrome && (browser.version < 21 && browser.version > 0) ||
                browser.version === 0) return isZoom;

            if (typeof screen.deviceXDPI === "number" && typeof screen.logicalXDPI === "number") {
                ratio = (screen.deviceXDPI / screen.logicalXDPI).toFixed(1);
            } else if (typeof window.outerWidth === "number" && typeof window.innerWidth === "number") {
                ratio = (window.outerWidth / window.innerWidth).toFixed(1);
            }

            // 防止load之后而渲染未完成而拿不到视窗大小
            if (ratio === "0.0") {
                return false;
            } else {
                isZoom = (ratio >= zoomLevels[1] || ratio <= zoomLevels[0]);
                return isZoom;
            }
        };

        /**
         * 显示缩放信息
         * @method showMsg
         */
        DetectZoom.prototype._showMsg = function () {
            var ctrlLabel,
                msgTpl;

            ctrlLabel = DetectZoom.OS === 'Windows' ? ' Ctrl ' : ' ⌘ ';
            msgTpl = '<div class="zoom-detect-msg">' +
                '    <span class="content">您所访问的网页内容被缩放可能影响正常使用，可以使用键盘快捷键' + ctrlLabel + '+ 0 恢复正常</span>' +
                '    <a class="J-ignore ignore" href="javascript:void(0)">不再提醒</a>' +
                '</div>';

            if (!$('.zoom-detect-msg').length) {
                $('body').prepend(msgTpl);
            }
            $('.zoom-detect-msg').show();
        };

        /**
         * 监听事件
         * @private
         * @method bindEvent
         */
        DetectZoom.prototype._bindEvent = function () {
            var ndContainer = $('.zoom-detect-msg'),
                commandKey = DetectZoom.OS === 'Windows' ? 'ctrlKey' : 'metaKey',
                KEY_ZERO = 48,
                KEY_ADD = 187,
                KEY_MINUS = 189,
                self = this;

            // 不再提醒
            ndContainer.delegate('.J-ignore', 'click', function () {
                ndContainer.hide();
                Cookie.set(DetectZoom.COOKIE_NAME, true, {
                    expire: 15,
                    path: '/',
                    // TODO
                    //domain: '.' + config.DOMAIN_HOST
                });
            });

            // 还原缩放
            $('body').on('keydown', function (e) {
                if (e[commandKey]) {
                    if (e.keyCode === KEY_ZERO) {
                        ndContainer.hide();
                    }
                    if ((e.keyCode === KEY_ADD || e.keyCode === KEY_MINUS) && !Cookie.get(DetectZoom.COOKIE_NAME)) {
                        self._showMsg();
                    }
                }
            });
        };

        var detector;
        module.exports = function initDetectZoom() {
            if (!detector) {
                detector = new DetectZoom();
            }
            return detector;
        };

    }, {
        "./browser": 46,
        "./config": 51,
        "js-cookie": 1,
        "ua-parser-js": 31
    }],
    51: [function (require, module, exports) {
        module.exports = $(document.body).data('config');

    }, {}],
    46: [function (require, module, exports) {
        var browser = module.exports = {};

        // Browser and version extraction copy from jQuery
        function uaMatch(ua) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }

        // Don't clobber any existing jQuery.browser in case it's different
        var matched = uaMatch(navigator.userAgent);

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = parseInt(matched.version);
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

    }, {}],
    57: [function (require, module, exports) {

        var yodaBaseUrl = '//verify.meituan.com';
        if (window.mtUnitLoginEnv === 'test') {
            yodaBaseUrl = '//verify.inf.test.sankuai.com';
        } else if (window.mtUnitLoginEnv === 'staging') {
            yodaBaseUrl = '//verify-test.meituan.com';
        }

        function getPageData(requestCode, cb) {
            $.ajax({
                url: yodaBaseUrl + '/v2/ext_api/page_data' + '?requestCode=' + requestCode,
                type: 'POST',
                data: {
                    requestCode: requestCode
                },
                beforeSend: function () {}
            }).done(function (res) {
                if (typeof res !== "object") {
                    res = $.parseJSON(res);
                }
                typeof cb === 'function' && cb(res);
            }).fail(function (e) {
                typeof cb === 'function' && cb({
                    error: {
                        code: 500,
                        message: '网络故障，请稍后重试',
                    }
                })
            });
        }

        function getExtInfo(action, params, cb) {
            var url = yodaBaseUrl + '/v2/ext_api/' + action + '/info';
            params._token = (Rohr_Opt && Rohr_Opt.reload) ? Rohr_Opt.reload(url) : '';
            $.ajax({
                url: url,
                type: 'POST',
                data: params,
                beforeSend: function () {}
            }).done(function (res) {
                if (typeof res !== "object") {
                    res = $.parseJSON(res);
                }
                typeof cb === 'function' && cb(res);
            }).fail(function () {
                typeof cb === 'function' && cb({
                    error: {
                        code: 500,
                        message: '网络故障，请稍后重试',
                    }
                })
            });
        }

        function getVerifyInfo(action, params, cb) {
            var url = yodaBaseUrl + '/v2/ext_api/' + action + '/verify';
            params._token = (Rohr_Opt && Rohr_Opt.reload) ? Rohr_Opt.reload(url) : '';
            $.ajax({
                url: url,
                type: 'POST',
                data: params,
                beforeSend: function () {}
            }).done(function (res) {
                if (typeof res !== "object") {
                    res = $.parseJSON(res);
                }
                typeof cb === 'function' && cb(res);
            }).fail(function () {
                typeof cb === 'function' && cb({
                    status: 0,
                    error: {
                        code: 500,
                        message: '网络故障，请稍后重试',
                    }
                })
            });
        }


        module.exports = {
            getPageData: getPageData,
            getExtInfo: getExtInfo,
            getVerifyInfo: getVerifyInfo
        }
    }, {}],
    49: [function (require, module, exports) {
        /**
         * 将传入的www.meituan.com域名下的settoken链接一律转化为https协议
         * 如果后面continue链接里面也是www.meituan.com域名下的话，也一并转化为https
         *  */

        function changeSettokenToHttps(url) {
            var arr = url && url.split('?')
            return arr.map(function (item) {
                if (item === decodeURIComponent(item)) {
                    if (item.indexOf('http://www.meituan.com') > -1) {
                        item = item.replace(/http:\/\//i, 'https://')
                    }
                } else {
                    if (decodeURIComponent(item).indexOf('http://www.meituan.com') > -1) {
                        item = encodeURIComponent(decodeURIComponent(item).replace(/http:\/\//i, 'https://'))
                    }
                }
                return item
            }).join('?')
        }

        function normalizeUrl(url, param) {
            var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
            if (url === decodeURIComponent(url)) {
                url = url.replace(url.match(reg)[2], changeSettokenToHttps(url.match(reg)[2]));
            } else {
                url = url.replace(url.match(reg)[2], encodeURIComponent(changeSettokenToHttps(decodeURIComponent(url.match(reg)[2]))))
            }
            return url;
        }

        module.exports = {
            changeSettokenToHttps: changeSettokenToHttps,
            normalizeUrl: normalizeUrl
        }
    }, {}],
    54: [function (require, module, exports) {
        var defaults = require('lodash.defaults');
        var each = require('lodash.foreach');
        var some = require('lodash.some');
        var debounce = require('lodash.debounce');
        var keys = require('lodash.keys');

        /**
         * 登录输入框的check
         * @param $form 表单节点
         * @param options
         * @param options.listen {Object} 需要检验的事件类型, 可选focus, blur, keyup, submit
         * @param options.fields {Array.<Object>} 检测规则列表
         * @param options.fields.node {String} input节点
         * @param options.fields.checkFn {Function} 检验函数
         * @param options.fields.tip {Object}
         * @param options.fields.tip.info {String} 提示信息
         * @param options.fields.tip.ok {String} 成功提示
         * @param options.fields.tip.error {String} 失败提示
         * @param options.fields.ajax 异步检测接口
         * @param options.handler 默认事件处理函数
         */
        var Formchecker = function ($form, options) {
            this.$form = $($form);
            if (!this.$form[0] || this.$form[0].tagName !== 'FORM' || !options.fields) return null;

            this.fields = options.fields;
            this.listen = defaults(options.listen, Formchecker.EVENTS);
            this.classname = defaults(options.classname || {}, Formchecker.CLASS_NAME);
            this.handler = options.handler || {};

            var index = 0;
            var length = keys(this.fields).length;
            each(this.fields, function (field) {
                // 设置field为初始状态
                field.status = Formchecker.STATUS_INIT;
                field.$node = $(field.node);
                field.$field = field.$node.parents('.' + this.classname.field);
                field.tip = field.tip || {};
                field.last = index === length - 1;
                index = index + 1;
            }, this);

            // 自定义的设置提醒方法
            if (options.setTip) {
                this.setTip = options.setTip;
            }

            this.bindEvents();
        };

        Formchecker.STATUS_INIT = 0;
        Formchecker.STATUS_CHECKING = 1;
        Formchecker.STATUS_OK = 2;
        Formchecker.STATUS_ERROR = 3;

        Formchecker.EVENTS = {
            focus: true,
            blur: true,
            keyup: true,
            submit: true
        };

        Formchecker.CLASS_NAME = {
            field: 'form-field',
            fieldError: 'form-field--error',
            fieldOk: 'form-field--ok',
            tip: 'inline-tip',
            tipError: 'tip-status--error',
            tipOk: 'tip-status--ok'
        };

        Formchecker.prototype.bindEvents = function () {
            var selector = 'input, textarea, select';

            if (this.listen.focus) {
                this.$form.delegate(selector, 'focus', $.proxy(this.handleFocus, this));
            }

            //输入框失焦后对指定的输入框进行check
            if (this.listen.blur) {
                this.$form.delegate(selector, 'blur', $.proxy(this.handleBlur, this));
            }

            if (this.listen.keyup) {
                this.$form.delegate(selector, 'keyup', $.proxy(this.handleKeyup, this));
            }

            if (this.listen.submit) {
                this.$form.on('submit', $.proxy(this.handleSubmit, this));
            }
        };

        // 聚焦时清除错误信息, 给出提示信息
        Formchecker.prototype.handleFocus = function (event) {
            var field = this.getFieldByNode(event.currentTarget);
            if (field) {
                this.resetField(field);
            }
        };

        Formchecker.prototype.handleBlur = function (event) {
            var self = this;
            setTimeout(function () {
                var field = self.getFieldByNode(event.currentTarget);
                if (field) {
                    self.checkField(field);
                }
            }, 200);
        };

        Formchecker.prototype.handleKeyup = function (event) {
            var self = this;
            debounce(function () {
                var field = self.getFieldByNode(event.currentTarget);
                if (field) {
                    self.checkField(field);
                }
            });
        };

        Formchecker.prototype.handleSubmit = function (event) {
            // 控件失去焦点不检测但是表单提交时检测, 需要在表单提交检测前重置所有空间状态
            if (this.listen.submit && !this.listen.blur) {
                each(this.fields, function (field) {
                    this.resetField(field);
                }, this);
            }
            event.preventDefault();
            if (this.checkAllField()) {
                this.$form.trigger('submitSuccess', event);
                if (this.handler.submitSuccess) {
                    this.handler.submitSuccess(event);
                }
            }
        };

        /**
         * 单独检验一个字段
         * @param field {Object} 字段对象
         */
        Formchecker.prototype.checkField = function (field) {
            var self = this;
            var $input = field.$node;
            var value = $input.val();

            if (!$input) return;

            var error = field.checkFn(value);
            self.setField(field, error ? Formchecker.STATUS_ERROR : Formchecker.STATUS_OK);
            self.setTip(field, error);

            if (!error) {
                if (field.ajax) {
                    self.setField(field, Formchecker.STATUS_CHECKING);
                    self.setTip(field, '检查中...');

                    var data = {};
                    data[field.$node.attr('name')] = field.$node.val();
                    $.ajax({
                        url: field.ajax.action,
                        type: 'POST',
                        data: data,
                        success: function (data) {
                            if (!data.error) {
                                self.$form.trigger('success', field);
                            }
                            self.setField(field, data.error ? Formchecker.STATUS_ERROR : Formchecker.STATUS_OK);
                            self.setTip(field, data.error ? data.error.message : null);
                        },
                        error: function (data, textStatus) {
                            if (textStatus === 'abort') return;

                            self.setField(field, Formchecker.STATUS_ERROR);
                            self.setTip(field, '网络有问题，请稍后重试');
                        }
                    });
                } else {
                    self.$form.trigger('success', field);
                }
            }

            return field.status;
        };

        Formchecker.prototype.checkAllField = function () {
            var valid = true;
            each(this.fields, function (field) {
                switch (field.status) {
                    case Formchecker.STATUS_INIT:
                        var status = this.checkField(field);
                        if (status === Formchecker.STATUS_ERROR || status === Formchecker.STATUS_CHECKING) {
                            valid = false;
                        }
                        break;
                    case Formchecker.STATUS_ERROR:
                        valid = false;
                }
            }, this);
            return valid;
        };

        Formchecker.prototype.setField = function (field, status) {
            var $field = field.$field;
            field.status = status;
            switch (field.status) {
                case Formchecker.STATUS_INIT:
                case Formchecker.STATUS_OK:
                    $field.addClass(this.classname.fieldOk).removeClass(this.classname.fieldError);
                    break;
                case Formchecker.STATUS_ERROR:
                    $field.addClass(this.classname.fieldError).removeClass(this.classname.fieldOk);
                    break;
            }
        };

        /**
         * 给每个表单项设置提示信息
         */
        Formchecker.prototype.setTip = function (field, content) {
            var className = 'tip-status';
            var $field = field.$field;

            switch (field.status) {
                case Formchecker.STATUS_ERROR:
                    className = className + ' ' + this.classname.tipError;
                    content = field.tip.error = content || field.tip.error || '';
                    break;
                case Formchecker.STATUS_OK:
                    className = className + ' ' + this.classname.tipOk;
                    content = content || field.tip.ok || '';
                    break;
                case Formchecker.STATUS_INIT:
                    content = content || field.tip.info || '';
                    break;
            }

            if ($field.find('.' + this.classname.tip).length === 0) {
                $field.append('<span class="' + this.classname.tip + '"></span>');
            }

            var $tip = $field.find('.' + this.classname.tip);
            $tip.show();
            if (!(field.status === Formchecker.STATUS_INIT && !content)) {
                content = '<i class="' + className + '"></i>' + content;
            }
            $tip.html(content);
        };

        Formchecker.prototype.resetField = function (field) {
            this.setField(field, Formchecker.STATUS_INIT);
            this.setTip(field);
        };

        Formchecker.prototype.getFieldByNode = function (node) {
            var ret;
            some(this.fields, function (field) {
                if (field.$node.get(0) === node) {
                    ret = field;
                    return true;
                }
            });
            return ret;
        };

        module.exports = Formchecker;

    }, {
        "lodash.debounce": 19,
        "lodash.defaults": 20,
        "lodash.foreach": 21,
        "lodash.keys": 26,
        "lodash.some": 29
    }],
    56: [function (require, module, exports) {
        var isString = require('lodash.isstring');

        var util = module.exports = {};

        /**
         * 计算字符串长度，中文算两字符
         * @method getLength
         * @static
         * @param {String} str 字符串
         * @return {Number} 字符串长度
         */
        util.getLength = function (str) {
            if (!str || !isString(str)) return 0;
            for (var i = 0, count = 0, len = str.length; i < len; i++) {
                count = str.charCodeAt(i) > 255 ? count + 2 : count + 1;
            }
            return count;
        };

        // 倒计时提交表单——验证成功页跳转
        util.autoSubmit = function (time, $form, $tip) {
            $form = $($form);
            $tip = $($tip);

            loop();

            function loop() {
                if (time > 0) {
                    time -= 1;
                    $tip.html(time);
                    setTimeout(loop, 1000);
                } else {
                    $form.submit();
                }
            }
        };
        /**
         * 屏蔽表单按钮
         * @method disableButton
         * @param {Selector|HTMLElement|Node} ndButtonWrapper
         * @param {Boolean} [state=true]
         */
        var DISABLED_CLASS = 'btn-disabled';
        util.toggleButtonDisabled = function ($button, state) {
            $button = $($button);
            $button.prop('disabled', state);
            $button.toggleClass(DISABLED_CLASS, state);
        };

        util.repeatVerifyMail = function (link) {
            var $link = $(link);
            var next = $link.next();
            var email = $link.data('email');
            var DISABLED = 'disabled';
            var COLOR = 'color';
            var RED = 'red';
            var GREEN = 'green';

            $link.on('click', function (event) {
                event.preventDefault();
                if ($link.attr(DISABLED)) return;
                $link.attr(DISABLED, DISABLED);
                next.css(COLOR, GREEN).text('发送中...');
                $.ajax({
                    url: '/account/resendSignupMail',
                    type: 'POST',
                    data: {
                        email: email
                    },
                    success: function (res) {
                        if (res.error) {
                            // TODO(zhongchiyu): 后端需要检测用户是否发送验证邮件次数过多并返回相应错误提示
                            //$link.hide();
                            //$link.prev().hide();
                            //next.css(COLOR, RED).text('您发送次数过多，请到邮箱查阅。');
                            next.css(COLOR, RED).text('邮件发送失败，请稍后重试。');
                            $link.removeAttr(DISABLED);
                        } else {
                            next.text('发送成功。');
                            $link.removeAttr(DISABLED);
                        }
                    },
                    error: function () {
                        next.css(COLOR, RED).text('网络繁忙请稍后重试！');
                        $link.removeAttr(DISABLED);
                    }
                });
            });
        };

        util.checkPhone = function (phoneNumber, countrycode) {
            if (!countrycode) countrycode = '86';
            if (countrycode === '86') {
                return /^1[0-9]\d{9}$/.test(phoneNumber);
            }
            return /^\d+$/.test(phoneNumber);
        }

        util.isMobile = function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        util.urlParamsToObj = function (queryStr) {
            var match;
            var pl = /\+/g; // Regex for replacing addition symbol with a space
            var search = /([^&=]+)=?([^&]*)/g;
            var decode = function (s) {
                return decodeURIComponent(s.replace(pl, ' '));
            }
            var urlParams = {};
            while (match = search.exec(queryStr)) {
                urlParams[decode(match[1])] = decode(match[2]);
            }
            return urlParams;
        }

        util.getH5fingerprint = function (url) {
            url = url || '';
            try {
                return Rohr_Opt.reload(url) || rohr.reload(url);
            } catch (error) {
                console.error('getFingerprintFail');
                return '';
            }
        }

        var cookieUtil = (function () {
            var _cookie = "cookie",
                _exp = "; expires=",
                _domain = "; domain=",
                doc = document;

            return {
                get: function (a, b) {
                    b = doc[_cookie].match("(?:;|^)\\s*" + a + "\\s*=\\s*([^;]+)\\s*(?:;|$)");
                    return b && b[1]
                },
                set: function (a, b, c, d) {
                    if (location.host.indexOf('meituan.com') != -1 && !d) {
                        d = 'meituan.com'
                    }
                    b = doc[_cookie] = a + "=" + b + (c ? _exp + (new Date(new Date().getTime() + c * 1000)).toGMTString() : "") + (d ? _domain + d : '') + '; path=/';
                }
            }
        })();
        util.cookieUtil = cookieUtil;
    }, {
        "lodash.isstring": 24
    }],
    31: [function (require, module, exports) {
        /*!
         * UAParser.js v0.7.19
         * Lightweight JavaScript-based User-Agent string parser
         * https://github.com/faisalman/ua-parser-js
         *
         * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
         * Dual licensed under GPLv2 or MIT
         */

        (function (window, undefined) {

            'use strict';

            //////////////
            // Constants
            /////////////


            var LIBVERSION = '0.7.19',
                EMPTY = '',
                UNKNOWN = '?',
                FUNC_TYPE = 'function',
                UNDEF_TYPE = 'undefined',
                OBJ_TYPE = 'object',
                STR_TYPE = 'string',
                MAJOR = 'major', // deprecated
                MODEL = 'model',
                NAME = 'name',
                TYPE = 'type',
                VENDOR = 'vendor',
                VERSION = 'version',
                ARCHITECTURE = 'architecture',
                CONSOLE = 'console',
                MOBILE = 'mobile',
                TABLET = 'tablet',
                SMARTTV = 'smarttv',
                WEARABLE = 'wearable',
                EMBEDDED = 'embedded';


            ///////////
            // Helper
            //////////


            var util = {
                extend: function (regexes, extensions) {
                    var margedRegexes = {};
                    for (var i in regexes) {
                        if (extensions[i] && extensions[i].length % 2 === 0) {
                            margedRegexes[i] = extensions[i].concat(regexes[i]);
                        } else {
                            margedRegexes[i] = regexes[i];
                        }
                    }
                    return margedRegexes;
                },
                has: function (str1, str2) {
                    if (typeof str1 === "string") {
                        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
                    } else {
                        return false;
                    }
                },
                lowerize: function (str) {
                    return str.toLowerCase();
                },
                major: function (version) {
                    return typeof (version) === STR_TYPE ? version.replace(/[^\d\.]/g, '').split(".")[0] : undefined;
                },
                trim: function (str) {
                    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                }
            };


            ///////////////
            // Map helper
            //////////////


            var mapper = {

                rgx: function (ua, arrays) {

                    //var result = {},
                    var i = 0,
                        j, k, p, q, matches, match; //, args = arguments;

                    /*// construct object barebones
                    for (p = 0; p < args[1].length; p++) {
                        q = args[1][p];
                        result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
                    }*/

                    // loop through all regexes maps
                    while (i < arrays.length && !matches) {

                        var regex = arrays[i], // even sequence (0,2,4,..)
                            props = arrays[i + 1]; // odd sequence (1,3,5,..)
                        j = k = 0;

                        // try matching uastring with regexes
                        while (j < regex.length && !matches) {

                            matches = regex[j++].exec(ua);

                            if (!!matches) {
                                for (p = 0; p < props.length; p++) {
                                    match = matches[++k];
                                    q = props[p];
                                    // check if given property is actually array
                                    if (typeof q === OBJ_TYPE && q.length > 0) {
                                        if (q.length == 2) {
                                            if (typeof q[1] == FUNC_TYPE) {
                                                // assign modified match
                                                this[q[0]] = q[1].call(this, match);
                                            } else {
                                                // assign given value, ignore regex match
                                                this[q[0]] = q[1];
                                            }
                                        } else if (q.length == 3) {
                                            // check whether function or regex
                                            if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                                // call function (usually string mapper)
                                                this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                            } else {
                                                // sanitize match using given regex
                                                this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                            }
                                        } else if (q.length == 4) {
                                            this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                        }
                                    } else {
                                        this[q] = match ? match : undefined;
                                    }
                                }
                            }
                        }
                        i += 2;
                    }
                    // console.log(this);
                    //return this;
                },

                str: function (str, map) {

                    for (var i in map) {
                        // check if array
                        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                            for (var j = 0; j < map[i].length; j++) {
                                if (util.has(map[i][j], str)) {
                                    return (i === UNKNOWN) ? undefined : i;
                                }
                            }
                        } else if (util.has(map[i], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                    return str;
                }
            };


            ///////////////
            // String map
            //////////////


            var maps = {

                browser: {
                    oldsafari: {
                        version: {
                            '1.0': '/8',
                            '1.2': '/1',
                            '1.3': '/3',
                            '2.0': '/412',
                            '2.0.2': '/416',
                            '2.0.3': '/417',
                            '2.0.4': '/419',
                            '?': '/'
                        }
                    }
                },

                device: {
                    amazon: {
                        model: {
                            'Fire Phone': ['SD', 'KF']
                        }
                    },
                    sprint: {
                        model: {
                            'Evo Shift 4G': '7373KT'
                        },
                        vendor: {
                            'HTC': 'APA',
                            'Sprint': 'Sprint'
                        }
                    }
                },

                os: {
                    windows: {
                        version: {
                            'ME': '4.90',
                            'NT 3.11': 'NT3.51',
                            'NT 4.0': 'NT4.0',
                            '2000': 'NT 5.0',
                            'XP': ['NT 5.1', 'NT 5.2'],
                            'Vista': 'NT 6.0',
                            '7': 'NT 6.1',
                            '8': 'NT 6.2',
                            '8.1': 'NT 6.3',
                            '10': ['NT 6.4', 'NT 10.0'],
                            'RT': 'ARM'
                        }
                    }
                }
            };


            //////////////
            // Regex map
            /////////////


            var regexes = {

                browser: [
                    [

                        // Presto based
                        /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
                        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
                        /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
                        /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
                    ],
                    [NAME, VERSION],
                    [

                        /(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
                    ],
                    [
                        [NAME, 'Opera Mini'], VERSION
                    ],
                    [

                        /\s(opr)\/([\w\.]+)/i // Opera Webkit
                    ],
                    [
                        [NAME, 'Opera'], VERSION
                    ],
                    [

                        // Mixed
                        /(kindle)\/([\w\.]+)/i, // Kindle
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                        // Lunascape/Maxthon/Netfront/Jasmine/Blazer

                        // Trident based
                        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                        // Avant/IEMobile/SlimBrowser/Baidu
                        /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

                        // Webkit/KHTML based
                        /(rekonq)\/([\w\.]*)/i, // Rekonq
                        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
                        // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
                    ],
                    [NAME, VERSION],
                    [

                        /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
                    ],
                    [
                        [NAME, 'IE'], VERSION
                    ],
                    [

                        /(edge|edgios|edga)\/((\d+)?[\w\.]+)/i // Microsoft Edge
                    ],
                    [
                        [NAME, 'Edge'], VERSION
                    ],
                    [

                        /(yabrowser)\/([\w\.]+)/i // Yandex
                    ],
                    [
                        [NAME, 'Yandex'], VERSION
                    ],
                    [

                        /(puffin)\/([\w\.]+)/i // Puffin
                    ],
                    [
                        [NAME, 'Puffin'], VERSION
                    ],
                    [

                        /(focus)\/([\w\.]+)/i // Firefox Focus
                    ],
                    [
                        [NAME, 'Firefox Focus'], VERSION
                    ],
                    [

                        /(opt)\/([\w\.]+)/i // Opera Touch
                    ],
                    [
                        [NAME, 'Opera Touch'], VERSION
                    ],
                    [

                        /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
                    ],
                    [
                        [NAME, 'UCBrowser'], VERSION
                    ],
                    [

                        /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
                    ],
                    [
                        [NAME, /_/g, ' '], VERSION
                    ],
                    [

                        /(micromessenger)\/([\w\.]+)/i // WeChat
                    ],
                    [
                        [NAME, 'WeChat'], VERSION
                    ],
                    [

                        /(brave)\/([\w\.]+)/i // Brave browser
                    ],
                    [
                        [NAME, 'Brave'], VERSION
                    ],
                    [

                        /(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
                    ],
                    [NAME, VERSION],
                    [

                        /(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
                    ],
                    [NAME, VERSION],
                    [

                        /m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
                    ],
                    [NAME, VERSION],
                    [

                        /(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
                    ],
                    [NAME, VERSION],
                    [

                        /(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
                    ],
                    [NAME, VERSION],
                    [

                        /(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
                    ],
                    [NAME],
                    [

                        /(LBBROWSER)/i // LieBao Browser
                    ],
                    [NAME],
                    [

                        /xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
                    ],
                    [VERSION, [NAME, 'MIUI Browser']],
                    [

                        /;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
                    ],
                    [VERSION, [NAME, 'Facebook']],
                    [

                        /safari\s(line)\/([\w\.]+)/i, // Line App for iOS
                        /android.+(line)\/([\w\.]+)\/iab/i // Line App for Android
                    ],
                    [NAME, VERSION],
                    [

                        /headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
                    ],
                    [VERSION, [NAME, 'Chrome Headless']],
                    [

                        /\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
                    ],
                    [
                        [NAME, /(.+)/, '$1 WebView'], VERSION
                    ],
                    [

                        /((?:oculus|samsung)browser)\/([\w\.]+)/i
                    ],
                    [
                        [NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION
                    ],
                    [ // Oculus / Samsung Browser

                        /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
                    ],
                    [VERSION, [NAME, 'Android Browser']],
                    [

                        /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                        // Chrome/OmniWeb/Arora/Tizen/Nokia
                    ],
                    [NAME, VERSION],
                    [

                        /(dolfin)\/([\w\.]+)/i // Dolphin
                    ],
                    [
                        [NAME, 'Dolphin'], VERSION
                    ],
                    [

                        /((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
                    ],
                    [
                        [NAME, 'Chrome'], VERSION
                    ],
                    [

                        /(coast)\/([\w\.]+)/i // Opera Coast
                    ],
                    [
                        [NAME, 'Opera Coast'], VERSION
                    ],
                    [

                        /fxios\/([\w\.-]+)/i // Firefox for iOS
                    ],
                    [VERSION, [NAME, 'Firefox']],
                    [

                        /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
                    ],
                    [VERSION, [NAME, 'Mobile Safari']],
                    [

                        /version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
                    ],
                    [VERSION, NAME],
                    [

                        /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
                    ],
                    [
                        [NAME, 'GSA'], VERSION
                    ],
                    [

                        /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
                    ],
                    [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]],
                    [

                        /(konqueror)\/([\w\.]+)/i, // Konqueror
                        /(webkit|khtml)\/([\w\.]+)/i
                    ],
                    [NAME, VERSION],
                    [

                        // Gecko based
                        /(navigator|netscape)\/([\w\.-]+)/i // Netscape
                    ],
                    [
                        [NAME, 'Netscape'], VERSION
                    ],
                    [
                        /(swiftfox)/i, // Swiftfox
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                        // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
                        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                        // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

                        // Other
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                        // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
                        /(links)\s\(([\w\.]+)/i, // Links
                        /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
                        /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
                        /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
                    ],
                    [NAME, VERSION]

                    /* /////////////////////
                    // Media players BEGIN
                    ////////////////////////

                    , [

                    /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
                    /(coremedia) v((\d+)[\w\._]+)/i
                    ], [NAME, VERSION], [

                    /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
                    ], [NAME, VERSION], [

                    /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
                    ], [NAME, VERSION], [

                    /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                        // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                        // NSPlayer/PSP-InternetRadioPlayer/Videos
                    /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
                    /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
                    /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
                    ], [NAME, VERSION], [
                    /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
                    ], [NAME, VERSION], [

                    /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
                    ], [[NAME, 'Flip Player'], VERSION], [

                    /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                        // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
                    ], [NAME], [

                    /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                        // Gstreamer
                    ], [NAME, VERSION], [

                    /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
                    /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                        // Java/urllib/requests/wget/cURL
                    /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
                    ], [NAME, VERSION], [

                    /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
                    ], [[NAME, /_/g, ' '], VERSION], [

                    /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                        // MPlayer SVN
                    ], [NAME, VERSION], [

                    /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
                    ], [NAME, VERSION], [

                    /(mplayer)/i,                                                       // MPlayer (no other info)
                    /(yourmuze)/i,                                                      // YourMuze
                    /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
                    ], [NAME], [

                    /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
                    ], [NAME, VERSION], [

                    /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
                    ], [NAME, VERSION], [

                    /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
                    ], [NAME, VERSION], [

                    /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
                    /(winamp)\s((\d+)[\w\.-]+)/i,
                    /(winamp)mpeg\/((\d+)[\w\.-]+)/i
                    ], [NAME, VERSION], [

                    /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                        // inlight radio
                    ], [NAME], [

                    /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                        // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                        // SoundTap/Totem/Stagefright/Streamium
                    ], [NAME, VERSION], [

                    /(smp)((\d+)[\d\.]+)/i                                              // SMP
                    ], [NAME, VERSION], [

                    /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
                    /(vlc)\/((\d+)[\w\.-]+)/i,
                    /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
                    /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
                    /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
                    ], [NAME, VERSION], [

                    /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
                    /(windows-media-player)\/((\d+)[\w\.-]+)/i
                    ], [[NAME, /-/g, ' '], VERSION], [

                    /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                        // Windows Media Server
                    ], [VERSION, [NAME, 'Windows']], [

                    /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
                    ], [NAME, VERSION], [

                    /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
                    /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
                    ], [[NAME, 'rad.io'], VERSION]

                    //////////////////////
                    // Media players END
                    ////////////////////*/

                ],

                cpu: [
                    [

                        /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
                    ],
                    [
                        [ARCHITECTURE, 'amd64']
                    ],
                    [

                        /(ia32(?=;))/i // IA32 (quicktime)
                    ],
                    [
                        [ARCHITECTURE, util.lowerize]
                    ],
                    [

                        /((?:i[346]|x)86)[;\)]/i // IA32
                    ],
                    [
                        [ARCHITECTURE, 'ia32']
                    ],
                    [

                        // PocketPC mistakenly identified as PowerPC
                        /windows\s(ce|mobile);\sppc;/i
                    ],
                    [
                        [ARCHITECTURE, 'arm']
                    ],
                    [

                        /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
                    ],
                    [
                        [ARCHITECTURE, /ower/, '', util.lowerize]
                    ],
                    [

                        /(sun4\w)[;\)]/i // SPARC
                    ],
                    [
                        [ARCHITECTURE, 'sparc']
                    ],
                    [

                        /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                        // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
                    ],
                    [
                        [ARCHITECTURE, util.lowerize]
                    ]
                ],

                device: [
                    [

                        /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
                    ],
                    [MODEL, VENDOR, [TYPE, TABLET]],
                    [

                        /applecoremedia\/[\w\.]+ \((ipad)/ // iPad
                    ],
                    [MODEL, [VENDOR, 'Apple'],
                        [TYPE, TABLET]
                    ],
                    [

                        /(apple\s{0,1}tv)/i // Apple TV
                    ],
                    [
                        [MODEL, 'Apple TV'],
                        [VENDOR, 'Apple']
                    ],
                    [

                        /(archos)\s(gamepad2?)/i, // Archos
                        /(hp).+(touchpad)/i, // HP TouchPad
                        /(hp).+(tablet)/i, // HP Tablet
                        /(kindle)\/([\w\.]+)/i, // Kindle
                        /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
                        /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
                    ],
                    [VENDOR, MODEL, [TYPE, TABLET]],
                    [

                        /(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
                    ],
                    [MODEL, [VENDOR, 'Amazon'],
                        [TYPE, TABLET]
                    ],
                    [
                        /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
                    ],
                    [
                        [MODEL, mapper.str, maps.device.amazon.model],
                        [VENDOR, 'Amazon'],
                        [TYPE, MOBILE]
                    ],
                    [
                        /android.+aft([bms])\sbuild/i // Fire TV
                    ],
                    [MODEL, [VENDOR, 'Amazon'],
                        [TYPE, SMARTTV]
                    ],
                    [

                        /\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
                    ],
                    [MODEL, VENDOR, [TYPE, MOBILE]],
                    [
                        /\((ip[honed|\s\w*]+);/i // iPod/iPhone
                    ],
                    [MODEL, [VENDOR, 'Apple'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /(blackberry)[\s-]?(\w+)/i, // BlackBerry
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                        // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
                        /(hp)\s([\w\s]+\w)/i, // HP iPAQ
                        /(asus)-?(\w+)/i // Asus
                    ],
                    [VENDOR, MODEL, [TYPE, MOBILE]],
                    [
                        /\(bb10;\s(\w+)/i // BlackBerry 10
                    ],
                    [MODEL, [VENDOR, 'BlackBerry'],
                        [TYPE, MOBILE]
                    ],
                    [
                        // Asus Tablets
                        /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
                    ],
                    [MODEL, [VENDOR, 'Asus'],
                        [TYPE, TABLET]
                    ],
                    [

                        /(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
                        /(sony)?(?:sgp.+)\sbuild\//i
                    ],
                    [
                        [VENDOR, 'Sony'],
                        [MODEL, 'Xperia Tablet'],
                        [TYPE, TABLET]
                    ],
                    [
                        /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
                    ],
                    [MODEL, [VENDOR, 'Sony'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /\s(ouya)\s/i, // Ouya
                        /(nintendo)\s([wids3u]+)/i // Nintendo
                    ],
                    [VENDOR, MODEL, [TYPE, CONSOLE]],
                    [

                        /android.+;\s(shield)\sbuild/i // Nvidia
                    ],
                    [MODEL, [VENDOR, 'Nvidia'],
                        [TYPE, CONSOLE]
                    ],
                    [

                        /(playstation\s[34portablevi]+)/i // Playstation
                    ],
                    [MODEL, [VENDOR, 'Sony'],
                        [TYPE, CONSOLE]
                    ],
                    [

                        /(sprint\s(\w+))/i // Sprint Phones
                    ],
                    [
                        [VENDOR, mapper.str, maps.device.sprint.vendor],
                        [MODEL, mapper.str, maps.device.sprint.model],
                        [TYPE, MOBILE]
                    ],
                    [

                        /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
                    ],
                    [VENDOR, MODEL, [TYPE, TABLET]],
                    [

                        /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
                        /(zte)-(\w*)/i, // ZTE
                        /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                        // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
                    ],
                    [VENDOR, [MODEL, /_/g, ' '],
                        [TYPE, MOBILE]
                    ],
                    [

                        /(nexus\s9)/i // HTC Nexus 9
                    ],
                    [MODEL, [VENDOR, 'HTC'],
                        [TYPE, TABLET]
                    ],
                    [

                        /d\/huawei([\w\s-]+)[;\)]/i,
                        /(nexus\s6p)/i // Huawei
                    ],
                    [MODEL, [VENDOR, 'Huawei'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
                    ],
                    [VENDOR, MODEL, [TYPE, MOBILE]],
                    [

                        /[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
                    ],
                    [MODEL, [VENDOR, 'Microsoft'],
                        [TYPE, CONSOLE]
                    ],
                    [
                        /(kin\.[onetw]{3})/i // Microsoft Kin
                    ],
                    [
                        [MODEL, /\./g, ' '],
                        [VENDOR, 'Microsoft'],
                        [TYPE, MOBILE]
                    ],
                    [

                        // Motorola
                        /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
                        /mot[\s-]?(\w*)/i,
                        /(XT\d{3,4}) build\//i,
                        /(nexus\s6)/i
                    ],
                    [MODEL, [VENDOR, 'Motorola'],
                        [TYPE, MOBILE]
                    ],
                    [
                        /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
                    ],
                    [MODEL, [VENDOR, 'Motorola'],
                        [TYPE, TABLET]
                    ],
                    [

                        /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
                    ],
                    [
                        [VENDOR, util.trim],
                        [MODEL, util.trim],
                        [TYPE, SMARTTV]
                    ],
                    [

                        /hbbtv.+maple;(\d+)/i
                    ],
                    [
                        [MODEL, /^/, 'SmartTV'],
                        [VENDOR, 'Samsung'],
                        [TYPE, SMARTTV]
                    ],
                    [

                        /\(dtv[\);].+(aquos)/i // Sharp
                    ],
                    [MODEL, [VENDOR, 'Sharp'],
                        [TYPE, SMARTTV]
                    ],
                    [

                        /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                        /((SM-T\w+))/i
                    ],
                    [
                        [VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]
                    ],
                    [ // Samsung
                        /smart-tv.+(samsung)/i
                    ],
                    [VENDOR, [TYPE, SMARTTV], MODEL],
                    [
                        /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                        /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
                        /sec-((sgh\w+))/i
                    ],
                    [
                        [VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]
                    ],
                    [

                        /sie-(\w*)/i // Siemens
                    ],
                    [MODEL, [VENDOR, 'Siemens'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
                        /(nokia)[\s_-]?([\w-]*)/i
                    ],
                    [
                        [VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]
                    ],
                    [

                        /android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
                    ],
                    [MODEL, [VENDOR, 'Acer'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
                    ],
                    [MODEL, [VENDOR, 'LG'],
                        [TYPE, TABLET]
                    ],
                    [
                        /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
                    ],
                    [
                        [VENDOR, 'LG'], MODEL, [TYPE, TABLET]
                    ],
                    [
                        /(lg) netcast\.tv/i // LG SmartTV
                    ],
                    [VENDOR, MODEL, [TYPE, SMARTTV]],
                    [
                        /(nexus\s[45])/i, // LG
                        /lg[e;\s\/-]+(\w*)/i,
                        /android.+lg(\-?[\d\w]+)\s+build/i
                    ],
                    [MODEL, [VENDOR, 'LG'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
                    ],
                    [MODEL, [VENDOR, 'Lenovo'],
                        [TYPE, TABLET]
                    ],
                    [

                        /linux;.+((jolla));/i // Jolla
                    ],
                    [VENDOR, MODEL, [TYPE, MOBILE]],
                    [

                        /((pebble))app\/[\d\.]+\s/i // Pebble
                    ],
                    [VENDOR, MODEL, [TYPE, WEARABLE]],
                    [

                        /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
                    ],
                    [VENDOR, MODEL, [TYPE, MOBILE]],
                    [

                        /crkey/i // Google Chromecast
                    ],
                    [
                        [MODEL, 'Chromecast'],
                        [VENDOR, 'Google']
                    ],
                    [

                        /android.+;\s(glass)\s\d/i // Google Glass
                    ],
                    [MODEL, [VENDOR, 'Google'],
                        [TYPE, WEARABLE]
                    ],
                    [

                        /android.+;\s(pixel c)[\s)]/i // Google Pixel C
                    ],
                    [MODEL, [VENDOR, 'Google'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+;\s(pixel( [23])?( xl)?)\s/i // Google Pixel
                    ],
                    [MODEL, [VENDOR, 'Google'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
                        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
                        /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, // Xiaomi Mi
                        /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
                    ],
                    [
                        [MODEL, /_/g, ' '],
                        [VENDOR, 'Xiaomi'],
                        [TYPE, MOBILE]
                    ],
                    [
                        /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
                    ],
                    [
                        [MODEL, /_/g, ' '],
                        [VENDOR, 'Xiaomi'],
                        [TYPE, TABLET]
                    ],
                    [
                        /android.+;\s(m[1-5]\snote)\sbuild/i // Meizu Tablet
                    ],
                    [MODEL, [VENDOR, 'Meizu'],
                        [TYPE, TABLET]
                    ],
                    [
                        /(mz)-([\w-]{2,})/i // Meizu Phone
                    ],
                    [
                        [VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]
                    ],
                    [

                        /android.+a000(1)\s+build/i, // OnePlus
                        /android.+oneplus\s(a\d{4})\s+build/i
                    ],
                    [MODEL, [VENDOR, 'OnePlus'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
                    ],
                    [MODEL, [VENDOR, 'RCA'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
                    ],
                    [MODEL, [VENDOR, 'Dell'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
                    ],
                    [MODEL, [VENDOR, 'Verizon'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
                    ],
                    [
                        [VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
                    ],
                    [MODEL, [VENDOR, 'NuVision'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
                    ],
                    [MODEL, [VENDOR, 'ZTE'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
                    ],
                    [MODEL, [VENDOR, 'Swiss'],
                        [TYPE, MOBILE]
                    ],
                    [

                        /android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
                    ],
                    [MODEL, [VENDOR, 'Swiss'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
                    ],
                    [MODEL, [VENDOR, 'Zeki'],
                        [TYPE, TABLET]
                    ],
                    [

                        /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
                        /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
                    ],
                    [
                        [VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
                    ],
                    [MODEL, [VENDOR, 'Insignia'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
                    ],
                    [MODEL, [VENDOR, 'NextBook'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
                    ],
                    [
                        [VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]
                    ],
                    [ // Voice Xtreme Phones

                        /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
                    ],
                    [
                        [VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]
                    ],
                    [

                        /android.+;\s(PH-1)\s/i
                    ],
                    [MODEL, [VENDOR, 'Essential'],
                        [TYPE, MOBILE]
                    ],
                    [ // Essential PH-1

                        /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
                    ],
                    [MODEL, [VENDOR, 'Envizen'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
                    ],
                    [VENDOR, MODEL, [TYPE, TABLET]],
                    [

                        /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
                    ],
                    [MODEL, [VENDOR, 'MachSpeed'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
                    ],
                    [VENDOR, MODEL, [TYPE, TABLET]],
                    [

                        /android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
                    ],
                    [MODEL, [VENDOR, 'Rotor'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
                    ],
                    [MODEL, [VENDOR, 'Amazon'],
                        [TYPE, TABLET]
                    ],
                    [

                        /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
                    ],
                    [VENDOR, MODEL, [TYPE, TABLET]],
                    [

                        /\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
                        /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
                    ],
                    [
                        [TYPE, util.lowerize], VENDOR, MODEL
                    ],
                    [

                        /(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
                    ],
                    [MODEL, [VENDOR, 'Generic']]


                    /*//////////////////////////
                        // TODO: move to string map
                        ////////////////////////////

                        /(C6603)/i                                                          // Sony Xperia Z C6603
                        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
                        /(C6903)/i                                                          // Sony Xperia Z 1
                        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

                        /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
                        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
                        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
                        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
                        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
                        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
                        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
                        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
                        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
                        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

                        /(T3C)/i                                                            // Advan Vandroid T3C
                        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
                        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
                        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
                        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
                        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

                        /(V972M)/i                                                          // ZTE V972M
                        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

                        /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
                        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
                        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
                        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

                        /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
                        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

                        /////////////
                        // END TODO
                        ///////////*/

                ],

                engine: [
                    [

                        /windows.+\sedge\/([\w\.]+)/i // EdgeHTML
                    ],
                    [VERSION, [NAME, 'EdgeHTML']],
                    [

                        /(presto)\/([\w\.]+)/i, // Presto
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
                        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
                        /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
                    ],
                    [NAME, VERSION],
                    [

                        /rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
                    ],
                    [VERSION, NAME]
                ],

                os: [
                    [

                        // Windows based
                        /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
                    ],
                    [NAME, VERSION],
                    [
                        /(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
                        /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
                        /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
                    ],
                    [NAME, [VERSION, mapper.str, maps.os.windows.version]],
                    [
                        /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                    ],
                    [
                        [NAME, 'Windows'],
                        [VERSION, mapper.str, maps.os.windows.version]
                    ],
                    [

                        // Mobile/Embedded OS
                        /\((bb)(10);/i // BlackBerry 10
                    ],
                    [
                        [NAME, 'BlackBerry'], VERSION
                    ],
                    [
                        /(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
                        /(tizen)[\/\s]([\w\.]+)/i, // Tizen
                        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                        // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
                        /linux;.+(sailfish);/i // Sailfish OS
                    ],
                    [NAME, VERSION],
                    [
                        /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
                    ],
                    [
                        [NAME, 'Symbian'], VERSION
                    ],
                    [
                        /\((series40);/i // Series 40
                    ],
                    [NAME],
                    [
                        /mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
                    ],
                    [
                        [NAME, 'Firefox OS'], VERSION
                    ],
                    [

                        // Console
                        /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation

                        // GNU/Linux based
                        /(mint)[\/\s\(]?(\w*)/i, // Mint
                        /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
                        /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                        // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                        // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
                        /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
                        /(gnu)\s?([\w\.]*)/i // GNU
                    ],
                    [NAME, VERSION],
                    [

                        /(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
                    ],
                    [
                        [NAME, 'Chromium OS'], VERSION
                    ],
                    [

                        // Solaris
                        /(sunos)\s?([\w\.\d]*)/i // Solaris
                    ],
                    [
                        [NAME, 'Solaris'], VERSION
                    ],
                    [

                        // BSD based
                        /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
                    ],
                    [NAME, VERSION],
                    [

                        /(haiku)\s(\w+)/i // Haiku
                    ],
                    [NAME, VERSION],
                    [

                        /cfnetwork\/.+darwin/i,
                        /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
                    ],
                    [
                        [VERSION, /_/g, '.'],
                        [NAME, 'iOS']
                    ],
                    [

                        /(mac\sos\sx)\s?([\w\s\.]*)/i,
                        /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
                    ],
                    [
                        [NAME, 'Mac OS'],
                        [VERSION, /_/g, '.']
                    ],
                    [

                        // Other
                        /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
                        /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
                        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                        // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
                        /(unix)\s?([\w\.]*)/i // UNIX
                    ],
                    [NAME, VERSION]
                ]
            };


            /////////////////
            // Constructor
            ////////////////
            /*
            var Browser = function (name, version) {
                this[NAME] = name;
                this[VERSION] = version;
            };
            var CPU = function (arch) {
                this[ARCHITECTURE] = arch;
            };
            var Device = function (vendor, model, type) {
                this[VENDOR] = vendor;
                this[MODEL] = model;
                this[TYPE] = type;
            };
            var Engine = Browser;
            var OS = Browser;
            */
            var UAParser = function (uastring, extensions) {

                if (typeof uastring === 'object') {
                    extensions = uastring;
                    uastring = undefined;
                }

                if (!(this instanceof UAParser)) {
                    return new UAParser(uastring, extensions).getResult();
                }

                var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
                var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
                //var browser = new Browser();
                //var cpu = new CPU();
                //var device = new Device();
                //var engine = new Engine();
                //var os = new OS();

                this.getBrowser = function () {
                    var browser = {
                        name: undefined,
                        version: undefined
                    };
                    mapper.rgx.call(browser, ua, rgxmap.browser);
                    browser.major = util.major(browser.version); // deprecated
                    return browser;
                };
                this.getCPU = function () {
                    var cpu = {
                        architecture: undefined
                    };
                    mapper.rgx.call(cpu, ua, rgxmap.cpu);
                    return cpu;
                };
                this.getDevice = function () {
                    var device = {
                        vendor: undefined,
                        model: undefined,
                        type: undefined
                    };
                    mapper.rgx.call(device, ua, rgxmap.device);
                    return device;
                };
                this.getEngine = function () {
                    var engine = {
                        name: undefined,
                        version: undefined
                    };
                    mapper.rgx.call(engine, ua, rgxmap.engine);
                    return engine;
                };
                this.getOS = function () {
                    var os = {
                        name: undefined,
                        version: undefined
                    };
                    mapper.rgx.call(os, ua, rgxmap.os);
                    return os;
                };
                this.getResult = function () {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    };
                };
                this.getUA = function () {
                    return ua;
                };
                this.setUA = function (uastring) {
                    ua = uastring;
                    //browser = new Browser();
                    //cpu = new CPU();
                    //device = new Device();
                    //engine = new Engine();
                    //os = new OS();
                    return this;
                };
                return this;
            };

            UAParser.VERSION = LIBVERSION;
            UAParser.BROWSER = {
                NAME: NAME,
                MAJOR: MAJOR, // deprecated
                VERSION: VERSION
            };
            UAParser.CPU = {
                ARCHITECTURE: ARCHITECTURE
            };
            UAParser.DEVICE = {
                MODEL: MODEL,
                VENDOR: VENDOR,
                TYPE: TYPE,
                CONSOLE: CONSOLE,
                MOBILE: MOBILE,
                SMARTTV: SMARTTV,
                TABLET: TABLET,
                WEARABLE: WEARABLE,
                EMBEDDED: EMBEDDED
            };
            UAParser.ENGINE = {
                NAME: NAME,
                VERSION: VERSION
            };
            UAParser.OS = {
                NAME: NAME,
                VERSION: VERSION
            };
            //UAParser.Utils = util;

            ///////////
            // Export
            //////////


            // check js environment
            if (typeof (exports) !== UNDEF_TYPE) {
                // nodejs env
                if (typeof module !== UNDEF_TYPE && module.exports) {
                    exports = module.exports = UAParser;
                }
                // TODO: test!!!!!!!!
                /*
                if (require && require.main === module && process) {
                    // cli
                    var jsonize = function (arr) {
                        var res = [];
                        for (var i in arr) {
                            res.push(new UAParser(arr[i]).getResult());
                        }
                        process.stdout.write(JSON.stringify(res, null, 2) + '\n');
                    };
                    if (process.stdin.isTTY) {
                        // via args
                        jsonize(process.argv.slice(2));
                    } else {
                        // via pipe
                        var str = '';
                        process.stdin.on('readable', function() {
                            var read = process.stdin.read();
                            if (read !== null) {
                                str += read;
                            }
                        });
                        process.stdin.on('end', function () {
                            jsonize(str.replace(/\n$/, '').split('\n'));
                        });
                    }
                }
                */
                exports.UAParser = UAParser;
            } else {
                // requirejs env (optional)
                if (typeof (define) === FUNC_TYPE && define.amd) {
                    define(function () {
                        return UAParser;
                    });
                } else if (window) {
                    // browser env
                    window.UAParser = UAParser;
                }
            }

            // jQuery/Zepto specific (optional)
            // Note:
            //   In AMD env the global scope should be kept clean, but jQuery is an exception.
            //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
            //   and we should catch that.
            var $ = window && (window.jQuery || window.Zepto);
            if (typeof $ !== UNDEF_TYPE && !$.ua) {
                var parser = new UAParser();
                $.ua = parser.getResult();
                $.ua.get = function () {
                    return parser.getUA();
                };
                $.ua.set = function (uastring) {
                    parser.setUA(uastring);
                    var result = parser.getResult();
                    for (var prop in result) {
                        $.ua[prop] = result[prop];
                    }
                };
            }

        })(typeof window === 'object' ? window : this);

    }, {}],
    29: [function (require, module, exports) {
        /**
         * lodash 3.2.3 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var baseCallback = require('lodash._basecallback'),
            baseEach = require('lodash._baseeach'),
            isIterateeCall = require('lodash._isiterateecall'),
            isArray = require('lodash.isarray');

        /**
         * A specialized version of `_.some` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function arraySome(array, predicate) {
            var index = -1,
                length = array.length;

            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * The base implementation of `_.some` without support for callback shorthands
         * and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function baseSome(collection, predicate) {
            var result;

            baseEach(collection, function (value, index, collection) {
                result = predicate(value, index, collection);
                return !result;
            });
            return !!result;
        }

        /**
         * Checks if `predicate` returns truthy for **any** element of `collection`.
         * The function returns as soon as it finds a passing value and does not iterate
         * over the entire collection. The predicate is bound to `thisArg` and invoked
         * with three arguments: (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias any
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         * @example
         *
         * _.some([null, 0, 'yes', false], Boolean);
         * // => true
         *
         * var users = [
         *   { 'user': 'barney', 'active': true },
         *   { 'user': 'fred',   'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.some(users, { 'user': 'barney', 'active': false });
         * // => false
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.some(users, 'active', false);
         * // => true
         *
         * // using the `_.property` callback shorthand
         * _.some(users, 'active');
         * // => true
         */
        function some(collection, predicate, thisArg) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
                predicate = undefined;
            }
            if (typeof predicate != 'function' || thisArg !== undefined) {
                predicate = baseCallback(predicate, thisArg, 3);
            }
            return func(collection, predicate);
        }

        module.exports = some;

    }, {
        "lodash._basecallback": 5,
        "lodash._baseeach": 7,
        "lodash._isiterateecall": 15,
        "lodash.isarray": 23
    }],
    24: [function (require, module, exports) {
        /**
         * lodash 3.0.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /** `Object#toString` result references. */
        var stringTag = '[object String]';

        /**
         * Checks if `value` is object-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /** Used for native method references. */
        var objectProto = Object.prototype;

        /**
         * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
         * of values.
         */
        var objToString = objectProto.toString;

        /**
         * Checks if `value` is classified as a `String` primitive or object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isString('abc');
         * // => true
         *
         * _.isString(1);
         * // => false
         */
        function isString(value) {
            return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }

        module.exports = isString;

    }, {}],
    21: [function (require, module, exports) {
        /**
         * lodash 3.0.3 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var arrayEach = require('lodash._arrayeach'),
            baseEach = require('lodash._baseeach'),
            bindCallback = require('lodash._bindcallback'),
            isArray = require('lodash.isarray');

        /**
         * Creates a function for `_.forEach` or `_.forEachRight`.
         *
         * @private
         * @param {Function} arrayFunc The function to iterate over an array.
         * @param {Function} eachFunc The function to iterate over a collection.
         * @returns {Function} Returns the new each function.
         */
        function createForEach(arrayFunc, eachFunc) {
            return function (collection, iteratee, thisArg) {
                return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ?
                    arrayFunc(collection, iteratee) :
                    eachFunc(collection, bindCallback(iteratee, thisArg, 3));
            };
        }

        /**
         * Iterates over elements of `collection` invoking `iteratee` for each element.
         * The `iteratee` is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection). Iteratee functions may exit iteration early
         * by explicitly returning `false`.
         *
         * **Note:** As with other "Collections" methods, objects with a "length" property
         * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
         * may be used for object iteration.
         *
         * @static
         * @memberOf _
         * @alias each
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array|Object|string} Returns `collection`.
         * @example
         *
         * _([1, 2]).forEach(function(n) {
         *   console.log(n);
         * }).value();
         * // => logs each value from left to right and returns the array
         *
         * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
         *   console.log(n, key);
         * });
         * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
         */
        var forEach = createForEach(arrayEach, baseEach);

        module.exports = forEach;

    }, {
        "lodash._arrayeach": 3,
        "lodash._baseeach": 7,
        "lodash._bindcallback": 10,
        "lodash.isarray": 23
    }],
    20: [function (require, module, exports) {
        /**
         * lodash 3.1.2 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var assign = require('lodash.assign'),
            restParam = require('lodash.restparam');

        /**
         * Used by `_.defaults` to customize its `_.assign` use.
         *
         * @private
         * @param {*} objectValue The destination object property value.
         * @param {*} sourceValue The source object property value.
         * @returns {*} Returns the value to assign to the destination object.
         */
        function assignDefaults(objectValue, sourceValue) {
            return objectValue === undefined ? sourceValue : objectValue;
        }

        /**
         * Creates a `_.defaults` or `_.defaultsDeep` function.
         *
         * @private
         * @param {Function} assigner The function to assign values.
         * @param {Function} customizer The function to customize assigned values.
         * @returns {Function} Returns the new defaults function.
         */
        function createDefaults(assigner, customizer) {
            return restParam(function (args) {
                var object = args[0];
                if (object == null) {
                    return object;
                }
                args.push(customizer);
                return assigner.apply(undefined, args);
            });
        }

        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object for all destination properties that resolve to `undefined`. Once a
         * property is set, additional values of the same property are ignored.
         *
         * **Note:** This method mutates `object`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
         * // => { 'user': 'barney', 'age': 36 }
         */
        var defaults = createDefaults(assign, assignDefaults);

        module.exports = defaults;

    }, {
        "lodash.assign": 18,
        "lodash.restparam": 28
    }],
    19: [function (require, module, exports) {
        /**
         * lodash 3.1.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var getNative = require('lodash._getnative');

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = 'Expected a function';

        /* Native method references for those with the same name as other `lodash` methods. */
        var nativeMax = Math.max,
            nativeNow = getNative(Date, 'now');

        /**
         * Gets the number of milliseconds that have elapsed since the Unix epoch
         * (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @category Date
         * @example
         *
         * _.defer(function(stamp) {
         *   console.log(_.now() - stamp);
         * }, _.now());
         * // => logs the number of milliseconds it took for the deferred function to be invoked
         */
        var now = nativeNow || function () {
            return new Date().getTime();
        };

        /**
         * Creates a debounced function that delays invoking `func` until after `wait`
         * milliseconds have elapsed since the last time the debounced function was
         * invoked. The debounced function comes with a `cancel` method to cancel
         * delayed invocations. Provide an options object to indicate that `func`
         * should be invoked on the leading and/or trailing edge of the `wait` timeout.
         * Subsequent calls to the debounced function return the result of the last
         * `func` invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
         * on the trailing edge of the timeout only if the the debounced function is
         * invoked more than once during the `wait` timeout.
         *
         * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to debounce.
         * @param {number} [wait=0] The number of milliseconds to delay.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.leading=false] Specify invoking on the leading
         *  edge of the timeout.
         * @param {number} [options.maxWait] The maximum time `func` is allowed to be
         *  delayed before it is invoked.
         * @param {boolean} [options.trailing=true] Specify invoking on the trailing
         *  edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // avoid costly calculations while the window size is in flux
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
         * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // ensure `batchLog` is invoked once after 1 second of debounced calls
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', _.debounce(batchLog, 250, {
         *   'maxWait': 1000
         * }));
         *
         * // cancel a debounced call
         * var todoChanges = _.debounce(batchLog, 1000);
         * Object.observe(models.todo, todoChanges);
         *
         * Object.observe(models, function(changes) {
         *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
         *     todoChanges.cancel();
         *   }
         * }, ['delete']);
         *
         * // ...at some point `models.todo` is changed
         * models.todo.completed = true;
         *
         * // ...before 1 second has passed `models.todo` is deleted
         * // which cancels the debounced `todoChanges` call
         * delete models.todo;
         */
        function debounce(func, wait, options) {
            var args,
                maxTimeoutId,
                result,
                stamp,
                thisArg,
                timeoutId,
                trailingCall,
                lastCalled = 0,
                maxWait = false,
                trailing = true;

            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = wait < 0 ? 0 : (+wait || 0);
            if (options === true) {
                var leading = true;
                trailing = false;
            } else if (isObject(options)) {
                leading = !!options.leading;
                maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
                trailing = 'trailing' in options ? !!options.trailing : trailing;
            }

            function cancel() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (maxTimeoutId) {
                    clearTimeout(maxTimeoutId);
                }
                lastCalled = 0;
                maxTimeoutId = timeoutId = trailingCall = undefined;
            }

            function complete(isCalled, id) {
                if (id) {
                    clearTimeout(id);
                }
                maxTimeoutId = timeoutId = trailingCall = undefined;
                if (isCalled) {
                    lastCalled = now();
                    result = func.apply(thisArg, args);
                    if (!timeoutId && !maxTimeoutId) {
                        args = thisArg = undefined;
                    }
                }
            }

            function delayed() {
                var remaining = wait - (now() - stamp);
                if (remaining <= 0 || remaining > wait) {
                    complete(trailingCall, maxTimeoutId);
                } else {
                    timeoutId = setTimeout(delayed, remaining);
                }
            }

            function maxDelayed() {
                complete(trailing, timeoutId);
            }

            function debounced() {
                args = arguments;
                stamp = now();
                thisArg = this;
                trailingCall = trailing && (timeoutId || !leading);

                if (maxWait === false) {
                    var leadingCall = leading && !timeoutId;
                } else {
                    if (!maxTimeoutId && !leading) {
                        lastCalled = stamp;
                    }
                    var remaining = maxWait - (stamp - lastCalled),
                        isCalled = remaining <= 0 || remaining > maxWait;

                    if (isCalled) {
                        if (maxTimeoutId) {
                            maxTimeoutId = clearTimeout(maxTimeoutId);
                        }
                        lastCalled = stamp;
                        result = func.apply(thisArg, args);
                    } else if (!maxTimeoutId) {
                        maxTimeoutId = setTimeout(maxDelayed, remaining);
                    }
                }
                if (isCalled && timeoutId) {
                    timeoutId = clearTimeout(timeoutId);
                } else if (!timeoutId && wait !== maxWait) {
                    timeoutId = setTimeout(delayed, wait);
                }
                if (leadingCall) {
                    isCalled = true;
                    result = func.apply(thisArg, args);
                }
                if (isCalled && !timeoutId && !maxTimeoutId) {
                    args = thisArg = undefined;
                }
                return result;
            }
            debounced.cancel = cancel;
            return debounced;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        module.exports = debounce;

    }, {
        "lodash._getnative": 14
    }],
    18: [function (require, module, exports) {
        /**
         * lodash 3.2.0 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var baseAssign = require('lodash._baseassign'),
            createAssigner = require('lodash._createassigner'),
            keys = require('lodash.keys');

        /**
         * A specialized version of `_.assign` for customizing assigned values without
         * support for argument juggling, multiple sources, and `this` binding `customizer`
         * functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {Function} customizer The function to customize assigned values.
         * @returns {Object} Returns `object`.
         */
        function assignWith(object, source, customizer) {
            var index = -1,
                props = keys(source),
                length = props.length;

            while (++index < length) {
                var key = props[index],
                    value = object[key],
                    result = customizer(value, source[key], key, object, source);

                if ((result === result ? (result !== value) : (value === value)) ||
                    (value === undefined && !(key in object))) {
                    object[key] = result;
                }
            }
            return object;
        }

        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object. Subsequent sources overwrite property assignments of previous sources.
         * If `customizer` is provided it is invoked to produce the assigned values.
         * The `customizer` is bound to `thisArg` and invoked with five arguments:
         * (objectValue, sourceValue, key, object, source).
         *
         * **Note:** This method mutates `object` and is based on
         * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
         *
         * @static
         * @memberOf _
         * @alias extend
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @param {Function} [customizer] The function to customize assigned values.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
         * // => { 'user': 'fred', 'age': 40 }
         *
         * // using a customizer callback
         * var defaults = _.partialRight(_.assign, function(value, other) {
         *   return _.isUndefined(value) ? other : value;
         * });
         *
         * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
         * // => { 'user': 'barney', 'age': 36 }
         */
        var assign = createAssigner(function (object, source, customizer) {
            return customizer ?
                assignWith(object, source, customizer) :
                baseAssign(object, source);
        });

        module.exports = assign;

    }, {
        "lodash._baseassign": 4,
        "lodash._createassigner": 13,
        "lodash.keys": 26
    }],
    13: [function (require, module, exports) {
        /**
         * lodash 3.1.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var bindCallback = require('lodash._bindcallback'),
            isIterateeCall = require('lodash._isiterateecall'),
            restParam = require('lodash.restparam');

        /**
         * Creates a function that assigns properties of source object(s) to a given
         * destination object.
         *
         * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
         *
         * @private
         * @param {Function} assigner The function to assign values.
         * @returns {Function} Returns the new assigner function.
         */
        function createAssigner(assigner) {
            return restParam(function (object, sources) {
                var index = -1,
                    length = object == null ? 0 : sources.length,
                    customizer = length > 2 ? sources[length - 2] : undefined,
                    guard = length > 2 ? sources[2] : undefined,
                    thisArg = length > 1 ? sources[length - 1] : undefined;

                if (typeof customizer == 'function') {
                    customizer = bindCallback(customizer, thisArg, 5);
                    length -= 2;
                } else {
                    customizer = typeof thisArg == 'function' ? thisArg : undefined;
                    length -= (customizer ? 1 : 0);
                }
                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                    customizer = length < 3 ? undefined : customizer;
                    length = 1;
                }
                while (++index < length) {
                    var source = sources[index];
                    if (source) {
                        assigner(object, source, customizer);
                    }
                }
                return object;
            });
        }

        module.exports = createAssigner;

    }, {
        "lodash._bindcallback": 10,
        "lodash._isiterateecall": 15,
        "lodash.restparam": 28
    }],
    28: [function (require, module, exports) {
        /**
         * lodash 3.6.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = 'Expected a function';

        /* Native method references for those with the same name as other `lodash` methods. */
        var nativeMax = Math.max;

        /**
         * Creates a function that invokes `func` with the `this` binding of the
         * created function and arguments from `start` and beyond provided as an array.
         *
         * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to apply a rest parameter to.
         * @param {number} [start=func.length-1] The start position of the rest parameter.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var say = _.restParam(function(what, names) {
         *   return what + ' ' + _.initial(names).join(', ') +
         *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
         * });
         *
         * say('hello', 'fred', 'barney', 'pebbles');
         * // => 'hello fred, barney, & pebbles'
         */
        function restParam(func, start) {
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
            return function () {
                var args = arguments,
                    index = -1,
                    length = nativeMax(args.length - start, 0),
                    rest = Array(length);

                while (++index < length) {
                    rest[index] = args[start + index];
                }
                switch (start) {
                    case 0:
                        return func.call(this, rest);
                    case 1:
                        return func.call(this, args[0], rest);
                    case 2:
                        return func.call(this, args[0], args[1], rest);
                }
                var otherArgs = Array(start + 1);
                index = -1;
                while (++index < start) {
                    otherArgs[index] = args[index];
                }
                otherArgs[start] = rest;
                return func.apply(this, otherArgs);
            };
        }

        module.exports = restParam;

    }, {}],
    15: [function (require, module, exports) {
        /**
         * lodash 3.0.9 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /** Used to detect unsigned integer values. */
        var reIsUint = /^\d+$/;

        /**
         * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
         * of an array-like value.
         */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new function.
         */
        function baseProperty(key) {
            return function (object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * Gets the "length" property value of `object`.
         *
         * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
         * that affects Safari on at least iOS 8.1-8.3 ARM64.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {*} Returns the "length" value.
         */
        var getLength = baseProperty('length');

        /**
         * Checks if `value` is array-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         */
        function isArrayLike(value) {
            return value != null && isLength(getLength(value));
        }

        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
            value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return value > -1 && value % 1 == 0 && value < length;
        }

        /**
         * Checks if the provided arguments are from an iteratee call.
         *
         * @private
         * @param {*} value The potential iteratee value argument.
         * @param {*} index The potential iteratee index or key argument.
         * @param {*} object The potential iteratee object argument.
         * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
         */
        function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
                return false;
            }
            var type = typeof index;
            if (type == 'number' ?
                (isArrayLike(object) && isIndex(index, object.length)) :
                (type == 'string' && index in object)) {
                var other = object[index];
                return value === value ? (value === other) : (other !== other);
            }
            return false;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         */
        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        module.exports = isIterateeCall;

    }, {}],
    7: [function (require, module, exports) {
        /**
         * lodash 3.0.4 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var keys = require('lodash.keys');

        /**
         * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
         * of an array-like value.
         */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /**
         * The base implementation of `_.forEach` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array|Object|string} Returns `collection`.
         */
        var baseEach = createBaseEach(baseForOwn);

        /**
         * The base implementation of `baseForIn` and `baseForOwn` which iterates
         * over `object` properties returned by `keysFunc` invoking `iteratee` for
         * each property. Iteratee functions may exit iteration early by explicitly
         * returning `false`.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} keysFunc The function to get the keys of `object`.
         * @returns {Object} Returns `object`.
         */
        var baseFor = createBaseFor();

        /**
         * The base implementation of `_.forOwn` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Object} Returns `object`.
         */
        function baseForOwn(object, iteratee) {
            return baseFor(object, iteratee, keys);
        }

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new function.
         */
        function baseProperty(key) {
            return function (object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * Creates a `baseEach` or `baseEachRight` function.
         *
         * @private
         * @param {Function} eachFunc The function to iterate over a collection.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseEach(eachFunc, fromRight) {
            return function (collection, iteratee) {
                var length = collection ? getLength(collection) : 0;
                if (!isLength(length)) {
                    return eachFunc(collection, iteratee);
                }
                var index = fromRight ? length : -1,
                    iterable = toObject(collection);

                while ((fromRight ? index-- : ++index < length)) {
                    if (iteratee(iterable[index], index, iterable) === false) {
                        break;
                    }
                }
                return collection;
            };
        }

        /**
         * Creates a base function for `_.forIn` or `_.forInRight`.
         *
         * @private
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseFor(fromRight) {
            return function (object, iteratee, keysFunc) {
                var iterable = toObject(object),
                    props = keysFunc(object),
                    length = props.length,
                    index = fromRight ? length : -1;

                while ((fromRight ? index-- : ++index < length)) {
                    var key = props[index];
                    if (iteratee(iterable[key], key, iterable) === false) {
                        break;
                    }
                }
                return object;
            };
        }

        /**
         * Gets the "length" property value of `object`.
         *
         * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
         * that affects Safari on at least iOS 8.1-8.3 ARM64.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {*} Returns the "length" value.
         */
        var getLength = baseProperty('length');

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         */
        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * Converts `value` to an object if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Object} Returns the object.
         */
        function toObject(value) {
            return isObject(value) ? value : Object(value);
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        module.exports = baseEach;

    }, {
        "lodash.keys": 26
    }],
    5: [function (require, module, exports) {
        /**
         * lodash 3.3.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var baseIsEqual = require('lodash._baseisequal'),
            bindCallback = require('lodash._bindcallback'),
            isArray = require('lodash.isarray'),
            pairs = require('lodash.pairs');

        /** Used to match property names within property paths. */
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
            reIsPlainProp = /^\w*$/,
            rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

        /** Used to match backslashes in property paths. */
        var reEscapeChar = /\\(\\)?/g;

        /**
         * Converts `value` to a string if it's not one. An empty string is returned
         * for `null` or `undefined` values.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {string} Returns the string.
         */
        function baseToString(value) {
            return value == null ? '' : (value + '');
        }

        /**
         * The base implementation of `_.callback` which supports specifying the
         * number of arguments to provide to `func`.
         *
         * @private
         * @param {*} [func=_.identity] The value to convert to a callback.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {number} [argCount] The number of arguments to provide to `func`.
         * @returns {Function} Returns the callback.
         */
        function baseCallback(func, thisArg, argCount) {
            var type = typeof func;
            if (type == 'function') {
                return thisArg === undefined ?
                    func :
                    bindCallback(func, thisArg, argCount);
            }
            if (func == null) {
                return identity;
            }
            if (type == 'object') {
                return baseMatches(func);
            }
            return thisArg === undefined ?
                property(func) :
                baseMatchesProperty(func, thisArg);
        }

        /**
         * The base implementation of `get` without support for string paths
         * and default values.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array} path The path of the property to get.
         * @param {string} [pathKey] The key representation of path.
         * @returns {*} Returns the resolved value.
         */
        function baseGet(object, path, pathKey) {
            if (object == null) {
                return;
            }
            if (pathKey !== undefined && pathKey in toObject(object)) {
                path = [pathKey];
            }
            var index = 0,
                length = path.length;

            while (object != null && index < length) {
                object = object[path[index++]];
            }
            return (index && index == length) ? object : undefined;
        }

        /**
         * The base implementation of `_.isMatch` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to inspect.
         * @param {Array} matchData The propery names, values, and compare flags to match.
         * @param {Function} [customizer] The function to customize comparing objects.
         * @returns {boolean} Returns `true` if `object` is a match, else `false`.
         */
        function baseIsMatch(object, matchData, customizer) {
            var index = matchData.length,
                length = index,
                noCustomizer = !customizer;

            if (object == null) {
                return !length;
            }
            object = toObject(object);
            while (index--) {
                var data = matchData[index];
                if ((noCustomizer && data[2]) ?
                    data[1] !== object[data[0]] :
                    !(data[0] in object)
                ) {
                    return false;
                }
            }
            while (++index < length) {
                data = matchData[index];
                var key = data[0],
                    objValue = object[key],
                    srcValue = data[1];

                if (noCustomizer && data[2]) {
                    if (objValue === undefined && !(key in object)) {
                        return false;
                    }
                } else {
                    var result = customizer ? customizer(objValue, srcValue, key) : undefined;
                    if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * The base implementation of `_.matches` which does not clone `source`.
         *
         * @private
         * @param {Object} source The object of property values to match.
         * @returns {Function} Returns the new function.
         */
        function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
                var key = matchData[0][0],
                    value = matchData[0][1];

                return function (object) {
                    if (object == null) {
                        return false;
                    }
                    return object[key] === value && (value !== undefined || (key in toObject(object)));
                };
            }
            return function (object) {
                return baseIsMatch(object, matchData);
            };
        }

        /**
         * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
         *
         * @private
         * @param {string} path The path of the property to get.
         * @param {*} srcValue The value to compare.
         * @returns {Function} Returns the new function.
         */
        function baseMatchesProperty(path, srcValue) {
            var isArr = isArray(path),
                isCommon = isKey(path) && isStrictComparable(srcValue),
                pathKey = (path + '');

            path = toPath(path);
            return function (object) {
                if (object == null) {
                    return false;
                }
                var key = pathKey;
                object = toObject(object);
                if ((isArr || !isCommon) && !(key in object)) {
                    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
                    if (object == null) {
                        return false;
                    }
                    key = last(path);
                    object = toObject(object);
                }
                return object[key] === srcValue ?
                    (srcValue !== undefined || (key in object)) :
                    baseIsEqual(srcValue, object[key], undefined, true);
            };
        }

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new function.
         */
        function baseProperty(key) {
            return function (object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * A specialized version of `baseProperty` which supports deep paths.
         *
         * @private
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new function.
         */
        function basePropertyDeep(path) {
            var pathKey = (path + '');
            path = toPath(path);
            return function (object) {
                return baseGet(object, path, pathKey);
            };
        }

        /**
         * The base implementation of `_.slice` without an iteratee call guard.
         *
         * @private
         * @param {Array} array The array to slice.
         * @param {number} [start=0] The start position.
         * @param {number} [end=array.length] The end position.
         * @returns {Array} Returns the slice of `array`.
         */
        function baseSlice(array, start, end) {
            var index = -1,
                length = array.length;

            start = start == null ? 0 : (+start || 0);
            if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }
            end = (end === undefined || end > length) ? length : (+end || 0);
            if (end < 0) {
                end += length;
            }
            length = start > end ? 0 : ((end - start) >>> 0);
            start >>>= 0;

            var result = Array(length);
            while (++index < length) {
                result[index] = array[index + start];
            }
            return result;
        }

        /**
         * Gets the propery names, values, and compare flags of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the match data of `object`.
         */
        function getMatchData(object) {
            var result = pairs(object),
                length = result.length;

            while (length--) {
                result[length][2] = isStrictComparable(result[length][1]);
            }
            return result;
        }

        /**
         * Checks if `value` is a property name and not a property path.
         *
         * @private
         * @param {*} value The value to check.
         * @param {Object} [object] The object to query keys on.
         * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
         */
        function isKey(value, object) {
            var type = typeof value;
            if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
                return true;
            }
            if (isArray(value)) {
                return false;
            }
            var result = !reIsDeepProp.test(value);
            return result || (object != null && value in toObject(object));
        }

        /**
         * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` if suitable for strict
         *  equality comparisons, else `false`.
         */
        function isStrictComparable(value) {
            return value === value && !isObject(value);
        }

        /**
         * Converts `value` to an object if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Object} Returns the object.
         */
        function toObject(value) {
            return isObject(value) ? value : Object(value);
        }

        /**
         * Converts `value` to property path array if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Array} Returns the property path array.
         */
        function toPath(value) {
            if (isArray(value)) {
                return value;
            }
            var result = [];
            baseToString(value).replace(rePropName, function (match, number, quote, string) {
                result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
            });
            return result;
        }

        /**
         * Gets the last element of `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @returns {*} Returns the last element of `array`.
         * @example
         *
         * _.last([1, 2, 3]);
         * // => 3
         */
        function last(array) {
            var length = array ? array.length : 0;
            return length ? array[length - 1] : undefined;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * This method returns the first argument provided to it.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'user': 'fred' };
         *
         * _.identity(object) === object;
         * // => true
         */
        function identity(value) {
            return value;
        }

        /**
         * Creates a function that returns the property value at `path` on a
         * given object.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var objects = [
         *   { 'a': { 'b': { 'c': 2 } } },
         *   { 'a': { 'b': { 'c': 1 } } }
         * ];
         *
         * _.map(objects, _.property('a.b.c'));
         * // => [2, 1]
         *
         * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
         * // => [1, 2]
         */
        function property(path) {
            return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }

        module.exports = baseCallback;

    }, {
        "lodash._baseisequal": 8,
        "lodash._bindcallback": 10,
        "lodash.isarray": 23,
        "lodash.pairs": 27
    }],
    27: [function (require, module, exports) {
        /**
         * lodash 3.0.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var keys = require('lodash.keys');

        /**
         * Converts `value` to an object if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Object} Returns the object.
         */
        function toObject(value) {
            return isObject(value) ? value : Object(value);
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Creates a two dimensional array of the key-value pairs for `object`,
         * e.g. `[[key1, value1], [key2, value2]]`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the new array of key-value pairs.
         * @example
         *
         * _.pairs({ 'barney': 36, 'fred': 40 });
         * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
         */
        function pairs(object) {
            object = toObject(object);

            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);

            while (++index < length) {
                var key = props[index];
                result[index] = [key, object[key]];
            }
            return result;
        }

        module.exports = pairs;

    }, {
        "lodash.keys": 26
    }],
    10: [function (require, module, exports) {
        /**
         * lodash 3.0.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /**
         * A specialized version of `baseCallback` which only supports `this` binding
         * and specifying the number of arguments to provide to `func`.
         *
         * @private
         * @param {Function} func The function to bind.
         * @param {*} thisArg The `this` binding of `func`.
         * @param {number} [argCount] The number of arguments to provide to `func`.
         * @returns {Function} Returns the callback.
         */
        function bindCallback(func, thisArg, argCount) {
            if (typeof func != 'function') {
                return identity;
            }
            if (thisArg === undefined) {
                return func;
            }
            switch (argCount) {
                case 1:
                    return function (value) {
                        return func.call(thisArg, value);
                    };
                case 3:
                    return function (value, index, collection) {
                        return func.call(thisArg, value, index, collection);
                    };
                case 4:
                    return function (accumulator, value, index, collection) {
                        return func.call(thisArg, accumulator, value, index, collection);
                    };
                case 5:
                    return function (value, other, key, object, source) {
                        return func.call(thisArg, value, other, key, object, source);
                    };
            }
            return function () {
                return func.apply(thisArg, arguments);
            };
        }

        /**
         * This method returns the first argument provided to it.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'user': 'fred' };
         *
         * _.identity(object) === object;
         * // => true
         */
        function identity(value) {
            return value;
        }

        module.exports = bindCallback;

    }, {}],
    8: [function (require, module, exports) {
        /**
         * lodash 3.0.7 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var isArray = require('lodash.isarray'),
            isTypedArray = require('lodash.istypedarray'),
            keys = require('lodash.keys');

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            stringTag = '[object String]';

        /**
         * Checks if `value` is object-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /** Used for native method references. */
        var objectProto = Object.prototype;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
         * of values.
         */
        var objToString = objectProto.toString;

        /**
         * A specialized version of `_.some` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function arraySome(array, predicate) {
            var index = -1,
                length = array.length;

            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * The base implementation of `_.isEqual` without support for `this` binding
         * `customizer` functions.
         *
         * @private
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @param {Function} [customizer] The function to customize comparing values.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         */
        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
            if (value === other) {
                return true;
            }
            if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }

        /**
         * A specialized version of `baseIsEqual` for arrays and objects which performs
         * deep comparisons and tracks traversed objects enabling objects with circular
         * references to be compared.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing objects.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA=[]] Tracks traversed `value` objects.
         * @param {Array} [stackB=[]] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var objIsArr = isArray(object),
                othIsArr = isArray(other),
                objTag = arrayTag,
                othTag = arrayTag;

            if (!objIsArr) {
                objTag = objToString.call(object);
                if (objTag == argsTag) {
                    objTag = objectTag;
                } else if (objTag != objectTag) {
                    objIsArr = isTypedArray(object);
                }
            }
            if (!othIsArr) {
                othTag = objToString.call(other);
                if (othTag == argsTag) {
                    othTag = objectTag;
                } else if (othTag != objectTag) {
                    othIsArr = isTypedArray(other);
                }
            }
            var objIsObj = objTag == objectTag,
                othIsObj = othTag == objectTag,
                isSameTag = objTag == othTag;

            if (isSameTag && !(objIsArr || objIsObj)) {
                return equalByTag(object, other, objTag);
            }
            if (!isLoose) {
                var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

                if (objIsWrapped || othIsWrapped) {
                    return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
                }
            }
            if (!isSameTag) {
                return false;
            }
            // Assume cyclic values are equal.
            // For more information on detecting circular references see https://es5.github.io/#JO.
            stackA || (stackA = []);
            stackB || (stackB = []);

            var length = stackA.length;
            while (length--) {
                if (stackA[length] == object) {
                    return stackB[length] == other;
                }
            }
            // Add `object` and `other` to the stack of traversed objects.
            stackA.push(object);
            stackB.push(other);

            var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

            stackA.pop();
            stackB.pop();

            return result;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for arrays with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Array} array The array to compare.
         * @param {Array} other The other array to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing arrays.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
         */
        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var index = -1,
                arrLength = array.length,
                othLength = other.length;

            if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
                return false;
            }
            // Ignore non-index properties.
            while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index],
                    result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

                if (result !== undefined) {
                    if (result) {
                        continue;
                    }
                    return false;
                }
                // Recursively compare arrays (susceptible to call stack limits).
                if (isLoose) {
                    if (!arraySome(other, function (othValue) {
                            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
                        })) {
                        return false;
                    }
                } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
                    return false;
                }
            }
            return true;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for comparing objects of
         * the same `toStringTag`.
         *
         * **Note:** This function only supports comparing values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} value The object to compare.
         * @param {Object} other The other object to compare.
         * @param {string} tag The `toStringTag` of the objects to compare.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalByTag(object, other, tag) {
            switch (tag) {
                case boolTag:
                case dateTag:
                    // Coerce dates and booleans to numbers, dates to milliseconds and booleans
                    // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
                    return +object == +other;

                case errorTag:
                    return object.name == other.name && object.message == other.message;

                case numberTag:
                    // Treat `NaN` vs. `NaN` as equal.
                    return (object != +object) ?
                        other != +other :
                        object == +other;

                case regexpTag:
                case stringTag:
                    // Coerce regexes to strings and treat strings primitives and string
                    // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
                    return object == (other + '');
            }
            return false;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for objects with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing values.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var objProps = keys(object),
                objLength = objProps.length,
                othProps = keys(other),
                othLength = othProps.length;

            if (objLength != othLength && !isLoose) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
                    return false;
                }
            }
            var skipCtor = isLoose;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key],
                    result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

                // Recursively compare objects (susceptible to call stack limits).
                if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
                    return false;
                }
                skipCtor || (skipCtor = key == 'constructor');
            }
            if (!skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;

                // Non `Object` object instances with different constructors are not equal.
                if (objCtor != othCtor &&
                    ('constructor' in object && 'constructor' in other) &&
                    !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
                        typeof othCtor == 'function' && othCtor instanceof othCtor)) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        module.exports = baseIsEqual;

    }, {
        "lodash.isarray": 23,
        "lodash.istypedarray": 25,
        "lodash.keys": 26
    }],
    25: [function (require, module, exports) {
        /**
         * lodash 3.0.6 (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as references for various `Number` constants. */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            weakMapTag = '[object WeakMap]';

        var arrayBufferTag = '[object ArrayBuffer]',
            dataViewTag = '[object DataView]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';

        /** Used to identify `toStringTag` values of typed arrays. */
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
            typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
            typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
            typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
            typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
            typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
            typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
            typedArrayTags[errorTag] = typedArrayTags[funcTag] =
            typedArrayTags[mapTag] = typedArrayTags[numberTag] =
            typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
            typedArrayTags[setTag] = typedArrayTags[stringTag] =
            typedArrayTags[weakMapTag] = false;

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /**
         * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is loosely based on
         * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length,
         *  else `false`.
         * @example
         *
         * _.isLength(3);
         * // => true
         *
         * _.isLength(Number.MIN_VALUE);
         * // => false
         *
         * _.isLength(Infinity);
         * // => false
         *
         * _.isLength('3');
         * // => false
         */
        function isLength(value) {
            return typeof value == 'number' &&
                value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /**
         * Checks if `value` is classified as a typed array.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified,
         *  else `false`.
         * @example
         *
         * _.isTypedArray(new Uint8Array);
         * // => true
         *
         * _.isTypedArray([]);
         * // => false
         */
        function isTypedArray(value) {
            return isObjectLike(value) &&
                isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
        }

        module.exports = isTypedArray;

    }, {}],
    4: [function (require, module, exports) {
        /**
         * lodash 3.2.0 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var baseCopy = require('lodash._basecopy'),
            keys = require('lodash.keys');

        /**
         * The base implementation of `_.assign` without support for argument juggling,
         * multiple sources, and `customizer` functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @returns {Object} Returns `object`.
         */
        function baseAssign(object, source) {
            return source == null ?
                object :
                baseCopy(source, keys(source), object);
        }

        module.exports = baseAssign;

    }, {
        "lodash._basecopy": 6,
        "lodash.keys": 26
    }],
    26: [function (require, module, exports) {
        /**
         * lodash 3.1.2 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */
        var getNative = require('lodash._getnative'),
            isArguments = require('lodash.isarguments'),
            isArray = require('lodash.isarray');

        /** Used to detect unsigned integer values. */
        var reIsUint = /^\d+$/;

        /** Used for native method references. */
        var objectProto = Object.prototype;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /* Native method references for those with the same name as other `lodash` methods. */
        var nativeKeys = getNative(Object, 'keys');

        /**
         * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
         * of an array-like value.
         */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new function.
         */
        function baseProperty(key) {
            return function (object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * Gets the "length" property value of `object`.
         *
         * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
         * that affects Safari on at least iOS 8.1-8.3 ARM64.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {*} Returns the "length" value.
         */
        var getLength = baseProperty('length');

        /**
         * Checks if `value` is array-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         */
        function isArrayLike(value) {
            return value != null && isLength(getLength(value));
        }

        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
            value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return value > -1 && value % 1 == 0 && value < length;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         */
        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * A fallback implementation of `Object.keys` which creates an array of the
         * own enumerable property names of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function shimKeys(object) {
            var props = keysIn(object),
                propsLength = props.length,
                length = propsLength && object.length;

            var allowIndexes = !!length && isLength(length) &&
                (isArray(object) || isArguments(object));

            var index = -1,
                result = [];

            while (++index < propsLength) {
                var key = props[index];
                if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Creates an array of the own enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects. See the
         * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
         * for more details.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keys(new Foo);
         * // => ['a', 'b'] (iteration order is not guaranteed)
         *
         * _.keys('hi');
         * // => ['0', '1']
         */
        var keys = !nativeKeys ? shimKeys : function (object) {
            var Ctor = object == null ? undefined : object.constructor;
            if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
                (typeof object != 'function' && isArrayLike(object))) {
                return shimKeys(object);
            }
            return isObject(object) ? nativeKeys(object) : [];
        };

        /**
         * Creates an array of the own and inherited enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keysIn(new Foo);
         * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
         */
        function keysIn(object) {
            if (object == null) {
                return [];
            }
            if (!isObject(object)) {
                object = Object(object);
            }
            var length = object.length;
            length = (length && isLength(length) &&
                (isArray(object) || isArguments(object)) && length) || 0;

            var Ctor = object.constructor,
                index = -1,
                isProto = typeof Ctor == 'function' && Ctor.prototype === object,
                result = Array(length),
                skipIndexes = length > 0;

            while (++index < length) {
                result[index] = (index + '');
            }
            for (var key in object) {
                if (!(skipIndexes && isIndex(key, length)) &&
                    !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                    result.push(key);
                }
            }
            return result;
        }

        module.exports = keys;

    }, {
        "lodash._getnative": 14,
        "lodash.isarguments": 22,
        "lodash.isarray": 23
    }],
    23: [function (require, module, exports) {
        /**
         * lodash 3.0.4 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /** `Object#toString` result references. */
        var arrayTag = '[object Array]',
            funcTag = '[object Function]';

        /** Used to detect host constructors (Safari > 5). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /**
         * Checks if `value` is object-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /** Used for native method references. */
        var objectProto = Object.prototype;

        /** Used to resolve the decompiled source of functions. */
        var fnToString = Function.prototype.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp('^' +
            fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
        );

        /* Native method references for those with the same name as other `lodash` methods. */
        var nativeIsArray = getNative(Array, 'isArray');

        /**
         * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
         * of an array-like value.
         */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
            var value = object == null ? undefined : object[key];
            return isNative(value) ? value : undefined;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         */
        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * Checks if `value` is classified as an `Array` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(function() { return arguments; }());
         * // => false
         */
        var isArray = nativeIsArray || function (value) {
            return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in older versions of Chrome and Safari which return 'function' for regexes
            // and Safari 8 equivalents which return 'object' for typed array constructors.
            return isObject(value) && objToString.call(value) == funcTag;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is a native function.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
         * @example
         *
         * _.isNative(Array.prototype.push);
         * // => true
         *
         * _.isNative(_);
         * // => false
         */
        function isNative(value) {
            if (value == null) {
                return false;
            }
            if (isFunction(value)) {
                return reIsNative.test(fnToString.call(value));
            }
            return isObjectLike(value) && reIsHostCtor.test(value);
        }

        module.exports = isArray;

    }, {}],
    22: [function (require, module, exports) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as references for various `Number` constants. */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            funcTag = '[object Function]',
            genTag = '[object GeneratorFunction]';

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /** Built-in value references. */
        var propertyIsEnumerable = objectProto.propertyIsEnumerable;

        /**
         * Checks if `value` is likely an `arguments` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an `arguments` object,
         *  else `false`.
         * @example
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
                (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
        }

        /**
         * Checks if `value` is array-like. A value is considered array-like if it's
         * not a function and has a `value.length` that's an integer greater than or
         * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         * @example
         *
         * _.isArrayLike([1, 2, 3]);
         * // => true
         *
         * _.isArrayLike(document.body.children);
         * // => true
         *
         * _.isArrayLike('abc');
         * // => true
         *
         * _.isArrayLike(_.noop);
         * // => false
         */
        function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
        }

        /**
         * This method is like `_.isArrayLike` except that it also checks if `value`
         * is an object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array-like object,
         *  else `false`.
         * @example
         *
         * _.isArrayLikeObject([1, 2, 3]);
         * // => true
         *
         * _.isArrayLikeObject(document.body.children);
         * // => true
         *
         * _.isArrayLikeObject('abc');
         * // => false
         *
         * _.isArrayLikeObject(_.noop);
         * // => false
         */
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 8-9 which returns 'object' for typed array and other constructors.
            var tag = isObject(value) ? objectToString.call(value) : '';
            return tag == funcTag || tag == genTag;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This method is loosely based on
         * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         * @example
         *
         * _.isLength(3);
         * // => true
         *
         * _.isLength(Number.MIN_VALUE);
         * // => false
         *
         * _.isLength(Infinity);
         * // => false
         *
         * _.isLength('3');
         * // => false
         */
        function isLength(value) {
            return typeof value == 'number' &&
                value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        module.exports = isArguments;

    }, {}],
    14: [function (require, module, exports) {
        /**
         * lodash 3.9.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /** `Object#toString` result references. */
        var funcTag = '[object Function]';

        /** Used to detect host constructors (Safari > 5). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /**
         * Checks if `value` is object-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /** Used for native method references. */
        var objectProto = Object.prototype;

        /** Used to resolve the decompiled source of functions. */
        var fnToString = Function.prototype.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp('^' +
            fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
        );

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
            var value = object == null ? undefined : object[key];
            return isNative(value) ? value : undefined;
        }

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in older versions of Chrome and Safari which return 'function' for regexes
            // and Safari 8 equivalents which return 'object' for typed array constructors.
            return isObject(value) && objToString.call(value) == funcTag;
        }

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is a native function.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
         * @example
         *
         * _.isNative(Array.prototype.push);
         * // => true
         *
         * _.isNative(_);
         * // => false
         */
        function isNative(value) {
            if (value == null) {
                return false;
            }
            if (isFunction(value)) {
                return reIsNative.test(fnToString.call(value));
            }
            return isObjectLike(value) && reIsHostCtor.test(value);
        }

        module.exports = getNative;

    }, {}],
    6: [function (require, module, exports) {
        /**
         * lodash 3.0.1 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /**
         * Copies properties of `source` to `object`.
         *
         * @private
         * @param {Object} source The object to copy properties from.
         * @param {Array} props The property names to copy.
         * @param {Object} [object={}] The object to copy properties to.
         * @returns {Object} Returns `object`.
         */
        function baseCopy(source, props, object) {
            object || (object = {});

            var index = -1,
                length = props.length;

            while (++index < length) {
                var key = props[index];
                object[key] = source[key];
            }
            return object;
        }

        module.exports = baseCopy;

    }, {}],
    3: [function (require, module, exports) {
        /**
         * lodash 3.0.0 (Custom Build) <https://lodash.com/>
         * Build: `lodash modern modularize exports="npm" -o ./`
         * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
         * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
         * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Available under MIT license <https://lodash.com/license>
         */

        /**
         * A specialized version of `_.forEach` for arrays without support for callback
         * shorthands or `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns `array`.
         */
        function arrayEach(array, iteratee) {
            var index = -1,
                length = array.length;

            while (++index < length) {
                if (iteratee(array[index], index, array) === false) {
                    break;
                }
            }
            return array;
        }

        module.exports = arrayEach;

    }, {}],
    2: [function (require, module, exports) {
        (function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
                typeof define === 'function' && define.amd ? define(['exports'], factory) :
                (factory((global.JSEncrypt = {})));
        }(this, (function (exports) {
            'use strict';

            var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

            function int2char(n) {
                return BI_RM.charAt(n);
            }
            //#region BIT_OPERATIONS
            // (public) this & a
            function op_and(x, y) {
                return x & y;
            }
            // (public) this | a
            function op_or(x, y) {
                return x | y;
            }
            // (public) this ^ a
            function op_xor(x, y) {
                return x ^ y;
            }
            // (public) this & ~a
            function op_andnot(x, y) {
                return x & ~y;
            }
            // return index of lowest 1-bit in x, x < 2^31
            function lbit(x) {
                if (x == 0) {
                    return -1;
                }
                var r = 0;
                if ((x & 0xffff) == 0) {
                    x >>= 16;
                    r += 16;
                }
                if ((x & 0xff) == 0) {
                    x >>= 8;
                    r += 8;
                }
                if ((x & 0xf) == 0) {
                    x >>= 4;
                    r += 4;
                }
                if ((x & 3) == 0) {
                    x >>= 2;
                    r += 2;
                }
                if ((x & 1) == 0) {
                    ++r;
                }
                return r;
            }
            // return number of 1 bits in x
            function cbit(x) {
                var r = 0;
                while (x != 0) {
                    x &= x - 1;
                    ++r;
                }
                return r;
            }
            //#endregion BIT_OPERATIONS

            var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var b64pad = "=";

            function hex2b64(h) {
                var i;
                var c;
                var ret = "";
                for (i = 0; i + 3 <= h.length; i += 3) {
                    c = parseInt(h.substring(i, i + 3), 16);
                    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
                }
                if (i + 1 == h.length) {
                    c = parseInt(h.substring(i, i + 1), 16);
                    ret += b64map.charAt(c << 2);
                } else if (i + 2 == h.length) {
                    c = parseInt(h.substring(i, i + 2), 16);
                    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
                }
                while ((ret.length & 3) > 0) {
                    ret += b64pad;
                }
                return ret;
            }
            // convert a base64 string to hex
            function b64tohex(s) {
                var ret = "";
                var i;
                var k = 0; // b64 state, 0-3
                var slop = 0;
                for (i = 0; i < s.length; ++i) {
                    if (s.charAt(i) == b64pad) {
                        break;
                    }
                    var v = b64map.indexOf(s.charAt(i));
                    if (v < 0) {
                        continue;
                    }
                    if (k == 0) {
                        ret += int2char(v >> 2);
                        slop = v & 3;
                        k = 1;
                    } else if (k == 1) {
                        ret += int2char((slop << 2) | (v >> 4));
                        slop = v & 0xf;
                        k = 2;
                    } else if (k == 2) {
                        ret += int2char(slop);
                        ret += int2char(v >> 2);
                        slop = v & 3;
                        k = 3;
                    } else {
                        ret += int2char((slop << 2) | (v >> 4));
                        ret += int2char(v & 0xf);
                        k = 0;
                    }
                }
                if (k == 1) {
                    ret += int2char(slop << 2);
                }
                return ret;
            }

            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0

            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.

            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */

            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({
                            __proto__: []
                        }
                        instanceof Array && function (d, b) {
                            d.__proto__ = b;
                        }) ||
                    function (d, b) {
                        for (var p in b)
                            if (b.hasOwnProperty(p)) d[p] = b[p];
                    };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);

                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }

            // Hex JavaScript decoder
            // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
            // Permission to use, copy, modify, and/or distribute this software for any
            // purpose with or without fee is hereby granted, provided that the above
            // copyright notice and this permission notice appear in all copies.
            //
            // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
            // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
            // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
            // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
            // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
            // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
            // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
            var decoder;
            var Hex = {
                decode: function (a) {
                    var i;
                    if (decoder === undefined) {
                        var hex = "0123456789ABCDEF";
                        var ignore = " \f\n\r\t\u00A0\u2028\u2029";
                        decoder = {};
                        for (i = 0; i < 16; ++i) {
                            decoder[hex.charAt(i)] = i;
                        }
                        hex = hex.toLowerCase();
                        for (i = 10; i < 16; ++i) {
                            decoder[hex.charAt(i)] = i;
                        }
                        for (i = 0; i < ignore.length; ++i) {
                            decoder[ignore.charAt(i)] = -1;
                        }
                    }
                    var out = [];
                    var bits = 0;
                    var char_count = 0;
                    for (i = 0; i < a.length; ++i) {
                        var c = a.charAt(i);
                        if (c == "=") {
                            break;
                        }
                        c = decoder[c];
                        if (c == -1) {
                            continue;
                        }
                        if (c === undefined) {
                            throw new Error("Illegal character at offset " + i);
                        }
                        bits |= c;
                        if (++char_count >= 2) {
                            out[out.length] = bits;
                            bits = 0;
                            char_count = 0;
                        } else {
                            bits <<= 4;
                        }
                    }
                    if (char_count) {
                        throw new Error("Hex encoding incomplete: 4 bits missing");
                    }
                    return out;
                }
            };

            // Base64 JavaScript decoder
            // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
            // Permission to use, copy, modify, and/or distribute this software for any
            // purpose with or without fee is hereby granted, provided that the above
            // copyright notice and this permission notice appear in all copies.
            //
            // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
            // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
            // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
            // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
            // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
            // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
            // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
            var decoder$1;
            var Base64 = {
                decode: function (a) {
                    var i;
                    if (decoder$1 === undefined) {
                        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                        var ignore = "= \f\n\r\t\u00A0\u2028\u2029";
                        decoder$1 = Object.create(null);
                        for (i = 0; i < 64; ++i) {
                            decoder$1[b64.charAt(i)] = i;
                        }
                        for (i = 0; i < ignore.length; ++i) {
                            decoder$1[ignore.charAt(i)] = -1;
                        }
                    }
                    var out = [];
                    var bits = 0;
                    var char_count = 0;
                    for (i = 0; i < a.length; ++i) {
                        var c = a.charAt(i);
                        if (c == "=") {
                            break;
                        }
                        c = decoder$1[c];
                        if (c == -1) {
                            continue;
                        }
                        if (c === undefined) {
                            throw new Error("Illegal character at offset " + i);
                        }
                        bits |= c;
                        if (++char_count >= 4) {
                            out[out.length] = (bits >> 16);
                            out[out.length] = (bits >> 8) & 0xFF;
                            out[out.length] = bits & 0xFF;
                            bits = 0;
                            char_count = 0;
                        } else {
                            bits <<= 6;
                        }
                    }
                    switch (char_count) {
                        case 1:
                            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                        case 2:
                            out[out.length] = (bits >> 10);
                            break;
                        case 3:
                            out[out.length] = (bits >> 16);
                            out[out.length] = (bits >> 8) & 0xFF;
                            break;
                    }
                    return out;
                },
                re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
                unarmor: function (a) {
                    var m = Base64.re.exec(a);
                    if (m) {
                        if (m[1]) {
                            a = m[1];
                        } else if (m[2]) {
                            a = m[2];
                        } else {
                            throw new Error("RegExp out of sync");
                        }
                    }
                    return Base64.decode(a);
                }
            };

            // Big integer base-10 printing library
            // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
            // Permission to use, copy, modify, and/or distribute this software for any
            // purpose with or without fee is hereby granted, provided that the above
            // copyright notice and this permission notice appear in all copies.
            //
            // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
            // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
            // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
            // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
            // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
            // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
            // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
            var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
            var Int10 = /** @class */ (function () {
                function Int10(value) {
                    this.buf = [+value || 0];
                }
                Int10.prototype.mulAdd = function (m, c) {
                    // assert(m <= 256)
                    var b = this.buf;
                    var l = b.length;
                    var i;
                    var t;
                    for (i = 0; i < l; ++i) {
                        t = b[i] * m + c;
                        if (t < max) {
                            c = 0;
                        } else {
                            c = 0 | (t / max);
                            t -= c * max;
                        }
                        b[i] = t;
                    }
                    if (c > 0) {
                        b[i] = c;
                    }
                };
                Int10.prototype.sub = function (c) {
                    // assert(m <= 256)
                    var b = this.buf;
                    var l = b.length;
                    var i;
                    var t;
                    for (i = 0; i < l; ++i) {
                        t = b[i] - c;
                        if (t < 0) {
                            t += max;
                            c = 1;
                        } else {
                            c = 0;
                        }
                        b[i] = t;
                    }
                    while (b[b.length - 1] === 0) {
                        b.pop();
                    }
                };
                Int10.prototype.toString = function (base) {
                    if ((base || 10) != 10) {
                        throw new Error("only base 10 is supported");
                    }
                    var b = this.buf;
                    var s = b[b.length - 1].toString();
                    for (var i = b.length - 2; i >= 0; --i) {
                        s += (max + b[i]).toString().substring(1);
                    }
                    return s;
                };
                Int10.prototype.valueOf = function () {
                    var b = this.buf;
                    var v = 0;
                    for (var i = b.length - 1; i >= 0; --i) {
                        v = v * max + b[i];
                    }
                    return v;
                };
                Int10.prototype.simplify = function () {
                    var b = this.buf;
                    return (b.length == 1) ? b[0] : this;
                };
                return Int10;
            }());

            // ASN.1 JavaScript decoder
            var ellipsis = "\u2026";
            var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
            var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

            function stringCut(str, len) {
                if (str.length > len) {
                    str = str.substring(0, len) + ellipsis;
                }
                return str;
            }
            var Stream = /** @class */ (function () {
                function Stream(enc, pos) {
                    this.hexDigits = "0123456789ABCDEF";
                    if (enc instanceof Stream) {
                        this.enc = enc.enc;
                        this.pos = enc.pos;
                    } else {
                        // enc should be an array or a binary string
                        this.enc = enc;
                        this.pos = pos;
                    }
                }
                Stream.prototype.get = function (pos) {
                    if (pos === undefined) {
                        pos = this.pos++;
                    }
                    if (pos >= this.enc.length) {
                        throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
                    }
                    return ("string" === typeof this.enc) ? this.enc.charCodeAt(pos) : this.enc[pos];
                };
                Stream.prototype.hexByte = function (b) {
                    return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
                };
                Stream.prototype.hexDump = function (start, end, raw) {
                    var s = "";
                    for (var i = start; i < end; ++i) {
                        s += this.hexByte(this.get(i));
                        if (raw !== true) {
                            switch (i & 0xF) {
                                case 0x7:
                                    s += "  ";
                                    break;
                                case 0xF:
                                    s += "\n";
                                    break;
                                default:
                                    s += " ";
                            }
                        }
                    }
                    return s;
                };
                Stream.prototype.isASCII = function (start, end) {
                    for (var i = start; i < end; ++i) {
                        var c = this.get(i);
                        if (c < 32 || c > 176) {
                            return false;
                        }
                    }
                    return true;
                };
                Stream.prototype.parseStringISO = function (start, end) {
                    var s = "";
                    for (var i = start; i < end; ++i) {
                        s += String.fromCharCode(this.get(i));
                    }
                    return s;
                };
                Stream.prototype.parseStringUTF = function (start, end) {
                    var s = "";
                    for (var i = start; i < end;) {
                        var c = this.get(i++);
                        if (c < 128) {
                            s += String.fromCharCode(c);
                        } else if ((c > 191) && (c < 224)) {
                            s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
                        } else {
                            s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
                        }
                    }
                    return s;
                };
                Stream.prototype.parseStringBMP = function (start, end) {
                    var str = "";
                    var hi;
                    var lo;
                    for (var i = start; i < end;) {
                        hi = this.get(i++);
                        lo = this.get(i++);
                        str += String.fromCharCode((hi << 8) | lo);
                    }
                    return str;
                };
                Stream.prototype.parseTime = function (start, end, shortYear) {
                    var s = this.parseStringISO(start, end);
                    var m = (shortYear ? reTimeS : reTimeL).exec(s);
                    if (!m) {
                        return "Unrecognized time: " + s;
                    }
                    if (shortYear) {
                        // to avoid querying the timer, use the fixed range [1970, 2069]
                        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
                        m[1] = +m[1];
                        m[1] += (+m[1] < 70) ? 2000 : 1900;
                    }
                    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
                    if (m[5]) {
                        s += ":" + m[5];
                        if (m[6]) {
                            s += ":" + m[6];
                            if (m[7]) {
                                s += "." + m[7];
                            }
                        }
                    }
                    if (m[8]) {
                        s += " UTC";
                        if (m[8] != "Z") {
                            s += m[8];
                            if (m[9]) {
                                s += ":" + m[9];
                            }
                        }
                    }
                    return s;
                };
                Stream.prototype.parseInteger = function (start, end) {
                    var v = this.get(start);
                    var neg = (v > 127);
                    var pad = neg ? 255 : 0;
                    var len;
                    var s = "";
                    // skip unuseful bits (not allowed in DER)
                    while (v == pad && ++start < end) {
                        v = this.get(start);
                    }
                    len = end - start;
                    if (len === 0) {
                        return neg ? -1 : 0;
                    }
                    // show bit length of huge integers
                    if (len > 4) {
                        s = v;
                        len <<= 3;
                        while (((+s ^ pad) & 0x80) == 0) {
                            s = +s << 1;
                            --len;
                        }
                        s = "(" + len + " bit)\n";
                    }
                    // decode the integer
                    if (neg) {
                        v = v - 256;
                    }
                    var n = new Int10(v);
                    for (var i = start + 1; i < end; ++i) {
                        n.mulAdd(256, this.get(i));
                    }
                    return s + n.toString();
                };
                Stream.prototype.parseBitString = function (start, end, maxLength) {
                    var unusedBit = this.get(start);
                    var lenBit = ((end - start - 1) << 3) - unusedBit;
                    var intro = "(" + lenBit + " bit)\n";
                    var s = "";
                    for (var i = start + 1; i < end; ++i) {
                        var b = this.get(i);
                        var skip = (i == end - 1) ? unusedBit : 0;
                        for (var j = 7; j >= skip; --j) {
                            s += (b >> j) & 1 ? "1" : "0";
                        }
                        if (s.length > maxLength) {
                            return intro + stringCut(s, maxLength);
                        }
                    }
                    return intro + s;
                };
                Stream.prototype.parseOctetString = function (start, end, maxLength) {
                    if (this.isASCII(start, end)) {
                        return stringCut(this.parseStringISO(start, end), maxLength);
                    }
                    var len = end - start;
                    var s = "(" + len + " byte)\n";
                    maxLength /= 2; // we work in bytes
                    if (len > maxLength) {
                        end = start + maxLength;
                    }
                    for (var i = start; i < end; ++i) {
                        s += this.hexByte(this.get(i));
                    }
                    if (len > maxLength) {
                        s += ellipsis;
                    }
                    return s;
                };
                Stream.prototype.parseOID = function (start, end, maxLength) {
                    var s = "";
                    var n = new Int10();
                    var bits = 0;
                    for (var i = start; i < end; ++i) {
                        var v = this.get(i);
                        n.mulAdd(128, v & 0x7F);
                        bits += 7;
                        if (!(v & 0x80)) { // finished
                            if (s === "") {
                                n = n.simplify();
                                if (n instanceof Int10) {
                                    n.sub(80);
                                    s = "2." + n.toString();
                                } else {
                                    var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                                    s = m + "." + (n - m * 40);
                                }
                            } else {
                                s += "." + n.toString();
                            }
                            if (s.length > maxLength) {
                                return stringCut(s, maxLength);
                            }
                            n = new Int10();
                            bits = 0;
                        }
                    }
                    if (bits > 0) {
                        s += ".incomplete";
                    }
                    return s;
                };
                return Stream;
            }());
            var ASN1 = /** @class */ (function () {
                function ASN1(stream, header, length, tag, sub) {
                    if (!(tag instanceof ASN1Tag)) {
                        throw new Error("Invalid tag value.");
                    }
                    this.stream = stream;
                    this.header = header;
                    this.length = length;
                    this.tag = tag;
                    this.sub = sub;
                }
                ASN1.prototype.typeName = function () {
                    switch (this.tag.tagClass) {
                        case 0: // universal
                            switch (this.tag.tagNumber) {
                                case 0x00:
                                    return "EOC";
                                case 0x01:
                                    return "BOOLEAN";
                                case 0x02:
                                    return "INTEGER";
                                case 0x03:
                                    return "BIT_STRING";
                                case 0x04:
                                    return "OCTET_STRING";
                                case 0x05:
                                    return "NULL";
                                case 0x06:
                                    return "OBJECT_IDENTIFIER";
                                case 0x07:
                                    return "ObjectDescriptor";
                                case 0x08:
                                    return "EXTERNAL";
                                case 0x09:
                                    return "REAL";
                                case 0x0A:
                                    return "ENUMERATED";
                                case 0x0B:
                                    return "EMBEDDED_PDV";
                                case 0x0C:
                                    return "UTF8String";
                                case 0x10:
                                    return "SEQUENCE";
                                case 0x11:
                                    return "SET";
                                case 0x12:
                                    return "NumericString";
                                case 0x13:
                                    return "PrintableString"; // ASCII subset
                                case 0x14:
                                    return "TeletexString"; // aka T61String
                                case 0x15:
                                    return "VideotexString";
                                case 0x16:
                                    return "IA5String"; // ASCII
                                case 0x17:
                                    return "UTCTime";
                                case 0x18:
                                    return "GeneralizedTime";
                                case 0x19:
                                    return "GraphicString";
                                case 0x1A:
                                    return "VisibleString"; // ASCII subset
                                case 0x1B:
                                    return "GeneralString";
                                case 0x1C:
                                    return "UniversalString";
                                case 0x1E:
                                    return "BMPString";
                            }
                            return "Universal_" + this.tag.tagNumber.toString();
                        case 1:
                            return "Application_" + this.tag.tagNumber.toString();
                        case 2:
                            return "[" + this.tag.tagNumber.toString() + "]"; // Context
                        case 3:
                            return "Private_" + this.tag.tagNumber.toString();
                    }
                };
                ASN1.prototype.content = function (maxLength) {
                    if (this.tag === undefined) {
                        return null;
                    }
                    if (maxLength === undefined) {
                        maxLength = Infinity;
                    }
                    var content = this.posContent();
                    var len = Math.abs(this.length);
                    if (!this.tag.isUniversal()) {
                        if (this.sub !== null) {
                            return "(" + this.sub.length + " elem)";
                        }
                        return this.stream.parseOctetString(content, content + len, maxLength);
                    }
                    switch (this.tag.tagNumber) {
                        case 0x01: // BOOLEAN
                            return (this.stream.get(content) === 0) ? "false" : "true";
                        case 0x02: // INTEGER
                            return this.stream.parseInteger(content, content + len);
                        case 0x03: // BIT_STRING
                            return this.sub ? "(" + this.sub.length + " elem)" :
                                this.stream.parseBitString(content, content + len, maxLength);
                        case 0x04: // OCTET_STRING
                            return this.sub ? "(" + this.sub.length + " elem)" :
                                this.stream.parseOctetString(content, content + len, maxLength);
                            // case 0x05: // NULL
                        case 0x06: // OBJECT_IDENTIFIER
                            return this.stream.parseOID(content, content + len, maxLength);
                            // case 0x07: // ObjectDescriptor
                            // case 0x08: // EXTERNAL
                            // case 0x09: // REAL
                            // case 0x0A: // ENUMERATED
                            // case 0x0B: // EMBEDDED_PDV
                        case 0x10: // SEQUENCE
                        case 0x11: // SET
                            if (this.sub !== null) {
                                return "(" + this.sub.length + " elem)";
                            } else {
                                return "(no elem)";
                            }
                            case 0x0C: // UTF8String
                                return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
                            case 0x12: // NumericString
                            case 0x13: // PrintableString
                            case 0x14: // TeletexString
                            case 0x15: // VideotexString
                            case 0x16: // IA5String
                                // case 0x19: // GraphicString
                            case 0x1A: // VisibleString
                                // case 0x1B: // GeneralString
                                // case 0x1C: // UniversalString
                                return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
                            case 0x1E: // BMPString
                                return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
                            case 0x17: // UTCTime
                            case 0x18: // GeneralizedTime
                                return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));
                    }
                    return null;
                };
                ASN1.prototype.toString = function () {
                    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? "null" : this.sub.length) + "]";
                };
                ASN1.prototype.toPrettyString = function (indent) {
                    if (indent === undefined) {
                        indent = "";
                    }
                    var s = indent + this.typeName() + " @" + this.stream.pos;
                    if (this.length >= 0) {
                        s += "+";
                    }
                    s += this.length;
                    if (this.tag.tagConstructed) {
                        s += " (constructed)";
                    } else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null)) {
                        s += " (encapsulates)";
                    }
                    s += "\n";
                    if (this.sub !== null) {
                        indent += "  ";
                        for (var i = 0, max = this.sub.length; i < max; ++i) {
                            s += this.sub[i].toPrettyString(indent);
                        }
                    }
                    return s;
                };
                ASN1.prototype.posStart = function () {
                    return this.stream.pos;
                };
                ASN1.prototype.posContent = function () {
                    return this.stream.pos + this.header;
                };
                ASN1.prototype.posEnd = function () {
                    return this.stream.pos + this.header + Math.abs(this.length);
                };
                ASN1.prototype.toHexString = function () {
                    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
                };
                ASN1.decodeLength = function (stream) {
                    var buf = stream.get();
                    var len = buf & 0x7F;
                    if (len == buf) {
                        return len;
                    }
                    // no reason to use Int10, as it would be a huge buffer anyways
                    if (len > 6) {
                        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
                    }
                    if (len === 0) {
                        return null;
                    } // undefined
                    buf = 0;
                    for (var i = 0; i < len; ++i) {
                        buf = (buf * 256) + stream.get();
                    }
                    return buf;
                };
                /**
                 * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
                 * @returns {string}
                 * @public
                 */
                ASN1.prototype.getHexStringValue = function () {
                    var hexString = this.toHexString();
                    var offset = this.header * 2;
                    var length = this.length * 2;
                    return hexString.substr(offset, length);
                };
                ASN1.decode = function (str) {
                    var stream;
                    if (!(str instanceof Stream)) {
                        stream = new Stream(str, 0);
                    } else {
                        stream = str;
                    }
                    var streamStart = new Stream(stream);
                    var tag = new ASN1Tag(stream);
                    var len = ASN1.decodeLength(stream);
                    var start = stream.pos;
                    var header = start - streamStart.pos;
                    var sub = null;
                    var getSub = function () {
                        var ret = [];
                        if (len !== null) {
                            // definite length
                            var end = start + len;
                            while (stream.pos < end) {
                                ret[ret.length] = ASN1.decode(stream);
                            }
                            if (stream.pos != end) {
                                throw new Error("Content size is not correct for container starting at offset " + start);
                            }
                        } else {
                            // undefined length
                            try {
                                for (;;) {
                                    var s = ASN1.decode(stream);
                                    if (s.tag.isEOC()) {
                                        break;
                                    }
                                    ret[ret.length] = s;
                                }
                                len = start - stream.pos; // undefined lengths are represented as negative values
                            } catch (e) {
                                throw new Error("Exception while decoding undefined length content: " + e);
                            }
                        }
                        return ret;
                    };
                    if (tag.tagConstructed) {
                        // must have valid content
                        sub = getSub();
                    } else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
                        // sometimes BitString and OctetString are used to encapsulate ASN.1
                        try {
                            if (tag.tagNumber == 0x03) {
                                if (stream.get() != 0) {
                                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                                }
                            }
                            sub = getSub();
                            for (var i = 0; i < sub.length; ++i) {
                                if (sub[i].tag.isEOC()) {
                                    throw new Error("EOC is not supposed to be actual content.");
                                }
                            }
                        } catch (e) {
                            // but silently ignore when they don't
                            sub = null;
                        }
                    }
                    if (sub === null) {
                        if (len === null) {
                            throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
                        }
                        stream.pos = start + Math.abs(len);
                    }
                    return new ASN1(streamStart, header, len, tag, sub);
                };
                return ASN1;
            }());
            var ASN1Tag = /** @class */ (function () {
                function ASN1Tag(stream) {
                    var buf = stream.get();
                    this.tagClass = buf >> 6;
                    this.tagConstructed = ((buf & 0x20) !== 0);
                    this.tagNumber = buf & 0x1F;
                    if (this.tagNumber == 0x1F) { // long tag
                        var n = new Int10();
                        do {
                            buf = stream.get();
                            n.mulAdd(128, buf & 0x7F);
                        } while (buf & 0x80);
                        this.tagNumber = n.simplify();
                    }
                }
                ASN1Tag.prototype.isUniversal = function () {
                    return this.tagClass === 0x00;
                };
                ASN1Tag.prototype.isEOC = function () {
                    return this.tagClass === 0x00 && this.tagNumber === 0x00;
                };
                return ASN1Tag;
            }());

            // Copyright (c) 2005  Tom Wu
            // Bits per digit
            var dbits;
            // JavaScript engine analysis
            var canary = 0xdeadbeefcafe;
            var j_lm = ((canary & 0xffffff) == 0xefcafe);
            //#region
            var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
            var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
            //#endregion
            // (public) Constructor
            var BigInteger = /** @class */ (function () {
                function BigInteger(a, b, c) {
                    if (a != null) {
                        if ("number" == typeof a) {
                            this.fromNumber(a, b, c);
                        } else if (b == null && "string" != typeof a) {
                            this.fromString(a, 256);
                        } else {
                            this.fromString(a, b);
                        }
                    }
                }
                //#region PUBLIC
                // BigInteger.prototype.toString = bnToString;
                // (public) return string representation in given radix
                BigInteger.prototype.toString = function (b) {
                    if (this.s < 0) {
                        return "-" + this.negate().toString(b);
                    }
                    var k;
                    if (b == 16) {
                        k = 4;
                    } else if (b == 8) {
                        k = 3;
                    } else if (b == 2) {
                        k = 1;
                    } else if (b == 32) {
                        k = 5;
                    } else if (b == 4) {
                        k = 2;
                    } else {
                        return this.toRadix(b);
                    }
                    var km = (1 << k) - 1;
                    var d;
                    var m = false;
                    var r = "";
                    var i = this.t;
                    var p = this.DB - (i * this.DB) % k;
                    if (i-- > 0) {
                        if (p < this.DB && (d = this[i] >> p) > 0) {
                            m = true;
                            r = int2char(d);
                        }
                        while (i >= 0) {
                            if (p < k) {
                                d = (this[i] & ((1 << p) - 1)) << (k - p);
                                d |= this[--i] >> (p += this.DB - k);
                            } else {
                                d = (this[i] >> (p -= k)) & km;
                                if (p <= 0) {
                                    p += this.DB;
                                    --i;
                                }
                            }
                            if (d > 0) {
                                m = true;
                            }
                            if (m) {
                                r += int2char(d);
                            }
                        }
                    }
                    return m ? r : "0";
                };
                // BigInteger.prototype.negate = bnNegate;
                // (public) -this
                BigInteger.prototype.negate = function () {
                    var r = nbi();
                    BigInteger.ZERO.subTo(this, r);
                    return r;
                };
                // BigInteger.prototype.abs = bnAbs;
                // (public) |this|
                BigInteger.prototype.abs = function () {
                    return (this.s < 0) ? this.negate() : this;
                };
                // BigInteger.prototype.compareTo = bnCompareTo;
                // (public) return + if this > a, - if this < a, 0 if equal
                BigInteger.prototype.compareTo = function (a) {
                    var r = this.s - a.s;
                    if (r != 0) {
                        return r;
                    }
                    var i = this.t;
                    r = i - a.t;
                    if (r != 0) {
                        return (this.s < 0) ? -r : r;
                    }
                    while (--i >= 0) {
                        if ((r = this[i] - a[i]) != 0) {
                            return r;
                        }
                    }
                    return 0;
                };
                // BigInteger.prototype.bitLength = bnBitLength;
                // (public) return the number of bits in "this"
                BigInteger.prototype.bitLength = function () {
                    if (this.t <= 0) {
                        return 0;
                    }
                    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
                };
                // BigInteger.prototype.mod = bnMod;
                // (public) this mod a
                BigInteger.prototype.mod = function (a) {
                    var r = nbi();
                    this.abs().divRemTo(a, null, r);
                    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
                        a.subTo(r, r);
                    }
                    return r;
                };
                // BigInteger.prototype.modPowInt = bnModPowInt;
                // (public) this^e % m, 0 <= e < 2^32
                BigInteger.prototype.modPowInt = function (e, m) {
                    var z;
                    if (e < 256 || m.isEven()) {
                        z = new Classic(m);
                    } else {
                        z = new Montgomery(m);
                    }
                    return this.exp(e, z);
                };
                // BigInteger.prototype.clone = bnClone;
                // (public)
                BigInteger.prototype.clone = function () {
                    var r = nbi();
                    this.copyTo(r);
                    return r;
                };
                // BigInteger.prototype.intValue = bnIntValue;
                // (public) return value as integer
                BigInteger.prototype.intValue = function () {
                    if (this.s < 0) {
                        if (this.t == 1) {
                            return this[0] - this.DV;
                        } else if (this.t == 0) {
                            return -1;
                        }
                    } else if (this.t == 1) {
                        return this[0];
                    } else if (this.t == 0) {
                        return 0;
                    }
                    // assumes 16 < DB < 32
                    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
                };
                // BigInteger.prototype.byteValue = bnByteValue;
                // (public) return value as byte
                BigInteger.prototype.byteValue = function () {
                    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
                };
                // BigInteger.prototype.shortValue = bnShortValue;
                // (public) return value as short (assumes DB>=16)
                BigInteger.prototype.shortValue = function () {
                    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
                };
                // BigInteger.prototype.signum = bnSigNum;
                // (public) 0 if this == 0, 1 if this > 0
                BigInteger.prototype.signum = function () {
                    if (this.s < 0) {
                        return -1;
                    } else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
                        return 0;
                    } else {
                        return 1;
                    }
                };
                // BigInteger.prototype.toByteArray = bnToByteArray;
                // (public) convert to bigendian byte array
                BigInteger.prototype.toByteArray = function () {
                    var i = this.t;
                    var r = [];
                    r[0] = this.s;
                    var p = this.DB - (i * this.DB) % 8;
                    var d;
                    var k = 0;
                    if (i-- > 0) {
                        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
                            r[k++] = d | (this.s << (this.DB - p));
                        }
                        while (i >= 0) {
                            if (p < 8) {
                                d = (this[i] & ((1 << p) - 1)) << (8 - p);
                                d |= this[--i] >> (p += this.DB - 8);
                            } else {
                                d = (this[i] >> (p -= 8)) & 0xff;
                                if (p <= 0) {
                                    p += this.DB;
                                    --i;
                                }
                            }
                            if ((d & 0x80) != 0) {
                                d |= -256;
                            }
                            if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
                                ++k;
                            }
                            if (k > 0 || d != this.s) {
                                r[k++] = d;
                            }
                        }
                    }
                    return r;
                };
                // BigInteger.prototype.equals = bnEquals;
                BigInteger.prototype.equals = function (a) {
                    return (this.compareTo(a) == 0);
                };
                // BigInteger.prototype.min = bnMin;
                BigInteger.prototype.min = function (a) {
                    return (this.compareTo(a) < 0) ? this : a;
                };
                // BigInteger.prototype.max = bnMax;
                BigInteger.prototype.max = function (a) {
                    return (this.compareTo(a) > 0) ? this : a;
                };
                // BigInteger.prototype.and = bnAnd;
                BigInteger.prototype.and = function (a) {
                    var r = nbi();
                    this.bitwiseTo(a, op_and, r);
                    return r;
                };
                // BigInteger.prototype.or = bnOr;
                BigInteger.prototype.or = function (a) {
                    var r = nbi();
                    this.bitwiseTo(a, op_or, r);
                    return r;
                };
                // BigInteger.prototype.xor = bnXor;
                BigInteger.prototype.xor = function (a) {
                    var r = nbi();
                    this.bitwiseTo(a, op_xor, r);
                    return r;
                };
                // BigInteger.prototype.andNot = bnAndNot;
                BigInteger.prototype.andNot = function (a) {
                    var r = nbi();
                    this.bitwiseTo(a, op_andnot, r);
                    return r;
                };
                // BigInteger.prototype.not = bnNot;
                // (public) ~this
                BigInteger.prototype.not = function () {
                    var r = nbi();
                    for (var i = 0; i < this.t; ++i) {
                        r[i] = this.DM & ~this[i];
                    }
                    r.t = this.t;
                    r.s = ~this.s;
                    return r;
                };
                // BigInteger.prototype.shiftLeft = bnShiftLeft;
                // (public) this << n
                BigInteger.prototype.shiftLeft = function (n) {
                    var r = nbi();
                    if (n < 0) {
                        this.rShiftTo(-n, r);
                    } else {
                        this.lShiftTo(n, r);
                    }
                    return r;
                };
                // BigInteger.prototype.shiftRight = bnShiftRight;
                // (public) this >> n
                BigInteger.prototype.shiftRight = function (n) {
                    var r = nbi();
                    if (n < 0) {
                        this.lShiftTo(-n, r);
                    } else {
                        this.rShiftTo(n, r);
                    }
                    return r;
                };
                // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
                // (public) returns index of lowest 1-bit (or -1 if none)
                BigInteger.prototype.getLowestSetBit = function () {
                    for (var i = 0; i < this.t; ++i) {
                        if (this[i] != 0) {
                            return i * this.DB + lbit(this[i]);
                        }
                    }
                    if (this.s < 0) {
                        return this.t * this.DB;
                    }
                    return -1;
                };
                // BigInteger.prototype.bitCount = bnBitCount;
                // (public) return number of set bits
                BigInteger.prototype.bitCount = function () {
                    var r = 0;
                    var x = this.s & this.DM;
                    for (var i = 0; i < this.t; ++i) {
                        r += cbit(this[i] ^ x);
                    }
                    return r;
                };
                // BigInteger.prototype.testBit = bnTestBit;
                // (public) true iff nth bit is set
                BigInteger.prototype.testBit = function (n) {
                    var j = Math.floor(n / this.DB);
                    if (j >= this.t) {
                        return (this.s != 0);
                    }
                    return ((this[j] & (1 << (n % this.DB))) != 0);
                };
                // BigInteger.prototype.setBit = bnSetBit;
                // (public) this | (1<<n)
                BigInteger.prototype.setBit = function (n) {
                    return this.changeBit(n, op_or);
                };
                // BigInteger.prototype.clearBit = bnClearBit;
                // (public) this & ~(1<<n)
                BigInteger.prototype.clearBit = function (n) {
                    return this.changeBit(n, op_andnot);
                };
                // BigInteger.prototype.flipBit = bnFlipBit;
                // (public) this ^ (1<<n)
                BigInteger.prototype.flipBit = function (n) {
                    return this.changeBit(n, op_xor);
                };
                // BigInteger.prototype.add = bnAdd;
                // (public) this + a
                BigInteger.prototype.add = function (a) {
                    var r = nbi();
                    this.addTo(a, r);
                    return r;
                };
                // BigInteger.prototype.subtract = bnSubtract;
                // (public) this - a
                BigInteger.prototype.subtract = function (a) {
                    var r = nbi();
                    this.subTo(a, r);
                    return r;
                };
                // BigInteger.prototype.multiply = bnMultiply;
                // (public) this * a
                BigInteger.prototype.multiply = function (a) {
                    var r = nbi();
                    this.multiplyTo(a, r);
                    return r;
                };
                // BigInteger.prototype.divide = bnDivide;
                // (public) this / a
                BigInteger.prototype.divide = function (a) {
                    var r = nbi();
                    this.divRemTo(a, r, null);
                    return r;
                };
                // BigInteger.prototype.remainder = bnRemainder;
                // (public) this % a
                BigInteger.prototype.remainder = function (a) {
                    var r = nbi();
                    this.divRemTo(a, null, r);
                    return r;
                };
                // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
                // (public) [this/a,this%a]
                BigInteger.prototype.divideAndRemainder = function (a) {
                    var q = nbi();
                    var r = nbi();
                    this.divRemTo(a, q, r);
                    return [q, r];
                };
                // BigInteger.prototype.modPow = bnModPow;
                // (public) this^e % m (HAC 14.85)
                BigInteger.prototype.modPow = function (e, m) {
                    var i = e.bitLength();
                    var k;
                    var r = nbv(1);
                    var z;
                    if (i <= 0) {
                        return r;
                    } else if (i < 18) {
                        k = 1;
                    } else if (i < 48) {
                        k = 3;
                    } else if (i < 144) {
                        k = 4;
                    } else if (i < 768) {
                        k = 5;
                    } else {
                        k = 6;
                    }
                    if (i < 8) {
                        z = new Classic(m);
                    } else if (m.isEven()) {
                        z = new Barrett(m);
                    } else {
                        z = new Montgomery(m);
                    }
                    // precomputation
                    var g = [];
                    var n = 3;
                    var k1 = k - 1;
                    var km = (1 << k) - 1;
                    g[1] = z.convert(this);
                    if (k > 1) {
                        var g2 = nbi();
                        z.sqrTo(g[1], g2);
                        while (n <= km) {
                            g[n] = nbi();
                            z.mulTo(g2, g[n - 2], g[n]);
                            n += 2;
                        }
                    }
                    var j = e.t - 1;
                    var w;
                    var is1 = true;
                    var r2 = nbi();
                    var t;
                    i = nbits(e[j]) - 1;
                    while (j >= 0) {
                        if (i >= k1) {
                            w = (e[j] >> (i - k1)) & km;
                        } else {
                            w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
                            if (j > 0) {
                                w |= e[j - 1] >> (this.DB + i - k1);
                            }
                        }
                        n = k;
                        while ((w & 1) == 0) {
                            w >>= 1;
                            --n;
                        }
                        if ((i -= n) < 0) {
                            i += this.DB;
                            --j;
                        }
                        if (is1) { // ret == 1, don't bother squaring or multiplying it
                            g[w].copyTo(r);
                            is1 = false;
                        } else {
                            while (n > 1) {
                                z.sqrTo(r, r2);
                                z.sqrTo(r2, r);
                                n -= 2;
                            }
                            if (n > 0) {
                                z.sqrTo(r, r2);
                            } else {
                                t = r;
                                r = r2;
                                r2 = t;
                            }
                            z.mulTo(r2, g[w], r);
                        }
                        while (j >= 0 && (e[j] & (1 << i)) == 0) {
                            z.sqrTo(r, r2);
                            t = r;
                            r = r2;
                            r2 = t;
                            if (--i < 0) {
                                i = this.DB - 1;
                                --j;
                            }
                        }
                    }
                    return z.revert(r);
                };
                // BigInteger.prototype.modInverse = bnModInverse;
                // (public) 1/this % m (HAC 14.61)
                BigInteger.prototype.modInverse = function (m) {
                    var ac = m.isEven();
                    if ((this.isEven() && ac) || m.signum() == 0) {
                        return BigInteger.ZERO;
                    }
                    var u = m.clone();
                    var v = this.clone();
                    var a = nbv(1);
                    var b = nbv(0);
                    var c = nbv(0);
                    var d = nbv(1);
                    while (u.signum() != 0) {
                        while (u.isEven()) {
                            u.rShiftTo(1, u);
                            if (ac) {
                                if (!a.isEven() || !b.isEven()) {
                                    a.addTo(this, a);
                                    b.subTo(m, b);
                                }
                                a.rShiftTo(1, a);
                            } else if (!b.isEven()) {
                                b.subTo(m, b);
                            }
                            b.rShiftTo(1, b);
                        }
                        while (v.isEven()) {
                            v.rShiftTo(1, v);
                            if (ac) {
                                if (!c.isEven() || !d.isEven()) {
                                    c.addTo(this, c);
                                    d.subTo(m, d);
                                }
                                c.rShiftTo(1, c);
                            } else if (!d.isEven()) {
                                d.subTo(m, d);
                            }
                            d.rShiftTo(1, d);
                        }
                        if (u.compareTo(v) >= 0) {
                            u.subTo(v, u);
                            if (ac) {
                                a.subTo(c, a);
                            }
                            b.subTo(d, b);
                        } else {
                            v.subTo(u, v);
                            if (ac) {
                                c.subTo(a, c);
                            }
                            d.subTo(b, d);
                        }
                    }
                    if (v.compareTo(BigInteger.ONE) != 0) {
                        return BigInteger.ZERO;
                    }
                    if (d.compareTo(m) >= 0) {
                        return d.subtract(m);
                    }
                    if (d.signum() < 0) {
                        d.addTo(m, d);
                    } else {
                        return d;
                    }
                    if (d.signum() < 0) {
                        return d.add(m);
                    } else {
                        return d;
                    }
                };
                // BigInteger.prototype.pow = bnPow;
                // (public) this^e
                BigInteger.prototype.pow = function (e) {
                    return this.exp(e, new NullExp());
                };
                // BigInteger.prototype.gcd = bnGCD;
                // (public) gcd(this,a) (HAC 14.54)
                BigInteger.prototype.gcd = function (a) {
                    var x = (this.s < 0) ? this.negate() : this.clone();
                    var y = (a.s < 0) ? a.negate() : a.clone();
                    if (x.compareTo(y) < 0) {
                        var t = x;
                        x = y;
                        y = t;
                    }
                    var i = x.getLowestSetBit();
                    var g = y.getLowestSetBit();
                    if (g < 0) {
                        return x;
                    }
                    if (i < g) {
                        g = i;
                    }
                    if (g > 0) {
                        x.rShiftTo(g, x);
                        y.rShiftTo(g, y);
                    }
                    while (x.signum() > 0) {
                        if ((i = x.getLowestSetBit()) > 0) {
                            x.rShiftTo(i, x);
                        }
                        if ((i = y.getLowestSetBit()) > 0) {
                            y.rShiftTo(i, y);
                        }
                        if (x.compareTo(y) >= 0) {
                            x.subTo(y, x);
                            x.rShiftTo(1, x);
                        } else {
                            y.subTo(x, y);
                            y.rShiftTo(1, y);
                        }
                    }
                    if (g > 0) {
                        y.lShiftTo(g, y);
                    }
                    return y;
                };
                // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
                // (public) test primality with certainty >= 1-.5^t
                BigInteger.prototype.isProbablePrime = function (t) {
                    var i;
                    var x = this.abs();
                    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
                        for (i = 0; i < lowprimes.length; ++i) {
                            if (x[0] == lowprimes[i]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    if (x.isEven()) {
                        return false;
                    }
                    i = 1;
                    while (i < lowprimes.length) {
                        var m = lowprimes[i];
                        var j = i + 1;
                        while (j < lowprimes.length && m < lplim) {
                            m *= lowprimes[j++];
                        }
                        m = x.modInt(m);
                        while (i < j) {
                            if (m % lowprimes[i++] == 0) {
                                return false;
                            }
                        }
                    }
                    return x.millerRabin(t);
                };
                //#endregion PUBLIC
                //#region PROTECTED
                // BigInteger.prototype.copyTo = bnpCopyTo;
                // (protected) copy this to r
                BigInteger.prototype.copyTo = function (r) {
                    for (var i = this.t - 1; i >= 0; --i) {
                        r[i] = this[i];
                    }
                    r.t = this.t;
                    r.s = this.s;
                };
                // BigInteger.prototype.fromInt = bnpFromInt;
                // (protected) set from integer value x, -DV <= x < DV
                BigInteger.prototype.fromInt = function (x) {
                    this.t = 1;
                    this.s = (x < 0) ? -1 : 0;
                    if (x > 0) {
                        this[0] = x;
                    } else if (x < -1) {
                        this[0] = x + this.DV;
                    } else {
                        this.t = 0;
                    }
                };
                // BigInteger.prototype.fromString = bnpFromString;
                // (protected) set from string and radix
                BigInteger.prototype.fromString = function (s, b) {
                    var k;
                    if (b == 16) {
                        k = 4;
                    } else if (b == 8) {
                        k = 3;
                    } else if (b == 256) {
                        k = 8;
                        /* byte array */
                    } else if (b == 2) {
                        k = 1;
                    } else if (b == 32) {
                        k = 5;
                    } else if (b == 4) {
                        k = 2;
                    } else {
                        this.fromRadix(s, b);
                        return;
                    }
                    this.t = 0;
                    this.s = 0;
                    var i = s.length;
                    var mi = false;
                    var sh = 0;
                    while (--i >= 0) {
                        var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);
                        if (x < 0) {
                            if (s.charAt(i) == "-") {
                                mi = true;
                            }
                            continue;
                        }
                        mi = false;
                        if (sh == 0) {
                            this[this.t++] = x;
                        } else if (sh + k > this.DB) {
                            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                            this[this.t++] = (x >> (this.DB - sh));
                        } else {
                            this[this.t - 1] |= x << sh;
                        }
                        sh += k;
                        if (sh >= this.DB) {
                            sh -= this.DB;
                        }
                    }
                    if (k == 8 && ((+s[0]) & 0x80) != 0) {
                        this.s = -1;
                        if (sh > 0) {
                            this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
                        }
                    }
                    this.clamp();
                    if (mi) {
                        BigInteger.ZERO.subTo(this, this);
                    }
                };
                // BigInteger.prototype.clamp = bnpClamp;
                // (protected) clamp off excess high words
                BigInteger.prototype.clamp = function () {
                    var c = this.s & this.DM;
                    while (this.t > 0 && this[this.t - 1] == c) {
                        --this.t;
                    }
                };
                // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
                // (protected) r = this << n*DB
                BigInteger.prototype.dlShiftTo = function (n, r) {
                    var i;
                    for (i = this.t - 1; i >= 0; --i) {
                        r[i + n] = this[i];
                    }
                    for (i = n - 1; i >= 0; --i) {
                        r[i] = 0;
                    }
                    r.t = this.t + n;
                    r.s = this.s;
                };
                // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
                // (protected) r = this >> n*DB
                BigInteger.prototype.drShiftTo = function (n, r) {
                    for (var i = n; i < this.t; ++i) {
                        r[i - n] = this[i];
                    }
                    r.t = Math.max(this.t - n, 0);
                    r.s = this.s;
                };
                // BigInteger.prototype.lShiftTo = bnpLShiftTo;
                // (protected) r = this << n
                BigInteger.prototype.lShiftTo = function (n, r) {
                    var bs = n % this.DB;
                    var cbs = this.DB - bs;
                    var bm = (1 << cbs) - 1;
                    var ds = Math.floor(n / this.DB);
                    var c = (this.s << bs) & this.DM;
                    for (var i = this.t - 1; i >= 0; --i) {
                        r[i + ds + 1] = (this[i] >> cbs) | c;
                        c = (this[i] & bm) << bs;
                    }
                    for (var i = ds - 1; i >= 0; --i) {
                        r[i] = 0;
                    }
                    r[ds] = c;
                    r.t = this.t + ds + 1;
                    r.s = this.s;
                    r.clamp();
                };
                // BigInteger.prototype.rShiftTo = bnpRShiftTo;
                // (protected) r = this >> n
                BigInteger.prototype.rShiftTo = function (n, r) {
                    r.s = this.s;
                    var ds = Math.floor(n / this.DB);
                    if (ds >= this.t) {
                        r.t = 0;
                        return;
                    }
                    var bs = n % this.DB;
                    var cbs = this.DB - bs;
                    var bm = (1 << bs) - 1;
                    r[0] = this[ds] >> bs;
                    for (var i = ds + 1; i < this.t; ++i) {
                        r[i - ds - 1] |= (this[i] & bm) << cbs;
                        r[i - ds] = this[i] >> bs;
                    }
                    if (bs > 0) {
                        r[this.t - ds - 1] |= (this.s & bm) << cbs;
                    }
                    r.t = this.t - ds;
                    r.clamp();
                };
                // BigInteger.prototype.subTo = bnpSubTo;
                // (protected) r = this - a
                BigInteger.prototype.subTo = function (a, r) {
                    var i = 0;
                    var c = 0;
                    var m = Math.min(a.t, this.t);
                    while (i < m) {
                        c += this[i] - a[i];
                        r[i++] = c & this.DM;
                        c >>= this.DB;
                    }
                    if (a.t < this.t) {
                        c -= a.s;
                        while (i < this.t) {
                            c += this[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        c += this.s;
                    } else {
                        c += this.s;
                        while (i < a.t) {
                            c -= a[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        c -= a.s;
                    }
                    r.s = (c < 0) ? -1 : 0;
                    if (c < -1) {
                        r[i++] = this.DV + c;
                    } else if (c > 0) {
                        r[i++] = c;
                    }
                    r.t = i;
                    r.clamp();
                };
                // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
                // (protected) r = this * a, r != this,a (HAC 14.12)
                // "this" should be the larger one if appropriate.
                BigInteger.prototype.multiplyTo = function (a, r) {
                    var x = this.abs();
                    var y = a.abs();
                    var i = x.t;
                    r.t = i + y.t;
                    while (--i >= 0) {
                        r[i] = 0;
                    }
                    for (i = 0; i < y.t; ++i) {
                        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
                    }
                    r.s = 0;
                    r.clamp();
                    if (this.s != a.s) {
                        BigInteger.ZERO.subTo(r, r);
                    }
                };
                // BigInteger.prototype.squareTo = bnpSquareTo;
                // (protected) r = this^2, r != this (HAC 14.16)
                BigInteger.prototype.squareTo = function (r) {
                    var x = this.abs();
                    var i = r.t = 2 * x.t;
                    while (--i >= 0) {
                        r[i] = 0;
                    }
                    for (i = 0; i < x.t - 1; ++i) {
                        var c = x.am(i, x[i], r, 2 * i, 0, 1);
                        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                            r[i + x.t] -= x.DV;
                            r[i + x.t + 1] = 1;
                        }
                    }
                    if (r.t > 0) {
                        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
                    }
                    r.s = 0;
                    r.clamp();
                };
                // BigInteger.prototype.divRemTo = bnpDivRemTo;
                // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
                // r != q, this != m.  q or r may be null.
                BigInteger.prototype.divRemTo = function (m, q, r) {
                    var pm = m.abs();
                    if (pm.t <= 0) {
                        return;
                    }
                    var pt = this.abs();
                    if (pt.t < pm.t) {
                        if (q != null) {
                            q.fromInt(0);
                        }
                        if (r != null) {
                            this.copyTo(r);
                        }
                        return;
                    }
                    if (r == null) {
                        r = nbi();
                    }
                    var y = nbi();
                    var ts = this.s;
                    var ms = m.s;
                    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
                    if (nsh > 0) {
                        pm.lShiftTo(nsh, y);
                        pt.lShiftTo(nsh, r);
                    } else {
                        pm.copyTo(y);
                        pt.copyTo(r);
                    }
                    var ys = y.t;
                    var y0 = y[ys - 1];
                    if (y0 == 0) {
                        return;
                    }
                    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
                    var d1 = this.FV / yt;
                    var d2 = (1 << this.F1) / yt;
                    var e = 1 << this.F2;
                    var i = r.t;
                    var j = i - ys;
                    var t = (q == null) ? nbi() : q;
                    y.dlShiftTo(j, t);
                    if (r.compareTo(t) >= 0) {
                        r[r.t++] = 1;
                        r.subTo(t, r);
                    }
                    BigInteger.ONE.dlShiftTo(ys, t);
                    t.subTo(y, y); // "negative" y so we can replace sub with am later
                    while (y.t < ys) {
                        y[y.t++] = 0;
                    }
                    while (--j >= 0) {
                        // Estimate quotient digit
                        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
                        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                            y.dlShiftTo(j, t);
                            r.subTo(t, r);
                            while (r[i] < --qd) {
                                r.subTo(t, r);
                            }
                        }
                    }
                    if (q != null) {
                        r.drShiftTo(ys, q);
                        if (ts != ms) {
                            BigInteger.ZERO.subTo(q, q);
                        }
                    }
                    r.t = ys;
                    r.clamp();
                    if (nsh > 0) {
                        r.rShiftTo(nsh, r);
                    } // Denormalize remainder
                    if (ts < 0) {
                        BigInteger.ZERO.subTo(r, r);
                    }
                };
                // BigInteger.prototype.invDigit = bnpInvDigit;
                // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
                // justification:
                //         xy == 1 (mod m)
                //         xy =  1+km
                //   xy(2-xy) = (1+km)(1-km)
                // x[y(2-xy)] = 1-k^2m^2
                // x[y(2-xy)] == 1 (mod m^2)
                // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
                // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
                // JS multiply "overflows" differently from C/C++, so care is needed here.
                BigInteger.prototype.invDigit = function () {
                    if (this.t < 1) {
                        return 0;
                    }
                    var x = this[0];
                    if ((x & 1) == 0) {
                        return 0;
                    }
                    var y = x & 3; // y == 1/x mod 2^2
                    y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
                    y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
                    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
                    // last step - calculate inverse mod DV directly;
                    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
                    y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
                    // we really want the negative inverse, and -DV < y < DV
                    return (y > 0) ? this.DV - y : -y;
                };
                // BigInteger.prototype.isEven = bnpIsEven;
                // (protected) true iff this is even
                BigInteger.prototype.isEven = function () {
                    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
                };
                // BigInteger.prototype.exp = bnpExp;
                // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
                BigInteger.prototype.exp = function (e, z) {
                    if (e > 0xffffffff || e < 1) {
                        return BigInteger.ONE;
                    }
                    var r = nbi();
                    var r2 = nbi();
                    var g = z.convert(this);
                    var i = nbits(e) - 1;
                    g.copyTo(r);
                    while (--i >= 0) {
                        z.sqrTo(r, r2);
                        if ((e & (1 << i)) > 0) {
                            z.mulTo(r2, g, r);
                        } else {
                            var t = r;
                            r = r2;
                            r2 = t;
                        }
                    }
                    return z.revert(r);
                };
                // BigInteger.prototype.chunkSize = bnpChunkSize;
                // (protected) return x s.t. r^x < DV
                BigInteger.prototype.chunkSize = function (r) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(r));
                };
                // BigInteger.prototype.toRadix = bnpToRadix;
                // (protected) convert to radix string
                BigInteger.prototype.toRadix = function (b) {
                    if (b == null) {
                        b = 10;
                    }
                    if (this.signum() == 0 || b < 2 || b > 36) {
                        return "0";
                    }
                    var cs = this.chunkSize(b);
                    var a = Math.pow(b, cs);
                    var d = nbv(a);
                    var y = nbi();
                    var z = nbi();
                    var r = "";
                    this.divRemTo(d, y, z);
                    while (y.signum() > 0) {
                        r = (a + z.intValue()).toString(b).substr(1) + r;
                        y.divRemTo(d, y, z);
                    }
                    return z.intValue().toString(b) + r;
                };
                // BigInteger.prototype.fromRadix = bnpFromRadix;
                // (protected) convert from radix string
                BigInteger.prototype.fromRadix = function (s, b) {
                    this.fromInt(0);
                    if (b == null) {
                        b = 10;
                    }
                    var cs = this.chunkSize(b);
                    var d = Math.pow(b, cs);
                    var mi = false;
                    var j = 0;
                    var w = 0;
                    for (var i = 0; i < s.length; ++i) {
                        var x = intAt(s, i);
                        if (x < 0) {
                            if (s.charAt(i) == "-" && this.signum() == 0) {
                                mi = true;
                            }
                            continue;
                        }
                        w = b * w + x;
                        if (++j >= cs) {
                            this.dMultiply(d);
                            this.dAddOffset(w, 0);
                            j = 0;
                            w = 0;
                        }
                    }
                    if (j > 0) {
                        this.dMultiply(Math.pow(b, j));
                        this.dAddOffset(w, 0);
                    }
                    if (mi) {
                        BigInteger.ZERO.subTo(this, this);
                    }
                };
                // BigInteger.prototype.fromNumber = bnpFromNumber;
                // (protected) alternate constructor
                BigInteger.prototype.fromNumber = function (a, b, c) {
                    if ("number" == typeof b) {
                        // new BigInteger(int,int,RNG)
                        if (a < 2) {
                            this.fromInt(1);
                        } else {
                            this.fromNumber(a, c);
                            if (!this.testBit(a - 1)) {
                                // force MSB set
                                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                            }
                            if (this.isEven()) {
                                this.dAddOffset(1, 0);
                            } // force odd
                            while (!this.isProbablePrime(b)) {
                                this.dAddOffset(2, 0);
                                if (this.bitLength() > a) {
                                    this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                                }
                            }
                        }
                    } else {
                        // new BigInteger(int,RNG)
                        var x = [];
                        var t = a & 7;
                        x.length = (a >> 3) + 1;
                        b.nextBytes(x);
                        if (t > 0) {
                            x[0] &= ((1 << t) - 1);
                        } else {
                            x[0] = 0;
                        }
                        this.fromString(x, 256);
                    }
                };
                // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
                // (protected) r = this op a (bitwise)
                BigInteger.prototype.bitwiseTo = function (a, op, r) {
                    var i;
                    var f;
                    var m = Math.min(a.t, this.t);
                    for (i = 0; i < m; ++i) {
                        r[i] = op(this[i], a[i]);
                    }
                    if (a.t < this.t) {
                        f = a.s & this.DM;
                        for (i = m; i < this.t; ++i) {
                            r[i] = op(this[i], f);
                        }
                        r.t = this.t;
                    } else {
                        f = this.s & this.DM;
                        for (i = m; i < a.t; ++i) {
                            r[i] = op(f, a[i]);
                        }
                        r.t = a.t;
                    }
                    r.s = op(this.s, a.s);
                    r.clamp();
                };
                // BigInteger.prototype.changeBit = bnpChangeBit;
                // (protected) this op (1<<n)
                BigInteger.prototype.changeBit = function (n, op) {
                    var r = BigInteger.ONE.shiftLeft(n);
                    this.bitwiseTo(r, op, r);
                    return r;
                };
                // BigInteger.prototype.addTo = bnpAddTo;
                // (protected) r = this + a
                BigInteger.prototype.addTo = function (a, r) {
                    var i = 0;
                    var c = 0;
                    var m = Math.min(a.t, this.t);
                    while (i < m) {
                        c += this[i] + a[i];
                        r[i++] = c & this.DM;
                        c >>= this.DB;
                    }
                    if (a.t < this.t) {
                        c += a.s;
                        while (i < this.t) {
                            c += this[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        c += this.s;
                    } else {
                        c += this.s;
                        while (i < a.t) {
                            c += a[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        c += a.s;
                    }
                    r.s = (c < 0) ? -1 : 0;
                    if (c > 0) {
                        r[i++] = c;
                    } else if (c < -1) {
                        r[i++] = this.DV + c;
                    }
                    r.t = i;
                    r.clamp();
                };
                // BigInteger.prototype.dMultiply = bnpDMultiply;
                // (protected) this *= n, this >= 0, 1 < n < DV
                BigInteger.prototype.dMultiply = function (n) {
                    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
                    ++this.t;
                    this.clamp();
                };
                // BigInteger.prototype.dAddOffset = bnpDAddOffset;
                // (protected) this += n << w words, this >= 0
                BigInteger.prototype.dAddOffset = function (n, w) {
                    if (n == 0) {
                        return;
                    }
                    while (this.t <= w) {
                        this[this.t++] = 0;
                    }
                    this[w] += n;
                    while (this[w] >= this.DV) {
                        this[w] -= this.DV;
                        if (++w >= this.t) {
                            this[this.t++] = 0;
                        }
                        ++this[w];
                    }
                };
                // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
                // (protected) r = lower n words of "this * a", a.t <= n
                // "this" should be the larger one if appropriate.
                BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
                    var i = Math.min(this.t + a.t, n);
                    r.s = 0; // assumes a,this >= 0
                    r.t = i;
                    while (i > 0) {
                        r[--i] = 0;
                    }
                    for (var j = r.t - this.t; i < j; ++i) {
                        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
                    }
                    for (var j = Math.min(a.t, n); i < j; ++i) {
                        this.am(0, a[i], r, i, 0, n - i);
                    }
                    r.clamp();
                };
                // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
                // (protected) r = "this * a" without lower n words, n > 0
                // "this" should be the larger one if appropriate.
                BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
                    --n;
                    var i = r.t = this.t + a.t - n;
                    r.s = 0; // assumes a,this >= 0
                    while (--i >= 0) {
                        r[i] = 0;
                    }
                    for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
                        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
                    }
                    r.clamp();
                    r.drShiftTo(1, r);
                };
                // BigInteger.prototype.modInt = bnpModInt;
                // (protected) this % n, n < 2^26
                BigInteger.prototype.modInt = function (n) {
                    if (n <= 0) {
                        return 0;
                    }
                    var d = this.DV % n;
                    var r = (this.s < 0) ? n - 1 : 0;
                    if (this.t > 0) {
                        if (d == 0) {
                            r = this[0] % n;
                        } else {
                            for (var i = this.t - 1; i >= 0; --i) {
                                r = (d * r + this[i]) % n;
                            }
                        }
                    }
                    return r;
                };
                // BigInteger.prototype.millerRabin = bnpMillerRabin;
                // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
                BigInteger.prototype.millerRabin = function (t) {
                    var n1 = this.subtract(BigInteger.ONE);
                    var k = n1.getLowestSetBit();
                    if (k <= 0) {
                        return false;
                    }
                    var r = n1.shiftRight(k);
                    t = (t + 1) >> 1;
                    if (t > lowprimes.length) {
                        t = lowprimes.length;
                    }
                    var a = nbi();
                    for (var i = 0; i < t; ++i) {
                        // Pick bases at random, instead of starting at 2
                        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
                        var y = a.modPow(r, this);
                        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                            var j = 1;
                            while (j++ < k && y.compareTo(n1) != 0) {
                                y = y.modPowInt(2, this);
                                if (y.compareTo(BigInteger.ONE) == 0) {
                                    return false;
                                }
                            }
                            if (y.compareTo(n1) != 0) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
                // BigInteger.prototype.square = bnSquare;
                // (public) this^2
                BigInteger.prototype.square = function () {
                    var r = nbi();
                    this.squareTo(r);
                    return r;
                };
                //#region ASYNC
                // Public API method
                BigInteger.prototype.gcda = function (a, callback) {
                    var x = (this.s < 0) ? this.negate() : this.clone();
                    var y = (a.s < 0) ? a.negate() : a.clone();
                    if (x.compareTo(y) < 0) {
                        var t = x;
                        x = y;
                        y = t;
                    }
                    var i = x.getLowestSetBit();
                    var g = y.getLowestSetBit();
                    if (g < 0) {
                        callback(x);
                        return;
                    }
                    if (i < g) {
                        g = i;
                    }
                    if (g > 0) {
                        x.rShiftTo(g, x);
                        y.rShiftTo(g, y);
                    }
                    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
                    var gcda1 = function () {
                        if ((i = x.getLowestSetBit()) > 0) {
                            x.rShiftTo(i, x);
                        }
                        if ((i = y.getLowestSetBit()) > 0) {
                            y.rShiftTo(i, y);
                        }
                        if (x.compareTo(y) >= 0) {
                            x.subTo(y, x);
                            x.rShiftTo(1, x);
                        } else {
                            y.subTo(x, y);
                            y.rShiftTo(1, y);
                        }
                        if (!(x.signum() > 0)) {
                            if (g > 0) {
                                y.lShiftTo(g, y);
                            }
                            setTimeout(function () {
                                callback(y);
                            }, 0); // escape
                        } else {
                            setTimeout(gcda1, 0);
                        }
                    };
                    setTimeout(gcda1, 10);
                };
                // (protected) alternate constructor
                BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
                    if ("number" == typeof b) {
                        if (a < 2) {
                            this.fromInt(1);
                        } else {
                            this.fromNumber(a, c);
                            if (!this.testBit(a - 1)) {
                                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                            }
                            if (this.isEven()) {
                                this.dAddOffset(1, 0);
                            }
                            var bnp_1 = this;
                            var bnpfn1_1 = function () {
                                bnp_1.dAddOffset(2, 0);
                                if (bnp_1.bitLength() > a) {
                                    bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
                                }
                                if (bnp_1.isProbablePrime(b)) {
                                    setTimeout(function () {
                                        callback();
                                    }, 0); // escape
                                } else {
                                    setTimeout(bnpfn1_1, 0);
                                }
                            };
                            setTimeout(bnpfn1_1, 0);
                        }
                    } else {
                        var x = [];
                        var t = a & 7;
                        x.length = (a >> 3) + 1;
                        b.nextBytes(x);
                        if (t > 0) {
                            x[0] &= ((1 << t) - 1);
                        } else {
                            x[0] = 0;
                        }
                        this.fromString(x, 256);
                    }
                };
                return BigInteger;
            }());
            //#region REDUCERS
            //#region NullExp
            var NullExp = /** @class */ (function () {
                function NullExp() {}
                // NullExp.prototype.convert = nNop;
                NullExp.prototype.convert = function (x) {
                    return x;
                };
                // NullExp.prototype.revert = nNop;
                NullExp.prototype.revert = function (x) {
                    return x;
                };
                // NullExp.prototype.mulTo = nMulTo;
                NullExp.prototype.mulTo = function (x, y, r) {
                    x.multiplyTo(y, r);
                };
                // NullExp.prototype.sqrTo = nSqrTo;
                NullExp.prototype.sqrTo = function (x, r) {
                    x.squareTo(r);
                };
                return NullExp;
            }());
            // Modular reduction using "classic" algorithm
            var Classic = /** @class */ (function () {
                function Classic(m) {
                    this.m = m;
                }
                // Classic.prototype.convert = cConvert;
                Classic.prototype.convert = function (x) {
                    if (x.s < 0 || x.compareTo(this.m) >= 0) {
                        return x.mod(this.m);
                    } else {
                        return x;
                    }
                };
                // Classic.prototype.revert = cRevert;
                Classic.prototype.revert = function (x) {
                    return x;
                };
                // Classic.prototype.reduce = cReduce;
                Classic.prototype.reduce = function (x) {
                    x.divRemTo(this.m, null, x);
                };
                // Classic.prototype.mulTo = cMulTo;
                Classic.prototype.mulTo = function (x, y, r) {
                    x.multiplyTo(y, r);
                    this.reduce(r);
                };
                // Classic.prototype.sqrTo = cSqrTo;
                Classic.prototype.sqrTo = function (x, r) {
                    x.squareTo(r);
                    this.reduce(r);
                };
                return Classic;
            }());
            //#endregion
            //#region Montgomery
            // Montgomery reduction
            var Montgomery = /** @class */ (function () {
                function Montgomery(m) {
                    this.m = m;
                    this.mp = m.invDigit();
                    this.mpl = this.mp & 0x7fff;
                    this.mph = this.mp >> 15;
                    this.um = (1 << (m.DB - 15)) - 1;
                    this.mt2 = 2 * m.t;
                }
                // Montgomery.prototype.convert = montConvert;
                // xR mod m
                Montgomery.prototype.convert = function (x) {
                    var r = nbi();
                    x.abs().dlShiftTo(this.m.t, r);
                    r.divRemTo(this.m, null, r);
                    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
                        this.m.subTo(r, r);
                    }
                    return r;
                };
                // Montgomery.prototype.revert = montRevert;
                // x/R mod m
                Montgomery.prototype.revert = function (x) {
                    var r = nbi();
                    x.copyTo(r);
                    this.reduce(r);
                    return r;
                };
                // Montgomery.prototype.reduce = montReduce;
                // x = x/R mod m (HAC 14.32)
                Montgomery.prototype.reduce = function (x) {
                    while (x.t <= this.mt2) {
                        // pad x so am has enough room later
                        x[x.t++] = 0;
                    }
                    for (var i = 0; i < this.m.t; ++i) {
                        // faster way of calculating u0 = x[i]*mp mod DV
                        var j = x[i] & 0x7fff;
                        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
                        // use am to combine the multiply-shift-add into one call
                        j = i + this.m.t;
                        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
                        // propagate carry
                        while (x[j] >= x.DV) {
                            x[j] -= x.DV;
                            x[++j]++;
                        }
                    }
                    x.clamp();
                    x.drShiftTo(this.m.t, x);
                    if (x.compareTo(this.m) >= 0) {
                        x.subTo(this.m, x);
                    }
                };
                // Montgomery.prototype.mulTo = montMulTo;
                // r = "xy/R mod m"; x,y != r
                Montgomery.prototype.mulTo = function (x, y, r) {
                    x.multiplyTo(y, r);
                    this.reduce(r);
                };
                // Montgomery.prototype.sqrTo = montSqrTo;
                // r = "x^2/R mod m"; x != r
                Montgomery.prototype.sqrTo = function (x, r) {
                    x.squareTo(r);
                    this.reduce(r);
                };
                return Montgomery;
            }());
            //#endregion Montgomery
            //#region Barrett
            // Barrett modular reduction
            var Barrett = /** @class */ (function () {
                function Barrett(m) {
                    this.m = m;
                    // setup Barrett
                    this.r2 = nbi();
                    this.q3 = nbi();
                    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
                    this.mu = this.r2.divide(m);
                }
                // Barrett.prototype.convert = barrettConvert;
                Barrett.prototype.convert = function (x) {
                    if (x.s < 0 || x.t > 2 * this.m.t) {
                        return x.mod(this.m);
                    } else if (x.compareTo(this.m) < 0) {
                        return x;
                    } else {
                        var r = nbi();
                        x.copyTo(r);
                        this.reduce(r);
                        return r;
                    }
                };
                // Barrett.prototype.revert = barrettRevert;
                Barrett.prototype.revert = function (x) {
                    return x;
                };
                // Barrett.prototype.reduce = barrettReduce;
                // x = x mod m (HAC 14.42)
                Barrett.prototype.reduce = function (x) {
                    x.drShiftTo(this.m.t - 1, this.r2);
                    if (x.t > this.m.t + 1) {
                        x.t = this.m.t + 1;
                        x.clamp();
                    }
                    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
                    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
                    while (x.compareTo(this.r2) < 0) {
                        x.dAddOffset(1, this.m.t + 1);
                    }
                    x.subTo(this.r2, x);
                    while (x.compareTo(this.m) >= 0) {
                        x.subTo(this.m, x);
                    }
                };
                // Barrett.prototype.mulTo = barrettMulTo;
                // r = x*y mod m; x,y != r
                Barrett.prototype.mulTo = function (x, y, r) {
                    x.multiplyTo(y, r);
                    this.reduce(r);
                };
                // Barrett.prototype.sqrTo = barrettSqrTo;
                // r = x^2 mod m; x != r
                Barrett.prototype.sqrTo = function (x, r) {
                    x.squareTo(r);
                    this.reduce(r);
                };
                return Barrett;
            }());
            //#endregion
            //#endregion REDUCERS
            // return new, unset BigInteger
            function nbi() {
                return new BigInteger(null);
            }

            function parseBigInt(str, r) {
                return new BigInteger(str, r);
            }
            // am: Compute w_j += (x*this_i), propagate carries,
            // c is initial carry, returns final carry.
            // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
            // We need to select the fastest one that works in this environment.
            // am1: use a single mult and divide to get the high bits,
            // max digit bits should be 26 because
            // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
            function am1(i, x, w, j, c, n) {
                while (--n >= 0) {
                    var v = x * this[i++] + w[j] + c;
                    c = Math.floor(v / 0x4000000);
                    w[j++] = v & 0x3ffffff;
                }
                return c;
            }
            // am2 avoids a big mult-and-extract completely.
            // Max digit bits should be <= 30 because we do bitwise ops
            // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
            function am2(i, x, w, j, c, n) {
                var xl = x & 0x7fff;
                var xh = x >> 15;
                while (--n >= 0) {
                    var l = this[i] & 0x7fff;
                    var h = this[i++] >> 15;
                    var m = xh * l + h * xl;
                    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
                    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
                    w[j++] = l & 0x3fffffff;
                }
                return c;
            }
            // Alternately, set max digit bits to 28 since some
            // browsers slow down when dealing with 32-bit numbers.
            function am3(i, x, w, j, c, n) {
                var xl = x & 0x3fff;
                var xh = x >> 14;
                while (--n >= 0) {
                    var l = this[i] & 0x3fff;
                    var h = this[i++] >> 14;
                    var m = xh * l + h * xl;
                    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
                    c = (l >> 28) + (m >> 14) + xh * h;
                    w[j++] = l & 0xfffffff;
                }
                return c;
            }
            if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
                BigInteger.prototype.am = am2;
                dbits = 30;
            } else if (j_lm && (navigator.appName != "Netscape")) {
                BigInteger.prototype.am = am1;
                dbits = 26;
            } else { // Mozilla/Netscape seems to prefer am3
                BigInteger.prototype.am = am3;
                dbits = 28;
            }
            BigInteger.prototype.DB = dbits;
            BigInteger.prototype.DM = ((1 << dbits) - 1);
            BigInteger.prototype.DV = (1 << dbits);
            var BI_FP = 52;
            BigInteger.prototype.FV = Math.pow(2, BI_FP);
            BigInteger.prototype.F1 = BI_FP - dbits;
            BigInteger.prototype.F2 = 2 * dbits - BI_FP;
            // Digit conversions
            var BI_RC = [];
            var rr;
            var vv;
            rr = "0".charCodeAt(0);
            for (vv = 0; vv <= 9; ++vv) {
                BI_RC[rr++] = vv;
            }
            rr = "a".charCodeAt(0);
            for (vv = 10; vv < 36; ++vv) {
                BI_RC[rr++] = vv;
            }
            rr = "A".charCodeAt(0);
            for (vv = 10; vv < 36; ++vv) {
                BI_RC[rr++] = vv;
            }

            function intAt(s, i) {
                var c = BI_RC[s.charCodeAt(i)];
                return (c == null) ? -1 : c;
            }
            // return bigint initialized to value
            function nbv(i) {
                var r = nbi();
                r.fromInt(i);
                return r;
            }
            // returns bit length of the integer x
            function nbits(x) {
                var r = 1;
                var t;
                if ((t = x >>> 16) != 0) {
                    x = t;
                    r += 16;
                }
                if ((t = x >> 8) != 0) {
                    x = t;
                    r += 8;
                }
                if ((t = x >> 4) != 0) {
                    x = t;
                    r += 4;
                }
                if ((t = x >> 2) != 0) {
                    x = t;
                    r += 2;
                }
                if ((t = x >> 1) != 0) {
                    x = t;
                    r += 1;
                }
                return r;
            }
            // "constants"
            BigInteger.ZERO = nbv(0);
            BigInteger.ONE = nbv(1);

            // prng4.js - uses Arcfour as a PRNG
            var Arcfour = /** @class */ (function () {
                function Arcfour() {
                    this.i = 0;
                    this.j = 0;
                    this.S = [];
                }
                // Arcfour.prototype.init = ARC4init;
                // Initialize arcfour context from key, an array of ints, each from [0..255]
                Arcfour.prototype.init = function (key) {
                    var i;
                    var j;
                    var t;
                    for (i = 0; i < 256; ++i) {
                        this.S[i] = i;
                    }
                    j = 0;
                    for (i = 0; i < 256; ++i) {
                        j = (j + this.S[i] + key[i % key.length]) & 255;
                        t = this.S[i];
                        this.S[i] = this.S[j];
                        this.S[j] = t;
                    }
                    this.i = 0;
                    this.j = 0;
                };
                // Arcfour.prototype.next = ARC4next;
                Arcfour.prototype.next = function () {
                    var t;
                    this.i = (this.i + 1) & 255;
                    this.j = (this.j + this.S[this.i]) & 255;
                    t = this.S[this.i];
                    this.S[this.i] = this.S[this.j];
                    this.S[this.j] = t;
                    return this.S[(t + this.S[this.i]) & 255];
                };
                return Arcfour;
            }());
            // Plug in your RNG constructor here
            function prng_newstate() {
                return new Arcfour();
            }
            // Pool size must be a multiple of 4 and greater than 32.
            // An array of bytes the size of the pool will be passed to init()
            var rng_psize = 256;

            // Random number generator - requires a PRNG backend, e.g. prng4.js
            var rng_state;
            var rng_pool = null;
            var rng_pptr;
            // Initialize the pool with junk if needed.
            if (rng_pool == null) {
                rng_pool = [];
                rng_pptr = 0;
                var t = void 0;
                if (window.crypto && window.crypto.getRandomValues) {
                    // Extract entropy (2048 bits) from RNG if available
                    var z = new Uint32Array(256);
                    window.crypto.getRandomValues(z);
                    for (t = 0; t < z.length; ++t) {
                        rng_pool[rng_pptr++] = z[t] & 255;
                    }
                }
                // Use mouse events for entropy, if we do not have enough entropy by the time
                // we need it, entropy will be generated by Math.random.
                var onMouseMoveListener_1 = function (ev) {
                    this.count = this.count || 0;
                    if (this.count >= 256 || rng_pptr >= rng_psize) {
                        if (window.removeEventListener) {
                            window.removeEventListener("mousemove", onMouseMoveListener_1, false);
                        } else if (window.detachEvent) {
                            window.detachEvent("onmousemove", onMouseMoveListener_1);
                        }
                        return;
                    }
                    try {
                        var mouseCoordinates = ev.x + ev.y;
                        rng_pool[rng_pptr++] = mouseCoordinates & 255;
                        this.count += 1;
                    } catch (e) {
                        // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
                    }
                };
                if (window.addEventListener) {
                    window.addEventListener("mousemove", onMouseMoveListener_1, false);
                } else if (window.attachEvent) {
                    window.attachEvent("onmousemove", onMouseMoveListener_1);
                }
            }

            function rng_get_byte() {
                if (rng_state == null) {
                    rng_state = prng_newstate();
                    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
                    while (rng_pptr < rng_psize) {
                        var random = Math.floor(65536 * Math.random());
                        rng_pool[rng_pptr++] = random & 255;
                    }
                    rng_state.init(rng_pool);
                    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
                        rng_pool[rng_pptr] = 0;
                    }
                    rng_pptr = 0;
                }
                // TODO: allow reseeding after first request
                return rng_state.next();
            }
            var SecureRandom = /** @class */ (function () {
                function SecureRandom() {}
                SecureRandom.prototype.nextBytes = function (ba) {
                    for (var i = 0; i < ba.length; ++i) {
                        ba[i] = rng_get_byte();
                    }
                };
                return SecureRandom;
            }());

            // Depends on jsbn.js and rng.js
            // function linebrk(s,n) {
            //   var ret = "";
            //   var i = 0;
            //   while(i + n < s.length) {
            //     ret += s.substring(i,i+n) + "\n";
            //     i += n;
            //   }
            //   return ret + s.substring(i,s.length);
            // }
            // function byte2Hex(b) {
            //   if(b < 0x10)
            //     return "0" + b.toString(16);
            //   else
            //     return b.toString(16);
            // }
            function pkcs1pad1(s, n) {
                if (n < s.length + 22) {
                    console.error("Message too long for RSA");
                    return null;
                }
                var len = n - s.length - 6;
                var filler = "";
                for (var f = 0; f < len; f += 2) {
                    filler += "ff";
                }
                var m = "0001" + filler + "00" + s;
                return parseBigInt(m, 16);
            }
            // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
            function pkcs1pad2(s, n) {
                if (n < s.length + 11) { // TODO: fix for utf-8
                    console.error("Message too long for RSA");
                    return null;
                }
                var ba = [];
                var i = s.length - 1;
                while (i >= 0 && n > 0) {
                    var c = s.charCodeAt(i--);
                    if (c < 128) { // encode using utf-8
                        ba[--n] = c;
                    } else if ((c > 127) && (c < 2048)) {
                        ba[--n] = (c & 63) | 128;
                        ba[--n] = (c >> 6) | 192;
                    } else {
                        ba[--n] = (c & 63) | 128;
                        ba[--n] = ((c >> 6) & 63) | 128;
                        ba[--n] = (c >> 12) | 224;
                    }
                }
                ba[--n] = 0;
                var rng = new SecureRandom();
                var x = [];
                while (n > 2) { // random non-zero pad
                    x[0] = 0;
                    while (x[0] == 0) {
                        rng.nextBytes(x);
                    }
                    ba[--n] = x[0];
                }
                ba[--n] = 2;
                ba[--n] = 0;
                return new BigInteger(ba);
            }
            // "empty" RSA key constructor
            var RSAKey = /** @class */ (function () {
                function RSAKey() {
                    this.n = null;
                    this.e = 0;
                    this.d = null;
                    this.p = null;
                    this.q = null;
                    this.dmp1 = null;
                    this.dmq1 = null;
                    this.coeff = null;
                }
                //#region PROTECTED
                // protected
                // RSAKey.prototype.doPublic = RSADoPublic;
                // Perform raw public operation on "x": return x^e (mod n)
                RSAKey.prototype.doPublic = function (x) {
                    return x.modPowInt(this.e, this.n);
                };
                // RSAKey.prototype.doPrivate = RSADoPrivate;
                // Perform raw private operation on "x": return x^d (mod n)
                RSAKey.prototype.doPrivate = function (x) {
                    if (this.p == null || this.q == null) {
                        return x.modPow(this.d, this.n);
                    }
                    // TODO: re-calculate any missing CRT params
                    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
                    var xq = x.mod(this.q).modPow(this.dmq1, this.q);
                    while (xp.compareTo(xq) < 0) {
                        xp = xp.add(this.p);
                    }
                    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
                };
                //#endregion PROTECTED
                //#region PUBLIC
                // RSAKey.prototype.setPublic = RSASetPublic;
                // Set the public key fields N and e from hex strings
                RSAKey.prototype.setPublic = function (N, E) {
                    if (N != null && E != null && N.length > 0 && E.length > 0) {
                        this.n = parseBigInt(N, 16);
                        this.e = parseInt(E, 16);
                    } else {
                        console.error("Invalid RSA public key");
                    }
                };
                // RSAKey.prototype.encrypt = RSAEncrypt;
                // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
                RSAKey.prototype.encrypt = function (text) {
                    var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
                    if (m == null) {
                        return null;
                    }
                    var c = this.doPublic(m);
                    if (c == null) {
                        return null;
                    }
                    var h = c.toString(16);
                    if ((h.length & 1) == 0) {
                        return h;
                    } else {
                        return "0" + h;
                    }
                };
                // RSAKey.prototype.setPrivate = RSASetPrivate;
                // Set the private key fields N, e, and d from hex strings
                RSAKey.prototype.setPrivate = function (N, E, D) {
                    if (N != null && E != null && N.length > 0 && E.length > 0) {
                        this.n = parseBigInt(N, 16);
                        this.e = parseInt(E, 16);
                        this.d = parseBigInt(D, 16);
                    } else {
                        console.error("Invalid RSA private key");
                    }
                };
                // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
                // Set the private key fields N, e, d and CRT params from hex strings
                RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
                    if (N != null && E != null && N.length > 0 && E.length > 0) {
                        this.n = parseBigInt(N, 16);
                        this.e = parseInt(E, 16);
                        this.d = parseBigInt(D, 16);
                        this.p = parseBigInt(P, 16);
                        this.q = parseBigInt(Q, 16);
                        this.dmp1 = parseBigInt(DP, 16);
                        this.dmq1 = parseBigInt(DQ, 16);
                        this.coeff = parseBigInt(C, 16);
                    } else {
                        console.error("Invalid RSA private key");
                    }
                };
                // RSAKey.prototype.generate = RSAGenerate;
                // Generate a new random private key B bits long, using public expt E
                RSAKey.prototype.generate = function (B, E) {
                    var rng = new SecureRandom();
                    var qs = B >> 1;
                    this.e = parseInt(E, 16);
                    var ee = new BigInteger(E, 16);
                    for (;;) {
                        for (;;) {
                            this.p = new BigInteger(B - qs, 1, rng);
                            if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                                break;
                            }
                        }
                        for (;;) {
                            this.q = new BigInteger(qs, 1, rng);
                            if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                                break;
                            }
                        }
                        if (this.p.compareTo(this.q) <= 0) {
                            var t = this.p;
                            this.p = this.q;
                            this.q = t;
                        }
                        var p1 = this.p.subtract(BigInteger.ONE);
                        var q1 = this.q.subtract(BigInteger.ONE);
                        var phi = p1.multiply(q1);
                        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                            this.n = this.p.multiply(this.q);
                            this.d = ee.modInverse(phi);
                            this.dmp1 = this.d.mod(p1);
                            this.dmq1 = this.d.mod(q1);
                            this.coeff = this.q.modInverse(this.p);
                            break;
                        }
                    }
                };
                // RSAKey.prototype.decrypt = RSADecrypt;
                // Return the PKCS#1 RSA decryption of "ctext".
                // "ctext" is an even-length hex string and the output is a plain string.
                RSAKey.prototype.decrypt = function (ctext) {
                    var c = parseBigInt(ctext, 16);
                    var m = this.doPrivate(c);
                    if (m == null) {
                        return null;
                    }
                    return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);
                };
                // Generate a new random private key B bits long, using public expt E
                RSAKey.prototype.generateAsync = function (B, E, callback) {
                    var rng = new SecureRandom();
                    var qs = B >> 1;
                    this.e = parseInt(E, 16);
                    var ee = new BigInteger(E, 16);
                    var rsa = this;
                    // These functions have non-descript names because they were originally for(;;) loops.
                    // I don't know about cryptography to give them better names than loop1-4.
                    var loop1 = function () {
                        var loop4 = function () {
                            if (rsa.p.compareTo(rsa.q) <= 0) {
                                var t = rsa.p;
                                rsa.p = rsa.q;
                                rsa.q = t;
                            }
                            var p1 = rsa.p.subtract(BigInteger.ONE);
                            var q1 = rsa.q.subtract(BigInteger.ONE);
                            var phi = p1.multiply(q1);
                            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                                rsa.n = rsa.p.multiply(rsa.q);
                                rsa.d = ee.modInverse(phi);
                                rsa.dmp1 = rsa.d.mod(p1);
                                rsa.dmq1 = rsa.d.mod(q1);
                                rsa.coeff = rsa.q.modInverse(rsa.p);
                                setTimeout(function () {
                                    callback();
                                }, 0); // escape
                            } else {
                                setTimeout(loop1, 0);
                            }
                        };
                        var loop3 = function () {
                            rsa.q = nbi();
                            rsa.q.fromNumberAsync(qs, 1, rng, function () {
                                rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
                                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                                        setTimeout(loop4, 0);
                                    } else {
                                        setTimeout(loop3, 0);
                                    }
                                });
                            });
                        };
                        var loop2 = function () {
                            rsa.p = nbi();
                            rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
                                rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
                                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                                        setTimeout(loop3, 0);
                                    } else {
                                        setTimeout(loop2, 0);
                                    }
                                });
                            });
                        };
                        setTimeout(loop2, 0);
                    };
                    setTimeout(loop1, 0);
                };
                RSAKey.prototype.sign = function (text, digestMethod, digestName) {
                    var header = getDigestHeader(digestName);
                    var digest = header + digestMethod(text).toString();
                    var m = pkcs1pad1(digest, this.n.bitLength() / 4);
                    if (m == null) {
                        return null;
                    }
                    var c = this.doPrivate(m);
                    if (c == null) {
                        return null;
                    }
                    var h = c.toString(16);
                    if ((h.length & 1) == 0) {
                        return h;
                    } else {
                        return "0" + h;
                    }
                };
                RSAKey.prototype.verify = function (text, signature, digestMethod) {
                    var c = parseBigInt(signature, 16);
                    var m = this.doPublic(c);
                    if (m == null) {
                        return null;
                    }
                    var unpadded = m.toString(16).replace(/^1f+00/, "");
                    var digest = removeDigestHeader(unpadded);
                    return digest == digestMethod(text).toString();
                };
                return RSAKey;
            }());
            // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
            function pkcs1unpad2(d, n) {
                var b = d.toByteArray();
                var i = 0;
                while (i < b.length && b[i] == 0) {
                    ++i;
                }
                if (b.length - i != n - 1 || b[i] != 2) {
                    return null;
                }
                ++i;
                while (b[i] != 0) {
                    if (++i >= b.length) {
                        return null;
                    }
                }
                var ret = "";
                while (++i < b.length) {
                    var c = b[i] & 255;
                    if (c < 128) { // utf-8 decode
                        ret += String.fromCharCode(c);
                    } else if ((c > 191) && (c < 224)) {
                        ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
                        ++i;
                    } else {
                        ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
                        i += 2;
                    }
                }
                return ret;
            }
            // https://tools.ietf.org/html/rfc3447#page-43
            var DIGEST_HEADERS = {
                md2: "3020300c06082a864886f70d020205000410",
                md5: "3020300c06082a864886f70d020505000410",
                sha1: "3021300906052b0e03021a05000414",
                sha224: "302d300d06096086480165030402040500041c",
                sha256: "3031300d060960864801650304020105000420",
                sha384: "3041300d060960864801650304020205000430",
                sha512: "3051300d060960864801650304020305000440",
                ripemd160: "3021300906052b2403020105000414",
            };

            function getDigestHeader(name) {
                return DIGEST_HEADERS[name] || "";
            }

            function removeDigestHeader(str) {
                for (var name_1 in DIGEST_HEADERS) {
                    if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
                        var header = DIGEST_HEADERS[name_1];
                        var len = header.length;
                        if (str.substr(0, len) == header) {
                            return str.substr(len);
                        }
                    }
                }
                return str;
            }
            // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
            // function RSAEncryptB64(text) {
            //  var h = this.encrypt(text);
            //  if(h) return hex2b64(h); else return null;
            // }
            // public
            // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

            /*!
            Copyright (c) 2011, Yahoo! Inc. All rights reserved.
            Code licensed under the BSD License:
            http://developer.yahoo.com/yui/license.html
            version: 2.9.0
            */
            var YAHOO = {};
            YAHOO.lang = {
                /**
                 * Utility to set up the prototype, constructor and superclass properties to
                 * support an inheritance strategy that can chain constructors and methods.
                 * Static members will not be inherited.
                 *
                 * @method extend
                 * @static
                 * @param {Function} subc   the object to modify
                 * @param {Function} superc the object to inherit
                 * @param {Object} overrides  additional properties/methods to add to the
                 *                              subclass prototype.  These will override the
                 *                              matching items obtained from the superclass
                 *                              if present.
                 */
                extend: function (subc, superc, overrides) {
                    if (!superc || !subc) {
                        throw new Error("YAHOO.lang.extend failed, please check that " +
                            "all dependencies are included.");
                    }

                    var F = function () {};
                    F.prototype = superc.prototype;
                    subc.prototype = new F();
                    subc.prototype.constructor = subc;
                    subc.superclass = superc.prototype;

                    if (superc.prototype.constructor == Object.prototype.constructor) {
                        superc.prototype.constructor = superc;
                    }

                    if (overrides) {
                        var i;
                        for (i in overrides) {
                            subc.prototype[i] = overrides[i];
                        }

                        /*
                         * IE will not enumerate native functions in a derived object even if the
                         * function was overridden.  This is a workaround for specific functions
                         * we care about on the Object prototype.
                         * @property _IEEnumFix
                         * @param {Function} r  the object to receive the augmentation
                         * @param {Function} s  the object that supplies the properties to augment
                         * @static
                         * @private
                         */
                        var _IEEnumFix = function () {},
                            ADD = ["toString", "valueOf"];
                        try {
                            if (/MSIE/.test(navigator.userAgent)) {
                                _IEEnumFix = function (r, s) {
                                    for (i = 0; i < ADD.length; i = i + 1) {
                                        var fname = ADD[i],
                                            f = s[fname];
                                        if (typeof f === 'function' && f != Object.prototype[fname]) {
                                            r[fname] = f;
                                        }
                                    }
                                };
                            }
                        } catch (ex) {}
                        _IEEnumFix(subc.prototype, overrides);
                    }
                }
            };

            /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
             */

            /**
             * @fileOverview
             * @name asn1-1.0.js
             * @author Kenji Urushima kenji.urushima@gmail.com
             * @version asn1 1.0.13 (2017-Jun-02)
             * @since jsrsasign 2.1
             * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
             */

            /**
             * kjur's class library name space
             * <p>
             * This name space provides following name spaces:
             * <ul>
             * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
             * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
             * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
             * class and utilities</li>
             * </ul>
             * </p>
             * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
             * @name KJUR
             * @namespace kjur's class library name space
             */
            var KJUR = {};

            /**
             * kjur's ASN.1 class library name space
             * <p>
             * This is ITU-T X.690 ASN.1 DER encoder class library and
             * class structure and methods is very similar to
             * org.bouncycastle.asn1 package of
             * well known BouncyCaslte Cryptography Library.
             * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
             * Here are ASN.1 DER primitive classes.
             * <ul>
             * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
             * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
             * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
             * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
             * <li>0x05 {@link KJUR.asn1.DERNull}</li>
             * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
             * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
             * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
             * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
             * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
             * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
             * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
             * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
             * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
             * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
             * <li>0x31 {@link KJUR.asn1.DERSet}</li>
             * </ul>
             * <h4>OTHER ASN.1 CLASSES</h4>
             * <ul>
             * <li>{@link KJUR.asn1.ASN1Object}</li>
             * <li>{@link KJUR.asn1.DERAbstractString}</li>
             * <li>{@link KJUR.asn1.DERAbstractTime}</li>
             * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
             * <li>{@link KJUR.asn1.DERTaggedObject}</li>
             * </ul>
             * <h4>SUB NAME SPACES</h4>
             * <ul>
             * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
             * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
             * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
             * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
             * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
             * </ul>
             * </p>
             * NOTE: Please ignore method summary and document of this namespace.
             * This caused by a bug of jsdoc2.
             * @name KJUR.asn1
             * @namespace
             */
            if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

            /**
             * ASN1 utilities class
             * @name KJUR.asn1.ASN1Util
             * @class ASN1 utilities class
             * @since asn1 1.0.2
             */
            KJUR.asn1.ASN1Util = new function () {
                this.integerToByteHex = function (i) {
                    var h = i.toString(16);
                    if ((h.length % 2) == 1) h = '0' + h;
                    return h;
                };
                this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
                    var h = bigIntegerValue.toString(16);
                    if (h.substr(0, 1) != '-') {
                        if (h.length % 2 == 1) {
                            h = '0' + h;
                        } else {
                            if (!h.match(/^[0-7]/)) {
                                h = '00' + h;
                            }
                        }
                    } else {
                        var hPos = h.substr(1);
                        var xorLen = hPos.length;
                        if (xorLen % 2 == 1) {
                            xorLen += 1;
                        } else {
                            if (!h.match(/^[0-7]/)) {
                                xorLen += 2;
                            }
                        }
                        var hMask = '';
                        for (var i = 0; i < xorLen; i++) {
                            hMask += 'f';
                        }
                        var biMask = new BigInteger(hMask, 16);
                        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
                        h = biNeg.toString(16).replace(/^-/, '');
                    }
                    return h;
                };
                /**
                 * get PEM string from hexadecimal data and header string
                 * @name getPEMStringFromHex
                 * @memberOf KJUR.asn1.ASN1Util
                 * @function
                 * @param {String} dataHex hexadecimal string of PEM body
                 * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
                 * @return {String} PEM formatted string of input data
                 * @description
                 * This method converts a hexadecimal string to a PEM string with
                 * a specified header. Its line break will be CRLF("\r\n").
                 * @example
                 * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
                 * // value of pem will be:
                 * -----BEGIN PRIVATE KEY-----
                 * YWFh
                 * -----END PRIVATE KEY-----
                 */
                this.getPEMStringFromHex = function (dataHex, pemHeader) {
                    return hextopem(dataHex, pemHeader);
                };

                /**
                 * generate ASN1Object specifed by JSON parameters
                 * @name newObject
                 * @memberOf KJUR.asn1.ASN1Util
                 * @function
                 * @param {Array} param JSON parameter to generate ASN1Object
                 * @return {KJUR.asn1.ASN1Object} generated object
                 * @since asn1 1.0.3
                 * @description
                 * generate any ASN1Object specified by JSON param
                 * including ASN.1 primitive or structured.
                 * Generally 'param' can be described as follows:
                 * <blockquote>
                 * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
                 * </blockquote>
                 * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
                 * <ul>
                 * <li>'bool' - DERBoolean</li>
                 * <li>'int' - DERInteger</li>
                 * <li>'bitstr' - DERBitString</li>
                 * <li>'octstr' - DEROctetString</li>
                 * <li>'null' - DERNull</li>
                 * <li>'oid' - DERObjectIdentifier</li>
                 * <li>'enum' - DEREnumerated</li>
                 * <li>'utf8str' - DERUTF8String</li>
                 * <li>'numstr' - DERNumericString</li>
                 * <li>'prnstr' - DERPrintableString</li>
                 * <li>'telstr' - DERTeletexString</li>
                 * <li>'ia5str' - DERIA5String</li>
                 * <li>'utctime' - DERUTCTime</li>
                 * <li>'gentime' - DERGeneralizedTime</li>
                 * <li>'seq' - DERSequence</li>
                 * <li>'set' - DERSet</li>
                 * <li>'tag' - DERTaggedObject</li>
                 * </ul>
                 * @example
                 * newObject({'prnstr': 'aaa'});
                 * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
                 * // ASN.1 Tagged Object
                 * newObject({'tag': {'tag': 'a1',
                 *                    'explicit': true,
                 *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
                 * // more simple representation of ASN.1 Tagged Object
                 * newObject({'tag': ['a1',
                 *                    true,
                 *                    {'seq': [
                 *                      {'int': 3},
                 *                      {'prnstr': 'aaa'}]}
                 *                   ]});
                 */
                this.newObject = function (param) {
                    var _KJUR = KJUR,
                        _KJUR_asn1 = _KJUR.asn1,
                        _DERBoolean = _KJUR_asn1.DERBoolean,
                        _DERInteger = _KJUR_asn1.DERInteger,
                        _DERBitString = _KJUR_asn1.DERBitString,
                        _DEROctetString = _KJUR_asn1.DEROctetString,
                        _DERNull = _KJUR_asn1.DERNull,
                        _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
                        _DEREnumerated = _KJUR_asn1.DEREnumerated,
                        _DERUTF8String = _KJUR_asn1.DERUTF8String,
                        _DERNumericString = _KJUR_asn1.DERNumericString,
                        _DERPrintableString = _KJUR_asn1.DERPrintableString,
                        _DERTeletexString = _KJUR_asn1.DERTeletexString,
                        _DERIA5String = _KJUR_asn1.DERIA5String,
                        _DERUTCTime = _KJUR_asn1.DERUTCTime,
                        _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
                        _DERSequence = _KJUR_asn1.DERSequence,
                        _DERSet = _KJUR_asn1.DERSet,
                        _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
                        _newObject = _KJUR_asn1.ASN1Util.newObject;

                    var keys = Object.keys(param);
                    if (keys.length != 1)
                        throw "key of param shall be only one.";
                    var key = keys[0];

                    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
                        throw "undefined key: " + key;

                    if (key == "bool") return new _DERBoolean(param[key]);
                    if (key == "int") return new _DERInteger(param[key]);
                    if (key == "bitstr") return new _DERBitString(param[key]);
                    if (key == "octstr") return new _DEROctetString(param[key]);
                    if (key == "null") return new _DERNull(param[key]);
                    if (key == "oid") return new _DERObjectIdentifier(param[key]);
                    if (key == "enum") return new _DEREnumerated(param[key]);
                    if (key == "utf8str") return new _DERUTF8String(param[key]);
                    if (key == "numstr") return new _DERNumericString(param[key]);
                    if (key == "prnstr") return new _DERPrintableString(param[key]);
                    if (key == "telstr") return new _DERTeletexString(param[key]);
                    if (key == "ia5str") return new _DERIA5String(param[key]);
                    if (key == "utctime") return new _DERUTCTime(param[key]);
                    if (key == "gentime") return new _DERGeneralizedTime(param[key]);

                    if (key == "seq") {
                        var paramList = param[key];
                        var a = [];
                        for (var i = 0; i < paramList.length; i++) {
                            var asn1Obj = _newObject(paramList[i]);
                            a.push(asn1Obj);
                        }
                        return new _DERSequence({
                            'array': a
                        });
                    }

                    if (key == "set") {
                        var paramList = param[key];
                        var a = [];
                        for (var i = 0; i < paramList.length; i++) {
                            var asn1Obj = _newObject(paramList[i]);
                            a.push(asn1Obj);
                        }
                        return new _DERSet({
                            'array': a
                        });
                    }

                    if (key == "tag") {
                        var tagParam = param[key];
                        if (Object.prototype.toString.call(tagParam) === '[object Array]' &&
                            tagParam.length == 3) {
                            var obj = _newObject(tagParam[2]);
                            return new _DERTaggedObject({
                                tag: tagParam[0],
                                explicit: tagParam[1],
                                obj: obj
                            });
                        } else {
                            var newParam = {};
                            if (tagParam.explicit !== undefined)
                                newParam.explicit = tagParam.explicit;
                            if (tagParam.tag !== undefined)
                                newParam.tag = tagParam.tag;
                            if (tagParam.obj === undefined)
                                throw "obj shall be specified for 'tag'.";
                            newParam.obj = _newObject(tagParam.obj);
                            return new _DERTaggedObject(newParam);
                        }
                    }
                };

                /**
                 * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
                 * @name jsonToASN1HEX
                 * @memberOf KJUR.asn1.ASN1Util
                 * @function
                 * @param {Array} param JSON parameter to generate ASN1Object
                 * @return hexadecimal string of ASN1Object
                 * @since asn1 1.0.4
                 * @description
                 * As for ASN.1 object representation of JSON object,
                 * please see {@link newObject}.
                 * @example
                 * jsonToASN1HEX({'prnstr': 'aaa'});
                 */
                this.jsonToASN1HEX = function (param) {
                    var asn1Obj = this.newObject(param);
                    return asn1Obj.getEncodedHex();
                };
            };

            /**
             * get dot noted oid number string from hexadecimal value of OID
             * @name oidHexToInt
             * @memberOf KJUR.asn1.ASN1Util
             * @function
             * @param {String} hex hexadecimal value of object identifier
             * @return {String} dot noted string of object identifier
             * @since jsrsasign 4.8.3 asn1 1.0.7
             * @description
             * This static method converts from hexadecimal string representation of
             * ASN.1 value of object identifier to oid number string.
             * @example
             * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
             */
            KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
                var s = "";
                var i01 = parseInt(hex.substr(0, 2), 16);
                var i0 = Math.floor(i01 / 40);
                var i1 = i01 % 40;
                var s = i0 + "." + i1;

                var binbuf = "";
                for (var i = 2; i < hex.length; i += 2) {
                    var value = parseInt(hex.substr(i, 2), 16);
                    var bin = ("00000000" + value.toString(2)).slice(-8);
                    binbuf = binbuf + bin.substr(1, 7);
                    if (bin.substr(0, 1) == "0") {
                        var bi = new BigInteger(binbuf, 2);
                        s = s + "." + bi.toString(10);
                        binbuf = "";
                    }
                }
                return s;
            };

            /**
             * get hexadecimal value of object identifier from dot noted oid value
             * @name oidIntToHex
             * @memberOf KJUR.asn1.ASN1Util
             * @function
             * @param {String} oidString dot noted string of object identifier
             * @return {String} hexadecimal value of object identifier
             * @since jsrsasign 4.8.3 asn1 1.0.7
             * @description
             * This static method converts from object identifier value string.
             * to hexadecimal string representation of it.
             * @example
             * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
             */
            KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
                var itox = function (i) {
                    var h = i.toString(16);
                    if (h.length == 1) h = '0' + h;
                    return h;
                };

                var roidtox = function (roid) {
                    var h = '';
                    var bi = new BigInteger(roid, 10);
                    var b = bi.toString(2);
                    var padLen = 7 - b.length % 7;
                    if (padLen == 7) padLen = 0;
                    var bPad = '';
                    for (var i = 0; i < padLen; i++) bPad += '0';
                    b = bPad + b;
                    for (var i = 0; i < b.length - 1; i += 7) {
                        var b8 = b.substr(i, 7);
                        if (i != b.length - 7) b8 = '1' + b8;
                        h += itox(parseInt(b8, 2));
                    }
                    return h;
                };

                if (!oidString.match(/^[0-9.]+$/)) {
                    throw "malformed oid string: " + oidString;
                }
                var h = '';
                var a = oidString.split('.');
                var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
                h += itox(i0);
                a.splice(0, 2);
                for (var i = 0; i < a.length; i++) {
                    h += roidtox(a[i]);
                }
                return h;
            };


            // ********************************************************************
            //  Abstract ASN.1 Classes
            // ********************************************************************

            // ********************************************************************

            /**
             * base class for ASN.1 DER encoder object
             * @name KJUR.asn1.ASN1Object
             * @class base class for ASN.1 DER encoder object
             * @property {Boolean} isModified flag whether internal data was changed
             * @property {String} hTLV hexadecimal string of ASN.1 TLV
             * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
             * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
             * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
             * @description
             */
            KJUR.asn1.ASN1Object = function () {
                var hV = '';

                /**
                 * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
                 * @name getLengthHexFromValue
                 * @memberOf KJUR.asn1.ASN1Object#
                 * @function
                 * @return {String} hexadecimal string of ASN.1 TLV length(L)
                 */
                this.getLengthHexFromValue = function () {
                    if (typeof this.hV == "undefined" || this.hV == null) {
                        throw "this.hV is null or undefined.";
                    }
                    if (this.hV.length % 2 == 1) {
                        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
                    }
                    var n = this.hV.length / 2;
                    var hN = n.toString(16);
                    if (hN.length % 2 == 1) {
                        hN = "0" + hN;
                    }
                    if (n < 128) {
                        return hN;
                    } else {
                        var hNlen = hN.length / 2;
                        if (hNlen > 15) {
                            throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
                        }
                        var head = 128 + hNlen;
                        return head.toString(16) + hN;
                    }
                };

                /**
                 * get hexadecimal string of ASN.1 TLV bytes
                 * @name getEncodedHex
                 * @memberOf KJUR.asn1.ASN1Object#
                 * @function
                 * @return {String} hexadecimal string of ASN.1 TLV
                 */
                this.getEncodedHex = function () {
                    if (this.hTLV == null || this.isModified) {
                        this.hV = this.getFreshValueHex();
                        this.hL = this.getLengthHexFromValue();
                        this.hTLV = this.hT + this.hL + this.hV;
                        this.isModified = false;
                        //alert("first time: " + this.hTLV);
                    }
                    return this.hTLV;
                };

                /**
                 * get hexadecimal string of ASN.1 TLV value(V) bytes
                 * @name getValueHex
                 * @memberOf KJUR.asn1.ASN1Object#
                 * @function
                 * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
                 */
                this.getValueHex = function () {
                    this.getEncodedHex();
                    return this.hV;
                };

                this.getFreshValueHex = function () {
                    return '';
                };
            };

            // == BEGIN DERAbstractString ================================================
            /**
             * base class for ASN.1 DER string classes
             * @name KJUR.asn1.DERAbstractString
             * @class base class for ASN.1 DER string classes
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @property {String} s internal string of value
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>str - specify initial ASN.1 value(V) by a string</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             */
            KJUR.asn1.DERAbstractString = function (params) {
                KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

                /**
                 * get string value of this string object
                 * @name getString
                 * @memberOf KJUR.asn1.DERAbstractString#
                 * @function
                 * @return {String} string value of this string object
                 */
                this.getString = function () {
                    return this.s;
                };

                /**
                 * set value by a string
                 * @name setString
                 * @memberOf KJUR.asn1.DERAbstractString#
                 * @function
                 * @param {String} newS value by a string to set
                 */
                this.setString = function (newS) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.s = newS;
                    this.hV = stohex(this.s);
                };

                /**
                 * set value by a hexadecimal string
                 * @name setStringHex
                 * @memberOf KJUR.asn1.DERAbstractString#
                 * @function
                 * @param {String} newHexString value by a hexadecimal string to set
                 */
                this.setStringHex = function (newHexString) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.s = null;
                    this.hV = newHexString;
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params == "string") {
                        this.setString(params);
                    } else if (typeof params['str'] != "undefined") {
                        this.setString(params['str']);
                    } else if (typeof params['hex'] != "undefined") {
                        this.setStringHex(params['hex']);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
            // == END   DERAbstractString ================================================

            // == BEGIN DERAbstractTime ==================================================
            /**
             * base class for ASN.1 DER Generalized/UTCTime class
             * @name KJUR.asn1.DERAbstractTime
             * @class base class for ASN.1 DER Generalized/UTCTime class
             * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
             * @extends KJUR.asn1.ASN1Object
             * @description
             * @see KJUR.asn1.ASN1Object - superclass
             */
            KJUR.asn1.DERAbstractTime = function (params) {
                KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);

                // --- PRIVATE METHODS --------------------
                this.localDateToUTC = function (d) {
                    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                    var utcDate = new Date(utc);
                    return utcDate;
                };

                /*
                 * format date string by Data object
                 * @name formatDate
                 * @memberOf KJUR.asn1.AbstractTime;
                 * @param {Date} dateObject
                 * @param {string} type 'utc' or 'gen'
                 * @param {boolean} withMillis flag for with millisections or not
                 * @description
                 * 'withMillis' flag is supported from asn1 1.0.6.
                 */
                this.formatDate = function (dateObject, type, withMillis) {
                    var pad = this.zeroPadding;
                    var d = this.localDateToUTC(dateObject);
                    var year = String(d.getFullYear());
                    if (type == 'utc') year = year.substr(2, 2);
                    var month = pad(String(d.getMonth() + 1), 2);
                    var day = pad(String(d.getDate()), 2);
                    var hour = pad(String(d.getHours()), 2);
                    var min = pad(String(d.getMinutes()), 2);
                    var sec = pad(String(d.getSeconds()), 2);
                    var s = year + month + day + hour + min + sec;
                    if (withMillis === true) {
                        var millis = d.getMilliseconds();
                        if (millis != 0) {
                            var sMillis = pad(String(millis), 3);
                            sMillis = sMillis.replace(/[0]+$/, "");
                            s = s + "." + sMillis;
                        }
                    }
                    return s + "Z";
                };

                this.zeroPadding = function (s, len) {
                    if (s.length >= len) return s;
                    return new Array(len - s.length + 1).join('0') + s;
                };

                // --- PUBLIC METHODS --------------------
                /**
                 * get string value of this string object
                 * @name getString
                 * @memberOf KJUR.asn1.DERAbstractTime#
                 * @function
                 * @return {String} string value of this time object
                 */
                this.getString = function () {
                    return this.s;
                };

                /**
                 * set value by a string
                 * @name setString
                 * @memberOf KJUR.asn1.DERAbstractTime#
                 * @function
                 * @param {String} newS value by a string to set such like "130430235959Z"
                 */
                this.setString = function (newS) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.s = newS;
                    this.hV = stohex(newS);
                };

                /**
                 * set value by a Date object
                 * @name setByDateValue
                 * @memberOf KJUR.asn1.DERAbstractTime#
                 * @function
                 * @param {Integer} year year of date (ex. 2013)
                 * @param {Integer} month month of date between 1 and 12 (ex. 12)
                 * @param {Integer} day day of month
                 * @param {Integer} hour hours of date
                 * @param {Integer} min minutes of date
                 * @param {Integer} sec seconds of date
                 */
                this.setByDateValue = function (year, month, day, hour, min, sec) {
                    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
                    this.setByDate(dateObject);
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };
            };
            YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
            // == END   DERAbstractTime ==================================================

            // == BEGIN DERAbstractStructured ============================================
            /**
             * base class for ASN.1 DER structured class
             * @name KJUR.asn1.DERAbstractStructured
             * @class base class for ASN.1 DER structured class
             * @property {Array} asn1Array internal array of ASN1Object
             * @extends KJUR.asn1.ASN1Object
             * @description
             * @see KJUR.asn1.ASN1Object - superclass
             */
            KJUR.asn1.DERAbstractStructured = function (params) {
                KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

                /**
                 * set value by array of ASN1Object
                 * @name setByASN1ObjectArray
                 * @memberOf KJUR.asn1.DERAbstractStructured#
                 * @function
                 * @param {array} asn1ObjectArray array of ASN1Object to set
                 */
                this.setByASN1ObjectArray = function (asn1ObjectArray) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.asn1Array = asn1ObjectArray;
                };

                /**
                 * append an ASN1Object to internal array
                 * @name appendASN1Object
                 * @memberOf KJUR.asn1.DERAbstractStructured#
                 * @function
                 * @param {ASN1Object} asn1Object to add
                 */
                this.appendASN1Object = function (asn1Object) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.asn1Array.push(asn1Object);
                };

                this.asn1Array = new Array();
                if (typeof params != "undefined") {
                    if (typeof params['array'] != "undefined") {
                        this.asn1Array = params['array'];
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


            // ********************************************************************
            //  ASN.1 Object Classes
            // ********************************************************************

            // ********************************************************************
            /**
             * class for ASN.1 DER Boolean
             * @name KJUR.asn1.DERBoolean
             * @class class for ASN.1 DER Boolean
             * @extends KJUR.asn1.ASN1Object
             * @description
             * @see KJUR.asn1.ASN1Object - superclass
             */
            KJUR.asn1.DERBoolean = function () {
                KJUR.asn1.DERBoolean.superclass.constructor.call(this);
                this.hT = "01";
                this.hTLV = "0101ff";
            };
            YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER Integer
             * @name KJUR.asn1.DERInteger
             * @class class for ASN.1 DER Integer
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>int - specify initial ASN.1 value(V) by integer value</li>
             * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             */
            KJUR.asn1.DERInteger = function (params) {
                KJUR.asn1.DERInteger.superclass.constructor.call(this);
                this.hT = "02";

                /**
                 * set value by Tom Wu's BigInteger object
                 * @name setByBigInteger
                 * @memberOf KJUR.asn1.DERInteger#
                 * @function
                 * @param {BigInteger} bigIntegerValue to set
                 */
                this.setByBigInteger = function (bigIntegerValue) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
                };

                /**
                 * set value by integer value
                 * @name setByInteger
                 * @memberOf KJUR.asn1.DERInteger
                 * @function
                 * @param {Integer} integer value to set
                 */
                this.setByInteger = function (intValue) {
                    var bi = new BigInteger(String(intValue), 10);
                    this.setByBigInteger(bi);
                };

                /**
                 * set value by integer value
                 * @name setValueHex
                 * @memberOf KJUR.asn1.DERInteger#
                 * @function
                 * @param {String} hexadecimal string of integer value
                 * @description
                 * <br/>
                 * NOTE: Value shall be represented by minimum octet length of
                 * two's complement representation.
                 * @example
                 * new KJUR.asn1.DERInteger(123);
                 * new KJUR.asn1.DERInteger({'int': 123});
                 * new KJUR.asn1.DERInteger({'hex': '1fad'});
                 */
                this.setValueHex = function (newHexString) {
                    this.hV = newHexString;
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params['bigint'] != "undefined") {
                        this.setByBigInteger(params['bigint']);
                    } else if (typeof params['int'] != "undefined") {
                        this.setByInteger(params['int']);
                    } else if (typeof params == "number") {
                        this.setByInteger(params);
                    } else if (typeof params['hex'] != "undefined") {
                        this.setValueHex(params['hex']);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER encoded BitString primitive
             * @name KJUR.asn1.DERBitString
             * @class class for ASN.1 DER encoded BitString primitive
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>bin - specify binary string (ex. '10111')</li>
             * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
             * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
             * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
             * argument for "BitString encapsulates" structure.</li>
             * </ul>
             * NOTE1: 'params' can be omitted.<br/>
             * NOTE2: 'obj' parameter have been supported since
             * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
             * @example
             * // default constructor
             * o = new KJUR.asn1.DERBitString();
             * // initialize with binary string
             * o = new KJUR.asn1.DERBitString({bin: "1011"});
             * // initialize with boolean array
             * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
             * // initialize with hexadecimal string (04 is unused bits)
             * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
             * // initialize with ASN1Util.newObject argument for encapsulated
             * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
             * // above generates a ASN.1 data like this:
             * // BIT STRING, encapsulates {
             * //   SEQUENCE {
             * //     INTEGER 3
             * //     PrintableString 'aaa'
             * //     }
             * //   }
             */
            KJUR.asn1.DERBitString = function (params) {
                if (params !== undefined && typeof params.obj !== "undefined") {
                    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
                    params.hex = "00" + o.getEncodedHex();
                }
                KJUR.asn1.DERBitString.superclass.constructor.call(this);
                this.hT = "03";

                /**
                 * set ASN.1 value(V) by a hexadecimal string including unused bits
                 * @name setHexValueIncludingUnusedBits
                 * @memberOf KJUR.asn1.DERBitString#
                 * @function
                 * @param {String} newHexStringIncludingUnusedBits
                 */
                this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.hV = newHexStringIncludingUnusedBits;
                };

                /**
                 * set ASN.1 value(V) by unused bit and hexadecimal string of value
                 * @name setUnusedBitsAndHexValue
                 * @memberOf KJUR.asn1.DERBitString#
                 * @function
                 * @param {Integer} unusedBits
                 * @param {String} hValue
                 */
                this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
                    if (unusedBits < 0 || 7 < unusedBits) {
                        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
                    }
                    var hUnusedBits = "0" + unusedBits;
                    this.hTLV = null;
                    this.isModified = true;
                    this.hV = hUnusedBits + hValue;
                };

                /**
                 * set ASN.1 DER BitString by binary string<br/>
                 * @name setByBinaryString
                 * @memberOf KJUR.asn1.DERBitString#
                 * @function
                 * @param {String} binaryString binary value string (i.e. '10111')
                 * @description
                 * Its unused bits will be calculated automatically by length of
                 * 'binaryValue'. <br/>
                 * NOTE: Trailing zeros '0' will be ignored.
                 * @example
                 * o = new KJUR.asn1.DERBitString();
                 * o.setByBooleanArray("01011");
                 */
                this.setByBinaryString = function (binaryString) {
                    binaryString = binaryString.replace(/0+$/, '');
                    var unusedBits = 8 - binaryString.length % 8;
                    if (unusedBits == 8) unusedBits = 0;
                    for (var i = 0; i <= unusedBits; i++) {
                        binaryString += '0';
                    }
                    var h = '';
                    for (var i = 0; i < binaryString.length - 1; i += 8) {
                        var b = binaryString.substr(i, 8);
                        var x = parseInt(b, 2).toString(16);
                        if (x.length == 1) x = '0' + x;
                        h += x;
                    }
                    this.hTLV = null;
                    this.isModified = true;
                    this.hV = '0' + unusedBits + h;
                };

                /**
                 * set ASN.1 TLV value(V) by an array of boolean<br/>
                 * @name setByBooleanArray
                 * @memberOf KJUR.asn1.DERBitString#
                 * @function
                 * @param {array} booleanArray array of boolean (ex. [true, false, true])
                 * @description
                 * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
                 * @example
                 * o = new KJUR.asn1.DERBitString();
                 * o.setByBooleanArray([false, true, false, true, true]);
                 */
                this.setByBooleanArray = function (booleanArray) {
                    var s = '';
                    for (var i = 0; i < booleanArray.length; i++) {
                        if (booleanArray[i] == true) {
                            s += '1';
                        } else {
                            s += '0';
                        }
                    }
                    this.setByBinaryString(s);
                };

                /**
                 * generate an array of falses with specified length<br/>
                 * @name newFalseArray
                 * @memberOf KJUR.asn1.DERBitString
                 * @function
                 * @param {Integer} nLength length of array to generate
                 * @return {array} array of boolean falses
                 * @description
                 * This static method may be useful to initialize boolean array.
                 * @example
                 * o = new KJUR.asn1.DERBitString();
                 * o.newFalseArray(3) &rarr; [false, false, false]
                 */
                this.newFalseArray = function (nLength) {
                    var a = new Array(nLength);
                    for (var i = 0; i < nLength; i++) {
                        a[i] = false;
                    }
                    return a;
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
                        this.setHexValueIncludingUnusedBits(params);
                    } else if (typeof params['hex'] != "undefined") {
                        this.setHexValueIncludingUnusedBits(params['hex']);
                    } else if (typeof params['bin'] != "undefined") {
                        this.setByBinaryString(params['bin']);
                    } else if (typeof params['array'] != "undefined") {
                        this.setByBooleanArray(params['array']);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER OctetString<br/>
             * @name KJUR.asn1.DEROctetString
             * @class class for ASN.1 DER OctetString
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * This class provides ASN.1 OctetString simple type.<br/>
             * Supported "params" attributes are:
             * <ul>
             * <li>str - to set a string as a value</li>
             * <li>hex - to set a hexadecimal string as a value</li>
             * <li>obj - to set a encapsulated ASN.1 value by JSON object
             * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
             * </ul>
             * NOTE: A parameter 'obj' have been supported
             * for "OCTET STRING, encapsulates" structure.
             * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
             * @see KJUR.asn1.DERAbstractString - superclass
             * @example
             * // default constructor
             * o = new KJUR.asn1.DEROctetString();
             * // initialize with string
             * o = new KJUR.asn1.DEROctetString({str: "aaa"});
             * // initialize with hexadecimal string
             * o = new KJUR.asn1.DEROctetString({hex: "616161"});
             * // initialize with ASN1Util.newObject argument
             * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
             * // above generates a ASN.1 data like this:
             * // OCTET STRING, encapsulates {
             * //   SEQUENCE {
             * //     INTEGER 3
             * //     PrintableString 'aaa'
             * //     }
             * //   }
             */
            KJUR.asn1.DEROctetString = function (params) {
                if (params !== undefined && typeof params.obj !== "undefined") {
                    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
                    params.hex = o.getEncodedHex();
                }
                KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
                this.hT = "04";
            };
            YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER Null
             * @name KJUR.asn1.DERNull
             * @class class for ASN.1 DER Null
             * @extends KJUR.asn1.ASN1Object
             * @description
             * @see KJUR.asn1.ASN1Object - superclass
             */
            KJUR.asn1.DERNull = function () {
                KJUR.asn1.DERNull.superclass.constructor.call(this);
                this.hT = "05";
                this.hTLV = "0500";
            };
            YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER ObjectIdentifier
             * @name KJUR.asn1.DERObjectIdentifier
             * @class class for ASN.1 DER ObjectIdentifier
             * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             */
            KJUR.asn1.DERObjectIdentifier = function (params) {
                var itox = function (i) {
                    var h = i.toString(16);
                    if (h.length == 1) h = '0' + h;
                    return h;
                };
                var roidtox = function (roid) {
                    var h = '';
                    var bi = new BigInteger(roid, 10);
                    var b = bi.toString(2);
                    var padLen = 7 - b.length % 7;
                    if (padLen == 7) padLen = 0;
                    var bPad = '';
                    for (var i = 0; i < padLen; i++) bPad += '0';
                    b = bPad + b;
                    for (var i = 0; i < b.length - 1; i += 7) {
                        var b8 = b.substr(i, 7);
                        if (i != b.length - 7) b8 = '1' + b8;
                        h += itox(parseInt(b8, 2));
                    }
                    return h;
                };

                KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
                this.hT = "06";

                /**
                 * set value by a hexadecimal string
                 * @name setValueHex
                 * @memberOf KJUR.asn1.DERObjectIdentifier#
                 * @function
                 * @param {String} newHexString hexadecimal value of OID bytes
                 */
                this.setValueHex = function (newHexString) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.s = null;
                    this.hV = newHexString;
                };

                /**
                 * set value by a OID string<br/>
                 * @name setValueOidString
                 * @memberOf KJUR.asn1.DERObjectIdentifier#
                 * @function
                 * @param {String} oidString OID string (ex. 2.5.4.13)
                 * @example
                 * o = new KJUR.asn1.DERObjectIdentifier();
                 * o.setValueOidString("2.5.4.13");
                 */
                this.setValueOidString = function (oidString) {
                    if (!oidString.match(/^[0-9.]+$/)) {
                        throw "malformed oid string: " + oidString;
                    }
                    var h = '';
                    var a = oidString.split('.');
                    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
                    h += itox(i0);
                    a.splice(0, 2);
                    for (var i = 0; i < a.length; i++) {
                        h += roidtox(a[i]);
                    }
                    this.hTLV = null;
                    this.isModified = true;
                    this.s = null;
                    this.hV = h;
                };

                /**
                 * set value by a OID name
                 * @name setValueName
                 * @memberOf KJUR.asn1.DERObjectIdentifier#
                 * @function
                 * @param {String} oidName OID name (ex. 'serverAuth')
                 * @since 1.0.1
                 * @description
                 * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
                 * Otherwise raise error.
                 * @example
                 * o = new KJUR.asn1.DERObjectIdentifier();
                 * o.setValueName("serverAuth");
                 */
                this.setValueName = function (oidName) {
                    var oid = KJUR.asn1.x509.OID.name2oid(oidName);
                    if (oid !== '') {
                        this.setValueOidString(oid);
                    } else {
                        throw "DERObjectIdentifier oidName undefined: " + oidName;
                    }
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (params !== undefined) {
                    if (typeof params === "string") {
                        if (params.match(/^[0-2].[0-9.]+$/)) {
                            this.setValueOidString(params);
                        } else {
                            this.setValueName(params);
                        }
                    } else if (params.oid !== undefined) {
                        this.setValueOidString(params.oid);
                    } else if (params.hex !== undefined) {
                        this.setValueHex(params.hex);
                    } else if (params.name !== undefined) {
                        this.setValueName(params.name);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER Enumerated
             * @name KJUR.asn1.DEREnumerated
             * @class class for ASN.1 DER Enumerated
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>int - specify initial ASN.1 value(V) by integer value</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             * @example
             * new KJUR.asn1.DEREnumerated(123);
             * new KJUR.asn1.DEREnumerated({int: 123});
             * new KJUR.asn1.DEREnumerated({hex: '1fad'});
             */
            KJUR.asn1.DEREnumerated = function (params) {
                KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
                this.hT = "0a";

                /**
                 * set value by Tom Wu's BigInteger object
                 * @name setByBigInteger
                 * @memberOf KJUR.asn1.DEREnumerated#
                 * @function
                 * @param {BigInteger} bigIntegerValue to set
                 */
                this.setByBigInteger = function (bigIntegerValue) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
                };

                /**
                 * set value by integer value
                 * @name setByInteger
                 * @memberOf KJUR.asn1.DEREnumerated#
                 * @function
                 * @param {Integer} integer value to set
                 */
                this.setByInteger = function (intValue) {
                    var bi = new BigInteger(String(intValue), 10);
                    this.setByBigInteger(bi);
                };

                /**
                 * set value by integer value
                 * @name setValueHex
                 * @memberOf KJUR.asn1.DEREnumerated#
                 * @function
                 * @param {String} hexadecimal string of integer value
                 * @description
                 * <br/>
                 * NOTE: Value shall be represented by minimum octet length of
                 * two's complement representation.
                 */
                this.setValueHex = function (newHexString) {
                    this.hV = newHexString;
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params['int'] != "undefined") {
                        this.setByInteger(params['int']);
                    } else if (typeof params == "number") {
                        this.setByInteger(params);
                    } else if (typeof params['hex'] != "undefined") {
                        this.setValueHex(params['hex']);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);

            // ********************************************************************
            /**
             * class for ASN.1 DER UTF8String
             * @name KJUR.asn1.DERUTF8String
             * @class class for ASN.1 DER UTF8String
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * @see KJUR.asn1.DERAbstractString - superclass
             */
            KJUR.asn1.DERUTF8String = function (params) {
                KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
                this.hT = "0c";
            };
            YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER NumericString
             * @name KJUR.asn1.DERNumericString
             * @class class for ASN.1 DER NumericString
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * @see KJUR.asn1.DERAbstractString - superclass
             */
            KJUR.asn1.DERNumericString = function (params) {
                KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
                this.hT = "12";
            };
            YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER PrintableString
             * @name KJUR.asn1.DERPrintableString
             * @class class for ASN.1 DER PrintableString
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * @see KJUR.asn1.DERAbstractString - superclass
             */
            KJUR.asn1.DERPrintableString = function (params) {
                KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
                this.hT = "13";
            };
            YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER TeletexString
             * @name KJUR.asn1.DERTeletexString
             * @class class for ASN.1 DER TeletexString
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * @see KJUR.asn1.DERAbstractString - superclass
             */
            KJUR.asn1.DERTeletexString = function (params) {
                KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
                this.hT = "14";
            };
            YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER IA5String
             * @name KJUR.asn1.DERIA5String
             * @class class for ASN.1 DER IA5String
             * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
             * @extends KJUR.asn1.DERAbstractString
             * @description
             * @see KJUR.asn1.DERAbstractString - superclass
             */
            KJUR.asn1.DERIA5String = function (params) {
                KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
                this.hT = "16";
            };
            YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

            // ********************************************************************
            /**
             * class for ASN.1 DER UTCTime
             * @name KJUR.asn1.DERUTCTime
             * @class class for ASN.1 DER UTCTime
             * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
             * @extends KJUR.asn1.DERAbstractTime
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * <li>date - specify Date object.</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             * <h4>EXAMPLES</h4>
             * @example
             * d1 = new KJUR.asn1.DERUTCTime();
             * d1.setString('130430125959Z');
             *
             * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
             * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
             * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
             */
            KJUR.asn1.DERUTCTime = function (params) {
                KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
                this.hT = "17";

                /**
                 * set value by a Date object<br/>
                 * @name setByDate
                 * @memberOf KJUR.asn1.DERUTCTime#
                 * @function
                 * @param {Date} dateObject Date object to set ASN.1 value(V)
                 * @example
                 * o = new KJUR.asn1.DERUTCTime();
                 * o.setByDate(new Date("2016/12/31"));
                 */
                this.setByDate = function (dateObject) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.date = dateObject;
                    this.s = this.formatDate(this.date, 'utc');
                    this.hV = stohex(this.s);
                };

                this.getFreshValueHex = function () {
                    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
                        this.date = new Date();
                        this.s = this.formatDate(this.date, 'utc');
                        this.hV = stohex(this.s);
                    }
                    return this.hV;
                };

                if (params !== undefined) {
                    if (params.str !== undefined) {
                        this.setString(params.str);
                    } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
                        this.setString(params);
                    } else if (params.hex !== undefined) {
                        this.setStringHex(params.hex);
                    } else if (params.date !== undefined) {
                        this.setByDate(params.date);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

            // ********************************************************************
            /**
             * class for ASN.1 DER GeneralizedTime
             * @name KJUR.asn1.DERGeneralizedTime
             * @class class for ASN.1 DER GeneralizedTime
             * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
             * @property {Boolean} withMillis flag to show milliseconds or not
             * @extends KJUR.asn1.DERAbstractTime
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
             * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
             * <li>date - specify Date object.</li>
             * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
             * </ul>
             * NOTE1: 'params' can be omitted.
             * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
             */
            KJUR.asn1.DERGeneralizedTime = function (params) {
                KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
                this.hT = "18";
                this.withMillis = false;

                /**
                 * set value by a Date object
                 * @name setByDate
                 * @memberOf KJUR.asn1.DERGeneralizedTime#
                 * @function
                 * @param {Date} dateObject Date object to set ASN.1 value(V)
                 * @example
                 * When you specify UTC time, use 'Date.UTC' method like this:<br/>
                 * o1 = new DERUTCTime();
                 * o1.setByDate(date);
                 *
                 * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
                 */
                this.setByDate = function (dateObject) {
                    this.hTLV = null;
                    this.isModified = true;
                    this.date = dateObject;
                    this.s = this.formatDate(this.date, 'gen', this.withMillis);
                    this.hV = stohex(this.s);
                };

                this.getFreshValueHex = function () {
                    if (this.date === undefined && this.s === undefined) {
                        this.date = new Date();
                        this.s = this.formatDate(this.date, 'gen', this.withMillis);
                        this.hV = stohex(this.s);
                    }
                    return this.hV;
                };

                if (params !== undefined) {
                    if (params.str !== undefined) {
                        this.setString(params.str);
                    } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
                        this.setString(params);
                    } else if (params.hex !== undefined) {
                        this.setStringHex(params.hex);
                    } else if (params.date !== undefined) {
                        this.setByDate(params.date);
                    }
                    if (params.millis === true) {
                        this.withMillis = true;
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

            // ********************************************************************
            /**
             * class for ASN.1 DER Sequence
             * @name KJUR.asn1.DERSequence
             * @class class for ASN.1 DER Sequence
             * @extends KJUR.asn1.DERAbstractStructured
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>array - specify array of ASN1Object to set elements of content</li>
             * </ul>
             * NOTE: 'params' can be omitted.
             */
            KJUR.asn1.DERSequence = function (params) {
                KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
                this.hT = "30";
                this.getFreshValueHex = function () {
                    var h = '';
                    for (var i = 0; i < this.asn1Array.length; i++) {
                        var asn1Obj = this.asn1Array[i];
                        h += asn1Obj.getEncodedHex();
                    }
                    this.hV = h;
                    return this.hV;
                };
            };
            YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

            // ********************************************************************
            /**
             * class for ASN.1 DER Set
             * @name KJUR.asn1.DERSet
             * @class class for ASN.1 DER Set
             * @extends KJUR.asn1.DERAbstractStructured
             * @description
             * <br/>
             * As for argument 'params' for constructor, you can specify one of
             * following properties:
             * <ul>
             * <li>array - specify array of ASN1Object to set elements of content</li>
             * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
             * </ul>
             * NOTE1: 'params' can be omitted.<br/>
             * NOTE2: sortflag is supported since 1.0.5.
             */
            KJUR.asn1.DERSet = function (params) {
                KJUR.asn1.DERSet.superclass.constructor.call(this, params);
                this.hT = "31";
                this.sortFlag = true; // item shall be sorted only in ASN.1 DER
                this.getFreshValueHex = function () {
                    var a = new Array();
                    for (var i = 0; i < this.asn1Array.length; i++) {
                        var asn1Obj = this.asn1Array[i];
                        a.push(asn1Obj.getEncodedHex());
                    }
                    if (this.sortFlag == true) a.sort();
                    this.hV = a.join('');
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params.sortflag != "undefined" &&
                        params.sortflag == false)
                        this.sortFlag = false;
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

            // ********************************************************************
            /**
             * class for ASN.1 DER TaggedObject
             * @name KJUR.asn1.DERTaggedObject
             * @class class for ASN.1 DER TaggedObject
             * @extends KJUR.asn1.ASN1Object
             * @description
             * <br/>
             * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
             * For example, if you find '[1]' tag in a ASN.1 dump,
             * 'tagNoHex' will be 'a1'.
             * <br/>
             * As for optional argument 'params' for constructor, you can specify *ANY* of
             * following properties:
             * <ul>
             * <li>explicit - specify true if this is explicit tag otherwise false
             *     (default is 'true').</li>
             * <li>tag - specify tag (default is 'a0' which means [0])</li>
             * <li>obj - specify ASN1Object which is tagged</li>
             * </ul>
             * @example
             * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
             * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
             * hex = d2.getEncodedHex();
             */
            KJUR.asn1.DERTaggedObject = function (params) {
                KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
                this.hT = "a0";
                this.hV = '';
                this.isExplicit = true;
                this.asn1Object = null;

                /**
                 * set value by an ASN1Object
                 * @name setString
                 * @memberOf KJUR.asn1.DERTaggedObject#
                 * @function
                 * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
                 * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
                 * @param {ASN1Object} asn1Object ASN.1 to encapsulate
                 */
                this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
                    this.hT = tagNoHex;
                    this.isExplicit = isExplicitFlag;
                    this.asn1Object = asn1Object;
                    if (this.isExplicit) {
                        this.hV = this.asn1Object.getEncodedHex();
                        this.hTLV = null;
                        this.isModified = true;
                    } else {
                        this.hV = null;
                        this.hTLV = asn1Object.getEncodedHex();
                        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
                        this.isModified = false;
                    }
                };

                this.getFreshValueHex = function () {
                    return this.hV;
                };

                if (typeof params != "undefined") {
                    if (typeof params['tag'] != "undefined") {
                        this.hT = params['tag'];
                    }
                    if (typeof params['explicit'] != "undefined") {
                        this.isExplicit = params['explicit'];
                    }
                    if (typeof params['obj'] != "undefined") {
                        this.asn1Object = params['obj'];
                        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
                    }
                }
            };
            YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

            /**
             * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
             * This object is just a decorator for parsing the key parameter
             * @param {string|Object} key - The key in string format, or an object containing
             * the parameters needed to build a RSAKey object.
             * @constructor
             */
            var JSEncryptRSAKey = /** @class */ (function (_super) {
                __extends(JSEncryptRSAKey, _super);

                function JSEncryptRSAKey(key) {
                    var _this = _super.call(this) || this;
                    // Call the super constructor.
                    //  RSAKey.call(this);
                    // If a key key was provided.
                    if (key) {
                        // If this is a string...
                        if (typeof key === "string") {
                            _this.parseKey(key);
                        } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) ||
                            JSEncryptRSAKey.hasPublicKeyProperty(key)) {
                            // Set the values for the key.
                            _this.parsePropertiesFrom(key);
                        }
                    }
                    return _this;
                }
                /**
                 * Method to parse a pem encoded string containing both a public or private key.
                 * The method will translate the pem encoded string in a der encoded string and
                 * will parse private key and public key parameters. This method accepts public key
                 * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
                 *
                 * @todo Check how many rsa formats use the same format of pkcs #1.
                 *
                 * The format is defined as:
                 * PublicKeyInfo ::= SEQUENCE {
                 *   algorithm       AlgorithmIdentifier,
                 *   PublicKey       BIT STRING
                 * }
                 * Where AlgorithmIdentifier is:
                 * AlgorithmIdentifier ::= SEQUENCE {
                 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
                 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
                 * }
                 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
                 * RSAPublicKey ::= SEQUENCE {
                 *   modulus           INTEGER,  -- n
                 *   publicExponent    INTEGER   -- e
                 * }
                 * it's possible to examine the structure of the keys obtained from openssl using
                 * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
                 * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
                 * @private
                 */
                JSEncryptRSAKey.prototype.parseKey = function (pem) {
                    try {
                        var modulus = 0;
                        var public_exponent = 0;
                        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
                        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
                        var asn1 = ASN1.decode(der);
                        // Fixes a bug with OpenSSL 1.0+ private keys
                        if (asn1.sub.length === 3) {
                            asn1 = asn1.sub[2].sub[0];
                        }
                        if (asn1.sub.length === 9) {
                            // Parse the private key.
                            modulus = asn1.sub[1].getHexStringValue(); // bigint
                            this.n = parseBigInt(modulus, 16);
                            public_exponent = asn1.sub[2].getHexStringValue(); // int
                            this.e = parseInt(public_exponent, 16);
                            var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
                            this.d = parseBigInt(private_exponent, 16);
                            var prime1 = asn1.sub[4].getHexStringValue(); // bigint
                            this.p = parseBigInt(prime1, 16);
                            var prime2 = asn1.sub[5].getHexStringValue(); // bigint
                            this.q = parseBigInt(prime2, 16);
                            var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
                            this.dmp1 = parseBigInt(exponent1, 16);
                            var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
                            this.dmq1 = parseBigInt(exponent2, 16);
                            var coefficient = asn1.sub[8].getHexStringValue(); // bigint
                            this.coeff = parseBigInt(coefficient, 16);
                        } else if (asn1.sub.length === 2) {
                            // Parse the public key.
                            var bit_string = asn1.sub[1];
                            var sequence = bit_string.sub[0];
                            modulus = sequence.sub[0].getHexStringValue();
                            this.n = parseBigInt(modulus, 16);
                            public_exponent = sequence.sub[1].getHexStringValue();
                            this.e = parseInt(public_exponent, 16);
                        } else {
                            return false;
                        }
                        return true;
                    } catch (ex) {
                        return false;
                    }
                };
                /**
                 * Translate rsa parameters in a hex encoded string representing the rsa key.
                 *
                 * The translation follow the ASN.1 notation :
                 * RSAPrivateKey ::= SEQUENCE {
                 *   version           Version,
                 *   modulus           INTEGER,  -- n
                 *   publicExponent    INTEGER,  -- e
                 *   privateExponent   INTEGER,  -- d
                 *   prime1            INTEGER,  -- p
                 *   prime2            INTEGER,  -- q
                 *   exponent1         INTEGER,  -- d mod (p1)
                 *   exponent2         INTEGER,  -- d mod (q-1)
                 *   coefficient       INTEGER,  -- (inverse of q) mod p
                 * }
                 * @returns {string}  DER Encoded String representing the rsa private key
                 * @private
                 */
                JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
                    var options = {
                        array: [
                            new KJUR.asn1.DERInteger({
                                int: 0
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.n
                            }),
                            new KJUR.asn1.DERInteger({
                                int: this.e
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.d
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.p
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.q
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.dmp1
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.dmq1
                            }),
                            new KJUR.asn1.DERInteger({
                                bigint: this.coeff
                            })
                        ]
                    };
                    var seq = new KJUR.asn1.DERSequence(options);
                    return seq.getEncodedHex();
                };
                /**
                 * base64 (pem) encoded version of the DER encoded representation
                 * @returns {string} pem encoded representation without header and footer
                 * @public
                 */
                JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
                    return hex2b64(this.getPrivateBaseKey());
                };
                /**
                 * Translate rsa parameters in a hex encoded string representing the rsa public key.
                 * The representation follow the ASN.1 notation :
                 * PublicKeyInfo ::= SEQUENCE {
                 *   algorithm       AlgorithmIdentifier,
                 *   PublicKey       BIT STRING
                 * }
                 * Where AlgorithmIdentifier is:
                 * AlgorithmIdentifier ::= SEQUENCE {
                 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
                 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
                 * }
                 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
                 * RSAPublicKey ::= SEQUENCE {
                 *   modulus           INTEGER,  -- n
                 *   publicExponent    INTEGER   -- e
                 * }
                 * @returns {string} DER Encoded String representing the rsa public key
                 * @private
                 */
                JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
                    var first_sequence = new KJUR.asn1.DERSequence({
                        array: [
                            new KJUR.asn1.DERObjectIdentifier({
                                oid: "1.2.840.113549.1.1.1"
                            }),
                            new KJUR.asn1.DERNull()
                        ]
                    });
                    var second_sequence = new KJUR.asn1.DERSequence({
                        array: [
                            new KJUR.asn1.DERInteger({
                                bigint: this.n
                            }),
                            new KJUR.asn1.DERInteger({
                                int: this.e
                            })
                        ]
                    });
                    var bit_string = new KJUR.asn1.DERBitString({
                        hex: "00" + second_sequence.getEncodedHex()
                    });
                    var seq = new KJUR.asn1.DERSequence({
                        array: [
                            first_sequence,
                            bit_string
                        ]
                    });
                    return seq.getEncodedHex();
                };
                /**
                 * base64 (pem) encoded version of the DER encoded representation
                 * @returns {string} pem encoded representation without header and footer
                 * @public
                 */
                JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
                    return hex2b64(this.getPublicBaseKey());
                };
                /**
                 * wrap the string in block of width chars. The default value for rsa keys is 64
                 * characters.
                 * @param {string} str the pem encoded string without header and footer
                 * @param {Number} [width=64] - the length the string has to be wrapped at
                 * @returns {string}
                 * @private
                 */
                JSEncryptRSAKey.wordwrap = function (str, width) {
                    width = width || 64;
                    if (!str) {
                        return str;
                    }
                    var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
                    return str.match(RegExp(regex, "g")).join("\n");
                };
                /**
                 * Retrieve the pem encoded private key
                 * @returns {string} the pem encoded private key with header/footer
                 * @public
                 */
                JSEncryptRSAKey.prototype.getPrivateKey = function () {
                    var key = "-----BEGIN RSA PRIVATE KEY-----\n";
                    key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
                    key += "-----END RSA PRIVATE KEY-----";
                    return key;
                };
                /**
                 * Retrieve the pem encoded public key
                 * @returns {string} the pem encoded public key with header/footer
                 * @public
                 */
                JSEncryptRSAKey.prototype.getPublicKey = function () {
                    var key = "-----BEGIN PUBLIC KEY-----\n";
                    key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
                    key += "-----END PUBLIC KEY-----";
                    return key;
                };
                /**
                 * Check if the object contains the necessary parameters to populate the rsa modulus
                 * and public exponent parameters.
                 * @param {Object} [obj={}] - An object that may contain the two public key
                 * parameters
                 * @returns {boolean} true if the object contains both the modulus and the public exponent
                 * properties (n and e)
                 * @todo check for types of n and e. N should be a parseable bigInt object, E should
                 * be a parseable integer number
                 * @private
                 */
                JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
                    obj = obj || {};
                    return (obj.hasOwnProperty("n") &&
                        obj.hasOwnProperty("e"));
                };
                /**
                 * Check if the object contains ALL the parameters of an RSA key.
                 * @param {Object} [obj={}] - An object that may contain nine rsa key
                 * parameters
                 * @returns {boolean} true if the object contains all the parameters needed
                 * @todo check for types of the parameters all the parameters but the public exponent
                 * should be parseable bigint objects, the public exponent should be a parseable integer number
                 * @private
                 */
                JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
                    obj = obj || {};
                    return (obj.hasOwnProperty("n") &&
                        obj.hasOwnProperty("e") &&
                        obj.hasOwnProperty("d") &&
                        obj.hasOwnProperty("p") &&
                        obj.hasOwnProperty("q") &&
                        obj.hasOwnProperty("dmp1") &&
                        obj.hasOwnProperty("dmq1") &&
                        obj.hasOwnProperty("coeff"));
                };
                /**
                 * Parse the properties of obj in the current rsa object. Obj should AT LEAST
                 * include the modulus and public exponent (n, e) parameters.
                 * @param {Object} obj - the object containing rsa parameters
                 * @private
                 */
                JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
                    this.n = obj.n;
                    this.e = obj.e;
                    if (obj.hasOwnProperty("d")) {
                        this.d = obj.d;
                        this.p = obj.p;
                        this.q = obj.q;
                        this.dmp1 = obj.dmp1;
                        this.dmq1 = obj.dmq1;
                        this.coeff = obj.coeff;
                    }
                };
                return JSEncryptRSAKey;
            }(RSAKey));

            /**
             *
             * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
             * possible parameters are:
             * - default_key_size        {number}  default: 1024 the key size in bit
             * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
             * - log                     {boolean} default: false whether log warn/error or not
             * @constructor
             */
            var JSEncrypt = /** @class */ (function () {
                function JSEncrypt(options) {
                    options = options || {};
                    this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
                    this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
                    this.log = options.log || false;
                    // The private and public key.
                    this.key = null;
                }
                /**
                 * Method to set the rsa key parameter (one method is enough to set both the public
                 * and the private key, since the private key contains the public key paramenters)
                 * Log a warning if logs are enabled
                 * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
                 * @public
                 */
                JSEncrypt.prototype.setKey = function (key) {
                    if (this.log && this.key) {
                        console.warn("A key was already set, overriding existing.");
                    }
                    this.key = new JSEncryptRSAKey(key);
                };
                /**
                 * Proxy method for setKey, for api compatibility
                 * @see setKey
                 * @public
                 */
                JSEncrypt.prototype.setPrivateKey = function (privkey) {
                    // Create the key.
                    this.setKey(privkey);
                };
                /**
                 * Proxy method for setKey, for api compatibility
                 * @see setKey
                 * @public
                 */
                JSEncrypt.prototype.setPublicKey = function (pubkey) {
                    // Sets the public key.
                    this.setKey(pubkey);
                };
                /**
                 * Proxy method for RSAKey object's decrypt, decrypt the string using the private
                 * components of the rsa key object. Note that if the object was not set will be created
                 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
                 * @param {string} str base64 encoded crypted string to decrypt
                 * @return {string} the decrypted string
                 * @public
                 */
                JSEncrypt.prototype.decrypt = function (str) {
                    // Return the decrypted string.
                    try {
                        return this.getKey().decrypt(b64tohex(str));
                    } catch (ex) {
                        return false;
                    }
                };
                /**
                 * Proxy method for RSAKey object's encrypt, encrypt the string using the public
                 * components of the rsa key object. Note that if the object was not set will be created
                 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
                 * @param {string} str the string to encrypt
                 * @return {string} the encrypted string encoded in base64
                 * @public
                 */
                JSEncrypt.prototype.encrypt = function (str) {
                    // Return the encrypted string.
                    try {
                        return hex2b64(this.getKey().encrypt(str));
                    } catch (ex) {
                        return false;
                    }
                };
                /**
                 * Proxy method for RSAKey object's sign.
                 * @param {string} str the string to sign
                 * @param {function} digestMethod hash method
                 * @param {string} digestName the name of the hash algorithm
                 * @return {string} the signature encoded in base64
                 * @public
                 */
                JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
                    // return the RSA signature of 'str' in 'hex' format.
                    try {
                        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
                    } catch (ex) {
                        return false;
                    }
                };
                /**
                 * Proxy method for RSAKey object's verify.
                 * @param {string} str the string to verify
                 * @param {string} signature the signature encoded in base64 to compare the string to
                 * @param {function} digestMethod hash method
                 * @return {boolean} whether the data and signature match
                 * @public
                 */
                JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
                    // Return the decrypted 'digest' of the signature.
                    try {
                        return this.getKey().verify(str, b64tohex(signature), digestMethod);
                    } catch (ex) {
                        return false;
                    }
                };
                /**
                 * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
                 * will be created and returned
                 * @param {callback} [cb] the callback to be called if we want the key to be generated
                 * in an async fashion
                 * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
                 * @public
                 */
                JSEncrypt.prototype.getKey = function (cb) {
                    // Only create new if it does not exist.
                    if (!this.key) {
                        // Get a new private key.
                        this.key = new JSEncryptRSAKey();
                        if (cb && {}.toString.call(cb) === "[object Function]") {
                            this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
                            return;
                        }
                        // Generate the key.
                        this.key.generate(this.default_key_size, this.default_public_exponent);
                    }
                    return this.key;
                };
                /**
                 * Returns the pem encoded representation of the private key
                 * If the key doesn't exists a new key will be created
                 * @returns {string} pem encoded representation of the private key WITH header and footer
                 * @public
                 */
                JSEncrypt.prototype.getPrivateKey = function () {
                    // Return the private representation of this key.
                    return this.getKey().getPrivateKey();
                };
                /**
                 * Returns the pem encoded representation of the private key
                 * If the key doesn't exists a new key will be created
                 * @returns {string} pem encoded representation of the private key WITHOUT header and footer
                 * @public
                 */
                JSEncrypt.prototype.getPrivateKeyB64 = function () {
                    // Return the private representation of this key.
                    return this.getKey().getPrivateBaseKeyB64();
                };
                /**
                 * Returns the pem encoded representation of the public key
                 * If the key doesn't exists a new key will be created
                 * @returns {string} pem encoded representation of the public key WITH header and footer
                 * @public
                 */
                JSEncrypt.prototype.getPublicKey = function () {
                    // Return the private representation of this key.
                    return this.getKey().getPublicKey();
                };
                /**
                 * Returns the pem encoded representation of the public key
                 * If the key doesn't exists a new key will be created
                 * @returns {string} pem encoded representation of the public key WITHOUT header and footer
                 * @public
                 */
                JSEncrypt.prototype.getPublicKeyB64 = function () {
                    // Return the private representation of this key.
                    return this.getKey().getPublicBaseKeyB64();
                };
                JSEncrypt.version = "3.0.0-rc.1";
                return JSEncrypt;
            }());

            window.JSEncrypt = JSEncrypt;

            exports.JSEncrypt = JSEncrypt;
            exports.default = JSEncrypt;

            Object.defineProperty(exports, '__esModule', {
                value: true
            });

        })));

    }, {}],
    1: [function (require, module, exports) {
        /*!
         * JavaScript Cookie v2.2.0
         * https://github.com/js-cookie/js-cookie
         *
         * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
         * Released under the MIT license
         */
        ;
        (function (factory) {
            var registeredInModuleLoader = false;
            if (typeof define === 'function' && define.amd) {
                define(factory);
                registeredInModuleLoader = true;
            }
            if (typeof exports === 'object') {
                module.exports = factory();
                registeredInModuleLoader = true;
            }
            if (!registeredInModuleLoader) {
                var OldCookies = window.Cookies;
                var api = window.Cookies = factory();
                api.noConflict = function () {
                    window.Cookies = OldCookies;
                    return api;
                };
            }
        }(function () {
            function extend() {
                var i = 0;
                var result = {};
                for (; i < arguments.length; i++) {
                    var attributes = arguments[i];
                    for (var key in attributes) {
                        result[key] = attributes[key];
                    }
                }
                return result;
            }

            function init(converter) {
                function api(key, value, attributes) {
                    var result;
                    if (typeof document === 'undefined') {
                        return;
                    }

                    // Write

                    if (arguments.length > 1) {
                        attributes = extend({
                            path: '/'
                        }, api.defaults, attributes);

                        if (typeof attributes.expires === 'number') {
                            var expires = new Date();
                            expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                            attributes.expires = expires;
                        }

                        // We're using "expires" because "max-age" is not supported by IE
                        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                        try {
                            result = JSON.stringify(value);
                            if (/^[\{\[]/.test(result)) {
                                value = result;
                            }
                        } catch (e) {}

                        if (!converter.write) {
                            value = encodeURIComponent(String(value))
                                .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                        } else {
                            value = converter.write(value, key);
                        }

                        key = encodeURIComponent(String(key));
                        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                        key = key.replace(/[\(\)]/g, escape);

                        var stringifiedAttributes = '';

                        for (var attributeName in attributes) {
                            if (!attributes[attributeName]) {
                                continue;
                            }
                            stringifiedAttributes += '; ' + attributeName;
                            if (attributes[attributeName] === true) {
                                continue;
                            }
                            stringifiedAttributes += '=' + attributes[attributeName];
                        }
                        return (document.cookie = key + '=' + value + stringifiedAttributes);
                    }

                    // Read

                    if (!key) {
                        result = {};
                    }

                    // To prevent the for loop in the first place assign an empty array
                    // in case there are no cookies at all. Also prevents odd result when
                    // calling "get()"
                    var cookies = document.cookie ? document.cookie.split('; ') : [];
                    var rdecode = /(%[0-9A-Z]{2})+/g;
                    var i = 0;

                    for (; i < cookies.length; i++) {
                        var parts = cookies[i].split('=');
                        var cookie = parts.slice(1).join('=');

                        if (!this.json && cookie.charAt(0) === '"') {
                            cookie = cookie.slice(1, -1);
                        }

                        try {
                            var name = parts[0].replace(rdecode, decodeURIComponent);
                            cookie = converter.read ?
                                converter.read(cookie, name) : converter(cookie, name) ||
                                cookie.replace(rdecode, decodeURIComponent);

                            if (this.json) {
                                try {
                                    cookie = JSON.parse(cookie);
                                } catch (e) {}
                            }

                            if (key === name) {
                                result = cookie;
                                break;
                            }

                            if (!key) {
                                result[name] = cookie;
                            }
                        } catch (e) {}
                    }

                    return result;
                }

                api.set = api;
                api.get = function (key) {
                    return api.call(api, key);
                };
                api.getJSON = function () {
                    return api.apply({
                        json: true
                    }, [].slice.call(arguments));
                };
                api.defaults = {};

                api.remove = function (key, attributes) {
                    api(key, '', extend(attributes, {
                        expires: -1
                    }));
                };

                api.withConverter = init;

                return api;
            }

            return init(function () {});
        }));

    }, {}]
}, {}, [40]);