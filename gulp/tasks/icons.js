/*
    Use icons like:
    <svg class="icon-search">
        <use xlink:href="/dist/icons/icons.svg#icon-search"></use>
    </svg>
*/

var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var svgSprite = require('gulp-svg-sprite');
var fs = require('fs');


/**
 * Prepare and output a file
 * 
 * @param {String} file             File
 * @param {String} content          Content
 * @return {String}                 File
 */
function writeFile(file, content) {
    try {
        fs.writeFileSync(file, content);
        return file;
    } catch (e) {
        return null;
    }
}

function genereateIconJsonLibrary(err, files) {
    var jsonPath = "dist/icons/icons.json";
    var collection = [];
    for (var i = 0; i < files.length; i++) {
        collection.push(files[i].toString().replace(".svg", ""));
    }

    var dataObject = {
        "icons": collection
    }
    
    writeFile(jsonPath, JSON.stringify(dataObject));
    console.log("NC - 'icons.json' generated.");
}

gulp.task('icons', function () {
    var streams = config.bundles().filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useNewer = ignores.indexOf("newer") == -1;
        var useImagemin = ignores.indexOf("imagemin") == -1;
        

        return gulp.src(b.icons)
            .pipe(plugins.plumber(config.errorHandler("icons")))
            .pipe(plugins.if(useImagemin, plugins.imagemin()))
            .pipe(svgSprite(config.spriteConfig))
            .pipe(gulp.dest(config.iconsDist));
    });

    return mergeStream(streams);
});
