'use strict';

// Necessary Plugins
var gulp     = require('gulp')
    ,plumber = require('gulp-plumber')
    ,paths   = require('../paths')

// Call Stylus
module.exports = gulp.task('css', function () {
  return gulp.src(paths.source.files.css)
    .pipe(plumber())
    .pipe(gulp.dest(paths.build.css))
});
