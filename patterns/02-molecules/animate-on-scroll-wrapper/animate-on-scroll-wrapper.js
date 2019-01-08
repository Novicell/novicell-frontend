'use strict';
var novicell = novicell || {};
novicell.animateOnScroll =
    novicell.animateOnScroll ||
    new function () {
        this.init = () => {
            let animateWrapper = document.getElementsByClassName(
                'list-page-item'
            );
            if (animateWrapper.length === 0) {
                return;
            }
            for (let i = 0; i < animateWrapper.length; i++) {
                animateElement(animateWrapper[i], 'fade-up-right');
            }
            AOS.init({});
        };
    }();
let animateElement = (element, animation) => {
    element.dataset.aos = animation;
};
