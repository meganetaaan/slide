'use strict';

module.exports = {

    source: {
        pages: 'src/pages/**/*.jade',
        templates: 'src/templates/**/*.jade',
        js: 'src/js/**/*.js',
        styl: 'src/styl/**/*.styl',
        img: 'src/img/**/*',
        files: {
          jade: 'src/pages/**/*.jade',
          styl: 'src/styl/main.styl',
          notes: 'src/js/vendor/notes/notes.html'
        }

    },

    browserSync: {
      html: 'build/**/*.html',
      js: 'build/js/**/*.js',
      css: 'build/css/**/*.css',
      img: 'build/img/**/*'
    },

    build: {
      html: './build/',
      js: 'build/js',
      css: 'build/css',
      img: 'build/img',
      notes: 'build/js/vendor/notes/'
    },

    deploy: {
      pages: 'build/**/*'
    }
};
