var gulp = require('gulp');

//     sass = require('gulp-ruby-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     jshint = require('gulp-jshint'),
//     uglify = require('gulp-uglify'),
//     imagemin = require('gulp-imagemin'),
//     rename = require('gulp-rename'),
//     concat = require('gulp-concat'),
//     notify = require('gulp-notify'),
//     cache = require('gulp-cache'),
//     livereload = require('gulp-livereload'),
//     gutil = require('gulp-util'),
//     del = require('del')
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');

gulp.task('default', function() {
    var gutil = require('gulp-util');
});

gulp.task('travis', ['build'], function() {

});

gulp.task('test',['lint','mocha'],function() {

});

gulp.task('lint', function () {
    return gulp.src('./src/js/viper.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
    gulp.src('./src/js/viper.js')
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('build', ['test', 'clean'], function () {
    return gulp.src('./src/js/viper.js')
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('./dist'));
});