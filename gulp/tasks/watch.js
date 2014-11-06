var gulp = require('gulp');
var config = require('../../gulp-config.json');
var path = require('path');
var plugins = require('gulp-load-plugins')();

gulp.task("livereload", function () {
    var paths = config.livereload.paths == null ? [] :
        config.livereload.paths.map(function (p) {
            return path.join(config.basePath, p);
        });

    plugins.livereload.listen(config.livereload.port);
    return gulp.watch(paths).on('change', plugins.livereload.changed);
});

gulp.task('watch', function () {
    var scriptsPath = config.watch.scripts.map(function (p) {
        return path.join(config.basePath, p);
    });

    var stylesPaths = config.watch.styles.map(function (p) {
        return path.join(config.basePath, p);
    });

    var imagesPaths = config.watch.images.map(function (p) {
        return path.join(config.basePath, p);
    });

    var iconsPaths = config.watch.icons.map(function (p) {
        return path.join(config.basePath, p);
    });

    var fontsPaths = config.watch.fonts.map(function (p) {
        return path.join(config.basePath, p);
    });

    gulp.watch(scriptsPath, ["scripts"]);
    gulp.watch(stylesPaths, ["styles"]);
    gulp.watch(imagesPaths, ["images"]);
    gulp.watch(iconsPaths, ["icons"]);
    gulp.watch(fontsPaths, ["fonts"]);

    return gulp.start('livereload');
});