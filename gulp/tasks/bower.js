'use strict';

const gulp = require('gulp');
const config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task("bower", function () {
    return plugins.bower({ directory: config.bowerPath });
});