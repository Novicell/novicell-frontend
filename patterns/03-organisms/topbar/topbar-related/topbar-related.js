'use strict';

var novicell = novicell || {};

novicell.topbarRelated = novicell.topbarRelated || new function () {
    this.init = function () {
      
        function fixedTopbar(elementID, className, headerClass) {
            // Get the current scroll position
            var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var headerHeight = document.querySelector(headerClass).offsetHeight;

            if (scroll >= headerHeight + 25) {
                addClass(elementID, className);
            }
            if (scroll < headerHeight + 25) {
                removeClass(elementID, className);
            }
        }

        // Adds a class to the element
        function addClass(elementID, className) {
            var element = document.getElementById(elementID),
                classNames = document.getElementById(elementID).className;
            if (classNames.indexOf(className) == -1) {
                return element.className = element.className + ' ' + className;
            }
        }

        // Removes the class and the preceding whitespace from the element
        function removeClass(elementID, className) {
            var element = document.getElementById(elementID),
                classNames = document.getElementById(elementID).className;
            if (classNames.indexOf(className) !== -1) {
                className = " " + className;
                return element.className = element.className.replace(className, '');
            }
        }

        window.addEventListener('scroll', function() {
            fixedTopbar('js-topbar-related', 'sticky', '.js-header');
        }, false);
    };
}();
