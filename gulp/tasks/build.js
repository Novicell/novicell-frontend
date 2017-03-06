'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return del(config.cleanPaths, {force: true});
});

gulp.task('rebuild', ['clean'], function () {
    return gulp.start('default');
});

gulp.task('default', function(){
    return gulp.start(config.buildTasks);
});
