'use strict';
import Flickity from 'flickity';

/**
 * @name Novicell Slider
 * @desc Slider, for custom arrow use https://flickity.metafizzy.co/options.html#arrowshape
 * @author Emil Ankersen (EAN)
 * @requires https://flickity.metafizzy.co/
 */

const elem = document.querySelector('.js-pageheader-slider');

if (elem && elem != null) {
    /* eslint-disable no-new */
    new Flickity(elem, {
        // options
        'cellAlign': 'left',
        'contain': true
    });
}
