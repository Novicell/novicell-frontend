var gulp = require('gulp');
var config = require('../config.js');
var mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var xmlEdit = require('gulp-edit-xml');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var buffer = require('gulp-buffer');

// Update files - tasks
gulp.task('updateFilesJs', ['revisionJs'], function () {
    return updateFiles(config.scriptsDist, '.js');
});

gulp.task('updateFilesCss', ['revisionCss'], function () {
    return updateFiles(config.stylesDist, '.css');
});

gulp.task('watchUpdateFilesJs', ['watchRevisionJs'], function () {
    return updateFiles(config.scriptsDist, '.js');
});

// Revision tasks
gulp.task('revisionJs', ['compileJs'] , function () {
    return revision(config.scriptsDist, '.js');
});

gulp.task('revisionCss', ['compileCss'] , function () {
    return revision(config.stylesDist, '.css');
});

gulp.task('watchRevisionJs', ['watchCompileJs'] , function () {
    return revision(config.scriptsDist, '.js');
});


// Functions
var updateFiles = function(distFolder, fileType){
    var manifestPath = '../.' + distFolder + '/rev-manifest.json';
    delete require.cache[require.resolve(manifestPath)]
    var manifest = require(manifestPath);

    // XML options for .csproj updates
    var options = {
        parserOptions: {},
        builderOptions: {
            headless:true,
            renderOpts:{
                pretty: true
            }
        }
    };

    // If is Visual Studio project, update .csproj-file accordingly
    if(config.isVSSolution){
        var csproj = gulp.src('*.csproj')
        .pipe(plugins.plumber(config.errorHandler("update files")))
        .pipe(xmlEdit(function(xml){
            var fileIncludes = xml.Project.ItemGroup[2].Content;

            for (var key in manifest){
                var contentIncludeFound = false;
                var origFilename = key;
                var newFilename = manifest[key];
                var fileNameStripped = origFilename.substr(0,origFilename.lastIndexOf('.'));
                var fileExt = origFilename.substr(origFilename.lastIndexOf('.'));
                var regex = new RegExp(fileNameStripped + '(.*)?' + fileExt);
                for(var i = 0 , l = fileIncludes.length; i < l; i++){
                    var node = fileIncludes[i].$.Include;
                    var res = node.match(regex);
                    if (res != null) {
                        fileIncludes[i].$.Include = node.substr(0, node.lastIndexOf('\\')) + '\\' + newFilename;
                        contentIncludeFound = true;
                    };
                }
                if (!contentIncludeFound) {
                    var destination;
                    if (fileExt == '.js') {
                        destination = config.scriptsDist;
                    }
                    else if (fileExt == '.css') {
                        destination = config.stylesDist;
                    }
                    var newInclude = {};
                    newInclude.$ = {};
                    newInclude.$.Include = destination.replace('./','').replace('/','\\') + '\\' + newFilename;
                    fileIncludes[fileIncludes.length] = newInclude;
                };
            }

            xml.Project.ItemGroup[2].Content = fileIncludes;
            return xml;
        }, options))
        .pipe(gulp.dest('.'));
    }

    // Inject new revisioned files into master-templates
    for (var i = 0; i < config.masterTemplates.length; i++){
        var masterFile = config.masterTemplates[i];
        var masterFiles = gulp.src(masterFile);
        var masterFileDest = masterFile.substr(0, masterFile.lastIndexOf('/')+1);

        for (var key in manifest){
            var origFilename = key;
            var newFilename = manifest[key];
            masterFiles = masterFiles.pipe(inject(gulp.src(distFolder + '/' + newFilename, {read: false}), {name: origFilename.replace('.min' + fileType, '')}));
        }
        masterFiles = masterFiles.pipe(gulp.dest(masterFileDest));
    }

    if(config.isVSSolution){
        return mergeStream(csproj, masterFiles);
    }
    else {
        return mergeStream(masterFiles);
    }
};

var revision = function(distFolder, fileType){
    var fileRevision = gulp.src(distFolder + '/*' + fileType)
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest(distFolder))
        .pipe(rev.manifest())
        .pipe(gulp.dest(distFolder));

    return mergeStream(fileRevision);
};
