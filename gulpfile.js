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
    react = require('gulp-react'),
    babel = require('gulp-babel');

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
        .pipe(babel())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});

gulp.task('bower', function() {
   return bower()
        .pipe(gulp.dest('build/assets/lib'));
});

gulp.task('default', ['scripts', 'styles', 'html']);

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('src/**', ['default']);
});