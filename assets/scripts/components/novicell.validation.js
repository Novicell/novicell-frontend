'use strict';

/**
 * @name Novicell Validate
 * @desc A script that inits validate.js with default Novicell settings
 * @author Bjørn Nyborg (BNY)
 * @example <form data-validate>
 * @requires https://github.com/cferdinandi/validate
 */


var novicell = novicell || {};  

novicell.validate = novicell.validate || new function () {

    this.init = function () {
        validate.init({
            // Classes and Selectors
            selector: '[data-validate]',
            fieldClass: 'error',
            errorClass: 'error-message',

            // Messages
            messageValueMissing: 'Dette felt er påkrævet',
            messageValueMissingSelect: 'Vælg venligst en værdi',
            messageValueMissingSelectMulti: 'Vælg venligst mindst én værdi',
            messageTypeMismatchEmail: 'Indtast en gyldig email-adresse.',
            messageTypeMismatchURL: 'Indtast en gyldig URL',
            messageTooShort: 'Indtast venligst {minLength} karakterer eller mere. Du har indtastet {length} karakterer.',
            messageTooLong: 'Indtast venligst {maxLength} eller færre karakterer. Du har indtastet {length} karakterer.',
            messagePatternMismatch: 'Du har indtastet data i et forkert format',
            messageBadInput: 'Indtast venligst et tal',
            messageStepMismatch: 'Vælg venligst en gyldig værdi',
            messageRangeOverflow: 'Du må ikke angive mere end {max}.',
            messageRangeUnderflow: 'Du må ikke angive mindre end {min}.',
            messageGeneric: 'Den indtastede værdi er ugyldig',

            // Form Submission
            disableSubmit: false,
            onSubmit: function () {},

            // Callbacks
            beforeShowError: function (e) {
                e.classList.add("validated");
            },
            afterShowError: function () {
            },
            beforeRemoveError: function () { },
            afterRemoveError: function () { },

        });
    };
}();