'use strict';

/**
 * @name Novicell Slider
 * @desc Slider, for custom arrow use https://flickity.metafizzy.co/options.html#arrowshape
 * @author Emil Ankersen (EAN)
 * @requires https://flickity.metafizzy.co/
 */


var novicell = novicell || {};

novicell.pageheaderSlider = novicell.pageheaderSlider || new function () {

    this.init = function () {
        const elem = document.querySelector('.js-pageheader-slider');        
        if (elem && elem != null) {
            let flkty = new Flickity(elem, {
                // options
                cellAlign: 'left',
                contain: true,
            });
        }
    };
}();
