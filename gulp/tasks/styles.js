var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../../gulp-config.json');
var gulpif = require('gulp-if');
var lib = require('../lib.js');
var util = require('util');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');

var taskName = "Styles task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (path, successMessage) {
    var task = function () {
        return gulp.src(path)
            .pipe(plumber(errorHandler))
            .pipe(less())
            .pipe(gulpif(!config.debug, autoprefixer(config.styles.vendorPrefixes)))
            .pipe(minifyCSS())
            .pipe(rename({ suffix: '.min' }))
	        .pipe(gulp.dest(config.styles.dist));
    };

    return lib.fileExists(path,
        function (p) { return task().pipe(notifySuccess(successMessage)); },
        function (p) {
            return notifyError(util.format(resources.fileNotFound, p));
        });
};

gulp.task('compile-less', function () {
    return compile(config.styles.baseDir + '/master.less', resources.compileLESSSuccess);
});

gulp.task('compile-less-components', function () {
    return config.components.map(function (c) {
        return compile(config.styles.baseDir + '/components/' + c + '.less', 
            util.format(resources.compileLESSComponentSuccess, c));
    });
});

gulp.task('styles', ['compile-less', 'compile-less-components']);