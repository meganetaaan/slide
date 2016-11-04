'use strict';

module.exports = {

    source: {
        pages: 'src/pages/**/*.jade',
        md: 'src/pages/**/*.md',
        templates: 'src/templates/**/*.jade',
        js: 'src/js/**/*.js',
        styl: 'src/styl/**/*.styl',
        img: 'src/img/**/*',
        files: {
          md: 'src/pages/**/*.md',
          jade: 'src/pages/**/*.jade',
          styl: 'src/styl/main.styl',
          css: 'src/css/**/*.css',
          notes: 'src/js/vendor/notes/notes.html'
        }

    },

    browserSync: {
      html: 'build/**/*.html',
      md: 'build/**/*.md',
      js: 'build/js/**/*.js',
      css: 'build/css/**/*.css',
      img: 'build/img/**/*'
    },

    build: {
      html: './build/',
      md: './build/',
      js: 'build/js',
      css: 'build/css',
      img: 'build/img',
      notes: 'build/js/vendor/notes/'
    },

    deploy: {
      pages: 'build/**/*'
    }
};
