'use strict';

var novicell = novicell || {};

novicell.helper = novicell.helper || new function () {

    this.findAncestor = function (el, cls) {
        if (el == null) {
            return null;
        }
        while ((el = el.parentElement) && !el.classList.contains(cls)) {
            return el;
        }
    };

    this.toggleClass = function (el, className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);
            
            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }
            
            el.className = classes.join(' ');
        }
    };

    this.hasClass = function (el, className) {
        if (el.classList.contains(className)) {
            return true;
        } else {
            return false;
        }
    };
};