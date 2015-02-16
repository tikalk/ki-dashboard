var gulp = require('gulp');
var rimraf = require('gulp-rimraf');

gulp.task('clean:src', function() {
  return gulp.src([
      'src/client/bundle.js',
      'src/client/bundle.js.map',
      'src/client/app.css',
      'src/client/app.css.map'], { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('clean:bower', function() {
  return gulp.src('src/client/bower_components', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('clean:dist', function() {
  return gulp.src('dest', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('clean:all', ['clean:src', 'clean:bower', 'clean:dist']);
gulp.task('clean', ['clean:src', 'clean:dist']);