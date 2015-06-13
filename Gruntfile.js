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
            files: ['<%= jshint.files %>', 'app/assets/sass/*.scss'],
            tasks: ['jshint']
        },
        exec: {
            server: {
              command: 'nodemon ./bin/www'
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: "bower_components/open-sans-fontface/fonts",
                src: ['**'],
                dest: "<%=outputPath%>/css/fonts"
            },
            img: {
                expand: true,
                cwd: "app/assets/img",
                src: ['**'],
                dest: "public/img"
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

    grunt.registerTask('watch', ['default']);
    grunt.registerTask('default', ['copy:fonts', 'copy:img', 'sass:dev']);
    grunt.registerTask('ci', ['copy:assets', 'copy:img', 'sass:dist']);
    grunt.registerTask('server', ['exec:server']);

};