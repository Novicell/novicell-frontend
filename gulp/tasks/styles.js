var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../../gulp-config.json');

function compile(path) {
    return gulp.src(path)
        .pipe(less())
        .pipe(autoprefixer(config.styles.vendorPrefixes))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
	    .pipe(gulp.dest(config.styles.dist));
};

gulp.task('compile-less', function () {
    return compile(config.styles.baseDir + '/master.less')
        .pipe(notify("Compile LESS: OK"));
});

gulp.task('compile-less-components', function () {
    return config.components.map(function (c) {
        return compile(config.styles.baseDir + '/components/' + c + '.less')
            .pipe(notify("Compile LESS Component (" + c + "): OK"));
    });
});

gulp.task('styles', ['compile-less', 'compile-less-components']);