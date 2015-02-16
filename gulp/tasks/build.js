var gulp = require('gulp');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');

gulp.task('bower', function() {
	return bower();
});

gulp.task('build', function() {
	// keep the 'version' task first because it runs an async task
	// which uses the file api and the other tasks takes time
	// so - the 'version' SHOULD end before other external tasks are
	// invoked (like the 'build' task) 
	return runSequence(
		'bower',
		'style',
		'html2js',
		'concat'
	);
});
