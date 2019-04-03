'use strict';

/**
 * @name Novicell Validation
 * @desc A script that inits bouncer.js with default Novicell settings
 * @author Trine Banke Brenneche (TBB)
 * @example <form data-validate>
 * @requires https://github.com/cferdinandi/bouncer
 */

var novicell = novicell || {};
var Bouncer = Bouncer || {};

novicell.validation =
    novicell.validation ||
    (function() {
        function init() {
            var validate = new Bouncer('[data-validate]', {
                // Classes & IDs
                fieldClass: 'error', // Applied to fields with errors
                errorClass: 'error-message', // Applied to the error message for invalid fields
                fieldPrefix: 'bouncer-field_', // If a field doesn't have a name or ID, one is generated with this prefix
                errorPrefix: 'bouncer-error_', // Prefix used for error message IDs

                // Validation patterns for specific input types: see bouncer.js file for defaults

                // Message Settings
                messageAfterField: true, // If true, displays error message below field. If false, displays it above.
                messageCustom: 'data-bouncer-message', // The data attribute to use for customer error messages
                messageTarget: 'data-bouncer-target', // The data attribute to pass in a custom selector for the field error location

                // Error messages by error type
                messages: {
                    missingValue: {
                        checkbox: 'Vælg venligst en værdi',
                        radio: 'Vælg venligst en af mulighederne.',
                        select: 'Vælg venligst en værdi.',
                        'select-multiple': 'Vælg venligst mindst én værdi.',
                        default: 'Dette felt er påkrævet'
                    },
                    patternMismatch: {
                        email: 'Indtast en gyldig e-mailadresse.',
                        url: 'Indtast en gyldig URL.',
                        number: 'Indtast venligst et tal',
                        color: 'Anvend venligst følgende format: #rrggbb',
                        date: 'Brug venligst formatet YYYY-MM-DD',
                        time: 'Brug venligst 24-timers formatet, fx. 23:00',
                        month: 'Brug venligst formatet YYYY-MM',
                        default: 'Brug venligst det anmodede format.'
                    },
                    outOfRange: {
                        over: 'Værdien skal være maksimalt {max}.',
                        under: 'Værdien skal være minimum {min}.'
                    },
                    wrongLength: {
                        over: 'Værdien i dette felt skal være på maksimalt {maxLength} tegn. Du har nu indtastet {length} tegn.',
                        under: 'Værdien i dette felt skal være på mindst {minLength} tegn. Du har nu indtastet {length} tegn.'
                    },
                    valueMismatch: function(field) {
                        var customMessage = field.getAttribute('data-bouncer-mismatch-message');
                        return customMessage ? customMessage : 'Vær sikker på at de to felter med e-mailadresser er udfyldt ens';
                    }
                },

                // Form Submission
                disableSubmit: false, // If true, native form submission is suppressed even when form validates

                // Custom Events
                emitEvents: true, // If true, emits custom events

                customValidations: {
                    valueMismatch: function(field) {
                        // Look for a selector for a field to compare
                        // If there isn't one, return false (no error)
                        var selector = field.getAttribute('data-bouncer-match');
                        if (!selector) {
                            return false;
                        }

                        // Get the field to compare
                        var otherField = field.form.querySelector(selector);
                        if (!otherField) {
                            return false;
                        }

                        // Compare the two field values
                        // We use a negative comparison here because if they do match, the field validates
                        // We want to return true for failures, which can be confusing
                        return otherField.value !== field.value;
                    }
                }
            });

            //add class validated to touched fields so we can show whether it's valid or not
            var bouncerForms = document.querySelectorAll('[data-validate]');
            for (var i = 0; i < bouncerForms.length; i++) {
                bouncerForms[i].addEventListener(
                    'change',
                    function(event) {
                        var field = event.target;
                        field.classList.add('validated');
                    },
                    false
                );
            }
        }

        return {
            init: init
        };
    })();
