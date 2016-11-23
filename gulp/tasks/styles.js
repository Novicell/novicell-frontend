'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function () {
    var streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        console.log(b.name + ' styles are compiling');

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler('styles')))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.lesshint(config.lessConfig))
            .pipe(plugins.lesshint.reporter())
            .pipe(plugins.less())
            .pipe(plugins.concat(b.name + '.min.css'))
            .pipe(plugins.autoprefixer(config.stylesVendorPrefixes))
            .pipe(plugins.cssnano(config.cssnanoConfig))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});