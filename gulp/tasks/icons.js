var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var svgSprite = require('gulp-svg-sprite');

gulp.task('icons', function () {
    var streams = config.bundles.filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useNewer = ignores.indexOf("newer") == -1;
        var useImagemin = ignores.indexOf("imagemin") == -1;

        return gulp.src(b.icons)
            .pipe(plugins.plumber(config.errorHandler("icons")))
            .pipe(svgSprite(config.spriteConfig))
            .pipe(plugins.if(useImagemin, plugins.imagemin()))
            .pipe(gulp.dest(config.spriteDist));
    });

    return mergeStream(streams);
});