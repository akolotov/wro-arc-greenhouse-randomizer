'use strict';

import {render} from './renderer';

import createQR from './qr_code_renderer';
import getField from "./get_field";

window.onload = () => {
    getField().then((field) => {
        render(field);
        createQR(field);
    }).catch(err => {
        console.log(err);
    });
};
