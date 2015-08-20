var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('watchScripts', function () {
    var streams = config.bundles.filter(function (b) {
        // Don't handle vendor bundle on watch
        if (b.name != "vendor") {
            return b.scripts != null;
        }
    }).map(function (b) {
    var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

    var useJshint = ignores.indexOf("jshint") == -1;
    var useJscs = ignores.indexOf("jscs") == -1;
    var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
    var useUglify = ignores.indexOf("uglify") == -1;

    return gulp.src(b.scripts)
    .pipe(plugins.plumber(config.errorHandler("scripts")))
    .pipe(plugins.resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
    .pipe(plugins.if(useJshint, plugins.jshint()))
    .pipe(plugins.if(useJscs, plugins.jscs()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
    .pipe(plugins.concat(b.name + ".min.js"))
    .pipe(plugins.if(useUglify, plugins.uglify()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.scriptsDist));
});

    return mergeStream(streams);
});

gulp.task('scripts', function () {
    var streams = config.bundles.filter(function (b) {
        return b.scripts != null;
    }).map(function (b) {
    var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

    var useJshint = ignores.indexOf("jshint") == -1;
    var useJscs = ignores.indexOf("jscs") == -1;
    var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
    var useUglify = ignores.indexOf("uglify") == -1;

    return gulp.src(b.scripts)
    .pipe(plugins.plumber(config.errorHandler("scripts")))
    .pipe(plugins.resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
    .pipe(plugins.if(useJshint, plugins.jshint()))
    .pipe(plugins.if(useJscs, plugins.jscs()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
    .pipe(plugins.concat(b.name + ".min.js"))
    .pipe(plugins.if(useUglify, plugins.uglify()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.scriptsDist));
});

    return mergeStream(streams);
});


var runScripts = function (b) {
    var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

    var useJshint = ignores.indexOf("jshint") == -1;
    var useJscs = ignores.indexOf("jscs") == -1;
    var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
    var useUglify = ignores.indexOf("uglify") == -1;

    return gulp.src(b.scripts)
    .pipe(plugins.plumber(config.errorHandler("scripts")))
    .pipe(plugins.resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
    .pipe(plugins.if(useJshint, plugins.jshint()))
    .pipe(plugins.if(useJscs, plugins.jscs()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
    .pipe(plugins.concat(b.name + ".min.js"))
    .pipe(plugins.if(useUglify, plugins.uglify()))
    .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.scriptsDist));
};