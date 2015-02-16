var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');
var gitshasuffix = require('gulp-gitshasuffix');
var del = require('del');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var git = require('git-rev');

var tcProps = {
  "build.vcs.number": ''
};
try {
  tcProps = require('teamcity-properties');
} catch (err) {
  tcProps = false;
}

var jsPaths = [
  '!./src/client/app/**/*spec*.js',
  '!./src/client/common/**/*spec*.js',
  './src/client/app/**/*.mdl.js',
  './src/client/common/**/*.mdl.js',
  './src/client/app/**/*.js',
  './src/client/common/**/*.js',
  './src/client/app/*.js',
  './src/client/app.js',
];
var destDirectory = 'src/client/';
var concatFileName = 'bundle';
var existingBundledFile = 'src/client/' + concatFileName + '**.js';

function createVersion(dest, latestHash) {
  if (latestHash) {
    writeVersion(latestHash);
  } else {
    git.short(writeVersion);
  }
  
  function writeVersion (hash) {
    return gulp.src('gulp/templates/version.json')
      .pipe(replace(/(\{\{VERSION\}\})/, hash))
      .pipe(gulp.dest(dest));
  }
}

gulp.task('concat:version', function(){
  return tcProps ?
    createVersion('src/client', tcProps['build.vcs.number']) 
    : createVersion('.tmp', false);
});

gulp.task('concat:js', ['concat:version'], function(){
  var options = {sourcesContent :true, prefix : 0};
  return gulp.src(jsPaths)
    .pipe(concat(concatFileName + '.js', options))
    .pipe(gulp.dest(destDirectory));  
});

gulp.task('concat:vendors', function () {
    var assets = useref.assets();
    return gulp.src('./src/client/*.html')
        .pipe(assets)
        // .pipe(assets.restore())
        .pipe(useref())
        .pipe(replace(/^\/\/#\ssourceMappingURL=[\w0-9$.\-_]+/gm, ' '))
        .pipe(gulp.dest('src/client'));
});

module.exports = gulp.task('concat', [ 'concat:vendors', 'concat:js' ], function(){
    var bundleFiles = gulp.src([
      'src/client/vendors.js', 
      existingBundledFile,
      'src/client/templates.mdl.js',
    ], {read: false});
    del(destDirectory + concatFileName + '*js-**');
    return gulp.src('src/client/index.html')
      .pipe(inject(bundleFiles, {relative: true}))
      .pipe(gulp.dest('src/client'));
});
