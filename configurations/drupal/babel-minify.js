// pckgs
const postcss = require('postcss');
const babel = require("@babel/core");
// opt
const postcssPlugins = require('../postcss.config').plugins;
const options = require('../../config');

const fs = require('fs');
const glob = require('glob');
const path = require('path');

console.log(options.drupal.postcss.path)

if (options.drupal.postcss.compile) {
    glob(options.drupal.postcss.path, function (er, files) {
        for (let file = 0; file < files.length; file++) {
                fs.readFile(files[file], (err, css) => {
                postcss(postcssPlugins)
                .process(css, { from: path.basename(files[file]) })
                .then(result => {
                    fs.writeFile(`${path.dirname(files[file])}/${path.basename(files[file], '.css')}.min.css`, result.css, () => true)
                })
            })
        }
    })
} else {
    console.log('Postcss is not being compilet, because it is turned off in the config file')
}

if (options.drupal.javascript.compile) {
    glob(options.drupal.javascript.path, function (er, files) {
        for (let file = 0; file < files.length; file++) {
                fs.readFile(files[file], (err, js) => {
                babel.transform(js, {
                    "presets": [
                        "@babel/preset-env"
                    ],
                }, function(err, result) {
                    fs.writeFile(`${path.dirname(files[file])}/${path.basename(files[file], '.js')}.min.js`, result.code, () => true)
                })
            })
        }
    })
} else {
    console.log('Postcss is not being compilet, because it is turned off in the config file')
}

