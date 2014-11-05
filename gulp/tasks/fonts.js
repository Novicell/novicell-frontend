var gulp = require('gulp');
var config = require('../../gulp-config.json');
var path = require('path');
var newer = require('gulp-newer');

gulp.task("fonts", function () {
    var paths = config.bundles.filter(function (b) {
        return b.fonts != null;
    }).reduce(function (x, y) { return x.concat(y.fonts); }, []).map(function (b) {
        console.log(b);
        return path.join(config.basePath, b);
    });

    var destination = path.join(path.join(config.basePath, config.distPath), config.fonts.dist);

    return gulp.src(paths)
        .pipe(newer(destination))
        .pipe(gulp.dest(destination));
});