'use strict';

/**
 * @name Novicell Scroll progress bar
 * @author Emil Ankersen (EAN)
 * @requires https://github.com/jeremenichelli/scrollProgress
 */

var novicell = novicell || {};

novicell.scrollProgressBar = novicell.scrollProgressBar || new function () {

    this.init = function () {
        const progressElement = document.querySelector('.progress-bar');
        if (progressElement) {
            const progressObserver = new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
}();
