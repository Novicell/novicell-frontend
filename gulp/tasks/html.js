'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const plugins = require('gulp-load-plugins')();
const replace = require('gulp-replace');

gulp.task('html', function() {
    var streams = config.bundles.filter(function (b) {
        return b.html != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        console.log(b.name + ' html is being compiled');

        return gulp.src(b.html)
            .pipe(plugins.plumber(config.errorHandler('html')))
            .pipe(plugins.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(replace(/[\u200B-\u200D\uFEFF]/g, ""))
            .pipe(gulp.dest(config.distPath));
    });

    return mergeStream(streams);
});
