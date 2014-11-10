var gulp = require('gulp');
var config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task('scripts', function () {
    return config.bundles.filter(function (b) {
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
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.concat(b.name + ".min.js"))
            .pipe(plugins.if(useUglify, plugins.uglify()))
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.write()))
            .pipe(gulp.dest(config.scriptsDist));
    });
});