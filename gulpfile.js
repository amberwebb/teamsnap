var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    prettify = require('gulp-js-prettify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
  .pipe(jsHint())
  .pipe(jshint.reporter('default'));
});

gulp.task('prettify', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(prettify({collapseWhitespace: true}))
    .pipe(gulp.dest('./src/scripts/*.js'))
});

gulp.task('scripts', function() {
  return gulp.src(['./src/scripts/teamsnap.js', './src/scripts/teamsnap-loader.js', './src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('connect', function() {
  connect.server()
});

gulp.task('default', ['prettify', 'connect'])
