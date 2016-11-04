'use strict';

var gulp   = require('gulp')
    ,paths = require('../paths');

// Call Watch
module.exports = gulp.task('watch', function () {
  gulp.watch([paths.source.pages, paths.source.templates], ['jade']);
  gulp.watch(paths.source.md, ['md']);
  gulp.watch(paths.source.js, ['js']);
  gulp.watch(paths.source.styl, ['stylus']);
  gulp.watch(paths.source.img, ['imagemin']);
});
