/**
 * Created by abrasumente on 15-10-6.
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    bower = require('gulp-bower'),
    react = require('gulp-react');

gulp.task('clean', function(cb) {
    del(['build/assets/css', 'build/assets/js', 'build/*.html'], cb);
});

gulp.task('styles', function() {
   return gulp.src('src/css/**/*.css')
       .pipe(autoprefixer('last 2 version'))
       .pipe(gulp.dest('build/assets/css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest('build/assets/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});

gulp.task('bower', function() {
   return bower()
        .pipe(gulp.dest('build/assets/lib'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});