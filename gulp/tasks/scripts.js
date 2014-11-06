var gulp = require('gulp');
var uglify = require('gulp-uglify');
var lib = require('../lib.js');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var newer = require('gulp-newer');
var util = require('util');
var gulpif = require('gulp-if');
var path = require('path');

var taskName = "Scripts task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, useJshint, useJscs, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.basePath, z);
    });

    var destination = path.join(path.join(config.basePath, config.distPath), config.scripts.dist);

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
        .pipe(gulpif(useJshint, jshint()))
        .pipe(gulpif(useJscs, jscs()))
        .pipe(gulpif(config.debug, sourcemaps.init({ loadMaps: true })))
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(destination))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(successMessage)));
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