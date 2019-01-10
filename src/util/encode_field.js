import {nextIntIn} from "./random";

export function encodePoint(p) {
    return String.fromCharCode('A'.charCodeAt(0) + Math.round(p.x/115)) + "," + String.fromCharCode('A'.charCodeAt(0) + Math.round(p.y/115));
}

// 0 - top-left, bottom-right, 1 - top-right, bottom-left
function encodeBox(box, key = nextIntIn(0, 1)) {
    let p1 = {x: box.right, y: box.top};
    let p2 = {x: box.left, y: box.bott};
    if(key === 0) {
        p1 = {x: box.left, y: box.top};
        p2 = {x: box.right, y: box.bott};
    }
    return "(" + encodePoint(p1) + "," + encodePoint(p2) +")";
}

export default function encodeField(field) {
    let res = "";

    // parking zone top left point
    res += "(" + encodePoint(field.parkingZone[0]) + ",";

    // parking zone direction point
    let dir = {x: field.parkingZone[0].x + field.parkingZoneDirection.x,
               y: field.parkingZone[0].y + field.parkingZoneDirection.y};
    res += encodePoint(dir) + ")";

    // blue box
    let blueIdx = field.boxColors.indexOf("Blue");
    res += encodeBox(field.boxes[blueIdx], nextIntIn(0, 2));

    // first box
    let firstIdx = field.boxColors.indexOf(field.cubeColors[blueIdx]);
    res += encodeBox(field.boxes[firstIdx], nextIntIn(0, 2));

    // second box
    let secondIdx = field.boxColors.indexOf(field.cubeColors[firstIdx]);
    res += encodeBox(field.boxes[secondIdx], nextIntIn(0, 2));

    return res;
}
