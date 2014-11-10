var gulp = require('gulp');
var config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task("copy", function () {
    return config.buildCopy.map(function (x) {
        return gulp.src(x.from)
            .pipe(plugins.newer(x.to))
            .pipe(gulp.dest(x.to));
    });
});