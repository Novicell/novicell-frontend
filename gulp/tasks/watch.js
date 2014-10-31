var gulp = require('gulp');
var config = require('../../gulp-config.json');
var path = require('path');
var livereload = require('gulp-livereload');

gulp.task("livereload", function () {
    var paths = config.livereload.paths == null ? [] :
        config.livereload.paths.map(function (p) {
            return path.join(config.path, p);
        });

    livereload.listen(config.livereload.port);
    return gulp.watch(paths).on('change', livereload.changed);
});

gulp.task('watch', function () {
    var scriptsPath = config.watch.scripts.map(function (p) {
        return path.join(config.path, p);
    });

    var stylesPaths = config.watch.styles.map(function (p) {
        return path.join(config.path, p);
    });

    var imagesPaths = config.watch.images.map(function (p) {
        return path.join(config.path, p);
    });

    var iconsPaths = config.watch.icons.map(function (p) {
        return path.join(config.path, p);
    });

    gulp.watch(scriptsPath, ["scripts"]);
    gulp.watch(stylesPaths, ["styles"]);
    gulp.watch(imagesPaths, ["images"]);
    gulp.watch(iconsPaths, ["icons"]);
    
    return gulp.start('livereload');
});