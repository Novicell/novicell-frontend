var gulp = require('gulp');
var config = require('../../gulp-config.json');
var del = require('del');
var path = require('path');

gulp.task('clean', function () {
    var dirs = config.pathsToClean.map(function (d) { 
        return path.join(config.path, d); 
    });

    return del(dirs);
});

gulp.task('rebuild', ['clean'], function () {
    return gulp.start('default');
});

gulp.task('default', config.tasksToBuild);