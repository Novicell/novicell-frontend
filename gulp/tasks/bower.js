var gulp = require('gulp');
var config = require('../../gulp-config.json');
var plugins = require('gulp-load-plugins')();

gulp.task("bower", function () {
    return plugins.bower({ directory: config.bowerPath });
});