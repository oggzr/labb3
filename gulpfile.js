var gulp = require('gulp'),
    sass = require('gulp-sass'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('ngAnnotate', function () {
    return gulp.src('script.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
    return gulp.src('dist/script.js')
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'watch', 'ngAnnotate', 'uglify']);

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});