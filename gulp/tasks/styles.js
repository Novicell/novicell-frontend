var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');
var config = require('../../gulp-config.json');

gulp.task('compile-less', function () {
    gulp.src(config.styles.baseDir + '/master.less')
        .pipe(less())
		.pipe(gulp.dest(config.styles.dist))
        .pipe(notify("Successfully compiled .less"));
});

gulp.task('styles', ['compile-less']);