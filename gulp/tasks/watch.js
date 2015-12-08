var gulp = require('gulp');
var config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task("livereload", function () {
    plugins.livereload.listen(config.livereloadPort);

    return gulp.watch(config.livereloadPaths)
        .on('change', plugins.livereload.changed);
});

gulp.task('watch', function () {
    gulp.watch(config.watchScripts, ["scripts:watch"]);
    gulp.watch(config.watchStyles, ["styles"]);
    gulp.watch(config.watchImages, ["images"]);
    gulp.watch(config.watchIcons, ["icons"]);
    gulp.watch(config.watchFonts, ["copy"]);

    return gulp.start('livereload');
});
