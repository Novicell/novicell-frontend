var gulp = require('gulp');
var config = require('../../gulp-config.json');
var path = require('path');
var del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', function () {
    var dirs = config.pathsToClean.map(function (d) { 
        return path.join(config.basePath, d); 
    });

    return del(dirs);
});

gulp.task('rebuild', ['clean'], function () {
    return gulp.start('default');
});

gulp.task('default', config.tasksToBuild);