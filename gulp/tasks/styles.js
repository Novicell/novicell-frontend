var gulp = require('gulp');
var config = require('../config.js');
var argv = require('yargs').argv;
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function (z) {
    return config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useAutoprefixer = ignores.indexOf("autoprefixer") == -1;

        var debug = config.debug || (argv.debug !== undefined && argv.debug);

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler("styles")))
            .pipe(plugins.if(debug && useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.less())
            .pipe(plugins.if(debug && useAutoprefixer, plugins.autoprefixer(config.stylesVendorPrefixes)))
            .pipe(plugins.if(debug && useSourcemaps, plugins.sourcemaps.write()))
            .pipe(gulp.dest(config.stylesDist));
    });
});