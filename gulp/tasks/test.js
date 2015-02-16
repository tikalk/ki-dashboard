var gulp = require('gulp');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var protractor = require('gulp-protractor').protractor;

var tcProps = {};
try {
  tcProps = require('teamcity-properties');
} catch (err) {
  tcProps = false;
}

module.exports = gulp.task('test:client', function (done) {
  karma.start({
    configFile: global.project_dir + '/karma.conf.js',
    singleRun: tcProps ? true : false
  }, done);
});

gulp.task('test:protractor', function(){
    return gulp.src([global.project_dir + '/tests/client/e2e/*.spec.js'])
    .pipe(protractor({
        configFile: 'tests/client/protractor.conf.js',
    }))
    .on('error', function(e) {
      throw e;
    });
});

gulp.task('test:server:production', function () {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'src/server/**/*.mocked.js',
      'src/server/**/*.spec.js'], {read: false})
      .pipe(mocha({
        reporter: 'mocha-teamcity-reporter'
      }))
      .once('end', function () {
        process.exit();
      });
});

// run mocha in debug mode
// node_modules/gulp-mocha/node_modules/mocha/bin/mocha --debug-brk  src/server/**/*.spec.js
gulp.task('test:server:dev', function () {
   process.env.NODE_ENV = 'test';
   return gulp.src([
      // any mocked modules will be loaded before the specs
      'src/server/**/*.mocked.js',
      'src/server/**/*.spec.js'], {read: false})
      .pipe(mocha({
        reporter: 'list'
      }))
      .on('error', gutil.log);
});

// shortcuts...
gulp.task('tc', ['test:client']);
gulp.task('ts', ['test:server:dev']);

// test task for production
gulp.task('test', ['test:client'], function(){
  runSequence(['test:server:production']);
});