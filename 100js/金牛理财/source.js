var basePath = "";
$(document).ready(function () {
    basePath = $("#hiddenBasePath").val();
    callbackMessage();
    $(".forgetkey").bind("click", function () {
        initForgetContent();
        $("#get_v_code_forget").attr("src", "sys/web/validateCode?zip=" + Math.random())
    });
    if ($.cookie("cmstop_auth"))
        if ($("#hiddenUpPage").val() == "") {
            window.location = basePath + "uc/my"
        } else {
            window.location = basePath + $("#hiddenUpPage").val()
        } $("#btnLogin").bind("click", function () {
        header_login()
    });
    $('#login_username').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove();
            $(this).next(".txtb").show().text("请输入用户名/邮箱/手机号/身份证号")
        }
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide();
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
    });
    $('#login_password').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove();
            $(this).next(".txtb").show().text("请输入登录密码")
        }
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide();
            getPublicKey();
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
    });
    $('#login_seccode').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove();
            $(this).next(".txtb").show().text("请输入验证码")
        }
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide();
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
    })
});

function header_login(flag) {
    if (typeof (flag) == "undefined") {
        flag = 0
    }
    var username = $('#login_username').val();
    var password = $('#login_password').val();
    var seccode = $('#login_seccode').val();
    if ($.trim(username) == '' || username == "用户名/邮箱/手机号/身份证号") {
        $("#login_username").next(".txtb").show().text("请输入用户名/邮箱/手机号/身份证号");
        return false
    }
    if ($.trim(password) == '' || password == "请输入登录密码") {
        $("#login_password").next(".txtb").show().text("请输入登录密码");
        return false
    }
    if ($.trim(seccode) == '' || seccode == "请输入验证码") {
        $("#login_seccode").next(".txtb").show().text("请输入验证码");
        return false
    }
    if ($.trim($("#hiddenPassword").val()).length < 20) {
        $("#login_password").next(".txtb").show().text("请输入正确的登录密码");
        return false
    }
    $("#login_seccode").next(".txtb").hide();
    $("#btnLogin").val("登录中...").unbind("click");
    checkvcode()
}

function checkvcode() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "sys/web/checkCode",
        data: {
            seccode: $.trim($('#login_seccode').val()),
            zip: Math.random()
        },
        global: false,
        success: function (result) {
            if (result) {
                if (result.code == "000") {
                    $("#loginAccountForm").submit()
                } else {
                    $("#login_seccode").next(".txtb").show().text("输入验证码错误");
                    $("#login_seccode").parent().find("span.tip").remove();
                    $("#login_seccode").val("");
                    $("#btnLogin").val("登录").unbind("click").bind("click", function () {
                        header_login()
                    });
                    setTimeout(function () {
                        $("#get_v_code").attr("src", "sys/web/validateCode?id=" + Math.random() * 5)
                    }, 600)
                }
            }
        }
    })
}

function initForgetContent() {
    var content = "<div class=\"pop_bg\"></div>";
    content += "<div class=\"pop_loginbox\">";
    content += "<a href=\"javascript:void(0);\" class=\"pop_close\" onclick=\"closeContent();\"></a>";
    content += "<p class=\"tit\">网站登录密码找回</p>";
    content += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"poptable\">";
    content += "<tbody>";
    content += "<tr>";
    content += "<td class=\"lt\">手机号码</td>";
    content += "<td style=\"position:relative;\"><input id=\"txtMobile\" maxLength=\"11\" class=\"inbox placeholder\" type=\"text\" value=\"\" placeholder=\"输入注册时使用的手机号码\"/><p class=\"txtb tips tips_hide\"></p></td>";
    content += "</tr>";
    content += "<tr>";
    content += "<td class=\"lt\">图形验证码</td>";
    content += "<td style=\"position:relative;\"><input style=\"width:202px;\" id=\"login_seccodeforget\" maxLength=\"4\" class=\"inbox placeholder\" type=\"text\" value=\"\" placeholder=\"输入图形验证码\" autocomplete=\"off\"/><p class=\"txtb tips tips_hide\"></p> <img onclick=\"changeValidateCode(this);\" id=\"get_v_code_forget\" style=\"margin-left:0px; width:95px;height:37px;cursor: pointer;\" src=\"sys/web/validateCode\"></td>";
    content += "</tr>";
    content += "<tr>";
    content += "<td class=\"lt\">验证码</td>";
    content += "<td style=\"position:relative;\"><input  maxLength=\"6\" id=\"txtValidCode\" style=\"width:195px;\" class=\"inbox placeholder fl\" type=\"text\" value=\"\" placeholder=\"收到的6位短信验证码\" /><p class=\"txtb tips tips_hide\" style=\"width:173px;\"></p> <a id=\"sendVerification\" class=\"click\" href=\"javascript:void(0);\">点击发送</a></td>";
    content += "</tr>";
    content += "</tbody></table>";
    content += "<p class=\"btnbox\"><a href=\"javascript:void(0);\" id=\"btnNextSetup\" class=\"inputbtn\">下一步</a></p></div>";
    $("body").append(content);
    $('#txtMobile').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
        $(this).next(".txtb").show().text("请输入注册时使用的手机号");
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide();
            if ($(this).parent().find("span.tip").length == 0) $(this).parent().append("<span style=\"right:43px; top:20px;\" class=\"tip\"><img src=\"webcontent/usercenter/images/ico_ok.png\"></span>")
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
        if (checkMobile($.trim($("#txtMobile").val())) == 2) {
            $(this).parent().find("span.tip").remove();
            $("#txtMobile").unbind("focus").bind("focus", function () {
                $("#txtMobile").next("p").hide()
            }).next("p").show().text("无效的手机号");
            return false
        }
    });
    $('#login_seccodeforget').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "" || $.trim($(this).val()) == "请输入图形验证码") {
            $(this).parent().find("span.tip").remove()
        }
        $(this).next(".txtb").show().text("请输入图形验证码");
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide()
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
    });
    $('#txtValidCode').unbind("focus").bind("focus", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
        $(this).next(".txtb").show().text("请输入收到的短信验证码");
        $(document).unbind("keyup");
        $(document).bind("keyup", function (e) {
            if (e.keyCode == 13) {
                header_login()
            }
        })
    }).unbind("blur").bind("blur", function () {
        if ($.trim($(this).val()) != "") {
            $(this).next(".txtb").hide();
            if ($(this).parent().find("span.tip").length == 0) $(this).parent().append("<span style=\"right:147px; top:20px;\" class=\"tip\"><img src=\"webcontent/usercenter/images/ico_ok.png\"></span>")
        }
        if ($.trim($(this).val()) == "") {
            $(this).parent().find("span.tip").remove()
        }
        if ($.trim($("#txtValidCode").val()).length < 6) {
            $(this).parent().find("span.tip").remove();
            $("#txtValidCode").unbind("focus").bind("focus", function () {
                $("#txtValidCode").next("p").hide()
            }).next("p").show().text("请输入6位短信验证码");
            return false
        }
    });
    $("#sendVerification").unbind("click").bind("click", function () {
        $(".poptable p").hide();
        SendCode()
    });
    bindNextSetup()
}

function bindNextSetup() {
    $("#btnNextSetup").unbind("click").bind("click", function () {
        $(".poptable p").hide();
        NextSetup()
    }).css({
        background: "#f5b73c"
    })
}

function NextSetup() {
    if ($.trim($("#txtMobile").val()) == "") {
        $("#txtMobile").unbind("focus").bind("focus", function () {
            $("#txtMobile").next("p").hide()
        }).next("p").show().text("请输入注册时使用的手机号");
        return false
    }
    if (checkMobile($.trim($("#txtMobile").val())) == 2) {
        $("#txtMobile").unbind("focus").bind("focus", function () {
            $("#txtMobile").next("p").hide()
        }).next("p").show().text("无效的手机号");
        return false
    }
    if ($.trim($("#txtValidCode").val()) == "" || $.trim($("#txtValidCode").val()).length < 6) {
        $("#txtValidCode").unbind("focus").bind("focus", function () {
            $("#txtValidCode").next("p").hide()
        }).next("p").show().text("请输入6位短信验证码");
        return false
    }
    $("#btnNextSetup").unbind("click").css({
        background: "silver"
    });
    $.ajax({
        type: "get",
        url: "sys/web/forget_verificate",
        dataType: "json",
        data: {
            textMobile: $.trim($("#txtMobile").val()),
            txtValidCode: $.trim($("#txtValidCode").val()),
            zip: Math.random()
        },
        global: false,
        success: function (result) {
            var message = "";
            var m = $.trim($("#txtMobile").val());
            switch (result.status) {
                case -1:
                    message = "验证码错误请确认后重试";
                    $("#txtValidCode").unbind("focus").bind("focus", function () {
                        $("#txtValidCode").next("p").hide()
                    }).next("p").show().text(message);
                    $("#txtValidCode").val("");
                    bindNextSetup();
                    break;
                case -2:
                    message = "验证码已过期，需重新获取";
                    $("#txtValidCode").unbind("focus").bind("focus", function () {
                        $("#txtValidCode").next("p").hide()
                    }).next("p").show().text(message);
                    $("#txtValidCode").val("");
                    bindNextSetup();
                    break;
                case -3:
                    message = "过期的验证码，需重新获取！";
                    $("#txtValidCode").unbind("focus").bind("focus", function () {
                        $("#txtValidCode").next("p").hide()
                    }).next("p").show().text(message);
                    $("#txtValidCode").val("");
                    bindNextSetup();
                    break;
                case -4:
                    message = "验证码已使用不能重复验证";
                    $("#txtValidCode").unbind("focus").bind("focus", function () {
                        $("#txtValidCode").next("p").hide()
                    }).next("p").show().text(message);
                    $("#txtValidCode").val("");
                    bindNextSetup();
                    break;
                default:
                    closeContent();
                    var content = "<div class=\"pop_bg\"></div>";
                    content += "<div class=\"pop_loginbox\">";
                    content += "<a href=\"javascript:void(0);\" class=\"pop_close\" onclick=\"closeContent();\"></a>";
                    content += "<p class=\"tit\">重置网站登录密码</p>";
                    content += "<form action=\"sys/web/forget_reset\" method=\"post\" id=\"forgetForm\">";
                    content += "<input type=\"hidden\" name=\"Mobile\" id=\"hidMobile\" value=\"" + m + "\" />";
                    content += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"poptable\" id=\"tabReset\">";
                    content += "<tbody>";
                    if (result.result > 1) {
                        content += "<tr><td class=\"lt\">用户名/邮箱</td>";
                        content += "<td style=\"position:relative;\"><input id=\"txtUserName\"  name=\"userName\" class=\"inbox placeholder\" type=\"text\" placeholder=\"请提供您登录名/邮箱\"><p class=\"tips tips_hide\"></p></td>";
                        content += "</tr>"
                    }
                    content += "<tr><td class=\"lt\">设置新密码</td>";
                    content += "<td style=\"position:relative;\"><input id=\"txtPassword\"  maxlength=\"12\"   name=\"password\" class=\"inbox placeholder\" type=\"password\" placeholder=\"请设置6-12位新登录密码\"><p class=\"tips tips_hide\"></p></td>";
                    content += "</tr>";
                    content += "<tr>";
                    content += "<td class=\"lt\">确认新密码</td>";
                    content += "<td style=\"position:relative;\"><input  id=\"txtComPassword\"  maxlength=\"12\"   name=\"comPassword\" class=\"inbox placeholder\" type=\"password\" placeholder=\"重复输入密码\"><p class=\"tips tips_hide\"></p></td>";
                    content += "</tr>";
                    content += "</tbody></table></form>";
                    content += "<p class=\"btnbox\"><a href=\"javascript:void(0);\" id=\"btnSubmit\" class=\"inputbtn\">确 认</a></p>";
                    content += "</div>";
                    $("body").append(content);
                    $("#txtUserName").unbind("focus").bind("focus", function () {
                        $(this).next("p").text("需要提供您用户名或邮箱").show()
                    }).unbind("blur").bind("blur", function () {
                        if ($.trim($(this).val()) != "") {
                            $(this).next("p").text("需要提供您用户名或邮箱").hide();
                            if ($(this).parent().find("span.tip").length == 0) $(this).parent().append("<span style=\"right:24px;top:19px;\" class=\"tip\"><img src=\"webcontent/usercenter/images/ico_ok.png\"></span>")
                        }
                        if ($.trim($(this).val()) == "") {
                            $(this).parent().find("span.tip").remove()
                        }
                    });
                    $("#txtPassword").unbind("focus").bind("focus", function () {
                        $(this).next("p").text("请输入新的登录密码").show()
                    }).unbind("blur").bind("blur", function () {
                        if ($.trim($(this).val()) != "") {
                            $(this).next("p").text("请输入新的登录密码").hide();
                            if ($(this).parent().find("span.tip").length == 0) $(this).parent().append("<span style=\"right:24px;top:19px;\" class=\"tip\"><img src=\"webcontent/usercenter/images/ico_ok.png\"></span>")
                        }
                        if ($.trim($(this).val()) == "" || $.trim($(this).val()).length < 6) {
                            $(this).next("p").text("登录密码至少6位").show();
                            $(this).parent().find("span.tip").remove()
                        }
                    });
                    $("#txtComPassword").unbind("focus").bind("focus", function () {
                        $(this).next("p").text("请确认登录密码").show()
                    }).unbind("blur").bind("blur", function () {
                        if ($.trim($(this).val()) != "") {
                            $(this).next("p").text("请确认登录密码").hide();
                            if ($(this).parent().find("span.tip").length == 0) $(this).parent().append("<span style=\"right:24px;top:19px;\" class=\"tip\"><img src=\"webcontent/usercenter/images/ico_ok.png\"></span>")
                        }
                        if ($.trim($(this).val()) == "" || $.trim($(this).val()) != $.trim($("#txtPassword").val())) {
                            $(this).next("p").text("确认密码错误").show();
                            $(this).parent().find("span.tip").remove()
                        }
                    });
                    $("#btnSubmit").unbind("click").bind("click", function () {
                        if ($("#txtUserName").length > 0 && $.trim($("#txtUserName").val()) == "") {
                            $("#txtUserName").unbind("focus").bind("focus", function () {
                                $("#txtUserName").next("p").hide()
                            }).next("p").show().text("需要提供您用户名或邮箱");
                            return false
                        }
                        if ($.trim($("#txtPassword").val()) == "") {
                            $("#txtPassword").unbind("focus").bind("focus", function () {
                                $("#txtPassword").next("p").hide()
                            }).next("p").show().text("请设置新的登录密码");
                            return false
                        }
                        if ($("#hidMobile").val() == "") {
                            $("#txtPassword").unbind("focus").bind("focus", function () {
                                $("#txtPassword").next("p").hide()
                            }).next("p").show().text("数据验证异常，请关闭窗口重试");
                            return false
                        }
                        if ($.trim($("#txtPassword").val()).length < 6) {
                            $("#txtPassword").unbind("focus").bind("focus", function () {
                                $("#txtPassword").next("p").hide()
                            }).next("p").show().text("登录密码长度至少6位")
                        }
                        if ($.trim($("#txtPassword").val()) != $.trim($("#txtComPassword").val())) {
                            $("#txtComPassword").unbind("focus").bind("focus", function () {
                                $("#txtComPassword").next("p").hide()
                            }).next("p").show().text("确认密码错误");
                            return false
                        }
                        $("#forgetForm").submit()
                    });
                    break
            }
        }
    })
}

function SendCode() {
    if ($.trim($("#txtMobile").val()) == "" || $.trim($("#txtMobile").val()) == "输入注册时使用的手机号码") {
        $("#txtMobile").unbind("focus").bind("focus", function () {
            $("#txtMobile").next("p").slideUp()
        }).next("p").slideDown().text("请输入手机号");
        $("#get_v_code_forget").attr("src", "sys/web/validateCode?zip=" + Math.random());
        return false
    }
    if (checkMobile($.trim($("#txtMobile").val())) == 2) {
        $("#txtMobile").unbind("focus").bind("focus", function () {
            $("#txtMobile").next("p").slideUp()
        }).next("p").slideDown().text("无效的手机号");
        $("#get_v_code_forget").attr("src", "sys/web/validateCode?zip=" + Math.random());
        return false
    }
    if ($.trim($("#login_seccodeforget").val()) == "" || $.trim($("#login_seccodeforget").val()) == "输入图形验证码") {
        $("#login_seccodeforget").unbind("focus").bind("focus", function () {
            $("#login_seccodeforget").next("p").slideUp()
        }).next("p").slideDown().text("输入图形验证码");
        $("#get_v_code_forget").attr("src", "sys/web/validateCode?zip=" + Math.random());
        return false
    }
    $("#sendVerification").css("background-color", "GRAY");
    $("#sendVerification").text("等待发送");
    $("#sendVerification").unbind("click");
    $.ajax({
        type: "post",
        url: "sys/web/A223D7F3B260442AA51F2EBA6AFA208E",
        data: {
            mobile: $.trim($("#txtMobile").val()),
            vcode: $("#login_seccodeforget").val(),
            category: 2,
            zip: Math.random(),
            CSRFToken: $("#hiddenCSRFToken").val()
        },
        global: false,
        success: function (result) {
            flag++;
            $("#get_v_code_forget").attr("src", "sys/web/validateCode?zip=" + Math.random());
            if (result == "-10") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("非法请求或页面已过期，请刷新页面重试");
                flag = 0;
                time(0)
            } else if (result == "-11") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("图形验证码错误");
                flag = 0;
                time(0)
            } else if (result == "-12") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("非法请求，如非恶意请联系我们");
                flag = 0;
                time(0)
            } else if (result == "-13") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("请输入正确的手机号");
                flag = 0;
                time(0)
            } else if (result == "-2") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("手机号码不存在");
                flag = 0;
                time(0)
            } else if (result == "-1") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("验证码获取过于频繁，请等待5分钟后重新操作");
                flag = 0;
                time(0)
            } else if (result == "-5") {
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("短信通道异常，通道关闭请联系我们！");
                flag = 0;
                time(0)
            } else {
                $("#hiddenCSRFToken").val(result);
                $("#txtMobile").unbind("focus").bind("focus", function () {
                    $("#txtMobile").next("p").slideUp()
                }).next("p").slideDown().text("验证码已发送到手机，请查收短信");
                time(60)
            }
        }
    })
}
var flag = 0;

function time(timeout) {
    if (timeout == 0) {
        $("#sendVerification").html(flag > 0 ? "重新发送" : "点击发送").css({
            width: ""
        });
        $("#sendVerification").css("background-color", "#f5b73c");
        $("#sendVerification").unbind("click").bind("click", function () {
            SendCode()
        })
    } else {
        timeout--;
        $("#sendVerification").html("等待" + timeout + "秒").width("71");
        setTimeout(function () {
            time(timeout)
        }, 1000)
    }
}

function closeContent() {
    $(".pop_bg,.pop_loginbox").remove();
    $("#get_v_code").attr("src", "sys/web/validateCode?zip=" + Math.random())
}

function loginReuslt(status, m, id, msg, token, source) {
    if (status) {
        target()
    } else {
        console.log(decodeURIComponent(msg));
        $("#login_seccode").next(".txtb").show().text(decodeURIComponent(msg));
        $("#login_seccode").parent().find("span.tip").remove();
        $("#btnLogin").val("登录").unbind("click").bind("click", function () {
            header_login()
        });
        setTimeout(function () {
            $("#get_v_code").attr("src", "sys/web/validateCode?id=" + Math.random() * 5)
        }, 600)
    }
}

function target() {
    if ($("#hiddenUpPage").val() == "") {
        window.location = basePath + "uc/my"
    } else {
        window.location = basePath + $("#hiddenUpPage").val()
    }
}

function callbackMessage() {
    if ($("#btnLogin").next(".txtb").text() != "") {
        $("#btnLogin").next(".txtb").slideDown();
        setTimeout(function () {
            $("#btnLogin").next(".txtb").slideUp()
        }, 7000)
    }
}

function changeValidateCode(obj) {
    $(obj).attr("src", "sys/web/validateCode?id=" + Math.random() * 5)
}

function getPublicKey() {
    $.ajax({
        url: "uc/getRdspwd",
        type: "post",
        dataType: "text",
        success: function (data) {
            if (data) {
                var ustring = $.trim($("#login_username").val());
                var pstring = $.trim($("#login_password").val());
                var encrypt = new JSEncrypt();
                encrypt.setPublicKey(data);
                $("#hiddenUserName").val(ustring);
                $("#hiddenPassword").val(encrypt.encrypt(pstring))
            }
        }
    })
}