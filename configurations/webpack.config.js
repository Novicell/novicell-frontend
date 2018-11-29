const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const settings = require("../settings");
const rootFolder = settings.root_folder;

module.exports = {
	mode: "development", //add 'production' when deploy
	watch: true,
	entry: {
		global: glob.sync("./src/components/**/*.js"),
		// To bundle specific directory/file use additional entry
		partial_atoms: glob.sync("./src/components/01-atoms/**/*.js")
	},
	output: {
		path: rootFolder + "/dist/js/",
		filename: "[name].bundle.js"
	},
	module: {
		rules: [{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}]
	}
};