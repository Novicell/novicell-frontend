'use strict';
var novicell = novicell || {};
var AOS = AOS || {};

novicell.animateOnScroll =
    novicell.animateOnScroll ||
    new function () {
        this.init = () => {
            AOS.init({});
        };
    }();
