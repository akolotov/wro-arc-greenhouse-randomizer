"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePoint = encodePoint;
exports.default = encodeField;

function encodePoint(p) {
  return String.fromCharCode('A'.charCodeAt(0) + Math.round(p.x / 115)) + String.fromCharCode('A'.charCodeAt(0) + Math.round(p.y / 115));
}

function encodeField(field) {
  let res = ""; // parking zone top left point

  res += encodePoint(field.parkingZone[0]); // parking zone direction point

  let dir = {
    x: field.parkingZone[0].x + field.parkingZoneDirection.x,
    y: field.parkingZone[0].y + field.parkingZoneDirection.y
  };
  res += encodePoint(dir); // blue box

  let blueIdx = field.boxColors.indexOf("Blue");
  res += encodePoint(field.boxes[blueIdx]); // first box

  let firstIdx = field.boxColors.indexOf(field.cubeColors[blueIdx]);
  res += encodePoint(field.boxes[firstIdx]); // second box

  let secondIdx = field.boxColors.indexOf(field.cubeColors[firstIdx]);
  res += encodePoint(field.boxes[secondIdx]);
  return res;
}
//# sourceMappingURL=encode_field.js.map