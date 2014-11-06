var gulp = require('gulp');
var config = require('../../gulp-config.json');
var lib = require('../lib.js');
var util = require('util');
var resources = require('../resources.json');
var path = require('path');
var plugins = require('gulp-load-plugins')();

var taskName = "Styles task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.basePath, z);
    });

    console.log(plugins.camelize);
    var destination = path.join(path.join(config.basePath, config.distPath), config.styles.dist);

    return gulp.src(paths)
        .pipe(plugins.plumber(errorHandler))
        .pipe(plugins.less())
        .pipe(plugins.if(!config.debug, plugins.autoprefixer(config.styles.vendorPrefixes)))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.concat(name))
        .pipe(plugins.minifyCss())
        .pipe(plugins.if(config.debug, plugins.sourcemaps.write()))
	    .pipe(gulp.dest(destination))
        .pipe(plugins.if(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('compile-less', function () {
    return config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        return compile(b.styles, b.name + ".min.css", util.format(resources.compileLESSSuccess, b.name));
    });
});

gulp.task('styles', ['compile-less']);