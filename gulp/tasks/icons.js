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
var plugins = require('gulp-load-plugins')();

function writeFile(path, fileName, content) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }

        fs.writeFileSync(path + fileName, content);
        console.log("icons.json is being generated.");
        return path + fileName;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function genereateIconJsonLibrary(err, files) {
    var collection = [];
    for (var i = 0; i < files.length; i++) {
        var fileStr = files[i].toString();
        var fileType = fileStr.substr(fileStr.lastIndexOf(".") + 1);

        if (fileType === "svg") {
            collection.push(files[i].toString().replace(".svg", ""));
        }
    }

    var dataObject = {
        "icons": collection
    };

    writeFile(config.jsonIconOptions.path, config.jsonIconOptions.fileName, JSON.stringify(dataObject));
}

gulp.task('icons-json', function () {
    function genereateIconJsonLibrary(err, files) {
        var collection = [];
        for (var i = 0; i < files.length; i++) {
            var fileStr = files[i].toString();
            var fileType = fileStr.substr(fileStr.lastIndexOf(".") + 1);

            if (fileType === "svg") {
                collection.push(files[i].toString().replace(".svg", ""));
            }
        }

        var dataObject = {
            "icons": collection
        };

        writeFile(config.jsonIconOptions.path, config.jsonIconOptions.fileName, JSON.stringify(dataObject));
    }

    fs.readdir("icons/", genereateIconJsonLibrary);
});

gulp.task('icons', function () {
    var streams = config.bundles.filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useNewer = ignores.indexOf("newer") == -1;
        var useImagemin = ignores.indexOf("imagemin") == -1;

        gulp.start('icons-json')

        return gulp.src(b.icons)
            .pipe(plugins.plumber(config.errorHandler("icons")))
            .pipe(plugins.if(useImagemin, plugins.imagemin()))
            .pipe(rsp.remove({
                properties: [rsp.PROPS_FILL, rsp.PROPS_STROKE,]
            }))
            .pipe(plugins.svgSprite(config.spriteConfig))
            .pipe(gulp.dest(config.iconsDist));
    });

    return mergeStream(streams);
});
