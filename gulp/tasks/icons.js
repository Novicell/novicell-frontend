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

gulp.task('icons', function () {
    var streams = config.bundles.filter(function (b) {
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