'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createQR;

var _encode_field = _interopRequireDefault(require("../util/encode_field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QRCode = require('qrcode');

function createQR(field) {
  let canvas = document.getElementById("qr-code");
  let code = (0, _encode_field.default)(field);
  let encoded_text = document.getElementById("encoded-field");
  encoded_text.appendChild(document.createTextNode(code));
  QRCode.toCanvas(canvas, (0, _encode_field.default)(field), {
    width: 128,
    height: 128,
    color: {
      dark: "#000000",
      light: "#ffffff"
    },
    errorCorrectionLevel: 'H'
  }, function (error) {
    if (error) console.error(error);
  });
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = "3";
  ctx.strokeStyle = "black";
  ctx.rect(5, 5, 118, 118);
  ctx.stroke();
}
//# sourceMappingURL=qr_code_renderer.js.map