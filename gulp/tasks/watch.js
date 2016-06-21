var gulp = require('gulp');
var config = require('../config.js');
var plugins = require('gulp-load-plugins')();
var spawn = require('child_process').spawn;

gulp.task("livereload", function () {
    plugins.livereload.listen(config.livereloadPort);

    return gulp.watch(config.livereloadPaths)
        .on('change', plugins.livereload.changed);
});

gulp.task('watcher', function () {
    gulp.watch(config.watchScripts, ["scripts:watch"]);
    gulp.watch(config.watchStyles, ["styles"]);
    gulp.watch(config.watchImages, ["images"]);
    gulp.watch(config.watchIcons, ["icons"]);
    gulp.watch(config.watchFonts, ["copy"]);

    return;
});

gulp.task('watch', function () {
    var watchNode;
    var livereloadNode;

    gulp.watch(config.projectPath + 'gulp/config.js', spawnChildren);
    spawnChildren();

    function spawnChildren() {
        if (watchNode) { watchNode.kill(); }
        watchNode = spawn('gulp.cmd', ['watcher'], { stdio: 'inherit' });

        if (!livereloadNode) {
            livereloadNode = spawn('gulp.cmd', ['livereload'], { stdio: 'inherit' });
        } else {
            gulp.watch(config.livereloadPaths)
                .on('change', plugins.livereload.changed);
        }
    }
});