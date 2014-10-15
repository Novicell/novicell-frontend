var gulp = require('gulp');
var config = require('../../gulp-config.json');
var del = require('del');

gulp.task('clean', function (cb) {
    return del([config.styles.dist, config.scripts.dist], cb);
});

gulp.task('default', ['clean'], function () {
    return gulp.start(config.buildTasks);
});