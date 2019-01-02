const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const options = require('../config');
const rootFolder = options.root_folder;
const moduleDir = options.modulesDir;

// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let arr = glob.sync(options.modulesDir);

const allEntries = () => {
    manyEntries = {
        app: options.appGlobalFile,
    };
    for (var index in arr) {
        manyEntries[path.basename(arr[index], '.js')] = arr[index]
    }
    if (arr.length > 0) {
        return manyEntries;
    } else {
        console.error('No files to bundle!!!');
        return '';
    }
}

module.exports = {
    mode: 'development', //add 'production' when deploy
    watch: false,
    entry: allEntries(),
    output: {
        path: options.output.scripts,
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
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
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
                    configFile: path.resolve(options.fullConfigsPath, '.eslintrc'),
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                    options: {
                        publicPah: options.output.css
                    }
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader", // compiles Sass to CSS
                    options: {
                        config: {
                            path: path.resolve(rootFolder, options.configPath)
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
                        cwd: path.join(rootFolder, options.configPath),
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};