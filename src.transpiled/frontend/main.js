'use strict';

var _renderer = require("./renderer");

var _qr_code_renderer = _interopRequireDefault(require("./qr_code_renderer"));

var _get_field = _interopRequireDefault(require("./get_field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = () => {
  (0, _get_field.default)().then(field => {
    (0, _renderer.render)(field);
    (0, _qr_code_renderer.default)(field);
  }).catch(err => {
    console.log(err);
  });
};
//# sourceMappingURL=main.js.map