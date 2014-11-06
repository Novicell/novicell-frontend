var gulp = require('gulp');
var config = require('../../gulp-config.json');
var lib = require('../lib.js');
var resources = require('../resources.json');
var util = require('util');
var path = require('path');
var plugins = require('gulp-load-plugins')();

var taskName = "Images task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var minifyImages = function (p, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.basePath, z);
    });

    var destination = path.join(path.join(config.basePath, config.distPath), config.images.dist);

    return gulp.src(paths)
        .pipe(plugins.plumber(errorHandler))
        .pipe(plugins.newer(destination))
        .pipe(plugins.imagemin({
            optimizationLevel: config.images.optimizationLevel,
            progressive: config.images.progressive,
            interlaced: config.images.interlaced
        }))
        .pipe(gulp.dest(destination))
        .pipe(plugins.if(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('minify-images', function () {
    return config.bundles.filter(function (b) {
        return b.images != null;
    }).map(function (b) {
        return minifyImages(b.images, util.format(resources.minifyImagesSuccess, b.name));
    });
});
gulp.task('images', ['minify-images']);