module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      jplayer: {
        src: 'node_modules/jplayer/dist/jplayer/jplayer.jplayer.swf',
        dest: 'assets/js/',
        flatten: true,
        expand: true
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'assets/js/front.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/underscore/underscore-min.js',
            'node_modules/jplayer/dist/jplayer/jquery.jplayer.js',
            '_js/_front.js'
          ],
          'assets/js/mixtape.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/underscore/underscore-min.js',
            'node_modules/jplayer/dist/jplayer/jquery.jplayer.js',
            '_js/_mix.js'
          ]
        }
     }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('default', ['copy', 'uglify']);

};