'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function () {
    var streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useAutoprefixer = ignores.indexOf("autoprefixer") == -1;

        console.log(b.name + ' styles is being compiled using ' + config.preprocessor);

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler("styles")))
            .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.lesshint(config.lessConfig))
            .pipe(plugins.lesshint.reporter())
            .pipe(plugins.less())
            .pipe(plugins.concat(b.name + ".min.css"))
            .pipe(plugins.if(useAutoprefixer, plugins.autoprefixer(config.stylesVendorPrefixes)))
            .pipe(plugins.cssnano(config.cssnanoConfig))
            .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});
