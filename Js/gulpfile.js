var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util');

gulp.task('scripts', function () {
  return gulp.src(['jsAngular/App/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('task', function () {
  gulp.src(['jsAngular/App*.js', '!./node_modules/**'])
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('jsAngular/App/**/*.js', ['scripts']); // Vigila cambios en los javascript (Angular)
});

gulp.task('default', ['scripts', 'watch']);