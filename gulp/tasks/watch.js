var gulp = require('gulp');
var config = require('../../gulp-config.json');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
    gulp.watch(config.styles.baseDir + "/**/*.less", ['styles']);
    gulp.watch(config.scripts.baseDir + "/**/*.js", ['scripts']);
    gulp.watch(config.images.baseDir + "/*", ["images"]);
    gulp.watch(config.icons.baseDir + "/*", ["icons"]);

    var pathsToReload = [
        config.styles.dist + "/*.css",
        config.scripts.dist + "/*.js"
    ];

    livereload.listen(1337);
    gulp.watch(pathsToReload).on('change', livereload.changed);
});