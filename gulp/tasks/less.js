'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const plugins = require('gulp-load-plugins')();

var cssnanoSettings = {
    autoprefixer: { browsers: [ ">= 5% in DK", "ie 11" ], add: true },
    discardComments: { removeAll: true },
    mergeLonghand: true,
    colormin: false,
    zindex: false,
    discardUnused: { fontFace: false }
};

gulp.task('less', function () {
    var streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        console.log(b.name + ' styles are compiling');

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler('styles')))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.lesshint())
            .pipe(plugins.lesshint.reporter())
            .pipe(plugins.less())
            .pipe(plugins.rename({ suffix: ".min", extname: ".css" }))
            .pipe(plugins.cssnano(cssnanoSettings))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});