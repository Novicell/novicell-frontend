var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../../gulp-config.json');
var lib = require('../lib.js');
var resources = require('../resources.json');
var util = require('util');
var not = require('gulp-notify');
var plumber = require('gulp-plumber');

var taskName = "Images task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);

gulp.task('minify-images', function () {
    var path = config.images.baseDir + "/*";

    return gulp.src(path)
            .pipe(plumber(function (e) {
                notifyError(e.plugin);
                console.log(e.message);
                this.emit("end");
            }))
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dist))
        .pipe(notifySuccess(resources.minifiedImage));
});

gulp.task('images', ['minify-images']);