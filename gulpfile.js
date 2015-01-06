var gulp = require('gulp');
var to5 = require('gulp-6to5');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
	var app = gulp.src('src/app.js')
		.pipe(sourcemaps.init())
		.pipe(to5())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));

	var modules = gulp.src('src/modules/*.js')
		.pipe(sourcemaps.init())
		.pipe(to5())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));

	return merge (app, modules);
});

