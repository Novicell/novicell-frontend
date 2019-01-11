'use strict';

var novicell = novicell || {};

novicell.duotone =
    novicell.duotone ||
    new function() {
        this.init = function() {
            let filterElements = document.getElementsByClassName(
                'duotone-filter'
            );
            let boxImages = document.getElementsByClassName(
                'box-image-duotone__image'
            );
            //IE fallback begins if statement. Does not support grayscale yet
            if (isIE()) {
                //No grayscale implemented yet
                //We can mimick the duotone by using a gradient
                for (let i = 0; i < boxImages.length; i++) {
                    let url;
                    if (boxImages[i].style.backgroundImage != '') {
                        //Get only the url of the current background-image as it will need to be passed again
                        //alongside the linear-gradient
                        url = boxImages[i].style.backgroundImage
                            .split('url("')[1]
                            .split('")')[0];
                        boxImages[i].style.backgroundImage = `linear-gradient(
                        rgba(${convertHex(
                            filterElements[i].attributes[2].value,
                            60
                        )}),
                        rgba(${convertHex(
                            filterElements[i].attributes[3].value,
                            60
                        )})
                        ),url(${url})`;
                    }
                }
            } else {
                for (let index = 0; index < filterElements.length; index++) {
                    const filter = filterElements[index];
                    let rgbValueLight = hexToRgb(filter.dataset.lightColor);
                    let rgbValueDark = hexToRgb(filter.dataset.darkColor);

                    for (var key in rgbValueLight) {
                        if (rgbValueLight.hasOwnProperty(key)) {
                            rgbValueLight[key] = rgbValueLight[key] / 255;
                        }
                    }
                    for (var key2 in rgbValueDark) {
                        if (rgbValueDark.hasOwnProperty(key2)) {
                            rgbValueDark[key2] = rgbValueDark[key2] / 255;
                        }
                    }
                    let filterColorChange = filter.getElementsByClassName(
                        'duotone-color-change'
                    );
                    for (
                        let index = 0;
                        index < filterColorChange.length;
                        index++
                    ) {
                        let duotoneRed = filter.getElementsByClassName(
                            'duotone-red'
                        );
                        let duotoneGreen = filter.getElementsByClassName(
                            'duotone-green'
                        );
                        let duotoneBlue = filter.getElementsByClassName(
                            'duotone-blue'
                        );
                        duotoneRed[0].setAttribute(
                            'tableValues',
                            rgbValueLight.r + ' ' + rgbValueDark.r
                        );
                        duotoneGreen[0].setAttribute(
                            'tableValues',
                            rgbValueLight.g + ' ' + rgbValueDark.g
                        );
                        duotoneBlue[0].setAttribute(
                            'tableValues',
                            rgbValueLight.b + ' ' + rgbValueDark.b
                        );
                    }
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

    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    } else {
        return null;
    }
}

//A new function for converting hex to rgb including an opacity option. Seems the hexToRgb() does not work for the IE11 workaround
function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let result = r + ',' + g + ',' + b + ',' + opacity / 100 + '';
    return result;
}

/* Sample function that returns boolean in case the browser is Internet Explorer*/
function isIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    let is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return is_ie;
}
