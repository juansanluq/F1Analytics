const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('watch',function () {
    gulp.watch(["scss/*.scss"], function () {
        return (
            gulp.src('scss/landing-page.scss')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }) )
            .pipe(sass({
                includePaths: ['scss']
            }))
            .pipe(gulp.dest('css'))
        );
    });
});