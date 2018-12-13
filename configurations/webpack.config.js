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
    watch: false,
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
            analyzerMode: 'disabled',
            logLevel: 'silent',
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ],
    module: {
        rules: [{
                // enfore ensures that eslint-loader runs before babel or any other loaders
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    failonError: false,
                    fix: true,
                    configFile: path.resolve(rootFolder, 'configurations/.eslintrc'),
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cwd: path.join(rootFolder, 'configurations/'),
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};