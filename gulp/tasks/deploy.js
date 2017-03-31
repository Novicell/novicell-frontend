'use strict';

const gulp = require('gulp');
const config = require('../config.js');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

gulp.task('deploy', function () {
	var conn = ftp.create({
		host: config.deployHost,
		user: config.deployUser,
		password: config.deployPass,
		parallel: 10,
		log: gutil.log
		// secure: true
	});
	
	// using base = '.' will transfer everything to /public_html correctly
	// turn off buffering in gulp.src for best performance
	return gulp.src(config.deployGlobs, { base: config.distPath, buffer: false } )
		.pipe(conn.newer(config.deployDest)) // only upload newer files
		.pipe(conn.dest(config.deployDest));
});