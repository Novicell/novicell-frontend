'use strict';

/**
 * @name Novicell Input Mask
 * @desc A script that inits vanilla-text-mask.js with default Novicell settings
 * @author Bjørn Nyborg (BNY)
 * @example <input class="mask--phone">
 * @requires https://github.com/text-mask/text-mask/tree/master/vanilla
 */


var novicell = novicell || {};

novicell.inputMasking = novicell.inputMasking || new function () {

    this.init = function () {

        const masks = [
            {
                "selector": ".js-mask--phone",
                "mask": [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
                "pattern": ""
            },
            {
                "selector": ".js-mask--cpr",
                "mask": [/\d/, /\d/, ' ',/\d/, /\d/, ' ', /\d/, /\d/,' ', '-', ' ', /\d/, /\d/, /\d/, /\d/],
                "pattern": ""
            },
            {
                "selector": ".js-mask--bank",
                "mask": [/\d/, /\d/, /\d/, /\d/, ' ','-',' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
                "pattern": ""
            },
            {
                "selector": ".js-mask--date1",
                "mask": [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
                "pattern": ""
            }
        ];

        for (let i = 0; i < masks.length; i++) {

            let input = document.querySelector(masks[i].selector);
            let mask = masks[i].mask;
            let pattern = masks[i].pattern;

            
            if(input && mask){

                //Patterns is work in progress
                if(pattern){
                    input.setAttribute("pattern", pattern);
                }

                masks[i].masking = vanillaTextMask.maskInput({
                    inputElement: input,
                    mask: mask,
                    guide: false
                });
            }
        }
        
        // Calling `vanillaTextMask.maskInput` adds event listeners to the input element. 
        // If you need to remove those event listeners, you can call: maskedInputController.destroy()
    };
}();