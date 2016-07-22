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
        var useLess = config.preprocessor == "less";
        var useScss = config.preprocessor == "scss";

        console.log(b.name + ' styles is being compiled using ' + config.preprocessor);

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler("styles")))
            .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.if(useLess, plugins.less()))
            .pipe(plugins.if(useScss, plugins.sass()))
            .pipe(plugins.concat(b.name + ".min.css"))
            .pipe(plugins.if(useAutoprefixer, plugins.autoprefixer(config.stylesVendorPrefixes)))
            .pipe(plugins.cssnano({
                discardComments: {removeAll: true},
                mergeLonghand: true,
                colormin: false,
                zindex: false
            }))
            .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});
