var gulp = require('gulp');
var svgo = require('imagemin-svgo');
var lib = require('../lib.js');
var plumber = require('gulp-plumber');
var config = require('../../gulp-config.json');
var newer = require('gulp-newer');
var resources = require('../resources.json');

var taskName = "Icons task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

gulp.task('minify-icons', function () {
    return gulp.src(config.icons.baseDir + '/*.svg')
        .pipe(plumber(errorHandler))
        .pipe(newer(config.icons.dist))
        .pipe(svgo())
        .pipe(gulp.dest(config.icons.dist))
        .pipe(notifySuccess(resources.minifyIconsSuccess))
});

gulp.task('icons', ['minify-icons']);