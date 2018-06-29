'use strict';

var novicell = novicell || {};

novicell.navigation = novicell.navigation || new function () {
    this.init = function () {
        var navButton = document.querySelector('#js-mobile-navigation-button');
        var ctaButton = document.querySelector('#js-mobile-cta-popup-button');
        var closeButton = document.querySelector('#js-mobile-close-button');
        var body = document.querySelector('#site');

        // Open mobile navigation
        navButton.addEventListener('click', function () {
            body.classList.toggle('mobile-navigation-open');
        }, true);

        // Open mobile navigation
        ctaButton.addEventListener('click', function () {
            body.classList.toggle('cta-popup-open');
        }, true);

        // Close
        closeButton.addEventListener('click', function () {
            if(body.classList.contains('mobile-navigation-open')){
                body.classList.remove('mobile-navigation-open');
            }
            if(body.classList.contains('cta-popup-open')){
                body.classList.remove('cta-popup-open');
            }
        }, true);

        if (window.innerWidth > 767) {
            this.initPriorityNav();
        }
    };
    this.initPriorityNav = function(){
        var wrapper = document.querySelector(".site-navigation");
        var nav = priorityNav.init({
            mainNavWrapper: '.site-navigation',
            mainNav: '.site-navigation__list',
            breakPoint: 0,
            throttleDelay: 0,
            navDropdownLabel: 'mere'
        });

        // Show Overlay
        var body = document.querySelector('#site');
        var trigger = document.querySelector('.nav__dropdown-toggle');
        var overlay = document.querySelector('#js-overlay');

        trigger.addEventListener('click', function () {
            body.classList.toggle('show-overlay');
        });

        overlay.addEventListener('click', function() {
            body.classList.remove('show-overlay');
        });
    };
}();
