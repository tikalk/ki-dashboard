var gulp = require('gulp');
var runSequence = require('run-sequence');
global.project_dir = __dirname;

gulp.task('serve', function (callback) {
  runSequence(
    'bower',
    'html2js',
    'concat',
    'style',
    'server:start',
    'watch'
  );
});

gulp.task('servei', function (callback) {
  runSequence(
    'bower',
    'html2js',
    'concat',
    'style',
    'server:start-integration',
    'watch'
  );
});

gulp.task('server-dev', function (callback) {
  runSequence(
  	'u-tests:server:dev',
    'watch:server-dev'
  );
});

gulp.task('default', ['serve']);

require('./gulp');
