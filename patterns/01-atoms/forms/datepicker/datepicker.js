'use strict';

/**
 * @name Novicell Datepicker
 * @desc A script that inits flatpickr on .js-datepicker
 * @author Bjørn Nyborg (BNY)
 * @example <form data-validate>
 * @requires https://github.com/flatpickr/flatpickr
 */

var novicell = novicell || {};

novicell.datepicker =
    novicell.datepicker ||
    new function() {
        this.init = function() {
            const datepickers = document.querySelectorAll('.js-datepicker');

            if (datepickers.length) {
                flatpickr('.js-datepicker', {
                    altFormat: 'F j, Y',
                    dateFormat: 'Y-m-d'
                });
            }
        };
    }();
