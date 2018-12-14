const glob = require('glob');
const path = require('path');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const options = require('../config');
const rootFolder = options.root_folder;
// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let arr = glob.sync('./src/_base/JsBundles/*.js');

allEntries = () => {
    manyEntries = {};
    for (var index in arr) {
        manyEntries[path.basename(arr[index], '.js')] = arr[index]
    }
    return manyEntries;
}

module.exports = {
    mode: 'development', //add 'production' when deploy
    watch: false,
    entry: allEntries(),
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
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader", // compiles Sass to CSS
                    options: {
                        config: {
                            path: path.resolve(rootFolder, 'configurations/')
                        }
                    }
                }]
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