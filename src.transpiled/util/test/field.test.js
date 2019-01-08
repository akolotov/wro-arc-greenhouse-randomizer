"use strict";

var _field = _interopRequireDefault(require("../field.js"));

var _chai = require("chai");

var _mock_field = _interopRequireWildcard(require("./mock_field"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Mock Field", function () {
  it("Is an object", function () {
    (0, _chai.expect)((0, _mock_field.getMockFieldDescription)()).to.be.an("object");
  });
});
describe("Field", function () {
  describe("#constructor", function () {
    it("Creates a field from description", function () {
      (0, _chai.expect)(new _field.default((0, _mock_field.getMockFieldDescription)())).to.be.an('object');
    });
    it("Fails with empty description", function () {
      (0, _chai.expect)(() => new _field.default()).to.throw();
    });
  });
});
//# sourceMappingURL=field.test.js.map