"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createColor(name, v) {
  function Color() {
    this.name = name;
    this.value = v;
  }

  let c = new Color();
  return Object.freeze(c);
}

const Color = {
  "Blue": createColor("Blue", 0x10069F),
  "Red": createColor("Red", 0xF22630),
  "Green": createColor("Green", 0x44D62C),
  "Orange": createColor("Orange", 0xFD5E00),
  "Yellow": createColor("Yellow", 0xFDE900)
};
exports.default = Color;
let colorNames = Object.keys(Color);

function randomColor() {
  let id = Math.floor(Math.random() * 1000) % colorNames.length;
  return Color[colorNames[id]];
}

function randomColorExcluding(colorsExcluded) {
  let excludedNames = colorsExcluded.map(c => c.name);
  let subsetNames = colorNames.filter(v => !excludedNames.includes(v));
  let id = Math.floor(Math.random() * 1000) % subsetNames.length;
  return Color[subsetNames[id]];
}

Color.randomColor = randomColor;
Color.randomColorExcluding = randomColorExcluding;
Object.freeze(Color);
//# sourceMappingURL=color.js.map