'use strict';

var gulp = require('gulp');

// Default task
module.exports = gulp.task('default', ['js', 'css', 'jade', 'md', 'notes', 'stylus', 'imagemin', 'watch', 'browser-sync']);
