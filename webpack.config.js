const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app'); //__dirname 中的src目录，以此类推
const SRC_PATH = path.resolve(APP_PATH, 'src'); //__dirname 中的src目录，以此类推
const ENTRY_PATH = path.resolve(SRC_PATH, 'index.js'); //根目录文件app.jsx地址
const BUILD_PATH = path.resolve(APP_PATH, 'build/static'); //发布文件所存放的目录

module.exports = {
    entry: {
        app: ENTRY_PATH
    },
    output: {
        publicPath: '', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, //编译到当前目录
        filename: 'bundle-[hash:5].js', //编译后的文件名字
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    devServer: {
        contentBase: BUILD_PATH, 
        historyApiFallback: true, // 不跳转
        inline: true,
        hot: true
      },
    
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css', '.html'] 
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel-loader',
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer']),
            include: [APP_PATH]
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less']),
            include: [APP_PATH]
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass']),
            include: [APP_PATH]
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
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
        new ExtractTextPlugin('[name].css')
    ]
}