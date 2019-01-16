const postcss = require('postcss');
const plugings = require('../postcss.config').plugins;
const options = require('../../config');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

glob(options.drupal.postcss, function (er, files) {
for (let file = 0; file < files.length; file++) {
        fs.readFile(files[file], (err, css) => {
            postcss(plugings)
            .process(css, { from: path.basename(files[file]) })
            .then(result => {
                
                fs.writeFile(`${__dirname}/${path.basename(files[file], '.css')}.min.css`, result.css, () => true)
            })
        })
        console.log();
        console.log(path.dirname(files[file]));
    }
})

