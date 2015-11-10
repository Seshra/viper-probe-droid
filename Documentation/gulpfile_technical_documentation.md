#GULP.js Technical Documentation v0.02
###Gulp.js is the tool used to test, clean and build the Viper files to be used in production.  This document explains what elements are contained within the Gulp file and what each element does.

<br>
####The current version of the gulp.js file contains 9 sections of code.

####1.) Required Plugins

```
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var karma = require('karma');
var server = require('karma').Server;
var gutil = require('gulp-util');
```
This section of the code shows all of the plug-ins that have been enabled in the gulp file.
<br><br>
####2.) Default Task

```
gulp.task('default', ['lint','test','clean','build','travis']);
```
This section of the code tells Gulp what tasks are to be run.  Notice that this 'default' task contains an array with all of the below tasks within it.  This is telling Gulp to run all of these tasks.
<br><br>
####3.) Task: Lint 

```
gulp.task('lint', function () {
    return gulp.src('./src/js/viper.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});
```
This task runs a version of jslint, called jshint.  Jshint is tool that checks the source code being uploaded for production, and verifies that any JavaScript source code complies with standard coding rules.
<br><br>
####4.) Task: Test

```
gulp.task('test', ['lint'], function (done) {
    new server({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done).start();
});
```
This task runs automated tests using the Karma test runner and the Jasmine testing framework.  Tests run from this task use the `karma.conf.js` to enable Jasmine and tell the Jasmine framework what to test and how.  More information on these two systems can be found here:<br>
Karma:  [https://github.com/karma-runner/karma/blob/master/README.md](https://github.com/karma-runner/karma/blob/master/README.md)<br>
Jasmine:  [https://github.com/jasmine/jasmine/blob/master/README.md](https://github.com/jasmine/jasmine/blob/master/README.md)
<br><br>
####5.) Task: Clean

```
gulp.task('clean', ['test'], function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});
```
This task simply removes and files and folders from the "./dist" directory.  This directory is where the final builds of the production files will be placed.
<br><br>
####6.) Task: Build

```
gulp.task('build', ['lint','test', 'clean'], function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(size())
        .pipe(gulp.dest('./dist'));
});
```
This task is actually made up of two tasks, Uglify and Size.  The build task takes any Javascript files found in the "./src/js" directory and runs it through the Uglify plugin, which minifies the code.  The Size plugin simply displays the size of the code after it is minified.  Once the code is minified, it is placed into the directory specified in the ""gulp.dest" parameter, which is "./dist".
<br><br>
####7.) Task: Travis

```
gulp.task('travis', ['build'], function() {

});
```
Travis is a plugin that takes the files that have been checked, tested and built above, and moves them in to the Content Delivery Network automatically.

All of the above steps will automatically run every time a file is uploaded into the Github repository. 
