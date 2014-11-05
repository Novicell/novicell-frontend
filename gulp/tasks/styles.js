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
var sourcemaps = require('gulp-sourcemaps');

var taskName = "Styles task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.basePath, z);
    });

    var destination = path.join(path.join(config.basePath, config.distPath), config.styles.dist);

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(less())
        .pipe(gulpif(!config.debug, autoprefixer(config.styles.vendorPrefixes)))
        .pipe(gulpif(config.debug, sourcemaps.init({ loadMaps: true })))
        .pipe(concat(name))
        .pipe(minifyCSS())
        .pipe(gulpif(config.debug, sourcemaps.write()))
	    .pipe(gulp.dest(destination))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('compile-less', function () {
    return config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        return compile(b.styles, b.name + ".min.css", util.format(resources.compileLESSSuccess, b.name));
    });
});

gulp.task('styles', ['compile-less']);