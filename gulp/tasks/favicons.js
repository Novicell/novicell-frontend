'use strict';

const gulp = require('gulp');
const config = require('../config.js');

var favicons = require("gulp-favicons"),
gutil = require("gulp-util");

gulp.task("favicons", function () {
return gulp.src("favicons/favicons-master.png").pipe(favicons({
    appName: config.appName,
    background: config.appColor,
    path: config.distPath + "favicons/",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    version: 1.0,
    logging: false,
    online: false,
    html: "index.html",
    pipeHTML: true,
    replace: true
}))
.on("error", gutil.log)
.pipe(gulp.dest(config.distPath + "favicons"));
});