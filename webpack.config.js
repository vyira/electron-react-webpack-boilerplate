const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const isDev = false

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
                loader: 'babel-loader',
                exclude: /node_modeule/
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modeule/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'css-loader',
                    'sass-loader',
                    'style-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
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
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
}