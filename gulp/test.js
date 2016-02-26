'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('./config');
var protractor = require("gulp-protractor").protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;
var Server = require('karma').Server;
var env = require('gulp-env');
var gulpSequence = require('gulp-sequence');
var browserSync = require('./server');

/**
 * Run test once and exit
 */
gulp.task('test:karma', function (done) {
  new Server({
  	configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd:karma', function (done) {
  new Server({
  	configFile: path.join(__dirname, '/../karma.conf.js'),
  	singleRun: false,
  	autoWatch: true
  }, done).start();
});

gulp.task('test',gulpSequence('test:karma'));