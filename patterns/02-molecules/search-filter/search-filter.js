'use strict';

var novicell = novicell || {};

novicell.searchFilter =
    novicell.searchFilter ||
    new function() {
        this.init = function() {
            const searchFilters = document.getElementsByClassName(
                'js-search-filter'
            );

            for (let i = 0; i < searchFilters.length; i++) {
                // Declare variables
                const input = searchFilters[i].querySelector(
                    '.js-search-filter-input'
                );

                document.addEventListener('click', function(event) {
                    var isClickInside = searchFilters[i].contains(event.target);

                    if (!isClickInside) {
                        input.parentNode.classList.remove(
                            'search-filter--active'
                        );
                    }
                });

                input.addEventListener('focus', function() {
                    input.parentNode.classList.add('search-filter--active');
                });

                input.addEventListener('keyup', function() {
                    const filter = input.value.toUpperCase();
                    const ul = searchFilters[i].querySelector(
                        '.js-search-filter-list'
                    );
                    const li = ul.getElementsByTagName('li');

                    for (let x = 0; x < li.length; x++) {
                        const searchString = li[x].getAttribute('data-search');
                        if (searchString.toUpperCase().indexOf(filter) > -1) {
                            li[x].style.display = '';
                        } else {
                            li[x].style.display = 'none';
                        }
                    }
                });
            }
        };
    }();
