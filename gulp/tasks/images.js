'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const plugins = require('gulp-load-plugins')();

gulp.task('images', function () {
    var streams = config.bundles.filter(function (b) {
        return b.images != null;
    }).map(function (b) {

        return gulp.src(b.images)
            .pipe(plugins.plumber(config.errorHandler('images')))
            .pipe(plugins.imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.imagesDist));
    });

    return mergeStream(streams);
});