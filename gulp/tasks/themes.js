var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('themes', function () {
    var streams = config.bundles.filter(function (b) {
        return b.themes != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useAutoprefixer = ignores.indexOf("autoprefixer") == -1;
        var useLess = config.preprocessor == "less";
        var useScss = config.preprocessor == "scss";

        console.log(b.name + ' themes are compiling using ' + config.preprocessor);

        return gulp.src(b.themes)
            .pipe(plugins.plumber(config.errorHandler("themes")))
            .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.if(useLess, plugins.less()))
            .pipe(plugins.if(useScss, plugins.sass()))
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
