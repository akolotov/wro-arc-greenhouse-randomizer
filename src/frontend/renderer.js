
'use strict';

import * as PIXI from 'pixi.js';
import Color from '../util/color';

const WIDTH = sm_to_px(2300)+1;
const HEIGHT = sm_to_px(2300)+1;

const MARGIN = 30;

var app = null;


function add(p1, p2) {
    return {x: p1.x + p2.x, y: p1.y + p2.y};
}



function point(x, y) {
    return {x: x, y: y};
}



function createApp() {
    initPixi();
    app = new PIXI.Application({width: MARGIN + WIDTH, height: MARGIN + HEIGHT});
    app.view.id = "pixi-canvas";
    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0xFFFFFF;
}



function initPixi() {
    let type = "WebGL";

    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }

    PIXI.utils.sayHello(type);
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

    border.lineStyle(3, 0x00FF00);
    border.moveTo(p[0].x, p[0].y);
    border.lineTo(p[1].x, p[1].y);

    border.lineStyle(3, 0x000000);
    border.lineTo(p[2].x, p[2].y);
    border.lineTo(p[3].x, p[3].y);

    border.lineStyle(2, 0x444444);
    border.moveTo(p[0].x, p[0].y);
    border.drawCircle(sm_to_px(345 + 17));

    app.stage.addChild(border);

}



function drawBox(point, color=0x0000FF, size=230, fill=true) {
    let border = new PIXI.Graphics();

    border.lineStyle(1, 0x000000);
    if(fill) border.beginFill(color);
    border.drawRect(MARGIN + sm_to_px(point.x), MARGIN + sm_to_px(point.y), sm_to_px(size), sm_to_px(size));
    if(fill) border.endFill();

    app.stage.addChild(border);
}



function drawText(x, y, text) {
    let textObj = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: 9, fill : 0xff1010, align : 'center'});
    textObj.x = x;
    textObj.y = y;

    app.stage.addChild(textObj);
}



export function render(field) {
    createApp();

    let border = new PIXI.Graphics();

    border.lineStyle(5, 0x000000);

    border.moveTo(MARGIN, MARGIN);
    border.lineTo(MARGIN + WIDTH, MARGIN);
    border.lineTo(MARGIN + WIDTH, MARGIN + HEIGHT - 1);
    border.lineTo(MARGIN, MARGIN + HEIGHT - 1);
    border.lineTo(MARGIN + 1, MARGIN);

    app.stage.addChild(border);

    for (let i = 1; i <= 20; i++) {
        drawText(i * sm_to_px(115), 10, String.fromCharCode('A'.charCodeAt(0) + i - 1));
        drawText(10, i * sm_to_px(115), String.fromCharCode('A'.charCodeAt(0) + i - 1));
    }

    for (let i = sm_to_px(115); i <= sm_to_px(2300); i += sm_to_px(115)) {
        for (let j = sm_to_px(115); j <= sm_to_px(2300); j += sm_to_px(115)) {
            drawCross(MARGIN + i, MARGIN + j, 5);
        }
    }

    if(field.parkingZone != null) {
        drawParkingZone(...field.parkingZone);
        for(let i = 0; i < 5; i++) {
            drawBox(field.boxes[i], Color[field.boxColors[i]].value);
            for(let p of [point(115 - 30, 0), point(0, 115 - 30), point(230 - 60, 115 - 30), point(115 - 30, 230 - 60)]) {
                drawBox(add(field.boxes[i], p), Color[field.cubeColors[i]].value, 60);
            }
        }
    }
}