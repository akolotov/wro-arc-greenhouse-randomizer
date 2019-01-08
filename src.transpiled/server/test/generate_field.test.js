"use strict";

var _chai = require("chai");

var _generate_field = _interopRequireDefault(require("../generate_field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('generateField', function () {
  it('Returns a field object', function (done) {
    (0, _generate_field.default)().then(res => {
      (0, _chai.expect)(res).to.be.an("object");
      done();
    }).catch(done);
  });
});
//# sourceMappingURL=generate_field.test.js.map