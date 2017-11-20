'use strict';

var gulp = require('gulp');
var config = require('../config.js');

var favicons = require("gulp-favicons"),
gutil = require("gulp-util");

gulp.task("favicons", function () {
return gulp.src(config.assetPath + "favicons/favicons-master.png").pipe(favicons({
    appName: config.appName,
    appDescription: config.appDescription,
    background: config.appColor,
    theme_color: config.appColor,
    path: config.faviconPath + "favicons/",
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