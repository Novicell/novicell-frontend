const gulp = require('gulp');
const config = require('../config.js');
const plugins = require('gulp-load-plugins')();
const spawn = require('child_process').spawn;

gulp.task('livereload', function () {
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
    gulp.watch(config.watchHtml, ["html"]);

    return;
});

gulp.task('watch', function () {
    var watchNode;
    var livereloadNode;
    var isWin = /^win/.test(process.platform);
    var gulpSpawnProcessName = isWin ? 'gulp.cmd' : 'gulp';

    gulp.watch(config.projectPath + 'gulp/config.js', spawnChildren);
    spawnChildren();

    function spawnChildren() {
        if (watchNode) { watchNode.kill(); }
        watchNode = spawn(gulpSpawnProcessName, ['watcher'], { stdio: 'inherit' });

        if (!livereloadNode) {
            livereloadNode = spawn(gulpSpawnProcessName, ['livereload'], { stdio: 'inherit' });
        } else {
            gulp.watch(config.livereloadPaths)
                .on('change', plugins.livereload.changed);
        }
    }
});
