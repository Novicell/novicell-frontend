'use strict';

var novicell = novicell || {};

novicell.navTrigger = novicell.navTrigger || new function () {
    this.init = function () {
        var navButton = document.querySelector('#js-mobile-navigation-button');
        var body = document.querySelector('#site');
        if (navButton) {
            // Open mobile navigation
            navButton.addEventListener('click', function () {
                body.classList.toggle('mobile-navigation-open');
                this.classList.toggle('is-active');
            }, true);
        }
    };
}();
