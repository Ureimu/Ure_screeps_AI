module.exports = function (grunt) {
    // 从 npm 载入任务
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 配置任务
    grunt.initConfig({
        // typescripts 编译任务
        'ts': {
            default: {
                options: {
                    sourceMap: false,
                    // 编译到的目标版本
                    target: 'es5',
                    rootDir: "src/"
                },
                // 要进行编译的目录及文件
                src: ["src/*.ts"],
                // 编译好的文件的输出目录
                outDir: 'dist/'
            }
        },
        screeps: {
            options: {
                email: '',//这里填邮箱
                password: '',//这里填游戏的密码
                branch: 'default',//这里设置要提交到的分支
                ptr: false
            },
            dist: {
                src: ['dist/*.{js,wasm}'],
            }
        },
        // 代码变更监听任务
        watch: {
            files: "dist/*.*",
            tasks: ["screeps"]
        }
    })
    // 将 ts 编译任务注册到默认执行命令
    grunt.registerTask('default', ['ts']);
    grunt.registerTask('auto', ["watch"]);
}