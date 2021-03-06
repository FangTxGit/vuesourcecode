import babel from 'rollup-plugin-babel'

import serve from 'rollup-plugin-serve'


export default {
    input: './src/index.js', //=> 文件入口
    output: {
        file: 'dist/umd/vue.js', //=> 文件出口
        name: 'Vue', //=>指定打包后全局变量的名字
        format: 'umd',//=> 统一模块规范
        sourcemap: true
    },
    plugins: [
        babel({
            //=> 设置打包文件
            exclude: "node_modules/**"
        }),
        //=> 开发服务
        process.env.ENV === 'development' ? serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        }) : null
    ]
}