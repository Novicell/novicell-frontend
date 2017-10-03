'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const plugins = require('gulp-load-plugins')();

gulp.task('copy', function () {
    var streams = config.buildCopy.map(function (x) {
        return gulp.src(x.from)
            .pipe(gulp.dest(x.to));
    });

    return mergeStream(streams);
});