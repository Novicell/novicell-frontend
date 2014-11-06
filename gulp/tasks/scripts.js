var gulp = require('gulp');
var lib = require('../lib.js');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var resources = require('../resources.json');
var util = require('util');
var path = require('path');
var plugins = require('gulp-load-plugins')();

var taskName = "Scripts task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, useJscs, useJshint, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.basePath, z);
    });

    var destination = path.join(path.join(config.basePath, config.distPath), config.scripts.dist);

    return gulp.src(paths)
        .pipe(plugins.plumber(errorHandler))
        .pipe(resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
        .pipe(plugins.if(useJshint, plugins.jshint()))
        .pipe(plugins.if(useJscs, plugins.jscs()))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.concat(name))
        .pipe(plugins.uglify())
        .pipe(plugins.if(config.debug, plugins.sourcemaps.write()))
        .pipe(gulp.dest(destination))
        .pipe(plugins.if(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('compile-js', function () {
    return config.bundles.filter(function (b) {
        return b.scripts != null;
    }).map(function (b) {
        var ignores = b.ignores != null ? b.ignores : [];

        return compile(b.scripts, b.name + ".min.js",
            ignores.indexOf("jshint") == -1,
            ignores.indexOf("jscs") == -1,
            util.format(resources.compileJSSuccess, b.name));
    });
});

gulp.task('scripts', ['compile-js']);