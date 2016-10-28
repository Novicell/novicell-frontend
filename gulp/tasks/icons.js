'use strict';

/*
    Use icons like:
    <svg class="icon icon--search">
        <use xlink:href="/dist/icons/icons.svg#icon-search"></use>
    </svg>
*/

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const fs = require('fs');
const rsp = require('remove-svg-properties').stream;
const glob = require("glob");
var path = require('path');
var plugins = require('gulp-load-plugins')();

function writeFile(path, fileName, content) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }

        fs.writeFileSync(path + fileName, content);
        console.log(fileName + " is being generated.");
        return path + fileName;
    }
    catch (e) {
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
            var fileName = fileStr.substr(fileStr.lastIndexOf("/") + 1).replace('.svg', '');
            // Add the filename to the collection
            collection.push(fileName);
        }

        var dataObject = {
            "icons": collection
        };
        // Write the JSON file to disk
        writeFile(config.jsonIconOptions.path, jsonFileName + '.json', JSON.stringify(dataObject));
    }
}

gulp.task('icons', function () {
    var streams = config.bundles.filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useNewer = ignores.indexOf('newer') == -1;
        var useImagemin = ignores.indexOf('imagemin') == -1;
        var removeStyles = ignores.indexOf('removeStyles') == -1;

        genereateIconJsonLibrary(b.icons, b.name);

        return gulp.src(b.icons)
            .pipe(plugins.plumber(config.errorHandler('icons')))
            .pipe(plugins.if(useImagemin, plugins.imagemin()))
            .pipe(plugins.if(removeStyles, rsp.remove({
                properties: [rsp.PROPS_FILL, rsp.PROPS_STROKE,]
            })))
            .pipe(plugins.svgSprite(config.spriteConfig))
            .pipe(plugins.rename(b.name + '.svg'))
            .pipe(gulp.dest(config.iconsDist));
    });

    return mergeStream(streams);
});
