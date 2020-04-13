window = global;
navigator = {};

//encode64
function encode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}



window.utils = {
    isObject: function (value) {
        // Avoid a V8 JIT bug in Chrome 19-20.
        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    },
    debounce: function (func, wait, options) {
        var args,
            maxTimeoutId,
            result,
            stamp,
            thisArg,
            timeoutId,
            trailingCall,
            lastCalled = 0,
            leading = false,
            maxWait = false,
            trailing = true;

        if (typeof func != 'function') {
            throw new TypeError('Expected a function');
        }
        wait = wait < 0 ? 0 : (+wait || 0);
        if (this.isObject(options)) {
            leading = !!options.leading;
            maxWait = 'maxWait' in options && Math.max(+options.maxWait || 0, wait);
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
                lastCalled = Date.now();
                result = func.apply(thisArg, args);
                if (!timeoutId && !maxTimeoutId) {
                    args = thisArg = undefined;
                }
            }
        }

        function delayed() {
            var remaining = wait - (Date.now() - stamp);
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
            stamp = Date.now();
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
    },
    throttle: function (func, wait, options) {
        var leading = true,
            trailing = true;

        if (typeof func != 'function') {
            throw new TypeError('Expected a function');
        }
        if (this.isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        return this.debounce(func, wait, {
            'leading': leading,
            'maxWait': +wait,
            'trailing': trailing
        });
    }
};

function getPwd(passwd) {
    return encode64(passwd);
}


console.log(getPwd('dsadsads'));