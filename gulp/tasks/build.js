var gulp = require('gulp');
var config = require('../../gulp-config.json');
var del = require('del');
var path = require('path');

gulp.task('clean', function (cb) {
    var dirs = [config.styles.dist, config.scripts.dist, config.images.dist, config.icons.dist]
        .map(function (d) { return path.join(config.path, d); });

    return del(dirs, cb);
});

gulp.task('rebuild', ['clean'], function () {
    return gulp.start(config.buildTasks);
});

gulp.task('default', config.buildTasks);