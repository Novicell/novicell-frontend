var gulp = require('gulp');
var config = require('../../gulp-config.json');
var del = require('del');

gulp.task('clean', function (cb) {
    return del([config.styles.dist, config.scripts.dist, config.images.dist, config.icons.dist], cb);
});

gulp.task('rebuild', ['clean'], function () {
    return gulp.start(config.buildTasks);
});

gulp.task('default', config.buildTasks);