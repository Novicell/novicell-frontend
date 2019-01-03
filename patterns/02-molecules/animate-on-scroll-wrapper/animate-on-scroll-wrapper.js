'use strict';
var novicell = novicell || {};

novicell.animateOnScroll =
    novicell.animateOnScroll ||
    new function() {
        this.init = function() {
            AOS.init();
        };
    }();
