'use strict';

/**
 * @name Novicell pageheader-dots
 * @desc Paralax.js, parallax.js reacts to the orientation of your smart device, or position of cursor
 *       http://matthew.wagerfield.com/parallax/
 * @author Mark Hansen MGH
 * @requires https://github.com/wagerfield/parallax
 */

var novicell = novicell || {};

novicell.pageheaderDots =
    novicell.pageheaderDots ||
    new function() {
        this.init = function() {
            var scene = document.getElementById('pageheader-scene');
            if (!scene) {
                return;
            }
            var parallaxInstance = new Parallax(scene);
        };
    }();
