'use strict';
import Parallax from 'parallax-js';
/**
 * @name Novicell pageheader-dots
 * @desc Paralax.js, parallax.js reacts to the orientation of your smart device, or position of cursor
 *       http://matthew.wagerfield.com/parallax/
 * @author Mark Hansen MGH
 * @requires https://github.com/wagerfield/parallax
 */

let prlx = function() {
    let scene = document.getElementById('pageheader-scene');
    if (!scene) {
        return;
    }
    let parallaxInstance = new Parallax(scene);
};

prlx();
