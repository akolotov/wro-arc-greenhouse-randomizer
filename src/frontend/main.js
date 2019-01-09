'use strict';

import {render} from './renderer';

import createQR from './qr_code_renderer';
import getField from "./get_field";
import encodeField from "../util/encode_field";

window.onload = () => {
    getField().then((field) => {
        let encoded_descr = encodeField(field);
        render(field, encoded_descr);
        createQR(field, encoded_descr);
    }).catch(err => {
        console.log(err);
    });
};
