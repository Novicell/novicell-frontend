'use strict';

var novicell = novicell || {};

novicell.navigation = novicell.navigation || new function () {
    this.init = function () {
        if (window.innerWidth > 767) {
            this.initPriorityNav();
        }
    };
    this.initPriorityNav = function(){
        var wrapper = document.querySelector(".nav");
        var nav = priorityNav.init({
            mainNavWrapper: '.nav-main',
            mainNav: '.nav-main-list',
            breakPoint: 0,
            throttleDelay: 0,
            navDropdownLabel: 'More'
        });
    };
}();
