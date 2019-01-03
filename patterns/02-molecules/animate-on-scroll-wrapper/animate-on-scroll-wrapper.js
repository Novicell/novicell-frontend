'use strict';
var novicell = novicell || {};

novicell.animateOnScroll =
    novicell.animateOnScroll ||
    new function() {
        this.init = function() {
            let animateWrapper = document.getElementsByClassName(
                'animate-wrapper'
            )[0];
            AOS.init({});
            if (!animateWrapper) {
                return;
            }
            animateElement(animateWrapper, 'fade-in');
        };
    }();
let animateElement = (element, animation) => {
    element.dataset.aos = animation;
};
