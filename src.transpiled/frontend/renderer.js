'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var PIXI = _interopRequireWildcard(require("pixi.js"));

var _color = _interopRequireDefault(require("../util/color"));

var _encode_field = require("../util/encode_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const WIDTH = sm_to_px(2300) + 1;
const HEIGHT = sm_to_px(2300) + 1;
const MARGIN = 30;
var app = null;

function render(field) {
  createApp();
  drawBorder(); // draw letters on field border (as in the sea battle game)

  for (let i = 1; i <= 20; i++) {
    drawText(i * sm_to_px(115), 10, String.fromCharCode('A'.charCodeAt(0) + i - 1));
    drawText(10, i * sm_to_px(115), String.fromCharCode('A'.charCodeAt(0) + i - 1));
  } // draw crosses on the field


  for (let i = sm_to_px(115); i <= sm_to_px(2300); i += sm_to_px(115)) {
    for (let j = sm_to_px(115); j <= sm_to_px(2300); j += sm_to_px(115)) {
      drawCross(MARGIN + i, MARGIN + j, 5);
    }
  }

  drawParkingZone(...field.parkingZone);

  for (let i = 0; i < 5; i++) {
    drawBox(field.boxes[i], _color.default[field.boxColors[i]].value);

    for (let p of [point(115 - 30, 0), point(0, 115 - 30), point(230 - 60, 115 - 30), point(115 - 30, 230 - 60)]) {
      drawBox(add(field.boxes[i], p), _color.default[field.cubeColors[i]].value, 60);
    }
  } // draw strings with field element coordinates


  let descr = document.getElementById("field-descr");
  let parkingZoneDescr = document.createElement("p");
  let dir = {
    x: field.parkingZone[0].x + field.parkingZoneDirection.x,
    y: field.parkingZone[0].y + field.parkingZoneDirection.y
  };
  parkingZoneDescr.appendChild(document.createTextNode("Parking Zone: " + (0, _encode_field.encodePoint)(field.parkingZone[0]) + " " + (0, _encode_field.encodePoint)(dir)));
  descr.appendChild(parkingZoneDescr);

  for (let i = 0; i < 5; i++) {
    let boxDescr = document.createElement("p");
    boxDescr.appendChild(document.createTextNode(field.boxColors[i] + ": " + (0, _encode_field.encodePoint)(field.boxes[i])));
    descr.appendChild(boxDescr);
  }
}

function add(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}

function point(x, y) {
  return {
    x: x,
    y: y
  };
}

function createApp() {
  initPixi();
  let canvas = document.getElementById("field-canvas");
  app = new PIXI.Application({
    width: MARGIN + WIDTH,
    height: MARGIN + HEIGHT,
    view: canvas
  });
  app.renderer.backgroundColor = 0xFFFFFF;
}

function initPixi() {
  let type = "WebGL";

  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }

  PIXI.utils.sayHello(type);
}

function drawBorder() {
  let border = new PIXI.Graphics();
  border.lineStyle(5, 0x000000);
  border.moveTo(MARGIN, MARGIN);
  border.lineTo(MARGIN + WIDTH - 3, MARGIN);
  border.lineTo(MARGIN + WIDTH - 3, MARGIN + HEIGHT - 3);
  border.lineTo(MARGIN, MARGIN + HEIGHT - 3);
  border.lineTo(MARGIN, MARGIN);
  app.stage.addChild(border);
}

function sm_to_px(sm) {
  return sm / 4.0;
}

function drawCross(x, y, size) {
  let border = new PIXI.Graphics();
  border.lineStyle(1, 0x000000);
  border.moveTo(x - size / 2, y);
  border.lineTo(x + size / 2, y);
  border.moveTo(x, y - size / 2);
  border.lineTo(x, y + size / 2);
  app.stage.addChild(border);
}

function drawParkingZone(p1, p2, p3, p4) {
  let p = [];

  for (let i = 0; i < arguments.length; i++) {
    p.push({
      x: MARGIN + sm_to_px(arguments[i].x),
      y: MARGIN + sm_to_px(arguments[i].y)
    });
  }

  let border = new PIXI.Graphics();
  border.lineStyle(3, 0x00AA00);
  border.moveTo(0, 0);
  border.lineTo(p[1].x - p[0].x, p[1].y - p[0].y);
  border.lineStyle(3, 0x000000);
  border.lineTo(p[2].x - p[0].x, p[2].y - p[0].y);
  border.lineTo(p[3].x - p[0].x, p[3].y - p[0].y);
  border.pivot.x = (p[2].x - p[0].x) / 2;
  border.pivot.y = (p[2].y - p[0].y) / 2;
  border.position.x = (p[0].x + p[2].x) / 2;
  border.position.y = (p[0].y + p[2].y) / 2;
  app.stage.addChild(border);
}

function drawBox(point, color = 0x0000FF, size = 230, fill = true) {
  let border = new PIXI.Graphics();
  border.lineStyle(1, 0x000000);
  if (fill) border.beginFill(color);
  border.drawRect(MARGIN + sm_to_px(point.x), MARGIN + sm_to_px(point.y), sm_to_px(size), sm_to_px(size));
  if (fill) border.endFill();
  app.stage.addChild(border);
}

function drawText(x, y, text) {
  let textObj = new PIXI.Text(text, {
    fontFamily: 'Arial',
    fontSize: 9,
    fill: 0xff1010,
    align: 'center'
  });
  textObj.x = x;
  textObj.y = y;
  app.stage.addChild(textObj);
}
//# sourceMappingURL=renderer.js.map