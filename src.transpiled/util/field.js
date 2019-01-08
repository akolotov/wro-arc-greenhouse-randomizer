'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _color = _interopRequireDefault(require("./color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Field {
  constructor(descr) {
    function isPoint(p) {
      return typeof p.x === 'number' && typeof p.y === 'number';
    }

    function isValidArrayOf(arr, num, validator_callback) {
      if (!Array.isArray(arr) || arr.length !== num) return false;

      for (let v of arr) {
        if (!validator_callback(v)) return false;
      }

      return true;
    }

    if (typeof descr === 'undefined' || descr === null) throw Error("Field description is undefined or null");

    if (isValidArrayOf(descr.parkingZone, 4, isPoint)) {
      // all elements are points
      this.parkingZone = descr.parkingZone;
    } else {
      throw Error("'parkingZone' field of the description should be an array of four points; Got " + descr.parkingZone);
    }

    if (typeof descr.parkingZoneDirection === "object" && isPoint(descr.parkingZoneDirection)) {
      this.parkingZoneDirection = descr.parkingZoneDirection;
    } else {
      throw Error("'parkingZoneDirection' field of the description should be an point; Got " + descr.parkingZoneDirection);
    }

    if (isValidArrayOf(descr.boxes, 5, isPoint)) {
      // all elements are points
      this.boxes = descr.boxes;
    } else {
      throw Error("'boxes' field of the description should be an array of five points; Got " + descr.boxes);
    }

    if (isValidArrayOf(descr.boxColors, 5, v => typeof _color.default.hasOwnProperty(v))) {
      this.boxColors = descr.boxColors;
    } else {
      throw Error("'boxColors' field of the description should be an array of five strings denoting colors; Got " + descr.boxColors);
    }

    if (isValidArrayOf(descr.cubeColors, 5, v => typeof _color.default.hasOwnProperty(v))) {
      this.cubeColors = descr.cubeColors;
    } else {
      throw Error("'cubeColors' field of the description should be an array of five strings denoting colors; Got " + descr.cubeColors);
    }
  }

}

exports.default = Field;
//# sourceMappingURL=field.js.map