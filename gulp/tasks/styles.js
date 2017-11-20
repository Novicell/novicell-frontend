'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
const plugins = require('gulp-load-plugins')();
const cssnano = require('cssnano');
const cssnext  = require('postcss-cssnext');
const nested  = require('postcss-nested');
const postcssImport = require('postcss-partial-import');
const cssvariables = require('postcss-css-variables');
const stylelint = require("stylelint");
const reporter = require("postcss-reporter");

const postCssPlugins = [
    stylelint(),
    postcssImport(),
    cssvariables(),
    nested(),
    cssnext({ browsers: [">= 5% in DK", "ie 11"] }),
    cssnano({
        autoprefixer: false,
        discardComments: {removeAll: true},
        mergeLonghand: true,
        colormin: false,
        zindex: false,
        discardUnused: {fontFace: false}
    }),
    reporter()
];

gulp.task('styles', function () {
    const streams = config.bundles.filter(function (b) {
        return b.styles != null;
    }).map(function (b) {
        console.log(b.name + ' post-CSS styles are compiling');

        return gulp.src(b.styles)
            .pipe(plugins.plumber(config.errorHandler('styles')))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.postcss(postCssPlugins))
            .pipe(plugins.rename({ suffix: ".min", extname: ".css" }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});
