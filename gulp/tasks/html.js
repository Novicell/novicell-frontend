'use strict';

/*
    the html task looks through the html files in the html folder, after the prefix @@.
    This makes it possible to include 'partial' html pieces like

    <body>
        @@include('components/site-header.html')
    </body>
*/

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var replace = require('gulp-replace');

gulp.task('html', function() {
    var streams = config.bundles.filter(function (b) {
        return b.html != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        console.log(b.name + ' html is being compiled');

        return gulp.src(b.html)
            .pipe(plugins.plumber(config.errorHandler('html')))
            .pipe(plugins.fileInclude(config.htmlFileIncludeConfig))
            .pipe(replace(/[\u200B-\u200D\uFEFF]/g, ""))
            .pipe(gulp.dest(config.distPath));
    });

    return mergeStream(streams);
});
