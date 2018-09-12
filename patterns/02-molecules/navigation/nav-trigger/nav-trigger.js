'use strict';

var novicell = novicell || {};

novicell.navTrigger = novicell.navTrigger || new function () {
    this.init = function () {
        const navButton = document.querySelector('#js-mobile-navigation-button');
        const body = document.querySelector('#site');
        const hamburgerLabel = document.querySelector('.js-hamburger-label');

        if (navButton) {
            const menuText = hamburgerLabel.getAttribute('data-menu-text');
            const closeText = hamburgerLabel.getAttribute('data-close-text');

            // Open mobile navigation
            navButton.addEventListener('click', function () {
                body.classList.toggle('mobile-navigation-open');
                this.classList.toggle('mobile-navigation-button--active');

                if (hamburgerLabel.parentNode.classList.contains('mobile-navigation-button--active')) {
                    hamburgerLabel.innerHTML = closeText;
                } else {
                    hamburgerLabel.innerHTML = menuText;
                }
            }, true);
        }
    };
}();
