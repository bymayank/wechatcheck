var openID = '';
var startStr = 'code=';
var endStr = '&state=';

function signupWithWeChat() {
    localStorage.setItem('flag', 1);
    var appid = 'wxf6e82a579a451ba0';
    var redirectUrl = 'https://wechatssolanghamcheck.netlify.app/wechatsso.html';
    var wechatOAuthUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + encodeURIComponent(redirectUrl) + '&response_type=code&scope=snsapi_login#wechat_redirect';
    window.location.href = wechatOAuthUrl
}

function loginWithWeChat() {
    localStorage.setItem('flag', 2);
    var appid = 'wxf6e82a579a451ba0';
    var redirectUrl = 'https://wechatssolanghamcheck.netlify.app/wechatsso.html';
    var wechatOAuthUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + encodeURIComponent(redirectUrl) + '&response_type=code&scope=snsapi_login#wechat_redirect';
    window.location.href = wechatOAuthUrl
}

function gravtySignup(){
    var memberSignupObj = {
        "code": openID,
        "user":{
            "first_name":document.getElementById("first_name").value,
            "last_name":document.getElementById("last_name").value,
            "email":document.getElementById("email").value
        },
        "enrolling_sponsor":4,
        "platform": "website"
    }
    document.getElementById("main_screen").style.display = "none";
    document.getElementById("form_screen").style.display = "none";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("loading-message").style.display = "";
    $.ajax({
        async: false,
        dataType: "json",
        type: 'post',
        url: "https://gravty.devint31.gravty.info/api/v1/members/social/wechat/",
        data: JSON.stringify(memberSignupObj),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function(data) {
            document.getElementById("main_screen").style.display = "none";
            document.getElementById("form_screen").style.display = "none";
            document.getElementById("success-message").style.display = "";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("loading-message").style.display = "none";
        },
        error: function(err) {
            document.getElementById("main_screen").style.display = "";
            document.getElementById("form_screen").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            document.getElementById("error-message").style.display = "";
            document.getElementById("loading-message").style.display = "none";
        }
    });
}

function gravtyLogin(){
    var memberSignupObj = {
    "code": openID,
    "platform": "website"
    }
    document.getElementById("main_screen").style.display = "none";
    document.getElementById("form_screen").style.display = "none";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("loading-message").style.display = "";
    $.ajax({
        type: 'post',
        url: "https://gravty.devint31.gravty.info/api/v1/members/social/wechat/login/",
        data: JSON.stringify(memberSignupObj),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function(data) {
            document.getElementById("main_screen").style.display = "none";
            document.getElementById("form_screen").style.display = "none";
            document.getElementById("success-message").style.display = "";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("loading-message").style.display = "none";
        },
        error: function(err) {
            document.getElementById("main_screen").style.display = "";
            document.getElementById("form_screen").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("loading-message").style.display = "none";
        }
    });
}

window.onload = function(){
    var redirectionUrl = window.location.href
    var flag = localStorage.getItem("flag")
    window.history.forward = function(){
        localStorage.setItem('flag', '');
    }
    openID = redirectionUrl.substring(redirectionUrl.indexOf(startStr) + startStr.length, redirectionUrl.indexOf(endStr, redirectionUrl.indexOf(startStr) + startStr.length));
    if(redirectionUrl.startsWith("https://wechatssolanghamcheck.netlify.app/wechatsso.html")){
    if(flag==="1"){
        document.getElementById("main_screen").style.display = "none";
        document.getElementById("form_screen").style.display = "";
        document.getElementById("success-message").style.display = "none";
        document.getElementById("error-message").style.display = "none";
        document.getElementById("loading-message").style.display = "none";
        localStorage.setItem('flag', '');
    }
    else if (flag==="2"){
        gravtyLogin();
        localStorage.setItem('flag', '');
    }
    else if (flag===""){
        document.getElementById("main_screen").style.display = "";
        document.getElementById("form_screen").style.display = "none";
        document.getElementById("success-message").style.display = "none";
        document.getElementById("error-message").style.display = "none";
        document.getElementById("loading-message").style.display = "none";
    }
    }
    else{
    console.log("43728937")
    }
}
