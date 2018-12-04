'use strict';

var novicell = novicell || {};

novicell.duotone = novicell.duotone || new function () {

    this.init = function () {
        let filterElements = document.getElementsByClassName('js-duotone-filter');
        for (let index = 0; index < filterElements.length; index++) {
            const filter = filterElements[index];
            let rgbValueLight = hexToRgb(filter.dataset.lightColor);
            let rgbValueDark = hexToRgb(filter.dataset.darkColor);

            for (var key in rgbValueLight) {
                if (rgbValueLight.hasOwnProperty(key)) {
                    rgbValueLight[key] = rgbValueLight[key]/255;
                }
            }
            for (var key in rgbValueDark) {
                if (rgbValueDark.hasOwnProperty(key)) {
                    rgbValueDark[key] = rgbValueDark[key]/255;
                }
            }
            let filterColorChange = filter.getElementsByClassName('duotone-color-change');
            for (let index = 0; index < filterColorChange.length; index++) {
                let duotoneRed = filter.getElementsByClassName('duotone-red');
                let duotoneGreen = filter.getElementsByClassName('duotone-green');
                let duotoneBlue = filter.getElementsByClassName('duotone-blue');

                duotoneRed[0].setAttribute("tableValues", rgbValueLight['r'] + ' ' + rgbValueDark['r']);
                duotoneGreen[0].setAttribute("tableValues", rgbValueLight['g'] + ' ' + rgbValueDark['g']);
                duotoneBlue[0].setAttribute("tableValues", rgbValueLight['b'] + ' ' + rgbValueDark['b']);
            }
        }
    };
}();
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}