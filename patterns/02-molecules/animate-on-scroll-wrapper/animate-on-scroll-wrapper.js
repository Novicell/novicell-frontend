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
                animateElement(animateWrapper[i], {
                    'data-aos': 'fade-right',
                    'data-aos-delay': '1500'
                });
            }
            AOS.init({});
        };
    }();
let animateElement = (element, args = {}) => {
    for (let key in args) {
        element.setAttribute(key, `${args[key]}`)
    }
};
