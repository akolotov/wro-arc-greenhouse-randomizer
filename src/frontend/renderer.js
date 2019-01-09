
'use strict';

import * as PIXI from 'pixi.js';
import Color from '../util/color';
import {encodePoint} from '../util/encode_field';
import {nextIntIn} from "../util/random";

const WIDTH = sm_to_px(2300)+1;
const HEIGHT = sm_to_px(2300)+1;

const MARGIN = 30;

var app = null;



// field - an object of type Field, containing the description of the field to render
// encoded_descr - a string with some important data about the field
export function render(field, encoded_descr) {
    createApp();

    drawBorder();

    // draw letters on field border (as in the sea battle game)
    for (let i = 1; i <= 20; i++) {
        drawText(i * sm_to_px(115), 10, String.fromCharCode('A'.charCodeAt(0) + i - 1));
        drawText(10, i * sm_to_px(115), String.fromCharCode('A'.charCodeAt(0) + i - 1));
    }

    // draw crosses on the field
    for (let i = sm_to_px(115); i <= sm_to_px(2300); i += sm_to_px(115)) {
        for (let j = sm_to_px(115); j <= sm_to_px(2300); j += sm_to_px(115)) {
            drawCross(MARGIN + i, MARGIN + j, 5);
        }
    }

    drawParkingZone(...field.parkingZone);
    for(let i = 0; i < 5; i++) {
        drawBox(field.boxes[i], Color[field.boxColors[i]].value);
        for(let p of [point(115 - 30, 0), point(0, 115 - 30), point(230 - 60, 115 - 30), point(115 - 30, 230 - 60)]) {
            let b = field.boxes[i];
            drawBox({top: b.top + p.y, left: b.left + p.x, bott: b.top + p.y + 60, right: b.left + p.x + 60},
                Color[field.cubeColors[i]].value);
        }
    }

    // draw strings with field element coordinates
    let descr = document.getElementById("field-descr");
    let parkingZoneDescr = document.createElement("p");
    parkingZoneDescr.setAttribute("class", "descr-paragraph");
    let dir = {x: field.parkingZone[0].x + field.parkingZoneDirection.x,
               y: field.parkingZone[0].y + field.parkingZoneDirection.y};
    parkingZoneDescr.appendChild(document.createTextNode(
        "Parking Zone: " + encodePoint(field.parkingZone[0]) + " " + encodePoint(dir)));
    descr.appendChild(parkingZoneDescr);

    let blueIdx = field.boxColors.indexOf("Blue");
    let firstIdx = field.boxColors.indexOf(field.cubeColors[blueIdx]);
    let secondIdx = field.boxColors.indexOf(field.cubeColors[firstIdx]);

    for(let i = 0; i < 5; i++) {
        let boxDescr = document.createElement("p");
        let p1;
        let p2;
        if(i !== blueIdx && i !== firstIdx && i !== secondIdx) {
            p1 = {x: field.boxes[i].right, y: field.boxes[i].top};
            p2 = {x: field.boxes[i].left, y: field.boxes[i].bott};
            if (nextIntIn(0, 2) === 0) {
                p1 = {x: field.boxes[i].left, y: field.boxes[i].top};
                p2 = {x: field.boxes[i].right, y: field.boxes[i].bott};
            }
            p1 = encodePoint(p1);
            p2 = encodePoint(p2);

        } else {
            let start = (i === blueIdx) ? 4
                      : (i === firstIdx) ? 8
                      : (i === secondIdx) ? 12
                      : undefined;
            p1 = encoded_descr.slice(start, start + 2);
            p2 = encoded_descr.slice(start + 2, start + 4);
        }
        boxDescr.appendChild(document.createTextNode(field.boxColors[i] + ": " + p1 + " " + p2));
        boxDescr.setAttribute("class", "descr-paragraph");
        descr.appendChild(boxDescr);
    }

}



function point(x, y) {
    return {x: x, y: y};
}



function createApp() {
    initPixi();
    let canvas = document.getElementById("field-canvas");
    app = new PIXI.Application({width: MARGIN + WIDTH, height: MARGIN + HEIGHT, view: canvas});
    app.renderer.backgroundColor = 0xFFFFFF;
}



function initPixi() {
    let type = "WebGL";

    if(!PIXI.utils.isWebGLSupported()){
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
        p.push({ x: MARGIN + sm_to_px(arguments[i].x),
                 y: MARGIN + sm_to_px(arguments[i].y) });
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



function drawBox(rect, color=0x0000FF, fill=true) {
    let border = new PIXI.Graphics();

    border.lineStyle(1, 0x000000);
    if(fill) border.beginFill(color);
    border.drawRect(MARGIN + sm_to_px(rect.left), MARGIN + sm_to_px(rect.top),
                    sm_to_px(rect.right - rect.left), sm_to_px(rect.bott - rect.top));
    if(fill) border.endFill();

    app.stage.addChild(border);
}



function drawText(x, y, text) {
    let textObj = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: 9, fill : 0xff1010, align : 'center'});
    textObj.x = x;
    textObj.y = y;

    app.stage.addChild(textObj);
}
