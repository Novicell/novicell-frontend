// pckgs
const postcss = require('postcss');
const babel = require("@babel/core");
const uglify = require("uglify-js").minify;

// opt
const postcssPlugins = require('../postcss.config').plugins;
const options = require('../../config');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

if (options.drupal.postcss.compile) {
    glob(options.drupal.postcss.path, function (er, files) {
        for (let file = 0; file < files.length; file++) {
            const fileName = path.basename(files[file]);
            const fileExtention = fileName.split(".").length;
            if (fileExtention < 3) {
                fs.readFile(files[file], (err, css) => {
                postcss(postcssPlugins)
                .process(css, { from: fileName })
                    .then(result => {
                        fs.writeFileSync(`${path.dirname(files[file])}/${path.basename(files[file], '.css')}.min.css`, result.css, () => true)
                    })
                })
            }
        }
    })
} else {
    console.log('Postcss is not being compiled, because it is turned off in the config file')
}

if (options.drupal.javascript.compile) {
    glob(options.drupal.javascript.path, function (er, files) {
        for (let file = 0; file < files.length; file++) {
            const fileName = path.basename(files[file]);
            fs.readFile(files[file], (err, js) => {
                if (err) throw err;
                // Count if file has more than two dots, and not compile if already has .min.js extension
                const fileExtention = fileName.split(".").length;
                if (fileExtention < 3) {
                    babel.transform(js, {
                        "presets": [
                            "@babel/preset-env"
                        ],
                    }, function(err, result) {
                        if (result) {
                            let minifiedCode = uglify(result.code).code;
                            fs.writeFileSync(`${path.dirname(files[file])}/${path.basename(files[file], '.js')}.min.js`, minifiedCode, () => true);
                        } else {
                            console.er(err)
                        }
                    })
                }
            })
        }
    })
} else {
    console.log('Postcss is not being compiled, because it is turned off in the config file')
}
