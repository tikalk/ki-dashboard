var gulp = require('gulp');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat-sourcemap');

gulp.task('html2js', function(){
	return gulp.src([
		'!./src/client/bower_components/**/*.html',
		'!./src/client/index.html',
		'./src/client/**/*.html'
		])
		.pipe(minifyHtml({
	        empty: true,
	        spare: true,
	        quotes: true
	    }))
	    .pipe(ngHtml2Js({
	        moduleName: 'htmlTemplates'
	        // prefix: ''
	    }))
	    .pipe(concat('templates.mdl.js'))
	    .pipe(gulp.dest('./src/client'));
});