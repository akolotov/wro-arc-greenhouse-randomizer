"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMockField;
exports.getMockFieldDescription = getMockFieldDescription;

var _field = _interopRequireDefault(require("../field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMockField() {
  return new _field.default(getMockFieldDescription());
}

function getMockFieldDescription() {
  return {
    parkingZone: [{
      x: 460,
      y: 805
    }, {
      x: 640,
      y: 491
    }, {
      x: 954,
      y: 671
    }, {
      x: 774,
      y: 985
    }],
    parkingZoneDirection: {
      x: -230,
      y: -230
    },
    boxes: [{
      x: 1955,
      y: 1725
    }, {
      x: 1725,
      y: 920
    }, {
      x: 1150,
      y: 230
    }, {
      x: 1495,
      y: 1265
    }, {
      x: 1840,
      y: 575
    }],
    boxColors: ["Blue", "Green", "Orange", "Red", "Yellow"],
    cubeColors: ["Green", "Orange", "Blue", "Yellow", "Red"]
  };
}
//# sourceMappingURL=mock_field.js.map