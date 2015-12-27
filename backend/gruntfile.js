module.exports = function(grunt) {

  grunt.initConfig({
    ts: {
      default: {
        src: ['src/**/*.ts'],
        outDir: 'build',
        options: {
          module: "commonjs",
          target: "es6",
          noImplicitAny: true
        }
      }
    },
    watch: {
      files: ['src/**/*.ts'],
      tasks: ['ts']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');

  grunt.registerTask('default', ['ts', 'watch']);

};
