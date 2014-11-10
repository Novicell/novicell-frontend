var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('html2js', function () {
    var streams = config.bundles.filter(function (b) {
        return b.tpl != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useUglify = ignores.indexOf("uglify") == -1;
        
        return gulp.src(b.tpl)
            .pipe(plugins.plumber(config.errorHandler("html2js")))
            .pipe(plugins.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(plugins.ngHtml2js({
                moduleName: config.projectName + '.Module.Templates',
                prefix: ''
            }))
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.concat(b.name + "-tpl" + (!config.debug ? ".min" : "") + ".js"))
            .pipe(plugins.if(!config.debug && useUglify, plugins.uglify()))
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.write()))
            .pipe(gulp.dest(config.scriptsDist));
    });

    return mergeStream(streams);
});