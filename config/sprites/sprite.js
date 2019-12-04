const SVGSpriter = require('svg-sprite');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const File = require('vinyl');
let args = require('minimist')(process.argv.slice(2));
const settings = require('../../config');
const rootFolder = settings.root_folder;
const cwd = path.resolve('assets/icons');

// Create spriter instance (see below for `config` examples)
const dist = args.o;
const input = path.join(rootFolder, args.i);
const spriteConfig = {
    shape: {
        // Set maximum dimensions
        dimension: {
            maxWidth: 32,
            maxHeight: 32
        },
        // Exclude path from id
        id: {
            generator(name) {
                return path.basename(name, '.svg');
            }
        },
        // Convert style to attributes
        transform: [{
            svgo: {
                plugins: [
                    {
                        inlineStyles: true
                    }
                ]
            }
        }]
    },
    mode: {
        symbol: true
    }
};
const spriter = new SVGSpriter(spriteConfig);
// Compile the sprite
/* eslint-disable */
glob.glob(`${input}`, {
    cwd: cwd
}, function (err, files) {
    
    files.forEach(function (file) {
        // Create and add a vinyl file instance for each SVG
        spriter.add(
            new File({
                path: file, // Absolute path to the SVG file
                base: cwd, // Base path (see `name` argument
                contents: fs.readFileSync(file) // SVG file contents
            })
        );
    });
    
    // Compile the sprite
    spriter.compile(function (error, result) {
        /* Write `result` files to disk (or do whatever with them ...) */
        for (var mode in result) {
            for (var resource in result[mode]) {
                if (!fs.existsSync(dist)) {
                    mkdirp.sync(path.dirname(dist));
                }
                fs.writeFileSync(dist, result[mode][resource].contents);
            }
        }
    });
});
/* eslint-enable */