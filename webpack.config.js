const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const isDev = require('electron-is-dev')

module.exports = {
    watch: isDev ? true : false,
    target: 'electron-renderer',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: path.join('.'),
        filename: 'js/bundle.[Hash].js'
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
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
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