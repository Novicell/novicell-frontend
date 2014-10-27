var gulp = require('gulp');
var svgo = require('imagemin-svgo');
var lib = require('../lib.js');
var plumber = require('gulp-plumber');
var config = require('../../gulp-config.json');
var newer = require('gulp-newer');
var resources = require('../resources.json');
var gulpif = require('gulp-if');
var path = require('path');

var taskName = "Icons task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var minifyIcons = function (p) {
    var paths = p.map(function (z) {
        return path.join(config.path, z);
    });

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(newer(config.icons.dist))
        .pipe(svgo())
        .pipe(gulp.dest(config.icons.dist))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(resources.minifyIconsSuccess)));
};

gulp.task('minify-icons', function () {
    return config.bundles.filter(function (b) {
        return b.icons != null;
    }).map(function (b) {
        return minifyIcons(b.icons);
    });
});

gulp.task('icons', ['minify-icons']);