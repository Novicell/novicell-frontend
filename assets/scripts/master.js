'use strict';
/*
* Novicell master
* Use this file to call functions in other files, on document ready, window.resize etc.
*/

var novicell = novicell || {};
var validate = validate || {};
var projectName = projectName || {};

// Document ready
document.addEventListener('DOMContentLoaded', function(){
    svg4everybody(); // Fix SVG spritemap in IE/Edge


    validate.init({ 
        // Classes and Selectors
        selector: '[data-validate]',
        fieldClass: 'error',
        errorClass: 'error-message',

        // Messages
        messageValueMissing: 'Please fill out this field!!!.',
        messageValueMissingSelect: 'Please select a value.',
        messageValueMissingSelectMulti: 'Please select at least one value.',
        messageTypeMismatchEmail: 'Please enter an email address.',
        messageTypeMismatchURL: 'Please enter a URL.',
        messageTooShort: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.',
        messageTooLong: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',
        messagePatternMismatch: 'Please match the requested format.',
        messageBadInput: 'Please enter a number.',
        messageStepMismatch: 'Please select a valid value.',
        messageRangeOverflow: 'Please select a value that is no more than {max}.',
        messageRangeUnderflow: 'Please select a value that is no less than {min}.',
        messageGeneric: 'The value you entered for this field is invalid.',

        // Form Submission
        disableSubmit: false,
        onSubmit: function () {
        },

        // Callbacks
        beforeShowError: function () {
            document.querySelector("[data-validate]").classList.add("validated");
        },
        afterShowError: function () {
        },
        beforeRemoveError: function () { },
        afterRemoveError: function () { },

    });
});


