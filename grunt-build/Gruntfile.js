module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport: {
            options: {
                paths: ['../js'],
                debug: false,
                alias: grunt.file.readJSON('alias.json')
            },
            // 页面模块的转换
            pages: {
                files: [{
                    expand: true,
                    cwd: '../js/pages',
                    src: '*.js',
                    dest: '../.transport/pages'
                }]
            },
            // 辅助库模块的转换
            lib: {
                files: [{
                    expand: true,
                    cwd: '../js',
                    src: 'lib/**/*.js',
                    dest: '../.transport/'
                }]
            },
            // seajs main模块转换
            main: {
                files: [{
                    expand: true,
                    cwd: '../js',
                    src: [
                        'main.js'
                    ],
                    dest: '../.transport/'
                }]
            }
        },
        concat: {
            options: {
                paths: '../.transport/'
            },
            // 页面模块合并
            common: {
                options: {
                    include: 'relative',
                    // 把global文件合并进去
                    globalModule: 'pages/global.js',
                    footer: 'seajs.use(["global"]);',
                    logPath: 'concat.log'
                },
                files: [{
                    expand: true,
                    cwd: '../.transport/pages',
                    src: '*.js',
                    dest: '../.concat'
                }]
            },
            // jquery.js,sea.js,config.js,main.js合并
            base: {
                options: {
                    noncmd: true,
                    footer: 'seajs.use(["main"]);'
                },
                files: {
                    '../.concat/base.min.js': [
                        '../js/lib/jquery/jquery-1.10.1.min.js',
                        '../js/seajs/sea.js',
                        '../js/config.js',
                        '../.transport/main.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\r\n',
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '../.concat',
                    src: '**/*.js',
                    dest: '../js/pages-pub'
                }]
            }
        },
        clean: {
            before: ['../js/pages-pub'],
            after: ['../.transport', '../.concat', '../js/pages-pub/global.js']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean:before', 'transport', 'concat', 'uglify', 'clean:after']);
};