'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getField;

var _field = _interopRequireDefault(require("../util/field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let field = null;

async function getField() {
  if (field == null) {
    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:3000/field';
    Http.open("GET", url);
    return new Promise(resolve => {
      Http.send();

      Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          field = JSON.parse(this.responseText);
          console.log(field);
          field = new _field.default(field);
          resolve(field);
        }
      };
    });
  } else {
    return field;
  }
}
//# sourceMappingURL=get_field.js.map