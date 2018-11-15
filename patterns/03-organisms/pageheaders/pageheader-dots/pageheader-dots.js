'use strict';

/**
 * @name Novicell pageheader-dots
 * @desc Slider, for custom arrow use https://flickity.metafizzy.co/options.html#arrowshape
 * @author Mark Hansen MGH
 * @requires https://github.com/wagerfield/parallax#3-methods
 */


var novicell = novicell || {};

novicell.pageheaderDots = novicell.pageheaderDots || new function () {
    this.init = function () {
        var scene = document.getElementById('pageheader-scene');
        var parallaxInstance = new Parallax(scene);
    };
}();
