var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('dist', ['copy:dist'], function(){ 
	return gulp.src([
      'package.json',
      'bower.json',
      'src/server/**/*',
      'src/**/*',
      '!src/_server/**/*',
      '!src/client/app/**/*',
      '!src/client/common/**/*',
      '!src/client/bower_components/**/*',
      '!src/client/styles/**/*',
      '!src/client/assets/slices/**/*',
      '!src/client/assets/sprite.css',
      'src/server/**/*',
      // these fonts are loaded from ui-grid.css and need to be in root path of client
      'src/client/bower_components/angular-ui-grid/ui-grid.ttf',
      'src/client/bower_components/angular-ui-grid/ui-grid.woff'
      ])
        .pipe(zip('distribution.zip'))
        .pipe(gulp.dest('dist'));
});