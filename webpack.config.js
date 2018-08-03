const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")


const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app')
const SRC_PATH = path.resolve(APP_PATH, 'src')
const ENTRY_PATH = path.resolve(SRC_PATH, 'index.js')
const CSS_PATH = path.resolve(SRC_PATH, 'resources/index.less')
const BUILD_PATH = path.resolve(APP_PATH, 'build/static')

module.exports = {
    entry: {
        app: [ENTRY_PATH, CSS_PATH]
    },
    output: {
        publicPath: '/', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, 
        filename: 'bundle-[hash:5].js', 
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    devServer: {
        contentBase: BUILD_PATH, 
        historyApiFallback: true, // 不跳转
        inline: true,
        hot: true,
        proxy: {
            "/api/**": {
                "target": "http://music.163.com",
                ignorePath: false,
                changeOrigin: true,
                secure: false,
                headers: {
                    "Referer": "http://music.163.com"
                }
            },
            "/weapi/**": {
                "target": "http://music.163.com",
                ignorePath: false,
                changeOrigin: true,
                secure: false,
                headers: {
                    "Referer": "http://music.163.com"
                }
            }
        }
    },
    
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.html'] 
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel-loader',
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
            // loader: ['style-loader', 'css-loader' ]
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']}),
            // loader: ['style-loader', 'css-loader', 'less-loader' ]
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg|PNG)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/.[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx', 'babel-loader'],
            include: [APP_PATH]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(SRC_PATH, 'templates/index.tmpl.html')
        }),
        new ExtractTextPlugin('styles.css'),
        new CleanWebpackPlugin(path.resolve(BUILD_PATH, '*.*'), {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}