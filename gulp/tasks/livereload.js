var gulp = require('gulp');
var livereload = require('gulp-livereload');
var path = require('path');
var config = require('../../gulp-config.json');

gulp.task("livereload", function () {
    var paths = config.livereload.paths == null ? [] : 
        config.livereload.paths.map(function (p) {
            return path.join(config.path, p);
        });

    livereload.listen(config.livereload.port);
    gulp.watch(paths).on('change', livereload.changed);
});