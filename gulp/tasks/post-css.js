'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const cssnext  = require('postcss-cssnext');
const nested  = require('postcss-nested');
var plugins = require('gulp-load-plugins')();
var cssnano = require('cssnano');

var postCssPlugins = [
    nested(),
    cssnext({
        browsers: ["last 2 version", "ie 11"]
    }),
    cssnano({
        autoprefixer: false,
        discardComments: {removeAll: true},
        mergeLonghand: true,
        colormin: false,
        zindex: false,
        discardUnused: {fontFace: false}
        })

];

gulp.task('post-css', function () {
    var streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        console.log('Post-css styles are compiling');

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler('styles')))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.postcss(postCssPlugins))
            .pipe(plugins.rename({
                suffix: ".min",
                extname: ".css"
            }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});
