var webpack = require ('webpack');
var path = require ('path');

module.exports = {
	entry: [
		path.join (__dirname, "server.js")
	],
	output: {
		"path": path.join (__dirname, "docs/"),
		"filename": "index-server.js"
	},
	devtool: 'source-map',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					'presets': [
						[
							"env",
							{'targets': {browsers: ['last 2 versions']}}
						], "react"
					],
					'plugins': ["transform-class-properties"]
				}
			}
		]
	}
}
