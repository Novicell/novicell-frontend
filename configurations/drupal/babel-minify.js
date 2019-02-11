// pckgs
const postcss = require('postcss');
const babel = require("@babel/core");
const uglify = require("uglify-js").minify;

// opt
const postcssPlugins = require('../postcss.config').plugins;
const drupalOptions = require('./drupal.config.js').drupal || null;

const fs = require('fs');
const glob = require('glob');
const path = require('path');

var Spinner = require('cli-spinner').Spinner;
 
var spinner = new Spinner('processing.. %s');
spinner.setSpinnerDelay(0);
spinner.setSpinnerString('|/-\\');
spinner.start();

if (drupalOptions) {
    if (drupalOptions.postcss.compile) {
        const specifiedPaths = drupalOptions.postcss.paths;
        for (let filePath = 0; filePath < specifiedPaths.length; filePath++) {
            glob(specifiedPaths[filePath], function (err, files) {
                if (err) throw err;
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
        }
    } else {
        console.log('Postcss is not being compiled, because it is turned off in the config file')
    }
    if (drupalOptions.javascript.compile) {
        // loop through all the specified files/dir's
        const specifiedPaths = drupalOptions.javascript.paths;
        for (let filePath = 0; filePath < specifiedPaths.length; filePath++) {
            glob(specifiedPaths[filePath], function (err, files) {
                if (err) throw err;
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
        }
    } else {
        console.log('JavaScript is not being compiled, because it is turned off in the config file')
    }
} else {
    console.log("\x1b[41m", 'Drupal object not found in drupal.config.js file');
}

spinner.stop(false);