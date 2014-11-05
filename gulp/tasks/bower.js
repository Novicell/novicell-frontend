var gulp = require('gulp');
var config = require('../../gulp-config.json');
var bower = require('gulp-bower');

gulp.task("bower", function () {
    return bower({ directory: config.bowerPath });
});