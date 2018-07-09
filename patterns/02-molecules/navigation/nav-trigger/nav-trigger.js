'use strict';

var novicell = novicell || {};

novicell.navTrigger = novicell.navTrigger || new function () {
    this.init = function () {
        var navButton = document.querySelector('#js-mobile-navigation-button');
        var closeButton = document.querySelector('#js-mobile-close-button');
        var body = document.querySelector('#site');
        if (navButton) {
            // Open mobile navigation
            navButton.addEventListener('click', function () {
                body.classList.toggle('mobile-navigation-open');
            }, true);

            // Close
            closeButton.addEventListener('click', function () {
                if (body.classList.contains('mobile-navigation-open')) {
                    body.classList.remove('mobile-navigation-open');
                }
            }, true);
        }
    };
}();
