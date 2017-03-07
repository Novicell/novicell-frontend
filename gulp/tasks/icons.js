'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const fs = require('fs');
const glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var plugins = require('gulp-load-plugins')();

function writeFile(path, fileName, content) {
    try {
        if (!fs.existsSync(path)) {
            mkdirp(path, function (err) {
                if (err) { console.error(err) }
                else {
                    doWrite(path, fileName, content);
                }
            });
        } else {
            doWrite(path, fileName, content);
        }

        function doWrite(path, fileName, content) {
            fs.writeFileSync(path + fileName, content);
            console.log(fileName + ' is being generated.');
            return path + fileName;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

function genereateIconJsonLibrary(dirs, jsonFileName) {
    var collection = [];

    // Foreach dir in config array
    for (var j = dirs.length - 1; j >= 0; j--) {
        // Get files from glob pattern synchronously
        var files = glob.sync(dirs[j], {cwd:config.projectPath});

        for (var i = 0; i < files.length; i++) {
            var fileStr = files[i].toString();
            var fileName = fileStr.substr(fileStr.lastIndexOf('/') + 1).replace('.svg', '');
            // Add the filename to the collection
            collection.push(fileName);
        }

        var dataObject = {
            'icons': collection
        };
        // Write the JSON file to disk
        writeFile(config.iconsDist, jsonFileName + '.json', JSON.stringify(dataObject));
    }
}

var spriteConfig = {
    shape : {
        // Set maximum dimensions
        dimension       : {
            maxWidth    : 32,
            maxHeight   : 32
        },
        // Exclude path from id
        id: {
            generator: function (name) {
                return path.basename(name, '.svg');
            }
        },
        // Convert style to attributes
        transform : [
            {svgo       : {
                plugins : [
                    { removeStyleElement  : true },
                    { removeAttrs: {attrs: '(fill.*|stroke.*|transform.*)'} }
                ]
            }}
        ],
    },
    mode : {
        symbol : true
    }
};

gulp.task('icons', function () {
    var streams = config.bundles.filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useNewer = ignores.indexOf('newer') == -1;
        var useImagemin = ignores.indexOf('imagemin') == -1;
        var keepColors = b.keepColors != null ? b.keepColors : false;

        // Keep colors settings - for multiple colored icons
        var spriteConfigClone = JSON.parse(JSON.stringify(spriteConfig));
        if(keepColors){
            spriteConfigClone.shape.transform[0].svgo.plugins[1] = { removeAttrs: {attrs:'(transform.*)' } };
        }

        genereateIconJsonLibrary(b.icons, b.name);

        return gulp.src(b.icons)
            .pipe(plugins.plumber(config.errorHandler('icons')))
            .pipe(plugins.if(useImagemin, plugins.imagemin()))
            .pipe(plugins.svgSprite(spriteConfigClone))
            .pipe(plugins.rename(b.name + '.svg'))
            .pipe(gulp.dest(config.iconsDist));
    });

    return mergeStream(streams);
});
