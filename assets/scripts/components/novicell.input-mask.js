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

        var masks = [
            {
                "selector": ".mask--phone",
                "mask": [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
            },
            {
                "selector": ".mask--cpr",
                "mask": [/\d/, /\d/, ' ',/\d/, /\d/, ' ', /\d/, /\d/,' ', '-', ' ', /\d/, /\d/, /\d/, /\d/,]
            }
        ];

        //['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

        for (var i = 0; i < masks.length; i++) {

            var input = document.querySelector(masks[i].selector);
            var mask = masks[i].mask;

            if(input && mask){

                console.log(input, mask);

                masks[i].masking = vanillaTextMask.maskInput({
                    inputElement: input,
                    mask: mask
                });
            }
        }

        /*
        var maskedInputController = vanillaTextMask.maskInput({
            inputElement: phoneInput,
            mask: phoneMask
        });
        */
        
        
        // Calling `vanillaTextMask.maskInput` adds event listeners to the input element. 
        // If you need to remove those event listeners, you can call: maskedInputController.destroy()
    };
}();