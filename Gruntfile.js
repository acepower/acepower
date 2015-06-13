module.exports = function(grunt) {
    var path = require("path");

    grunt.initConfig({
        staticPath: path.resolve() + "/app",
        outputPath: path.resolve() + "/public",
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        exec: {
            server: {
              command: 'nodemon ./bin/www'
            }
        },
        copy: {
            assets: {
                expand: true,
                cwd: "bower_components/open-sans-fontface/fonts",
                src: ['**'],
                dest: "<%=outputPath%>/css/fonts"
            }
        },
        sass: {
            dev: {
                options: {
                    style: "expanded"
                },
                files: [ {
                    expand: true,
                    cwd: "<%=staticPath%>/assets/sass",
                    src: [ "*.scss" ],
                    dest: "<%=outputPath%>/css",
                    ext: ".css"
                } ]
            },
            dist: {
                options: {
                    style: "compressed"
                },
                files: [ {
                    expand: true,
                    cwd: "<%=staticPath%>/assets/sass",
                    src: [ "*.scss" ],
                    dest: "<%=outputPath%>/css",
                    ext: ".css"
                } ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy:assets', 'sass:dev']);
    grunt.registerTask('ci', ['copy:assets', 'sass:dist']);
    grunt.registerTask('server', ['exec:server']);

};