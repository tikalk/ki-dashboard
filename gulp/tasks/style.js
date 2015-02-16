var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
var rename = require('gulp-rename');

var onError = function(error) {
    console.log(error.toString());
    gutil.beep();
};

gulp.task('style', ['sprite'], function () {
  return gulp.src('src/client/styles/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/client'))
    .on('error', onError);
});

var spritesmith = require('gulp.spritesmith');

gulp.task('sprite:generate', function () {
  return gulp.src('src/client/assets/slices/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: 'assets/sprite.png'
  }))
  .pipe(gulp.dest('src/client/assets'));
});

gulp.task('sprite:less', ['sprite:generate'], function(){

  return gulp.src('src/client/assets/sprite.css')
    .pipe(insert.transform(function(contents){
      // adds regular icon-name with :hover, :active and disabled states
      var standard = '_idle';
      var hover = '_hover';
      var active = '_selected';
      var disable = '_disable';
      var cssClassesRegexp = /\.[a-z\-_]+\s/gm;
      var result = contents.match(cssClassesRegexp);
      result = result.map(function(selector){
        var isStandardSelector = selector.indexOf(standard) > -1;
        var css = [];
        var name = selector.replace(standard, '').replace(' ', '');
        if (isStandardSelector) {
          var isHoverExists = contents.indexOf(name + hover) > -1;
          var isActiveExists = contents.indexOf(name + active) > -1;
          css = [
            name, 
            ' {', selector, ';', 
            isHoverExists ? ' &:hover{' + name + hover + ';}' : '',
            // selected doesn't exost for each
            isActiveExists ? '&.active, &:active{' + name + active + ';}' : '',
            '}'
          ];
        }
        return css.join('');
      });
      return contents + '\n' + result.join('');
    }))
    .pipe(gulp.dest('src/client/assets'));
});

gulp.task('sprite', ['sprite:less'], function(){
  var standard = '_idle';
  var hover = '_hover';
  var active = '_selected';
  var disable = '_disable';

  return gulp.src('src/client/assets/sprite.css')
    .pipe(insert.transform(function(contents){
      var sourceCss = contents.replace(/assets\/sprite\.png/gm, 'sprite.png');
      var cssClassesRegexp = /\.[a-z\-_]+\s/gm;
      var result = contents.match(cssClassesRegexp);
      // Creates Styleguide for icons
      result = result.map(function(selector){
        return [
          '<li style="list-style: none;">',
          '<span style="display: inline-block; margin-right: 5px" class="',
          selector.substr(1),
          '">',
          '</span>',
          '<span style="display: block; word-wrap: break-word">', selector.substr(1), '</span>',
          '<h4>Main class:</h4>',
          '<div style="display: block; word-wrap: break-word">', 
          selector.substr(1).replace(standard, '').replace(hover, '').replace(active, '').replace(disable, ''), 
          '</div>',
          '</li>'
        ].join('');
      });
      result.splice(0, 0, [
        '<html><head>',
        '<style type="text/css">', 
        'ul li{text-align: center;font-size: 14px;float: left; list-style: none; height: 150px; overflow: auto; width: 150px; border: 1px solid #ccc; margin: 10px;}',
        sourceCss, 
        '</style>',
        '<h1>ki Icons Map</h1>',
        '<ul>'
      ].join(''));
      result.push('</ul>');
      result.push('</body></html>');
      return result.join('\n');
    }))
    .pipe(rename('sprite-map.html'))
    .pipe(gulp.dest('src/client/assets'));
});