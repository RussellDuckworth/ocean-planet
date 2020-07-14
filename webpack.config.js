var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
	"react",
	"react-dom"
];

module.exports = {
	// delete devtool option during production
	devtool: 'source-map',
	entry: {
		bundle: "./src/app.js",
		vendor: VENDOR_LIBS
	},
	mode: "development",
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				options: {
					// This preset and plugins are required for the code to enable es6 syntax!
					presets: ["env", "react", "es2015"],
					plugins: ["transform-class-properties"]
				}
			},
			{
				use: ["style-loader", "css-loader"],
				test: /\.css$/
			}
		]
	},
	// output files bundle.js and vendor.js will be generated on this path:
	output: {
		path: path.join(__dirname, "html/js/"),
		filename: "[name].js"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		})//,
	],
	performance: {
		maxEntrypointSize: 400000, //400kb; default is 250kb
		maxAssetSize: 100000
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	target: 'node'
};


