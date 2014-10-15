var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../../gulp-config.json');
var notify = require('gulp-notify');

gulp.task('minify-images', function () {
    return gulp.src(config.images.baseDir + "/*")   
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dist))
        .pipe(notify("Minify Images: OK"))
});

gulp.task('images', ['minify-images']);