// 引入一个包
const path = require('path')
const webpack = require('webpack')
console.log(process.env.NODE_ENV)
module.exports = {
    mode: 'production',
    devtool: process.env.NODE_ENV === 'development' ? "source-map" : 'cheap-module-source-map',
    // 指定入口文件
    entry:'./src/index.ts',
    // 指定打包文件所在的目录
    output:{
        // 利用path可完整拼出打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 打包后的文件
        filename:'beautifyConsole.js',
        libraryTarget: 'umd'
    },
    devServer: {
        proxy: {
          '/gateway': {
            target: 'http://devl-soft-gateway2.unisiot.com/gateway', //需要跨域的url
            changeOrigin: true,
            pathRewrite: {
              '^/gateway': ''
            }
          }
        }
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'development' ? false : true
    },
    module: {
        // 指定要加载的规则
        rules: [
            {
                test:/\.ts$/, // test指定的是规则生效的文件
                use:'ts-loader',
                // 排除要处理的文件
                exclude: [/node-modules/, /__tests__/]
            }
        ],

    },
    // 模块配置：让webpack了解哪些方法可以被当作模块引入
    resolve: {
        extensions:['.ts','.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
			process: 'process/browser', 
			Buffer: ['buffer', 'Buffer']
		})
    ],
}
