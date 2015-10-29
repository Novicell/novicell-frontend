var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task("copy", function () {
    var streams = config.buildCopy.map(function (x) {
        return gulp.src(x.from)
            .pipe(gulp.dest(x.to));
    });

    return mergeStream(streams);
});