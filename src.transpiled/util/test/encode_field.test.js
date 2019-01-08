"use strict";

var _encode_field = _interopRequireWildcard(require("../encode_field.js"));

var _mock_field = _interopRequireDefault(require("./mock_field"));

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('encodeField', function () {
  it('Successfully encodes a field to a valid string', function () {
    let field = (0, _mock_field.default)();
    (0, _chai.expect)((0, _encode_field.default)(field)).to.be.a('string');
  });
  it('Successfully encodes a field with correct symbols', function () {
    let field = (0, _mock_field.default)();
    let s = (0, _encode_field.default)(field);
    (0, _chai.expect)(s).to.be.a('string'); // TODO
  });
});
describe('encodePoint', function () {
  it('Successfully encodes a point to a valid string', function () {
    let p = {
      x: 115 * 7,
      y: 115 * 10
    };
    (0, _chai.expect)((0, _encode_field.encodePoint)(p)).to.be.a('string');
  });
  it('Successfully encodes a point with correct symbols', function () {
    let p = {
      x: 115 * 7,
      y: 115 * 10
    };
    (0, _chai.expect)((0, _encode_field.encodePoint)(p)).to.be.equal('HK');
  });
});
//# sourceMappingURL=encode_field.test.js.map