var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../../gulp-config.json');
var lib = require('../lib.js');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var gulpif = require('gulp-if');
var path = require('path');
var util = require('util');

var taskName = "Images task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var minifyImages = function (p, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.path, z);
    });

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(newer(config.images.dist))
        .pipe(imagemin({
            optimizationLevel: config.images.optimizationLevel,
            progressive: config.images.progressive,
            interlaced: config.images.interlaced
        }))
        .pipe(gulp.dest(config.images.dist))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('minify-images', function () {
    return config.bundles.filter(function (b) {
        return b.images != null;
    }).map(function (b) {
        return minifyImages(b.images, util.format(resources.minifyImagesSuccess, b.name));
    });
});
gulp.task('images', ['minify-images']);