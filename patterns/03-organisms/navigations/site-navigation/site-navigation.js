'use strict';

var novicell = novicell || {};

novicell.siteNavigation = novicell.siteNavigation || new function () {
    this.init = function () {
        var siteNavigationToggle = document.getElementById('js-site-navigation-toggle');
        var siteNavigationList = document.getElementById('js-site-navigation-list');
        
        if (!siteNavigationToggle || !siteNavigationList) {
            return;
        }

        initSubNavigations(siteNavigationList);

        siteNavigationToggle.addEventListener('click', function(e) {
            e.preventDefault();

            novicell.helper.toggleClass(siteNavigationToggle, 'site-navigation__burger--active');
            novicell.helper.toggleClass(siteNavigationList, 'site-navigation-list--open');
        });
    };
};

function initSubNavigations(siteNavigationList) {
    var subNavToggles = siteNavigationList.querySelectorAll('.js-sub-navigation-list-toggle');
    
    if (!subNavToggles) {
        return;
    }

    for(var i = 0; i < subNavToggles.length; i++) {
        var currentToggle = subNavToggles[i];

        currentToggle.addEventListener('click', function(elem) {
            elem.preventDefault();
            var toggle = elem.currentTarget;

            var toggleParent = toggle.parentNode;

            if (!toggleParent) {
                return;
            }

            var subList = toggleParent.querySelector('.js-sub-navigation-list');

            novicell.helper.toggleClass(subList, 'sub-navigation-list--open');
        });
    }

}