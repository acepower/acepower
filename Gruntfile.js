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
                    dest: 'public/img'
                }]
            }
        },
        copy: {
            fonts: {
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
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: "<%=outputPath%>/css",
                    src: [ "*.css" ],
                    dest: "<%=outputPath%>/css",
                    ext: ".css"
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // grunt
    grunt.registerTask('default', ['imagemin:dynamic', 'copy:fonts', 'sass:dev']);

    // grunt ci
    grunt.registerTask('ci', ['imagemin:dynamic', 'copy:fonts', 'sass:dev', 'cssmin']);

    // grunt server
    grunt.registerTask('server', ['exec:server']);

};