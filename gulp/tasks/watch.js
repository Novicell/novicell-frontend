var gulp = require('gulp');
var config = require('../../gulp-config.json');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
    gulp.watch(config.styles.baseDir + "/**/*.less", ['styles']);
    gulp.watch(config.scripts.baseDir + "/**/*.js", ['scripts']);
    gulp.watch(config.images.baseDir + "/*", ["images"]);

    var pathsToReload = [
        config.styles.dist + "/*.css",
        config.scripts.dist + "/*.js"
    ];

    livereload.listen();
    gulp.watch(pathsToReload).on('change', livereload.changed);
});