var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var Server = require('karma').Server;
var karma = require('gulp-karma');
var gutil = require('gulp-util');

//     sass = require('gulp-ruby-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     imagemin = require('gulp-imagemin'),
//     rename = require('gulp-rename'),
//     concat = require('gulp-concat'),
//     notify = require('gulp-notify'),
//     cache = require('gulp-cache'),
//     livereload = require('gulp-livereload'),
//     gutil = require('gulp-util'),
//     del = require('del')

gulp.task('default', ['lint','karma','clean','build','travis']);

var testFiles = [
    'src/js/viper.js',
    'test/viper.spec.js'
];

gulp.task('lint', function () {
    return gulp.src('./src/js/viper.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma', ['lint'], function() {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }))
});

gulp.task('clean', ['karma'], function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('build', ['lint','karma', 'clean'], function () {
    return gulp.src('./src/js/viper.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(size())
        .pipe(gulp.dest('./dist'));
});

gulp.task('travis', ['build'], function() {

});