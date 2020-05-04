function transfer() {
  if ("\u202E" !== "\u202E") {
    return;
  }

  var _0x3f0c99 = arguments;

  var _0x83b777;

  for (_0x83b777 = 0; _0x83b777 < 760; _0x83b777++) {
    if (_0x3f0c99[_0x83b777].type === "StringLiteral") {
      _0x3f0c99[_0x83b777].value = _0x3f0c99[_0x83b777].value["split"]("")["reverse"]()["join"]("");
    }
  }

  for (_0x83b777 = 0; _0x83b777 < 760 / 2; _0x83b777++) {
    var _0x1f2bc2 = _0x3f0c99[_0x83b777];
    _0x3f0c99[_0x83b777] = _0x3f0c99[760 - _0x83b777 - 1];
    _0x3f0c99[760 - _0x83b777 - 1] = _0x1f2bc2;
  }

  return _0x3f0c99;
}

module.exports = transfer;