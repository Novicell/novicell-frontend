'use strict';

/**
 * @name Novicell Persistent Field
 * @desc A script that inits persistent field
 * @author Bjørn Nyborg (BNY)
 * @example <input class="input--persistent">
 * @requires none
 * @credits https://codepen.io/bfred-it/pen/zNNxOz
 */


var novicell = novicell || {};

novicell.persistentField = novicell.persistentField || new function () {

    this.init = function () {

        for (const key in sessionStorage) {
            const value = sessionStorage[key];
            const [, name] = key.match(/^form-(.+)/) || [];
            if (name) {
                try {
                    const opt = document.querySelector(`[name="${name}"][value="${value}"],[name="${name}"] [value="${value}"]`);
                    if (opt) { // select option, radio, and checkbox with a value
                        opt.checked = opt.selected = true;
                        continue;
                    }
                } catch(e) {}
                const input = document.querySelector(`[name="${name}"]`);
                if (input) { // text-based, checkbox
                    if (input.type === 'checkbox') {
                        input.checked = Number(value);
                    } else {
                        input.value = value;
                    }
                }
            }
        }

        function save ({target: i}) {
            sessionStorage.setItem('form-' + i.name, i.type === 'checkbox' ? Number(i.checked) : i.value);
        }

        document.body.addEventListener('input', save);
        document.body.addEventListener('change', save);
        document.body.addEventListener('submit', (e) => {
            if(e.target.checkValidity()){
                for (var key in sessionStorage) {
                    if (/^form-(.+)/.test(key)) {
                        sessionStorage.removeItem(key);
                    }
                }
            }
        });
    };
};
