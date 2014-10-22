var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../../gulp-config.json');
var lib = require('../lib.js');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');

var taskName = "Images task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

gulp.task('minify-images', function () {

    var fileFormats = config.images.fileFormats.length == 1
        ? config.images.fileFormats[0]
        : "{" + config.images.fileFormats.join() + "}";

    var path = config.images.baseDir + "/*." + fileFormats;

    return gulp.src(path)
        .pipe(plumber(errorHandler))
        .pipe(newer(config.images.dist))
        .pipe(imagemin({
            optimizationLevel: config.images.optimizationLevel,
            progressive: config.images.progressive,
            interlaced: config.images.interlaced
        }))
        .pipe(gulp.dest(config.images.dist))
        .pipe(notifySuccess(resources.minifyImagesSuccess))
});

gulp.task('images', ['minify-images']);