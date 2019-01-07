'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const favicons = require('gulp-favicons');
const plugins = require('gulp-load-plugins')();

// For more info: https://github.com/evilebottnawi/favicons
gulp.task('favicons', function() {
    return gulp
        .src(config.assetPath + 'favicons/favicons-master.png')
        .pipe(plugins.plumber(config.errorHandler('favicons')))
        .pipe(
            favicons({
                appName: config.appName,
                appDescription: config.appDescription,
                background: config.appColor,
                theme_color: config.appColor,
                path: config.webPath,
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
                version: 1.0,
                logging: false,
                online: false,
                html: 'index.html',
                pipeHTML: true,
                replace: true
            })
        )
        .pipe(gulp.dest(config.faviconsPath));
});
