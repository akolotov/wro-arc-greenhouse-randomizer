"use strict";

var _color = _interopRequireDefault(require("../color.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assert = require('chai').assert;

describe("color", function () {
  it("Blue deep equals Blue", function () {
    assert.deepEqual(_color.default.Blue, _color.default.Blue);
  });
  it("Blue strictly equals Blue", function () {
    assert.strictEqual(_color.default.Blue, _color.default.Blue);
  });
  it("Blue does not equal Red", function () {
    assert.notEqual(_color.default.Blue, _color.default.Red);
  });
  it("Is Immutable to Adding Fields", function () {
    assert.throws(() => _color.default.Pink = "Whatever", TypeError);
  });
  it("Is Immutable to Reassigning Fields", function () {
    assert.throws(() => _color.default.Red = "Else", TypeError);
  });
  it("Is Immutable to Changing Fields", function () {
    assert.throws(() => _color.default.Red.r = 100, TypeError);
  });
  describe("#randomColor", function () {
    it('Generates valid color', function () {
      for (let i = 0; i < 10; i++) {
        let c = _color.default.randomColor();

        assert.deepEqual(c, _color.default[c.name], "Actual name: " + c.name);
      }
    });
  });
  describe("#randomColorExcluding", function () {
    it('Generates valid color which is not in excluded list', function () {
      for (let i = 0; i < 30; i++) {
        let c = _color.default.randomColorExcluding([_color.default.Blue, _color.default.Red]);

        assert.notDeepEqual(c, _color.default.Red);
        assert.notDeepEqual(c, _color.default.Blue);
        assert.deepEqual(c, _color.default[c.name], "Actual name: " + c.name);
      }
    });
  });
});
//# sourceMappingURL=color.test.js.map