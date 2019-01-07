'use strict';

import encodeField from '../util/encode_field';
const QRCode = require('qrcode');



export default function createQR(field) {
    let canvas = document.getElementById("qr-code");

    let code = encodeField(field);

    let encoded_text = document.getElementById("encoded-field");
    encoded_text.appendChild(document.createTextNode(code));

    QRCode.toCanvas(canvas, encodeField(field),
        {
            width: 128,
            height: 128,
            color: { dark: "#000000", light : "#ffffff" },
            errorCorrectionLevel: 'H'
        },
        function (error) {
            if (error) console.error(error);
        }
    );
}
