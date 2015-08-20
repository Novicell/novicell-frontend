var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var xmlEdit = require('gulp-edit-xml');
var rev = require('gulp-rev');

gulp.task('scripts', ['revision'], function () {
    var manifestJs = require('../../dist/scripts/rev-manifest.json');
    var manifestCss = require('../../dist/css/rev-manifest.json');

    var options = {
        parserOptions: {},
        builderOptions: {
            headless:true,
            renderOpts:{
                pretty: true
            }
        }
    };

    var csproj = gulp.src('*.csproj')
        .pipe(plugins.plumber(config.errorHandler("scripts")))
        .pipe(xmlEdit(function(xml){
            var fileIncludes = xml.Project.ItemGroup[2].Content;
            //console.log(manifestJs);

            // manifestJs.forEach(function(element, index, array){
            //     console.log(array);
            // });

            for (var key in manifestJs){
                var origFilename = key;
                var newFilename = manifestJs[key];
                var fileNameStripped = origFilename.substr(0,origFilename.lastIndexOf('.'));
                var fileExt = origFilename.substr(origFilename.lastIndexOf('.'));
                var regex = new RegExp(fileNameStripped + '(.*)?' + fileExt);
                for(var i = 0 , l = fileIncludes.length; i < l; i++){
                    var node = fileIncludes[i].$.Include;
                    var res = node.match(regex);
                    if (res != null) {
                        fileIncludes[i].$.Include = node.substr(0, node.lastIndexOf('\\')) + '\\' + newFilename;
                    };
                }
            }

            xml.Project.ItemGroup[2].Content = fileIncludes;
            return xml;
        }, options))
        .pipe(gulp.dest('.'));

    return mergeStream(csproj);
});

gulp.task('revision', ['allScripts'] , function () {
    var revJs = gulp.src(config.scriptsDist + '/*.js')
        .pipe(rev())
        .pipe(gulp.dest(config.scriptsDist))
        .pipe(rev.manifest([]))
        .pipe(gulp.dest(config.scriptsDist));

    var revCss = gulp.src(config.stylesDist + '/*.css')
        .pipe(rev())
        .pipe(gulp.dest(config.stylesDist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.stylesDist));

    return mergeStream(revJs, revCss);
});