'use strict';

var buildClientBundle = require('./client/lbclient/build');
var fs = require('fs');
var path = require('path');


module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    dist: 'client/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      lbclient: {
        files: [
          'lbclient/models/*',
          'lbclient/app*',
          'lbclient/datasources*',
          'lbclient/models*',
          'lbclient/build.js'
        ],
        tasks: ['build-lbclient'],
        options: {
        },
      },
    },

    // Empties folders to start fresh
    clean: {
      lbclient: 'lbclient/browser.bundle.js',
    }
  });


  grunt.registerTask('build', 'Build lbclient browser bundle', function() {
    var done = this.async();
    buildClientBundle(process.env.NODE_ENV || 'development', done);
  });


  grunt.registerTask('watch', 'Compile then start the app server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'run:dist:keepalive']);
    }

    grunt.task.run([
      'build-lbclient',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'watch'
  ]);
};
