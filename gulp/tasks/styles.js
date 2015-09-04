var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('compileCss', function () {
    var streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useAutoprefixer = ignores.indexOf("autoprefixer") == -1;

        del([config.stylesDist + '/*']);

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler("styles")))
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.less())
            .pipe(plugins.concat(b.name + ".min.css"))
            .pipe(plugins.if(!config.debug && useAutoprefixer, plugins.autoprefixer(config.stylesVendorPrefixes)))
            .pipe(plugins.if(!config.debug && useSourcemaps, plugins.sourcemaps.write()))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});

gulp.task('styles', ['updateFilesCss'], function(){});