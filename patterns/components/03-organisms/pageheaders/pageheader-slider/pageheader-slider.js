'use strict';

/**
 * @name Novicell Slider
 * @desc Slider, for custom arrow use https://flickity.metafizzy.co/options.html#arrowshape
 * @author Emil Ankersen (EAN) & Mette Krogsgaard Andersen (MKA)
 * @requires https://flickity.metafizzy.co/
 */

var novicell = novicell || {};

novicell.pageheaderSlider =
    novicell.pageheaderSlider ||
    new function() {
        this.init = function() {
            const elem = document.querySelector('.js-pageheader-slider');
            if (elem && elem != null) {
                let flkty = new Flickity(elem, {
                    // options
                    cellAlign: 'left',
                    contain: true,
                    wrapAround: true,
                    // custom arrows can be drawn on the flickity website ...
                    arrowShape: {
                        x0: 10,
                        x1: 60,
                        y1: 50,
                        x2: 70,
                        y2: 35,
                        x3: 25
                    }
                    // arrowShape: // Or use a SVG path string
                    //     'M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z'
                });
            }
        };
    }();
