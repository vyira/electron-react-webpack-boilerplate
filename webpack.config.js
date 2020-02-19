const isDev = process.env.NODE_ENV === 'development' ? true : false
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: isDev ? 'development' : 'production',
    watch: isDev ? true : false,
    target: 'electron-renderer',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: path.join('.'),
        filename: 'js/bundle.[Hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modeule/
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modeule/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modeule/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
}