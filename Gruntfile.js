'use strict';

var buildClientBundle = require('./client/build');
var fs = require('fs');
var path = require('path');


module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    dist: 'app'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      client: {
        files: [
          'client/models/*',
          'client/app*',
          'client/datasources*',
          'client/models*',
          'client/build.js'
        ],
        tasks: ['build-client'],
        options: {
        },
      },
    },

    // Empties folders to start fresh
    clean: {
      client: 'app/client.bundle.js',
    }
  });


  grunt.registerTask('build', 'Build client browser bundle', function() {
    var done = this.async();
    buildClientBundle(process.env.NODE_ENV || 'development', done);
  });


  grunt.registerTask('watch', 'Compile then start the app server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'run:dist:keepalive']);
    }

    grunt.task.run([
      'build-client',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'watch'
  ]);
};
