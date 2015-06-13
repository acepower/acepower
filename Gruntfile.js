module.exports = function(grunt) {
    var path = require("path");
    var svgo = require('imagemin-svgo');

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
        imagemin: {
            dynamic: {
                options: {
                    use: [svgo()]
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/img',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: 'app/assets/img'
                }]
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('watch', ['default']);
    grunt.registerTask('default', ['imagemin:dynamic', 'copy:fonts', 'copy:img', 'sass:dev']);
    grunt.registerTask('ci', ['imagemin:dynamic', 'copy:assets', 'copy:img', 'sass:dist']);
    grunt.registerTask('server', ['exec:server']);

};