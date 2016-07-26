'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

// Tasks
gulp.task('scripts', function () {
    return compileScripts(false);
});

gulp.task('scripts:watch', function () {
    return compileScripts(true);
});

// Functions
var compileScripts = function(isWatchTask){
    var streams = config.bundles.filter(function (b) {
        //Check if script ignores watch-task
        if (b.scripts != null) {
            if (!isWatchTask || b.ignorePlugins == undefined) {
                return true;
            }
            else {
                return b.ignorePlugins.indexOf("watch") == -1;
            }
            return true;
        }
        else
        {
            return false;
        }

    }).map(function (b) {
        console.log(b.name + '-bundle is being compiled');
        var ignores = b.ignorePlugins != undefined ? b.ignorePlugins : [];

        var useJshint = ignores.indexOf("jshint") == -1;
        var useJscs = ignores.indexOf("jscs") == -1;
        var useSourcemaps = ignores.indexOf("sourcemaps") == -1;
        var useMinify = ignores.indexOf("minify") == -1;

        return gulp.src(b.scripts)
        .pipe(plugins.resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
        .pipe(plugins.plumber(config.errorHandler("scripts")))
        .pipe(plugins.if(useJshint, plugins.jshint()))
        .pipe(plugins.if(useJshint, plugins.jshint.reporter('jshint-stylish')))
        .pipe(plugins.if(useJscs, plugins.jscs()))
        .pipe(plugins.if(useJscs, plugins.jscsStylish()))
        .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.init({ loadMaps: true })))
        .pipe(plugins.concat(b.name + ".min.js"))
        .pipe(plugins.if(useMinify, plugins.uglify()))
        .pipe(plugins.if(useSourcemaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(config.scriptsDist));
    });

    return mergeStream(streams);
};
