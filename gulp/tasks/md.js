'use strict';

// Necessary Plugins
var gulp     = require('gulp')
    ,plumber = require('gulp-plumber')
    ,paths   = require('../paths')

// Call Stylus
module.exports = gulp.task('md', function () {
  return gulp.src(paths.source.files.md)
    .pipe(plumber())
    .pipe(gulp.dest(paths.build.md))
});
