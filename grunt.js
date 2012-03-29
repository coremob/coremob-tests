if ( global.grunt ) {
  fail.fatal( 'YOU MUST UPGRADE GRUNT TO 0.3.0 OR NEWER' );
}

/*global config:true, task:true, module:true */
module.exports = function(grunt) {

  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: ''
    },
    lint: {
      files: ['tests/!(boilerplate)**/*.js']
    },
    watch: {
      files: ['<config:lint.files>'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        evil: true,
        browser: true,
        trailing: true,
        maxerr: 10,
        loopfunc: true
      },
      globals: {
        self: true,
        Node: true,
        global: true,
        exports: true,
        require: true,
        file: true,
        log: true,
        console: true,
        importScripts: true,

        // Test API
        Hat: true,
        H: true,
        test: true,
        asyncTest: true,

        // Assertions
        assert: true,
        ok: true
      }
    },
    uglify: {}
  });

  // Default task.
  task.registerTask('default', 'lint');
};
