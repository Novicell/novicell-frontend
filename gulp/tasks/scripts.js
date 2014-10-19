var gulp = require('gulp');
var uglify = require('gulp-uglify');
var lib = require('../lib.js');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var resources = require('../resources.json');
var util = require('util');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var taskName = "Scripts task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);

var compile = function (path, name, successMessage) {
    var task = function () {
        return gulp.src(path)
            .pipe(plumber(function (e) {
                notifyError(e.plugin);
                return this.emit("end");
            }))
            .pipe(resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
            .pipe(jshint())
            .pipe(jscs())
            .pipe(sourcemaps.init())
            .pipe(concat(name))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(config.scripts.dist));
    };

    return lib.fileExists(path,
        function (p) { return task().pipe(notifySuccess(successMessage)); },
        function (p) {
            return notifyError(util.format(resources.fileNotFound, p));
        });
};

gulp.task('compile-js', function () {
    return compile(config.scripts.baseDir + "/master.js", "master.js", resources.compiledScript);
});

gulp.task('compile-js-components', function () {
    return config.components.map(function (c) {
        return compile(config.scripts.baseDir + "/components/" + c + ".js", c + ".js",
            util.format(resources.compiledScriptComponent, c));
    });
});

gulp.task('scripts', ['compile-js', 'compile-js-components']);