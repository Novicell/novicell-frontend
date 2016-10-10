'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tscConfig = require('../../tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task('typescript', function() {
	if(!config.enableTypescript) {
		console.log('Typescript compiling disabled.')
		return;
	}

    return gulp.src(config.typescriptPath + '/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'))
		.on('end', function() {
			compile();
		});
});

var compile = function() {
	tscConfig.files.push(config.typescriptPath + '/**/*.ts');
	return gulp.src(tscConfig.files)
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.typescriptPath + '/compiled'))
		.on('end', function() {
			minify();
		});
}

var minify = function() {
	return gulp.src(config.typescriptPath + '/compiled/*.js')
        .pipe(plugins.resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
        .pipe(plugins.plumber(config.errorHandler('scripts')))
        .pipe(plugins.jshint())
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.concat('typescript.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(config.scriptsDist));
}