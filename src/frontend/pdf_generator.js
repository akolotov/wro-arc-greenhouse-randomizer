'use strict';

import * as jsPDF from 'jspdf';

export default function generate() {
    console.log("Generating");

    let field = document.getElementById("field-canvas");
    let qr_code = document.getElementById("qr-code");
    let encoded_string = document.getElementById("encoded-field");
    let element_coords = document.getElementById("field-descr");

    let doc = new jsPDF();

    let shift = 0;
    for (let coords of element_coords.children) {
        doc.text(coords.innerText, 120, 15 + shift);
        shift += 10;
    }

    doc.addImage(field, 'PNG', 15, 15, 100, 100);
    doc.addImage(qr_code, 'PNG', 15, 150, 85, 85);
    doc.text(encoded_string.innerText, 15, 140);
    doc.save('a4.pdf');
}
