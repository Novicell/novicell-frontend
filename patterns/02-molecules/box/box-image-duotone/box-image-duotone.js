'use strict';

var novicell = novicell || {};

novicell.duotone = novicell.duotone || new function () {
    
    this.init = function () {
        let filterElements = document.getElementsByClassName('duotone-filter');
        if(isIE()){
            //IE does not support filter url, so below is an idea.
            //We can mimick the duotone by using a gradient
            //This will only change the first box-image-duotone            
            document.getElementsByClassName('box-image-duotone__image')[1].style.backgroundImage =`linear-gradient(
                rgba(255, 0, 0, 0.45), 
                rgba(255, 0, 0, 0.45)
                ),url(https://images.unsplash.com/photo-1498206005704-36d87df55231?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f85ad7268a727c31aae1ac78ef399677&auto=format&fit=crop&w=1986&q=80)`
        }else{
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

/* Sample function that returns boolean in case the browser is Internet Explorer*/
function isIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie; 
  }