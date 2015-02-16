var gulp = require('gulp');
var bootstrapFonts = 'src/client/bower_components/bootstrap/fonts/**/*.*';

gulp.task('copy:dist', function () {
    return copyFonts(bootstrapFonts, 'src/client/fonts/bootstrap');
});

gulp.task('copy:dev', function () {
    return copyFonts(bootstrapFonts, '.tmp/fonts/bootstrap');
});

function copyFonts(src, dest){
	return gulp.src(src)
		.pipe(gulp.dest(dest));
}