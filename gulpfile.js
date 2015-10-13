var source = require('vinyl-source-stream');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');

gulp.task('default', function () {
    //empty
});

gulp.task('build', function () {
    browserify({
        entries: 'components/app.js'
    }).bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch([
        'components/**/*.js'
    ], [
        'build'
    ]);
});