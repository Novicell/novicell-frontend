var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var notify = require('gulp-notify');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var concat = require('gulp-concat');

gulp.task('compile-js', function () {
    return gulp.src(config.scripts.baseDir + '/master.js')
        .pipe(resolveDependencies({
            pattern: /\* @require [\s-]*(.*?\.js)/g,
            log: true
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
		.pipe(gulp.dest(config.scripts.dist))
        .pipe(notify("Compile JS: OK"));
});

gulp.task('compile-js-components', function () {
    return config.components.map(function (c) {
        return gulp.src(config.scripts.baseDir + '/components/' + c + '.js')
            .pipe(uglify())
            .pipe(gulp.dest(config.scripts.dist))
            .pipe(notify("Compile JS Component (" + c + "): OK"));
    });
});

gulp.task('scripts', ['compile-js', 'compile-js-components']);