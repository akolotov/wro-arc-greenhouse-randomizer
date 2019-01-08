"use strict";

function drawParkingZoneFreeZone(p1, p2, p3, p4) {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].x = sm_to_px(arguments[i].x);
    arguments[i].y = sm_to_px(arguments[i].y);
  }

  let border = new PIXI.Graphics();
  border.lineStyle(1, 0xAAAA00);
  border.moveTo(p1.x, p1.y);
  border.lineTo(p2.x, p2.y);
  border.moveTo(p3.x, p3.y);
  border.lineTo(p4.x, p4.y);
  border.lineStyle(1, 0xFF0000);
  border.drawCircle(p1.x, p1.y, sm_to_px(460));
  border.drawCircle(p4.x, p4.y, sm_to_px(460));
  app.stage.addChild(border);
}
//# sourceMappingURL=debug_renderer.js.map