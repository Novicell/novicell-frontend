var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../../gulp-config.json');
var gulpif = require('gulp-if');
var lib = require('../lib.js');
var util = require('util');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var path = require('path');
var concat = require('gulp-concat');

var taskName = "Styles task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.path, z);
    });

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(less())
        .pipe(gulpif(!config.debug, autoprefixer(config.styles.vendorPrefixes)))
        .pipe(concat(name))
        .pipe(minifyCSS())
	    .pipe(gulp.dest(config.styles.dist))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('compile-less', function () {
    return config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        return compile(b.styles, b.name + ".min.css", "");
    });
});

gulp.task('styles', ['compile-less']);