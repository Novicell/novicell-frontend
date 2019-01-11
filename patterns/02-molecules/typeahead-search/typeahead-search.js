'use strict';

var novicell = novicell || {};

novicell.typeaheadSearch =
    novicell.typeaheadSearch ||
    new function() {
        this.init = function() {
            new autoComplete({
                selector: 'input[name="q"]',
                minChars: 2,
                source: function(term, suggest) {
                    term = term.toLowerCase();
                    var choices = ['ActionScript', 'AppleScript', 'Asp'];
                    var matches = [];
                    for (let i = 0; i < choices.length; i++) {
                        if (~choices[i].toLowerCase().indexOf(term)) {
                            matches.push(choices[i]);
                        }
                    }
                    suggest(matches);
                }
            });
        };
    }();
