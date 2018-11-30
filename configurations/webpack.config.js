const path = require("path");
const glob = require("glob");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const options = require("../config");
const rootFolder = options.root_folder;

module.exports = {
	mode: "development", //add 'production' when deploy
	watch: true,
	entry: {
		master: glob.sync("./src/**/*.js"),
		// To bundle specific directory/file use additional entry
		partial_atoms: glob.sync("./src/01-atoms/**/*.js")
	},
	output: {
		path: rootFolder + "/dist/scripts/",
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