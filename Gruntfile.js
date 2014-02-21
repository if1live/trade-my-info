/*
 * Assemble, assemble-examples-markdown
 * https://github.com/assemble/assemble-examples-markdown
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        helpers: 'src/helpers/helper-*.js',
        assets: 'dest/assets',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/partials/*.hbs', './*.md']
      },
      html1: {
        options: {
          layout: 'default.hbs',
        },
        files: {
          'dest/': ['src/templates/pages/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['dest/*.{html,md}']
    },

    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    coveralls: {
      options: {
        // LCOV coverage file relevant to every target
        src: 'coverage-results/lcov.info',

        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },
      your_target: {
        // Target-specific LCOV coverage file
        src: 'coverage-results/extra-results-*.info'
      },
    },
    less: {
      development: {
        options: {
          paths: ["assets/gen"]
        },
        files: {
          "dest/assets/gen/style.css": "src/less/style.less"
        }
      }
	  /*
      production: {
        options: {
          paths: ["assets/gen"],
          compress: true
        },
        files: {
          "dest/assets/gen/style.css": "src/less/style.less"
        }
      }
	  */
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-coveralls');

  // Default tasks to be run.
  grunt.registerTask('default', ['mochaTest', 'less', 'assemble']);
};
