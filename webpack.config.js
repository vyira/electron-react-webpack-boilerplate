const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const BUILD_DIR = path.join(__dirname, 'build')
const APP_DIR = path.join(__dirname, 'src')
const MODE = 'production'

module.exports = function () {

    const Regex = {
        JAVASCRIPT: /\.(js|mjs|jsx|ts|tsx)$/,
        STYLE: /\.(sa|sc|c)ss$/,
        IMAGES: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        NODE_MODULES: /node_modules/
    }

    const CSS_PLUGIN = new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    })

    const HTML_PLUGIN = new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
                inject: true,
                template: APP_DIR + '/index.html',
            },
            true
                ? {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                }
                : undefined
        ))
    return {
        mode: MODE,
        target: 'electron-renderer',
        entry: {
            bundle: APP_DIR + '/index.js'
        },
        output: {
            path: BUILD_DIR,
            publicPath: path.join('.'),
            filename: 'static/js/[name].[ContentHash:8].js'
        },
        module: {
            rules: [
                {
                    parser: { requireEnsure: false }
                },
                {
                    test: Regex.JAVASCRIPT,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                cache: true,
                                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                                eslintPath: require.resolve('eslint'),
                                resolvePluginsRelativeTo: __dirname,

                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: APP_DIR,
                },
                {
                    oneOf: [
                        {
                            test: Regex.JAVASCRIPT,
                            include: APP_DIR,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),
                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent:
                                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                                },
                                            },
                                        },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                                compact: true,
                            },
                        },
                        {
                            test: Regex.IMAGES,
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]',
                            }
                        },
                        {
                            test: Regex.STYLE,
                            use: [
                                'style-loader',
                                'css-loader',
                                'sass-loader'
                            ],
                            exclude: Regex.NODE_MODULES
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                }
            ]
        },
        plugins: [
            HTML_PLUGIN, CSS_PLUGIN
        ],
        resolve: {
            extensions: ['.js', '.json', '.jsx']
        },
        optimization: {
            minimize: true,
            minimizer: [new UglifyJsPlugin()],
            splitChunks: {
                chunks: 'all',
                minChunks: 1,
                automaticNameDelimiter: '.',
                cacheGroups: {
                    vendor: {
                        test: Regex.NODE_MODULES,
                        name(module) {
                            return 'vendor';
                        }
                    }
                }
            },
        }
    }
}

