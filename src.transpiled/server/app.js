"use strict";

var path = _interopRequireWildcard(require("path"));

var _express = _interopRequireDefault(require("express"));

var _generate_field = _interopRequireDefault(require("./generate_field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var app = (0, _express.default)();
app.get('/field', async function (req, res, next) {
  let field = await (0, _generate_field.default)();
  res.send(field);
  next();
}); // Serve static files

app.use('/', _express.default.static(path.join('public'))); // Fire it up!

app.listen(5000);
console.log('Listening on port 5000');
//# sourceMappingURL=app.js.map