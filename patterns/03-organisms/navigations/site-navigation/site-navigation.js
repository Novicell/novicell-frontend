'use strict';

var novicell = novicell || {};

novicell.siteNavigation = novicell.siteNavigation || new function () {
    this.init = function () {
        var siteNavigationToggle = document.getElementById('js-site-navigation-toggle');
        var siteNavigationList = document.getElementById('js-site-navigation-list');

        if (!siteNavigationToggle || !siteNavigationList) {
            return;
        }

        siteNavigationToggle.addEventListener('click', function(e) {
            e.preventDefault();

            novicell.helper.toggleClass(siteNavigationToggle, 'site-navigation__burger--active');
            novicell.helper.toggleClass(siteNavigationList, 'site-navigation-list--open');
        });
    };
};