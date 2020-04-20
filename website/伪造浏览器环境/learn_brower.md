# 浏览器与本地环境的区别
    - 全局变量
        - 在浏览器环境，全局对象即为window对象
        - 在本地node环境，全局对象为global
        - 两者有一定区别，简单点说，window对象有的方法或属性，global对象不一定有，反之，global对象下有的，window基本都有
        `var prop = Object.getOwnPropertyNames(global)`
        `console.log(prop)`
        `[`
            `'Object',             'Function',       'Array',`
            `'Number',             'parseFloat',     'parseInt',`
            `'Infinity',           'NaN',            'undefined',`
            `Boolean',            'String',         'Symbol',`
            `'Date',               'Promise',        'RegExp',`
            `'Error',              'EvalError',      'RangeError',`
            `'ReferenceError',     'SyntaxError',    'TypeError',`
            `'URIError',           'globalThis',     'JSON',`
            `'Math',               'console',        'Intl',`
            `'ArrayBuffer',        'Uint8Array',     'Int8Array',`
            `'Uint16Array',        'Int16Array',     'Uint32Array',`
            `'Int32Array',         'Float32Array',   'Float64Array',`
            `'Uint8ClampedArray',  'BigUint64Array', 'BigInt64Array',`
            `'DataView',           'Map',            'BigInt',`
            `'Set',                'WeakMap',        'WeakSet',`
            `'Proxy',              'Reflect',        'decodeURI',`
            `'decodeURIComponent', 'encodeURI',      'encodeURIComponent',`
            `'escape',             'unescape',       'eval',`
            `'isFinite',           'isNaN',          'SharedArrayBuffer',`
            `'Atomics',            'WebAssembly',    'global',`
            `'process',            'GLOBAL',         'root',`
            `'Buffer',             'URL',            'URLSearchParams',`
            `'TextEncoder',        'TextDecoder',    'clearInterval',`
            `'clearTimeout',       'setInterval',    'setTimeout',`
            `'queueMicrotask',     'clearImmediate', 'setImmediate'`
        `]`
        
# 总之一个原则就是缺啥补啥
    