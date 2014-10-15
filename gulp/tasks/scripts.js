var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var notify = require('gulp-notify');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var concat = require('gulp-concat');

gulp.task('compile-js', function () {
    gulp.src(config.scripts.baseDir + '/master.js')
        .pipe(resolveDependencies({
            pattern: /\* @require [\s-]*(.*?\.js)/g,
            log: true
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
		.pipe(gulp.dest(config.scripts.dist))
        .pipe(notify("Successfully compiled .js"));
});

gulp.task('scripts', ['compile-js']);