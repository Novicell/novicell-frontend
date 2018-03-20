'use strict';

/**
 * @name Novicell Slider
 * @desc Slider, for custom arrow use https://flickity.metafizzy.co/options.html#arrowshape
 * @author Emil Ankersen (EAN)
 * @requires https://flickity.metafizzy.co/
 */


var novicell = novicell || {};

novicell.slider = novicell.slider || new function () {

    this.init = function () {
        var elem = document.querySelector('.js-slider');
        var flkty = new Flickity(elem, {
            // options
            cellAlign: 'left',
            contain: true,
        });
    };
}();
