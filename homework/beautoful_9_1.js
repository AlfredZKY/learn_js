window = global;
window.atob = true;
screen = {
    width: 2560,
    height: 1440
}
navigator = {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36'
}
document = {
    cookie: ''
};
cookie_cache = document.cookie;
Object.defineProperty(document, 'cookie', {
    get: function () {
        console.log('Getting cookie');
        return cookie_cache;
    },
    set: function (val) {
        console.log(val)
        var cookie = val.split(";")[0];
        var ncookie = cookie.split("=");
        var flag = false;
        var cache = cookie_cache.split("; ");
        cache = cache.map(function (a) {
            if (a.split("=")[0] === ncookie[0]) {
                flag = true;
                return cookie;
            }
            return a;
        })
        cookie_cache = cache.join(";");
        if (!flag) {
            cookie_cache += cookie + ";";
        }
    },
});

function anonymous(
    ) {
    var nt0 = '0cbf53b949177ffc54d4458e3fd4a111';
    var nt1 = 'c54475e78ba72ce537348710e33d7c96';
    var nt2 = 'ba6f15450c6ade34fc0fd96ba38d13ce';
    var nt3 = '0cf3620478bdbd7794b2794025af6dfe';
    var nt4 = 'c078c4c49464b552b564a0144c522b3d';
    var nt5 = '4736ed5d892c65298d4aa761fbc4bbd3';
    var nt6 = '60a0d5637a9993e096ea463b6d7e596f';
    var nt7 = '162db1a6e4db71fe55bfeedb220c8c70';
    var nt8 = 'f473654cc9b1abfd1d407219193a5c1a';
    var nt9 = 'e4ae2ecc59c6d9767490d29c20971a0e';
    (function () {
        document.cookie = 'NIGHTTEAM=31353835303533353130333432';
        document.cookie = 'NIGHTTEAM_ID=14d875209d4863a1f05f04c9fe7d94f1';
        document.cookie = 'NIGHTTEAM_SIGN=176fec6a5ce2a9681db7dc544314aa81';
        document.cookie = 'NIGHTTEAM_TOKEN=b185b45098d68776b61d0f8adaba1143';
        if (window.atob) {
            document.cookie = 'NIGHTTEAM_WINDOW=' + nt2
        }
    
        if ("undefined" != typeof screen && screen.width && screen.height) {
            document.cookie = 'NIGHTTEAM_UNIT=' + nt5
        }
        var switch_flag = true;
    
        function get_range_value(s) {
            var new_str = s.substring(20, 32) + "nightteam" + s.substring(0, 16) + "abcdefghijklmnopqrstuvwxyz0123456789";
            return new_str.substr(0, 32);
        }
    
        if ("undefined" == typeof navigator || navigator.userAgent === void 0 || navigator.userAgent.match("HeadlessChrome") || navigator.userAgent.match("PhantomJS")) {
            switch_flag = false;
        }
        if (switch_flag) {
            document.cookie = 'NIGHTTEAM_SWITCH=' + get_range_value(nt4);
        }
    })();
}

console.log(document.cookie);