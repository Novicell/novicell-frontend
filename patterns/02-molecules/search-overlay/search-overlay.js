'use strict';

var novicell = novicell || {};

novicell.searchOverlay = novicell.searchOverlay || new function () {
    this.init = function () {
        var searchButton = document.querySelector('#js-search-overlay-trigger');
        var closeButton = document.querySelector('#js-search-overlay-close-button');
        var body = document.querySelector('#site');
        var searchInput = document.querySelector('.search-overlay-input-container__input');

        // Open search overlay
        searchButton.addEventListener('click', function () {
            searchInput.value = '';
            body.classList.toggle('search-overlay-open');
            searchInput.focus();

            // Close overlay
            closeButton.addEventListener('click', function () {
                body.classList.remove('search-overlay-open');
                searchInput.blur();
                searchInput.value = '';
            }, true);

            // Close overlay when esc pressed
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode === 27) {
                    body.classList.remove('search-overlay-open');
                    searchInput.blur();
                    searchInput.value = '';
                }

            };
        }, true);
    };
}();
