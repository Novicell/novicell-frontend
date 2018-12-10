const glob = require('glob');
const path = require('path');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const options = require('../config');
const rootFolder = options.root_folder;
// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development', //add 'production' when deploy
    watch: true,
    entry: {
        master: glob.sync('./src/**/*.js'),
        // To bundle specific directory/file use additional entry
        partial_atoms: glob.sync('./src/01-atoms/**/*.js')
    },
    output: {
        path: path.resolve(rootFolder, 'dist/scripts/'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 8,
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            logLevel: 'silent',
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: path.resolve(rootFolder, 'configurations/.eslintrc')
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
