var gulp = require('gulp')
	, jade = require('gulp-jade')
	, sass = require('gulp-sass')
	, concat = require('gulp-concat')
	, connect = require('gulp-connect')
	, autoprefixer = require('gulp-autoprefixer')
	, del = require('del');

var BUILD_DIR = './build/'
	, TEMPLATES_DIR = "./sources/templates/"
	, STYLESHEETS_PATH = './sources/stylesheets/*.scss'
	, SCRIPTS_PATH = './sources/scripts/*.js';

gulp.task('clean', function() {
	return del(BUILD_DIR);
});

gulp.task('connect', function() {
	connect.server({
		root: BUILD_DIR,
		livereload: true
	});
});

gulp.task('templates', function() {
	return gulp.src(TEMPLATES_DIR + 'index.jade')
		.pipe(jade())
		.pipe(gulp.dest(BUILD_DIR))
		.pipe(connect.reload());
});

gulp.task('stylesheets', function () {
	return gulp.src(STYLESHEETS_PATH)
		.pipe(concat('main.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(BUILD_DIR + 'css'))
		.pipe(connect.reload());
});

gulp.task('scripts', function () {
	return gulp.src(SCRIPTS_PATH)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(BUILD_DIR + 'js'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(STYLESHEETS_PATH, ['stylesheets']);
	gulp.watch(TEMPLATES_DIR + '/**/*.jade', ['templates']);
	gulp.watch(SCRIPTS_PATH, ['scripts']);
});

gulp.task('default', ['connect', 'templates', 'stylesheets', 'scripts', 'watch']);