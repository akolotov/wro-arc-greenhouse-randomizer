"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateField;

var child_process = _interopRequireWildcard(require("child_process"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const generator_path = "generator/bin/generator";

const util = require('util'); // it's exported just for means of testing
// also it's worth noticing that the function does not exactly generate the field, but calls a generator, which is an executable file,
// and returns an object built from JSON representation of a field provided by stdout of the called generator,
// also saving stderr as a field of the object


async function generateField() {
  const exec = util.promisify(child_process.exec);
  const {
    stdout,
    stderr
  } = await exec(generator_path);
  let f = {};
  f = JSON.parse(stdout);
  if (stderr.toString().length > 0) f.err = stderr;else {
    f.err = null;
  }
  return f;
}
//# sourceMappingURL=generate_field.js.map